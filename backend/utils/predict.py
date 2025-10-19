# backend/utils/predictor.py
import torch.nn.functional as F
import torch

def predict(model, image_tensor):
    """
    Thực hiện dự đoán với ảnh đã xử lý.
    Trả về nhãn và xác suất.
    """
    with torch.no_grad():
        logits = model(image_tensor)
        probs = F.softmax(logits, dim=1)[0].cpu().numpy()
        cls_idx = int(probs.argmax())
        label = "PNEUMONIA" if cls_idx == 1 else "NORMAL"
        return label, float(probs[cls_idx])
