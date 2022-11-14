<template>
    <div
class="mx-4 flex w-full flex-col rounded-md
px-9 py-3"
>
        <img
            :src="`/img/brands/${img}`"
            class="
                mx-auto
                w-28
                cursor-pointer
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