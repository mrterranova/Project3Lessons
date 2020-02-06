import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import "../style.css"
import 'draft-js/dist/Draft.css'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie } from '../../../../auth/helpers';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class DraftLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createEmpty(), 
        token: getCookie('token'),
        name: "", 
        _id: "", 
        scriptures: "", 
        body: "", 
        title: "",
        keyTerms: ""
    };

    // axios({
    //     method: 'GET',
    //     url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
    //     headers: {
    //         Authorization: `Bearer ${this.state.token}`
    //     }
    // })
    //     .then(response => {
    //         console.log(response)
    //         this.setState({ 
    //             _id : response.data._id, 
    //             name: response.data.name 
    //         })
    //     })
        
this.onChange = editorState => this.setState({editorState});
}

handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onUnderlineClick = () => {
    this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
};

onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
};

onItalicClick = () => {
    this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
};




render() {

    const LessonForm = () => {
        return(
        <form>
            <div className="form-group">
            <label className="settings-label">Lesson Title</label>
            <input type="text" className="form-control settings-form form-lesson-input-fields" />
            </div>
            <div className="form-group">
                <label className="settings-label">List Any Key Search Words</label>
                <input type="text" className="form-control settings-form .form-lesson-input-fields" />
            </div>
        </form>
        )
    }
      
    return (
        <div className="editorContainer">
            <h3 className="editor-heading">Type a New Lesson Below</h3>
            <div className="contains-lesson-form">
                {LessonForm()}
            </div>
            <div className="contains-editor">
        <div className="editor-outline">
            <div className="tool-bar">
            <button onClick={this.onUnderlineClick}>U</button>
				<button onClick={this.onBoldClick}>
					<b>B</b>
				</button>
				<button onClick={this.onItalicClick}>
					<em>I</em>
				</button>
            </div>
        <Editor 
        editorState={this.state.editorState} 
        onChange={this.onChange} 
        handleKeyCommand={this.handleKeyCommand} />
        </div>
        </div>
        </div>
    );
  }
}
ReactDOM.render(<DraftLesson />, document.getElementById('root'));

export default DraftLesson;