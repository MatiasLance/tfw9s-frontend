import Vue from 'vue';
import { StripePlugin } from '@vue-stripe/vue-stripe';

export default (({ app }) => {
  const options = {
    pk: app.$config.stripe.publishableKey,
    stripeAccount: app.$config.stripe.account,
    apiVersion: app.$config.stripe.apiVersion,
    locale: app.$config.stripe.locale,
  };

  if (process.client) {
    const initStripe = () => {
      if (window.Stripe) {
        Vue.use(StripePlugin, options);
      } else {
        setTimeout(initStripe, 100);
      }
    };
    initStripe();
  }
});