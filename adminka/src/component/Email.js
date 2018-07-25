import React, { Component } from 'react';
import { Card, Button, Form} from 'semantic-ui-react';

class Email extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: this.props.email.role
        }
    }

    handleChangeRole = (e) => {
        this.setState({role: e.target.value});
        this.props.SetRole({
            ...this.props.email,
            role: e.target.value
        });
    }

    handleDelete = () => {
        this.props.DeleteEmails(this.props.email)
    }

    render() {
    return (
            <div>
                <Card>
                    <Card.Content>
                        <Card.Description>Email-adders: {this.props.email.Email}</Card.Description>
                        <Form>
                            <Form.Field control="select" value={this.state.role} onChange={this.handleChangeRole}>
                                <option value="1">Повний гідрометричний бюлетень</option>
                                <option value="2">Тільки штормове попередження</option>
                            </Form.Field>
                        </Form>
                    </Card.Content>
                    <Button basic color='red' onClick={this.handleDelete}>Видалити</Button>
                </Card>
            </div>
        );
    }
}



export default Email;
