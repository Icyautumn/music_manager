import React, {useContext, useEffect, useState} from 'react'
import { AccountContext } from './Accounts';
import { useNavigate } from 'react-router-dom';

export default () => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const {getSession, logout} = useContext(AccountContext);

    useEffect(() =>{
        getSession().then(session => {
            console.log("Session", session.nickname);
            localStorage.setItem("id",  session.nickname)
            navigate(`/calendar/${session.nickname}`)
            setStatus(true);
        })
    }, [])

    const handleClick  = async () =>{
        await logout()
        setStatus(false);

    }

  return (
    <div>
        {status ? (<button onClick={() => {logout();}}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              logout
            </span>
            </button>) : 'Please login below'}
    </div>
  );
};

