import React, { useState, useContext } from "react";
import { AccountContext } from "../login Page/Accounts";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        user.changePassword(password, newPassword, (err, result) => {
          if (err) console.log(err);
          console.log(result);
        });
      });
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
        />
        <input
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="new Password"
        />

        <button type="submit">Change password</button>
      </form>
    </div>
  );
}
