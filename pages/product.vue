<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
    <div class="container mx-auto px-4 py-8">
      <div class="grid gap-8 md:grid-cols-12">
        
        <!-- Product Gallery -->
        <div class="product-gallery col-span-6">
          <div class="grid grid-cols-1 gap-4">
            <!-- Main Image -->
            <div class="col-span-1 rounded-2xl overflow-hidden 
                        shadow-2xl border-2 border-green-500/30">
              <InnerImageZoom
                :src="activeImageURL"
                :zoom-src="activeImageURL"
                zoom-type="hover"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnail Carousel -->
            <div class="col-span-1" v-if="photos.length > 0">
              <VueSlickCarousel v-bind="imageCarouselSettings">
                <div v-for="photo in photos" :key="photo.id">
                  <button
                    type="button"
                    @click="setActiveMedia(photo)"
                    @mouseover="setActiveMedia(photo)"
                    :class="[
                      'mx-1 inline-block rounded-xl border-2 p-2',
                      'transition-all duration-300 transform hover:scale-110',
                      activeImageURL === getMediaURL(photo) 
                        ? 'border-green-500 bg-green-500/20 shadow-lg' 
                        : 'border-gray-600 hover:border-green-400'
                    ]"
                  >
                    <img
                      class="h-14 w-14 object-cover rounded-lg"
                      :src="getMediaURL(photo)"
                      :alt="`Product thumbnail - ${photo.id}`"
                    >
                  </button>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="summary entry-summary col-span-6 p-6 
                    bg-gradient-to-br from-gray-800 to-gray-900 
                    rounded-2xl shadow-2xl border border-gray-700">
          
          <!-- Header -->
          <header class="mb-8">
            <!-- Categories -->
            <div class="mb-4">
              <span class="flex flex-row items-center gap-3 flex-wrap">
                <span
                  v-for="category in product.categories"
                  :key="category.id"
                  class="inline-flex items-center gap-1 px-3 py-1 
                         rounded-full bg-green-500/20 border 
                         border-green-500/30 text-green-300 text-sm"
                >
                  <i class="ri-price-tag-3-line text-xs"></i>
                  {{ category.name }}
                </span>
              </span>
            </div>
            
            <!-- Product Name -->
            <h2 class="text-3xl md:text-5xl font-bold 
                       bg-gradient-to-r from-green-400 to-white 
                       bg-clip-text text-transparent mb-4">
              {{ product.name }}
            </h2>
          </header>

          <!-- Price Section -->
          <div class="mb-6">
            <div class="flex items-center gap-4">
              <!-- Regular Price -->
              <span v-if="!product.is_on_sale" 
                    class="text-4xl md:text-5xl font-bold text-white">
                {{ formatCurrency(product.price) }}
              </span>
              
              <!-- Sale Price -->
              <span v-if="product.is_on_sale" class="flex items-center gap-4">
                <span v-if="product.show_rrp"
                  class="text-2xl font-medium text-gray-400 line-through"
                >
                  {{formatCurrency(product.price)}}
                </span>
                <span class="text-4xl md:text-5xl font-bold text-green-400 
                             bg-gradient-to-r from-green-500/20 to-transparent 
                             px-4 py-2 rounded-2xl">
                  {{formatCurrency(product.saleprice)}}
                </span>
              </span>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <template v-if="product.stock > 0">
              <div class="inline-flex items-center gap-2 rounded-xl 
                          bg-green-500/20 px-4 py-2 border border-green-500/30">
                <i class="ri-checkbox-circle-line text-green-400"></i>
                <span class="text-sm font-bold text-green-300 uppercase">
                  In Stock ✅
                </span>
              </div>
            </template>
            
            <template v-else>
              <template v-if="!product.isHideOutOfStock">
                <div class="inline-flex items-center gap-2 rounded-xl 
                            bg-red-500/20 px-4 py-2 border border-red-500/30">
                  <i class="ri-close-circle-line text-red-400"></i>
                  <span class="text-sm font-bold text-red-300 uppercase">
                    Out of Stock
                  </span>
                </div>
              </template>
              
              <template v-if="product.has_variants">
                <div class="inline-flex items-center gap-2 rounded-xl 
                            bg-blue-500/20 px-4 py-2 border border-blue-500/30 
                            mt-2">
                  <i class="ri-checkbox-circle-line text-blue-400"></i>
                  <span class="text-sm font-bold text-blue-300 uppercase">
                    Variants Available
                  </span>
                </div>
              </template>
            </template>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <div class="rounded-xl bg-gray-700/30 p-4 border border-gray-600">
              <p class="product-description text-gray-200 leading-relaxed"
                 v-html="product.description"
              ></p>
            </div>
          </div>

          <!-- Quantity & Actions -->
          <div class="space-y-6">
            <!-- Quantity Selector -->
            <div class="flex items-center gap-4">
              <label class="text-lg font-semibold text-white">
                Quantity
              </label>
              <input
                v-model="quantity"
                type="number"
                class="h-12 w-24 rounded-xl border-2 border-gray-600 
                       bg-gray-700 px-4 text-lg text-white focus:border-green-500 
                       focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
                       transition-all"
                step="1"
                min="0"
                :max="product.stock"
                :disabled="!product.stock > 0"
                name="quantity"
                @keyup="handleHighStockValue"
              />
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-4">
              <!-- Primary Action -->
              <div class="flex gap-4">
                <template v-if="product.has_variants">
                  <button
                    type="button"
                    @click="viewVariantSlider"
                    class="flex-1 rounded-2xl bg-gradient-to-r 
                           from-blue-500 to-blue-600 px-8 py-4 
                           text-lg font-bold text-white shadow-2xl 
                           transition-all duration-300 transform 
                           hover:from-blue-600 hover:to-blue-700 
                           hover:scale-105 hover:shadow-blue-500/50 
                           active:scale-95 flex items-center 
                           justify-center gap-2"
                  >
                    <i class="ri-eye-line"></i>
                    View Variants
                  </button>
                </template>
                
                <template v-else>
                  <button
                    type="button"
                    :disabled="!product.stock > 0"
                    @click="addToCart"
                    class="flex-1 rounded-2xl bg-gradient-to-r 
                           from-green-500 to-green-600 px-8 py-4 
                           text-lg font-bold text-white shadow-2xl 
                           transition-all duration-300 transform 
                           hover:from-green-600 hover:to-green-700 
                           hover:scale-105 hover:shadow-green-500/50 
                           active:scale-95 flex items-center 
                           justify-center gap-2 disabled:opacity-50 
                           disabled:cursor-not-allowed"
                  >
                    <i class="ri-shopping-cart-2-line"></i>
                    Add to Cart
                  </button>
                </template>

                <!-- Back to Parent -->
                <template v-if="product.parent !== null">
                  <NuxtLink :to="`/product?id=${product.parent.id}`" 
                            class="flex-1">
                    <button
                      type="button"
                      class="w-full rounded-2xl bg-gradient-to-r 
                             from-gray-600 to-gray-700 px-8 py-4 
                             text-lg font-semibold text-white 
                             transition-all duration-300 transform 
                             hover:from-gray-500 hover:to-gray-600 
                             hover:scale-105 active:scale-95 
                             flex items-center justify-center gap-2"
                    >
                      <i class="ri-arrow-left-line"></i>
                      Back
                    </button>
                  </NuxtLink>
                </template>
              </div>

              <!-- Back to Shop -->
              <div>
                <NuxtLink to="/shop">
                  <button
                    type="button"
                    class="w-full rounded-2xl bg-gradient-to-r 
                           from-gray-700 to-gray-800 px-8 py-4 
                           text-lg font-semibold text-gray-300 
                           border-2 border-gray-600 transition-all 
                           duration-300 transform hover:from-gray-600 
                           hover:to-gray-700 hover:text-white 
                           hover:scale-105 hover:border-gray-500 
                           active:scale-95 flex items-center 
                           justify-center gap-2"
                  >
                    <i class="ri-arrow-left-line"></i>
                    Back to Shop
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Variants Slider -->
      <div
        v-if="product && product.has_variants"
        ref="variantSlider"
        class="mt-12 p-6 bg-gradient-to-br from-gray-800 to-gray-900 
               rounded-2xl shadow-2xl border border-gray-700"
      >
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-6 
                   bg-gradient-to-r from-green-400 to-white 
                   bg-clip-text">
          Available Variants
        </h3>
        <VariantSlider :variants="product.related" />
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
import handlesCoordinates from '~/mixins/utilities/handlesCoordinates'
import currencyMixin from '~/mixins/currency'
import VariantSlider from '~/components/VariantSlider';

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
    VariantSlider,
  },
  mixins: [
    currencyMixin,
    handlesMedia,
    handlesCoordinates,
  ],
  data() {
    return {
      isSelected: '',
      salePriceMock: 100,
      showRRP: true,
      isOnSaleMock: true,
      product: {
        id: 0,
        name: '',
        description: '',
        price: '',
        salePrice: '',
        stock: '',
        parent: null,
        categories: [],
        tags: [],
        variants: [],
        related: [],
        // eslint-disable-next-line camelcase
        has_variants: false,
      },
      showOutOfStock: true,
      activeImageURL: '',
      photos: [],
      quantity: 1,
      imageCarouselSettings: slickSettings
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
  watch: {
    $route() {
      this.retrieveItem(this.$route.query.id);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  },
  mounted() {
    this.retrieveItem(this.$route.query.id);
  },
  methods: {
    viewVariantSlider() {
      const sliderCoordinates = this.getCoordinates(this.$refs.variantSlider)
      window.scrollTo({
        top: sliderCoordinates.top,
        left: sliderCoordinates.left,
        behavior: 'smooth',
      })
    },
    setActiveMedia(path) {
      this.activeImageURL = this.getMediaURL(path)
    },
    retrieveItem(itemId) {
      this.$axios
        .$get(`v1/items/${itemId}`)
        .then((response) => {
          this.product = response.data.item
          if (this.product.stock === 0) {
            this.quantity = 0
          }
          this.activeImageURL = this.getMediaURL(this.product.media[0])
          this.photos = this.product.media
        })
    },
    handleHighStockValue() {
      if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock
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
            queue: true,
          });
          this.$router.push('/cart');
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item quantity in cart cannot exceed item stock',
            position: 'bottom',
            variant: 'danger',
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