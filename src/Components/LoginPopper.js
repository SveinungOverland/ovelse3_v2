import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';


// IMPORT REDUX ACTIONS
import { connect } from 'react-redux';
import { loginUser } from '../Actions/userActions';


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
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class LoginPopper extends Component {
    state = {
        anchorEl: null,
        open: this.props.open || false,
        username: "",
        password: "",
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };

    handleLogIn = () => {
        console.log("User pressed login button...");
        const { username, password } = this.state;
        this.props.dispatch(loginUser(username, password));
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, open, username, password } = this.state;
        const id = open ? 'Login' : null;

        return (
            <div>
                <Button color="inherit" onClick={this.handleClick}>
                    Create account / Login
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockIcon />
                                </Avatar>
                                <Typography variant="headline">Sign in</Typography>
                                <div className={classes.form}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input id="username" name="username" autoComplete="username" required autoFocus onChange={event => this.setState({username: event.target.value})}/>
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={event => this.setState({password: event.target.value})}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        disabled={username === "" || password === ""}
                                        fullWidth
                                        variant="raised"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.handleLogIn}
                                    >
                                        Sign in
                                    </Button>
                                    {this.props.error ?
                                        <FormHelperText error>{this.props.error}</FormHelperText>
                                    : null}
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        )
    }
}

export default connect()(withStyles(styles)(LoginPopper));