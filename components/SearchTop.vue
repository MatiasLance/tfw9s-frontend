<template>
  <section>
    <div class="grid grid-cols-1 gap-4">
      <div
        class="col-span-1"
      >
        <div class="flex justify-center">
          <div class="xl:w-96">
            <form @submit.prevent="emitUpdate(this)">
              <SearchBar v-model="query" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _debounce from 'lodash/debounce'
import SearchBar from '~/components/SearchBar'

export default {
  name: 'SearchTop',
  components: { SearchBar },
  data() {
    return {
      sortOptions: [
        {
          name: 'Sort by latest',
          value: 'latest',
        },
        {
          name: 'Sort by price: low to high',
          value: 'low_to_high',
        },
        {
          name: 'Sort by price: high to low',
          value: 'high_to_low',
        },
      ],
      showComponent: false
    };
  },
  computed: {
    sortBy: {
      get() {
        return this.$store.state.shop.sortBy;
      },
      set(value) {
        this.$store.commit('shop/setSortBy', value);
      },
    },
    query: {
      get() {
        return this.$store.state.shop.q;
      },
      set(value) {
        this.$store.commit('shop/setQuery', value);
      },
    },
  },
  methods: {
    emitUpdate: _debounce(function() {
      this.$emit('change')
    }, 1000)
  },
};
</script>