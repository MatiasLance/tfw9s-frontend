jest.mock('remixicon/fonts/remixicon.css', () => ({}))

import Draws from '@/pages/draws.vue'
import AdminDraws from '@/pages/admin/draws-admin.vue'

const deferred = () => {
  let resolve
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}

const createVm = ($get) => ({
  requestSequence: 0,
  isLoaded: true,
  isRefreshing: false,
  selectedRegion: null,
  selectedAgeGroup: null,
  selectedYear: 2026,
  selectedRound: null,
  searchTeamName: 'Tuggerah',
  eventStatus: 'upcoming',
  page: 1,
  perPage: 10,
  matchList: [],
  totalItems: 0,
  totalPages: 0,
  from: 0,
  to: 0,
  $axios: { $get },
  $oruga: { notification: { open: jest.fn() } },
  retrieveEventMatch: Draws.methods.retrieveEventMatch,
})

describe('draw request stability', () => {
  test('admin draws reuse the same tested draw implementation', () => {
    expect(AdminDraws.components.DrawsPage).toBe(Draws)
  })

  test('sends search and status to the server before pagination', async () => {
    const $get = jest.fn().mockResolvedValue({
      data: { eventMatches: [], total_items: 0, last_page: 0, from: 1, to: 0 },
    })
    const vm = createVm($get)

    await Draws.methods.retrieveEventMatch.call(vm)

    expect($get).toHaveBeenCalledWith(expect.stringContaining('q=Tuggerah'))
    expect($get).toHaveBeenCalledWith(expect.stringContaining('status=upcoming'))
    expect($get).toHaveBeenCalledWith(expect.stringContaining('maxEventMatchesPerPage=10'))
    expect(vm.from).toBe(0)
  })

  test('ignores an older draw response that finishes last', async () => {
    const firstResponse = deferred()
    const secondResponse = deferred()
    const $get = jest.fn()
      .mockReturnValueOnce(firstResponse.promise)
      .mockReturnValueOnce(secondResponse.promise)
    const vm = createVm($get)

    const firstRequest = Draws.methods.retrieveEventMatch.call(vm)
    const secondRequest = Draws.methods.retrieveEventMatch.call(vm)

    secondResponse.resolve({
      data: { eventMatches: [{ id: 2 }], total_items: 1, last_page: 1, from: 1, to: 1 },
    })
    await secondRequest

    firstResponse.resolve({
      data: { eventMatches: [{ id: 1 }], total_items: 1, last_page: 1, from: 1, to: 1 },
    })
    await firstRequest

    expect(vm.matchList).toEqual([{ id: 2 }])
  })

  test('formats arbitrary valid match times', () => {
    expect(Draws.methods.AMPMformat('06:05')).toBe('6:05 AM')
    expect(Draws.methods.AMPMformat('18:45')).toBe('6:45 PM')
    expect(Draws.methods.AMPMformat(null)).toBe('Time TBA')
  })
})
