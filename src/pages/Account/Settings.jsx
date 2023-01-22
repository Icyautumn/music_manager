import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../login Page/Accounts";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

export default function Settings() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true);
    });
  });
  return (
    <div>
      {LoggedIn && (
        <>
          <h1>Settings</h1>
          <ChangePassword/>
          <ChangeEmail/>
        </>
      )}
    </div>
  );
}
