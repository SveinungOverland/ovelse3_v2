import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


//REDUX
import { connect } from 'react-redux';


import LoginPopper from '../Components/LoginPopper';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


const mapStateToProps = state => {
    return {
        user: state.user,
    }
};


class TopBar extends Component {

    // TODO: LoginPopper needs a handleLogin Prop

    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={this.props.classes.grow}>
                            News
                        </Typography>
                        <LoginPopper error={this.props.user.error}/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withStyles(styles)(TopBar));