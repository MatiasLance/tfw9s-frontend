<template>
    <div class="
    block
    w-full
    overflow-x-auto"
    >
      <table
      class="w-full table-auto border-collapse
      items-center bg-transparent"
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
             text-[20px] font-semibold text-[#555555]"
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
             text-[16px] text-black"
             :class="column.name === 'action'?
             'bg-transparent':'bg-white  border p-2 px-4'"
             @click="column.name !== 'action'&&!row.submit?
             ManageResult(row):null"
            >
                <slot :name="column.name" :data="row">
                  <template v-if="column.name === 'time'">
                    <input
                    v-model="row['time']" type="text"
                    :disabled="true"
                    />
                  </template>
                  <template v-if="column.name === 'action'">
                    <VBtn
                    class="
                    ml-2
                    rounded-lg
                    bg-gradient-to-tr
                    py-2
                    px-4
                    text-xs
                    font-medium
                    text-white"
                    :class="!row.submit?
                   'from-[#5EE738] via-[#3e872a] to-[#050505]':
                   'from-[#f37570] via-[#fb0d2b] to-[#050505]'"
                    @click="row.submit?ManageResult(row):Submit(row)"
                    dark
                    >
                    {{!row.submit?'Submit':'Edit'}}
                  </VBtn>
                  </template>
                  <template v-else-if="column.name === 'team1'">
                      {{ row.team1.name }}
                  </template>
                  <template v-else-if="column.name === 'team2'">
                      {{ row.team2.name }}
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
    ManageResult(data) {
      this.$emit('match-data', data);
    },
    Submit(data) {
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
