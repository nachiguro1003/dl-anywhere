import {Button, createStyles, FormControl, InputLabel, MenuItem, Select, Theme} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {targetLangList,languages} from "../consts/lang";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

interface Props {
    handleTrim: (event: React.ChangeEvent<any>) => void,
    handleSubmit: (event: React.ChangeEvent<any>) => void,
}

const ButtonGroup:React.FC<Props> = (props:Props) => {
    const [targetLang,setTargetLang] = useState("JA");

    const handleSelectLang = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTargetLang(event.target.value as string)
    }

    const cls = useStyles();
    return (
        <div className={cls.buttonGroup}>
            <Button variant="contained" color="primary" onClick={props.handleTrim}>
                改行を削除
            </Button>
            <Button variant="contained" color="primary" onClick={props.handleSubmit}>
                翻訳
            </Button>
            <FormControl className={cls.formControl}>
                <InputLabel id="target-lang">言語</InputLabel>
                <Select
                    labelId="target-lang"
                    id="target-lang"
                    value={targetLang}
                    onChange={handleSelectLang}
                >
                    {targetLangList.map((item: string) => {
                        return (
                            <MenuItem value={item}>{languages[item]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>

        </div>
    )
}

export default ButtonGroup;
