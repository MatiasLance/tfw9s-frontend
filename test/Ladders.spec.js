import LaddersPage from '@/pages/ladders.vue'

describe('public ladder filters', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  test('builds the expected API parameters and omits Overall Standings round', () => {
    const buildQueryParams = LaddersPage.methods.buildQueryParams
    const base = {
      query: null,
      page: 1,
      selectedAgeGroup: 9,
      selectedSeries: 9,
      selectedYear: 2026,
      selectedRound: null,
    }

    expect(buildQueryParams.call(base)).toEqual({
      sort: 'points',
      page: 1,
      agegroup: 9,
      series: 9,
      year: 2026,
    })

    expect(buildQueryParams.call({
      ...base,
      selectedRound: 'pool_a_round',
    })).toEqual({
      sort: 'points',
      page: 1,
      agegroup: 9,
      series: 9,
      year: 2026,
      round: 'pool_a_round',
    })
  })

  test('does not reset a selected round when Go is clicked', () => {
    jest.useFakeTimers()
    const vm = {
      isLoading: false,
      page: 3,
      selectedRound: 'semi',
      _filterTimeout: null,
      retrieveTeamPosition: jest.fn(),
    }

    LaddersPage.methods.handleFilterChange.call(vm)
    jest.advanceTimersByTime(300)

    expect(vm.selectedRound).toBe('semi')
    expect(vm.page).toBe(1)
    expect(vm.retrieveTeamPosition).toHaveBeenCalledTimes(1)
  })

  test('initializes stable filter IDs from API data before loading positions', async () => {
    const vm = {
      isLoading: false,
      selectedAgeGroup: null,
      selectedSeries: null,
      ageGroupList: [],
      seriesList: [],
      retrieveAgeGroups: jest.fn(async function() {
        vm.ageGroupList = [{ id: 11, name: '6' }]
      }),
      retrieveSeries: jest.fn(async function() {
        vm.seriesList = [{ id: 12, name: 'Weekly Series' }]
      }),
      retrieveTeamPosition: jest.fn().mockResolvedValue(),
    }

    await LaddersPage.methods.initializeData.call(vm)

    expect(vm.selectedAgeGroup).toBe(11)
    expect(vm.selectedSeries).toBe(12)
    expect(vm.retrieveTeamPosition).toHaveBeenCalledTimes(1)
  })

  test('handles an empty result set without calling a missing pagination method', () => {
    const vm = { page: 1, totalPages: 0 }

    expect(() => LaddersPage.watch.totalPages.call(vm)).not.toThrow()
    expect(vm.page).toBe(1)
  })

  test('passes filters through Axios without client-side query rewriting', async () => {
    const positions = [{
      id: 1,
      team_id: 5,
      team: { id: 5, name: 'Avoca Blazers' },
      event: { id: 2, round: 'round' },
      win: 1,
      loss: 0,
      draw: 0,
      for: 3,
      against: 1,
      difference: 2,
      points: 2,
    }]
    const params = {
      sort: 'points',
      page: 1,
      agegroup: 9,
      series: 9,
      year: 2026,
    }
    const $get = jest.fn().mockResolvedValue({
      data: {
        all_positions: positions,
        total_items: 1,
        last_page: 1,
        from: 1,
        to: 1,
      },
    })
    const vm = {
      isLoading: false,
      team: [],
      allTeamStats: [],
      totalItems: 0,
      totalPages: 0,
      from: 0,
      to: 0,
      $axios: { $get },
      buildQueryParams: jest.fn().mockReturnValue(params),
      calculateAllTeamStats: jest.fn(),
    }

    await LaddersPage.methods.retrieveTeamPosition.call(vm)

    expect($get).toHaveBeenCalledWith('v1/teampositions/list', { params })
    expect(vm.team[0]).toMatchObject({
      team: 'Avoca Blazers',
      round: 'round',
    })
    expect(vm.calculateAllTeamStats).toHaveBeenCalledTimes(1)
  })
})
