import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fashionService: FashionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashionById(id).subscribe(data => {
        this.fashion = data;
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
