import './App.css';
import UploadView from "./components/ImageUpload";
import ResultView from './components/Result';
import { useState } from 'react';
import AnalyzingView from './components/Analyzing';
import Header from './components/Header';

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

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setView('analyzing');
    
    // GIẢ LẬP API CALL
    setTimeout(() => {
      const isPneumonia = Math.random() > 0.5; 
      const confidence = (0.85 + Math.random() * 0.14).toFixed(2);

      setResult({
        label: isPneumonia ? "PNEUMONIA" : "NORMAL",
        labelVi: isPneumonia ? "Dương tính - Viêm phổi" : "Bình thường",
        confidence: confidence,
        details: isPneumonia 
          ? "Phát hiện vùng mờ bất thường ở thùy phổi. Cần bác sĩ chuyên khoa kiểm tra lại."
          : "Không phát hiện dấu hiệu bất thường rõ ràng trên phim chụp.",
        severity: isPneumonia ? "high" : "low"
      });
      setView('result');
    }, 3000);
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