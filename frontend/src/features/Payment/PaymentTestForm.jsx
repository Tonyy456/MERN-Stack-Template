import React, {useEffect, useState} from 'react';
import axios from '@/utils/axios.jsx'
import { useSearchParams } from "react-router-dom";

// Stripe Setup
import { EmbeddedCheckoutProvider,  EmbeddedCheckout } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js/pure';

// Complete Form with multiple options. Root
function PaymentTestForm(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [clientSecret, setClientSecret] = React.useState();
    const redirectCheckout = async () => {
        axios.post('/api/make-stripe-payment').then(response => {
            window.location.href = response.data.url;
        });
    }
    const startCheckoutSession = async () => {
        axios.post('/api/create-checkout-session').then(response => {
            setClientSecret(response.data.clientSecret);
        })
    }
    // const redirectReason = searchParams.get('reason');
    return (
        <>
            <div className="w-screen flex flex-col justify-center items-center gap-10">
                <button className="m-auto btn btn-primary" onClick={redirectCheckout}>Stripe.com Checkout</button>
                <button className="m-auto btn btn-secondary" onClick={startCheckoutSession}>Embedded Checkout</button>
                {clientSecret && <>
                    <MyCheckout clientSecret={clientSecret}/>
                </>}
            </div>
        </>
    );
}

// My embedded checkout form.
// SOURCE: https://docs.stripe.com/checkout/embedded/quickstart?client=react

/*
Payment succeeds - 4242 4242 4242 4242
Payment requires authentication - 4000 0025 0000 3155
Payment is declined - 4000 0000 0000 9995
 */
const MyCheckout = (props) => {
    const stripePromise = loadStripe('pk_test_51PifJbI7J6YQ2hEVlWMdF7BfkKec2qIIkOMdx2baohjJ219vM3l6pqrpsBOWY3wA7ACjyfOnkg2r1HJxR9SgGnkg00ZGiv8qoW');
    const options = {
        clientSecret: `${props.clientSecret}`
    };

    return (
        <div className="w-7/12 h-screen mb-44">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
}



export default PaymentTestForm;