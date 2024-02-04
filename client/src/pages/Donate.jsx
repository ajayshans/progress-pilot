import { useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries';

// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Donate = () => {
    // const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // useEffect(() => {
    //     if (data) {
    //     stripePromise.then((res) => {
    //         res.redirectToCheckout({ sessionId: data.checkout.session });
    //     });
    //     }
    // }, [data]);

  
    // function submitCheckout() {
    // getCheckout();
    // }

    // return (
    //     <main>
    //         <div>
    //             <h1>Test - Donate</h1>
                
    //         </div>
    //         <button onClick={submitCheckout}>Checkout</button>
    //     </main>
    // )
    return (
    <h1>Test - Donate</h1>
    )

};
    
export default Donate;