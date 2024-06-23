import todoModel from "~/server/models/todo.model"

export default defineEventHandler(async (event) => {
    try {
        const items = await todoModel.find().sort('-createdAt')
        return {statusCode: 200, statusMessage: 'success', data: items}
    } catch (error: unknown) {
        console.log(error)
        return {statusCode: 500, statusMessage: 'Something went wrong.'}
    }
})
