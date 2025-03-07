import { Component, OnInit } from '@angular/core';
import { FashionService } from './services/fashion.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-fashion';
  fashions: any[] = [];
  errMessage: string = '';

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.getFashions();
  }

  getFashions() {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        console.log("Dữ liệu nhận được:", data);
        this.fashions = data;
      },
      error: (err) => {
        console.error("Lỗi khi lấy danh sách Fashion:", err);
        this.errMessage = "Không thể tải danh sách Fashion.";
      }
    });
  }
}
