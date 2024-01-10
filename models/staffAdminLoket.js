const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const staffAdminLoketSchema = new Schema({
    divisi:{
        type: String,
        default:"Staf admin loket"
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
    alamat:{
        type: String,
    },
    auth:[{
        type: Schema.Types.ObjectId,
        ref: 'staffAdminLoketAuth'
    }]
})

module.exports = mongoose.model('staffAdminLoket', staffAdminLoketSchema)