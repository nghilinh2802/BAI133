export class Fashion {
    constructor(
        public _id: any = null,   // ID tự động tạo khi thêm mới
        public fashion_subject: string = "",
        public style: string = "",
        public fashion_detail: string = "",  // Tránh lỗi thiếu trường
        public fashion_image: string = "",
        public created_at: Date = new Date() // Đảm bảo có ngày tạo
    ) {}
}
