<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-3"
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-once="true"
          >
          <div class="col-span-1"></div>
          <div class="col-span-1"/>
          <VSelect
            v-model="ActiveTab"
            :items="SeriesTabs"
            label="Select Event Year"
            solo
            class="col-span-1"
          />
          <div class="col-span-1 md:col-span-2"></div>
          <div
          class="col-span-1 flex items-center justify-end lg:justify-center"
          >
            <label class="font-semibold text-[#555555]">
              Show Refunded
              <input
              id="submitted" v-model="trashed"
              type="checkbox"
              />
            </label>
          </div>
          <div
          class="col-span-1 md:col-span-3 flex flex-wrap items-center
          justify-around gap-x-2 md:justify-between"
          data-aos="flip-up" data-aos-once="true"
          >
            <span
            class="font-medium text-white"
            >
            Showing {{ from }}-{{ to }} of {{ totalItems }} items
            </span>
            <VPagination
              v-model="page"
              :length="totalPages"
              color="success"
              :total-visible="7"
              class="text-white"
              dark
              />
          </div>
          <section
            v-if="primaryRetrievalComplete && totalPages > 0"
            class="col-span-1 md:col-span-3"
          >
            <RegisteredVueTable
              :columns="ActiveTab === 'weekly' ? individualData : teamData"
              :data="ActiveTab === 'weekly' ? individualList : teamList"
              @view="openViewRegistered"
              @transaction-data="openManageRefundDialog"
              @delete-data="openDeleteRegisterationDialog"
            />
          </section>
          <section
            v-if="individualList.length === 0 && ActiveTab === 'weekly'"
            class="col-span-1 flex h-20 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
          >
            No Registration Record Found
          </section>
          <section
            v-if="teamList.length === 0 && ActiveTab !== 'weekly'"
            class="col-span-1 flex h-20 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
          >
            No Registration Record Found
          </section>
        </div>
      </section>
    </div>
    <ViewRegisteredModal 
      :active="showViewRegisteredModal"
      :player="selectedPlayer"
      @close="closeViewModal"
    />
    <ManageRefundModal
    :active="showManageRefundModal"
    :transaction="selectedData"
    :trashed="trashed"
    :seriesType="ActiveTab"
    @close="closeManageRefundDialog"
    @confirm="ManageRefund"
    />
    <DeleteRegistrationModal
    :active="showDeleteRegistrationModal"
    :transaction="selectedData"
    :seriesType="ActiveTab"
    @close="closeDeleteRegistrationDialog"
    @confirm="DeleteRegistration"
    />
  </div>
</template>

<script>
import RegisteredVueTable from '~/components/tables/RegisteredVueTable.vue';
import ViewRegisteredModal from '~/components/modals/ViewRegisteredModal.vue';
import ManageRefundModal from '~/components/modals/ManageRefundModal.vue';
import DeleteRegistrationModal from '~/components/modals/DeleteRegistrationModal.vue';
import currencyMixin from '~/mixins/currency/handlesCurrency'

export default {
  components: {
    RegisteredVueTable,
    ViewRegisteredModal,
    ManageRefundModal,
    DeleteRegistrationModal,
  },
  mixins: [ currencyMixin ],
  props: {
    Matches: {
      type: Array,
      required: true
    },
    SeriesList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      trashed: false,
      dateFilter: null,
      submit: false,
      primaryRetrievalComplete: false,
      showViewRegisteredModal: false,
      showManageRefundModal: false,
      showDeleteRegistrationModal: false,
      selectedPlayer: null,
      selectedData: ({}),
      individualList: [],
      teamList: [],
      Data: [],
      individualData: [
        { name: 'timestamp', label: 'Timestamp' },
        { name: 'agegroup', label: 'Age Group' },
        { name: 'phone', label: 'Contact' },
        { name: 'playername', label: 'Player' },
        { name: 'email', label: 'Email' },
        { name: 'dob', label: 'Birth Date' },
        { name: 'team', label: 'Team' },
        { name: 'amount', label: 'Amount' },
        { name: 'paymentmethod', label: 'Method' },
        { name: 'transactionid', label: 'Transaction' },
        { name: 'updated', label: 'Updated' },
        { name: 'action', label: 'Action' },
      ],
      teamData: [
        { name: 'timestamp', label: 'Timestamps' },
        { name: 'series', label: 'Series' },
        { name: 'team', label: 'Team' },
        { name: 'agegroup', label: 'Age Group' },
        { name: 'coachPhone', label: 'Contact' },
        { name: 'coachEmail', label: 'Coach Email' },
        { name: 'manager', label: 'Manager' },
        { name: 'managerEmail', label: 'Manager Email' },
        { name: 'amount', label: 'Amount' },
        { name: 'paymentmethod', label: 'Method' },
        { name: 'transactionid', label: 'Transaction' },
        { name: 'updated', label: 'Updated' },
        { name: 'action', label: 'Action' },
      ],
      ActiveTab: 'weekly',
      SeriesTabs: [
        { text: 'Weekly Competitions', value: 'weekly' },
        { text: 'Tournaments', value: 'tournament' },
        { text: 'Central Coast', value: 'coast' },
      ],
      Rules: [
        value => {
          if (value) {
            return true
          }

          return 'Name is required.'
        },
        value => {
          if (value.length <= 10) {
            return true
          }

          return 'Name must be less than 10 characters.'
        },
      ],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 1,
      totalItems: 0,
    };
  },
  watch: {
    trashed: {
      handler(istrashed) {
        if (this.primaryRetrievalComplete) {
          if (this.ActiveTab === 'weekly') {
            this.retrieveIndividual();
          } else {
            this.retrieveTeam();
          }
          this.page = 1;
        }

        if (this.trashed) {
          // Replace 'transactionid' with 'refundid'
          this.teamData = this.teamData.map(item => {
            if (item.name === 'transactionid') {
              return { ...item, name: 'refundid' };
            }
            return item;
          });

          this.individualData = this.individualData.map(item => {
            if (item.name === 'transactionid') {
              return { ...item, name: 'refundid' };
            }
            return item;
          });

          this.teamData = this.teamData.map(item => {
            if (item.name === 'amount') {
              return { ...item, name: 'refund' };
            }
            return item;
          });

          this.individualData = this.individualData.map(item => {
            if (item.name === 'amount') {
              return { ...item, name: 'refund' };
            }
            return item;
          });
        } else {
          // Replace 'refundid' back with 'transactionid'
          this.teamData = this.teamData.map(item => {
            if (item.name === 'refundid') {
              return { ...item, name: 'transactionid' };
            }
            return item;
          });

          this.individualData = this.individualData.map(item => {
            if (item.name === 'refundid') {
              return { ...item, name: 'transactionid' };
            }
            return item;
          });

          this.teamData = this.teamData.map(item => {
            if (item.name === 'refund') {
              return { ...item, name: 'amount' };
            }
            return item;
          });

          this.individualData = this.individualData.map(item => {
            if (item.name === 'refund') {
              return { ...item, name: 'amount' };
            }
            return item;
          });
        }
      },
      immediate: true,
    },
    ActiveTab: {
      handler(newtab) {
        if (newtab === 'weekly') {
          this.retrieveIndividual()
        } else {
          this.retrieveTeam()
        }
        this.page = 1
      },
      immediate: true,
    },
    page: {
      handler(newPage) {
        if (this.primaryRetrievalComplete) {
          if (this.ActiveTab === 'weekly') {
            this.retrieveIndividual()
          } else {
            this.retrieveTeam()
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    EventDates() {
      return this.Matches.map(event =>
        ({ date: new Date(event.date), type: event.submit?'danger':'success' }));
    },
    filteredMatches() {
      return this.individualList.filter(match =>
        match && typeof match.submit === 'boolean' ?
          match.submit === this.submit :
          false
      );
    },
    formattedSeries() {
      return this.SeriesList.map(series =>
        ({ text: series.name, value: series.id }));
    },
  },
  methods: {
    seriesFormat(id) {
      const matched = this.formattedSeries.find(data => data.value === id);
      if (matched) {
        return matched.text;
      } else {

        return 'Unknown';
      }
    },
    convertTo12HourFormat(timeString) {
      const [ hour, minute ] = timeString.split(':');
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = (hour % 12) || 12;
      return `${formattedHour}:${minute} ${period}`;
    },
    openViewRegistered(player) {
      console.log('Player data being passed to modal:', player);
      this.selectedPlayer = {
        ...player,
        ...player.itemdata,
        // eslint-disable-next-line camelcase
        player_firstname: player.player_firstname || player.itemdata.playername.split(' ')[0] || '',
        // eslint-disable-next-line camelcase
        player_lastname: player.player_lastname || player.itemdata.playername.split(' ')[1] || '',
        dob: player.dob || player.itemdata.dob,
        photo: player.itemdata.photo
      };
      this.showViewRegisteredModal = true;
    },
    openManageRefundDialog(data) {
      this.selectedData = data
      this.showManageRefundModal = true
    },
    openDeleteRegisterationDialog(data) {
      this.selectedData = data
      this.showDeleteRegistrationModal = true
    },
    closeManageRefundDialog(data) {
      this.selectedData = ({})
      this.showManageRefundModal = false
    },
    closeDeleteRegistrationDialog(data) {
      this.selectedData = ({})
      this.showDeleteRegistrationModal = false
    },
    closeViewModal() {
      this.showViewRegisteredModal = false;
      this.selectedPlayer = null;
    },
    View() {
      this.showViewRegisteredModal = false;
      if (this.ActiveTab) {
        this.showViewRegisteredModal = true
      }
    },
    ManageRefund(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Refunded Successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showManageRefundModal = false;
      if (this.ActiveTab === 'weekly') {
        this.retrieveIndividual();
      } else {
        this.retrieveTeam();
      }

    },
    DeleteRegistration(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Unregistered Successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteRegistrationModal = false;
      this.retrieveIndividual();
      this.retrieveTeam();
    },
    formattedDate(dateString) {
      const date = new Date(dateString);

      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();

      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours || 12; // the hour '0' should be '12'

      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      // eslint-disable-next-line max-len, vue/max-len
      return `${day}/${month}/${year.toString().slice(-2)} ${hours}:${formattedMinutes} ${ampm}`;
    },
    retrieveIndividual() {
      let eventYear = this.dateFilter ? this.dateFilter.getUTCFullYear() : null;
      let eventMonth = this.dateFilter ?
        (this.dateFilter.getUTCMonth() + 1) : null;
      let eventDay = this.dateFilter ?
        (this.dateFilter.getUTCDate()): null;

      // Increment the day by 1
      eventDay++;

      // Get the last day of the current month
      const lastDayOfMonth = new Date(eventYear, eventMonth, 0).getDate();

      if (eventDay > lastDayOfMonth) {
        eventDay = 1;
        eventMonth++;

        if (eventMonth === 13) {
          eventMonth = 1;
          eventYear++;
        }
      }

      const eventMonthStr = eventMonth? eventMonth.toString().padStart(2, '0') : null;
      const eventDayStr = eventDay? eventDay.toString().padStart(2, '0') : null;

      // eslint-disable-next-line camelcase
      let event_date = null
      if (eventYear && eventMonthStr && eventDayStr) {
        // eslint-disable-next-line camelcase, no-const-assign
        event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;
      }

      const query = {
        q: this.query,
        sort: 'latest',
        page: this.page,
        // eslint-disable-next-line camelcase
        eventDate: event_date,
        maxPlayersPerPage: 10,
        submit: this.submit,
        isRegistered: true,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const endpoint = this.trashed?'players/trashed':'players';

      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/${endpoint}?${queryString}`)
        .then((response) => {
          const EventList = response.data.players.map(player => {
            const photoUrl = player.media.length > 0 ?
              this.getImageUrl(player.media[0].path) : null;
            return {
              ...player,
              itemdata: {
                id: player.id,
                email: player.email,
                team: player.team_name,
                dob: this.formatDob(player.dob),
                series: this.seriesFormat(player.series_id),
                agegroup: player.agegroup.name || '',
                phone: player.phone_number,
                playername:
                  `${player.player_firstname} ${player.player_lastname}`,
                amount: player.registration.price,
                refund: player.registration.refund,
                paymentmethod: player.registration.payment_gateway,
                transactionid: player.registration.transaction_id||null,
                refundid: player.registration.refund_id,
                timestamp: this.formattedDate(
                  player.registration.created_at
                ),
                updated: this.formattedDate(
                  player.registration.updated_at
                ),
                action: this.trashed,
                photo: photoUrl
              }
            };
          });
          this.individualList = EventList.flatMap(data => {
            return data.itemdata;
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.primaryRetrievalComplete = true;
        });
    },
    formatDob(dobString) {
      if (!dobString) return '';
  
      // If already in DD/MM/YYYY format, return as-is
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dobString)) {
        return dobString;
      }
  
      // Handle ISO format (YYYY-MM-DD)
      const parts = dobString.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
  
      // Fallback to original if format is unexpected
      return dobString;
    },
    getImageUrl(path) {
      if (!path) return null;
      if (path.startsWith('http')) return path;
      return `${process.env.APP_URL || window.location.origin}/storage/${path}`;
    },
    retrieveTeam() {
      let eventYear = this.dateFilter ? this.dateFilter.getUTCFullYear() : null;
      let eventMonth = this.dateFilter ?
        (this.dateFilter.getUTCMonth() + 1) : null;
      let eventDay = this.dateFilter ?
        (this.dateFilter.getUTCDate()): null;

      // Increment the day by 1
      eventDay++;

      // Get the last day of the current month
      const lastDayOfMonth = new Date(eventYear, eventMonth, 0).getDate();

      if (eventDay > lastDayOfMonth) {
        eventDay = 1;
        eventMonth++;

        if (eventMonth === 13) {
          eventMonth = 1;
          eventYear++;
        }
      }

      const eventMonthStr = eventMonth? eventMonth.toString().padStart(2, '0') : null;
      const eventDayStr = eventDay? eventDay.toString().padStart(2, '0') : null;

      // eslint-disable-next-line camelcase
      let event_date = null
      if (eventYear && eventMonthStr && eventDayStr) {
        // eslint-disable-next-line camelcase, no-const-assign
        event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;
      }

      const query = {
        q: this.query,
        sort: 'latest',
        page: this.page,
        seriestype: this.ActiveTab,
        // eslint-disable-next-line camelcase
        eventDate: event_date,
        submit: this.submit,
        maxTeamsPerPage: 10,
        isRegistered: true,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const endpoint = this.trashed?'teams/trashed':'teams';

      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/${endpoint}?${queryString}`)
        .then((response) => {
          const EventList = response.data.teams
            .map(team => {
              return {
                ...team,
                itemdata: {
                  id: team.id,
                  team: team.name,
                  series: this.seriesFormat(team.series_id),
                  agegroup: team.agegroup.name || '',
                  coachPhone: team.coach_mobile,
                  coachEmail: team.coach_email,
                  manager: team.manager_name,
                  managerEmail: team.manager_email,
                  amount: team.registration.price,
                  refund: team.registration.refund,
                  paymentmethod: team.registration.payment_gateway,
                  transactionid: team.registration.transaction_id||null,
                  refundid: team.registration.refund_id,
                  timestamp: this.formattedDate(
                    team.registration.created_at
                  ),
                  updated: this.formattedDate(
                    team.registration.updated_at
                  ),
                  action: this.trashed,
                }
              };
            });
          this.teamList = EventList.flatMap(data => {
            return data.itemdata;
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.primaryRetrievalComplete = true;
        });
    },
  }
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
/* Default background color for unchecked checkbox */
/* Default styles for unchecked checkbox */
input[type="checkbox"] {
  -webkit-appearance: none; /* Remove default styles */
  -moz-appearance: none;
  appearance: none;
  background-color: white; /* Transparent background */
  border: 2px solid white; /* White border */
  width: 25px; /* Adjust width and height as needed */
  height: 25px;
  outline: none; /* Remove outline */
  cursor: pointer; /* Show pointer on hover */
  border-radius: 5px;
}

/* Background color for checked checkbox */
input[type="checkbox"]:checked {
  background-color:#e42828; /* Orange background */
}

/* Optional: Styles for checkmark */
input[type="checkbox"]::after {
  display: inline-block;
  font-size: 14px; /* Adjust size as needed */
  color: white; /* Color of the checkmark */
  line-height: 1; /* Vertical alignment */
  visibility: hidden; /* Hide by default */
}

/* Show checkmark when checkbox is checked */
input[type="checkbox"]:checked::after {
  visibility: visible;
}

</style>