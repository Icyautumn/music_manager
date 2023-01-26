import React, { useEffect, useContext, useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AccountContext } from "../login Page/Accounts";

export default function Attributes () {
  const [plan, setPlan] = useState("");

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((data) => {
      // gets the uid of the user
      console.log(data['user'].username)
      // check if user has verified email
      console.log(data['email_verified'])
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user }) => {
      const attributes = [
        new CognitoUserAttribute({ Name: "", Value: plan }),
      ];

      user.updateAttributes(attributes, (err, result) => {
        if (err) console.error(err);
        console.log(result);
      });
    });
  };

  return (
    <div>
      <h1>Update your plan:</h1>
      <form onSubmit={onSubmit}>
        <input value={plan} onChange={(event) => setPlan(event.target.value)} />

        <button type="submit">Change plan</button>
      </form>
    </div>
  );
};