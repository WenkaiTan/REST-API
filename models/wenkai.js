const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create sub-document schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

//Create wenkai schema and model 
const wenkaiSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Wenkai = mongoose.model('wenkai', wenkaiSchema);

module.exports = Wenkai;