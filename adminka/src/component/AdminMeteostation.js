import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Form, Button, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { bindActionCreators } from 'redux';
import { getStationId, AddWeatherStation } from '../redux/actions/index';

class AdminMeteostation extends Component {
    constructor(props){
        super(props);
        this.state = {
            Station: "zaporozhye",
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
            Message: false
        }    
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
            
        }else{
            this.props.getStationId('zaporozhye');
        }
         
    }

    handelStationChange = (e) => {
        this.props.getStationId(e.target.value);
        this.setState({ Station: e.target.value, Message: false });
    }

    handelSaveValue = (obj) => {
        this.setState({ [obj.name]:obj.value, Message: false });
    }

    OnChangeTimeGaps = (e) => {
        this.setState({ TimeGaps:e.target.value, Message: false });
    }

    OnChangeDiraction = (e) => {
        this.setState({ DiractionWind: e.target.value, Message: false });
    }

    OnChangePhenomena = (e) => {
        this.setState({ phenomena: e.target.value, Message: false });
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
            date: this.state.date,
            Station: this.state.Station
        }
        this.props.AddWeatherStation(weather);
        this.setState({
            Station: "zaporozhye",
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
            Message: true
        })
    } 

    OnClick = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    render() {
    return (
        <Grid>
        <Grid.Row>
            <Grid.Column width={4}/>
            <Grid.Column width={7}>
                {this.state.Message ? <Message success header="Сохранение" content="Данные успешно сохранены" /> : <div /> }
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column  width={5}/>
            <Grid.Column width={5}> 
                <Form onSubmit={this.handelSubmit}>
                    <Form.Field label="Станция" control="select" onChange={this.handelStationChange}>
                        <option value="zaporozhye">Запорожье</option>
                        <option value="berdyansk">Бердянск</option>
                        <option value="melitopol">Мелитополь</option>
                        <option value="botievye">Ботиево</option>
                        <option value="prism">Пришиб</option>
                        <option value="kyrylivka">Кириловка</option>
                        <option value="gulyaypole">Гуляйполе</option>
                    </Form.Field>
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
                    { this.state.Station === "zaporozhye" || this.state.Station  === "berdyansk"? 
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
                </Form>
            </Grid.Column>
        </Grid.Row>
        </Grid>);
    }
}


const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signup')),
    getStationId: bindActionCreators(getStationId ,dispatch),
    AddWeatherStation: bindActionCreators(AddWeatherStation, dispatch),
});

export default connect(null,mapDispatchToProps)(AdminMeteostation); 