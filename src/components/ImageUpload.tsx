import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onUpload: (file: File) => Promise<any> | void;
};

export default function ImageUpload({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const processFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0] || null;
    processFile(f);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    setError(null);
    const f = e.dataTransfer.files?.[0] || null;
    processFile(f);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inputRef.current?.click();
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      setError("Choose an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await onUpload(file);
      // Navigate to Result page with the analysis data
      navigate('/result', {
        state: {
          diagnosis: res.diagnosis,
          probability: res.probability,
          originalImage: previewUrl,
          gradcamImage: res.gradcamImage
        }
      });
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🫁 Phát hiện Viêm Phổi</h1>
      <p className="text-gray-500 mb-6">Tải lên ảnh X-quang để hệ thống phân tích nguy cơ viêm phổi</p>

      <div
        role="button"
        tabIndex={0}
        className={`border-2 border-dashed border-gray-300 rounded-xl p-6 mb-6 cursor-pointer hover:bg-gray-50 transition-colors ${isDragging ? 'bg-gray-100 border-blue-500' : ''}`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
        />
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Upload image icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <p className="text-gray-600">Kéo & thả ảnh vào đây hoặc <span className="text-blue-600 font-semibold">chọn file</span></p>
        </div>
      </div>

      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 object-contain rounded" />
        </div>
      )}

      <button
        onClick={handleUploadClick}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? "Đang phân tích..." : "🔍 Phân tích ảnh"}
      </button>

      <div className={`mt-6 p-4 rounded-xl border text-left ${!error && !result ? "hidden" : ""}`}>
        <h2 className="font-bold text-lg">Kết quả phân tích</h2>
        {error && <p className="mt-2 text-red-600">{error}</p>}
        {result && <p id="resultText" className="mt-2">{typeof result === "string" ? result : JSON.stringify(result)}</p>}
      </div>
    </div>
  );
}