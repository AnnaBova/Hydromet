import React, { Component } from 'react';
import { Form, TextArea, Grid, Button } from 'semantic-ui-react';
import InputComponent from './InputComponent';

class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: undefined,
            title: "",
            text: "",
            date: "",
            description: "",
        }
    }
    handelOnChange = (e) => {
        e.preventDefault()
        this.setState({file: e.target.files[0]});
    }

    handelSaveValue = (obj) => {
        this.setState({[obj.name]:obj.value});
    }

    handelOnChangeText = (e) => {
        this.setState({ text: e.target.value });
    }

    handelSubmit = () => {
        var obj = {
            title: this.state.title,
            text: this.state.text,
            file: this.state.file,
            date: this.state.date,
            description: this.state.description
        }
        if(this.state.file){
            this.props.UploadFile(obj);
        }
    }

    render() {
        return (
            <Grid>
            <Grid.Column width={4} />
            <Grid.Column width={4}>
                <Form>
                        <Form.Field>
                            <InputComponent 
                                label="Дата"
                                name="date"
                                value={this.state.date}
                                saveValue={this.handelSaveValue}
                            />
                         </Form.Field>
                        <Form.Field>
                            <InputComponent 
                                label="Название"
                                name="title"
                                value={this.state.title}
                                saveValue={this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent 
                                label="Описание"
                                name="description"
                                value={this.state.description}
                                saveValue={this.handelSaveValue}
                            />
                         </Form.Field>
                        <Form.Field>
                            <label>Текст</label>
                            <TextArea 
                                autoHeight 
                                onChange={this.handelOnChangeText}
                            />
                        </Form.Field>
                        <Form.Field>
                            <input type="file" onChange={this.handelOnChange} />
                        </Form.Field>
                        <Button primary onClick={this.handelSubmit}>Сохранить событие</Button>
                </Form>
            </Grid.Column>
            </Grid>);
    }
}


export default Event;