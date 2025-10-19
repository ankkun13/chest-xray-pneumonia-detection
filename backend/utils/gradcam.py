# backend/utils/gradcam.py
import torch
import numpy as np
import cv2
from PIL import Image

def generate_gradcam(model, image_tensor, pil_image):
    """
    Sinh ảnh Grad-CAM cho ảnh đầu vào.
    """
    model.zero_grad()
    device = next(model.parameters()).device

    # Tìm layer Conv2d cuối cùng
    target_layer = None
    for name, module in model.named_modules():
        if isinstance(module, torch.nn.Conv2d):
            target_layer = module
    if target_layer is None:
        raise RuntimeError("Không tìm thấy Conv2d layer để Grad-CAM")

    activations = None
    gradients = None

    def forward_hook(module, inp, out):
        nonlocal activations
        activations = out.detach()

    def backward_hook(module, grad_in, grad_out):
        nonlocal gradients
        gradients = grad_out[0].detach()

    fh = target_layer.register_forward_hook(forward_hook)
    bh = target_layer.register_backward_hook(backward_hook)

    out = model(image_tensor)
    class_idx = out.argmax(dim=1).item()
    score = out[0, class_idx]
    score.backward()

    fh.remove()
    bh.remove()

    weights = gradients.mean(dim=[0, 2, 3])
    cam = (weights.view(-1, 1, 1) * activations[0]).sum(0).cpu().numpy()
    cam = np.maximum(cam, 0)
    cam = cam / (cam.max() + 1e-8)

    cam_resized = cv2.resize(cam, pil_image.size[::-1])
    heatmap = (cam_resized * 255).astype("uint8")
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    img_np = np.array(pil_image.convert("RGB"))
    overlay = cv2.addWeighted(img_np, 0.6, heatmap, 0.4, 0)

    return Image.fromarray(overlay)
