<template>
    <div class="block w-full overflow-x-auto table-container">
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
              {{ column.name !=  'id' ? column.label:'' }}
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
            >
                <slot :name="column.name" :data="row">
                  <template v-if="column.name === 'time'">
                    <input
                    v-model="row['time']" type="time"
                    :disabled="true"
                    />
                  </template>
                  <template v-if="column.name === 'action'">
                    <i
                      title="View Transaction"
                      class="ri-eye-fill text-3xl text-blue-400"
                      @click="View(row)"
                    />
                    <i
                      v-if="!row.action"
                      title="Refund Transaction"
                      class="ri-refund-fill text-3xl text-green-400"
                      @click="Manage(row)"
                    />
                    <i
                      title="Delete Registration"
                      v-if="!row.action"
                      class="ri-delete-bin-fill text-3xl text-red-400"
                      @click="Delete(row)"
                    />
                    <i
                      title="Refund Details"
                      v-if="row.action"
                      class="ri-information-fill text-3xl text-blue-300"
                      @click="Manage(row)"
                    />
                  </template>
                  <template v-else-if="column.name === 'id'">
                    {{ '' }}
                  </template>
                  <template v-else-if="column.name === 'amount'">
                    {{ formatCurrencyFromCent(row.amount) }}
                  </template>
                  <template v-else-if="column.name === 'refund'">
                    {{ formatCurrencyFromCent(row.refund) }}
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
import currencyMixin from '~/mixins/currency/handlesCurrency'

export default {
  mixins: [ currencyMixin ],
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
  mounted() {
    this.$nextTick(() => {
      this.initDragScroll();
    });
  },
  methods: {
    View(row) {
      this.$emit('view', {
    itemdata: row,
    player_firstname: row.playername?.split(' ')[0] || '',
    player_lastname: row.playername?.split(' ')[1] || '',
  });
},

    Manage(data) {
      this.$emit('transaction-data', data);
    },
    Delete(data) {
      this.$emit('delete-data', data)
    },
    initDragScroll() {
      const container = document.querySelector('.table-container')
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) {
          return;
        }
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1;
        container.scrollLeft = scrollLeft - walk;
      });
    },
  }
}
</script>

<style scoped>
.v-btn {
  text-transform:none !important;
}
.table-container {
  width: 100%;
  overflow-x: auto;
  cursor: grab;
	user-select: none;
}
table {
  width: 100%;
  min-width: 600px;
}
.table-container:active {
  cursor: grabbing;
}
</style>