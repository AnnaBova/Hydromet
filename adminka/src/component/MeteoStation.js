import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import  InputComponent  from './InputComponent';
import { getStation, AddWeather } from '../redux/actions/index';

class MeteoStation extends Component {

    constructor(props){
        super(props);
        this.state = {
            TimeGaps: "00",
            temperature: "",
            DiractionWind: "up",
            wind: "",
            pressure: "",
            phenomena: "sun",
            validation: false,
            waterField: true,
            waterTemperature: "",
            date: "",
        }    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }else{
            this.props.getStation();
        }
    }

    handelSubmit = (e) => {
        const weather = {
            TimeGaps: this.state.TimeGaps,
            temperature: this.state.temperature,
            DiractionWind: this.state.DiractionWind,
            wind: this.state.wind,
            pressure: this.state.pressure,
            phenomena: this.state.phenomena,
            waterTemperature: this.state.waterTemperature,
            date: this.state.date
        }
        this.props.AddWeather(weather);
    } 

    handelSaveValue = (obj) => {
        this.setState({[obj.name]:obj.value});
    }

    OnChangeTimeGaps = (e) => {
        this.setState({ TimeGaps:e.target.value });
    }

    OnChangeDiraction = (e) => {
        this.setState({ DiractionWind: e.target.value });
    }

    OnChangePhenomena = (e) => {
        this.setState({ phenomena: e.target.value });
    }

    OnClick = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    render() {
        return ( 
        <Form onSubmit={this.handelSubmit}>
            <Form.Field  >
                <InputComponent 
                    value = {this.state.date}
                    label="Дата"
                    name="date"
                    type="text" 
                    saveValue = {this.handelSaveValue}
                />
            </Form.Field>
            <Form.Field label='Время наблюдения' control='select' name="TimeGaps" onChange={this.OnChangeTimeGaps}>
                <option value='00'>00 или 02</option>
                <option value='03'>03 или 05</option>
                <option value='06'>06 или 08</option>
                <option value='09'>09 или 11</option>
                <option value='12'>12 или 14</option>
                <option value='15'>15 или 17</option>
                <option value='18'>18 или 20</option>
                <option value='21'>21 или 23</option>
            </Form.Field>
            <Form.Field  >
                <InputComponent 
                    value = {this.state.temperature}
                    label="Температура"
                    name="temperature"
                    type="text" 
                    saveValue = {this.handelSaveValue}
                />
            </Form.Field>
            <Form.Field  >
                <InputComponent 
                    value = {this.state.wind}
                    label="Скорость ветра"
                    name="wind"
                    type="text" 
                    saveValue = {this.handelSaveValue}
                />
            </Form.Field>
            <Form.Field label='Направление ветра' control='select' name="DiractionWind" onChange= {this.OnChangeDiraction}>
                <option value='up'>Северное</option>
                <option value='down'>Южное</option>
                <option value='left'>Западное</option>
                <option value='right'>Восточное</option>
                <option value='up rot-45'>Северо-Заподное</option>
                <option value='left rot-45'>Северо-Восточное</option>
                <option value='down rot-45'>Юго-Западное</option>
                <option value='right rot-45'>Юго-Восточное</option>
            </Form.Field>
            <Form.Field>
                <InputComponent 
                    value = {this.state.pressure}
                    label="Атмосферное давление"
                    name="pressure"
                    type="text" 
                    saveValue = {this.handelSaveValue}
                />
            </Form.Field>
            <Form.Field label='Атмосферные явления' control='select' name="phenomena" onChange= {this.OnChangePhenomena}>
                <option value='sun'>Солнечно</option>
                <option value='sun_cloud'>Облачно</option>
                <option value='cloud'>Пасмурно</option>
                <option value='cloud_rain_snow'>Снег с дождем</option>
                <option value='cloud_rain'>Дождь</option>
                <option value='cloud_snow'>Снег</option>
                <option value='fog'>Туман</option>
            </Form.Field> 
            { this.props.water === "zaporozhye" || this.props.water === "berdyansk"? 
                (<Form.Field>
                    <InputComponent 
                        value = {this.state.waterTemperature}
                        label="Температура воды"
                        name="waterTemperature"
                        type="text" 
                        saveValue = {this.handelSaveValue}
                    />
                </Form.Field>): <div />
            }        
                <Button type="submit" primary>Отправить форму</Button>
                <Button type="button" onClick = {this.OnClick} >Выйти</Button>
        </Form>);
    }
}

const mapStateToProps = (state) => ({
    water: state.authorization.StationName
});

const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signup')),
    getStation: bindActionCreators(getStation ,dispatch),
    AddWeather: bindActionCreators(AddWeather, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MeteoStation);