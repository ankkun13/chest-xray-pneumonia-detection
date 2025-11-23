import React from 'react';
import { Activity } from 'lucide-react';

const AnalyzingView: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto text-center py-20 animate-fade-in">
      {/* Loader Animation Circle */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <Activity className="absolute inset-0 m-auto text-blue-500 animate-pulse" size={40} />
      </div>

      {/* Text Content */}
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Đang phân tích hình ảnh...</h3>
      <p className="text-slate-500">Hệ thống đang quét các dấu hiệu tổn thương phổi.</p>

      {/* Progress Bar Animation */}
      <div className="mt-6 max-w-xs mx-auto bg-slate-200 rounded-full h-2 overflow-hidden">
        <div className="h-full bg-blue-500 animate-progress w-full origin-left"></div>
      </div>
    </div>
  );
};

export default AnalyzingView;