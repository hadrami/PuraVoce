import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  const lastProduct= req.body.lastElementslug;

  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1MWhKRIgmh0fGjcFkOVWsQZv' },
          { shipping_rate: 'shr_1MWhJSIgmh0fGjcFgz8s7037' },
        ],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          //c80sqx76 is the sanity project id
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/c80sqx76/production/').replace('-webp', '.webp');

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/product/${lastProduct}?setShowCart(true)`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
     
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}