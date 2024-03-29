const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const staffRawatInapSchema = new Schema({
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

staffRawatInapSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('staffRawatInap', staffRawatInapSchema)