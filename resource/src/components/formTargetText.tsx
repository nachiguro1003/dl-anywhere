import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as wasm from "dl-anywhere";

interface Props {
    text: string,
    setText: (text: string) => void,
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            display: 'flex',
            flex: 1
        },
    },
}));


const FormTargetText: React.FC<Props> = (props:Props) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={8}
                    value={props.text}
                    variant="outlined"
                    onChange={e => props.setText(e.target.value)}
                />
            </div>
        </form>
    )
}

export default FormTargetText;
