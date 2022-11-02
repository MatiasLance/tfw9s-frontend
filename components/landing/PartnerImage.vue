<template>
    <div>
        <img
            :src="require(`~/assets/images/partner/${img}`)"
            class="
                h-80
                w-full
                cursor-pointer
                object-cover
                transition
                lg:w-72
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