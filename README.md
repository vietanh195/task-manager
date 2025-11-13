# 🧠 Task Manager

Một ứng dụng quản lý công việc đơn giản, được xây dựng bằng React + Tailwind CSS.

## ⚙️ Tính năng
- Thêm, xóa, đánh dấu hoàn thành task
- Sắp xếp theo ngày tạo hoặc deadline
- Lưu dữ liệu vào LocalStorage
- Giao diện tối giản, hiện đại

## 🗂️ Cấu trúc
- `hooks/useTasks.js`: Quản lý state & localStorage
- `components/`: Giao diện tách nhỏ (Input, List, Item)
- `utils/sortTasks.js`: Xử lý sắp xếp
- `pages/Home.jsx`: Trang chính

## 🚀 Cách chạy
```bash
npm install
npm start
