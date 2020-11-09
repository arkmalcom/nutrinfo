import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar.js';
import { withStyles } from '@material-ui/core/styles';
import { NutritionInfo } from './NutritionInfo';
import { NutritionTotal } from './NutritionTotal';

const styles = theme => ({
  gridMain: {
    width: "100%",
    textAlign: "center"
  },
  gridMainItem: {
    padding: theme.spacing(1),
  },
  gridBody: {
    textAlign: 'center',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center'
  },
  gridBodyItem: {
    padding: theme.spacing(1)
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInput.bind(this);
    this.handleReset.bind(this);
    this.state = {
      input: '',
      nutritionList: [{
        nutritionInfo: []
      }]
    };
  }

  handleInput = (input) => {
    this.setState({input: input});
    if(input !== '') {
      this.getNutritionInput(input);
    }
  }

  handleReset = () => {
    this.setState({nutritionList: [{
      nutritionInfo: []
    }]});
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
    const nutritionList = this.state.nutritionList;
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', request)
    .then((res) =>  {
      if(res.status === 404) {
        return Promise.reject('No data found!'); 
        }
      else { return res.json(); }
    })
    .then((data) => this.setState({ nutritionList: nutritionList.concat([{
      nutritionInfo: data.foods[0]
      }]) 
    }))
    .catch(e => console.log(e));
  }

    render() {
      const { classes } = this.props;
      let nutritionList = this.state.nutritionList;
      if(
        nutritionList !== undefined ||
        nutritionList.length !== 0       
        ) {
        nutritionList = this.state.nutritionList.map((item) =>
        <Grid item key={item.nutritionInfo.food_name} className={classes.gridBodyItem} xs={12} md={4} lg={3} xl={3}>
          <NutritionInfo nutritionInfo={item.nutritionInfo} />
        </Grid>
        ).slice(1);
      }
      else {
        return null;
      }
      return (
        <Container>
          <Grid container className={classes.gridMain}>
              <Grid item className={classes.gridMainItem} xs={12}>
                  <SearchBar onHandleInput={this.handleInput} onHandleReset={this.handleReset} />
              </Grid>
          </Grid>
              <Grid container className={classes.gridBody} direction="row">
                {nutritionList}
              </Grid>
              <Grid container className={classes.gridBody} direction="row">
                <NutritionTotal nutritionTotal={this.state.nutritionList.slice(1)} />
              </Grid>
        </Container>
      );
    }
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default withStyles(styles)(App);
