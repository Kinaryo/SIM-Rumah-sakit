const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  formulirPasienSchema = new Schema({
    nama : {
        type : String,
    },
    nik : {
        type: Number,
    },
    jenisKelamin:{
        type: String,
    },
    asuransi:{
        type: String,
    },
    poli:{
        type:String,
    },
    ruangan:{
        type: String,
    },
    keterangan:{
        type: String,
    },
    tanggalMasuk:{
        type: Date,
    },

    tanggalLahir:{
        type: Date,
    },
    umur:{
        type: Number,
    },
    noTelpon :{
        type: Number,
    },    
    nomorRujukan:{
        type: Number
    },
    alamatSaatIni:{
        type: String,
    },
    kodeRegistrasi:{
        type:Schema.Types.ObjectId,
        ref:'kartuBerobat'
    }


})


module.exports = mongoose.model ('formulirPasien', formulirPasienSchema)