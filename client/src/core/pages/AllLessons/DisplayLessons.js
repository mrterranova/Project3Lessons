import React, { Component } from "react";
import axios from 'axios';
import { List, ListNote } from '../../components/List'
import { Link } from 'react-router-dom';
import Layout from '../../components/NavigationBar/index';


class AllLessons extends Component {

  state = {
lessons: []
  };

  componentDidMount() {
    this.loadLessons();
  }

  loadLessons = () => {
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/lessons`,
    })
        .then(res => {
            console.log(res.data)
            this.setState ({ lessons: res.data })
        })
  };

  render() {
      
    return (
      <div>
{this.state.lessons.length ? (
          <List>
            {this.state.lessons.map(lesson => (
              <ListNote key={lesson._id}>
                  <Link className="nav-link" to={'/lesson/'+lesson._id}><h3>{lesson.title}</h3></Link>
            <div>Key Terms: {lesson.keyTerms.split("#").join(", ")}</div>
              </ListNote>
            ))}
          </List>
        ) : (
            <h3>For some reason lessons are offline. Please contact No-Limits Ministries at nolimitsministries@mail.com.</h3>
          )}
      </div>
    );
  }
}

export default AllLessons;
