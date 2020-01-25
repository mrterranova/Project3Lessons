import React, { Component } from "react";
import userAPI from "../../../utils/userAPI"
import { Button, Modal } from "react-bootstrap"

class ProfileContainer extends Component {
    constructor(){
        super ()
        this.state = {
            show: false
        }
    }

    state = {
        User: [],
        
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        userAPI.getUser()
          .then(res =>
            this.setState({ User : res })
          )
          .catch(err => console.log(err));
      };    

    handleModal(){
        if ( this.state.show === false ) {
            this.setState({ show : true })
        }
        if ( this.state.show === true ) {
            this.setState({ show : false })
        }
    }

    render() {
        return (
            <div>
                <Button  onClick= {()=> {this.handleModal()}}>Submit Your Question</ Button>
                <Modal show={this.state.show}>
                    <Modal.Header><h1>Want to see your question pop up?</h1></Modal.Header>
                    <Modal.Body> 
                        <p>If you have a question that you would like to see in the game, then we would love to see it in the game too! All you have to do is submit your question below:</p>
                        <p>Remember all questions must contain the following:</p>
                        <ul>
                        <li>Must be about coding and/or math-based coding logic.</li>
                        <li>All questions should enhance the interview processes for software engineers.</li>
                        <li>Languages we accept currently: Javascript, Node, MySQL, Mongo, Sequelize, Mongoose, Express, JQuery, React, HTML, CSS, Bootstrap, Github, and Bootstrap</li>
                        </ul>
                        <br/>
                        <input type="text" placeholder="Share your question here!"></input>

                    </Modal.Body> 
                    <Modal.Footer>
                        <Button onClick={()=> {this.handleModal()}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


export default ProfileContainer;