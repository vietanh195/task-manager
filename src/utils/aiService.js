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

// Không cần import GoogleGenerativeAI nữa để tránh lỗi SDK
// const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// export const analyzeTaskInput = async (inputText) => {
//   // 1. Kiểm tra Key
//   if (!API_KEY) {
//     console.error("❌ Chưa cấu hình API Key");
//     return null;
//   }

//   try {
//     const today = new Date();
    
//     // 2. Cấu trúc Prompt (Giữ nguyên logic cũ)
//     const prompt = `
//       Bạn là trợ lý JSON. Nhiệm vụ: chuyển đổi câu nói thành JSON.
//       Hiện tại: ${today.toLocaleString('vi-VN')} (Năm ${today.getFullYear()}).
      
//       Yêu cầu output: CHỈ TRẢ VỀ JSON HỢP LỆ, KHÔNG MARKDOWN.
//       Format:
//       {
//         "title": "Tên việc",
//         "description": "Chi tiết (có giờ nếu có)",
//         "deadline": "YYYY-MM-DD" (Nếu không có thì để ""),
//         "priority": "low" | "medium" | "high"
//       }

//       Input: "${inputText}"
//     `;

//     // 3. Gọi API trực tiếp bằng fetch (Bỏ qua SDK)
//     // Sử dụng model 'gemini-1.5-flash' vì nó nhanh và ổn định nhất hiện nay
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 { text: prompt }
//               ]
//             }
//           ]
//         }),
//       }
//     );

//     // 4. Xử lý kết quả trả về
//     if (!response.ok) {
//         const errorData = await response.json();
//         console.error("❌ API Error Details:", errorData);
//         throw new Error(`Lỗi API: ${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json();
    
//     // Kiểm tra xem có data không
//     if (!data.candidates || data.candidates.length === 0) {
//         throw new Error("Không có kết quả trả về từ AI");
//     }

//     const text = data.candidates[0].content.parts[0].text;
//     console.log("🤖 Raw AI Response:", text);

//     // 5. Lọc và Parse JSON (Logic cắt chuỗi)
//     const jsonStart = text.indexOf('{');
//     const jsonEnd = text.lastIndexOf('}') + 1;
    
//     if (jsonStart === -1 || jsonEnd === -1) {
//         // Fallback: Đôi khi AI trả về JSON ngon lành ngay từ đầu
//         return JSON.parse(text);
//     }
    
//     const jsonString = text.slice(jsonStart, jsonEnd);
//     return JSON.parse(jsonString);

//   } catch (error) {
//     console.error("❌ Lỗi xử lý AI:", error);
//     alert("Có lỗi khi gọi AI. Vui lòng kiểm tra Console (F12) để xem chi tiết.");
//     return null;
//   }
// };