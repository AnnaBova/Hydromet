import React, { Component } from 'react';
import { Button, Card, Image  } from 'semantic-ui-react';

class Forms extends Component {
    handleSubmit = () => {
        const check = window.confirm('Ви впевнені, що хочете видалити цю подію?');
        if(!check)return;
        this.props.Delete(this.props.item._id);
    }

    render() {
    return (
            <Card>
                <Card.Content>
                <Image src={"http://77.120.123.202:3001/public/Events/"+ this.props.item.Picture} floated='right' size='mini' />
                <Card.Header>{this.props.item.title}</Card.Header>
                <Card.Description>{this.props.item.description}</Card.Description>
                <Button onClick={ this.props.select } secondary>Редагувати</Button>
                <Button onClick={ this.handleSubmit } secondary>Видалити</Button>
                </Card.Content>
            </Card>
        );
    }
}

export default Forms;
