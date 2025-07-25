<template>
    <div class="block w-full overflow-x-auto">
      <table
      class="w-full table-auto border-collapse
      items-center border border-slate-500 bg-transparent"
      >
        <thead>
          <tr>
            <!-- Loop through columns and create table headers -->
            <th
             v-for="column in columns"
             :key="column.name"
             class="border-brand-grey-4/30 bg-brand-grey-4
             whitespace-normal border border-white
             px-4 py-2 text-center align-middle
             text-[11px] font-semibold uppercase text-white"
             data-aos="flip-up"
             data-aos-once="true"
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
          class="even:bg-brand-grey-4/5 hover:bg-brand-grey-4/5
          dark:border-brand-grey-4/50
          dark:hover:bg-brand-grey-4/30 bg-transparent"
          >
            <td
             v-for="column in columns"
             :key="column.name"
             class="whitespace-normal border text-center
             border-white p-2 px-4 align-middle text-[11px] text-white"
             data-aos="flip-up"
             data-aos-once="true"
             data-aos-offset="0px"
            >
                <slot :name="column.name" :data="row">
                  <template v-if="column.name == 'Team Name'">
                    {{ `${row['name']}` }}
                  </template>
                  <template v-else-if="column.name == 'Discount Amount'">
                    {{ row['discount_code'].amountapplied }}
                  </template>
                  <template v-else-if="column.name == 'Discount Code'">
                    {{ row['discount_code'].code }}
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
      type: [ Array, Object ],
      default: () => ({}),
    },
    data: {
      type: Array,
      required: true
    },
  },
}
</script>
