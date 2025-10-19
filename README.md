# 🏷️ Tên nhóm
Nhóm 19

# 📝 Tên dự án
Phát hiện viêm phổi từ ảnh X-quang 

# 👥 Thành viên nhóm
| 👤 Họ và tên    | 🧑‍🎓 Mã sinh viên | 🐙 Tên GitHub  |
| --------------- | ------------------ | -------------- |
| Nguyễn Hữu An   | 23001493           | ankkun13       |
| Nguyễn Tiến Đạt | 23001508           | tiendat228     |
| Nguyễn Văn Dũng | 23001508           | NguyenDung2301 |
| Vũ Đức Quý      | 23001553           | VUDUCQUY       |

# 🗒️ Tóm tắt
Dự án nhằm xây dựng mô hình học sâu để nhận diện viêm phổi từ ảnh X-quang. Chúng tôi sử dụng bộ dữ liệu từ Kaggle gồm ảnh phổi bình thường và viêm phổi, tiến hành tiền xử lý, huấn luyện mô hình CNN, đánh giá và so sánh hiệu năng giữa các kiến trúc mạng khác nhau.

# 🎯 Bối cảnh
- Viêm phổi là bệnh lý hô hấp nguy hiểm, nếu phát hiện muộn có thể dẫn đến biến chứng nặng hoặc tử vong.  
- Trong nhiều vùng, bác sĩ và thiết bị chẩn đoán còn hạn chế, do đó ứng dụng AI hỗ trợ phân tích ảnh X-quang có thể giúp chẩn đoán nhanh và chính xác hơn.  
- Ảnh X-quang dễ thu thập hơn CT scan, vì vậy mô hình AI nếu hoạt động tốt sẽ có tính ứng dụng rộng rãi.

# 🚀 Kế hoạch
1. **Thu thập & tiền xử lý dữ liệu  
   - Dataset “Chest X-Ray Images (Pneumonia)” từ Kaggle .  
   -  Resize, chuẩn hóa, tăng cường dữ liệu (data augmentation). 
   - Chia tập huấn luyện hợp lý.

2. **Xây dựng mô hình và huấn luyện**
   - Thử nghiệm các CNN: VGG, ResNet, DenseNet, MobileNet, EfficientNet.  
   - Fine-tuning, transfer learning, thử nghiệm ensemble. 
   - Huấn luyện mô hình, theo dõi loss & accuracy.

3. **Đánh  giá mô hình và tinh chỉnh**  
   - Huấn luyện mô hình, theo dõi loss & accuracy trên tập validation.  
   - Tối ưu siêu tham số (learning rate, batch size, dropout…).  
   - Chỉ số: Accuracy, Precision, Recall, F1, AUC-ROC.  
   - So sánh các mô hình khác nhau. 

4. **Triển khai & Demo**  
   - Web/app nhỏ cho phép tải ảnh X-quang và dự đoán.  
   - Minh họa vùng mô hình chú ý bằng Grad-CAM.  

5. **Phân tích hạn chế & cải tiến**  
   - Kiểm tra nhạy cảm với sai phân loại (đặc biệt false negative).  
   - Xem xét khả năng tổng quát trên dữ liệu ngoài tập huấn luyện.  

# 📚 Tài liệu tham khảo
- Dataset: [Chest X-Ray Images (Pneumonia) - Kaggle](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)  
- Rajpurkar, P. et al. *CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning*. [arXiv:1711.05225](https://arxiv.org/abs/1711.05225)  
- Mabrouk, A. et al. *Pneumonia Detection on chest X-ray images Using Ensemble of Deep Convolutional Neural Networks*. [arXiv:2312.07965](https://arxiv.org/abs/2312.07965)  
- Wang, X. et al. *ChestX-ray8: Hospital-scale Chest X-ray Database and Benchmarks*. [arXiv:1705.02315](https://arxiv.org/abs/1705.02315)  
- Frameworks: TensorFlow/Keras, PyTorch, scikit-learn, OpenCV, matplotlib, Grad-CAM.
