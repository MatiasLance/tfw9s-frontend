<template>
    <div class="overflow-x-auto">
      <table
      class="table-auto w-full border-collapse bg-transparent"
      >
        <thead>
          <tr>
            <!-- Loop through columns and create table headers -->
            <th
             v-for="column in columns"
             :key="column.name"
             class="bg-brand-grey-4
             whitespace-nowrap
             px-4 py-2 text-center align-middle
             text-[16px] font-semibold text-[#555555]"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through data and create table rows -->
          <tr
          v-for="row in data"
          :key="row.id"
          >
            <td
             v-for="column in columns"
             :key="column.name"
             class="whitespace-nowrap border-slate-500
             text-center align-middle
             text-[14px] text-black"
             :class="column.name === 'action'?
             'bg-transparent':'bg-white  border p-2 px-4'"
             @click="column.name !== 'action'&&!row.submit?
             manageResult(row):null"
            >
                <slot :name="column.name" :data="row">
                  <template v-if="column.name === 'time'">
                    <input
                    v-model="row['time']" type="text"
                    :disabled="true"
                    />
                  </template>
                  <template v-if="column.name === 'action'">
                    <!-- Edit Button -->
                    <VBtn
                      class="ml-2 rounded-lg bg-gradient-to-tr py-2
                      px-4 text-xs font-medium text-white transition-all
                      hover:scale-105 active:scale-95"
                      :class="row.submit 
                        ? 'from-blue-400 via-blue-600 to-blue-400' 
                        : 'from-green-400 via-green-600 to-black'"
                      @click="row.submit ? manageResult(row) : submit(row)"
                    >
                      <VIcon left size="14" class="mr-1">
                        {{ row.submit ? 'ri-edit-line' : 'ri-send-plane-fill' }}
                      </VIcon>
                      
                      <span>{{ row.submit ? 'Edit' : 'Submit' }}</span>
                    </VBtn>
                  <!-- Revert Button -->
                   <VBtn
                   v-if="row.submit"
                      class="ml-2 rounded-lg bg-gradient-to-tr py-2
                      px-4 text-xs font-medium text-white transition-all"
                      :class="row.submit 
                        ? 'from-orange-400 via-orange-600 to-orange-400' 
                        : 'from-green-400 via-green-600 to-black'"
                      @click="row.submit ? revertResult(row) : submit(row)"
                    >
                      <VIcon left size="16" class="mr-1">
                        {{ row.submit ? 'ri-refresh-line' : 'ri-check-line' }}
                      </VIcon>
                      
                      {{ row.submit ? 'Revert' : 'Submit' }}
                    </VBtn>
                  </template>
                  <template v-else-if="column.name === 'team1'">
                      {{ row.team1 ? row.team1.name: 'Bye' }}
                  </template>
                  <template v-else-if="column.name === 'team2'">
                      {{ row.team2 ? row.team2.name: 'Bye' }}
                  </template>
                  <template v-else-if="column.name !== 'time'">
                    {{ row[column.name] }}
                  </template>
                </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
 </template>

<script>

export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
  },
  methods: {
    manageResult(data) {
      this.$emit('match-data', data);
    },
    revertResult(data) {
      this.$emit('revert-data', data);
    },
    submit(data) {
      this.$emit('submit-data', data)
    },
  }
}
</script>

<style scoped>
.v-btn {
  text-transform:none !important;
}
</style>
