import React, { Component } from 'react';
import { Button, Card, Image  } from 'semantic-ui-react';

class Forms extends Component {
    handelSubmit = () => {
        this.props.Delete(this.props.item._id);
    }

    render() {
    return (
            <Card>
                <Card.Content>
                <Image src={"http://77.120.123.202:3001/public/Events/"+ this.props.item.Picture} floated='right' size='mini' />
                <Card.Header>{this.props.item.title}</Card.Header>
                <Card.Description>{this.props.item.description}</Card.Description>
                <Button onClick={ this.handelSubmit } secondary>Видалити</Button>
                </Card.Content>
            </Card>
        );
    }
}

export default Forms;
