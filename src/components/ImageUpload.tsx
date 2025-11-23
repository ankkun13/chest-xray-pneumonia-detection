import React from 'react';
import { Upload, Activity, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';

interface UploadViewProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  previewUrl: string | null;
  onAnalyze: () => void;
  onClear: () => void;
}

const UploadView: React.FC<UploadViewProps> = ({ 
  onImageSelect, 
  selectedImage, 
  previewUrl, 
  onAnalyze, 
  onClear 
}) => {
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onImageSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelect(file);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Tải lên ảnh X-quang</h2>
        <p className="text-slate-500">Hệ thống sử dụng Deep Learning để phân tích và phát hiện dấu hiệu viêm phổi.</p>
      </div>

      <div 
        className={`bg-white rounded-2xl border-2 border-dashed transition-all duration-300 p-10 text-center
          ${previewUrl ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!previewUrl ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <Upload size={32} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-700">Kéo thả ảnh vào đây</p>
              <p className="text-sm text-slate-500 mt-1">hoặc</p>
            </div>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-200">
              Chọn ảnh từ máy
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            <p className="text-xs text-slate-400 mt-4">Hỗ trợ: JPG, PNG, DICOM (giả lập)</p>
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-80 rounded-lg shadow-md object-contain bg-black" 
            />
            <button 
              onClick={onClear}
              className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full hover:bg-red-50 shadow-sm transition-colors"
              title="Xóa ảnh"
            >
              <RefreshCw size={18} />
            </button>
            <div className="mt-4 flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-4 py-2 rounded-full">
              <CheckCircle size={16} />
              <span>Đã tải ảnh lên thành công</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onAnalyze}
          disabled={!selectedImage}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all transform duration-200
            ${selectedImage 
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <Activity size={24} />
          Phân tích ngay
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default UploadView;