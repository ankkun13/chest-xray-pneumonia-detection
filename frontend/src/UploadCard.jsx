import React, { useState } from "react";
import "./UploadCard.css";

export default function UploadCard() {
    const [image, setImage] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) previewImage(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) previewImage(file);
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleAnalyze = () => {
        if (!image) {
            alert("⚠️ Hãy chọn ảnh X-quang trước khi phân tích!");
            return;
        }
        alert("✅ Hệ thống đang phân tích ảnh...");
    };

    return (
        <div className="card">
            <h1>🫁 Phát hiện Viêm Phổi</h1>
            <p className="subtitle">
                Tải lên ảnh X-quang để hệ thống AI phân tích nguy cơ viêm phổi
            </p>

            <div
                className="upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
            >
                <p>
                    📤 Kéo & thả ảnh vào đây hoặc <span className="file-link">chọn file</span>
                </p>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleChange}
                />
            </div>

            <div className="scroll-area">
                {image && <img src={image} alt="Preview" className="preview" />}
                <button className="btn" onClick={handleAnalyze}>
                    🔍 Phân tích ảnh
                </button>
            </div>
        </div>
    );
}
