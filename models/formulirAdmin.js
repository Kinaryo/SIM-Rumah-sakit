const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formulirAdmin = new Schema({
    nama : String,
    nik : Number,
    nip : String,
    tanggalLahir: String,
    alamat : String,
    status : String,
})