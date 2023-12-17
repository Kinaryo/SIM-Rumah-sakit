const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  formulirPasienSchema = new Schema({
    nama : {
        type : String,
    },
    nik : {
        type: Number,
    },
    noTelpon :{
        type: Number,
    },
    alamat:{
        type: String,
    },
    tanggalMasuk:{
        type: Date,
    },
    poli:{
        type: String,
    },
    nomorRujukan:{
        type: Number
    }

})


module.exports = mongoose.model ('formulirPasien', formulirPasienSchema)