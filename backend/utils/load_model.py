import torch
import torch.nn as nn
import torch.optim as optim
import os


# ==============================
# 1️⃣ Định nghĩa lại kiến trúc VGGNet
# ==============================
class DenseLayer(nn.Module):
    def __init__(self, in_channels, growth_rate):
        super().__init__()
        self.layer = nn.Sequential(
            nn.BatchNorm2d(in_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels, growth_rate, kernel_size=3, padding=1, bias=False)
        )

    def forward(self, x):
        new_features = self.layer(x)
        return torch.cat([x, new_features], 1)  # kết nối dense (concat)


class TransitionLayer(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.layer = nn.Sequential(
            nn.BatchNorm2d(in_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels, out_channels, kernel_size=1, bias=False),
            nn.AvgPool2d(kernel_size=2, stride=2)  # giảm 1/2 kích thước
        )

    def forward(self, x):
        return self.layer(x)


class PneumoniaDenseNet(nn.Module):
    def __init__(self, in_channels=1, num_classes=2, growth_rate=32, num_layers=[4, 4, 8, 8]):
        super().__init__()

        # Layer đầu tiên (stem)
        self.init_conv = nn.Sequential(
            nn.Conv2d(in_channels, 64, kernel_size=7, stride=2, padding=3, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=3, stride=2, padding=1)
        )

        channels = 64
        self.dense_blocks = nn.ModuleList()
        self.trans_blocks = nn.ModuleList()

        # 4 Dense Blocks như DenseNet gốc
        for i, n_layers in enumerate(num_layers):
            block = self._make_dense_block(channels, growth_rate, n_layers)
            self.dense_blocks.append(block)
            channels += n_layers * growth_rate  # mỗi layer thêm growth_rate kênh

            # Không thêm transition sau block cuối
            if i != len(num_layers) - 1:
                out_channels = channels // 2
                self.trans_blocks.append(TransitionLayer(channels, out_channels))
                channels = out_channels

        self.bn_final = nn.BatchNorm2d(channels)
        self.global_pool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(channels, num_classes)

    def _make_dense_block(self, in_channels, growth_rate, n_layers):
        layers = []
        for _ in range(n_layers):
            layers.append(DenseLayer(in_channels, growth_rate))
            in_channels += growth_rate
        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.init_conv(x)
        for i, block in enumerate(self.dense_blocks):
            x = block(x)
            if i < len(self.trans_blocks):
                x = self.trans_blocks[i](x)
        x = self.bn_final(x)
        x = nn.ReLU(inplace=True)(x)
        x = self.global_pool(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        return x


# ==============================
# 2️⃣ Hàm load model đã huấn luyện
# ==============================
def load_densenet_model(model_dir="backend\models", model_name="pneumonia_model_DenseNet.pth", device=None):
    """
    Load mô hình PneumoniaDenseNet từ thư mục models/
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

    # Khởi tạo kiến trúc DenseNet
    model = PneumoniaDenseNet(in_channels=1, num_classes=2)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()

    print(f"✅ Loaded PneumoniaDenseNet model from '{model_path}' on {device}")
    print(f"Model parameters: {sum(p.numel() for p in model.parameters()):,}")
    return model, device


# ==============================
# 3️⃣ Kiểm tra nhanh
# ==============================
if __name__ == "__main__":
    model, device = load_densenet_model()
    dummy_input = torch.randn(1, 1, 224, 224).to(device)
    output = model(dummy_input)
    print("Output shape:", output.shape)
