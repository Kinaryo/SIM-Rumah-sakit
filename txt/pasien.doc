const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pasienRawatInapSchema = new Schema({
    noPendaftaran: {
        type: Schema.Types.ObjectId,
        ref: 'formulirPasien'
    },
    noKasur:{
        type:String,
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
    },
    penyakitPotensiWabah:{
        type: String,
    },
    tanggalMasukRawatInap : {
        type: Date,
        default: "false"
    }

});


pasienRawatInapSchema.methods.getMonthYearDate = function () {
    if (this.tanggalMasukRawatInap) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return this.tanggalMasukRawatInap.toLocaleDateString('id-ID', options);
    }
    return "Tanggal Masuk Tidak Tersedia";
};
module.exports = mongoose.model('pasienRawatInap', pasienRawatInapSchema);
