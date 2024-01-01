const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  formulirPasienSchema = new Schema({
    nama : {
        type : String,
    },
    noPendaftaran:{
        type: String,
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


formulirPasienSchema.methods.getMonthYearDateMasuk = function() {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return this.tanggalMasuk.toLocaleDateString('en-US', options);
};

// Metode untuk mendapatkan tanggal lahir dalam format yang diinginkan
formulirPasienSchema.methods.getMonthYearDateLahir = function() {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return this.tanggalLahir.toLocaleDateString('en-US', options);
};



module.exports = mongoose.model ('formulirPasien', formulirPasienSchema)