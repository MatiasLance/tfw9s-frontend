<template>
    <div>
        <section
            class="relative min-h-[97vh] w-full
            bg-[url('~/assets/images/login_2.jpeg')]
            bg-cover py-10"
        >
        <div class="container mx-auto max-w-screen-md px-4">
            <div
            class="mx-auto mt-10 mb-20 rounded
            bg-white p-4 shadow-lg
            md:p-7"
        >
            <form action="">
                <h2 class="mb-5 text-4xl font-bold">
                    Add Product
                </h2>

                <div class="grid gap-x-2 md:grid-cols-1">

                <div class="mb-4">
                    <label class="mb-1 block"> Product Name: </label>
                        <input
                            v-model="
                                product.name"
                            class="
                            w-full appearance-none
                            border border-gray-100
                            bg-gray-200
                            py-2
                                px-3
                        hover:border-gray-400
                                focus:border-gray-400
                                focus:outline-none
                            "
                        />
                </div>
                <div class="mb-4">
                    <label
                        class="mb-1 block"
                    >Price:</label>
                    <input
                        v-model="product.price"
                        class="
                            w-24
                            appearance-none border
                            border-gray-100
                            bg-gray-200
                                py-2
                                 px-3
                        hover:border-gray-400
                                focus:border-gray-400
                                focus:outline-none
                            "
                    />
                </div>
                <div class="mb-4">
                   <label
                        class="mb-1 block"
                    >Description:</label>
                        <textarea
                        v-model="product.description"
                        class="
                        mt-1
                        block
                        w-full
                        border-transparent
                        bg-gray-100
                        focus:border-gray-500 focus:ring-0
                        "
                        ></textarea>
                </div>
                <div class="mb-4">
                    <label
                        class="mb-1 block"
                    > Category: </label>
                    <select
                    v-model="product.category"
                    class="block w-full appearance-none border
                    border-gray-200 bg-gray-100 py-2
                    px-3
                    hover:border-gray-400
                    focus:border-gray-400 focus:outline-none"
                    >
                        <option value="BMW">
                        BMW
                        </option>
                        <option value="Sedan">
                        Sedan
                        </option>
                        <option value="BBC">
                        BBC
                        </option>
                        <option value="Car Parts">
                        Car Parts
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="mb-1 block">
                        In Stock:
                    </label>
                    <input
                    v-model="product.inStock"
                    type="number"
                    class="
                    form-input mt-1 block
                    w-24
                    appearance-none border
                    border-gray-100
                    bg-gray-200
                    py-2
                    px-3
                  hover:border-gray-400
                  focus:border-gray-400
                    focus:outline-none
                    "
                    />
                </div>

                <NuxtLink to="/admin/parts-list">
                    <button
                    type="submit"
                    class="my-2 inline-block w-full border border-transparent
                    bg-swd-blue py-3 px-5
                    text-center font-bold
                    text-white hover:bg-swd-dblue"
                    >
                     Add Product
                    </button>
                </NuxtLink>
                </div>
            </form>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
export default {
  name: 'add-product',
  data() {
    return {
      product: {
        name: '',
        price: '',
        description: '',
        category: '',
        subcategory: '',
        inStock: ''
      }
    }
  },
  methods: {
    productList() {
      this.$router.push('parts-list/');
    }
  }
}
</script>