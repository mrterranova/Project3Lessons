import React, { useState, useEffect, Fragment } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie } from '../../../auth/helpers';
import './style.css'


const UserBookmark = ({ history }) => {
    const [values, setValues] = useState({
        lessonName:"",
        UserId: "",
        LessonId: "",
        BookmarkId: "", 
        isBookmarked: false
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (name) => event => {
        setValues({ ...values, lesson_title: lessonName,  [name]: event.target.value })
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
                if (response.data.notes.length === 0) {
                    //if the user has notes identify if there is a bookmark that belong to this lesson
                } else {
                    response.data.bookmarks.map(bookmark => {
                        if (bookmark.Lesson_id === URL_id[0]) {
                            setValues({ ...values, BookmarkId:bookmark._id, isBookmarked: true })
                            
                        }
                    })
                }

            })
    };

    const { BookmarkId, isBookmarked, lessonName,  } = values;

    //handle all edits to the bookmark as a POST
    const postBookmark = () => {
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
                axios({
                    method: 'GET',
                    url:process.env.REACT_APP_API+'/lesson/'+URL_id
                }).then( res => {
                    const lessonTitle = res.data.title

                    console.log(lessonTitle, URL_id[0], userId)
                    axios({
                        method: "POST",
                        url: process.env.REACT_APP_API + '/user/bookmarks/' + URL_id[0],
                        headers: {
                            Authorization: 'Bearer ' + token
                        },
                        data: { User_id: userId, lesson_title: lessonTitle}
                    }).then(response => {
                        console.log("YOU ARE NOW IN BOOKMARK")
                        console.log(response)
                    })
                })
            })
    }

    function Image() {
        if (isBookmarked) {
            console.log('you made it',isBookmarked)
            return <img src={'/images/bookmark-ribbon.png'} id="bookmark-lesson" alt="bookmark"/>
        } else {
            console.log('nope', isBookmarked)
            return ""
        }
    }

    // what the user is viewing
    return (
        <div>
        <div id="btn-bookmark" onClick={()=>postBookmark()}>Bookmark</div>
        <div classname="bookmark-container" style={{width:'100px', height:'250px', backgroundColor:"red", position:'absolute', marginLeft:'80%', marginTop:'-100px'}}>
            <Image />
            </div>
        </div>
    );
};

export default UserBookmark;