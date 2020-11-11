import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import RotateLeft from '@material-ui/icons/RotateLeft';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import theme from './Theme.js';

const styles = theme => ({
    searchBar: {
      minWidth: "280px",
      maxWidth: "280px",
      color: theme.palette.secondary.main,
      animation: 'slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      '&$barFocused $notchedOutline': {
        borderColor: `${theme.palette.secondary.main} !important`,
      }
    },
    icon: {
      color: theme.palette.secondary.main,
    },
    barFocused: {},
    notchedOutline: {
      borderWidth: "1px",
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    barLabel: {
      color: `${theme.palette.secondary.main} !important`
    }
  });

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      inputValue: ''
    };
  }
  
  handleInput = (input) => {
    this.props.onHandleInput(input);
  }

  onChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({inputValue: e.target.value});
    this.handleInput(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  handleReset() {
    this.props.onHandleReset();
  }

  onReset = (e) => {
    e.preventDefault();
    this.handleReset();
  }

  /*componentDidUpdate(prevProps, prevState) {
    if(prevState.inputValue != this.state.inputValue) {
        this.checkIfTyping();
    }
  }

  checkIfTyping = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.handleInput(this.state.inputValue);         
    }, 750)
  } */

    render() {
      const { classes } = this.props;
      return (
        <div>
          <form onSubmit={this.onSubmit} onReset={this.onReset}>
            <TextField
                value={this.state.inputValue}
                onChange={this.onChange}
                label="Search"
                variant="outlined"
                InputLabelProps ={{
                  classes: {
                    root: classes.barLabel,
                    focused: classes.barFocused
                  }
                }}
                InputProps = {{ 
                  endAdornment: <Search className={classes.icon} />,
                  classes: {
                    root: classes.searchBar,
                    focused: classes.barFocused,
                    notchedOutline: classes.notchedOutline
                  }
                }}        
            />
            <IconButton aria-label="Add" type="submit">
              <AddCircleOutline className={classes.icon} />
            </IconButton>
            <IconButton aria-label="Reset" type="reset">
              <RotateLeft className={classes.icon} />
            </IconButton>
          </form>
        </div>
      );
    }

  }

export default withStyles(styles)(SearchBar);