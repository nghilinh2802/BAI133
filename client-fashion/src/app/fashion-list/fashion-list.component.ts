import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashionService } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.component.html',
  styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {
  fashions: any[] = [];
  filteredFashions: any[] = [];
  uniqueStyles: string[] = [];
  selectedStyle: string = '';

  constructor(private fashionService: FashionService, private router: Router) {}

  ngOnInit(): void {
    this.fashionService.getFashions().subscribe(data => {
      this.fashions = data;
      this.filteredFashions = data;
      this.getUniqueStyles();
    });
  }

  getUniqueStyles(): void {
    this.uniqueStyles = [...new Set(this.fashions.map(f => f.style))];
  }

  filterByStyle(): void {
    if (this.selectedStyle) {
      this.filteredFashions = this.fashions.filter(f => f.style === this.selectedStyle);
    } else {
      this.filteredFashions = this.fashions;
    }
  }

  viewDetail(fashionId: string): void {
    this.router.navigate(['/fashion-detail', fashionId]);
  }
}
