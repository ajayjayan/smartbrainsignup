const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const postgres = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '',
		database: 'postgres'
	}
});

	

const app = express();

app.use(bodyParser.json());
app.use(cors())
const database = {
	users: [
	  {
	  	id: '123',
	  	name: 'John',
	  	password: 'cookies',
	  	email: 'john@gmail.com',
	  	entries: 0,
	  	joined: new Date()
	  },
	  {
	  	id: '124',
	  	name: 'Sally',
	  	password: 'bananas',
	  	email: 'sally@gmail.com',
	  	entries: 0,
	  	joined: new Date()
	  }
	],
	login: [
      {
      	id: '987',
      	has: '',
      	email:'john@gmail.com'
      }

	]
}

app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	bcrypt.compare("bacon", '$2a$10$7RIvXm3MCB03xiX7AR0Vk.V3IZuordwEG6xl2k//AqsxBeoNhJ4wu', function(err, res) {
       console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$7RIvXm3MCB03xiX7AR0Vk.V3IZuordwEG6xl2k//AqsxBeoNhJ4wu', function(err, res) {
	   console.log('second guess', res)
    });

	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
	  res.json('success');	
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	postgres('users').insert({
		email: email,
		name: name,
		joined: new Date()
	}).then(console.log)
	res.json(database.braniacs[database.braniacs.length-1]);
})	

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
});




app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})