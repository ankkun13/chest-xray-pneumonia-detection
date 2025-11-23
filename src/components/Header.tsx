import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600">
          <Activity size={28} />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Chest X-Ray AI</h1>
        </div>
        <div className="text-sm text-slate-500 font-medium hidden sm:block">
          Hệ thống hỗ trợ chẩn đoán viêm phổi
        </div>
      </div>
    </header>
  );
};

export default Header;