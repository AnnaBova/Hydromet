import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import InputComponent from './InputComponent';

class TableItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: this.props.item._id,
            date: this.props.item.date,
            value: this.props.item.value,
            post: this.props.item.post,
        }
    }

    handleSaveValue = (e) => {
        this.props.Change({...this.props.item, [e.name]:e.value });
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <InputComponent 
                        value = {this.props.item.date}
                        name="date"
                        type="text" 
                        saveValue = {this.handleSaveValue}
                    />
                </Table.Cell>
                <Table.Cell>
                    <InputComponent 
                        value = {this.props.item.value}
                        name="value"
                        type="text" 
                        saveValue = {this.handleSaveValue}
                    />
                </Table.Cell>
                <Table.Cell>
                    <InputComponent 
                        value = {this.props.item.post}
                        name="post"
                        type="text" 
                        saveValue = {this.handleSaveValue}
                    />
                </Table.Cell>
            </Table.Row>);
    }
}

export default TableItem;