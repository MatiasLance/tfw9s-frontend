<template>
  <div
    class="
      flex w-full items-center
      rounded-t-lg
      border border-gray-200
    "
  >
    <div class="w-1/2">
      <StepperItem :active="step === 1">
        1. {{ stepname }}
      </StepperItem>
    </div>
    <div class="w-1/2">
      <StepperItem :active="step === 2">
        2. Pay
      </StepperItem>
    </div>
  </div>
</template>

<script>
import StepperItem from '~/components/Stepper/StepperItem';

export default {
  components: { StepperItem },
  props: {
    step: {
      type: Number,
      required: true
    },
    stepname: {
      type: String,
      default: 'Shipping Information'
    }
  },
}
</script>
