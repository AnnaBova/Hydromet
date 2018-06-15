import React, { Component } from 'react';
import {Button, Grid} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [
        { header: [1, 2, 3, 4, 5,  false] },
        { font: [] },
        { align: [] },
        { color: [] },
        { background: [] }
        ],
        ['bold', 'italic', 'underline', 'strike'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['code-block', 'blockquote'],
        ['link', 'image'],
        ['clean']
    ]
};

const formats = [
    'header', 'script',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'code-block',
    'clean', 'header'
];
  

class DecadBulletin extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleChange(value) {
        this.setState({ text: value });
    }

    handelSubmit = () => {
        this.props.SubmitDecadBulletin(this.state.text);
    }
    
    render() {
        return (
            <Grid>
                <Grid.Row>   
                <ReactQuill
                    className="QuillWrap"
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={this.state.text}
                    onChange={this.handleChange}
                />
                </Grid.Row>
                <Grid.Row>
                <Grid.Column width={3}/>
                <Grid.Column>
                    <Button onClick = {this.handelSubmit} primary>Сохранить</Button>
                </Grid.Column>
                </Grid.Row>
            </Grid>) 
    }
}



export default DecadBulletin;