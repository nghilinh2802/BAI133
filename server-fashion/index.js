const express = require('express'); 
const app = express(); 
const port = 4000; 

const morgan=require("morgan") 
app.use(morgan("combined")) 


// const bodyParser=require("body-parser") 
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({extended: true})); 

const bodyParser=require("body-parser") 
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb' })); 
app.use(express.json()); 

const cors=require("cors"); 
app.use(cors()) 
app.listen(port,()=>{ 
console.log(`My Server listening on port ${port}`) 
}) 
app.get("/",(req,res)=>{ 
res.send("This Web server is processed for MongoDB") 
}) 

const { MongoClient, ObjectId } = require('mongodb'); 
client = new MongoClient("mongodb://127.0.0.1:27017"); 
client.connect(); 
database = client.db("FashionData");       
fashionCollection = database.collection("Fashion"); 

// trả về toàn bộ fashion, sắp xếp theo ngày tạo giảm dần
app.get("/fashions",cors(),async (req,res)=>{    
    const result = await fashionCollection.find({}).toArray(); 
    res.send(result) 
    }) 

// trả về chi tiết 1 fashion theo id
app.get("/fashions/:id",cors(),async (req,res)=>{ 
    var o_id = new ObjectId(req.params["id"]); 
    const result = await fashionCollection.find({_id:o_id}).toArray();     
    res.send(result[0]) 
    }) 

// 📌 API 3: Lọc danh sách các Fashion theo Style
app.get("/fashions/:style", cors(), async (req, res) => {
    try {
        const style = req.params.style;
        const result = await fashionCollection.find({ style: style }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: `Không tìm thấy Fashion nào với style: ${style}` });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
});

// post a fashion
app.post("/fashions", cors(), async (req, res) => {
    try {
        const newFashion = req.body;
        const result = await fashionCollection.insertOne(newFashion);

        res.status(201).json({
            message: "Thêm Fashion thành công!",
            fashion: newFashion,
            insertedId: result.insertedId
        });
    } catch (error) {
        console.error("Lỗi khi thêm Fashion:", error);
        res.status(500).json({ message: "Lỗi khi thêm Fashion", error });
    }
});

// DELETE ITEM
app.delete("/fashions/:id", cors(), async (req, res) => {
    try {
        let id = req.params.id;

        // Kiểm tra ID hợp lệ
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        let o_id = new ObjectId(id);

        // Tìm fashion theo ID
        const fashion = await fashionCollection.findOne({ _id: o_id });

        if (!fashion) {
            return res.status(404).json({ error: "Fashion not found" });
        }

        // Xoá fashion
        await fashionCollection.deleteOne({ _id: o_id });

        res.json({ message: "Fashion deleted successfully", deletedFashion: fashion });
    } catch (error) {
        console.error("Lỗi khi xoá:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Cập nhật Fashion theo ID
app.put("/api/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID không hợp lệ" });
        }

        const o_id = new ObjectId(id);
        const updatedFashion = {
            style: req.body.style,
            fashion_subject: req.body.fashion_subject,
            fashion_detail: req.body.fashion_detail,
            fashion_image: req.body.fashion_image,
            date_added: req.body.date_added || new Date()
        };

        const result = await fashionCollection.updateOne(
            { _id: o_id },
            { $set: updatedFashion }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Fashion không tồn tại" });
        }

        const updatedData = await fashionCollection.findOne({ _id: o_id });
        res.json({ message: "Cập nhật thành công!", updatedFashion: updatedData });
    } catch (error) {
        console.error("Lỗi khi cập nhật Fashion:", error);
        res.status(500).json({ error: "Lỗi server khi cập nhật Fashion" });
    }
});



