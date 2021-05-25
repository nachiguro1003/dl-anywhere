import React, {useEffect, useState} from "react";
import * as wasm from "dl-anywhere";
import {Translate} from "./models/translate";
import FormTargetText from "./components/formTargetText";
import TranslationResultForm from "./components/TranslationResultForm";
import ButtonGroup from "./components/buttonGroup";
import {
    Button,
    createStyles,
    Fade,
    Theme
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          width: 500,
        },
        buttonGroup: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

const App = () => {
    const [translation,setTranslation] = useState<Translate>()
    const [text,setText] = useState<string>("")
    const [targetLang,setTargetLang] = useState("JA");
    const [isDisplay,setIsDisplay] = useState(false)
    const cls = useStyles();
    const handleSubmit = async () => {
        await wasm.translate(text, targetLang).then((res: Translate) => {
            setTranslation(res)
        });
    }

    const handleTrim = () => {
        setText(text.replace(/\r?\n/g,''))
    }

    useEffect(()=> {
        if (isDisplay) {
            setTimeout(() => {
                setIsDisplay(false)
            },2000)
        }
    },[isDisplay])

    return (
        <div className={cls.root}>
            <FormTargetText setText={setText} text={text}/>
           <ButtonGroup handleSubmit={handleSubmit} handleTrim={handleTrim} />
            <TranslationResultForm translatedText={translation?.text}/>
            <div className="App-copy-area">
                <CopyToClipboard
                    text={translation?.text as string}
                    onCopy={() => setIsDisplay(true)}
                >
                    <Button variant="contained" color="primary" >クリップボードにコピーする</Button>
                </CopyToClipboard>
            </div>
            <Fade in={isDisplay}>
                <Alert severity="success">This is a success alert — check it out!</Alert>
            </Fade>
        </div>
    )
}

export default App;
