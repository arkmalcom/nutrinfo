import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    searchBar: {
      width: "50%",
      border: "1px solid black",
      borderRadius: "5px",
    }
  });

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.inputValue != this.state.inputValue) {
        this.checkIfTyping();
    }
  }

  checkIfTyping = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.handleInput(this.state.inputValue);         
    }, 750)
  } 

    render() {
      const { classes } = this.props;
      return (
        <div>
            <TextField className={classes.searchBar} 
                placeholder="Search" 
                value={this.state.inputValue}
                onChange={this.onChange}
                InputProps = {{ endAdornment: <Search />}}        
            />
        </div>
      );
    }

  }

export default withStyles(styles)(SearchBar);