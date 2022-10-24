import express from 'express';
//dosya konumlarını sağlayan fonk import ettim.
import  MethodOverride from 'method-override';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import {getHomePage,getAboutPage,getEditPage,getAddPage,getPhotoPage } from '../Controller/PageController.js'
import {getPhotoUpload,getPhotoEdit,getPhotoDelete} from '../Controller/PhotoController.js'

dotenv.config()
const app = express()
let port = process.env.PORT
//MONGOOSE CONNECT
mongoose.connect(`${process.env.DB_URI}`).then(() => console.log("mongodb CONNECTED")).catch((err) => console.log("err"))



// MIDDLEWARE
app.use(express.static('public')) // Statik dosyaların konumunu belli etmezsen çalışmaz.
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(MethodOverride('_method', {
    methods: ["POST", "GET"]
}))

// TEMPLATE ENGİNE
app.set("view engine", "ejs") //template engine modülünü set ettim


app.get('/', getHomePage)

app.get("/photos/:id",getPhotoPage )

app.get("/about",getAboutPage )

app.get("/add",getAddPage)

app.post("/photos",getPhotoUpload)



app.get("/photos/edit/:id",getEditPage)

app.put("/photos/:id" , getPhotoEdit)

app.delete("/photos/:id", getPhotoDelete)

app.listen( port, () => {
    console.log(`Server ${port}unda up edildi.`)
})

//Ek olarak: index.html de bulunan sayfaların ahref taglerini, /add ve /about gibi isimlendirdiğim path yolu ile güncelleştirdim. yoksa çalışmıyor.