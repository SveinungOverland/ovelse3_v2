import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    typography: {
        padding: theme.spacing.unit * 2,
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
});



class UserPaper extends Component {


    handleLogOut = () => {
        console.log("User pressed logout button...");
        this.props.handleLogout();
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography>You are logged in</Typography>
            </Paper>
        )
    }
}

export default withStyles(styles)(UserPaper);
