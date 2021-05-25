import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props {
    translatedText: string | undefined,
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            display: 'flex',
            flex: 1,
        },
    },
}));


const TranslationResultForm: React.FC<Props> = (props:Props) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={8}
                    value={props.translatedText}
                    variant="outlined"
                    disabled={true}
                />
            </div>
        </form>
    )
}

export default TranslationResultForm;
