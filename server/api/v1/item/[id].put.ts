import todoModel from "~/server/models/todo.model"
import {ITodo} from "~/types"

export default defineEventHandler(async (event) => {
    try {
        const body: ITodo = await readBody(event)
        await todoModel.findByIdAndUpdate<ITodo>({_id: event.context.params!.id}, {
            name: body.name, description: body.description
        })
        return {statusCode: 200, statusMessage: 'Item is updated.'}
    } catch (error) {
        console.log(error)
        return {statusCode: 500, statusMessage: 'Something went wrong.'}
    }
})
