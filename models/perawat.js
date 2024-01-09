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
    alamat:{
        type: String,
    }
})

perawatSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('perawat',perawatSchema)