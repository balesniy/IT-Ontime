import {Error} from "mongoose"
import todoModel from "~/server/models/todo.model"
import {ITodo} from "~/types"

export default defineEventHandler(async (event) => {
    try {
        const body: ITodo = await readBody(event)
        if (!body) {
            return {statusCode: 400, statusMessage: 'Name field is required.'}
        }
        const item = await todoModel.create({
            name: body.name, description: body.description
        })
        return {statusCode: 200, statusMessage: 'New item has been added.', data: item}
    } catch (error: unknown) {
        if (error instanceof Error.ValidationError) {
            return {statusCode: 400, statusMessage: error.message}
        }
        return {statusCode: 500, statusMessage: 'Something went wrong.'}
    }
})
