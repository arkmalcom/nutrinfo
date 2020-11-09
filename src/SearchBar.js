import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import RotateLeft from '@material-ui/icons/RotateLeft';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    searchBar: {
      minWidth: "280px",
      maxWidth: "280px",
      border: "1px solid black",
      borderRadius: "5px",
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
            <TextField className={classes.searchBar} 
                placeholder="Search" 
                value={this.state.inputValue}
                onChange={this.onChange}
                InputProps = {{ endAdornment: <Search />}}        
            />
            <IconButton aria-label="Add" type="submit">
              <AddCircleOutline />
            </IconButton>
            <IconButton aria-label="Reset" type="reset">
              <RotateLeft />
            </IconButton>
          </form>
        </div>
      );
    }

  }

export default withStyles(styles)(SearchBar);