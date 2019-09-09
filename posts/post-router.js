const express = require('express');

// database access using knex
const db = require('../data/db-config.js');
// all db operations return a promise

const router = express.Router();

router.get('/', (req, res) => {
    // select title, contents from posts
    // db.select('*')
    //     .from('posts')
    db('posts')
        .select('id', 'title', 'contents')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/:id', (req, res) => {
    // select * from posts where id = 2
    const { id } = req.params;

    db('posts')
        .where({ id }) // always returns an array
        .first() // picks the first element of the resulting array
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post('/', (req, res) => {
    // insert into pots () values ()
    const postData = req.body;
    // validate the postData before inserting into db

    db('posts')
        .insert(postData, 'id')
        .then(([id]) => {
            db('posts')
                .where({ id }) // always returns an array
                .first() // picks the first element of the resulting array
                .then(post => {
                    res.status(200).json(post);
                });
        })
        .catch(err => {
            res.json(err);
        });
});

router.put('/:id', (req, res) => {
    // update posts set .... where id = 123
    const changes = req.body;
    db('posts')
        .where('id', req.params.id)
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `updated ${count} record` });
        })
        .catch(err => {
            res.json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete from posts where ...
    db('posts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ message: `deleted ${count} records` });
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
