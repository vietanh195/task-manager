import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = import.meta.env.REACT_APP_GEMINI_API_KEY;
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY)

export const analyzeTaskInput = async (inputText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const today = new Date();
        const currentTime = today.toLocaleString('vi-VN');

        const prompt = `
            Bạn là trợ lý JSON chuyên nghiệp. Nhiệm vụ duy nhất: chuyển đổi câu nói tự nhiên thành JSON.
            
            Thông tin ngữ cảnh:
            - Thời gian hiện tại: ${today.toLocaleString('vi-VN')} (Thứ ${today.getDay() + 1}).
            - Năm hiện tại: ${today.getFullYear()}.
            
            Yêu cầu output:
            - Chỉ trả về chuỗi JSON hợp lệ. Không markdown, không giải thích, không lời dẫn.
            - Format JSON:
            {
                "title": "Tên ngắn gọn của công việc",
                "description": "Chi tiết (bao gồm giờ cụ thể nếu có)",
                "deadline": "YYYY-MM-DD" (Nếu không nhắc đến ngày, để chuỗi rỗng ""),
                "priority": "low" | "medium" | "high" (Mặc định medium, nếu có từ 'gấp', 'quan trọng' -> high)
            }

            Input: "${inputText}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanText = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Error analyzing task input:", error);
        return null;
    }
}