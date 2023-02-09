import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
    const urlParameters = useParams();
    const navigate = useNavigate();

    const invoicePaid = async () => {
        const response = await axios({
          method: "PUT",
          url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/invoice/${urlParameters.invoice_id}`,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        if (response) {
          const receiver = await response.data;
          console.log(receiver)
          if(receiver === "invoice updated"){
            navigate(`/view_invoice/${urlParameters.user_id}`)
          }
        }
      };

    useEffect(() =>{
        invoicePaid();
    })
  return (
    <div>Payment Processing</div>
  )
}

export default Payment