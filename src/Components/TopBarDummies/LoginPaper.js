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
import { loginUser } from '../../Actions/userActions';


const styles = theme => ({
    typography: {
        padding: theme.spacing.unit * 2,
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        width: theme.spacing.unit * 30,
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


class LoginPaper extends Component {
    state = {
        username: "",
        password: "",
    };

    handleLogIn = () => {
        console.log("User pressed login button...");
        const { username, password } = this.state;
        this.props.handleLogin(username, password);
        this.setState({password: ""});
    };

    nextFocus = () => {
        this.setState(state => ({
            focusToggle: !state.focusToggle,
        }))
    };

    render() {
        const { classes, error } = this.props;
        const { username, password, focusToggle } = this.state;

        return (
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography variant="headline">Sign in</Typography>
                <div className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            name="username"
                            value={username}
                            autoComplete="username"
                            required
                            autoFocus
                            onChange={event => this.setState({username: event.target.value})}
                        />
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
                            onKeyDown={event => {if(event.keyCode === 13) this.handleLogIn()}}
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
                    <FormHelperText error>{error}</FormHelperText>
                </div>
            </Paper>
        )
    }
}

export default connect()(withStyles(styles)(LoginPaper));
