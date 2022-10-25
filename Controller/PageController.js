import Photo from '../Model/Photo.js'


const getHomePage = async (req, res) =>{
    
    const page = req.query.page  || 1 
    const photosPerPage = 2
    
    const totalPhotos = await Photo.find().countDocuments()

    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photosPerPage) //mongoDB de bulunan ve sayfada gösterilen verileri pas geçemeye yarar. üzerinde düşündüğünde anlarsın. mantık yürüt. mesela, sayfa 3'tesin, 3-1 = 2 * 2 = 4 eder. yani ilk 4 veriyi pas geçeceeksin anlamında iş görür bu fonksiyon.
    .limit(photosPerPage) //sayfa başına gösterilmesi gereken fonksiyon yani limit.
    res.render("index.ejs" , {
        photos: photos,
        current: page , //o anda ki sayfaya karşılık gelir. hangi sayfadaysan onu gösterir.
        pages: Math.ceil(totalPhotos / photosPerPage) //5 fotoğrafın varsa math.ceil ile sayfaya yuvarlar. 
    }) //bunları yaptıysan, index.js de ayarlar yapman gerek.
}


const getPhotoPage = async (req,res) => {
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
        photo
    })
}


const getAboutPage = (req,res) => {
    res.render('about')
}


const getAddPage =  (req,res) => {
    res.render("add")
}

const getEditPage =  async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    res.render("edit" , {
      photo
    })
  }


  export {
    getEditPage,
    getAddPage,
    getAboutPage,
    getHomePage,
    getPhotoPage
  }