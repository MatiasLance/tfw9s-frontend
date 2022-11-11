<template>
<Transition name="modal">
    <div v-if="show" class="modal-mask overflow-y-scroll">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
                default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                default body
            </slot>
          </div>

          <div class="modal-footer my-4 px-7">
            <slot name="footer">
              <div class="block lg:flex lg:flex-auto lg:justify-end">
                <button
                  type="button"
                  class="my-2 inline-block w-full border
                  border-transparent bg-brand-black py-3
                  px-5 text-center
                  font-bold text-white hover:bg-brand-grey lg:mx-4 lg:w-48"
                  @click="$emit('close')"
                >OK</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default { props: { show: Boolean } }
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  overflow-x: hidden;
  overflow-y: scroll;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 890px;
  max-height: 780px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: scroll;
}

@media (max-width: 640px) {
  .modal-container {
     width: 100%;
     height: 100%;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #1a1d18;
  font-weight: 700;
}

.modal-body {
  margin: 20px 15px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>