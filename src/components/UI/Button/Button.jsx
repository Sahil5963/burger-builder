import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    return (

        <button
            className={
                [classes.Button,
                props.Success ? classes.Success : ' ',
                props.Danger ? classes.Danger : ' '
                ].join(' ')
            }
            disabled={props.disabled}
            onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default button;
