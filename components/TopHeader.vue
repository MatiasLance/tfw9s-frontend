<template>
    <div
        class="flex
        w-full items-center bg-brand-yellow
        "
    >
        <div class="container">
            <div class="relative max-w-full">
                <div
                class="flex w-full flex-col justify-between
                justify-items-stretch md:flex-row"
                >
                    <div class="flex justify-start self-center">
                        <span
                        class="
                        text-[16px]
                        font-bold tracking-wider
                        text-white
                        md:text-sm"
                    >
                        Free shipping
                    </span>
                    </div>
            <div class="flex items-center justify-center gap-0.5">
                <a :href="socials.fb" target="_blank">
                    <button
                        type="button"
                        class="
                        flex
                        h-[52px]
                        w-[52px]
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        bg-inherit
                        py-4
                        font-light
                        text-[#fff] transition
                        duration-300 hover:bg-[#fff]
                        hover:text-brand-blue
                        hover:shadow-md hover:shadow-[#0c66ee]/50
                        "
                    >
                        <i class="ri-facebook-fill text-2xl md:text-sm"></i>
                    </button>
                    </a>
                    <a :href="socials.ig" target="_blank">
                    <button
                        type="button"
                        class="
                        custom-insta-button
                        flex
                        h-[52px]
                        w-[52px]
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        bg-inherit
                        py-4
                        font-light
                        text-[#fff]
                        transition duration-300
                        hover:text-white
                        hover:shadow-md
                        "
                    >
                        <i class="ri-instagram-line text-2xl md:text-sm"></i>
                    </button>
                    </a>
                    <a :href="socials.tiktok" target="_blank">
                    <button
                        type="button"
                        class="
                        flex
                        h-[52px]
                        w-[52px]
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        bg-inherit
                        py-4
                        font-light
                        text-[#fff] transition
                        duration-300 hover:bg-gradient-to-b hover:from-[#00f2ea]
                        hover:via-[#010101] hover:to-[#ee1d52]
                        hover:text-white
                        hover:shadow-md hover:shadow-[#0c66ee]/50
                        "
                    >
                        <i class="ri-music-fill text-2xl md:text-sm"></i>
                    </button>
                    </a>
            </div>
                <div class="flex justify-end self-center">
                    <span
                    class="block
                    text-center
                    text-[16px] font-light text-white
                    md:text-sm"
                    >{{address}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'TopHeader',
  data() {
    return {
      address: '280 Brisbane Road\nLabrador, Queensland 4215 Australia',
      mobile: '0451 620 707',
      socials: {
        fb: 'https://www.facebook.com/',
        ig: 'https://www.instagram.com/',
        tiktok: '',
        youtube: ''
      }
    }
  },
};
</script>

<style>
.custom-insta-button:hover{
  background:
  radial-gradient(circle farthest-corner at 35% 90%,
  #fec564, transparent 50%),
  radial-gradient(circle farthest-corner at 0 140%,
  #fec564, transparent 50%),
  radial-gradient(ellipse farthest-corner at 0 -25%,
  #5258cf, transparent 50%),
  radial-gradient(ellipse farthest-corner at 20% -50%,
  #5258cf, transparent 50%),
  radial-gradient(ellipse farthest-corner at 100% 0,
  #893dc2, transparent 50%),
  radial-gradient(ellipse farthest-corner at 60% -20%,
  #893dc2, transparent 50%),
  radial-gradient(ellipse farthest-corner at 100% 100%,
  #d9317a, transparent),
  linear-gradient(#6559ca, #bc318f 30%,
  #e33f5f 50%, #f77638 70%, #fec66d 100%);
}
</style>