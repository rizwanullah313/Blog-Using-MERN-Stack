const { model, Schema } = require("mongoose");
const { use } = require("../routes/userRoutes");

const userSchema = new Schema({
    name: {
        type: String, // String data jeyga
        required: true, // mean null nhi jyega
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = model('user', userSchema);