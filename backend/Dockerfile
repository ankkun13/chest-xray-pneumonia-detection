# Tên tệp: Dockerfile (đặt ở thư mục gốc)

# Sử dụng Python 3.10 slim để image nhẹ hơn
FROM python:3.10-slim

# Thiết lập biến môi trường
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_HOME=/app

WORKDIR $APP_HOME

# Cài đặt các thư viện hệ thống cần thiết cho OpenCV (xử lý ảnh X-quang)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy file requirements trước để tận dụng cache của Docker
COPY backend/requirements.txt .

# Cài đặt dependencies
# Lưu ý: Nếu bạn chỉ chạy dự đoán (inference) trên CPU, pip sẽ tự cài torch bản CPU hoặc 
# bạn có thể chỉ định rõ url để giảm dung lượng image (tuỳ chọn).
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ source code backend và file model
COPY backend/ .

# Expose cổng mặc định của FastAPI
EXPOSE 8000

# Lệnh chạy với Uvicorn
# Cấu trúc: "tên_file:tên_biến_app"
# Giả sử file chính là 'app.py' và biến khởi tạo là 'app = FastAPI()'
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]