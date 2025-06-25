// import { loadStripe } from '@stripe/stripe-js';
// import api from '../utils/api';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// export default function CheckoutButton({ book }) {
//   const handleCheckout = async () => {
//     const stripe = await stripePromise;
//     const { data } = await api.post('/payment/create-checkout-session', { book });
//     window.location.href = data.url;  // Redirect to Stripe Checkout
//   };

//   return (
//     <button onClick={handleCheckout} className="checkout-btn">
//       Pay ₹{book.price}
//     </button>
//   );
// }
