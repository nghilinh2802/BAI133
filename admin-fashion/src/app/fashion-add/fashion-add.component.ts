import { Component } from '@angular/core';
import { FashionAPIService } from '../services/fashion-api.service';  // Đảm bảo đường dẫn đúng
import { Fashion } from '../fashion';  // Import đúng model Fashion
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-add',
  standalone: false,
  templateUrl: './fashion-add.component.html',
  styleUrls: ['./fashion-add.component.css']
})
export class FashionAddComponent {
  fashion: Fashion = new Fashion();  // Khởi tạo đối tượng để tránh lỗi 'undefined'
  errMessage: string = '';
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],  // Chữ đậm, nghiêng, gạch chân, gạch ngang
      [{ 'header': [1, 2, 3, false] }],           // Cỡ chữ
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // Danh sách
      [{ 'align': [] }],                         // Canh lề
      ['link', 'image', 'video'],                // Thêm link, hình ảnh, video
      ['clean']                                  // Xóa định dạng
    ]
  };
  

  constructor(private _service: FashionAPIService, private _router: Router) {}

  // 🟢 Xử lý khi chọn ảnh
  onFileSelected(event: any) { 
    let file = event.target.files[0];
    let reader = new FileReader();
    
    reader.onload = () => { 
      if (this.fashion) {
        this.fashion.fashion_image = reader.result!.toString(); 
      }
    }; 

    reader.onerror = (error) => { 
      console.error('Lỗi khi đọc file:', error); 
    };

    reader.readAsDataURL(file);
  }
  
  // 🟢 Hàm thêm Fashion
  postFashion() {
    console.log("Dữ liệu trước khi gửi:", this.fashion);

    // Kiểm tra dữ liệu đầu vào
    if (!this.fashion.style || !this.fashion.fashion_subject || !this.fashion.fashion_detail) {
        this.invalidFashion();
        return;
    }

    this.fashion.created_at = new Date(); // Đảm bảo có ngày tạo

    this._service.postFashion(this.fashion).subscribe({
        next: (data: any) => {  
            console.log("Fashion đã thêm thành công:", data);
            window.alert('Thêm Fashion thành công!');

            // ✅ Reset form
            this.fashion = new Fashion();  

            // ✅ Điều hướng ngay lập tức mà không cần setTimeout()
            this._router.navigate(['/fashion']).then(() => {
                window.location.reload(); // 🔥 Đảm bảo trang được làm mới
            });
        },
        error: (err: any) => {  
            console.error("Lỗi khi thêm Fashion:", err);
            this.errMessage = "Lỗi khi thêm Fashion: " + err.message; 
        }
    });
}


  // ❌ Xử lý khi dữ liệu không hợp lệ
  invalidFashion() {
    this.errMessage = 'Dữ liệu không hợp lệ. Vui lòng nhập đủ thông tin!';
  }

  // ✅ Hiển thị thông báo thành công và quay về danh sách
  success() {
    window.alert('Thêm Fashion thành công!');
    
    // Reset form
    this.fashion = new Fashion();  

    // ✅ Chuyển hướng về danh sách Fashion sau khi thêm thành công
    setTimeout(() => {
      this._router.navigate(['/fashion']);
    }, 1000); // Chờ 1 giây rồi chuyển trang
  }

    // 🟢 Quay lại trang danh sách Fashion
    goBack() {
      this._router.navigate(['/fashion']);
    }
  }
  


