const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulirPasienSchema = new Schema({
    nama: {
        type: String,
    },
    noPendaftaran: {
        type: String,
    },
    nik: {
        type: Number,
    },
    jenisKelamin: {
        type: String,
    },
    asuransi: {
        type: String,
    },
    noAsuransi: {
        type: Number,
    },
    poli: {
        type: String,
    },
    ruangan: {
        type: String,
    },
    keterangan: {
        type: String,
    },
    tanggalMasuk: {
        type: Date,
    },
    tanggalLahir: {
        type: Date,
    },
    tanggalKeluar: {
        type: String,
        default: '-'
    },
    umur: {
        type: Number,
    },
    noTelpon: {
        type: Number,
    },
    nomorRujukan: {
        type: Number,
    },
    alamatSaatIni: {
        type: String,
    },
    kodeRegistrasi: {
        type: Schema.Types.ObjectId,
        ref: 'kartuBerobat'
    },
});

formulirPasienSchema.methods.getMonthYearDateMasuk = function () {
    if (this.tanggalMasuk) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return this.tanggalMasuk.toLocaleDateString('id-ID', options);
    }
    return "Tanggal Masuk Tidak Tersedia";
};


formulirPasienSchema.methods.getMonthYearDateLahir = function () {
    if (this.tanggalLahir) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return this.tanggalLahir.toLocaleDateString('id-ID', options);
    }
    return "Tanggal Lahir Tidak Tersedia";
};


module.exports = mongoose.model('formulirPasien', formulirPasienSchema);
