import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar.js';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridNutritionWindow: {
    width: "60%",
    border: "2px solid black",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  gridNutritionWindowItem: {
    margin: "0 0 0 0",
    padding: "0 0 0 0"
  },
  paragraph: {
    textAlign: "left",
    padding: "0 0 0 0",
    margin: "0px 1px 0px 1px"
  },
  servingInput: {
    textAlign: "right"
  }
}));

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
      input: '1 oz chicken',
      nutritionInfo: []
    };
  }

  handleInput = (input) => {
    this.setState({input: input});
    this.getNutritionInput(input);
  }

  getNutritionInput(input) {
    console.log(input);
    if(input == '') {
      input = '1 oz chicken';
    }
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
    .then((res) => res.json())
    .then((data) => this.setState({ nutritionInfo: data.foods }));
  }

    render() {
      const { classes } = this.props;
      console.log(this.state.nutritionInfo);
      return (
        <Container>
          <Grid container className={classes.gridMain}>
              <Grid item className={classes.gridMainItem} xs={12}>
                  <SearchBar onHandleInput={this.handleInput} />
                  {this.state.nutritionInfo.food_name}
              </Grid>
              <Grid item className={classes.gridMainItem} xs={6}>
                  <NutritionInfo nutritionInfo={this.state.nutritionInfo} />
              </Grid>
              <Grid item className={classes.gridMainItem} xs={6}>
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



const NutritionInfo = (props) => {
  const classes = useStyles();
  const nutritionInfo = props.nutritionInfo.map((info) => { return info[0]; });
  console.log(nutritionInfo);
    return (
      <Grid container 
      className={classes.gridNutritionWindow}
      direction="row">
        <Grid item className={classes.gridNutritionWindowItem} xs={12}>
          <h1 style={{borderBottom: "1px solid black", margin: "0 0 0 0", fontSize: "40px"}}>Nutrition Facts</h1>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={6}>
          <p className={classes.paragraph} style={{fontWeight: "bold"}}>Serving size</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={4}>
          <p className={classes.paragraph} style={{textAlign: "right", fontWeight: "bold"}}>{props.nutritionInfo.food_name}</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={12} 
        style={{border: "5px solid black", marginTop: "4px", marginBottom: "2px"}}>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={12}>
          <p className={classes.paragraph} style={{fontSize: "13px", fontWeight: "bold"}}>Amount per serving</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={9}>
          <p className={classes.paragraph}
           style={{fontSize: "26px", fontWeight: "bold"}}>Calories</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={3}>
          <p className={classes.paragraph}
           style={{fontSize: "26px", fontWeight: "bold", textAlign: "right"}}>230</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={12} 
        style={{border: "2px solid black", marginBottom: "2px"}}>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={12}>
          <p className={classes.paragraph}
           style={{fontSize: "12px", fontWeight: "bold",
            textAlign: "right", borderBottom: "1px solid black"}}>% Daily Value*</p>
        </Grid>
      </Grid>
    );
  }

export default withStyles(styles)(App);
