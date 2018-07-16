import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Grid, Button, TextArea, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { bindActionCreators } from 'redux';
import { getRegularObservable, EditRegularObservable, SubmitDangerPhenomen, ChangeRegularObservable } from '../redux/actions/index';
import { FullDataValid } from '../utils/DataValid';

const InputSize = 5;

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
            phenomena: "",
            ErrorMessage: false,
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
        this.props.setMessage();
        this.setState({ [obj.name]:obj.value, ErrorMessage: false });
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
        this.props.ChangeRegularObservable(e.target.value);
        this.props.setMessage();
    }

    handelSubmit = () => {
        if(FullDataValid(this.state.date)){
            if(this.Validation()){
                this.props.EditRegularObservable({
                    ...this.props.Observ,
                    date: this.state.date,
                    LvlWater: this.state.LvlWater,
                    OutWater: this.state.OutWater,
                    EditLvl: this.state.EditLvl,
                    phenomena: this.state.phenomena,
                    ErrorMessage: false
                })
            }
        }else{
            this.setState({ErrorMessage: true})
        }
    }

    handelChangeObserv = (e) => {
        this.props.setMessage();
        this.setState({Observ: e.target.value, ErrorMessage: false});
    }

    handelChangeTextArea = (e) => {
        this.props.setMessage();
        this.setState({text: e.target.value, ErrorMessage: false})
    }

    handelSubmittextArea = () => {
        this.props.setMessageTrue();
        this.props.SubmitDangerPhenomen(this.state.text);
        this.setState({
            text: '',
            ErrorMessage: false
        });
    }

    render() {
        // eslint-disable-next-line
        if(this.props.Observs != false){
            return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}/>
                        <Grid.Column width={7}>
                            { this.props.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                            { this.state.ErrorMessage ? <Message error header="Помилка" content="Неправильна дата" /> : <div /> }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={InputSize}/>
                        <Grid.Column width={InputSize}>
                            <h3>Регулярні спостереження в період весняної повені</h3>
                            <Form>
                                <Form.Field control="select" label ="Точка спостереження" onChange={this.handelOnChangePosition}>
                                    <option value={this.props.Observs[0]._id}>{this.props.Observs[0].Title}({this.props.Observs[0].Position})</option>
                                    <option value={this.props.Observs[1]._id}>{this.props.Observs[1].Title}({this.props.Observs[1].Position})</option>
                                    <option value={this.props.Observs[2]._id}>{this.props.Observs[2].Title}({this.props.Observs[2].Position})</option>
                                    <option value={this.props.Observs[3]._id}>{this.props.Observs[3].Title}({this.props.Observs[3].Position})</option>
                                    <option value={this.props.Observs[4]._id}>{this.props.Observs[4].Title}({this.props.Observs[4].Position})</option>
                                    <option value={this.props.Observs[5]._id}>{this.props.Observs[5].Title}({this.props.Observs[5].Position})</option>
                                    <option value={this.props.Observs[6]._id}>{this.props.Observs[6].Title}({this.props.Observs[6].Position})</option>
                                    <option value={this.props.Observs[7]._id}>{this.props.Observs[7].Title}({this.props.Observs[7].Position})</option>
                                    <option value={this.props.Observs[8]._id}>{this.props.Observs[8].Title}({this.props.Observs[8].Position})</option>
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        name="date"
                                        value={this.state.date}
                                        label="Дата"
                                        saveValue={this.handelSaveValue}
                                        placeholder="формат дд.мм.гггг"
                                    />
                                </Form.Field>
                                <Form.Field control="select" label="Час спостереження" onChange={this.handelChangeObserv}>
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
                                <Button type="button" primary onClick={this.handelSubmit}>Зберегти</Button>
                                <Button type="button" onClick={this.handelLogOut}>Вийти</Button>
                                <Button type="button" onClick={this.handelGetStation}>Заповнити дані на станції</Button>
                                <Form.Field>
                                    <label>Небезпечні гідрологічні явища</label>
                                    <TextArea autoHeight value={this.state.text} onChange={this.handelChangeTextArea}/>
                                </Form.Field>
                                <Button onClick={this.handelSubmittextArea}>Зберегти</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>);
        }else{
            return <div />
        }
    }
}

const mapStateToProps = (state) => ({
    Observ: state.RegularObservable.Observ,
    Observs: state.RegularObservable.RegularObservable,
    Message: state.RegularObservable.Message
});

const mapDispatchToProps = (dispatch) => ({
    ChangeRegularObservable: bindActionCreators(ChangeRegularObservable, dispatch),
    SubmitDangerPhenomen: bindActionCreators(SubmitDangerPhenomen, dispatch),
    EditRegularObservable: bindActionCreators(EditRegularObservable, dispatch),
    getRegularObservable: bindActionCreators(getRegularObservable, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    GetStation: () => dispatch(push('/meteostation')),
    setMessage: () => dispatch({type: 'SET_MESSAGE_REGULAR_OBSERVABLE'}),
    setMessageTrue: () => dispatch({type: 'SET_MESSAGE_REGULAR_OBSERVABLE_TRUE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
