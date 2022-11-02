<template>
    <!--  COMPONENT: SIDEBAR -->
		<div class="rounded border border-gray-200 bg-white px-6 py-4 shadow-sm">
			<h3 class="mb-2 font-semibold">
				Filter by
			</h3>
      <div class="h-96 w-full overflow-scroll">
        <ul>
          <TreeItem
              class="item"
              :model="treeData"
           ></TreeItem>
        </ul>
      </div>
		</div>
		<!--  COMPONENT: SIDEBAR //END -->
</template>

<script>
import TreeItem from './TreeItem.vue'

const treeData = {
  name: 'My Categories',
  children: [
    {
      name: 'BMW',
      children: []
    },
    {
      name: 'Mercedes',
      children: []
    },
    {
      name: 'Alpha Romeo',
      children: [
        {
          name: 'Sedan',
          children: [
            { name: 'Parts', children: [] }, { name: 'Engine', children: [] }, { name: 'Interior', children: [] }
          ]
        },
        {
          name: 'Hatch',
          children: [
            { name: 'Parts', children: [] }, { name: 'Engine', children: [] }, { name: 'Interior', children: [] }
          ]
        },
        {
          name: 'Coupe',
          children: [
            { name: 'Parts', children: [] }, { name: 'Engine', children: [] }, { name: 'Interior', children: [] }
          ]
        },
        {
          name: 'Model A',
          children: [
            { name: 'Parts', children: [] }, { name: 'Engine', children: [] }, { name: 'Interior', children: [] }
          ]
        }
      ]
    },
    {
      name: 'Polishing',
      children: []
    },
    {
      name: 'Detailing',
      children: []
    },
    {
      name: 'Tools',
      children: []
    },
    {
      name: 'Uncategorised',
      children: []
    }
  ]
}

export default {
  name: 'AdminCategoryFolders',
  components: { TreeItem },
  data() {
    return { treeData };
  }
}
</script>