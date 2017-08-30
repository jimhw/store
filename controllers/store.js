const mongoose = require('mongoose')
const https = require('https')
const config = require('../config.json')
const fs = require('fs')

const Store = mongoose.model('Store')

// List all stores
exports.findAll = (req, res) => {
  Store.find({}, (err, results) => {
    return res.send(results)
  })
}

// Find store by Id
exports.findById = (req, res) => {
  let id = req.params.id
  Store.findOne({'id':id}, (err, result) => {
    return res.send(result)
  })
}

// Create a new store
exports.add = (req, res) => {
  Store.create(req.body, (err, coffeeshop) => {
    if (err) return console.log(err)
    return res.send(coffeeshop)
  })
}

// Update a store with Id
exports.update = (req, res) => {
  let id = req.params.id
  let updates = req.body

  Store.update({"id":id}, req.body, (err, numberAffected) => {
      if (err) return console.log(err)
      res.send(202)
  })
}

// Delete a store by Id
exports.delete = (req, res) => {
  let id = req.params.id
  Store.remove({'id':id}, (result) => {
    return res.send(result)
  })
}

// Import stores from CSV file
exports.import = (req, res) => {
	let data = []
	let category = ""
	fs.readFile(req.query.file, (err, locations) => {
		locations.toString().split('\n').forEach(location => {
			data = location.split(',')
			if (data[5] === undefined)
				category = 'Coffee'
			else
				category = data[5]
		  Store.create({'id': data[0], 'name': data[1], 'address': data[2], 'latitude': data[3], 'longitude': data[4], 'category' : category}, err => {
		    if (err) return console.log(err)
		  })
		})
	})
	return res.send(202)
}

// Find the nearest store given an address
exports.findNearest = (req, res) => {
	let lat = ''
	let lng = ''
	const apiKey = process.env.API_KEY || config.apiKey
	geoURL = process.env.GEO_URL || config.geoURL
	const url = geoURL+'?address='+req.query.address+'&key='+apiKey
	let shortest = Number.MAX_VALUE
	let result = {}
	let d = 0
	let body = ''
	https.get(url, res1 => {
	  res1.setEncoding('utf8')
	  res1.on('data', data => {
	    body += data
	  })
	  res1.on('end', () => {
	    body = JSON.parse(body)
			lat = body.results[0].geometry.location.lat
			lng = body.results[0].geometry.location.lng
	    console.log(
	      `City: ${body.results[0].formatted_address} -`,
	      `Latitude: ${body.results[0].geometry.location.lat} -`,
	      `Longitude: ${body.results[0].geometry.location.lng}`
	    )
			// find the nearest
		  Store.find({}, (err, results) => {
				results.forEach(r => {
					d = distance(lat, lng, r.latitude, r.longitude)
					if (d < shortest) {
						shortest = d
						result = r
					}
				})
		    return res.send(result)
		  })
	  })
	})
}

// Calculate the distance between 2 latidue and longitude points
function distance(lat1, lng1, lat2, lng2) {
	let p = Math.PI / 180
	let c = Math.cos
	let rad = 3539 // Min earth radius in miles
	let a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lng2 - lng1) * p))/2
	return 2*rad * Math.asin(Math.sqrt(a))
}
