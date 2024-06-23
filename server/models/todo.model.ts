import mongoose from "mongoose"
import { ITodo } from "~/types"

const schema = new mongoose.Schema<ITodo>({
    name: {
        type: String,
        required: [true, 'Name field is required.'],
        trim: true,
        // No special characters are allowed. (upper and lower case), spaces, punctuation marks, and numbers only.
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z0-9\s]+$/.test(v)
            },
            message: 'Special characters are not allowed.'
        },
        maxlength: [20, 'Max of 20 characters only.']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [100, 'Max of 100 characters only.']
    },
    tags: {
        type: [String],
    }
}, { timestamps: true })

export default mongoose.model<ITodo>('Todo', schema)
