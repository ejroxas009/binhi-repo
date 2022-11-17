import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioButton = ({ label, onHandleChange, list, value, name }) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name}
        value={value}
        onChange={onHandleChange}
      >
        {list.map((item) => {
          if (item.genderId) {
            return (
              <FormControlLabel
                key={item.genderId}
                value={item.gender}
                control={<Radio />}
                label={item.gender}
              />
            );
          }
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;
