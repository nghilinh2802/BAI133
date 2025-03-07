import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionAPIService } from '../services/fashion-api.service';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-fashion-edit',
  standalone: false,
  templateUrl: './fashion-edit.component.html',
  styleUrls: ['./fashion-edit.component.css']
})
export class FashionEditComponent {
  fashion: Fashion = new Fashion();
  errMessage: string = '';
  id: string = '';
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
  

  constructor(private fashionService: FashionAPIService, public router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getFashion(this.id);
      } else {
        window.alert('ID không hợp lệ!');
        this.router.navigate(['/fashions']);
      }
    });
  }

  getFashion(fashionId: string) {
    this.fashionService.getFashion(fashionId).subscribe({
      next: (data) => { this.fashion = data; },
      error: (err) => { this.errMessage = err; }
    });
  }

  updateFashion() {
    console.log("Dữ liệu trước khi cập nhật:", this.fashion);

    if (!this.fashion._id) {
      this.errMessage = "Fashion ID không hợp lệ!";
      return;
    }

    this.fashionService.updateFashion(this.fashion._id, this.fashion).subscribe({
      next: () => {
        window.alert('Cập nhật thành công!');
        this.router.navigate(['/fashion']);
      },
      error: (err) => {
        console.error("Lỗi khi cập nhật Fashion:", err);
        this.errMessage = "Lỗi khi cập nhật Fashion!";
      }
    });
  }

  onFileSelected(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
        this.fashion.fashion_image = reader.result as string;
    };

    reader.onerror = (error) => {
        console.error("Lỗi khi tải ảnh:", error);
    };

    reader.readAsDataURL(file);
  }
}
