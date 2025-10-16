from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from .model.predict import predict_image

app = FastAPI()

# Cho phép React frontend truy cập API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Pneumonia Detection API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    result = predict_image(await file.read())
    return result
