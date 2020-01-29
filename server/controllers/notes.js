const Notes = require('../models/Notes'); 
const Bookmark = require('../models/Bookmarked')
const User = require('../models/user')


exports.readLessons = (req, res) => {
    Lessons.find({}).exec((err, allLessons) => {
        if (err) {
            return res.status(422).json({
                error: 'The Lessons were not located'
            });
        }
        res.json(allLessons)
    })
}

exports.readLesson = (req, res) => {
    Lessons.findOne({ _id: req.params.id }).exec((err, lesson) => {
        if (err) {
            return res.status(422).json({
                error: 'This lesson was not located'
            });
        }
        res.json(lesson)
    })
}

exports.postLesson = (req, res) => {
    Lessons.create(req.body, (err, lesson) => {
        if (err) {
            return res.status(422).json({
                error: 'Lesson could not post'
            })
        }
        res.status(200).json({
            message: "New lesson was posted!"
        })
    })
}

exports.updateLesson = (req, res) => {
    Lessons.findOneAndUpdate({ _id: req.params.id}, req.body).exec((err, lesson)=>{
        if (err) {
            return res(422).json({
                error: 'Lesson was unable to be updated.'
            })
        } 
        res.json(lesson);
    })
}

exports.deleteLesson = (req, res) => {
    Lessons.findOneAndDelete({ _id: req.params.id}).exec((err,lesson) => {
        if (err) {
            return res(422).json({
                error: 'The lesson was not able to be deleted.'
            })
        } 
        res.status(200).json({
            message: 'This lesson, '+req.body.title+', has been deleted.'
        })
    })
}

exports. readBookmarks = (req, res) => {
    Bookmark.find({}).exec((err, allBookmarks) => {
        if (err) {
            return res.status(422).json({
                error: 'Bookmarked lessons not located.'
            });
        }
        res.json(allBookmarks)
    })
}

exports.readBookmark = (req, res) => {
    User.findOne({ _id: req.params.id })
    .populate('bookmarks')
    .exec((err, dblesson) => {
        if (err) {
            return res.status(422).json({
                error: 'Bookmarked lesson not located.'
            });
        }
        res.json(dblesson)
    })
}

exports.postBookmark = (req, res) => {
    console.log("How about POST")
    console.log(req.body, req.params)
    Bookmark.create(req.body)
    .then(function(dbBookmark) {
        return User.findOneAndUpdate({ _id : req.params.id }, 
            { $push : { bookmarks : dbBookmark._id }}, { new : true });
    }).then(function(newuserbookmark) {
        res.json(newuserbookmark)
    }).catch (function(error){
        res.status(422).json({ error : 'Could not post bookmark.'})
    })
    
}

exports.updateCuratorNote = (req, res) => {
    console.log(req.params)
    Curator.create(req.body)
      .then(function(dbNote) {
        return Curator.findOneAndUpdate({ _id: req.params.id }, {
            location: req.body.location, 
            notes: req.body.notes, 
            highlights: req.body.highlights, 
            noteLocation: req.body.noteLocation
        }, { new: true });
      })
      .then(function(LessonNotes) {
        res.json(LessonNotes);
      })
      .catch(function(error) {
        res.json({ error : "There was an error in updating note."});
      });
}

exports.deleteCuratorNote = (req, res) => {
    console.log(req.params)
    Curator.findByIdAndRemove(req.params.id, (err, note) => {
        if (err) return err;
        console.log("Successfully deleted");
        res.status(200).json({message: "Note was successfully deleted!"});
    });
}