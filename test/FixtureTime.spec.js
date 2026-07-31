jest.mock('vue-croppa/dist/vue-croppa.css', () => ({}))

import Fixings from '@/components/admin/Fixings.vue'
import EditFixingModal from '@/components/modals/EditFixingModal.vue'
import {
  fixtureTimeOptions,
  formatFixtureTime,
  normalizeFixtureTime
} from '@/utils/fixtureTime'

describe('fixture time flow', () => {
  test('normalizes API and picker values to the backend H:i contract', () => {
    expect(normalizeFixtureTime('8:00')).toBe('08:00')
    expect(normalizeFixtureTime('08:00:00')).toBe('08:00')
    expect(normalizeFixtureTime('19:15:30')).toBe('19:15')
    expect(normalizeFixtureTime('not-a-time')).toBeNull()
    expect(fixtureTimeOptions.every(option => /^\d{2}:\d{2}$/.test(option.value))).toBe(true)
  })

  test('displays valid saved times without a hard-coded option lookup', () => {
    expect(formatFixtureTime('09:05:43')).toBe('9:05 AM')
    expect(formatFixtureTime('18:45')).toBe('6:45 PM')
    expect(Fixings.methods.AMPMformat('05:03:23')).toBe('5:03 AM')
    expect(Fixings.methods.AMPMformat(null)).toBe('Unknown')
  })

  test('normalizes the existing event time when the edit modal opens', () => {
    const vm = {
      event: {
        id: 11,
        time: '08:00:00',
        date: '2026-08-03',
        eventmatch: [],
      },
      Event: {},
      multipleMatch: [],
    }

    EditFixingModal.watch.active.handler.call(vm, true)

    expect(vm.Event.time).toBe('08:00')
    expect(vm.Event.date).toBeInstanceOf(Date)
  })

  test('submits a normalized event time and preserves shared field assignments', async () => {
    const $post = jest.fn().mockResolvedValue({ status: 200 })
    const vm = {
      Event: {
        id: 11,
        time: '8:00',
        round: 'round',
        region_id: 1,
        agegroup_id: 2,
        date: new Date(2026, 7, 3),
      },
      multipleMatch: [
        { id: 1, field_id: 9, team1: { id: 10 }, team2: { id: 11 }, isBye: false },
        { id: 2, field_id: 9, team1: { id: 11 }, team2: { id: 12 }, isBye: false },
      ],
      $axios: { $post },
    }

    await EditFixingModal.methods.editFixing.call(vm)

    const formData = $post.mock.calls[0][1]
    expect(formData.get('time')).toBe('08:00')
    expect(formData.get('matches[0][field_id]')).toBe('9')
    expect(formData.get('matches[1][field_id]')).toBe('9')
    expect(formData.has('matches[0][time]')).toBe(false)
  })

  test('keeps the modal state open when the save request fails', async () => {
    const vm = {
      isSaving: false,
      editFixing: jest.fn().mockRejectedValue({
        response: {
          status: 422,
          data: { errors: { time: ['The time does not match the format H:i.'] } },
        },
      }),
      reset: jest.fn(),
      $emit: jest.fn(),
      $router: { push: jest.fn() },
      $oruga: { notification: { open: jest.fn() } },
    }

    const result = await EditFixingModal.methods.confirmFixing.call(vm)

    expect(result).toBe(false)
    expect(vm.reset).not.toHaveBeenCalled()
    expect(vm.$emit).not.toHaveBeenCalled()
    expect(vm.$oruga.notification.open).toHaveBeenCalledWith(
      expect.objectContaining({ variant: 'danger' })
    )
    expect(vm.isSaving).toBe(false)
  })
})
