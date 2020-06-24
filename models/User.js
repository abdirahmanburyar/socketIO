const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashSync, compareSync } = require('bcryptjs')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    userImg: {
        type: String, 
        default: ''
    },
    facebook: { type: String, default: '' },
    faceToken: { type: Array },
    google: { type: String, default: '' },
    gogToken: { type: Array },
    sentRequest: [{
            fullName: { type: String, default: ''},
        }],
    request: [{
        username: { type: String, default: ''},
        userId: {type: Schema.Types.ObjectId, ref: 'Users'}
    }],
    friendsList: [{
        friendName: { type: String, default: ''},
        friendId: {type: Schema.Types.ObjectId, ref: 'Users'}
    }],
    totalRequest: {type: Number, default: 0},
})

userSchema.pre('save', function(next){
    if(!this.isModified('password')) next()
    this.password = hashSync(this.password, 12)
    next()
})

userSchema.methods.checkPassword = function(password) {
    return compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema)