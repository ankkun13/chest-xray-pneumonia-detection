import os
from fastapi import UploadFile

def save_uploaded_file(file: UploadFile, upload_folder: str):
    """
    Lưu file từ UploadFile và trả về đường dẫn.
    """
    filename = file.filename
    image_path = os.path.join(upload_folder, filename)
    with open(image_path, "wb") as buffer:
        buffer.write(file.read()) # LƯU Ý: nếu gọi từ async def phải dùng await file.read()
    return image_path