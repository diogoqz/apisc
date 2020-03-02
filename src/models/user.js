const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        lowercase: true,
        require: true,
    },
    telefone: {
        type: String,
        require: true,
    },
    criadoEm: {
        type: Date,
        default: Date.now,
    },
});




const User = mongoose.model('User', UserSchema);

module.exports = User;