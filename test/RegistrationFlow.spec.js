import PaymentForm from '@/components/payment/PaymentForm.vue'
import RegisterPage from '@/pages/register.vue'

const deferred = () => {
  let resolve
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}

describe('registration flow stability', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  test('only applies the latest countdown socket update', () => {
    jest.useFakeTimers()
    const vm = {
      countdownPermanentlyDismissed: false,
      pageIsActive: true,
      seriesId: 7,
      statusDebounceTimer: null,
      registrationOpensDate: null,
      showCountdown: false,
      serverTime: null,
    }

    RegisterPage.methods.handleRegistrationStatus.call(vm, {
      seriesId: 7,
      date: '2026-07-20T19:15:00+10:00',
      isShowCountDownTimer: true,
      serverTime: '2026-07-20T19:10:00+10:00',
    })
    RegisterPage.methods.handleRegistrationStatus.call(vm, {
      seriesId: 7,
      date: '2026-07-20T19:20:00+10:00',
      isShowCountDownTimer: false,
      serverTime: '2026-07-20T19:11:00+10:00',
    })

    jest.advanceTimersByTime(500)

    expect(vm.registrationOpensDate).toBe('2026-07-20T19:20:00+10:00')
    expect(vm.showCountdown).toBe(false)
    expect(vm.serverTime).toBe('2026-07-20T19:11:00+10:00')
  })

  test('uses the lightweight series response on the registration page', async () => {
    const $get = jest.fn().mockResolvedValue({
      data: { series: { id: 7 } },
    })

    await RegisterPage.methods.retrieveSeries.call({
      $axios: { $get },
    }, 7)

    expect($get).toHaveBeenCalledWith('v1/series/7', {
      params: { includeTeams: false },
    })
  })

  test('ignores an older payment calculation that finishes last', async () => {
    const firstResponse = deferred()
    const secondResponse = deferred()
    const $post = jest.fn()
      .mockReturnValueOnce(firstResponse.promise)
      .mockReturnValueOnce(secondResponse.promise)
    const vm = {
      calculationRequestId: 0,
      isValidPrice: true,
      isDestroyed: false,
      isProcessing: false,
      seriestype: 'tournament',
      registrationInformation: {},
      price: 1000,
      overallTotal: 0,
      taxAmount: 0,
      subTotal: 0,
      errorMessage: '',
      $route: { query: { id: 7 } },
      $axios: { $post },
      $store: { commit: jest.fn() },
      showNotification: jest.fn(),
    }

    const firstRequest = PaymentForm.methods.initializePaymentCalculation.call(vm)
    const secondRequest = PaymentForm.methods.initializePaymentCalculation.call(vm)

    secondResponse.resolve({ totalPrice: 1200, taxAmount: 200, subTotal: 1000 })
    await secondRequest
    firstResponse.resolve({ totalPrice: 9999, taxAmount: 999, subTotal: 9000 })
    await firstRequest

    expect(vm.overallTotal).toBe(1200)
    expect(vm.taxAmount).toBe(200)
    expect(vm.subTotal).toBe(1000)
  })
})
