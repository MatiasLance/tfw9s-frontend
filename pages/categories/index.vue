<template>
  <div>
    <section class="container mx-auto my-4 max-w-screen-lg px-4">
      <InfiniteCategories :options="categories" />
    </section>
  </div>
</template>

<script>
import InfiniteCategories from '../../components/InfiniteCategories.vue';
import categoryMixin from '@/mixins/categories/categoryMixin'

export default {
  components: { InfiniteCategories },
  mixins: [ categoryMixin ],
  data() {
    return {
      selectedList: [],
      flag: false
    }
  },
};
</script>