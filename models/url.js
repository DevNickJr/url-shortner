const mongoose = require('mongoose');
const urlSchema = mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        default: () => shortid.generate(),
        unique: true,
        required: true
    }
}, { timestamps: true })


const Url = mongoose.model('Url', urlSchema)
module.exports = Url;