import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import EventItem from './EventItem';

const columnSize = 4;

class Forms extends Component {

    componentDidMount () {
        this.props.GetEvents();
    }

  render() {
  return (
        <Grid>
            <Grid.Column width= {columnSize} />
            <Grid.Column width= {columnSize}>
                {this.props.data.map(item => (<EventItem key={item._id} Delete={this.props.Delete} item={item}/>))}
            </Grid.Column>
        </Grid>);
  }
}

export default Forms;