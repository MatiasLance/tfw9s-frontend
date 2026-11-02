/**
 * Helpers for turning Vuex cart lines into render-ready objects.
 *
 * A cart line is authoritative for its identity (product id + size variant id +
 * colour). API product data is only used to enrich the line, so the cart list
 * is always derived from the store and can never disagree with the badge
 * counter.
 */

export function normalizeId(value) {
  if (value === undefined || value === null || value === '') return null

  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : value
}

export function normalizeVariant(value) {
  if (value === undefined || value === null || value === '') return null
  return value
}

/**
 * Collision-proof identity for a cart line.
 *
 * Accepts either a raw Vuex cart line (`id`, `size_variant_id`, `color`) or a
 * render item (`_cartItemId`, `_sizeVariantId`, `_color`). Missing variants
 * become explicit nulls so a plain product and a variant of the same product
 * can never share a key.
 */
export function cartLineKey(item) {
  if (!item) return JSON.stringify([null, null, null])

  return JSON.stringify([
    normalizeId(item._cartItemId ?? item.id),
    normalizeId(item._sizeVariantId ?? item.size_variant_id),
    normalizeVariant(item._color ?? item.color),
  ])
}

/**
 * Build the render snapshot for a cart line using only data stored in Vuex.
 * This is what guarantees a line renders even when the product API is slow or
 * unavailable.
 */
export function buildCartLineSnapshot(cartItem) {
  return {
    id: cartItem.id,
    name: cartItem.name || `Product #${cartItem.id}`,
    price: cartItem.price ?? 0,
    saleprice: cartItem.saleprice ?? 0,
    is_on_sale: cartItem.is_on_sale ?? false,
    show_rrp: cartItem.show_rrp ?? false,
    categories: cartItem.categories || [],
    media:
      cartItem.media && cartItem.media.length
        ? cartItem.media
        : cartItem.image
        ? [{ url: cartItem.image }]
        : [],
    stock: cartItem.stock ?? 0,
    is_active: cartItem.is_active !== false,
    size: cartItem.size ?? null,
    variant_sku: cartItem.variant_sku ?? null,
    _cartItemId: cartItem.id,
    _sizeVariantId: cartItem.size_variant_id ?? null,
    _quantity: cartItem.quantity,
    _color: cartItem.color ?? null,
    _image: cartItem.image ?? null,
    _use_image: cartItem.use_image ?? false,
    cartSizeVariantId: cartItem.size_variant_id ?? null,
    cartQuantity: cartItem.quantity,
  }
}

/**
 * Merge fresh product data from the API over a cart line snapshot. Cart line
 * identity and quantity stay authoritative so enrichment can never split,
 * merge or drop lines.
 */
export function mergeCartLine(snapshot, product) {
  if (!product) return snapshot

  return {
    ...snapshot,
    ...product,
    _cartItemId: snapshot._cartItemId,
    _sizeVariantId: snapshot._sizeVariantId,
    _quantity: snapshot._quantity,
    _color: snapshot._color,
    _image: snapshot._image,
    _use_image: snapshot._use_image,
    cartSizeVariantId: snapshot.cartSizeVariantId,
    cartQuantity: snapshot.cartQuantity,
    size: snapshot.size ?? product.size ?? null,
  }
}
