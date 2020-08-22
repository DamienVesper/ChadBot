const Mongoose = require(`mongoose`);

const townSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    mayor: {
        type: Number,
        required: true
    }
});