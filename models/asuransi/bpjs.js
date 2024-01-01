const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BPJSSchema = new Schema({
    asuransi: {
        type: Schema.Types.ObjectId,
        ref: 'formulirPasien',
    },
});

module.exports = mongoose.model('BPJS', BPJSSchema);