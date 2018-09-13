import React, { Component } from 'react';
import Button from "@material-ui/core/Button/Button";
import Popper from "@material-ui/core/Popper/Popper";
import Fade from "@material-ui/core/Fade/Fade";


export default class GenericPopper extends Component {

    state = {
        anchorEl: null,
        open: this.props.open || false,
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };


    render() {
        const { open, anchorEl } = this.state;
        const id = open ? this.props.id : null;
        return (
            <div id={this.props.id}>
                <Button color="inherit" onClick={this.handleClick}>
                    {this.props.text}
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            { this.props.children }
                        </Fade>
                    )}
                </Popper>
            </div>
        )
    }
}
