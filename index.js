const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/images', async (req, res) => {
  try {
    // Gửi yêu cầu đến trang Chợ Tốt
    const response = await axios.get('https://www.chotot.com/mua-ban-dien-thoai');
    const html = response.data;

    // Sử dụng cheerio để phân tích HTML
    const $ = cheerio.load(html);
    const imageUrls = [];

    // Lấy tất cả thẻ <img> và trích xuất URL hình ảnh
    $('img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imageUrls.push(src);
      }
    });

    // Trả về danh sách URL hình ảnh
    res.json({ images: imageUrls });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Error fetching images');
  }
});

// Cấu hình server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
