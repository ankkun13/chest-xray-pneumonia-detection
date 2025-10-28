import { useState } from 'react';

interface ResultProps {
  diagnosis: string;
  probability: number;
  originalImage: string;
  gradcamImage: string;
}

export default function Result({ diagnosis, probability, originalImage, gradcamImage }: ResultProps) {
  const [showGradcam, setShowGradcam] = useState(false);

  const getDiagnosisColor = (prob: number) => {
    if (prob >= 0.7) return 'text-red-600';
    if (prob >= 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Diagnosis Result */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Kết Quả Chẩn Đoán</h2>
          <p className={`text-xl font-semibold ${getDiagnosisColor(probability)}`}>
            {diagnosis}
          </p>
          <p className="text-lg mt-2">
            Độ tin cậy: <span className="font-bold">{(probability * 100).toFixed(2)}%</span>
          </p>
        </div>

        {/* Image Display */}
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setShowGradcam(false)}
              className={`px-4 py-2 rounded-lg ${!showGradcam ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Ảnh Gốc
            </button>
            <button
              onClick={() => setShowGradcam(true)}
              className={`px-4 py-2 rounded-lg ${showGradcam ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Grad-CAM
            </button>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto">
            <img
              src={showGradcam ? gradcamImage : originalImage}
              alt={showGradcam ? "Grad-CAM visualization" : "X-ray image"}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Lưu ý:</h3>
          <p className="text-sm text-gray-600">
            Kết quả này chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ để có chẩn đoán chính xác.
          </p>
        </div>
      </div>
    </div>
  );
}