<template>
  <OModal :active="active" @close="closeModal">
    <LiveCounter :series-id="seriesId" />
  </OModal>
</template>

<script>
import LiveCounter from '../registration/LiveCounter.vue';

export default {
  name: 'CheckRegistrationStatusModal',

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    seriesId: {
      type: Number,
      default: 0
    }
  },

  components: { LiveCounter },

  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>