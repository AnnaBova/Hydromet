import React, { Component } from 'react';
import { Table, Form, Button, Message } from 'semantic-ui-react';
import TableItem from './TableItem';


class Tables extends Component {



    Change = (value) => {
        this.props.setMessage();
        this.props.Record.table = this.props.Record.table.map((item)=> {
            if(item._id === value._id){
                item = value; 
            }
            return item;
        });
        this.props.EditRecord(this.props.Record);
    }

    ChangeTitle = (value) => {
        this.props.setMessage();
        this.props.EditRecord(value);
    }

    OnChange = (e) => {
        this.props.setMessage();
        this.props.OnChange(e.target.value);
    }

    OnSave = () => {
        this.props.Submit();
    }

    render() {
        if(this.props.Record !== undefined){
            return (
                <Form success={this.props.Message}>
                    <Message success header="Сохранение" content="Данные успешно сохранены"/>
                    <Form.Field control='select' onChange= {this.OnChange}>
                        {this.props.Records.map((item)=> <option key={item._id} value={item.id}>{item.modalTitle || item.modalName}</option>)}
                    </Form.Field>
                    <Table>
                        {this.props.Record.date ? 
                            (<Table.Header>
                                <TableItem id={this.props.Record._id} item={this.props.Record} Change={this.ChangeTitle}/>
                            </Table.Header>): <Table.Body />
                        } 
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell> Дата</Table.HeaderCell>
                                <Table.HeaderCell> Значение</Table.HeaderCell>
                                <Table.HeaderCell> Станция</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                       
                        <Table.Body>
                            { this.props.Record.table ? 
                                this.props.Record.table.map((item)=><TableItem item={item}
                                                                        key={item._id}
                                                                        Change={this.Change}
                                                                    />): <Table.Row /> }       
                        </Table.Body>
                    </Table>
                    <Button onClick={this.OnSave} primary>Сохранить</Button>
                    
                </Form> );
        }else {
            return <div></div>
        }  
    }
}

export default Tables;