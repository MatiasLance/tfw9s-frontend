<template>
  <div
    class="cta w-full
    bg-gradient-to-r from-brand-dgrey to-brand-grey"
  >
    <div class="container relative mx-auto max-w-screen-xl px-4 sm:px-8">
        <div
            class="flex flex-wrap items-center
                justify-center"
        >
            <div class="cta-info">
                <h2 class="mb-8 text-3xl font-semibold">
                    {{ title1 }}
                </h2>
                <ul>
                    <li class="cta-phone flex">
                        <i class="ri-phone-fill mr-2"></i>
                        <a
                        :href="`tel:${phone}`"
                        title="Phone number"
                        class="text-white
                        hover:underline
                        hover:decoration-slate-50
                        hover:decoration-4
                        hover:underline-offset-8"
                        style="color: #fff"
                        >
                            {{ phone }}
                        </a>
                    </li>
                    <li class="cta-address flex">
                        <i class="ri-map-pin-fill mr-2"></i>
                        {{ address }}*
                    </li>
                    <li class="cta-time flex">
                        <i class="ri-time-fill mr-2"></i>
                        {{ hours }}
                    </li>
                </ul>
                <div class="my-7">
                    <p
                        v-for="note in importantNotes"
                        :key="note"
                        class="text-[16px] sm:text-xs"
                    >
                        * {{ note }}
                    </p>
                </div>
            </div>
            <div class="cta-newsletter">
                <h2 class="text-3xl font-semibold">
                    {{ title2 }}
                </h2>
                <p class="mb-5 text-white/70">
                    {{ description }}
                </p>
                <form class="my-5 w-80" @submit.prevent="subscribe">
                    <input
                    type="email"
                    placeholder="Email"
                    class="w-full appearance-none
                    rounded-l-md border border-transparent
                    bg-gray-100 py-2 px-3 text-black"
                    />

                    <button
                        type="submit"
                        class="rounded-r-md border
                        border-transparent bg-brand-dgrey
                        px-4 py-2 text-white hover:bg-slate-200
                        hover:text-black"
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
export default {
  name: 'BeforeFooterSection',
  data() {
    return {
      title1: 'Visit our store',
      phone: '0411 965 954',
      address: '123 Address',
      importantNotes: [
        'For local (Gold Coast) customers and order pickups only.',
        'Strictly no walk-in policy, unless appointment is scheduled. Please email or phone for a prearranged, curb side pick-up.'
      ],
      email: 'hello@thedrumhq.com.au',
      hours: 'Mon - Fri: 9am-4pm, Sat: 10am-3pm, Sun: CLOSED',
      title2: 'Join our mailing list',
      description: 'Stay in touch with latest updates about our products and offers',
      newsletter: 'Newsletter'
    }
  },
  methods: {
    subscribe() {
      // eslint-disable-next-line no-alert
      alert('Subscribed');
    }
  }
}
</script>

<style>
.cta-info {
    flex: 0 0 50%;
    color: #fff;
    padding: 70px 15px;
    z-index: 1;
}
.cta-info ul {
    list-style: none;
    padding: 0;
    margin: 0 0 30px;
}
.cta-info ul li {
    font-size: 18px;
    margin: 0 0 10px;
}
.cta-newsletter {
    flex: 0 0 50%;
    color: #fff;
    padding: 70px 15px;
    text-align: center;
}
.cta-newsletter > h2 {
    margin: 0 0 20px;
}
.cta-newsletter > p {
    margin: 0 0 40px;
}
.cta-newsletter form {
    display: flex;
    justify-content: center;
    max-width: 420px;
    margin: 0 auto;
    align-items: flex-start;
}

@media (max-width: 768px) {
    .cta-info {
        flex: 0 0 90%;
    }
}
</style>