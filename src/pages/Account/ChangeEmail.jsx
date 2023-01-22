import React, { useState, useContext } from "react";
import { AccountContext } from "../login Page/Accounts";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export default function ChangeEmail() {
  const [password, setPassword] = useState("");
  const [NewEmail, setNewEmail] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        const attributes = [
          new CognitoUserAttribute({ Name: "email", Value: NewEmail }),
        ];

        user.updateAttributes(attributes, (err, results) => {
          if (err) console.log(err);
          console.log(results);
        });
      });
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={NewEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="new Password"
        />

        <button type="submit">Change email</button>
      </form>
    </div>
  );
}
