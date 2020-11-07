import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
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
    render() {
      const { classes } = this.props;
      return (
        <div>
            <InputBase className={classes.searchBar} 
                placeholder="Search" 
                startAdornment={<Search />}        
            />
        </div>
      );
    }
  }

export default withStyles(styles)(SearchBar);