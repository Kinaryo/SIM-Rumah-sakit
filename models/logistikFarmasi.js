const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({

    kode:{
        type: String,
        required:true
    },
    namaBarang:{
        type:String,
    },
    satuan:{
        type:String,
    },
    jumlah:{
        type:Number,
    }

})



module.exports = mongoose.model('ITEM', itemSchema)