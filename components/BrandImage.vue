<template>
    <div class="w-full">
        <img
            :src="`/img/brands/${img}`"
            class="
                mx-auto
                w-72
                object-cover
                transition
                duration-200
                hover:scale-125
            "
            alt=""
        />
    </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    },
  }
}
</script>