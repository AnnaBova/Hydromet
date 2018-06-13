import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import InputComponent from './InputComponent';

class Event extends Component {

    handelOnChange = (e) => {
        console.log(e.target.value)
    }

    render() {
    return (<Form>
            <Form.Field>
                <InputComponent label="Название"/>
            </Form.Field>
            <Form.Field>
                <label>Текст</label>
                <TextArea autoHeight />
            </Form.Field>
            <Form.Field>
                <input type="file" onChange={this.handelOnChange} />
            </Form.Field>
    </Form>);
    }
}


export default Event;