import React, { Component } from 'react';
import { Form, TextArea, Grid, Button, Message, Icon } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid } from '../utils/DataValid';
import '../style/Event.css'
class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: undefined,
            title: "",
            text: "",
            date: "",
            description: "",
            Message: false,
        }
    }
    handleOnChange = (e) => {
        e.preventDefault()
        this.props.setMessageFalse();
        this.setState({file: e.target.files[0]});
    }

    handleSaveValue = (obj) => {
        this.props.setMessageFalse();
        this.setState({[obj.name]:obj.value});
    }

    handleOnChangeText = (e) => {
        this.props.setMessageFalse();
        this.setState({ text: e.target.value });
    }

    handleSubmit = () => {
        if(FullDataValid(this.state.date)){
            var obj = {
                title: this.state.title,
                text: this.state.text,
                file: this.state.file,
                date: this.state.date,
                description: this.state.description
            }
            if(this.state.file){
                this.props.UploadFile(obj);
                this.props.setMessageTrue()
                this.setState({
                    file: undefined,
                    title: "",
                    text: "",
                    date: "",
                    description: "",
                })
                this.setState({Message: false});
            }
        }else{
            this.setState({Message: true})
        }
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3} />
                    <Grid.Column width={6}>
                        { this.props.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                        { this.state.Message ? <Message error header="Помилка" content="Неправильно введена дата" /> : <div /> }
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4} />
                    <Grid.Column width={4}>
                        <Form>
                                <Form.Field>
                                    <InputComponent
                                        label="Дата"
                                        name="date"
                                        value={this.state.date}
                                        saveValue={this.handleSaveValue}
                                        placeholder="формат дд.мм.рррр"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        label="Назва"
                                        name="title"
                                        value={this.state.title}
                                        saveValue={this.handleSaveValue}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        label="Опис"
                                        name="description"
                                        value={this.state.description}
                                        saveValue={this.handleSaveValue}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Текст</label>
                                    <TextArea
                                        value={this.state.text}
                                        autoHeight
                                        onChange={this.handleOnChangeText}
                                    />
                                </Form.Field>
                                <Form.Field>
                                  <input disable="true" type="text" value={(this.state.file)?this.state.file.name : ''} />
                                    <input accept="image/jpeg" type="file" name="file" id="file" className="inputfile" onChange={this.handleOnChange} />
                                    <label htmlFor="file" className="ui huge green floated button">
                                        <Icon name="upload"></Icon>
                                        Завантажити фотографію
                                    </label>
                                </Form.Field>
                                <Button primary onClick={this.handleSubmit}>Зберегти подію</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>);
    }
}


export default Event;
