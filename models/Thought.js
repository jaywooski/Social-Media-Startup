const { Schema, model } = require('mongoose');
const moment = require("moment");


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'Thought is required!',
            validate: [({ length }) => length >= 1 && length <= 280, 'Text should be between 1 & 280 characters' ]
        },
        createdAt: {
            type: Date,
            default: moment().format(),
            get: moment().format('lll')
            
        },
        username: {
            type: String,
            required: 'Username is required!'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
            id: false
        }
    }
)

ThoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;