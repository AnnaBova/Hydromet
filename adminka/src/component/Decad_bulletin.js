import React, { Component } from 'react';
import { Button, Grid, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setDecadeBulleting,
         getDecadeBulletin } from '../redux/actions/index';

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

    componentDidMount() {
      this.props.getDecadeBulletin();
    }


    handleChange(value) {
        this.props.setMessage();
        this.props.setDecadeBulleting(value);
    }

    handleSubmit = () => {
        this.props.setMessage();
        this.props.SubmitDecadBulletin(this.props.decadeBulleting);
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}/>
                    <Grid.Column width={7}>
                        <Message success header="Збереження" content="Дані успішно збережені" />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4} />
                <ReactQuill
                    className="QuillWrap"
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={this.props.decadeBulleting}
                    onChange={this.handleChange}
                />
                </Grid.Row>
                <Grid.Row>
                <Grid.Column width={7}/>
                <Grid.Column>
                    <Button onClick = {this.handleSubmit} primary>Зберегти</Button>
                </Grid.Column>
                </Grid.Row>
            </Grid>)
    }
}

function mapStateToProps(state){
  return {
    decadeBulleting: state.hydrometeorolog_bulletin.decadeBulletin,
  }
}

function mapDispatchToProps(dispatch){
  return {
    setDecadeBulleting: bindActionCreators(setDecadeBulleting, dispatch),
    getDecadeBulletin: bindActionCreators(getDecadeBulletin, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DecadBulletin);
