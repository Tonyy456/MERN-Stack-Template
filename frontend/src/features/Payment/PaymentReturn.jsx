import React, {useEffect, useState} from 'react';
import axios from '@/utils/axios.jsx'
import {PathConstants} from "@/routes/Router.jsx";

function PaymentReturn(props) {
    const [status, setStatus] = useState('')
    const [email, setEmail] = useState('')

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    useEffect(() => {
        axios.get(`/api/session-status?session_id=${sessionId}`).then(response => {
            setStatus(response.data.status)
            setEmail(response.data.customer_email)
        })
    }, [])

    if (status === 'open') {
        window.location.href = PathConstants.PAYMENT_PAGE
    }
    console.log(status);

    return (
        <>
            {status === 'complete' &&
                <div className="m-44 w-1/2">
                    <span className="text-green-600">Success!</span>
                    &nbsp;Thank you for your business! You will receive a receipt at&nbsp;
                    <span className="text-green-600">
                        {email}
                    </span>
                </div>
            }
        </>
    )
}

export default PaymentReturn;