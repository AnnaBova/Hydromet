import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import  InputComponent  from './InputComponent';
import { getStation, AddWeather } from '../redux/actions/index';
import { FullDataValid } from '../utils/DataValid';

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
                Message: false,
                ErrorMessage: false,
            }
        }

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
        if(FullDataValid(this.state.date)){
            this.props.AddWeather(weather);
            this.setState({
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
                Message: true,
                ErrorMessage: false
            })
        }else{
            this.setState({ErrorMessage: true});
        }
    }

    handelSaveValue = (obj) => {
        this.setState({[obj.name]:obj.value, Message: false, ErrorMessage: false });
    }

    OnChangeTimeGaps = (e) => {
        this.setState({ TimeGaps:e.target.value, Message: false, ErrorMessage: false });
    }

    OnChangeDiraction = (e) => {
        this.setState({ DiractionWind: e.target.value, Message: false, ErrorMessage: false });
    }

    OnChangePhenomena = (e) => {
        this.setState({ phenomena: e.target.value, Message: false, ErrorMessage: false });
    }

    OnClick = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    handelGygrology = () => {
        this.props.getGydrolygy();
    }

    render() {
        return (
        <Grid>

            <Grid.Row>
                <Grid.Column width={4}/>
                <Grid.Column width={7}>
                    { this.state.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                    { this.state.ErrorMessage ? <Message error header="Помилка" content="Неправильна дата"/> : <div /> }
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column  width={5}/>
                <Form onSubmit={this.handelSubmit}>
                <Grid.Column width={5}>
                        <Form.Field  >
                            <InputComponent
                                value = {this.state.date}
                                label="Дата"
                                name="date"
                                type="text"
                                saveValue = {this.handelSaveValue}
                                placeholder = "формат дд.мм.гггг"
                            />
                        </Form.Field>
                        <Form.Field label='Час спостереження' control='select' name="TimeGaps" onChange={this.OnChangeTimeGaps}>
                            <option value='00'>00 або 02</option>
                            <option value='03'>03 або 05</option>
                            <option value='06'>06 або 08</option>
                            <option value='09'>09 або 11</option>
                            <option value='12'>12 або 14</option>
                            <option value='15'>15 або 17</option>
                            <option value='18'>18 або 20</option>
                            <option value='21'>21 або 23</option>
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
                                label="Швидкість вітру"
                                name="wind"
                                type="text"
                                saveValue = {this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field label='Направление ветра' control='select' name="DiractionWind" onChange= {this.OnChangeDiraction}>
                            <option value='up'>Північне</option>
                            <option value='down'>Південне</option>
                            <option value='left'>Західне</option>
                            <option value='right'>Східне</option>
                            <option value='up rot-45'>Північно-Західне</option>
                            <option value='left rot-45'>Північно-Східне</option>
                            <option value='down rot-45'>Південно-Західне</option>
                            <option value='right rot-45'>Південно-Східне</option>
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value = {this.state.pressure}
                                label="Атмосферний тиск"
                                name="pressure"
                                type="text"
                                saveValue = {this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field label='Атмосферные явления' control='select' name="phenomena" onChange= {this.OnChangePhenomena}>
                            <option value='sun'>Сонячно</option>
                            <option value='sun_cloud'>Хмарно</option>
                            <option value='cloud'>Похмуро</option>
                            <option value='cloud_rain_snow'>Сніг з дощем</option>
                            <option value='cloud_rain'>Дощ</option>
                            <option value='cloud_snow'>Сніг</option>
                            <option value='fog'>Туман</option>
                            <option value="mist">Мряка</option>
                            <option value="snower">Град</option>
                        </Form.Field>
                        { this.props.water === "zaporozhye" || this.props.water === "berdyansk"?
                            (<Form.Field>
                                <InputComponent
                                    value = {this.state.waterTemperature}
                                    label="Температура води"
                                    name="waterTemperature"
                                    type="text"
                                    saveValue = {this.handelSaveValue}
                                />
                            </Form.Field>): <div />
                        }
                            <Button type="submit" primary>Надіслати форму</Button>
                            { this.props.water === "zaporozhye" ? <Link to="/gydrolygy"><Button type="button">Заповнити гідрологічні спостереження</Button></Link>: <div />  }
                            <Button type="button" onClick = {this.OnClick} >Вийти</Button>

                </Grid.Column>
                </Form>
            </Grid.Row>

        </Grid>);
    }
}

const mapStateToProps = (state) => ({
    water: state.authorization.StationName
});

const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signin')),
    getStation: bindActionCreators(getStation ,dispatch),
    AddWeather: bindActionCreators(AddWeather, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MeteoStation);
