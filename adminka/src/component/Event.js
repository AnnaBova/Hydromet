import React, { Component } from 'react';
import { Form, TextArea, Grid, Button } from 'semantic-ui-react';
import InputComponent from './InputComponent';

class Event extends Component {

    handelOnChange = (e) => {
        console.log(e.target.value)
    }

    render() {
    return (
        <Grid>
        <Grid.Column width={4} />
        <Grid.Column width={4}>
            <Form>
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
                    <Button primary>Сохранить событие</Button>
            </Form>
        </Grid.Column>
        </Grid>);
    }
}


export default Event;