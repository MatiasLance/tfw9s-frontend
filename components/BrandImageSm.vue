<template>
    <div
class="mx-4 flex w-full flex-col rounded-md
px-9 py-3"
>
        <img
            :src="`/img/brands/${img}`"
            class="
                mx-auto h-52 w-full
                cursor-pointer object-contain
                transition
                duration-200
                hover:scale-125
                sm:h-36
                sm:w-36
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