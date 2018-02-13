const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../models/article');

// MongoDb url
const url = "mongodb://@localhost:27017";

let db;

// Connect to server
mongoose.Promise = global.Promise;
mongoose.connect(url, function(err, database) {
    if(err){
        console.log('Error connecting')
        console.log(err);
        return;
    }
    db = database;
    console.log("Connected successfully to server");
    //server.listen(8888);
});

// Get all the articles
router.get('/all', function(req, res) {
    article.find({})
        .exec(function(err, articles) {
            if (err) {
                console.log('Error getting the articles');
                console.log(err);
            } else {
                //console.log(articles);
                res.json(articles);
            }
        });
});

// Get a single article
router.get('/articles/:id', function(req, res) {
    console.log('Requesting a specific article');
    article.findById(req.params.id)
        .exec(function(err, article){
            if(err){
                console.log('Error getting the article')
                console.log(err);
            } else {
                res.json(article);
            }
        });
});

// Create
router.post('/create', function(req, res) {
    console.log('Posting an Article');
    console.time('Write Article')
    var newArticle = new article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.save(function(err, article) {
        if(err) {
            console.log('Error inserting the article');
            console.log(err);
        } else {
            res.json(article);
        }
    });
    console.timeEnd('Write Article')
});

// Update
router.post('/update/:id', function(req, res) {
    console.log('Updating an Article');

    article.findById(req.params.id)
        .exec(function(err, article) {
            if (err) {
                console.log('Could not find the article');
            } else {
                article.title = req.body.title;
                article.content = req.body.content;
                article.save();
                res.json(article);
            }
        });
});

// Delete
router.get('/delete/:id', function(req, res) {
    console.log('Deleting an article');
    article.findByIdAndRemove(req.params.id)
        .exec(function(err, article){
            if(err){
                console.log('Error deleting the article')
                console.log(err);
            } else {
                res.json(article);
            }
        });
});

// Create multiple articles
router.post('/test', function(req, res) {
    console.time('Stress Test')
    for (let i = 0 ; i < 5; i++) {
        var newArticle = new article();
        newArticle.title = req.body.title;
        newArticle.content = req.body.content;
        newArticle.save(function(err, article) {
            if(err) {
                console.log('Error inserting the article');
                console.log(err);
            } else {
                console.log('success');
            }
        });
    }
    console.timeEnd('Stress Test')
    res.sendStatus(201);
});

module.exports = router;