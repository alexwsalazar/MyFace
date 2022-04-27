const {Schema, model } = require('mongoose');
const date = require("../utils/date")

// const { Thought } = require('.');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId ()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => date(timestamp)
          },


    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => date(timestamp)
          },

        reactions: [reactionSchema],

    },

    {
        toJSON:{
            virtuals:true,
            getters: true
        }
    }

)

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)
module.exports = Thought