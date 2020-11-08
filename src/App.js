import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar.js';
import { withStyles } from '@material-ui/core/styles';
import { NutritionInfo } from './NutritionInfo';

const styles = theme => ({
  gridMain: {
    width: "100%",
    textAlign: "center"
  },
  gridMainItem: {
    padding: theme.spacing(1),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput.bind(this);
    this.state = {
      input: '',
      nutritionInfo: []
    };
  }

  handleInput = (input) => {
    this.setState({input: input});
    if(input !== '') {
      this.getNutritionInput(input);
    }
  }

  getNutritionInput(input) {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'x-app-id' : '85be3454',
        'x-app-key' : '0c302e60b57a8252cb6f16780f8d7e67',
        'x-remote-user-id' : '0',
      },
      body: JSON.stringify({
        query: input
      })
    };
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', request)
    .then((res) =>  {
      if(res.status === 404) {
        return Promise.reject('No data found!');
      }
      else { return res.json(); }
    })
    .then((data) => this.setState({ nutritionInfo: data.foods[0] }))
    .catch(e => console.log(e));
  }

    render() {
      const { classes } = this.props;
      console.log(this.state.nutritionInfo);
      return (
        <Container>
          <Grid container className={classes.gridMain}>
              <Grid item className={classes.gridMainItem} xs={12}>
                  <SearchBar onHandleInput={this.handleInput} />
              </Grid>
              <Grid item className={classes.gridMainItem} xs={12} md={6}>
                  <NutritionInfo nutritionInfo={this.state.nutritionInfo} />
              </Grid>
              <Grid item className={classes.gridMainItem} xs={12} md={6}>
                <h1>Picture?</h1>
              </Grid>
              <Grid item className={classes.gridMainItem} xs={12}>
                <h1>Total?</h1>
              </Grid>
          </Grid>
        </Container>
      );
    }
}

export default withStyles(styles)(App);
