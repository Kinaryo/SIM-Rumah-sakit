const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const kartuBerobatSchema = new Schema({
    nama: String,
    nik: String,
    tanggalLahir: {
        type: Date,
    },
    jenisKelamain: String,
    Alamat:String,
    tanggalDaftar:{
        type: Date,

    }

    
})


module.exports = mongoose.model('kartuBerobat',kartuBerobatSchema)