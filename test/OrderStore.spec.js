import { actions } from '@/store/order'

describe('order shipping rates', () => {
  const fetchRates = async (payload) => {
    const commit = jest.fn()
    const context = {
      commit,
      $axios: {
        $get: jest.fn().mockResolvedValue(payload),
      },
    }

    const rates = await actions.fetchShippingRates.call(context, context)

    return { rates, commit }
  }

  test('converts the configured cent charges into dollar rates', async () => {
    const { rates, commit } = await fetchRates({
      data: {
        options: { delivery_charge: 1000, pickup_charge: 250 },
        charges: { delivery: 1000, pickup: 250 },
      },
    })

    expect(rates).toEqual({ delivery: 10, pickup: 2.5 })
    expect(commit).toHaveBeenCalledWith('setShippingRates', {
      delivery: 10,
      pickup: 2.5,
    })
  })

  test('falls back to the options payload when charges are absent', async () => {
    const { rates } = await fetchRates({
      data: {
        options: { delivery_charge: 1000, pickup_charge: 0 },
      },
    })

    expect(rates).toEqual({ delivery: 10, pickup: 0 })
  })

  test('keeps a zero rate instead of defaulting to free shipping', async () => {
    // A zero rate is a deliberate setting, not a missing value.
    const { rates } = await fetchRates({
      data: {
        options: { delivery_charge: 0, pickup_charge: 0 },
        charges: { delivery: 0, pickup: 0 },
      },
    })

    expect(rates).toEqual({ delivery: 0, pickup: 0 })
  })

  test('defaults to zero when the response has no shipping payload', async () => {
    const { rates } = await fetchRates({})

    expect(rates).toEqual({ delivery: 0, pickup: 0 })
  })
})
