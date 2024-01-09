const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const perawatSchema = new Schema({
    divisi:{
        type: String,
        default:"Staf Rawat Inap"
    },
    nama:{
        type: String,
    },
    nik:{
        type: Number,
    },
    nip:{
        type:Number,
    },
    noSTR:{
        type: String,
    },
    jenisKelamin:{
        type:String
    },
    tanggalLahir:{
        type:Date,
    },
    noHp:{
        type:Number,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type:String
    },
    alamat:{
        type: String,
    }
})

perawatSchema.methods.getMonthYearDateLahir = function () {
    if (this.tanggalLahir) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return this.tanggalLahir.toLocaleDateString('id-ID', options);
    }
    return "Tanggal Lahir Tidak Tersedia";
};

perawatSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('perawat',perawatSchema)