import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionComponent } from './fashion/fashion.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
import { FashionAddComponent } from './fashion-add/fashion-add.component';
import { FashionEditComponent } from './fashion-edit/fashion-edit.component';

const routes: Routes = [
  { path: '', component: FashionComponent }, // ✅ Trang danh sách Fashion
  { path: 'fashion/:id', component: FashionDetailComponent }, // ✅ Trang chi tiết Fashion
  { path: 'add-fashion', component: FashionAddComponent }, // ✅ Trang thêm mới
  { path: 'fashion', component: FashionComponent }, // Add this route if it's missing
  { path: 'edit/:id', component: FashionEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
