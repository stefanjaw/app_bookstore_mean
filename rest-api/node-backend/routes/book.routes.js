// routes

const express = require('express');
const app = express();
const bookRoute = express.Router();
let Book = require("../model/Book");

//Add Book for store
bookRoute.route('/add-book').post( (req, res, next)=>{
    Book.create( req.body, ( error, data )=>{
        if (error){
            console.log("L12: " + error)
            return next("L13: " + error)
        } else {
            res.json(data)
        }
    });
})

//get all Book from Store
bookRoute.route('/').get( (req, res)=>{
    Book.find( (error,data)=>{
        if (error){
            console.log("L23: " + error)
            return next ("L24: " + error)
        } else {
            res.json( data )
        }
    })
})

//get Book by ID
bookRoute.route('/read-book/:id').get( (req, res)=>{
    Book.findById( req.params.id, (error,data)=>{
        if (error){
            return next ("L34: " + error)
        } else {
            res.json( data )
        }
    })
})

//Update Book store
bookRoute.route('/update-book/:id').put( (req, res)=>{
    Book.findByIdAndUpdate( req.params.id, {
        $set: req.body
    }, (error,data)=>{
        if (error){
            return next (error)
            console.log( error )
        } else {
            res.json( data )
            console.log( "Book updated successfully!" )
        }
    })
})

//Delete Book store
bookRoute.route('/delete-book/:id').delete( (req, res, next)=>{
    Book.findByIdAndRemove( req.params.id, (error, data) => {
        if (error){
            return next (error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = bookRoute;