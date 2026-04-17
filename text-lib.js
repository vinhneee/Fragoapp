// ================= DỮ LIỆU FRANCHISE =================
const formQuestion = {
    user: {
        questions: [
            "1. Mức vốn đầu tư ban đầu bạn sẵn sàng bỏ ra là bao nhiêu?",
            "2. Bạn quan tâm đến lĩnh vực nào?",
            "3. Bạn muốn mô hình kinh doanh của mình hoạt động trong không gian nào?",
            "4. Thời gian bạn có thể dành để quản lý mô hình mỗi ngày?",
            "5. Bạn mong muốn mức độ hỗ trợ từ thương hiệu nhượng quyền ra sao?",
            "6. Bạn ưu tiên yếu tố nào nhất khi chọn franchise?",
            "7. Thị trường bạn muốn hướng tới chủ yếu là:",
            "8. Bạn sẵn sàng ký hợp đồng nhượng quyền trong thời hạn bao lâu?"
        ],
        answers: [
            ["Dưới 200 triệu VNĐ", "200 – 500 triệu VNĐ", "500 triệu – 1 tỷ VNĐ", "Trên 1 tỷ VNĐ"],
            ["🍔 Thực phẩm & Đồ uống",
            "👕 Thời trang",
            "💄 Mỹ phẩm & Làm đẹp",
            "🏋️‍♂️ Thể thao & Fitness",
            "📚 Giáo dục & Đào tạo",
            "🏠 Nội thất & Trang trí",
            "💻 Công nghệ & Điện tử",
            "🏨 Khách sạn & Du lịch",
            "🚗 Ô tô & Xe máy",
            "🛠 Dịch vụ sửa chữa",
            "🎮 Giải trí & Game",
            "📦 Logistics & Vận chuyển",
            "🌱 Nông nghiệp & Sản phẩm xanh",
            "🐾 Thú cưng & Dịch vụ thú y",
            "🛒 Bán lẻ & Cửa hàng tiện lợi",
            "⚕️ Y tế & Chăm sóc sức khỏe",
            "💼 Dịch vụ văn phòng",
            "🎨 Nghệ thuật & Thủ công"
            ],
            ["Offline", "Kết hợp Online + Offline", "Hoàn toàn Online"],
            ["Toàn thời gian", "Bán thời gian", "Quản lý từ xa"],
            ["Hỗ trợ toàn diện", "Hỗ trợ cơ bản", "Tự chủ nhiều"],
            ["Lợi nhuận cao", "Ít rủi ro", "Hoàn vốn nhanh", "Tự do sáng tạo", "Uy tín thương hiệu"],
            ["Khu dân cư", "Khu du lịch", "Khu trường học - văn phòng", "Nông thôn"],
            ["Dưới 1 năm", "1 – 3 năm", "3 – 5 năm", "Trên 5 năm"]
        ]
    },
    supplier: {
        questions: [
            "1. Bạn mong muốn đối tác có mức vốn tối thiểu là bao nhiêu?",
            "2. Đối tác nên có kinh nghiệm trong lĩnh vực nào?",
            "3. Địa điểm kinh doanh mà bạn ưu tiên cho franchise là:",
            "4. Mức độ cam kết quản lý trực tiếp của đối tác:",
            "5. Yêu cầu kỹ năng của đối tác:",
            "6. Mức phí nhượng quyền bạn muốn áp dụng cho đối tác:",
            "7. Thời gian hợp đồng nhượng quyền tối thiểu mà bạn yêu cầu:",
            "8. Bạn mong muốn đối tác thuộc nhóm nào?"
        ],
        answers: [
            ["Dưới 200 triệu VNĐ", "200 – 500 triệu VNĐ", "500 triệu – 1 tỷ VNĐ", "Trên 1 tỷ VNĐ"],
            ["🍔 Thực phẩm & Đồ uống",
            "👕 Thời trang",
            "💄 Mỹ phẩm & Làm đẹp",
            "🏋️‍♂️ Thể thao & Fitness",
            "📚 Giáo dục & Đào tạo",
            "🏠 Nội thất & Trang trí",
            "💻 Công nghệ & Điện tử",
            "🏨 Khách sạn & Du lịch",
            "🚗 Ô tô & Xe máy",
            "🛠 Dịch vụ sửa chữa",
            "🎮 Giải trí & Game",
            "📦 Logistics & Vận chuyển",
            "🌱 Nông nghiệp & Sản phẩm xanh",
            "🐾 Thú cưng & Dịch vụ thú y",
            "🛒 Bán lẻ & Cửa hàng tiện lợi",
            "⚕️ Y tế & Chăm sóc sức khỏe",
            "💼 Dịch vụ văn phòng",
            "🎨 Nghệ thuật & Thủ công"
            ],
            ["Khu dân cư", "Khu du lịch", "Khu trường học - văn phòng", "Nông thôn", "Không giới hạn"],
            ["Toàn thời gian", "Bán thời gian", "Quản lý từ xa", "Không yêu cầu"],
            ["Quản lý nhân sự", "Bán hàng & CSKH", "Marketing cơ bản", "Không yêu cầu"],
            ["Dưới 50 triệu VNĐ", "50 – 100 triệu VNĐ", "100 – 300 triệu VNĐ", "Trên 300 triệu VNĐ"],
            ["1 năm", "2 – 3 năm", "3 – 5 năm", "Trên 5 năm"],
            ["Cá nhân", "Hộ kinh doanh", "Doanh nghiệp vừa & nhỏ", "Doanh nghiệp lớn"]
        ]
    }
};

formQuestion.user.questions.forEach((question, qIndex) => {
    // Gán câu hỏi
    const qEl = document.getElementById(`us-q${qIndex + 1}`);
    if (qEl) qEl.innerText = question;

    // Duyệt các câu trả lời của câu hỏi đó
    formQuestion.user.answers[qIndex].forEach((answer, aIndex) => {
        const aEl = document.getElementById(`us-a${qIndex + 1}-ch${aIndex + 1}`);
        if (aEl) aEl.innerText = answer;
    });
});

storedData.supplier.questions.forEach((question, qIndex) => {
    // Gán câu hỏi
    const qEl = document.getElementById(`su-q${qIndex + 1}`);
    if (qEl) qEl.innerText = question;

    // Duyệt các câu trả lời
    storedData.supplier.answers[qIndex].forEach((answer, aIndex) => {
        const aEl = document.getElementById(`su-a${qIndex + 1}-ch${aIndex + 1}`);
        if (aEl) aEl.innerText = answer;
    });
});

function getSelectedValue(groupId) {
  const group = document.getElementById(groupId);
  const selected = group.querySelector('.option.selected');
  return selected ? selected.value : null;
}

function getFormData(x) {
    const fullName = document.getElementById('fullName').value;
    const gender = document.getElementById('gender').value;
    const birthday = document.getElementById('birthday').value;
    if (x===0) {}
}
