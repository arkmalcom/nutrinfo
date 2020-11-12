import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from './SearchBar.js';
import { Intro } from './Intro.js'
import { NutritionInfo } from './NutritionInfo.js';
import { NutritionTotal } from './NutritionTotal.js';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import bg from './bg.jpg';
import logo from './logo.png';
import theme from './Theme.js';

const styles = theme => ({
  '@keyframes slide-in-top': {
    '0%': {
      '-webkit-transform': 'translateY(-1000px)',
              'transform': 'translateY(-1000px)',
      opacity: 0,
    },
    '100%': {
      '-webkit-transform': 'translateY(0)',
              'transform': 'translateY(0)',
      opacity: 1,
    }
  },
  '@keyframes slide-in-bottom': {
    '0%': {
      '-webkit-transform': 'translateY(1000px)',
              'transform': 'translateY(1000px)',
      opacity: 0,
    },
    '100%': {
      '-webkit-transform': 'translateY(0)',
              'transform': 'translateY(0)',
      opacity: 1,
    }
  },  
  "@global": {
    body: {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
    }
  },
  mainContainer: {
    spacing: 0,
    marginBottom: '18px',
    minHeight: '100vh',
  },
  header: {
    textAlign: "center",
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '0 0 10px 10px',
    border: `2px solid ${theme.palette.primary.main}`,
    borderStyle: 'none solid solid solid',
    animation: '$slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', 
  },
  mainContent: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    bottom: 0,
    display: 'flex',
    justify: 'center',
    position: 'fixed',
    animation: '$slide-in-bottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both', 
    },
    footer: {
      textAlign: 'center',
      fontSize: '10px',
      border: `2px solid ${theme.palette.primary.dark}`,
      borderStyle: 'solid solid none solid',
      backgroundColor: theme.palette.primary.light,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderRadius: '10px 10px 0 0',
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
        nutritionInfo: [],
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
      let renderList = false;
      let nutritionList = this.state.nutritionList;
      if(nutritionList.slice(1).length !== 0) {
        renderList = true;
        nutritionList = this.state.nutritionList.map((item) =>
        <Grid item key={item.nutritionInfo.food_name} style={{display: 'flex', justifyContent: 'center'}}xs={12} md={4} lg={3} xl={3}>
          <NutritionInfo nutritionInfo={item.nutritionInfo} />
        </Grid>
        ).slice(1);
      }
      else {
        renderList = false;
      }
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Grid container 
            className={classes.mainContainer}
            direction='column'
            justify='flex-start'
            >
              <Grid container className={classes.header}>
                <Hidden xsDown>
                <Grid item md={1}>
                    <img src={logo} width="72px" height="45px" />       
                  </Grid>
                </Hidden>
                  <Grid item xs={12} md={11}>
                      <SearchBar onHandleInput={this.handleInput} onHandleReset={this.handleReset} />
                  </Grid>
              </Grid>
              <Grid container className={classes.mainContent} direction="row">
                  {renderList ? nutritionList : <Intro />}
              </Grid>
              <Grid container className={classes.mainContent} direction="row">
                  <NutritionTotal nutritionTotal={this.state.nutritionList.slice(1)} />
              </Grid>
            </Grid>
          </Container>
          <Grid container className={classes.footerContainer} xs={12}>
            <Grid item className={classes.footer} xs={12}>
            <Typography variant="p" style={{
              color: theme.palette.secondary.main,
            }}>
                  Created by Malcom Calivar - App powered by Nutritionix API.
            </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
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
