import React, { Component } from "react";
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Layout from '../../components/NavigationBar/index';
import './style.css'
import UserOptions from './UserOptions'
import UserLesson from './UserLesson'
import { isAuth } from '../../../auth/helpers';


class Lesson extends Component {

  state = {
    lesson: "",
    // token : ""
  };


  componentDidMount() {
    this.loadLesson();
  }

  loadLesson = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/lesson/` + this.props.match.params.id,
    })
      .then(res => {
        console.log(res.data)
        this.setState({ lesson: res.data })
      })
  };

  render() {

    return (
      <div>
        <Layout />
        <h2>{this.state.lesson.title}</h2>
        <div className="main"></div>
        <div className="backLessonNav"></div>
        <div className="lessonNav">
          <button className="btn-scriptures">Scriptures</button>
          {isAuth() && (
            <UserOptions />
            )}
        </div>
        <div className="lessonDisplay">{this.state.lesson.body}</div>
      </div>
    );
  }
}

export default Lesson;