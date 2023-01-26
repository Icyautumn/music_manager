import React, { useState } from "react";
import "./Slider.css";
import Login_page_User from "../login Page/Login_page";
import Settings from "../Account/Settings";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Login_page_MusicSchool from "../login Page/MusicSchool/Login_page_MusicSchool";

function Slider() {
  const [alignment, setAlignment] = useState("User");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
  };
  return (
    <div
      style={{
        backgroundColor: "#f6f5f7",
      }}
    >
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="User">User</ToggleButton>
          <ToggleButton value="MusicSchool">Music School</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {alignment === "User" ? <Login_page_User /> : <Login_page_MusicSchool />}
    </div>
  );
}

export default Slider;
