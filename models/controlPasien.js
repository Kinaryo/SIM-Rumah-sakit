const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const controlPasienSchema = new Schema({
    tanggalPemeriksaan :{
        type : Date,
    },
    keluhan:{
        type: String,
    },
    respirasi:{
        type:String,
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