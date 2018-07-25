import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Grid, Button, TextArea, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { bindActionCreators } from 'redux';
import { getRegularObservable,
        EditRegularObservable,
        SubmitDangerPhenomen,
        ChangeRegularObservable,
        UpdateRegularObservable } from '../redux/actions/index';
import { FullDataValid } from '../utils/DataValid';

const InputSize = 5;

class Forms extends Component {
    constructor(props){
        super(props);
        this.state = {
            ErrorMessage: false,
        }
    }
    componentDidMount(){
        this.props.getRegularObservable();
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
    }

    handleLogOut = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    handleGetStation = () => {
        this.props.GetStation();
    }

    handleSaveValue = (obj) => {
        this.props.setMessage();
        this.props.updateRegularObservable({
          ...this.props.Observ,
          [obj.name]: obj.value
        });
    }

    Validation = () => {
      return true;
    }

    handleOnChangePosition = (e) => {
        this.props.ChangeRegularObservable(e.target.value);
        this.props.setMessage();
    }

    handleSubmit = () => {
        if(FullDataValid(this.props.Observ.date)){
            if(this.Validation()){
                this.props.EditRegularObservable(this.props.Observ);
            }
        }else{
            this.setState({ErrorMessage: true})
        }
    }

    handleChangeObserv = (e) => {
        this.props.setMessage();
        this.setState({Observ: e.target.value, ErrorMessage: false});
    }

    handleChangeTextArea = (e) => {
        this.props.setMessage();
        this.setState({text: e.target.value, ErrorMessage: false})
    }

    handleSubmittextArea = () => {
        this.props.setMessageTrue();
        this.props.SubmitDangerPhenomen(this.state.text);
        this.setState({
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
                                <Form.Field control="select" label ="Точка спостереження" onChange={this.handleOnChangePosition}>
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
                                        value={this.props.Observ.date}
                                        label="Дата"
                                        saveValue={this.handleSaveValue}
                                        placeholder="формат дд.мм.гггг"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        value = {this.props.Observ.LvlWater}
                                        name="LvlWater"
                                        label="Відмітка виходу води на заплаву"
                                        saveValue={this.handleSaveValue}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        value = {this.props.Observ.OutWater}
                                        name="OutWater"
                                        label="Фактичний рівень води"
                                        saveValue={this.handleSaveValue}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        value = {this.props.Observ.EditLvl}
                                        name="EditLvl"
                                        label="Зміна рівня води за добу"
                                        saveValue={this.handleSaveValue}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <InputComponent
                                        value = {this.props.Observ.phenomena}
                                        name="phenomena"
                                        label="Льодові явища"
                                        saveValue={this.handleSaveValue}
                                    />
                                </Form.Field>
                                <Button type="button" primary onClick={this.handleSubmit}>Зберегти</Button>
                                <Button type="button" onClick={this.handleLogOut}>Вийти</Button>
                                <Button type="button" onClick={this.handleGetStation}>Заповнити дані на станції</Button>
                                <Form.Field>
                                    <label>Небезпечні гідрологічні явища</label>
                                    <TextArea autoHeight value={this.state.text} onChange={this.handleChangeTextArea}/>
                                </Form.Field>
                                <Button onClick={this.handleSubmittextArea}>Зберегти</Button>
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
    updateRegularObservable: bindActionCreators(UpdateRegularObservable, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    GetStation: () => dispatch(push('/meteostation')),
    setMessage: () => dispatch({type: 'SET_MESSAGE_REGULAR_OBSERVABLE'}),
    setMessageTrue: () => dispatch({type: 'SET_MESSAGE_REGULAR_OBSERVABLE_TRUE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
