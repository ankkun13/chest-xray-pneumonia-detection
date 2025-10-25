import React, { useState } from "react";
import UploadCard from "./UploadCard";
import "./index.css";

function App() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="app">
            <div className="overlay"></div>
            <img
                src="/logo.png"
                alt="AI Lab Logo"
                className="lab-logo"
                onClick={() => setShowModal(true)}
            />

            <UploadCard />
            <p className="footer">⚙️ AI Diagnostic System</p>
            {showModal && (
                <div className="modal-bg" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>🫁 Bệnh Viêm phổi</h2>
                        <p>
                            Viêm phổi là tình trạng viêm nhiễm và nhiễm trùng nhu mô phổi,
                            thường do vi khuẩn, virus hoặc nấm gây ra, làm cho các túi khí trong phổi
                            bị viêm và chứa đầy dịch mủ.
                            Các triệu chứng phổ biến bao gồm ho, sốt, khó thở, đau ngực, ớn lạnh và mệt mỏi.
                            <br /><br />
                            Bệnh có thể gặp ở mọi lứa tuổi, đặc biệt nguy hiểm hơn ở trẻ nhỏ, người lớn tuổi và
                            người mắc bệnh mạn tính hoặc suy giảm miễn dịch.
                            <br /><br />
                            Việc phát hiện sớm qua ảnh X-quang giúp chẩn đoán và điều trị kịp thời, giảm nguy cơ
                            biến chứng nặng hoặc tử vong.
                        </p>
                        <button className="close-btn" onClick={() => setShowModal(false)}>
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
