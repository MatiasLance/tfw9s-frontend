<template>
  <div>
    <header class="z-10 h-14 border-b border-gray-200 bg-white py-3 shadow-sm">
      <div class="container mx-auto flex h-full items-center justify-end px-6">
        <ul class="flex shrink-0 items-center space-x-2">
          <li>
            <button
              type="button"
              class="
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border border-transparent
                bg-gray-200
                hover:border-brand-black
              "
              aria-label="Button name"
              @click="toggle"
            >
              <img
                src="~/assets/images/avatars/avatar.jpg"
                width="32"
                height="32"
                class="h-10 w-10 rounded-full"
              />
            </button>
          </li>
        </ul>
      </div>
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform   opacity-0 scale-95"
      >
        <div
          v-show="isOpen"
          class="
            absolute
            right-16
            z-20
            mx-auto
            mt-2
            origin-top-right
            rounded-md
            bg-white
            shadow-lg
          "
        >
          <div class="my-3 flex items-center px-5 py-1">
            <div class="shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="~/assets/images/avatars/avatar.jpg"
                alt
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-black">
                {{ adminFullName }}
              </div>
              <div class="mt-1 text-sm font-medium leading-none text-gray-400">
                {{ adminEmail }}
              </div>
            </div>
          </div>
          <div
            class="shadow-xs rounded-md bg-white py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              @click="logout"
            >
              Log out
            </a>
          </div>
        </div>
      </Transition>
    </header>
    <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
      <div
        class="
          space-y-3
          px-6
          text-left
          sm:text-left
          lg:col-span-6 lg:mt-10
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
            <NuxtLink to="/admin">
              <VBtn text color="white">Admin</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-3xl font-bold text-white lg:text-6xl">
          Shipping Note
        </h1>
      </div>
    </BaseHeader>

    <section class="container mx-auto max-w-screen-lg px-4">
      <div class="mb-20 mt-10 w-full">
        <article
          class="
            my-5
            mx-auto
            border border-gray-200
            bg-white
            p-4
            shadow-lg
            md:p-7
            lg:p-6
          "
          data-aos="fade-down-right"
        >
          <form @submit.prevent="editShippingNotes">
            <div class="mb-4">
              <div class="flex flex-wrap items-start justify-start gap-4">
                <div class="w-full">
                  <label class="mb-1 block text-xl font-bold">
                    Delivery
                  </label>
                  <Tiptap v-model="deliveryNote" class="" />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex flex-wrap items-start justify-start gap-4">
                <div class="w-full">
                  <label class="mb-1 block text-xl font-bold">
                    Self Pickup
                  </label>
                  <Tiptap v-model="pickupNote" class="" />
                </div>
              </div>
            </div>
            <hr class="my-4">
            <div class="mb-6">
                <div class="w-full">
                  <span class="mb-1 block text-lg text-gray-500">
                    Preview
                  </span>
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ShippingType
                      v-model="shippingType"
                      radio-value="delivery"
                      name="shippingType"
                      title="Delivery"
                      :note="deliveryNote"
                    />
                    <ShippingType
                      v-model="shippingType"
                      radio-value="pickup"
                      name="shippingType"
                      title="Self Pickup"
                      :note="pickupNote"
                    />
                  </div>
                </div>
            </div>

            <button
              type="submit"
              class="
                my-2
                inline-block
                w-full
                border border-transparent
                bg-brand-black
                py-3
                px-5
                text-center
                font-bold
                text-white
                hover:bg-brand-dblue
              "
            >
              Apply changes
            </button>
            <p class="mt-5 flex justify-center font-semibold">
              <NuxtLink
                to="/admin"
                class="
                  mx-auto
                  flex items-center
                  text-brand-mred
                  hover:text-brand-black
                  hover:underline hover:decoration-brand-black
                "
              >
                <i class="ri-arrow-left-line mr-2"></i>
                Back to Admin panel
              </NuxtLink>
            </p>
          </form>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import BaseHeader from '~/components/base/BaseHeader';
import ShippingType from '~/components/ShippingType'
import Tiptap from '~/components/Wysiwyg/Tiptap'
import aosMixin from '~/mixins/aos';
import logout from '~/mixins/auth/logout';

export default {
  name: 'shipping',
  components: {
    BaseHeader,
    ShippingType,
    Tiptap,
  },
  mixins: [ logout, aosMixin ],
  data() {
    return {
      deliveryNote: '',
      pickupNote: '',
      shippingType: 'delivery',
      isOpen: false,
    };
  },
  computed: {
    adminEmail: {
      get() {
        return this.$store.state.auth.user.email
      },
    },
    adminFullName: {
      get() {
        const firstName = this.$store.state.auth.user.first_name
        const lastName = this.$store.state.auth.user.last_name
        return `${firstName} ${lastName}`
      },
    },
  },
  mounted() {
    this.retrieveShippingNotes();
    this.$axios
      .$get('/v1/orders/shipping-notes')
      .then((response) => {
        this.deliveryNote = response.data.options.delivery_note;
        this.pickupNote = response.data.options.pickup_note;
      });
    document.addEventListener('click', this.closeTab);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeTab);
  },
  methods: {
    retrieveShippingNotes() {
      this.$axios
        .$get('/v1/orders/shipping-notes/')
        .then((response) => {
          this.deliveryNote = response.data.options.delivery_note;
          this.pickupNote = response.data.options.pickup_note;
        });
    },
    editShippingNotes() {
      if (!this.isFormEmpty()) {
        const form = new FormData();
        form.append('_method', 'PATCH');
        form.append('delivery_note', this.deliveryNote);
        form.append('pickup_note', this.pickupNote);
        this.$axios
          .$post('v1/orders/shipping-notes/update', form)
          .then((response) => {
            this.$oruga.notification.open({
              message: response.title,
              variant: 'success',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
            this.retrieveShippingNotes();
          });
      } else {
        this.$oruga.notification.open({
          message: 'Must not be empty.',
          variant: 'danger',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
      }
    },
    isFormEmpty() {
      return (
        this.deliveryNote === '' ||
        typeof this.deliveryNote === 'undefined' ||
        this.pickupNote === '' ||
        typeof this.pickupNote === 'undefined'
      );
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    closeTab(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>