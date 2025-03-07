import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router để chuyển hướng
import { FashionAPIService } from '../services/fashion-api.service';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-fashion', 
  standalone: false,
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent {
  fashions: Fashion[] = []; // Danh sách Fashion từ API
  newFashion: Fashion = new Fashion(); // Đảm bảo đầy đủ trường khi tạo mới
  errMessage: string = '';

  constructor(private _service: FashionAPIService, private router: Router) { 
    this.loadFashions();
  }

  loadFashions() {
    this._service.getFashions().subscribe({
      next: (data: Fashion[]) => { this.fashions = data; },
      error: (err: any) => { this.errMessage = "Lỗi tải danh sách Fashion: " + err; }
    });
  }

  viewDetails(id: string) {
    console.log("Chuyển hướng đến ID:", id);
    this.router.navigate(['/fashion', id]); 
  }

  addFashion() {
    if (!this.newFashion.fashion_subject || !this.newFashion.style || !this.newFashion.fashion_detail) {
      this.errMessage = "Vui lòng nhập đầy đủ thông tin!";
      return;
    }
    
    this.newFashion.created_at = new Date(); // Bổ sung ngày tạo mới

    this._service.postFashion(this.newFashion).subscribe({
      next: (data: Fashion) => {
        this.fashions.push(data); // Thêm vào danh sách hiển thị trên UI
        this.newFashion = new Fashion(); // Reset form nhập liệu
      },
      error: (err: any) => { 
        this.errMessage = "Lỗi khi thêm Fashion: " + err; 
      }      
    });
  }

  deleteFashion(id: string) {
    if (!id) {
      this.errMessage = "ID không hợp lệ!";
      return;
    }
  
    if (confirm('Bạn có chắc muốn xoá Fashion này không?')) {
      this._service.deleteFashion(id).subscribe({
        next: (res: any) => {
          alert(res.message); // Hiển thị thông báo xoá thành công
          this.fashions = this.fashions.filter(fashion => fashion._id !== id); // Cập nhật UI
        },
        error: (err: any) => {
          console.error("Lỗi khi xoá:", err);
          this.errMessage = err.message || "Không thể xoá Fashion!";
        }
      });
    }
  }
  
}
