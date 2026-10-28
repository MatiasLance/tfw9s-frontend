import { actions, getters, mutations, state as createState } from '@/store/cart'

function createCartStore() {
  const state = createState()
  const commit = (type, payload) => mutations[type](state, payload)
  const dispatch = (type, payload) => actions[type]({ state, commit }, payload)

  return { state, commit, dispatch }
}

describe('cart store line items', () => {
  test('appends every different product instead of overwriting', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: 1, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 2, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 3, quantity: 1, stock: 10 })

    expect(state.cart).toHaveLength(3)
    expect(state.cart.map((item) => item.id)).toEqual([1, 2, 3])
    expect(getters.cartCount(state)).toBe(3)
  })

  test('increments quantity when the same product and variant is added again', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: 1, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 2, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 1, quantity: 2, stock: 10 })

    expect(state.cart).toHaveLength(2)
    expect(state.cart[0]).toMatchObject({ id: 1, quantity: 3 })
    expect(state.cart[1]).toMatchObject({ id: 2, quantity: 1 })
  })

  test('keeps different colours of the same product on separate lines', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: 7, quantity: 1, stock: 10, color: 'Red' })
    await dispatch('addItemToCart', { id: 7, quantity: 1, stock: 10, color: 'Blue' })
    await dispatch('addItemToCart', { id: 7, quantity: 1, stock: 10 })

    expect(state.cart).toHaveLength(3)
    expect(state.cart.map((item) => item.color)).toEqual([
      'Red',
      'Blue',
      undefined,
    ])
  })

  test('does not collide when variant values contain a dash', async () => {
    const { state, dispatch } = createCartStore()

    // The old "-" joined key made these two combinations identical.
    await dispatch('addItemToCart', { id: 1, quantity: 1, stock: 10, color: '2-3' })
    await dispatch('addItemToCart', {
      id: 1,
      quantity: 1,
      stock: 10,
      size_variant_id: 2,
      color: '3',
    })

    expect(state.cart).toHaveLength(2)
  })

  test('treats string and numeric ids as the same cart line', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: '5', quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 5, quantity: 1, stock: 10 })

    expect(state.cart).toHaveLength(1)
    expect(state.cart[0]).toMatchObject({ id: 5, quantity: 2 })
  })

  test('rejects an add without a product id instead of merging every item', async () => {
    const { state, dispatch } = createCartStore()

    await expect(
      dispatch('addItemToCart', { quantity: 1, stock: 10 })
    ).rejects.toThrow('A product is required')

    expect(state.cart).toHaveLength(0)
  })

  test('allows an add when stock is not supplied', async () => {
    const { state, dispatch } = createCartStore()

    await expect(
      dispatch('addItemToCart', { id: 9, quantity: 1 })
    ).resolves.toBeUndefined()

    expect(state.cart).toHaveLength(1)
  })

  test('allows an add when stock is empty or null', async () => {
    const { state, dispatch } = createCartStore()

    await expect(
      dispatch('addItemToCart', { id: 10, quantity: 1, stock: null })
    ).resolves.toBeUndefined()
    await expect(
      dispatch('addItemToCart', { id: 11, quantity: 1, stock: '' })
    ).resolves.toBeUndefined()

    expect(state.cart).toHaveLength(2)
  })

  test('still rejects an add that exceeds a numeric stock limit', async () => {
    const { state, dispatch } = createCartStore()

    await expect(
      dispatch('addItemToCart', { id: 12, quantity: 5, stock: 3 })
    ).rejects.toThrow('cannot exceed item stock')

    expect(state.cart).toHaveLength(0)
  })

  test('removing one line keeps the remaining products', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: 1, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 2, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 3, quantity: 1, stock: 10 })

    await dispatch('removeItemFromCart', { id: 2 })

    expect(state.cart.map((item) => item.id)).toEqual([1, 3])
    expect(getters.cartCount(state)).toBe(2)
  })

  test('quantity updates only touch the matching line', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: 1, quantity: 1, stock: 10 })
    await dispatch('addItemToCart', { id: 2, quantity: 1, stock: 10 })

    await dispatch('updateCartItemQuantity', { id: 2, quantity: 4 })

    expect(state.cart[0]).toMatchObject({ id: 1, quantity: 1 })
    expect(state.cart[1]).toMatchObject({ id: 2, quantity: 4 })
  })

  test('getProductCartItems returns every line for a product', async () => {
    const { state, dispatch } = createCartStore()

    await dispatch('addItemToCart', { id: 4, quantity: 1, stock: 10, color: 'Red' })
    await dispatch('addItemToCart', { id: 4, quantity: 1, stock: 10, color: 'Blue' })
    await dispatch('addItemToCart', { id: 5, quantity: 1, stock: 10 })

    expect(getters.getProductCartItems(state)(4)).toHaveLength(2)
    expect(getters.getProductCartItems(state)('4')).toHaveLength(2)
  })
})
