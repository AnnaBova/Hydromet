import React, { Component } from 'react';
import { Form, Button, TextArea, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { DayValid, FullDataValid, YearsValid } from '../utils/DataValid';
import { HourValid } from '../utils/TimeValid';
const InputSize = 4;

class ClimateData extends Component {
    constructor(props){
        super(props);
        this.state = {
            day: "",
            mounth: "январь",
            year: "",
            date:"",
            value:"",
            SelectorValue: "SrTemperature",
            SrTemperature:{},
            MaxTemperature: {},
            MinTemperature: {},
            StormWarning: "",
            DateBulletin: "",
            Time:"",
            ErrorMessage: false
        }
    }

    handelSaveValue = (obj) => {
        this.props.setMessage();
        this.setState({[obj.name]:obj.value, ErrorMessage: false});
    }

    handelOnChange = (e) => {
        this.props.setMessage();
        this.setState({ SelectorValue: e.target.value, date: "", value: "", ErrorMessage: false})
    }

    handelSubmit = () => {
        var obj = {
            ...this.props.ClimateData,
            StormText: this.state.StormWarning,
            day: this.state.day,
            mounth: this.state.mounth,
            year: this.state.year,
            DateBulletin:this.state.DateBulletin,
        }
        switch(this.state.SelectorValue){
            case 'MaxTemperature': {
                obj.MaxTemperature = { 
                    date: this.state.date,
                    value: this.state.value
                }
                break;
            }
            case 'MinTemperature': {
                obj.MinTemperature =  { 
                    date: this.state.date,
                    value: this.state.value
                }
                break;
            }
            default: {
                obj.SrTemperature = { 
                    date: this.state.date,
                    value: this.state.value
                }
                break;
                }
            }
            if(DayValid(this.state.day) && 
                FullDataValid(this.state.DateBulletin) && 
                HourValid(this.state.Time) && 
                YearsValid(this.state.year) &&
                YearsValid(this.state.date)){
                this.props.Submit(obj);
                this.setState({

                    date:"",
                    value:"",
                    DateBulletin: "",
                    Time: "",
                    ErrorMessage: false
                });
            }
            else{
                this.setState({ErrorMessage: true});
            }
           
    }

    handelChangeTextArea = (e) => {
        this.props.setMessage();
        this.setState({StormWarning:e.target.value, ErrorMessage: false});
    }

    handelOnChangeMounth = (e) => {
        this.props.setMessage();
        this.setState({mounth: e.target.value, ErrorMessage: false});
    }

    render() {
    return (
    <div>
        <Grid>
            <Grid.Row>  
                <Grid.Column width={4}/>
                <Grid.Column width={7}>
                    <Message success header="Сохранение" content="Данные успешно сохранены" />
                    <Message error header="Ошибка" content="Неправильно введена дата или время" visible={this.state.ErrorMessage}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column  width={5}/>
                <Grid.Column width={8}>
                <Form.Group>
                    <Form.Field width={InputSize}>
                        <InputComponent 
                            value = {this.state.day}
                            name="day"
                            label="День"
                            saveValue ={this.handelSaveValue}
                        />
                    </Form.Field>
                    <Form.Field 
                        width={InputSize}
                        control="select"
                        label="Месяц"
                        value={this.state.mounth}
                        onChange={this.handelOnChangeMounth}
                    >
                        <option value="январь">Январь</option>
                        <option value="февраль">Февраль</option>
                        <option value="апрель">Апрель</option>
                        <option value="май">Май</option>
                        <option value="июнь">Июнь</option>
                        <option value="июль">Июль</option>
                        <option value="август">Август</option>
                        <option value="сентябрь">Сентябрь</option>
                        <option value="октябрь">Октябрь</option>
                        <option value="ноябрь">Ноябрь</option>
                        <option value="декабрь">Декабрь</option>
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
                <Form.Group>
                <Form.Field width={InputSize}>
                <InputComponent 
                            value = {this.state.DateBulletin}
                            name = "DateBulletin"
                            label="Белютень составлен дата: "
                            saveValue = {this.handelSaveValue}
                            placeholder = "дд:мм:гггг"
                />
                </Form.Field>
                <Form.Field>
                    <InputComponent 
                        value={this.state.time}
                        name="Time"
                        label="Время составления: "
                        saveValue={this.handelSaveValue}
                        placeholder="Во сколько часов?"
                    />
                </Form.Field>
                </Form.Group>
                <Button onClick={this.handelSubmit}>Сохранить</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>);
    }
}

export default ClimateData;