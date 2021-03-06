
Find the Nearest Store
======================

An API for finding the nearest store with a given address using the latitude and longitude.

The solution uses the [Node.js](https://nodejs.org/) with [Express Framework](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

Express is a light-weight framework for easy to build web applications and APIs. It helps organize your web application into an MVC architecture on the server side. 

MongoDB is a document-oriented database that stores data in collections of documents named JSON. It provides a persistent data storage that is a lot easy to manipulate data compare to the file.

It uses the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) to get the latitude and longitude for a given address. In the use case here, it is pretty straight forward to make the direct HTTPS client call to the API for the latitude and longitude without any third party library.

It calculates the distance between two latitude and longitude points in miles for all the given stores and finds the closest one.

In addition, the data model has a category imlmentation. It can be extended to any store with the provided category.

## Installation

Type the following to install the MongoDB. More information can be found at [MongoDB](https://www.mongodb.com/).

	npm install mongodb

To install the application:

	npm install

## Configuration

Rename config.template to config.json.

The API key can be obtained from the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/get-api-key).

Put the API KEY setup in the config.json or environment variable API_KEY.


The port number, database URI and GEO URL are configurable in the config.json and environment variables PORT, MONGO_URI and GEO_URL. It is the best practice per [The Twelve-Factor App](https://12factor.net/).

## Usage

There are total seven endpoints:

	GET /store/import
	GET /store/find
	GET /store
	GET /store/:id
	POST /store
	PUT /store/:id
	DELETE /store/:id

### Start the Services

Start the mongoDB:

	mongod

Start the server:

	npm start

### Import Data

Copy the data file or locations.cvs to the application root directory.

	curl -i http://localhost:3001/store/import?file=./locations.csv


### List All the Stores

	curl -i http://localhost:3001/store

### Get a Store by Id

	curl -i http://localhost:3001/store/:id

For example:

	curl -i http://localhost:3001/store/16

### Create a New Store

	curl -i -H "Content-Type: application/json" -X POST -d :store_info http://localhost:3001/store

For example:

	curl -i -H "Content-Type: application/json" -X POST -d '{"id":100, "name":"Blue Bottle","address":"555 First St","latitude":37.76,"longitude":-122.43}' http://localhost:3001/store

### Update a Store by Id

	curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"New Red"}' http://localhost:3001/store/:id

For example:

	curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"New Red"}' http://localhost:3001/store/100

### Delete a Store by Id

	curl -i -X DELETE http://localhost:3001/store/:id

For example:

	curl -i -X DELETE http://localhost:3001/store/100

### Find the Nearest Store

	curl -i http://localhost:3001/store/find?address=:address

For example:

	curl -i http://localhost:3001/store/find?address=535+Mission+St.,+San+Francisco,+CA

	curl -i http://localhost:3001/store/find?address=252+Guerrero+St,+San+Francisco,+CA+94103,+USA

## Future Enhancements

* Find by category
* OpenAPI or Swagger Specification
* Authentication
* Authorization
* User Management
* RBAC
* Rate limiting
* Throttling
* CORS
* Logging
* Error handling
* Unit Testing
