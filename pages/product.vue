<template>
  <div>
    <div class="container">
      <div class="block gap-4 md:grid md:grid-cols-12">
        <div class="product-gallery col-span-6">
          <div class="grid grid-cols-3 gap-4">
            <div id="img-container" class="col-span-3">
              <InnerImageZoom
                :src="activeImageURL"
                :zoom-src="activeImageURL"
                zoom-type="hover"
              />
            </div>
            <div class="col-span-3">
              <template v-if="photos.length > 0">
                <VueSlickCarousel v-bind="settings">
                  <div
                    v-for="photo in photos"
                    :key="photo.id"
                  >
                    <a
                      :href="`${$config.baseURL}/storage/${photo.path}`"
                      class="hover:border-brand-black mx-1
                      inline-block border border-gray-200 p-1
                      py-2 px-1 text-center"
                      @click.prevent="setActiveMedia(photo)"
                      @mouseover="setActiveMedia(photo)"
                    >
                      <img
                        class="h-14 w-14"
                        :src="`${$config.baseURL}/storage/${photo.path}`"
                        alt="Product title"
                      >
                    </a>
                  </div>
                </VueSlickCarousel>
              </template>
            </div>
          </div>
        </div>
        <div class="summary entry-summary col-span-6 p-[1rem]">
          <header class="relative mb-[2em]">
            <div>
              <span
                class="
                  superheadline
                  flex flex-row
                  items-center
                  gap-2
                  pb-3
                  text-[1rem]
                  font-normal
                "
              >
                <span
                  v-for="category in product.categories"
                  :key="category.id"
                  class="font-medium text-black"
                >
                  <i class="ri-price-tag-3-line text-[#1a1d18]"></i>
                  <span>{{ category.name }}</span>
                </span>
              </span>
            </div>
            <h2 class="text-[2.5em] font-bold">
              <span class="font-montserrat relative block text-inherit">
                {{ product.name }}
              </span>
            </h2>
          </header>
          <p
            class="
              price
              mb-[0.5em]
              text-[3em]
              font-bold
              leading-[1]
              tracking-tighter
              text-[#181818]
            "
          >
            <span class="amount">{{ formatCurrency(product.price) }}</span>
          </p>
          <div class="w-full pb-[2em]">
            <p
              class="product-description my-12"
              v-html="product.description"
            ></p>
            <p>
              <template v-if="product.stock > 0">
                In Stock
              </template>
              <template v-else>
                Out of stock
              </template>
            </p>
          </div>
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <div
              class="flex flex-col
              items-center justify-start lg:flex-row
              lg:gap-2"
              >
                <div class="my-5 flex justify-start gap-2">
                  <label class="mx-2 my-auto items-center">
                    Quantity
                  </label>
                  <input
                    v-model="quantity"
                    type="number"
                    class="
                      h-14
                      w-28
                      border-transparent
                      bg-gray-100
                      py-[13.008px]
                      pl-[15px]
                      text-lg
                      focus:border-gray-500 focus:bg-white focus:ring-0
                    "
                    step="1"
                    min="1"
                    :max="product.stock"
                    :disabled="!product.stock > 0"
                    name="quantity"
                    @keyup="handleHighStockValue"
                  />
                  <BaseButton
                    type="button"
                    class="
                      bg-brand-black
                      h-14
                      w-full
                      cursor-pointer
                      border
                      py-4
                      px-5
                      font-bold
                      leading-3
                      text-white
                      transition
                      duration-300
                      hover:shadow-[#1a1d18]/50
                      lg:w-auto
                    "
                    :disabled="!product.stock > 0"
                    @click="addToCart"
                  >
                    Add to Cart
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-description col-span-12 p-[1rem]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';
import VueSlickCarousel from 'vue-slick-carousel';
import handlesMedia from '~/mixins/shop/handlesMedia'
import currencyMixin from '~/mixins/currency'
import BaseButton from '~/components/base/BaseButton.vue';

const slickSettings = {
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  speed: 500,
  swipe: true,
  swipeToSlide: true,
  infinite: true,
  touchThreshold: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

export default {
  name: 'product',
  components: {
    InnerImageZoom,
    VueSlickCarousel,
    BaseButton,
  },
  mixins: [
    currencyMixin,
    handlesMedia
  ],
  data() {
    return {
      product: {
        id: 0,
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: [],
        tags: [],
      },
      activeImageURL: '',
      photos: [],
      quantity: 1,
      settings: slickSettings
    };
  },
  computed: {
    cartItems: {
      get() {
        return this.$store.state.cart.cart
      },
    },
    cartCount: {
      get() {
        return this.$store.getters['cart/cartCount']
      },
    },
  },
  mounted() {
    this.retrieveItem(this.$route.query.id);
  },
  methods: {
    setActiveMedia(path) {
      this.activeImageURL = this.getMediaURL(path)
    },
    retrieveItem(itemId) {
      this.$axios
        .$get(`v1/items/${itemId}`)
        .then((response) => {
          this.product = response.data.item
          this.activeImageURL = this.getMediaURL(this.product.media[0])
          this.photos = this.product.media
        })
    },
    handleHighStockValue() {
      if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock
      }
      if (this.quantity <= 0) {
        this.quantity = 1
      }
    },
    addToCart() {
      this.$store
        .dispatch('cart/addItemToCart', {
          id: this.product.id,
          quantity: parseInt(this.quantity),
          stock: this.product.stock
        })
        .then(() => {
          this.$oruga.notification.open({
            duration: 2000,
            message: 'Item added to cart',
            position: 'bottom',
            variant: 'success',
            closable: true,
            queue: true,
          });

          setTimeout(() => {
            this.$router.push('/cart');
          }, 3000);
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item quantity in cart cannot exceed item stock',
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        })
    },
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--large {
  height: 62px;
}
</style>

<style>
.product-description p {
  min-height: 1.5rem;
}
.slick-prev:before, .slick-next:before {
      color:#1a1d18 !important;
      font-size: 1.15rem;
      height: 2fr;
      width: 2fr;
}

.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>