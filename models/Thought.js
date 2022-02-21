const { Schema, model, Types } = require('mongoose');
const moment = require("moment");

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Type.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: [({ length }) => length <= 280, "Max characters allowed is 280!"]
        },
        username: {
            type: String,
            required: 'Username is required!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: moment().format('LLLL')
        }
    }
)

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'Thought is required!',
            validate: [({ length }) => length >= 1 && length <= 280, 'Text should be between 1 & 280 characters' ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: moment().format('LLLL')
            
        },
        username: {
            type: String,
            required: 'Username is required!'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

ThoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;