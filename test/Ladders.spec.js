import { shallowMount } from '@vue/test-utils'
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

const createPosition = ({
  teamId,
  team,
  eventDate,
  points,
  scored = 0,
  conceded = 0,
  win = 0,
  loss = 0,
  draw = 0,
  round = 'round',
}) => ({
  team_id: teamId,
  team,
  win,
  loss,
  draw,
  for: scored,
  against: conceded,
  points,
  event: {
    event_date: eventDate,
    round,
  },
})

const createLadderVm = (team, selectedRound = null) => {
  const vm = {
    team,
    selectedRound,
    allTeamStats: [],
  }

  Object.defineProperty(vm, 'filteredTeamsByRound', {
    get() {
      return LaddersPage.computed.filteredTeamsByRound.call(this)
    },
  })

  vm.getUniqueTeamIds = LaddersPage.methods.getUniqueTeamIds
  vm.calculateTeamStats = LaddersPage.methods.calculateTeamStats
  vm.getEventDate = LaddersPage.methods.getEventDate
  vm.getLatestEventDate = LaddersPage.methods.getLatestEventDate
  vm.getPreviousTeamEvents = LaddersPage.methods.getPreviousTeamEvents
  vm.rankTeams = LaddersPage.methods.rankTeams
  vm.buildRankLookup = LaddersPage.methods.buildRankLookup
  vm.calculateAllTeamStats = LaddersPage.methods.calculateAllTeamStats
  vm.formatStat = LaddersPage.methods.formatStat
  vm.movementIcon = LaddersPage.methods.movementIcon
  vm.movementLabel = LaddersPage.methods.movementLabel

  return vm
}

describe('progressive ladder rank movement', () => {
  test('marks up and down arrows from the previous event date', () => {
    const vm = createLadderVm([
      createPosition({
        teamId: 1,
        team: 'Avoca Blazers',
        eventDate: '2026-03-01',
        points: 2,
        scored: 4,
        conceded: 2,
        win: 1,
      }),
      createPosition({
        teamId: 2,
        team: 'Tuggerah Titans',
        eventDate: '2026-03-01',
        points: 2,
        scored: 3,
        conceded: 2,
        win: 1,
      }),
      createPosition({
        teamId: 3,
        team: 'Terrigal Sharks',
        eventDate: '2026-03-01',
        points: 0,
        scored: 1,
        conceded: 4,
        loss: 1,
      }),
      createPosition({
        teamId: 1,
        team: 'Avoca Blazers',
        eventDate: '2026-03-08',
        points: 0,
        scored: 1,
        conceded: 5,
        loss: 1,
      }),
      createPosition({
        teamId: 2,
        team: 'Tuggerah Titans',
        eventDate: '2026-03-08',
        points: 2,
        scored: 5,
        conceded: 3,
        win: 1,
      }),
      createPosition({
        teamId: 3,
        team: 'Terrigal Sharks',
        eventDate: '2026-03-08',
        points: 2,
        scored: 4,
        conceded: 2,
        win: 1,
      }),
    ])

    LaddersPage.methods.calculateAllTeamStats.call(vm)

    expect(vm.allTeamStats.map(team => ({
      team: team.team,
      pos: team.pos,
      movement: team.movement,
      rankChange: team.rankChange,
    }))).toEqual([
      { team: 'Tuggerah Titans', pos: 1, movement: 'up', rankChange: 1 },
      { team: 'Terrigal Sharks', pos: 2, movement: 'up', rankChange: 1 },
      { team: 'Avoca Blazers', pos: 3, movement: 'down', rankChange: -2 },
    ])
    expect(vm.movementIcon(vm.allTeamStats[0])).toContain('ri-arrow-up-s-fill')
    expect(vm.movementIcon(vm.allTeamStats[2])).toContain('ri-arrow-down-s-fill')
    expect(vm.movementLabel(vm.allTeamStats[2])).toBe('Moved down 2 places')
  })

  test('does not invent movement when only one event date is present', () => {
    const vm = createLadderVm([
      createPosition({
        teamId: 1,
        team: 'Avoca Blazers',
        eventDate: '2026-03-01',
        points: 2,
        scored: 4,
        conceded: 1,
        win: 1,
      }),
      createPosition({
        teamId: 2,
        team: 'Tuggerah Titans',
        eventDate: '2026-03-01',
        points: 0,
        scored: 1,
        conceded: 4,
        loss: 1,
      }),
    ])

    LaddersPage.methods.calculateAllTeamStats.call(vm)

    expect(vm.allTeamStats.every(team => team.movement === 'same')).toBe(true)
    expect(vm.allTeamStats.every(team => team.rankChange === 0)).toBe(true)
    expect(vm.movementIcon(vm.allTeamStats[0])).toContain('ri-subtract-line')
  })

  test('marks a team that first appears on the latest date as new', () => {
    const vm = createLadderVm([
      createPosition({
        teamId: 1,
        team: 'Avoca Blazers',
        eventDate: '2026-03-01',
        points: 2,
        scored: 3,
        conceded: 1,
        win: 1,
      }),
      createPosition({
        teamId: 1,
        team: 'Avoca Blazers',
        eventDate: '2026-03-08',
        points: 2,
        scored: 2,
        conceded: 1,
        win: 1,
      }),
      createPosition({
        teamId: 4,
        team: 'The Entrance',
        eventDate: '2026-03-08',
        points: 0,
        scored: 1,
        conceded: 2,
        loss: 1,
      }),
    ])

    LaddersPage.methods.calculateAllTeamStats.call(vm)

    const newTeam = vm.allTeamStats.find(team => team.team_id === 4)
    expect(newTeam.movement).toBe('new')
    expect(newTeam.previousPos).toBeNull()
    expect(vm.movementIcon(newTeam)).toContain('ri-star-s-fill')
  })

  test('formats a positive points difference with a plus sign', () => {
    expect(LaddersPage.methods.formatStat(
      { difference: 6 },
      'difference'
    )).toBe('+6')
    expect(LaddersPage.methods.formatStat(
      { difference: -2 },
      'difference'
    )).toBe(-2)
    expect(LaddersPage.methods.formatStat({ points: 8 }, 'points')).toBe(8)
  })

  test('renders movement arrows in the progressive ladder', async () => {
    const wrapper = shallowMount(LaddersPage, {
      stubs: {
        BaseHeader: true,
        NuxtLink: true,
        VBtn: true,
        VSelect: true,
        LoadingAnimation: true,
      },
      mocks: {
        $axios: {
          $get: jest.fn().mockResolvedValue({
            data: {
              ageGroups: [],
              all_positions: [],
              total_items: 0,
              last_page: 0,
              from: 0,
              to: 0,
            },
            series: [],
          }),
        },
      },
    })

    await wrapper.vm.$nextTick()
    await wrapper.setData({
      isLoading: false,
      allTeamStats: [
        {
          team_id: 2,
          team: 'Tuggerah Titans',
          pos: 1,
          movement: 'up',
          rankChange: 1,
          played: 2,
          win: 2,
          loss: 0,
          draw: 0,
          for: 8,
          against: 5,
          difference: 3,
          points: 4,
        },
        {
          team_id: 1,
          team: 'Avoca Blazers',
          pos: 2,
          movement: 'down',
          rankChange: -1,
          played: 2,
          win: 1,
          loss: 1,
          draw: 0,
          for: 5,
          against: 7,
          difference: -2,
          points: 2,
        },
      ],
    })

    const rows = wrapper.findAll('tbody tr')

    expect(wrapper.text()).toContain('Progressive Ladder')
    expect(rows.at(0).find('.ri-arrow-up-s-fill').exists()).toBe(true)
    expect(rows.at(1).find('.ri-arrow-down-s-fill').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tuggerah Titans')
    expect(wrapper.text()).toContain('Avoca Blazers')
    wrapper.destroy()
  })
})
