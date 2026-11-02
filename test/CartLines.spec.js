import {
  buildCartLineSnapshot,
  cartLineKey,
  mergeCartLine,
} from '@/utils/cartLines'

describe('cart line rendering helpers', () => {
  test('gives variant and non-variant lines of the same product different keys', () => {
    const plain = { id: 63, quantity: 1 }
    const withSize = { id: 63, quantity: 1, size_variant_id: 12, size: 'S' }
    const withSizeAndColor = {
      id: 63,
      quantity: 1,
      size_variant_id: 12,
      size: 'S',
      color: 'Red',
    }

    expect(cartLineKey(plain)).not.toBe(cartLineKey(withSize))
    expect(cartLineKey(withSize)).not.toBe(cartLineKey(withSizeAndColor))
    expect(cartLineKey(plain)).not.toBe(cartLineKey(withSizeAndColor))
  })

  test('normalises string and numeric ids so both forms share one line', () => {
    expect(cartLineKey({ id: '29', quantity: 1 })).toBe(
      cartLineKey({ id: 29, quantity: 1 })
    )
  })

  test('does not collide when variant values contain a dash', () => {
    const colourOnly = { id: 1, color: '2-3' }
    const variantAndColour = { id: 1, size_variant_id: 2, color: '3' }

    expect(cartLineKey(colourOnly)).not.toBe(cartLineKey(variantAndColour))
  })

  test('builds a renderable snapshot from Vuex data alone', () => {
    const snapshot = buildCartLineSnapshot({
      id: 29,
      quantity: 2,
      size_variant_id: 7,
      size: 'XXL',
      color: 'Navy',
      image: 'https://example.test/navy.png',
      use_image: true,
      name: 'Home Jersey',
      price: 89.95,
    })

    expect(snapshot).toMatchObject({
      id: 29,
      name: 'Home Jersey',
      price: 89.95,
      size: 'XXL',
      _cartItemId: 29,
      _sizeVariantId: 7,
      _quantity: 2,
      _color: 'Navy',
      cartQuantity: 2,
      is_active: true,
    })
    // Must not be filtered out by CartItem's isActive guard.
    expect(snapshot.is_active).not.toBe(false)
    expect(Array.isArray(snapshot.media)).toBe(true)
  })

  test('falls back to placeholder metadata when the line has no product data', () => {
    const snapshot = buildCartLineSnapshot({ id: 85, quantity: 1 })

    expect(snapshot.name).toBe('Product #85')
    expect(snapshot.price).toBe(0)
    expect(snapshot.saleprice).toBe(0)
    expect(snapshot.categories).toEqual([])
    expect(snapshot.media).toEqual([])
    expect(snapshot._sizeVariantId).toBeNull()
    expect(snapshot._color).toBeNull()
  })

  test('merging API data keeps the cart line identity and quantity', () => {
    const snapshot = buildCartLineSnapshot({
      id: 63,
      quantity: 3,
      size_variant_id: 12,
      size: 'S',
      color: 'Red',
    })

    const merged = mergeCartLine(snapshot, {
      id: 63,
      quantity: 999,
      name: 'Training Tee',
      price: 59.95,
      is_active: true,
      media: [{ path: 'items/tee.png' }],
    })

    expect(merged.name).toBe('Training Tee')
    expect(merged.price).toBe(59.95)
    expect(merged._quantity).toBe(3)
    expect(merged.cartQuantity).toBe(3)
    expect(merged._sizeVariantId).toBe(12)
    expect(merged._color).toBe('Red')
    expect(merged.size).toBe('S')
    // API payload must not replace the cart line key inputs.
    expect(cartLineKey(merged)).toBe(cartLineKey(snapshot))
  })

  test('merging without product data returns the snapshot untouched', () => {
    const snapshot = buildCartLineSnapshot({ id: 85, quantity: 1 })
    expect(mergeCartLine(snapshot, null)).toBe(snapshot)
  })
})
