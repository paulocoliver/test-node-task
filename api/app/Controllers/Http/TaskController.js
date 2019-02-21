'use strict'

const Task = use('App/Models/Task')

class TaskController {

	async index ({request, response}) {

		const page 		= request.input('page', 1)
		const perPage 	= request.input('perPage', 10)
		const filter 	= request.input('q', null)
		const query 	= Task.query().orderBy('id', 'desc')
		if (filter) {
			query.where('task', 'LIKE', `%${filter}%`)
		}

		const books = await query.paginate(page, perPage)
		return response.json(books)
	}

	async create ({request, response}) {
		try {
			const task = new Task()
			task.task = request.input('task')
			await task.save();
			return response.status(201).json(task)
		} catch (e) {
			return response.status(500).json({error: 'server error'})
		}
	}

	async show ({params, request, response}) {
		return this.findOrFail(async (task) => {
			return response.status(200).json(task)
		}, params, request, response);
	}

	async update ({params, request, response}) {
		return this.findOrFail(async (task) => {
			task.task = request.input('task')
			await task.save();
			return response.status(200).json(task)
		}, params, request, response);
	}

	async delete ({params, request, response}) {
		return this.findOrFail((task) => {
			task.delete();
			return response.status(204).json({})
		}, params, request, response);
	}

	async findOrFail(success, params, request, response) {
		try {
			const task = await Task.findOrFail(params.id);
			return success(task)
		} catch (e) {

			if (e.name === 'ModelNotFoundException') {
				return response.status(404).json({error: 'not found'})
			}

			return response.status(500).json({error: e.name})
		}
	}
}

module.exports = TaskController
