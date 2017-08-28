const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'IBUKUN',
	database : 'nodemysql'
});

// Connect
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySql Connected...')
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
	'use strict';
	let sql = 'CREATE DATABASE nodemysql';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Database created...');
	});
});

// Create table
app.get('/createpoststable', (req, res) => {
	'use strict';
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

// Insert post 1
app.get('/addpost1', (req, res) => {
	'use strict';
	let post = {title:'Post One', body:'This is post number one'};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Posts 1 added...');
	});
});

// Insert post 2
app.get('/addpost2', (req, res) => {
	'use strict';
	let post = {title:'Post Two', body:'This is post number two'};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Posts 2 added...');
	});
});

// Select post
app.get('/getposts', (req, res) => {
	'use strict';
	let sql = 'SELECT * FROM posts';
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		console.log(results);
		res.send('Posts fetched...');
	});
});

// Select single post
app.get('/getpost/:id', (req, res) => {
	'use strict';
	let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Post fetched...');
	});
});

// Update post
app.get('/updatepost/:id', (req, res) => {
	'use strict';
	let newTitle = 'Updated Title';
	let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Post updated...');
	});
});

// Update post
app.get('/deletepost/:id', (req, res) => {
	'use strict';
	let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Post deleted...');
	});
});

app.listen('3000', () => {
	console.log('Server started on port 3000');
});