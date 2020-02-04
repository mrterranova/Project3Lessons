import React, { useState, useEffect, Fragment } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie } from '../../../auth/helpers';
import { Card,Button } from 'react-bootstrap'


const UserNotes = ({ history }) => {
    const [values, setValues] = useState({
        title: "",
        category: "",
        body: "",
        UserId: "",
        LessonId: "",
        NoteId: "",
        showHideEdit: false
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (name) => event => {
        setValues({ ...values, title: title, category: category, body: body, bookcategory: bookcategory, [name]: event.target.value })
    }

    const loadProfile = () => {
        //grabbing the URL from the window
        const URLarray = window.document.URL.split("/")
        const URLarrVar = URLarray[URLarray.length - 1]
        const URL_id = URLarrVar.split("?")

        //GET the correct logged user
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                //set all the values of the user
                console.log("URLid", URL_id[0])
                if (response.data.notes.length === 0) {
                    //if the user has notes identify if there are notes that belong to this lesson
                } else {
                    const user = response.data._id
                    response.data.notes.map(note => {
                        if (note.Lesson_id === URL_id[0]) {

                            setValues({ ...values, NoteId: note._id, title: note.title, category: note.category, body: note.body })
                            //notes that do not belong to this lesson are reported in console.
                        }
                    })
                }
                // //if the user has 0 bookmarks return nothing
                // if (response.data.bookmarks.length === 0) {
                //     console.log("Lesson was not bookmarked")
                //     //if the user has bookmarks identify if there are bookmarks that belong to this lesson
                // } else {
                //     response.data.bookmarks.map( bookmark => {
                //         if (response.data.bookmark.Lesson_id === LessonId) {
                //             setValues({ ...values, bookcategory: bookmark.category, isBookmarked: true, UserId: response.data._id})
                //             //bookmakrs that belong to this lesson are reported in console.
                //         }
                //     })
                // }

            })
    };

    const { NoteId, title, category, body, bookcategory } = values;

    const RemoveNote = (Note_id) => {
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API}/notes/` + Note_id,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                console.log('Note was deleted', response);
            });
    }

    //handle all edits to the notes as a POST
    const handleSubmitEdit = () => {
        const URLarray = window.document.URL.split("/")
        const URLarrVar = URLarray[URLarray.length - 1]
        const URL_id = URLarrVar.split("?")
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const userId = response.data._id
                alert(userId)
                axios({
                    method: "POST",
                    url: process.env.REACT_APP_API + '/user/note/' + URL_id[0],
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    data: { Lesson_id: URL_id[0], title: title, category: category, body: body, User_id: userId, _id: NoteId }
                }).then(response => {
                    console.log(title, body, category)
                    alert("Never stop!")
                })
            })
    }

    //toggle to show notes
    const getUserNote = () => {
        console.log("You are looking for the notes!")
    }

    //toggle to addBookmark
    const addBookmark = () => {
        console.log("Bookmark time!")
    }

    //form for handling the note changes
    const takeNotes = (noteBody) => {

        return (
        <form>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>
                    <input placeholder={"Title: " + title} onChange={handleChange('title')} type="text" name="title" className="form-control" id="title"></input>
              </Card.Title>
              <Card.Text>
                    <input placeholder={"Category: " + category} onChange={handleChange('category')} name="category" type="text" className="form-control" id="category"></input>
                    <textarea className='note-textbox' onChange={handleChange('body')} id="bodyNotes" name="body" placeholder={noteBody.body}></textarea>
                    <br />
                    <button className="btn btn-warning" onClick={() => handleSubmitEdit()} type="submit">Submit Edit</button>
              </Card.Text>
                <button type="button" className="btn btn-warning deleteNote-btn" onClick={() => RemoveNote()}>Delete Note</button>
            </Card.Body>
          </Card>
        </form>
        )
    }
    // what the user is viewing
    return (
            <div className="noteContainer">
                {takeNotes({ body })}
            </div>
    );
};

export default UserNotes;