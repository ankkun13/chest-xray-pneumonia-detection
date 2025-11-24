# backend/utils/predictor.py
import torch.nn.functional as F
import torch

def predict(model, image_tensor, device):
    """
    Thực hiện dự đoán với ảnh đã xử lý.
    Trả về nhãn và xác suất.
    """
    model.eval()
    image_tensor = image_tensor.to(device)
    
    with torch.no_grad():
        logits = model(image_tensor)

        probs = F.softmax(logits, dim=1)
        
        confidence, predicted_class = torch.max(probs, 1)
            
        # Lấy giá trị
        idx = predicted_class.item()
        score = confidence.item() * 100 # Đổi ra phần trăm
        label = ["NORMAL" if idx == 1 else "PNEUMONIA"][0]

        return label, score
