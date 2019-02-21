'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/tasks', 'TaskController.index')

Route.get('/tasks/:id', 'TaskController.show')

Route.post('/tasks', 'TaskController.create')

Route.put('/tasks/:id', 'TaskController.update')

Route.delete('/tasks/:id', 'TaskController.delete')
