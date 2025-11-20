import Vue from 'vue';
import { StripePlugin } from '@vue-stripe/vue-stripe';

export default (({ app }) => {
  const options = {
    pk: app.$config.stripe.publishableKey,
    testMode: app.$config.stripe.liveEnvironment,
    stripeAccount: app.$config.stripe.account,
    apiVersion: app.$config.stripe.apiVersion,
    locale: app.$config.stripe.locale,
  };

  Vue.use(StripePlugin, options);
})