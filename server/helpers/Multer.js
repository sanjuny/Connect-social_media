const multer = require('multer')

const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,'../client/public/images')
    },
    filename(req,file,callback){
        callback(null,`${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({storage:storage})
module.exports = upload;