import mongoose from "mongoose";
const {Schema} = mongoose //Schema kütüphanesini bu şekilde tanımladım. 




mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db') //bağlantıyı yaptım. genelde bağlantıdan hata oluyor

const photoSchema = new Schema( //fotoğraf modülüme eklenecek dataların tiplerini tanıttım. yani şablonu oluşturdum.
    {
     title: String, 
    description: String,
    author: String
})
const Photo = mongoose.model('Photo', photoSchema) //modeli oluşturdum yani collections ile schema'yı birbirine bağladım.

Photo.create({ //son olarak fields'i ekledim.
    title: 'Photo title 1', 
    description: 'Photo description by 1'
})

//Update, delete gibi CRUD işlemleri Mongoose dökümanından ulaşabilirsin.