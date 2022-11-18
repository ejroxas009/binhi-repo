import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const Selection = ({ list, onHandleChange, name, label, value }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={onHandleChange}
          inputProps={{
            name: name,

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          {list.map((item) => {
            if (item.roleId) {
              return (
                <option key={item.roleId} value={item.role}>
                  {item.role}
                </option>
              );
            } else if (item.cropId) {
              return (
                <option key={item.cropId} value={item.cropId}>
                  {item.cropName}
                </option>
              );
            }
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Selection;
