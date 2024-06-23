import { Types } from "mongoose"

export interface ITodo {
    _id: Types.ObjectId
    name: string,
    description: string,
    tags: string[],
    createdAt: Date,
    updatedAt: Date
}
