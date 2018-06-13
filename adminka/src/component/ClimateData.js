import React, { Component } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import InputComponent from './InputComponent';

const InputSize = 4;

class ClimateData extends Component {
    constructor(props){
        super(props);
        this.state = {
            day: "",
            mounth: "",
            year: "",
            date:"",
            value:"",
            SelectorValue: "SrTemperature",
            SrTemperature:{},
            MaxTemperature: {},
            MinTemperature: {},
            StormWarning: "",
            DateBulletin: "",
        }
    }

    handelSaveValue = (obj) => {
        this.setState({[obj.name]:obj.value});
    }

    handelOnChange = (e) => {
        console.log(e.target.value);
        this.setState({[this.state.SelectorValue]: {
                date: this.state.date,
                value: this.state.value,
                }, SelectorValue: e.target.value, date: "", value: ""})
    }

    handelSubmit = () => {
        this.props.Submit({
            SrTemperature: this.state.SrTemperature,
            MaxTemperature: this.state.MaxTemperature,
            MinTemperature: this.state.MinTemperature,
            StormText: this.state.StormWarning,
            day: this.state.day,
            mounth: this.state.mounth,
            year: this.state.year,
            DateBulletin:this.state.DateBulletin
            });
    }

    handelChangeTextArea = (e) => {
        this.setState({StormWarning:e.target.value});
    }

    render() {
    return (
    <div>
        <Form.Group>
            <Form.Field width={InputSize}>
                <InputComponent 
                    value = {this.state.day}
                    name="day"
                    label="День"
                    saveValue ={this.handelSaveValue}
                />
            </Form.Field>
            <Form.Field width={InputSize}>
                <InputComponent
                    value = {this.state.mounth} 
                    name="mounth"
                    label="Месяц"
                    saveValue ={this.handelSaveValue}
                />
            </Form.Field>
            <Form.Field width={InputSize}>
                <InputComponent
                    value = {this.state.year} 
                    name="year"
                    label="Год"
                    saveValue ={this.handelSaveValue}
                />
            </Form.Field>
        </Form.Group> 
        <Form.Field control="select" width={InputSize} onChange={this.handelOnChange} value={this.state.SelectorValue}>
            <option value="SrTemperature">Средняя температура</option>
            <option value="MaxTemperature">Максимальная температура</option>
            <option value="MinTemperature">Минимальная температура</option>
        </Form.Field>
        <Form.Group>
            <Form.Field width={InputSize}>
                <InputComponent 
                    value = {this.state.value}
                    name="value"
                    label="Значение"
                    saveValue ={this.handelSaveValue}
                />
            </Form.Field>   
            <Form.Field>
                <InputComponent 
                    value = {this.state.date}
                    name = "date"
                    label="Год"
                    saveValue ={this.handelSaveValue}
                />
            </Form.Field> 
        </Form.Group>
        <Form.Field width={InputSize}>
                <label>Штормовое предупреждение</label>
                <TextArea autoHeight value={this.state.StormWarning} name="StormWarning" placeholder='Tell us more' onChange={this.handelChangeTextArea} />
        </Form.Field>
        <Form.Field>
        <InputComponent 
                    value = {this.state.DateBulletin}
                    name = "DateBulletin"
                    label="Белютень составлен: "
                    saveValue ={this.handelSaveValue}
        />
        </Form.Field>
        <Button onClick={this.handelSubmit}>Сохранить</Button>
    </div>);
    }
}

export default ClimateData;