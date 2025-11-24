import './App.css';
import UploadView from "./components/ImageUpload";
import ResultView from './components/Result';
import { useState } from 'react';
import AnalyzingView from './components/Analyzing';
import Header from './components/Header';

import { analyzeImage } from './services/api';

type AnalysisResult = {
  label: string;
  labelVi: string;
  confidence: string;
  details: string;
  severity: 'high' | 'low';
};


export default function App() {
  const [view, setView] = useState<'upload' | 'analyzing' | 'result'>('upload'); // 'upload' | 'analyzing' | 'result'
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setView('analyzing');
    
    // GIẢ LẬP API CALL
    try {
      // --- BẮT ĐẦU GỌI API ---
      const data = await analyzeImage(selectedImage);
      
      // Kiểm tra kết quả từ Server (NORMAL hoặc PNEUMONIA)
      const isPneumonia = data.prediction === "PNEUMONIA";

      // Ánh xạ dữ liệu từ Python sang cấu trúc của Frontend
      setResult({
        label: data.prediction,
        labelVi: isPneumonia ? "Dương tính - Viêm phổi" : "Bình thường",
        confidence: data.confidence, // Server đã trả về chuỗi "98.50"
        details: isPneumonia 
          ? "Phát hiện vùng mờ bất thường trên ảnh X-quang. Vui lòng xem ảnh nhiệt (Heatmap) để biết vị trí."
          : "Không phát hiện dấu hiệu viêm phổi rõ ràng trên phim chụp.",
        severity: isPneumonia ? "high" : "low",
        // gradcamUrl: data.gradcam_image_url // Lưu URL ảnh Heatmap
      });
      
      // Chuyển sang màn hình kết quả
      setView('result');

    } catch (error) {
      console.error("Lỗi khi phân tích:", error);
      alert("Có lỗi xảy ra khi kết nối đến Server. Vui lòng kiểm tra lại Backend.");
      setView('upload'); // Quay lại màn hình upload nếu lỗi
    }
  };

  const handleReset = () => {
    handleClearImage();
    setResult(null);
    setView('upload');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === 'upload' && (
          <UploadView 
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            previewUrl={previewUrl}
            onAnalyze={handleAnalyze}
            onClear={handleClearImage}
          />
        )}

        {view === 'analyzing' && (
          <AnalyzingView />
        )}

        {view === 'result' && (
          <ResultView 
            result={result}
            previewUrl={previewUrl}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}