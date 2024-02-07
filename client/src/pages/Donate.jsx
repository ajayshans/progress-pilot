import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { Button } from 'semantic-ui-react';

// Stripe API Public Key
const stripePromise = loadStripe('pk_test_51Oh2P2AjWthucpu6veLFYox0tZCQIvSrGixry0dZ912ZH0NN5QXktDKHjknQtDbCcJzwRECOV1PqUicrAXiq1vYp00tmzZq5Lh');

const Donate = () => {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // Call Stripe API to redirect to checkout
    useEffect(() => {
        if (data) {
        stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
        });
        }
    }, [data]);

  
    function submitCheckout() {
        getCheckout();
    };

    return (
        <main>
            <div>
                <h1 className="text-center pt-5">Support Us</h1>
            </div>
            <div className="container-alt bg-black p-3 mb-5">
                <div className="text-white text-center mt-4 mb-4">
                    <h5 className="text-light">Your Support means a lot to us!</h5>
                    <br />
                    <h5 className="text-light">Please click below to support Progress Pilot</h5>
                </div>
                <div className="flex-row justify-center mb-5">
                    <Button className="flex-row btn btn-lg btn-white" onClick={submitCheckout}> Donate 🚀</Button>
                </div>
            </div>
        </main>
    )

};
    
export default Donate;