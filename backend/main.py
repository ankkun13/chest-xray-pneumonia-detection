from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image
import os
import traceback

from utils.load_model import load_densenet_model
from utils.preprocess import preprocess_image
from utils.gradcam import generate_gradcam
from utils.upload_image import save_uploaded_file
from utils.predict import predict

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# =========================
# 1️⃣ Khởi tạo FastAPI
# =========================
app = FastAPI(
    title="Chest X-Ray Pneumonia Detection API",
    description="API nhận ảnh X-Ray ngực và dự đoán NORMAL / PNEUMONIA, kèm Grad-CAM visualization.",
    version="1.0.0"
)

# Cho phép truy cập từ frontend khác (nếu có React/Vue/Streamlit)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")

# =========================
# 2️⃣ Load model 1 lần
# =========================
model, device = load_densenet_model()


# =========================
# 3️⃣ Route: /predict
# =========================
@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    """
    Nhận 1 ảnh X-ray (jpg/png), dự đoán NORMAL/PNEUMONIA và sinh Grad-CAM.
    """
    try:
        image_path = await save_uploaded_file(image, UPLOAD_FOLDER)
        filename = os.path.basename(image_path)
        
        pil_image = Image.open(image_path).convert('RGB')
        # 2. Tiền xử lý & Chuẩn bị
        image_tensor = preprocess_image(pil_image, device)

        # 3. Dự đoán và format kết quả
        label, confidence = predict(model, image_tensor, device)


        base_url = "http://localhost:8000/uploads"

        return JSONResponse({
            "prediction": label,
            "confidence": f"{confidence:.2f}%",
            "image_path": f"{base_url}/{filename}",
        })

    except Exception as e:
        # In lỗi chi tiết ra Docker Log để debug
        print("======== LỖI SERVER (500) ========")
        traceback.print_exc()
        print("==================================")
        raise HTTPException(status_code=500, detail=str(e))


# =========================
# 5️⃣ Run (dùng uvicorn)
# =========================
# Chạy bằng lệnh:
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
