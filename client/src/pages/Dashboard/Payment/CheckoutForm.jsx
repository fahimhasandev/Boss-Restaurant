import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {
  const [transactionId, setTransactionId] = useState();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    axiosSecure
      .post('/create-payment-intent', {
        price: totalPrice,
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    //confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || 'anonymous',
            name: user.displayName || 'anonymous',
          },
        },
      });

    if (confirmError) {
      console.log('Confirm Error');
    } else {
      console.log('Payment Intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('tranacton id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), //tu date converty,us moment js
          cardIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: 'pending',
        };

        const res = await axiosSecure.post('/payments', payment);
        console.log('payment saved', res.data);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        className='btn btn-primary'
        type='submit'
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className='text-red-500'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transction id</p>}
    </form>
  );
};

export default CheckoutForm;
