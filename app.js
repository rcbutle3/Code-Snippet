const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Snippets = require('./models/snippetSchema.js');
const Users = require('./models/userSchema.js')
const server = express();


server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');
server.use(bodyparser.urlencoded({ extended: false }));
server.use(session({
      secret: 'Hair Sugar',
      resave: false,
      saveUninitialized: true
  }));
mongoose.connect('mongodb://localhost:27017/snippetCollection');


    server.get('/login', function(req, res){
        res.render('login');
    });

    server.get('/register', function(req, res){

      res.render('register', {

    });

    server.get('/home', function(req, res){
      Snippets.find().then(function (snippets){
        res.render('home', {
            snippets: snippets,
            // name: user,
        });
      });
    });

    server.get('/display/:snippet_id', function(req, res){

          const id =  req.params.snippet_id;

          Snippets.findOne({
            _id: id
          }).then(function(results){

            res.render('display', {
                snippet: results,
            });
          });
      });

    //add snip page
    server.get('/add', function(req, res){
      res.render('add');
    });

  server.listen(5500, function(){
    console.log("Snip Snip! http://localhost:5500/login");
  });
