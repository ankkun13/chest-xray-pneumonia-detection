const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const fileText = document.getElementById('fileText');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');

// Mở hộp chọn file khi bấm chữ “chọn file”
fileText.addEventListener('click', () => fileInput.click());

// Drag & Drop
uploadBox.addEventListener('dragover', e => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) showPreview(file);
});

// Khi chọn file thủ công
fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) showPreview(file);
});

// Hiển thị preview ảnh
function showPreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Nút phân tích
analyzeBtn.addEventListener('click', () => {
    if (!previewImg.src) {
        alert('⚠️ Hãy chọn hoặc kéo thả ảnh X-quang trước khi phân tích!');
        return;
    }

    analyzeBtn.textContent = '⏳ Đang phân tích...';
    analyzeBtn.disabled = true;

    // Giả lập xử lý ảnh
    setTimeout(() => {
        alert('✅ Ảnh đã được tải lên thành công!\nHệ thống sẵn sàng phân tích.');
        analyzeBtn.textContent = '🔍 Phân tích ảnh';
        analyzeBtn.disabled = false;
    }, 1500);
});
