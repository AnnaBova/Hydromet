import React, { Component } from 'react';
import { Grid, Form, Button, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid } from '../utils/DataValid';

class Radiation extends Component {

    constructor(props){
        super(props);
        this.state={
            date: "",
            value: "",
            Message: false
        }
    }

    handleSaveValue = (obj) =>{
        this.props.setMessage();
        // this.setState({
        //   [obj.name]:obj.value,
        //   Message: false
        // });
        this.props.UpdateRadiation({
            ...this.props.Raditional,
            [obj.name]:obj.value,
        });
    }

    handleOnChange = (e) => {
        this.props.setMessage();
        this.props.ChangeStationRaditional(e.target.value);
    }

    handleOnClick = () => {
        if(FullDataValid(this.props.Raditional.Date)){
            this.props.EditRaditionalReqest({
                ...this.props.Raditional
            })
            this.props.SetMessageTrue();
            this.setState({Message: false})
        }else{
            this.setState({
                Message: true
            });
        }
    }

    render() {
    return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4} />
                    <Grid.Column width={7}>
                        <Message success header="Збереження" content="Дані успішно збережені" />
                        <Message error header="Помилка" content="Неправильна дата" visible={this.state.Message}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={5}/>
                    <Grid.Column width={5}>
                            <Form.Field>
                                <InputComponent
                                    label="Дата"
                                    name="Date"
                                    value={this.props.Raditional.Date}
                                    saveValue={this.handleSaveValue}
                                />
                            </Form.Field>
                            <Form.Field control="select" label="Город" value={this.state.station} onChange={this.handleOnChange}>
                                <option value="0">Запоріжжя</option>
                                <option value="1">Бердянск</option>
                                <option value="2">Мелітополь</option>
                                <option value="3">Ботиево</option>
                                <option value="4">Пришиб</option>
                                <option value="5">Кирилівка</option>
                                <option value="6">Гуляйполе</option>
                            </Form.Field>
                            <Form.Field>
                                <InputComponent
                                    label="Значення"
                                    name="value"
                                    value={this.props.Raditional.value}
                                    saveValue={this.handleSaveValue}
                                />
                            </Form.Field>
                            <Button onClick={this.handleOnClick}>Зберегти</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>);
    }
}


export default Radiation;
