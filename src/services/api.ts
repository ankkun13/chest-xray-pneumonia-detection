import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Định nghĩa kiểu dữ liệu trả về khớp với JSONResponse của Python
export interface PredictionResponse {
  prediction: string;      // "NORMAL" hoặc "PNEUMONIA"
  confidence: string;      // Ví dụ: "98.50"
  image_path: string; // URL ảnh gốc
  // gradcam_image_url: string;  // URL ảnh heatmap
}

export const analyzeImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('image', file); // Chú ý: 'image' phải khớp với tên tham số trong FastAPI (image: UploadFile)

  try {
    const response = await axios.post<PredictionResponse>(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting image:", error);
    throw error;
  }
};