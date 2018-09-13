import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


//REDUX
import { connect } from 'react-redux';
import { loginUser } from '../Actions/userActions';


import LoginPaper from './TopBarDummies/LoginPaper';
import UserPaper from './TopBarDummies/UserPaper';
import GenericPopper from './GenericPopper';


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
        const { user, classes, dispatch } = this.props;
        console.log(user);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={this.props.classes.grow}>
                            News
                        </Typography>
                            {!user.fetched ?
                                <GenericPopper id="login" text={user.user.username}>
                                    <LoginPaper error={user.error} handleLogin={(username, password) => dispatch(loginUser(username, password))} />
                                </GenericPopper>
                                :
                                <GenericPopper id="user" text={"Hello, " + user.user.username}>
                                    <UserPaper user={user} />
                                </GenericPopper>
                            }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withStyles(styles)(TopBar));
