import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Cách mới
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ Thêm RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FashionComponent } from './fashion/fashion.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
import { FashionAddComponent } from './fashion-add/fashion-add.component';
import { FashionEditComponent } from './fashion-edit/fashion-edit.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    AppComponent,
    FashionComponent,
    FashionDetailComponent,
    FashionAddComponent,
    FashionEditComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]), // ✅ Để hỗ trợ <router-outlet>
    QuillModule.forRoot()
  ],
  providers: [
    provideHttpClient(withFetch()) // ✅ Cách mới thay thế HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
