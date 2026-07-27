import PaymentForm from '@/components/payment/PaymentForm.vue'
import RegisterPage from '@/pages/register.vue'
import IndividualInformationForm from '@/components/registration/IndividualInformationForm.vue'

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

  test('opens the Player Card warning only for high-confidence typed matches', async () => {
    const matches = [
      {
        player_name: 'John Smith',
        masked_phone: '***678',
        score: 88,
      },
      {
        player_name: 'Johnny Smith',
        masked_phone: '***123',
        score: 80,
      },
    ]
    const vm = {
      player: { firstName: 'Jon', lastName: 'Smith' },
      newPlayerSearchQuery: 'Jon Smith',
      normalizedNewPlayerName: 'jon smith',
      duplicateAbortController: null,
      duplicateSearchLoading: false,
      duplicateSuggestions: [],
      duplicateMatches: [],
      duplicateBypassName: '',
      lastWarnedPlayerName: '',
      showDuplicateWarning: false,
      duplicateWarningFromSubmit: false,
      $axios: {
        $get: jest.fn().mockResolvedValue({ data: { matches } }),
        isCancel: jest.fn().mockReturnValue(false),
      },
    }

    await IndividualInformationForm.methods.fetchPotentialCardMatches.call(vm)

    expect(vm.duplicateSuggestions).toEqual(matches)
    expect(vm.duplicateMatches).toEqual([matches[0]])
    expect(vm.showDuplicateWarning).toBe(true)
    expect(vm.duplicateWarningFromSubmit).toBe(false)
  })

  test('Continue Anyway submits only when the warning interrupted form submission', () => {
    const emitNewPlayerSubmission = jest.fn()
    const vm = {
      duplicateWarningFromSubmit: false,
      normalizedNewPlayerName: 'john smith',
      duplicateBypassName: '',
      showDuplicateWarning: true,
      emitNewPlayerSubmission,
    }

    IndividualInformationForm.methods.continueAfterDuplicateWarning.call(vm)
    expect(emitNewPlayerSubmission).not.toHaveBeenCalled()

    vm.duplicateWarningFromSubmit = true
    vm.showDuplicateWarning = true
    IndividualInformationForm.methods.continueAfterDuplicateWarning.call(vm)
    expect(emitNewPlayerSubmission).toHaveBeenCalledTimes(1)
  })

  test('the existing-card autocomplete uses the privacy-safe fuzzy endpoint', async () => {
    const matches = [{
      player_name: 'John Smith',
      first_name: 'John',
      last_name: 'Smith',
      masked_phone: '***678',
      score: 100,
    }]
    const $get = jest.fn().mockResolvedValue({ data: { matches } })
    const vm = {
      cardSearchQuery: '  JOHN SMITH ',
      cardSuggestions: [],
      showCardSuggestions: false,
      cardSearchLoading: false,
      cardSearchCompleted: false,
      cardAbortController: null,
      $axios: {
        $get,
        isCancel: jest.fn().mockReturnValue(false),
      },
    }

    await IndividualInformationForm.methods.onCardSearchInput.call(vm)

    expect($get).toHaveBeenCalledWith('v1/players/player-card/matches', {
      params: { q: 'JOHN SMITH', limit: 8 },
      signal: expect.any(AbortSignal),
    })
    expect(vm.cardSuggestions).toEqual(matches)
    expect(vm.showCardSuggestions).toBe(true)
    expect(vm.cardSearchCompleted).toBe(true)
  })

  test('selecting a card keeps only non-sensitive lookup fields in browser state', () => {
    const vm = {
      selectedCardPlayer: null,
      player: { firstName: '', lastName: '', dob: '2015-01-01' },
      cardSearchQuery: '',
      showCardSuggestions: true,
    }
    const match = {
      player_name: 'John Smith',
      first_name: 'John',
      last_name: 'Smith',
      masked_phone: '***678',
      team_name: 'Gosford Falcons',
      age_group: '10',
    }

    IndividualInformationForm.methods.selectCardPlayer.call(vm, match)

    expect(vm.selectedCardPlayer).toEqual(match)
    expect(vm.selectedCardPlayer).not.toHaveProperty('phone_number')
    expect(vm.selectedCardPlayer).not.toHaveProperty('email')
    expect(vm.selectedCardPlayer).not.toHaveProperty('date_of_birth')
    expect(vm.player.dob).toBe('')
  })
})
