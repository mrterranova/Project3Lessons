import React, { Component } from "react";
import axios from 'axios';
import { List, ListNote } from '../../components/List'
import { Link } from 'react-router-dom';
import Layout from '../../components/NavigationBar/index';
import DisplayLessons from './DisplayLessons';


class AllLessons extends Component {

  render() {
      
    return (
      <div>
          <Layout />
          <h2>All Current Uploaded Lessons</h2>
          <DisplayLessons />
      </div>
    );
  }
}

export default AllLessons;
