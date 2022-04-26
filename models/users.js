const {Schema, model } = require('mongoose');
const { User } = require('.');


const UserSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },

        email:{
            type: String,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] 

        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    },

    {
        toJSON:{
            virtuals:true
        }
    }

)

UserSchema.virtual("friendCount").get(function(){
    return this.friends.length
})

const User = model("User", UserSchema)
module.exports = User
