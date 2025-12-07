# 🤖 Báo cáo Bài tập nhóm Môn Trí tuệ Nhân tạo

**📋 Thông tin:**

* **📚 Môn học:** MAT3508 - Nhập môn Trí tuệ Nhân tạo  
* **📅 Học kỳ:** Học kỳ 1 - 2025-2026  
* **🏫 Trường:** VNU-HUS (Đại học Quốc gia Hà Nội - Trường Đại học Khoa học Tự nhiên)  
* **📝 Tiêu đề:** PHÁT HIỆN VIÊM PHỔI TỪ ẢNH X-QUANG
* **📅 Ngày nộp:** 30/11/2025  
* **📄 Báo cáo PDF:** 📄 [Liên kết báo cáo](https://github.com/ankkun13/bao-cao-cuoi-ki-introAI)  
* **🖥️ Slide thuyết trình:** 🖥️ [Liên kết Slide](https://github.com/ankkun13/bao-cao-cuoi-ki-introAI)  
* **📂 Kho lưu trữ:** 📁 https://github.com/ankkun13/chest-xray-pneumonia-detection

**👥 Thành viên nhóm:**


| 👤 Name           | 🆔 Student ID        | 🐙 GitHub Username   | 🛠️ Contribution |
|------------------|---------------------|---------------------|----------------------|
| Nguyễn Hữu An | 23001493 | ankkun13 | Xây dựng Demo, Xây dựng mô hình |
| Nguyễn Tiến Đạt   | 23001515 | tiendat228 | Thiết kế Slide, Làm báo cáo, Tìm hiểu cơ sở lý thuyết |
| Nguyễn Văn Dũng  | 23001508 | NguyenDung2301 | Xây dựng mô hình, Xây dựng Demo, Triển khai và đánh giá |
| Vũ Đức Quý  | 23001553 | VUDUCQUY |  Xây dựng mô hình, Thiết kế Slide, Nêu vấn đề, bài toán, thách thức |

---
## 📑 Tổng quan cấu trúc báo cáo

### Chương 1: Giới thiệu
**📝 Tóm tắt dự án**
   - ✨ Mục tiêu: Xây dựng một hệ thống hỗ trợ chẩn đoán (CAD) tự động để phát hiện bệnh viêm phổi từ ảnh X-quang lồng ngực sử dụng mô hình Học sâu (Deep Learning).
   - Giải pháp: Nhóm nghiên cứu tự thiết kế và cài đặt lại kiến trúc mạng DenseNet (Densely Connected Convolutional Networks) trên nền tảng PyTorch để tối ưu hóa cho dữ liệu ảnh y tế.
   - Kết quả nổi bật: Mô hình đạt độ chính xác 97.27%, độ nhạy (Recall) 97.27% và chỉ số AUC là 0.9956 trên tập kiểm thử độc lập.

**❓ Bài toán đặt ra**
   - 📌 Bối cảnh: Viêm phổi là nguyên nhân gây tử vong hàng đầu ở trẻ em dưới 5 tuổi. Phương pháp chẩn đoán phổ biến là X-quang phổi, nhưng việc đọc phim phụ thuộc nhiều vào kinh nghiệm bác sĩ và dễ xảy ra sai sót do quá tải công việc.
   - Thách thức: Các dấu hiệu tổn thương trên phim X-quang thường có độ tương phản thấp, ranh giới không rõ ràng và dễ bị che khuất bởi xương sườn hoặc bóng tim. Ngoài ra, dữ liệu y tế thường gặp vấn đề mất cân bằng nghiêm trọng giữa các lớp bệnh và bình thường.
   - Ý nghĩa: Hệ thống đóng vai trò như "trợ lý ảo" giúp sàng lọc nhanh, giảm tải áp lực cho hệ thống y tế và hỗ trợ bác sĩ tại các vùng thiếu nhân lực.

### Chương 2: Phương pháp & Triển khai
**⚙️ Phương pháp**
   - 🔍 Cơ sở lý thuyết: Sử dụng Mạng Nơ-ron Tích chập (CNN), cụ thể là kiến trúc DenseNet. Khác với VGG hay ResNet, DenseNet sử dụng cơ chế kết nối dày đặc và ghép nối (concatenation) các bản đồ đặc trưng, giúp giải quyết vấn đề biến mất đạo hàm và tái sử dụng đặc trưng hiệu quả.
   - Dữ liệu: Sử dụng bộ dữ liệu "Chest X-Ray Images (Pneumonia)" từ Kaggle gồm 5,856 ảnh (chia thành 2 lớp: Normal và Pneumonia). Dữ liệu được chia theo tỷ lệ 80% Train - 10% Validation - 10% Test.
   - Xử lý mất cân bằng: Áp dụng kỹ thuật Lấy mẫu ngẫu nhiên có trọng số (Weighted Random Sampler) để ép buộc mô hình học công bằng giữa các lớp, khắc phục tình trạng dữ liệu bệnh nhiều gấp 3 lần dữ liệu thường.

**💻 Triển khai**
   - 🧩 Tiền xử lý:
      - Đồng bộ kích thước ảnh về $224 \times 224$ pixels.
      - Chuyển đổi sang ảnh xám (Grayscale) và chuẩn hóa dữ liệu.
      - Tăng cường dữ liệu (Data Augmentation) cho tập Train: xoay ngẫu nhiên $\pm 10^{\circ}$, lật ngang, thay đổi độ tương phản.
   - Kiến trúc mô hình: DenseNet tùy chỉnh với 4 khối Dense Block, sử dụng Growth Rate $k=32$, và các lớp chuyển tiếp (Transition Layers) để nén mô hình.
   - Cấu hình huấn luyện:
      - Framework: PyTorch.
      - Phần cứng: GPU NVIDIA Tesla T4 trên Google Colab.
      - Siêu tham số: Optimizer Adam (LR $= 0.001$), Loss function CrossEntropy, 100 Epochs, Batch size 32.

### Chương 3: Kết quả & Phân tích
**📊 Kết quả & Thảo luận**
   - 📈 Chỉ số đánh giá:
      - Accuracy: $97.27%$ - Dự đoán đúng gần như tuyệt đối trên tập test.
      - Recall: $97.27%$ - Tỷ lệ bỏ sót bệnh cực thấp, phù hợp cho sàng lọc y tế.
      - Precision: $97.29%$ - Ít báo động giả.
      - AUC: $0.9956$ - Khả năng phân tách tuyệt vời giữa hai lớp.
   - So sánh mô hình: DenseNet vượt trội hơn VGGNet ($96.59%$) và có hiệu năng tương đương ResNet ($97.61%$) nhưng ưu việt hơn về hiệu quả tham số và tài nguyên tính toán.
   - Ưu điểm: Khắc phục tốt hiện tượng quá khớp (Overfitting) nhờ kỹ thuật Weight Decay và Augmentation.
   - Hạn chế: Kích thước đầu vào $224 \times 224$ làm mất chi tiết nhỏ; mô hình mới chỉ dừng lại ở phân loại nhị phân (Bình thường vs. Viêm phổi).
### Chương 4: Kết luận
**✅ Kết luận & Hướng phát triển**
   - 🔭 Tổng kết: Đồ án đã xây dựng thành công mô hình Deep Learning có độ tin cậy cao, chứng minh tính hiệu quả của kiến trúc DenseNet đối với dữ liệu y tế nhỏ và mất cân bằng.
   - Hướng phát triển:
      - Nâng cao chất lượng đầu vào (kích thước $512 \times 512$) và thử nghiệm kiến trúc Vision Transformer (ViT).
      - Mở rộng bài toán sang phân loại đa lớp (Vi khuẩn, Virus, Nấm) và phân đoạn vùng tổn thương (Segmentation) để đo diện tích vùng viêm.
      - Triển khai ứng dụng Web/Mobile App và tích hợp chuẩn DICOM/PACS.

### Tài liệu tham khảo & Phụ lục
**📚 Tài liệu tham khảo**
   - [1] [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) - Kaiming He et al. (2015).

   - [2] [Densely Connected Convolutional Networks](https://arxiv.org/abs/1608.06993) - Gao Huang et al. (2018).

   - [3] [Identifying Medical Diagnoses and Treatable Diseases by Image-Based Deep Learning](https://www.sciencedirect.com/science/article/pii/S0092867418301545) - Daniel S. Kermany et al. (2018). Cell 172.5.

   - [4] [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980) - Diederik P. Kingma and Jimmy Ba (2017).

   - [5] [PyTorch: An Imperative Style, High-Performance Deep Learning Library](https://arxiv.org/abs/1912.01703) - Adam Paszke et al. (2019).
   
   - [6] [Very Deep Convolutional Networks for Large-Scale Image Recognition](https://arxiv.org/abs/1409.1556) - Karen Simonyan and Andrew Zisserman (2015).

   - [7] [Pneumonia in Children](https://www.who.int/news-room/fact-sheets/detail/pneumonia) - World Health Organization (2019).
**📎 Phụ lục** *(Tùy chọn)*
   - 📎 Kết quả bổ sung, đoạn mã hoặc hướng dẫn sử dụng

---

