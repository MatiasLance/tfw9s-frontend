<template>
    <div class="block w-full overflow-x-auto">
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
             whitespace-normal
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
             class="whitespace-normal border-slate-500
             text-center align-middle
             text-[16px] text-black"
             :class="column.name === 'action'?
             'bg-transparent':'bg-white  border p-2 px-4 '"
            >
                <slot :name="column.name" :data="row">
                  <template v-if="column.name === 'time'">
                    <input
                    v-model="row['time']" type="time"
                    :disabled="true"
                    />
                  </template>
                  <template v-if="column.name === 'action'">
                    <VBtn
                    class="from-40% via-95% to-100%
                    ml-2
                    rounded-lg
                    bg-gradient-to-tr
                    from-[#5EE738]
                    via-[#3e872a]
                    to-[#050505]
                    py-2
                    px-4
                    text-xs
                    font-medium
                    text-white"
                    dark
                    >
                    Submit
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
}
</script>

<style scoped>
.v-btn {
  text-transform:none !important;
}
</style>
