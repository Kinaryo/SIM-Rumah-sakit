const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pasienRawatInapSchema = new Schema({
    noPendaftaran: {
        type: Schema.Types.ObjectId,
        ref: 'formulirPasien'
    },
    noKasur:{
        type:Number,
    },
    jalurMasuk:{
        type: String,
    },
    jalurKeluar:{
        type: String,
    },
    diagnosa:{
        type:String,
    },
    keterangan:{
        type:String,
    },
    status :{
        type:String,
    },
    tanggalKeluar:{
        type: Date,
    }

});

module.exports = mongoose.model('pasienRawatInap', pasienRawatInapSchema);
