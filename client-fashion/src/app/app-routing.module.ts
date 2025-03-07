import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

const routes: Routes = [
  { path: '', component: FashionListComponent }, // Trang danh sách Fashion
  { path: 'fashion-detail/:id', component: FashionDetailComponent } // Trang chi tiết Fashion
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
