import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router';
import FormAuthorization from '../component/FormAuthorization';
import Forms from '../component/Forms';

class App extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
        <Grid.Column width={4} />
        <Grid.Column width={3}>
          <div>
            <Route path="/" exact component= {Forms} />
            <Route path="/signup" exact component= {FormAuthorization}/>
          </div>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
