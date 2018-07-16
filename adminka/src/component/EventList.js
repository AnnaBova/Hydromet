import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import EventItem from './EventItem';

const columnSize = 4;

class Forms extends Component {

    componentDidMount () {
        this.props.GetEvents();
    }

  render() {
  let outputArray = this.props.data.map(item => (<EventItem key={item._id} Delete={this.props.Delete} item={item}/>));
  return (
        <Grid>
            <Grid.Column width= {columnSize} />
            <Grid.Column width= {columnSize}>
                {(outputArray.length === 0)? "Ви не створили жодної події" : outputArray}
            </Grid.Column>
        </Grid>);
  }
}

export default Forms;
