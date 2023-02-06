import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TextField } from "@mui/material";

export default function StyledTextField({ id, label, root, default_value }) {
  return (
    <TextField
      id={id}
      label={label}
      fullWidth
      required
      variant="filled"
      size="small"
      className={root}
      defaultValue={default_value}
      InputProps={{ disableUnderline: true }}
    />
  );
}
