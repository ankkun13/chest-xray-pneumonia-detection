import React from 'react';
import { FileText, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

// Định nghĩa cấu trúc dữ liệu cho kết quả trả về từ Model AI
interface AnalysisResult {
  label: string;       // "PNEUMONIA" | "NORMAL"
  labelVi: string;     // "Dương tính - Viêm phổi" | "Bình thường"
  confidence: string | number; // Ví dụ: 0.98 hoặc "0.98"
  details: string;     // Mô tả chi tiết
  severity: 'high' | 'low'; // Mức độ nghiêm trọng để hiện màu sắc
}

interface ResultViewProps {
  result: AnalysisResult | null;
  previewUrl: string | null;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, previewUrl, onReset }) => {
  if (!result || !previewUrl) return null;

  // Chuyển đổi confidence sang số để tính % width
  const confidenceScore = Number(result.confidence);
  const confidencePercent = (confidenceScore * 100).toFixed(1);

  return (
    <div className="animate-fade-in grid md:grid-cols-2 gap-8 items-start">
      
      {/* Cột trái: Hiển thị ảnh đã upload */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200 p-1">
         <div className="relative">
           <img 
             src={previewUrl} 
             alt="X-Ray Analysis" 
             className="w-full h-auto object-contain" 
           />
           {/* Overlay hiệu ứng Visual */}
           <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
           <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-mono border border-white/20">
             MODEL: CNN-ResNet50
           </div>
         </div>
      </div>

      {/* Cột phải: Thông tin kết quả */}
      <div className="flex flex-col h-full">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 flex-grow">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <FileText className="text-slate-400" />
            <h2 className="text-lg font-semibold text-slate-700">Kết quả chẩn đoán</h2>
          </div>

          {/* Thẻ trạng thái: Màu Đỏ (Bệnh) hoặc Xanh (Bình thường) */}
          <div className={`text-center p-6 rounded-xl border-2 mb-6 ${
            result.severity === 'high' 
              ? 'bg-red-50 border-red-100 text-red-700' 
              : 'bg-green-50 border-green-100 text-green-700'
          }`}>
            <div className="flex justify-center mb-3">
              {result.severity === 'high' ? <AlertCircle size={48} /> : <CheckCircle size={48} />}
            </div>
            <h3 className="text-3xl font-bold mb-1">{result.labelVi}</h3>
            <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">{result.label}</p>
          </div>

          <div className="space-y-4">
            {/* Thanh độ tin cậy (Confidence Bar) */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1 text-slate-600">
                <span>Độ tin cậy (Confidence)</span>
                <span>{confidencePercent}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.severity === 'high' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${confidencePercent}%` }}
                ></div>
              </div>
            </div>

            {/* Chi tiết kết luận */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-1">Chi tiết:</p>
              <p className="text-slate-600 text-sm leading-relaxed">{result.details}</p>
            </div>
          </div>
        </div>

        {/* Nút Reset */}
        <button 
          onClick={onReset}
          className="w-full bg-white border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm"
        >
          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          Phân tích ảnh khác
        </button>
      </div>
    </div>
  );
};

export default ResultView;