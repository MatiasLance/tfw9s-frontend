<template>
<div>
    <div
      v-for="item in items"
      :key="item.id"
    >
      <span>{{ item.name }}</span>
      <CategoryTree class="ml-4" :items="item.children" />
    </div>
  </div>
</template>

<script>
import CategoryTree from '~/components/AdminCategoryTree/CategoryTree'

export default {
  name: 'CategoryTree',
  components: { CategoryTree },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>