import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Button, Form} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import Email from './Email';
import InputComponent from './InputComponent';
import { GetEmails, SetRole, DeleteEmailRequest, AddEmailRequest, SubmitEmail } from '../redux/actions/index';


class MailCastomize extends Component {

    constructor(props){
        super(props);
        this.state= {
            role: "1",
            Email: ""
        }
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
        this.props.GetEmails();
    }

    handleAddEmail = () => {
        this.props.AddEmail(this.state);
    }

    handleChangeRole = (e) => {
        this.setState({ role: e.target.value })
    }

    SetRole = (obj) => {
        this.props.SetRole(obj);
    }

    handleSaveValue = (obj) => {
        this.setState({[obj.name]: obj.value});
    }

    handleSubmitMail = () => {
        this.props.SubmitEmail(this.props.Emails);
    }

    handleBackToGydrpomet = () => {
        this.props.BackToGydromet();
    }

    render() {
        return (
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={5}/>
                    <Grid.Column width={6}>
                        <Form>
                            <Form.Field control="select" label="Вид Розсилання" value={this.state.role} onChange = {this.handleChangeRole}>
                                <option value="1">Повний гідрометеорологічний бюлетень</option>
                                <option value="2">Тільки штормове попередження</option>
                            </Form.Field>
                            <Form.Field>
                                <InputComponent
                                    label="E-mail адресс"
                                    name="Email"
                                    value={this.state.Email}
                                    saveValue = {this.handleSaveValue}
                                />
                            </Form.Field>
                            <Button onClick={this.handleAddEmail}>Додати</Button>
                            <Button onClick={this.handleSubmitMail}>Вiдправити листи</Button>
                              <Button onClick={this.handleBackToGydrpomet}>Повернутися до гідрометеорологічного бюлетеню</Button>
                        </Form>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}/>
                        <Grid.Column width={5}>
                            { this.props.Emails.map(item => <Email
                                        key={item._id}
                                        SetRole={this.SetRole}
                                        DeleteEmails={this.props.DeleteEmails}
                                        email={item}
                                    />) }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>);
    }
}

const mapStateToProps = (state) => ({
    Emails: state.emails.Emails
});

const mapDispatchToProps = (dispatch) => ({
    SubmitEmail: bindActionCreators(SubmitEmail, dispatch),
    AddEmail: bindActionCreators(AddEmailRequest, dispatch),
    SetRole: bindActionCreators(SetRole, dispatch),
    GetEmails: bindActionCreators(GetEmails, dispatch),
    DeleteEmails: bindActionCreators(DeleteEmailRequest, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    BackToGydromet: () => dispatch(push('/hydrometeorologycal_bulletin'))
});

export default connect(mapStateToProps, mapDispatchToProps)(MailCastomize);
