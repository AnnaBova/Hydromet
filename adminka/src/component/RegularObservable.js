import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Grid, Button, TextArea} from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { bindActionCreators } from 'redux';
import { getRegularObservable, EditRegularObservable, SubmitDangerPhenomen, ChangeRegularObservable } from '../redux/actions/index';

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
        this.props.ChangeRegularObservable(e.target.value);
    }

    handelSubmit = () => {
        if(this.Validation()){
            this.props.EditRegularObservable({
                ...this.props.Observ,
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
        if(this.props.Observs != false){
            console.log(typeof this.props.Observs);
            return (
                <Grid>
                    <Grid.Column width={InputSize}/>
                    <Grid.Column width={InputSize+1}>
                        <h3>Регулярні спостереження в період весняної повені</h3>
                        <Form>
                            <Form.Field control="select" label ="Точка наблюдения" onChange={this.handelOnChangePosition}>
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
        }else{
            return <div />
        }
    }
}

const mapStateToProps = (state) => ({
    Observ: state.RegularObservable.Observ,
    Observs: state.RegularObservable.RegularObservable
});

const mapDispatchToProps = (dispatch) => ({
    ChangeRegularObservable: bindActionCreators(ChangeRegularObservable, dispatch),
    SubmitDangerPhenomen: bindActionCreators(SubmitDangerPhenomen, dispatch),
    EditRegularObservable: bindActionCreators(EditRegularObservable, dispatch),
    getRegularObservable: bindActionCreators(getRegularObservable, dispatch),
    noAuthorization: () => dispatch(push('/signup')),
    GetStation: () => dispatch(push('/meteostation')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);