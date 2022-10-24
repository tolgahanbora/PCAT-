import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";


const photoSchema = Schema({
    title: String,
    description: String,
    image: String,
    date: {type: Date, default: Date.now}

})

const Photo = mongoose.model("Photo", photoSchema)

export default Photo
//Ecma script 6 göre export etmediğin için, dışarı aktaramıyordun. dikkat et