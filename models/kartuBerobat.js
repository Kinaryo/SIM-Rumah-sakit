const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const kartuBerobatSchema = new Schema({
    nama: String,
    nik: Number,
    kodeRegistrasi: String,
    no_hp : Number,
    tanggalLahir: {
        type: Date,
    },
    jenisKelamain: String,
    alamat:String,
    tanggalDaftar:{
        type: Date,

    }

    
})


module.exports = mongoose.model('kartuBerobat',kartuBerobatSchema)