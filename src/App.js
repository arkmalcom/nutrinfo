import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridMain: {
    width: "100%",
    textAlign: "center"
  },
  gridMainItem: {
    padding: theme.spacing(1),
  },
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
  }
}));

function App() {
    const classes = useStyles();
      return (
        <Container>
          <Grid container className={classes.gridMain}>
              <Grid item className={classes.gridMainItem} xs={12}>
                  <SearchBar />
              </Grid>
              <Grid item className={classes.gridMainItem} xs={6}>
                  <NutritionInfo />
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

function NutritionInfo() {
  const classes = useStyles();
    return (
      <Grid container 
      className={classes.gridNutritionWindow}
      direction="row">
        <Grid item className={classes.gridNutritionWindowItem} xs={12}>
          <h2 style={{borderBottom: "1px solid black", margin: "0 0 0 0"}}>Nutrition Facts</h2>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={12}>
          <p className={classes.paragraph}>x servings per container</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={6}>
          <p className={classes.paragraph} style={{fontWeight: "bold"}}>Serving size</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={6}>
          <p className={classes.paragraph} style={{textAlign: "right", fontWeight: "bold"}}>x cups (xg)</p>
        </Grid>
        <Grid item className={classes.gridNutritionWindowItem} xs={12} 
        style={{border: "5px solid black", marginTop: "4px", marginBottom: "2px"}}>
        </Grid>
      </Grid>
    );
  }

export default App;
