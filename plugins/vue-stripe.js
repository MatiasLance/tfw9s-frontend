import Vue from 'vue';
import { StripePlugin } from '@vue-stripe/vue-stripe';

export default ({ app }) => {
  setTimeout(() => {
    if (typeof window.Stripe === 'undefined') {
      return
    }

    const options = {
      pk: app.$config.stripe.publishableKey,
      testMode: !app.$config.stripe.liveEnvironment,
      stripeAccount: app.$config.stripe.account,
      apiVersion: app.$config.stripe.apiVersion || '2023-10-16',
      locale: app.$config.stripe.locale || 'en',
    };

    Vue.use(StripePlugin, options)
  }, 100)
}
