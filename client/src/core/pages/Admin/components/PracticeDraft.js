import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {Accordion, Card} from 'react-bootstrap';
import axios from 'axios'


class PracticeDraft extends Component {

        constructor(props) {
            super(props);

            this.state = { };
            const content = window.localStorage.getItem('content');
            if (content) {
                this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
              } else {
                this.state.editorState = EditorState.createEmpty();
              }
            
            const html = '';
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              this.state = {
                  editorState,
                };
            }
        }
        

          saveContent = (content) => {
            window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
          }
        
    
      onEditorStateChange: Function = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
          editorState,
        });
        console.log(contentState)
      };

      render() {

        const { editorState } = this.state;
        return (
          <div>
            <div className='btn-post-lesson'> 
              
            </div>
            <div className="bodyText">
<Accordion defaultActiveKey="0" style={{ width: '100%'}}>
  <form>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      Start Lesson Here
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        <label for="title">Title of Lesson:</label>
        <br />
      <input type="text" name="title" placeholder="title goes here..." style={{width:'100%'}}/>
      <label for="keyTerms">Searchable Key Terms:</label>
      <br />
      <input type="text" name="keyTerms" placeholder="write keyTerms with # and no spaces..."  style={{width:'100%'}}/>
      <label for="scriptures">Scriptures:</label>
      <br />
      <textarea name="scriptures with a , between..." style={{width:'100%'}}></textarea>
        </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Word Pad Lessons
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <div className="editorState">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          /></div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="2">
      HTML Raw Data
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
      <textarea
          style={{width: '100%', height: '40vh'}}
          editorState = {editorState}
          onEditorStateChange ={this.onEditorStateChange}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        </Card.Body>
    </Accordion.Collapse>
  </Card>
  </form>
</Accordion>

        </div>

        </div>
        )
      }
}

export default PracticeDraft;