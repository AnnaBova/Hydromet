import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import EventItem from './EventItem';
import EditEvent from './EditEvent';

const columnSize = 4;

class Forms extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedEvent: -1
    };
  }

  componentDidMount () {
    this.props.GetEvents();
  }

  selectEvent = (index) => () => {
    this.setState({
      selectedEvent: index
    });
    this.props.setUpdatingEvent(index);
  }

  render() {
  let outputArray = this.props.data.map((item, index) => (<EventItem select={this.selectEvent(index)} key={item._id} Delete={this.props.Delete} item={item}/>));
  return (
        <Grid>
            <Grid.Column width= {columnSize} />
            <Grid.Column width= {columnSize}>
                {(outputArray.length === 0)? "Ви не створили жодної події" : (this.state.selectedEvent !== -1)? <EditEvent selectEvent={this} event={this.state.selectedEvent} /> : outputArray}
            </Grid.Column>
        </Grid>);
  }
}

export default Forms;
