<template>
  <div class="flex justify-center">
    <nav>
      <ul class="list-style-none page-numbers flex flex-wrap justify-end">
        <li class="page-item text-sm">
          <BasePaginationButton @click="setPage('prev')">
            <i class="ri-arrow-left-s-line"></i>
          </BasePaginationButton>
        </li>
        <li
          v-for="page in pages"
          :key="page"
          class="page-item text-sm"
        >
          <BasePaginationButton
            :active="page == activePage"
            @click="setPage(page)"
          >
            {{ page }}
          </BasePaginationButton>
        </li>
        <li class="page-item text-sm">
          <BasePaginationButton @click="setPage('next')">
            <i class="ri-arrow-right-s-line"></i>
          </BasePaginationButton>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import BasePaginationButton from '~/components/base/BasePaginationButton'
export default {
  components: { BasePaginationButton },
  props: {
    activePage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true
    },
    pagesEachSide: {
      type: Number,
      default: 2,
    },
    pageStart: {
      type: Number,
      default: 1
    },
  },
  data() {
    return { unevenBuffer: 0 }
  },
  computed: {
    pages: {
      get() {
        this.resetBuffer()
        let leftPages = this.generateLeftPages()
        const rightPages = this.generateRightPages()
        if (this.unevenBuffer > 0) {
          leftPages = this.generateLeftPages()
        }

        return [
          ...leftPages,
          this.activePage,
          ...rightPages
        ]
      },
    },
  },
  methods: {
    setPage(page) {
      let newPage = this.activePage;
      if (page === 'next') {
        if (newPage < this.totalPages) {
          newPage += 1
        }
      } else if (page === 'prev') {
        if (newPage > 1) {
          newPage -= 1
        }
      } else {
        newPage = page
      }
      this.$emit('change', newPage)
    },
    resetBuffer() {
      this.unevenBuffer = 0
    },
    generateLeftPages() {
      const pages = []
      let start = this.activePage - (this.pagesEachSide + this.unevenBuffer)
      if (start < this.pageStart) {
        this.unevenBuffer = this.pageStart - start
        start = this.pageStart
      }
      for (let i = start; i < this.activePage; i++) {
        pages.push(i)
      }

      return pages
    },
    generateRightPages() {
      const pages = []
      let end = this.activePage + (this.pagesEachSide + this.unevenBuffer)
      if (end > this.totalPages) {
        this.unevenBuffer = end - this.totalPages
        end = this.totalPages
      }
      for (let i = this.activePage + 1; i <= end; i++) {
        pages.push(i)
      }

      return pages
    }
  },
};
</script>