import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255,255,255)",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "rgb(250, 232, 241)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(232, 241, 250)",
      },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgb(250, 241, 232)",
    },
    "& .MuiTextField-root": { my: 0.5, width: "35ch", height: "6ch" },
  },
}));

export default function StyledTextField({ id, label }) {
  const classes = useStyles();
  return (
    <TextField
      id={id}
      label={label}
      fullWidth
      required
      variant="filled"
      size="small"
      className={classes.root}
      InputProps={{ disableUnderline: true }}
    />
  );
}
