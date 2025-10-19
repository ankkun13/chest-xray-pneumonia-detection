from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
import numpy as np
import cv2
import os

from model_utils.model_loader import load_vggnet_model
from model_utils.preprocess import preprocess_image
from model_utils.gradcam import generate_gradcam


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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =========================
# 2️⃣ Load model 1 lần
# =========================
model, device = load_vggnet_model(model_dir="models")


# =========================
# 3️⃣ Route: /predict
# =========================
@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    """
    Nhận 1 ảnh X-ray (jpg/png), dự đoán NORMAL/PNEUMONIA và sinh Grad-CAM.
    """
    try:
        filename = image.filename
        image_path = os.path.join(UPLOAD_FOLDER, filename)

        # Lưu ảnh upload
        with open(image_path, "wb") as buffer:
            buffer.write(await image.read())

        # Tiền xử lý ảnh
        image_tensor, original_image = preprocess_image(image_path)
        image_tensor = image_tensor.to(device)

        # Dự đoán
        with torch.no_grad():
            output = model(image_tensor)
            pred_class = output.argmax(dim=1).item()
            confidence = torch.softmax(output, dim=1)[0][pred_class].item()

        label = "PNEUMONIA" if pred_class == 1 else "NORMAL"

        # Sinh ảnh Grad-CAM
        cam, _ = generate_gradcam(model, image_tensor)
        heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
        heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

        overlay = np.array(original_image.resize((224, 224)))
        overlay = np.uint8(0.6 * overlay + 0.4 * heatmap)

        gradcam_path = os.path.join(UPLOAD_FOLDER, f"gradcam_{filename}")
        cv2.imwrite(gradcam_path, cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR))

        return JSONResponse({
            "prediction": label,
            "confidence": round(confidence, 4),
            "gradcam_path": f"/gradcam/{os.path.basename(gradcam_path)}"
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =========================
# 4️⃣ Route: /gradcam/<filename>
# =========================
@app.get("/gradcam/{filename}")
async def get_gradcam(filename: str):
    """
    Trả file Grad-CAM đã sinh ra.
    """
    path = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Grad-CAM image not found")
    return FileResponse(path, media_type="image/png")


# =========================
# 5️⃣ Run (dùng uvicorn)
# =========================
# Chạy bằng lệnh:
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
