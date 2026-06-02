<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Loading indicator -->
      <LoadingAnimation
        :is-loading="isLoading"
        loading-title="Product"
      />
      
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
            <div class="col-span-1" v-if="photos && photos.length > 0">
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
                      :alt="`Product thumbnail - ${photo.id || 'image'}`"
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
              <span v-if="product.categories && product.categories.length" class="flex flex-row items-center gap-3 flex-wrap">
                <span
                  v-for="category in product.categories"
                  :key="category.id"
                  class="inline-flex items-center gap-1 px-3 py-1 
                         rounded-full bg-green-500/20 border 
                         border-green-500/30 text-green-300 text-sm"
                >
                  <i class="ri-price-tag-3-line text-xs"></i>
                  {{ category.name || category }}
                </span>
              </span>
            </div>
            
            <!-- Product Name -->
            <h2 class="text-3xl md:text-5xl font-bold 
                       bg-gradient-to-r from-green-400 to-white 
                       bg-clip-text text-transparent mb-4">
              {{ product.name || 'Product Details' }}
            </h2>
          </header>

          <!-- Price Section -->
          <div class="mb-6">
            <div class="flex items-center gap-4">
              <!-- Regular Price -->
              <span v-if="!product.is_on_sale" 
                    class="text-4xl md:text-5xl font-bold text-white">
                {{ displayPrice }}
              </span>
              
              <!-- Sale Price -->
              <span v-if="product.is_on_sale" class="flex items-center gap-4">
                <span v-if="product.show_rrp"
                  class="text-2xl font-medium text-gray-400 line-through"
                >
                  {{ formatCurrency(product.price || 0) }}
                </span>
                <span class="text-4xl md:text-5xl font-bold text-green-400 
                             bg-gradient-to-r from-green-500/20 to-transparent 
                             px-4 py-2 rounded-2xl">
                  {{ displaySalePrice }}
                </span>
              </span>
            </div>
            
            <!-- Size Price Note -->
            <div v-if="hasSizeVariants && selectedSize" class="mt-2">
              <p class="text-sm text-green-300">
                <i class="ri-information-line mr-1"></i>
                Price for {{ selectedSize.size }} size
              </p>
            </div>
            
            <!-- Price Range for Sizes -->
            <div v-if="hasSizeVariants && !selectedSize" class="mt-2">
              <p class="text-sm text-gray-300">
                <i class="ri-price-tag-3-line mr-1"></i>
                {{ sizePriceRange }}
              </p>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <template v-if="hasStock">
              <div class="inline-flex items-center gap-2 rounded-xl 
                          bg-green-500/20 px-4 py-2 border border-green-500/30">
                <i class="ri-checkbox-circle-line text-green-400"></i>
                <span class="text-sm font-bold text-green-300 uppercase">
                  {{ stockStatus }}
                </span>
              </div>
            </template>
            
            <template v-else>
              <div class="inline-flex items-center gap-2 rounded-xl 
                          bg-red-500/20 px-4 py-2 border border-red-500/30">
                <i class="ri-close-circle-line text-red-400"></i>
                <span class="text-sm font-bold text-red-300 uppercase">
                  Out of Stock
                </span>
              </div>
            </template>
            
            <!-- Size Variants Available -->
            <div v-if="hasSizeVariants" class="inline-flex items-center gap-2 rounded-xl 
                        bg-blue-500/20 px-4 py-2 border border-blue-500/30 mt-2 ml-2">
              <i class="ri-ruler-line text-blue-400"></i>
              <span class="text-sm font-bold text-blue-300 uppercase">
                Size Options Available
              </span>
            </div>
          </div>

          <!-- NEW: Size Variants Selection -->
          <div v-if="hasSizeVariants" class="mb-6">
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-white">
                <i class="ri-ruler-line mr-2 text-green-400"></i>
                Select Size:
              </label>
              
              <!-- Enhanced Size Options -->
              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                <button
                  type="button"
                  v-for="size in availableSizes"
                  :key="size.id"
                  @click="selectSize(size)"
                  :class="[
                    'py-3 px-4 rounded-xl border-2 text-center transition-all' +
                    'duration-300 transform font-semibold text-sm md:text-base',
                    selectedSize && selectedSize.id === size.id
                      ? 'border-green-400 bg-gradient-to-br from-green-500/30' +
                      'to-green-600/20 text-green-100 shadow-lg shadow-green-500/20' +
                      'scale-105 ring-2 ring-green-400/30'
                      :
                    size.in_stock
                      ? 'border-gray-500 bg-gray-700/40 text-gray-100 hover:border-green-400' +
                      'hover:bg-green-500/15 hover:scale-105 hover:shadow-md' +
                      'hover:shadow-green-500/10'
                      :
                    'border-gray-700 bg-gray-800/20 text-gray-500' +
                    'cursor-not-allowed line-through opacity-60'
                  ]"
                  :disabled="!size.in_stock"
                >
                  <div class="flex flex-col items-center">
                    <span class="font-medium">{{ size.size }}</span>
                    <span v-if="size.price !== product.price" 
                          class="text-xs mt-1 font-normal"
                          :class="selectedSize && selectedSize.id === size.id 
                                ? 'text-green-200 bg-green-500/20 px-1 rounded' 
                                : 'text-gray-400'">
                      {{ formatCurrency(size.price) }}
                    </span>
                    <span v-else
                          class="text-xs mt-1 font-normal"
                          :class="selectedSize && selectedSize.id === size.id 
                                ? 'text-green-200 bg-green-500/20 px-1 rounded' 
                                : 'text-gray-400'">
                      {{ formatCurrency(product.price || 0) }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Color Selector (multi‑select) -->
          <div v-if="product.availableColors && product.availableColors.length > 0" class="mb-6">
            <label class="block text-lg font-semibold text-white mb-3">
              <i class="ri-palette-line mr-2 text-green-400"></i>
              Colours (select all you want):
            </label>

            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              <label
                v-for="color in product.availableColors"
                :key="color.id"
                class="relative flex items-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer
                      transition-all duration-300 transform hover:scale-105"
                :class="isColorSelected(color.name)
                  ? 'border-green-400 bg-green-500/20 shadow-lg ring-2 ring-green-400/30'
                  : 'border-gray-600 bg-gray-700/40 hover:border-green-400 hover:bg-green-500/15'"
              >
                <input
                  type="checkbox"
                  :value="color.name"
                  v-model="product.selectedColors"
                  class="sr-only"
                  @change="handleColorSelection(color)" 
                />

                <span
                  v-if="color.image_url && color.use_image"
                  class="w-6 h-6 rounded-full border border-white/30 shadow-sm flex-shrink-0 overflow-hidden"
                >
                  <img
                    :src="color.image_url"
                    :alt="color.name"
                    class="w-full h-full object-cover"
                    @error="handleColorImageError(color)"
                  />
                </span>
                <span
                  v-else
                  class="w-6 h-6 rounded-full border border-white/30 shadow-sm flex-shrink-0"
                  :style="{ backgroundColor: color.hexcode || '#888888' }"
                ></span>

                <span class="text-sm font-medium text-gray-100">
                  {{ color.name }}
                </span>

                <span
                  v-if="isColorSelected(color.name)"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full 
                        flex items-center justify-center text-white text-xs"
                >
                  <i class="ri-check-line"></i>
                </span>
              </label>
            </div>

            <p class="text-sm text-gray-400 mt-2">
              <i class="ri-information-line mr-1"></i>
              You can choose more than one colour – each will be added as a separate item.
            </p>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <div class="rounded-xl bg-gray-700/30 p-4 border border-gray-600">
              <p class="product-description text-gray-200 leading-relaxed"
                 v-html="product.description || 'No description available.'"
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
                :max="maxQuantity"
                :disabled="!canAddToCart"
                name="quantity"
                @keyup="handleHighStockValue"
              />
              
              <!-- Available Stock -->
              <div v-if="selectedSize" class="text-sm text-gray-400">
                {{ selectedSize.stock_quantity || 0 }} available
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-4">
              <!-- Primary Action -->
              <div class="flex gap-4">
                <template v-if="product.has_variants && product.variants.length > 0">
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
                
                <template>
                  <button
                    type="button"
                    :disabled="!canAddToCart"
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
                    {{ addToCartText }}
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
                    <span class="text-white"><i class="ri-arrow-left-line"></i> Back</span>
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
        v-if="product.has_variants && product.variants.length > 0"
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
import fallbackImage from '~/assets/images/the-final-whistle-logo.png'; 

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
        price: 0,
        saleprice: 0,
        sale_price: 0,
        stock: 0,
        parent: null,
        categories: [],
        tags: [],
        variants: [],
        related: [],
        media: [],
        colors: [],
        /* eslint-disable camelcase */   
        has_variants: false,
        size_variants: [],
        available_sizes: [],
        is_on_sale: false,
        show_rrp: false,
        selectedColors: []
      },
      showOutOfStock: true,
      activeImageURL: fallbackImage,
      photos: [],
      quantity: 1,
      imageCarouselSettings: slickSettings,
      selectedSize: null,
      isLoading: false
    };
  },
  computed: {   
    hasSelectedColors() {
      return this.product.selectedColors && this.product.selectedColors.length > 0
    },
    hasSizeVariants() {
      return (this.product.availableSizes && this.product.availableSizes.length > 0) || 
             (this.product.hasSizeVariants && this.product.availableSizes.length > 0);
    },
    
    availableSizes() {
      if (this.product.availableSizes && this.product.availableSizes.length > 0) {
        return this.product.availableSizes.map(variant => ({
          id: variant.id,
          size: variant.value || variant.size,
          price: variant.price_override || variant.price || this.product.price || 0,
          stock_quantity: variant.stock_quantity || 0,
          in_stock: (variant.stock_quantity || 0) > 0,
          sku: variant.sku || ''
        }));
      } else if (this.product.availableSizes && this.product.availableSizes.length > 0) {
        return this.product.availableSizes.map(s => ({ ...s, in_stock: s.in_stock !== false }));
      }
      return [];
    },
    
    sizePriceRange() {
      if (!this.hasSizeVariants) return '';
      
      const prices = this.availableSizes
        .filter(size => size && size.in_stock)
        .map(size => Number(size.price) || 0);
      
      if (prices.length === 0) return 'No sizes in stock';
      
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (!isFinite(minPrice) || !isFinite(maxPrice)) return '';

      if (minPrice === maxPrice) {
        return `All sizes: ${this.formatCurrency(minPrice)}`;
      }
      return `Prices from ${this.formatCurrency(minPrice)} to ${this.formatCurrency(maxPrice)}`;
    },
    
    displayPrice() {
      const price = this.selectedSize ? this.selectedSize.price : this.product.price;
      return this.formatCurrency(price || 0);
    },
    
    displaySalePrice() {
      if (this.selectedSize) {
        const baseSale = this.product.saleprice || this.product.sale_price || this.product.price || 0;
        const sizePrice = this.selectedSize.price || 0;
        const basePrice = this.product.price || 0;
        if (sizePrice !== basePrice) {
          return this.formatCurrency(baseSale + (sizePrice - basePrice));
        }
        return this.formatCurrency(baseSale);
      }
      return this.formatCurrency(this.product.saleprice || this.product.sale_price || 0);
    },
    
    hasStock() {
      if (this.selectedSize) return this.selectedSize.in_stock;
      return (Number(this.product.stock) || 0) > 0;
    },
    
    stockStatus() {
      if (this.selectedSize) return `${this.selectedSize.stock_quantity || 0} in stock`;
      return `${this.product.stock || 0} in stock`;
    },
    
    maxQuantity() {
      if (this.selectedSize) return this.selectedSize.stock_quantity || 1;
      return Number(this.product.stock) || 1;
    },
    
    canAddToCart() {
      if (this.hasSizeVariants && !this.selectedSize) return false;
      return this.hasStock && this.quantity > 0;
    },
    
    addToCartText() {
      if (this.hasSizeVariants && !this.selectedSize) return 'Select Size';
      if (!this.hasStock) return 'Out of Stock';
      return 'Add to Cart';
    }
  },
  watch: {
    $route() {
      this.retrieveItem(this.$route.query.id);
      // SSR Guard for window object
      if (process.client) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  },
  mounted() {
    this.retrieveItem(this.$route.query.id);
  },
  methods: {
    handleColorSelection(color) {
      const isSelected = this.isColorSelected(this.getColorValue(color));
      
      if (isSelected && color.use_image) {
        const imageUrl = (color.preview && color.preview.type === 'image') 
          ? color.preview.value 
          : color.image_url;
          
        if (imageUrl) {
          this.activeImageURL = imageUrl;
        }
      } else if (!isSelected) {
        const media = this.product.media || [];
        if (media.length > 0) {
          this.activeImageURL = this.getMediaURL(media[0]);
        }
      }
    },

    getColorValue(color) {
      if (!color) return '';
      if (typeof color === 'object' && color !== null) {
        return color.id || color.name || color.value || color.slug || color;
      }
      return color;
    },

    handleColorImageError(color) {
      this.$set(color, 'image_url', null);
    },

    getColorName(color) {
      const val = this.getColorValue(color)
      const hexToName = {
        '#000000': 'Black',
        '#ffffff': 'White',
        '#002147': 'Navy',
        '#c8102e': 'Red',
      }
      return hexToName[val] || val
    },
    isColorSelected(colorName) {
      return this.product.selectedColors && this.product.selectedColors.includes(colorName);
    },
    viewVariantSlider() {
      if (!process.client || !this.$refs.variantSlider) return;
      const sliderCoordinates = this.getCoordinates(this.$refs.variantSlider)
      window.scrollTo({
        top: sliderCoordinates.top,
        left: sliderCoordinates.left,
        behavior: 'smooth',
      })
    },

    setActiveMedia(path) {
      if (!path) return;
      this.activeImageURL = this.getMediaURL ? this.getMediaURL(path) : path;
    },
    retrieveItem(itemId) {
      if (!itemId) return;
      this.isLoading = true;
      this.$axios
        .$get(`v1/items/${itemId}`)
        .then((response) => {
          const item = response && response.data ? response.data.item : response;
          if (!item) {
            this.isLoading = false;
            return;
          }

          // Merge with defaults to prevent undefined properties
          this.product = Object.assign({}, this.product, item, {
            categories: item.categories || [],
            tags: item.tags || [],
            variants: item.variants || [],
            related: item.related || [],
            media: item.media || [],
            colors: item.colors || [],
            selectedColors: []
          });

          const stock = Number(this.product.stock) || 0;
          if (stock === 0) this.quantity = 0;

          // Safe image handling
          const media = this.product.media || [];
          this.photos = media;
          if (media.length > 0) {
            this.activeImageURL = this.getMediaURL(media[0]);
          } else {
            this.activeImageURL = fallbackImage;
          }
          
          // Auto-select first available size
          if (this.hasSizeVariants) {
            const firstAvailableSize = this.availableSizes.find(size => size && size.in_stock);
            if (firstAvailableSize) {
              this.selectedSize = firstAvailableSize;
            }
          }

          this.$set(this.product, 'selectedColors', []);

          const variants = this.product.variants || this.product.related || [];
          this.colorVariantMap = {};
          variants.forEach(variant => {
            if (Array.isArray(variant.colors)) {
              variant.colors.forEach(c => {
                const key = c.toLowerCase();
                if (!this.colorVariantMap[key]) {
                  this.colorVariantMap[key] = variant.id;
                }
              });
            }
          });

          // Logic ni para e select niya tanan available color variant (Optional lang ni ug gusto ka mang bwesit ug PM)
          // if (this.product.availableColors && this.product.availableColors.length > 0) {
          //   const activeNames = this.product.availableColors
          //     .filter(c => c.is_active !== false)
          //     .map(c => c.name);
          //   this.$set(this.product, 'selectedColors', activeNames);
          // }

          this.isLoading = false;
        })
        .catch((err) => {
          console.error('Error fetching product:', err);
          this.isLoading = false;
        });
    },
    handleHighStockValue() {
      const maxQty = this.maxQuantity;
      if (this.quantity > maxQty) {
        this.quantity = maxQty;
      }
    },
    
    selectSize(size) {
      if (!size || !size.in_stock) return;
      this.selectedSize = size;
      this.quantity = 1;
    },
    
    addToCart() {
      if (this.hasSizeVariants && !this.selectedSize) {
        this.$oruga.notification.open({
          duration: 3000,
          message: 'Please select a size',
          position: 'bottom',
          variant: 'warning',
          queue: true,
        });
        return;
      }

      if (this.product.colors && this.product.colors.length > 0 && this.product.selectedColors.length === 0) {
        this.$oruga.notification.open({
          duration: 3000,
          message: 'Please select a colour',
          position: 'bottom',
          variant: 'warning',
          queue: true,
        });
        return;
      }

      // If multi-select colors are available, add one cart item per selected color
      if (this.product.selectedColors && this.product.selectedColors.length > 0) {
        this.product.selectedColors.forEach((colorName) => {
          
          const colorObj = this.product.availableColors.find(
            c => c.name === colorName
          );
          const image = colorObj ? colorObj.image_url : null;
          
          
          const cartItem = {
            id: this.product.id,
            quantity: parseInt(this.quantity),
            stock: this.maxQuantity,
            shippingOption: 0,
            color: colorName,
            image: image,
            use_image: colorObj.use_image
          };

          if (this.selectedSize) {
            cartItem.size_variant_id = this.selectedSize.id;
            cartItem.size = this.selectedSize.size;
            cartItem.variant_sku = this.selectedSize.sku;
          }

          this.$store.dispatch('cart/addItemToCart', cartItem).catch((error) => {
            this.$oruga.notification.open({
              duration: 5000,
              message: error.message || 'Item quantity in cart cannot exceed item stock',
              position: 'bottom',
              variant: 'danger',
              queue: true,
            });
          });
        });

        this.$oruga.notification.open({
          duration: 2000,
          message: `${this.product.selectedColors.length} item(s) added to cart`,
          position: 'bottom',
          variant: 'success',
          queue: true,
        });
        this.$router.push('/cart');
        return;
      }

      const cartItem = {
        id: this.product.id,
        quantity: parseInt(this.quantity),
        stock: this.maxQuantity,
        shippingOption: 0
      };

      if (this.selectedSize) {
        cartItem.size_variant_id = this.selectedSize.id;
        cartItem.size = this.selectedSize.size;
        cartItem.variant_sku = this.selectedSize.sku;
      }

      this.$store
        .dispatch('cart/addItemToCart', cartItem)
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
        .catch((error) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: error.message ||
            'Item quantity in cart cannot exceed item stock',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--large {
  height: 62px;
}
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