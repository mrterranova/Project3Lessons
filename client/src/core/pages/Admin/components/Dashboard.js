import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap'; 
import DraftLesson from './DraftLesson'
import DisplayLessons from '../../AllLessons/DisplayLessons'
import PracticeDraft from './PracticeDraft'

class Dashboard extends Component { 
 


    render() {
        return (
<Tabs defaultActiveKey="Lessons" id="uncontrolled-tab-example">
  <Tab eventKey="Lessons" title="All Lessons">
      <DisplayLessons />
  </Tab>
  <Tab className="tab-style-draftLesson" eventKey="CreateLesson" title="Create Lesson">
    <DraftLesson />
  </Tab>
  <Tab eventKey="Future Tab" title="Future Tab">
    <div style={{marginLeft: '3rem', width: '90%'}}>
    <PracticeDraft />
    </div>
  </Tab>
</Tabs>
        )
    }
}

export default Dashboard;