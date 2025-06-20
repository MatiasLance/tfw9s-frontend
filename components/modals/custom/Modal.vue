<template>
  <Transition name="modal-fade">
    <div
      v-if="active"
      class="modal-overlay relative z-50"
      @click.self="handleOverlayClick"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    >
      <div
      class="modal-content border"
      :class="parent"
      @click.stop
      >

        <div :class="custom">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    custom: {
      type: String,
      default: '',
    },
    parent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isDragging: false,
      mouseDown: false,
    };
  },
  methods: {
    handleMouseDown() {
      this.mouseDown = true;
      this.isDragging = false;
    },
    handleMouseMove() {
      if (this.mouseDown) {
        this.isDragging = true;
      }
    },
    handleMouseUp() {
      this.mouseDown = false;
    },
    handleOverlayClick() {
      if (!this.isDragging) {
        this.$emit('close');
      }
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  border-radius: 4px;
  max-width: 1500px;
  max-height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  box-sizing: border-box; 
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter, 
.modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
