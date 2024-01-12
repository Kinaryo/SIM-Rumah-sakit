const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const controlPasienSchema = new Schema({
    sesi:{
        type:String,
    },
    tanggalPemeriksaan :{
        type : Date,
        default: Date.now(),
    },
    jamPemeriksaan:{
        type: String,
    },
    catatan:{
        type: String,
    },
    keluhan:{
        type: String,
    },
    respirasi:{
        type:String,
    },
    diagnosabaru:{
        type: String,
    },
    tensi:{
        type: String,
    },
    nadi:{
        type:String,
    },
    kadarOksigen:{
        type:String,
    },


})

controlPasienSchema.methods.getMonthYearDatePemeriksaan = function (){
    if (this.tanggalPemeriksaan){
        const options = {year:'numeric', month: 'long', day: 'numeric'}
         return this.tanggalPemeriksaan.toLocaleDateString('id-ID', options);
    }
     return "Tanggal Pemeriksaan Tidak Tersedia";
};


module.exports =  mongoose.model ('controlPasien', controlPasienSchema)