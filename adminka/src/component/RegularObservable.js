import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Grid, Button, TextArea} from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { bindActionCreators } from 'redux';
import { getRegularObservable, EditRegularObservable, SubmitDangerPhenomen } from '../redux/actions/index';

const InputSize = 4;

class Forms extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            Position: "с. Осипенко",
            Title: "р. Берда",
            date: "",
            LvlWater: "",
            OutWater: "",
            EditLvl: "",
            phenomena: ""
        }
    }
    componentDidMount(){
        this.props.getRegularObservable();
        if(!localStorage.getItem('token')){
            this.props.noAuthorization(); 
        }  
    }

    handelLogOut = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    handelGetStation = () => {
        this.props.GetStation();
    }
    
    handelSaveValue = (obj) => {
        this.setState({ [obj.name]:obj.value });
    }

    Validation = () => {
        if(this.state.date === "" ||
        this.state.LvlWater === "" ||
        this.state.OutWater === "" ||
        this.state.EditLvl === "" ||
        this.state.phenomena === ""){
            return false;
        }else{
            return true;
        }
    }

    handelOnChangePosition = (e) => {
        if(this.Validation()){
            this.handelSubmit();
        }
        var arr = e.target.value.split(';');
        this.setState({Position:arr[1], Title: arr[0]})
    }

    handelSubmit = () => {
        if(this.Validation()){
            this.props.EditRegularObservable({
                ...this.props.Observ,
                Position: this.state.Position,
                Title: this.state.Title,
                date: this.state.date,
                LvlWater: this.state.LvlWater,
                OutWater: this.state.OutWater,
                EditLvl: this.state.EditLvl,
                phenomena: this.state.phenomena
            })
        }
    }

    handelChangeObserv = (e) => {
        this.setState({Observ: e.target.value});
    }

    handelChangeTextArea = (e) => {
        this.setState({text: e.target.value})
    }

    handelSubmittextArea = () => {
        this.props.SubmitDangerPhenomen(this.state.text);
    }

    render() {
    return (
    <Grid>
        <Grid.Column width={InputSize}/>
        <Grid.Column width={InputSize+1}>
            <h3>Регулярні спостереження в період весняної повені</h3>
            <Form>
                <Form.Field control="select" label ="Точка наблюдения" onChange={this.handelOnChangePosition}>
                    <option value="р. Берда;с. Осипенко">р. Берда(с. Осипенко)</option>
                    <option value="р. Обитічна;м. Приморськ">р. Обитічна(м. Приморськ)</option>
                    <option value="р. Лозуватка;с. Новоолексіївка">р. Лозуватка(с. Новоолексіївка)</option>
                    <option value="р. Молочна;м. Токмак">р. Молочна(м. Токмак)</option>
                    <option value="Дніпровське вдсх.;м. Запоріжжя - верхній б'єф">Дніпровське вдсх.(м. Запоріжжя - верхній б'єф)</option>
                    <option value="р. Молочна;с. Терпіння">р. Молочна(с. Терпіння)</option>
                    <option value="Каховське вдсх.;с. Плавні">Каховське вдсх.(с. Плавні)</option>
                    <option value="Каховське вдсх.;с. Благовіщенка">Каховське вдсх.(с. Благовіщенка)</option>
                    <option value="Каховське вдсх.;с. Розумівка">Каховське вдсх.(с. Розумівка)</option>
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        name="date" 
                        value={this.state.date}
                        label="Дата"
                        saveValue={this.handelSaveValue}
                    />
                </Form.Field>
                <Form.Field control="select" label="Время наблюдения" onChange={this.handelChangeObserv}>
                    <option value="02">02</option>
                    <option value="05">05</option>
                    <option value="08">08</option>
                    <option value="11">11</option>
                    <option value="14">14</option>
                    <option value="17">17</option>
                    <option value="20">20</option>
                    <option value="23">23</option>
                </Form.Field>
                <Form.Field>
                    <InputComponent 
                        value = {this.state.LvlWater}
                        name="LvlWater"
                        label="Відмітка виходу води на заплаву"
                        saveValue={this.handelSaveValue}
                    />
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        value = {this.state.OutWater} 
                        name="OutWater"
                        label="Фактичний рівень води"
                        saveValue={this.handelSaveValue}
                    />
                </Form.Field>
                <Form.Field>
                    <InputComponent 
                        value = {this.state.EditLvl}
                        name="EditLvl"
                        label="Зміна рівня води за добу"
                        saveValue={this.handelSaveValue}
                    />
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        value = {this.state.phenomena} 
                        name="phenomena"
                        label="Льодові явища"
                        saveValue={this.handelSaveValue}
                    />
                </Form.Field>
                <Button type="button" primary onClick={this.handelSubmit}>Сохранить</Button>
                <Button type="button" onClick={this.handelLogOut}>Выйти</Button>
                <Button type="button" onClick={this.handelGetStation}>Заполнить данные на станции</Button>
                <Form.Field>
                    <label>Небезпечні гідрологічні явища</label>
                    <TextArea autoHeight value={this.state.text} onChange={this.handelChangeTextArea}/>
                </Form.Field>
                <Button onClick={this.handelSubmittextArea}>Сохранить</Button>
            </Form>
        </Grid.Column>
    </Grid>);
    }
}

const mapStateToProps = (state) => ({
    Observ: state.RegularObservable.Observ
});

const mapDispatchToProps = (dispatch) => ({
    SubmitDangerPhenomen: bindActionCreators(SubmitDangerPhenomen, dispatch),
    EditRegularObservable: bindActionCreators(EditRegularObservable, dispatch),
    getRegularObservable: bindActionCreators(getRegularObservable, dispatch),
    noAuthorization: () => dispatch(push('/signup')),
    GetStation: () => dispatch(push('/meteostation')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);