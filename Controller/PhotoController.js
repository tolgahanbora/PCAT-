import fs from 'fs';

import Photo from '../Model/Photo.js'
import path from 'path'; 
const __dirname = path.resolve()
import fileUpload from 'express-fileupload';



const getPhotoDelete = async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})

    let deleteFile = __dirname + "/public/" + photo.image
    if(fs.existsSync(deleteFile)){
    fs.unlinkSync(deleteFile)
    }
    await Photo.findByIdAndRemove(req.params.id)
    res.redirect("/")

}

const getPhotoEdit = async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    photo.title = req.body.title,
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photos/${req.params.id}` )
}


const getPhotoUpload =  async (req,res) => {
    
    const dirPath = "public/upload"

    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath)
    }

  const uploadImage = req.files.image 
  const uploadPath = __dirname + "/public/upload/" + uploadImage.name

    uploadImage.mv(uploadPath, async () => {
        
    await Photo.create({
        ...req.body,
        image: "/upload/" + uploadImage.name
    })
        res.redirect("/")
    })

}

export {
    getPhotoUpload,
    getPhotoEdit,
    getPhotoDelete
}