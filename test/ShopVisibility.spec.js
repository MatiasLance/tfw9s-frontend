jest.mock('remixicon/fonts/remixicon.css', () => ({}))

import ProductSection from '@/components/ProductSection.vue'

const deferred = () => {
  let resolve
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}

describe('shop visibility and refresh stability', () => {
  test('ignores an older product response that finishes last', async () => {
    const firstResponse = deferred()
    const secondResponse = deferred()
    const $get = jest.fn()
      .mockReturnValueOnce(firstResponse.promise)
      .mockReturnValueOnce(secondResponse.promise)

    const vm = {
      productsRequestId: 0,
      isProductsLoading: false,
      isDestroyed: false,
      products: [],
      query: '',
      page: 1,
      $route: { query: {} },
      $store: {
        state: {
          shop: { q: '', sortBy: 'a_to_z', page: 1, selectedCategory: null },
        },
      },
      $axios: { $get },
      $nextTick: jest.fn(),
    }

    const firstRequest = ProductSection.methods.retrieveProducts.call(vm)
    const secondRequest = ProductSection.methods.retrieveProducts.call(vm)

    secondResponse.resolve({
      data: { items: [{ id: 2 }], total_items: 1, last_page: 1, from: 1, to: 1 },
    })
    await secondRequest

    firstResponse.resolve({
      data: { items: [{ id: 1 }], total_items: 1, last_page: 1, from: 1, to: 1 },
    })
    await firstRequest

    expect(vm.products).toEqual([{ id: 2 }])
  })

  test('item-change events refresh the current shop query', () => {
    const retrieveProducts = jest.fn()

    ProductSection.methods.handleItemListChanged.call({ retrieveProducts })

    expect(retrieveProducts).toHaveBeenCalledTimes(1)
  })
})
