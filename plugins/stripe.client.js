import { loadStripe } from '@stripe/stripe-js'

export default async (context, inject, app) => {
  const stripePromise = loadStripe(context.$config.stripe.publishableKey)
  const stripe = await stripePromise

  inject('stripe', stripe)
  inject('stripePromise', stripePromise)
}