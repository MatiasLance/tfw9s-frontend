<!-- eslint-disable vue/html-comment-content-newline -->
<!-- eslint-disable vue/html-comment-indent -->
<!-- eslint-disable vue/max-len -->
<!-- eslint-disable max-len -->
<template>
  <div
    class="
      group
      flex
      w-full
      flex-col
      border-2
      transition
      duration-200
      hover:shadow-xl
    "
  >
    <div class="flex w-full items-center overflow-hidden">
      <img
        class="
          cursor-pointer
          object-cover
          transition
          duration-200
          group-hover:scale-125
        "
        :src="path"
      />
    </div>

    <div
      class="flex w-full grow flex-col items-center justify-center space-y-1 p-3 lg:space-y-2"
    >
      <div class="grid grid-cols-1">
        <div class="flex">
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex flex-wrap"
          >
            <span class="pr-1 text-[16px]">
              <i class="ri-price-tag-3-line text-white"></i>
            </span>
            <span
              class="text-[16px] text-white
              selection:bg-brand-black selection:text-white"
            >
              {{ category.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="h-3/4">
        <h3
          class="
            break-words text-sm text-white
            selection:bg-brand-grey
            selection:text-white md:text-lg
          "
        >
        <div class="flex flex-col items-center">
          <NuxtLink :to="'/view-fighter/?id=' + fighters[0].id">
          <span
              class="
                   font-Chakra Petch
                    whitespace-normal
                    font-bold text-white transition
                    duration-200
                    hover:text-brand-yellow
                  "
                >
                  {{ fighters[0].user.first_name }}
                  {{ fighters[0].user.last_name }}
                </span>
              </NuxtLink>
          <span class="px-2 text-[18px] text-gray-300">vs</span>
              <NuxtLink :to="'/view-fighter/?id=' + fighters[1].id">
                <span
                  class="
                    font-Chakra Petch
                    whitespace-normal
                    font-bold text-white transition
                    duration-200
                    hover:text-brand-yellow
                  "
                >
                  {{ fighters[1].user.first_name }}
                  {{ fighters[1].user.last_name }}
                </span>
              </NuxtLink>
            </div>
        </h3>
      </div>
      <div>
        <span class="text-center text-[16px] text-gray-400 line-clamp-3" v-html="description"></span>
      </div>
      <div class="pt-3">
        <span class="text-[16px] font-bold text-white">{{ `${promoter.user.first_name}
        ${promoter.user.last_name}` }}</span>
      </div>
      <div>
        <span class="text-[16px] text-white">{{ event.event_title }}</span>
      </div>
      <div class="mt-2"></div>
      <div class="w-full">
        <BaseButton
          type="button"
          class="
            w-full
            cursor-pointer
            rounded-lg
            bg-brand-green
            py-2
            text-xs
            leading-3 text-white
            transition
            duration-300
            hover:shadow-[#1a1d18]/50
          "
          @click="handleWatch(fight_data)"
        >
          <span class="text-black">Watch</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable vue/prop-name-casing */
import currencyMixin from '~/mixins/currency';
import BaseButton from '~/components/base/BaseButton';

export default {
  components: { BaseButton },
  mixins: [ currencyMixin ],
  props: {
    fight_id: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    fighters: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    promoter: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    fight_data: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      showComponent: false,
      showWatchModal: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    loginBtn() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Please login to watch fight',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    handleWatch(data) {
      this.$emit('display-fight', data);
    },
    addToCart() {
      this.$store
        .dispatch('mediacart/addMediaToCart', { id: this.fight_id })
        .then(() => {
          this.$oruga.notification.open({
            duration: 2000,
            message: 'Fight added to cart',
            position: 'bottom',
            variant: 'success',
            closable: true,
            queue: true,
          });
          this.$router.push('/fight-purchase');
        })
    },
  }
};
</script>

<style scoped>
.break-words {
  word-break: normal;
  overflow-wrap: anywhere;
}
</style>
