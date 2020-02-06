import React, { Component } from 'react';
import './Draft.css'
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {stateToHTML} from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


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

        const content = window.localStorage.getItem('content');

        const { editorState } = this.state;
        return (
            <div>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <hr />
          <div>
          {this.state.editor}
          </div>
          <hr />
          <textarea
          style={{width: '100%'}}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        </div>
        )
      }
}

export default PracticeDraft;