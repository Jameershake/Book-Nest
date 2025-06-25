// import express from 'express';
// import Stripe from 'stripe';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post('/create-checkout-session', async (req, res) => {
//   try {
//     const { book } = req.body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: book.title,
//             description: book.description
//           },
//           unit_amount: Math.round(book.price * 100)
//         },
//         quantity: 1
//       }],
//       mode: 'payment',
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`
//     });

//     res.status(200).json({ url: session.url });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;
