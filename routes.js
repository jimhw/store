const store = require('./controllers/store')

// endpoints in order
module.exports = app => {
	app.get('/store/import', store.import)
	app.get('/store/find', store.findNearest)
	app.get('/store', store.findAll)
	app.get('/store/:id', store.findById)
	app.post('/store', store.add)
	app.put('/store/:id', store.update)
	app.delete('/store/:id', store.delete)
}
