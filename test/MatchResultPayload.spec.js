import ManageResultModal from '@/components/modals/ManageResultModal.vue'
import SubmitResultModal from '@/components/modals/SubmitResultModal.vue'

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

describe('match result payloads', () => {
  test('normalizes Boolean values returned by APIs and form submissions', () => {
    const toBoolean = ManageResultModal.methods.toBoolean

    expect(toBoolean('true')).toBe(true)
    expect(toBoolean('1')).toBe(true)
    expect(toBoolean('false')).toBe(false)
    expect(toBoolean('0')).toBe(false)
    expect(toBoolean(false)).toBe(false)
  })

  test('updates scores using JSON numbers and a real Boolean', async () => {
    const $post = jest.fn().mockResolvedValue({})
    const vm = {
      MatchData: {
        id: 17,
        team1_score: '3',
        team2_score: '1',
      },
      isAbandonedMatched: false,
      processing: true,
      $axios: { $post },
      $oruga: { notification: { open: jest.fn() } },
      $router: { push: jest.fn() },
      $emit: jest.fn(),
      reset: jest.fn(),
      closeDialog: jest.fn(),
    }

    ManageResultModal.methods.saveResult.call(vm)
    await flushPromises()

    expect($post).toHaveBeenCalledWith('v1/eventmatches/update/17', {
      team1_score: 3,
      team2_score: 1,
      is_abandoned_match: false,
    })
    expect(vm.processing).toBe(false)
  })

  test('submits an abandoned result without converting the flag to text', async () => {
    const $post = jest.fn().mockResolvedValue({})
    const vm = {
      matchData: {
        id: 18,
        team1_score: '0',
        team2_score: '0',
        is_abandoned_match: 'true',
      },
      processing: false,
      $axios: { $post },
      $emit: jest.fn(),
      toBoolean: SubmitResultModal.methods.toBoolean,
    }

    SubmitResultModal.methods.SubmitResult.call(vm)
    await flushPromises()

    expect($post).toHaveBeenCalledWith('v1/eventmatches/18', {
      team1_score: 0,
      team2_score: 0,
      is_abandoned_match: true,
    })
    expect(vm.processing).toBe(false)
  })
})
