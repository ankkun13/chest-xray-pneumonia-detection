# backend/utils/preprocess.py
from torchvision import transforms
from PIL import Image

def get_preprocess():
    """
    Hàm trả về pipeline tiền xử lý ảnh.
    (Resize → Grayscale → Tensor → Normalize)
    """
    return transforms.Compose([
        transforms.Grayscale(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5], std=[0.5])
    ])

def preprocess_image(pil_image: Image.Image, device):
    """
    Chuyển PIL Image thành tensor để dự đoán.
    """
    transform = get_preprocess()
    img_tensor = transform(pil_image).unsqueeze(0).to(device)
    return img_tensor
