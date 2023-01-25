<template>
  <section>
    <select
      v-model="sortBy"
      class="
        mt-1
        block
        w-full
        appearance-none
        rounded-md
        border border-gray-200
        bg-gray-100
        text-base
        font-normal outline-inherit
        hover:border-gray-400
        focus:border-gray-400
        focus:bg-gray-100
        focus:outline-none
        focus:ring-0
      "
      @change="emitUpdate(this)"
    >
      <option
        v-for="option in sortOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    <div v-if="showComponent" class="grid grid-cols-1 lg:grid-cols-3">
      <div class="col-span-1 lg:col-span-3">
        <div>
        </div>
      </div>
      <div v-if="showComponent" class="col-span-3 lg:col-span-3">
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
    </div>
  </section>
</template>

<script>
import _debounce from 'lodash/debounce'
import SearchBar from '~/components/SearchBar'

export default {
  name: 'SortSearchTop',
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