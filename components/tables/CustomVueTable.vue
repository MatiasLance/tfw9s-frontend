<template>
  <div class="overflow-x-auto bg-gray-800 border border-green-500/20 rounded-2xl">
    <table class="table-auto w-full border-collapse bg-transparent">
      <!-- Header -->
      <thead>
        <tr class="bg-gray-900 border-b border-green-500/30">
          <th
            v-for="column in columns"
            :key="column.name"
            class="whitespace-nowrap px-4 py-4 text-center align-middle text-sm font-semibold text-green-400 uppercase tracking-wide"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="divide-y divide-gray-700/50">
        <tr
          v-for="(row, index) in data"
          :key="row.id"
          class="transition-colors duration-300 hover:bg-gray-700/30"
          :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'"
        >
          <td
            v-for="column in columns"
            :key="column.name"
            class="whitespace-nowrap px-4 py-3 text-center align-middle text-sm"
            :class="[
              column.name === 'action'
                ? 'bg-transparent'
                : '',
              column.name !== 'action' && !row.submit
                ? 'cursor-pointer'
                : '',
            ]"
            @click="column.name !== 'action' && !row.submit ? manageResult(row) : null"
          >
            <slot :name="column.name" :data="row">
              <!-- Time (disabled input) -->
              <template v-if="column.name === 'time'">
                <input
                  v-model="row['time']"
                  type="text"
                  disabled
                  class="w-full bg-transparent border-none outline-none p-0 text-gray-300 text-center placeholder-gray-500"
                />
              </template>

              <!-- Team 1 (Bye fallback) -->
              <template v-else-if="column.name === 'team1'">
                <span class="text-gray-300">
                  {{ row.team1 ? row.team1.name : 'Bye' }}
                </span>
              </template>

              <!-- Team 2 (Bye fallback) -->
              <template v-else-if="column.name === 'team2'">
                <span class="text-gray-300">
                  {{ row.team2 ? row.team2.name : 'Bye' }}
                </span>
              </template>

              <!-- Action buttons (Submit / Edit / Revert) -->
              <template v-else-if="column.name === 'action'">
                <div class="flex items-center justify-center gap-2">
                  <VBtn
                    class="rounded-lg bg-gradient-to-tr py-2 px-4 text-xs font-medium text-white transition-all hover:scale-105 active:scale-95"
                    :class="row.submit
                      ? 'from-blue-400 via-blue-600 to-blue-400'
                      : 'from-green-400 via-green-600 to-green-800'"
                    @click="row.submit ? manageResult(row) : submit(row)"
                  >
                    <VIcon left size="14" class="mr-1" color="white">
                        {{ row.submit ? 'ri-edit-line' : 'ri-send-plane-fill' }}
                    </VIcon>
                    <span class="text-white">
                      {{ row.submit ? 'Edit' : 'Submit' }}
                    </span>
                  </VBtn>

                  <VBtn
                    v-if="row.submit"
                    class="rounded-lg bg-gradient-to-tr from-orange-400 via-orange-600 to-orange-400 py-2 px-4 text-xs font-medium text-white transition-all hover:scale-105 active:scale-95"
                    @click="row.submit ? revertResult(row) : submit(row)"
                  >
                    <VIcon left size="16" class="mr-1" color="white">
                        {{ row.submit ? 'ri-refresh-line' : 'ri-check-line' }}
                    </VIcon>
                    <span class="text-white">
                      {{ row.submit ? 'Revert' : 'Submit' }}
                    </span>
                  </VBtn>
                </div>
              </template>

              <!-- Default fallback -->
              <template v-else>
                <span class="text-gray-300">
                  {{ row[column.name] }}
                </span>
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
      required: true,
    },
    data: {
      type: Array,
      required: true,
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
      this.$emit('submit-data', data);
    },
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
</style>