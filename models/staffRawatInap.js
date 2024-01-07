const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const staffRawatInapSchema = new Schema({
    nik:{
        type: Number,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    golongan:{
        type: String,
    }
})

staffRawatInapSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('staffRawatInap', staffRawatInapSchema)