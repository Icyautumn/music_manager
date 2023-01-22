import React, {useContext, useEffect, useState} from 'react'
import { AccountContext } from './Accounts';

export default () => {
    const [status, setStatus] = useState(false);

    const {getSession, logout} = useContext(AccountContext);

    useEffect(() =>{
        getSession().then(session => {
            console.log("Session", session);
            setStatus(true);
        })
    }, [])

    const handleClick  = async () =>{
        await logout()
        setStatus(false);

    }

  return (
    <div>
        {status ? (<button onClick={logout}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              logout
            </span>
            </button>) : 'Please login below'}
    </div>
  );
};

