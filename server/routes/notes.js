//import the following node files
const express = require('express')
const router = express.Router();

//import controllers from the following
const { requireSignin, adminMiddleware } = require('../controllers/auth')

const { 
        //USER NOTES
        readNotes, 
        readNote, 
        postNote, 
        updateNote, 
        deleteNote, 
        //USER BOOKMARKS
        readBookmarks,  
        readBookmark, 
        postBookmark, 
        updateBookmark, 
        deleteBookmark

        } = require('../controllers/lesson')

//notes routes
// router.get('/user/notes', readNotes ); 
// router.get('/user/note/:id', readNote); 
// router.post('/user/note/:id', requireSignin, postNote ); 
// router.put('/user/note/:id', requireSignin, updateNote ); 
// router.delete('user/note/:id', requireSignin, deleteNote ); 

//
router.get( '/user/bookmarks', readBookmarks ); 
router.get( '/user/bookmarks/:id', readBookmark ); 
router.post( '/signin/:id', requireSignin, postBookmark ); 
// router.put( '/user/bookmarks/:id', requireSignin, updateBookmark ); 
// router.delete( '/user/bookmarks/:id', requireSignin, deleteBookmark ); 


//export the router with attached routes 
module.exports = router;