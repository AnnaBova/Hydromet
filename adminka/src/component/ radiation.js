import React, { Component } from 'react';
import {Grid, Form, Button} from 'semantic-ui-react';
import InputComponent from './InputComponent';

class Radiation extends Component {

    constructor(props){
        super(props);
        this.state={
            date: "",
            value: ""
        }
    }

    handelSaveValue = (obj) =>{
        this.setState({[obj.name]:obj.value});
    }

    handelOnChange = (e) => {
        this.props.ChangeStationRaditional(e.target.value);
    }

    handelOnClick = () => {
        this.props.EditRaditionalReqest({
            ...this.props.Raditional,
            Date: this.state.date,
            value: this.state.value 
        })
    }

    render() {
    return (
            <Grid>
                <Grid.Column width={5}/>
                <Grid.Column width={5}>
                        <Form.Field>
                            <InputComponent 
                                label="Дата"
                                name="date"
                                value={this.state.date}
                                saveValue={this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field control="select" label="Город" value={this.state.station} onChange={this.handelOnChange}>
                            <option value="0">Запорожье</option>
                            <option value="1">Бердянск</option>
                            <option value="2">Мелитополь</option>
                            <option value="3">Ботиево</option>
                            <option value="4">Пришиб</option>
                            <option value="5">Кириловка</option>
                            <option value="6">Гуляйполе</option>
                        </Form.Field>
                        <Form.Field>
                            <InputComponent 
                                label="Значение"
                                name="value"
                                value={this.state.value}
                                saveValue={this.handelSaveValue}
                            />
                        </Form.Field>
                        <Button onClick={this.handelOnClick}>Сохранить</Button>
                </Grid.Column>
            </Grid>);
    }
}


export default Radiation;