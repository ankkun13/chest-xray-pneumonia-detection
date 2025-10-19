import torch
import torch.nn as nn
import torch.optim as optim
import os


# ==============================
# 1️⃣ Định nghĩa lại kiến trúc VGGNet
# ==============================
class PneumoniaVGGNet(nn.Module):
    def __init__(self, in_channels=1, num_classes=2):
        super(PneumoniaVGGNet, self).__init__()

        def conv_block(in_c, out_c, num_conv):
            layers = []
            layers.append(nn.Conv2d(in_c, out_c, kernel_size=3, padding=1))
            layers.append(nn.BatchNorm2d(out_c))
            layers.append(nn.ReLU(inplace=True))
            for _ in range(num_conv - 1):
                layers.append(nn.Conv2d(out_c, out_c, kernel_size=3, padding=1))
                layers.append(nn.BatchNorm2d(out_c))
                layers.append(nn.ReLU(inplace=True))
            layers.append(nn.MaxPool2d(2, 2))
            return nn.Sequential(*layers)

        self.features = nn.Sequential(
            conv_block(in_channels, 64, 1),
            conv_block(64, 128, 1),
            conv_block(128, 256, 2),
            conv_block(256, 512, 2),
            conv_block(512, 512, 2)
        )

        self.classifier = nn.Sequential(
            nn.Linear(512 * 7 * 7, 4096),
            nn.ReLU(True),
            nn.Dropout(),
            nn.Linear(4096, 4096),
            nn.ReLU(True),
            nn.Dropout(),
            nn.Linear(4096, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x


# ==============================
# 2️⃣ Hàm load model đã huấn luyện
# ==============================
def load_vggnet_model(model_dir="models", model_name="pneumonia_model_VGGNet.pth", device=None):
    """
    Load mô hình PneumoniaVGGNet từ thư mục models/
    Args:
        model_dir (str): thư mục chứa file .pth
        model_name (str): tên file model đã lưu
        device (torch.device): 'cuda' hoặc 'cpu'
    Returns:
        model (torch.nn.Module): model đã load và ở chế độ eval
        device (torch.device)
    """
    if device is None:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model_path = os.path.join(model_dir, model_name)
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Không tìm thấy model tại: {model_path}")

    # Khởi tạo kiến trúc VGGNet
    model = PneumoniaVGGNet(in_channels=1, num_classes=2)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()

    print(f"✅ Loaded PneumoniaVGGNet model from '{model_path}' on {device}")
    return model, device


# ==============================
# 3️⃣ Kiểm tra nhanh
# ==============================
if __name__ == "__main__":
    model, device = load_vggnet_model()
    dummy_input = torch.randn(1, 1, 224, 224).to(device)
    output = model(dummy_input)
    print("Output shape:", output.shape)
