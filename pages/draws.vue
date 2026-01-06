<template>
  <div class="min-h-screen bg-[#1A1A1B]">
    <!-- Enhanced Header -->
    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >
      <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div
        class="col-span-12 text-center sm:space-y-3 sm:text-left
               lg:col-span-6 xl:mt-10 relative z-10"
        data-aos="fade-right"
      >
        <span class="superheadline flex flex-row items-center text-[1rem]
                    font-normal text-white"
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white" class="hover:scale-105 transition-transform">
                <i class="ri-home-4-line mr-2"></i>Home
              </VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                   bg-gradient-to-r from-green-400 to-white bg-clip-text 
                   drop-shadow-lg"
        >
          🏉 Draws
        </h1>
      </div>
    </BaseHeader>

    <section class="mx-auto max-w-screen-xl gap-4 px-4 py-6">
      <div class="grid grid-cols-3 gap-2">
        
        <div class="col-span-3 py-2" data-aos="fade-up">
          <!-- Enhanced Filter Container -->
          <div class="
            rounded-2xl bg-gradient-to-br from-green-50 to-green-100 
            p-6 shadow-lg border border-green-200
          ">
            <!-- Section Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="
                  rounded-full bg-gradient-to-r from-green-400 to-green-600 
                  p-2
                ">
                  <i class="ri-filter-3-line text-white text-lg"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  Event Filters
                </h3>
              </div>
              <div class="flex items-center space-x-2 text-sm text-green-600">
                <i class="ri-information-line"></i>
                <span>Refine your event search</span>
              </div>
            </div>

            <!-- Status Filter Buttons -->
            <div class="mb-6">
              <label class="
                flex items-center text-sm font-semibold text-gray-900 mb-3
              ">
                <i class="ri-calendar-check-line mr-2 text-green-500"></i>
                Event Status
              </label>
              <div class="flex space-x-3">
                <!-- Complete Button -->
                <button
                  type="button"
                  @click="setEventStatus('complete')"
                  :class="`
                    group relative flex-1 flex items-center justify-center space-x-2 
                    rounded-xl py-3 px-4 font-semibold transition-all duration-300 
                    transform hover:scale-105 hover:shadow-lg
                    ${eventStatus === 'complete' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' +
                      'text-white shadow-md ring-2 ring-green-200 ring-offset-1' 
                      : 'bg-white text-gray-900 border-2 border-green-200' +
                      'hover:border-green-300 hover:bg-green-50'
                    }
                  `"
                >
                  <div 
                    v-if="eventStatus !== 'complete'" 
                    class="
                      absolute inset-0 bg-green-500/10 rounded-xl 
                      transform scale-0 transition-transform duration-300 
                      group-hover:scale-100
                    "
                  ></div>
                  <i 
                    class="ri-checkbox-circle-line text-lg relative z-10" 
                    :class="eventStatus === 'complete' ? 'text-white' : 'text-green-500'"
                  ></i>
                  <span class="relative z-10">Complete</span>
                  <div 
                    v-if="eventStatus === 'complete'" 
                    class="
                      absolute -top-1 -right-1 w-3 h-3 bg-green-400 
                      rounded-full animate-ping
                    "
                  ></div>
                </button>

                <!-- Upcoming Button -->
                <button
                  type="button"
                  @click="setEventStatus('upcoming')"
                  :class="`
                    group relative flex-1 flex items-center justify-center space-x-2 
                    rounded-xl py-3 px-4 font-semibold transition-all duration-300 
                    transform hover:scale-105 hover:shadow-lg
                    ${eventStatus === 'upcoming' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' +
                      'text-white shadow-md ring-2 ring-green-200 ring-offset-1' 
                      : 'bg-white text-gray-900 border-2 border-green-200' +
                      'hover:border-green-300 hover:bg-green-50'
                    }
                  `"
                >
                  <div 
                    v-if="eventStatus !== 'upcoming'" 
                    class="
                      absolute inset-0 bg-green-500/10 rounded-xl 
                      transform scale-0 transition-transform duration-300 
                      group-hover:scale-100
                    "
                  ></div>
                  <i 
                    class="ri-calendar-2-line text-lg relative z-10" 
                    :class="eventStatus === 'upcoming' ? 'text-white' : 'text-green-500'"
                  ></i>
                  <span class="relative z-10">Upcoming</span>
                  <div 
                    v-if="eventStatus === 'upcoming'" 
                    class="
                      absolute -top-1 -right-1 w-3 h-3 bg-green-400 
                      rounded-full animate-ping
                    "
                  ></div>
                </button>
              </div>
            </div>

            <!-- Filter Grid -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <!-- Event Year -->
              <div class="group">
                <label class="
                  flex items-center text-sm font-semibold text-gray-900 mb-3
                ">
                  <i class="ri-calendar-line mr-2 text-green-500"></i>
                  Event Year
                </label>
                <div class="relative">
                  <VSelect
                    v-model="selectedYear"
                    :items="formattedYears"
                    placeholder="Select Event Year"
                    solo
                  />
                </div>
              </div>

              <!-- Age Group -->
              <div class="group">
                <label class="
                  flex items-center text-sm font-semibold text-gray-900 mb-3
                ">
                  <i class="ri-user-line mr-2 text-green-500"></i>
                  Age Group
                </label>
                <div class="relative">
                  <VSelect
                    v-model="selectedAgeGroup"
                    :items="formattedAgeGroup"
                    placeholder="Select Age Group"
                    solo
                  />
                </div>
              </div>

              <!-- Region -->
              <div class="group">
                <label class="
                  flex items-center text-sm font-semibold text-gray-900 mb-3
                ">
                  <i class="ri-map-pin-line mr-2 text-green-500"></i>
                  Region
                </label>
                <div class="relative">
                  <VSelect
                    v-model="selectedRegion"
                    :items="formattedRegions"
                    placeholder="Select Region"
                    solo
                  />
                </div>
              </div>

              <!-- Teams -->
              <div class="group">
                <label class="
                  flex items-center text-sm font-semibold text-gray-900 mb-3
                ">
                  <i class="ri-team-line mr-2 text-green-500"></i>
                  Teams
                </label>
                <div class="relative">
                  <VTextField
                    v-model="searchTeamName"
                    placeholder="Type Team Name"
                    solo
                    :hide-details="false"
                    clearable
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section v-if="totalPages > 0" class="my-8 col-span-3" data-aos="zoom-in">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-gray-300">
              Showing <span class="font-bold text-green-400">{{ from }}-{{ to }}</span>
              of <span class="font-bold text-green-400">{{ totalItems }}</span> matches
            </span>
          </div>
          <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
        </div>
      </section>

        <div class="col-span-3">
          <section
            v-if="totalPages > 0 && isLoaded"
            class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            <div
              v-for="(match) in filteredMatchList"
              :key="match.id" 
              data-aos="fade-up"
              data-aos-offset="0"
              class="col-span-1"
            >
              <!-- Match Card Container -->
              <div class="
                relative overflow-hidden rounded-2xl bg-gradient-to-br 
                from-gray-900 to-gray-800 p-6 shadow-2xl 
                border border-green-500/20 transition-all duration-500 
                hover:scale-105 hover:shadow-2xl hover:border-green-400/40
              ">
                <!-- Background Pattern -->
                <div class="
                  absolute inset-0 opacity-5 bg-repeat-round"
                  :style="soccerPatternStyle"
                ></div>

                <!-- Match Header -->
                <div class="relative z-10 mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="
                        rounded-full bg-green-500/20 p-2 
                        border border-green-500/30
                      ">
                        <i class="ri-calendar-line text-green-400 text-sm"></i>
                      </div>
                      <div>
                        <div class="text-lg font-bold text-white">
                          {{ formatYear(match.event.event_date) }}
                        </div>
                        <div class="flex items-center space-x-4 text-sm text-green-300">
                          <span class="flex items-center space-x-1">
                            <i class="ri-time-line"></i>
                            <span>{{ AMPMformat(match.event.time) }}</span>
                          </span>
                          <span class="flex items-center space-x-1">
                            <i class="ri-map-pin-line"></i>
                            <span>{{ match.field.name }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Teams & Scores Section -->
                <div class="relative z-10">
                  <!-- Teams Row -->
                  <div class="grid grid-cols-12 items-center gap-4 mb-6">
                    <!-- Team 1 -->
                    <div class="col-span-5 text-center">
                      <div class="
                        h-32 flex items-center justify-center p-4 
                        bg-gray-800/50 rounded-xl border border-green-500/20
                        transition-all duration-300 hover:bg-gray-800/70
                      ">
                        <img
                          :src="getMediaURL(match.team1.media[0])"
                          alt="Team 1 logo"
                          class="max-h-20 max-w-full object-contain"
                        />
                      </div>
                      <div class="mt-3">
                        <div class="
                          text-base font-bold text-white truncate 
                          px-2 py-1 bg-gray-800/50 rounded-lg
                        ">
                          {{ match.team1.name }}
                        </div>
                      </div>
                    </div>

                    <!-- VS Badge -->
                    <div class="col-span-2 flex items-center justify-center">
                      <div class="
                        relative rounded-full bg-gradient-to-r 
                        from-green-500 to-emerald-600 p-3 
                        border-2 border-white/20 shadow-lg
                      ">
                        <span class="text-xs font-black text-white">VS</span>
                        <div class="
                          absolute inset-0 rounded-full bg-green-400 
                          animate-ping opacity-20
                        "></div>
                      </div>
                    </div>

                    <!-- Team 2 -->
                    <div class="col-span-5 text-center">
                      <div class="
                        h-32 flex items-center justify-center p-4 
                        bg-gray-800/50 rounded-xl border border-green-500/20
                        transition-all duration-300 hover:bg-gray-800/70
                      ">
                        <img
                          v-if="match.team2"
                          :src="getMediaURL(match.team2.media[0])"
                          alt="Team 2 logo"
                          class="max-h-20 max-w-full object-contain"
                        />
                        <img
                          v-else
                          src="~/assets/images/tfw9s.png"
                          alt="Team 2 logo"
                          class="max-h-20 max-w-full object-contain opacity-70"
                        />
                      </div>
                      <div class="mt-3">
                        <div class="
                          text-base font-bold text-white truncate 
                          px-2 py-1 bg-gray-800/50 rounded-lg
                        ">
                          {{ match.team2 ? match.team2.name : 'Bye' }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Score Section -->
                  <div v-if="match.submitted" class="
                    relative bg-gradient-to-r from-gray-800 to-gray-900 
                    rounded-xl p-4 border border-green-500/30 
                    shadow-inner
                  ">
                    <!-- Final Score Badge -->
                    <div class="
                      absolute -top-3 left-1/2 transform -translate-x-1/2 
                      bg-gradient-to-r from-red-500 to-red-600 
                      px-4 py-1 rounded-full text-xs font-bold 
                      text-white shadow-lg border border-red-400
                    ">
                      <i class="ri-trophy-line mr-1"></i>
                      Final Score
                    </div>

                    <!-- Score Display -->
                    <div class="flex items-center justify-center space-x-6 pt-4">
                      <div class="text-center">
                        <div class="
                          text-4xl text-white
                          ${parseInt(match.team1_score) >= parseInt(match.team2_score) 
                            ? 'text-green-400' : 'text-gray-400'}
                        ">
                          {{ doubleDigitFormat(match.team1_score) }}
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                          Points
                        </div>
                      </div>
                      
                      <div class="
                        text-2xl font-black text-white 
                        bg-gray-700 px-3 py-2 rounded-lg
                      ">
                        :
                      </div>
                      
                      <div class="text-center">
                        <div class="
                          text-4xl text-white
                          ${parseInt(match.team1_score) <= parseInt(match.team2_score) 
                            ? 'text-green-400' : 'text-gray-400'}
                        ">
                          {{ doubleDigitFormat(match.team2_score) }}
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                          Points
                        </div>
                      </div>
                    </div>

                    <!-- Winning Indicator -->
                    <div v-if="match.team1_score !== match.team2_score" class="
                      mt-4 text-center
                    ">
                      <div class="
                        inline-flex items-center space-x-2 
                        bg-green-500/20 px-3 py-1 rounded-full 
                        border border-green-500/30
                      ">
                        <i class="ri-star-fill text-green-400 text-sm"></i>
                        <span class="text-xs font-semibold text-green-300">
                          {{ parseInt(match.team1_score) > parseInt(match.team2_score) 
                            ? match.team1.name + ' Wins!' 
                            : match.team2.name + ' Wins!' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Upcoming Match -->
                  <div v-if="!match.submitted" class="
                    relative bg-gradient-to-r from-gray-800 to-gray-900 
                    rounded-xl p-4 border border-blue-500/30 
                    shadow-inner
                  ">
                    <!-- Upcoming Badge -->
                    <div class="
                      absolute -top-3 left-1/2 transform -translate-x-1/2 
                      bg-gradient-to-r from-blue-500 to-cyan-600 
                      px-4 py-1 rounded-full text-xs font-bold 
                      text-white shadow-lg border border-blue-400
                    ">
                      <i class="ri-time-line mr-1"></i>
                      Upcoming Match
                    </div>

                    <!-- Match Time -->
                    <div class="flex items-center justify-center pt-4">
                      <div class="text-center">
                        <div class="
                          flex items-center space-x-3 
                          bg-blue-500/20 px-6 py-3 rounded-xl 
                          border border-blue-500/30
                        ">
                          <i class="ri-time-fill text-blue-400 text-xl"></i>
                          <span class="text-2xl font-black text-blue-300">
                            {{ AMPMformat(match.event.time) }}
                          </span>
                        </div>
                        <div class="text-xs text-gray-400 mt-2">
                          Get ready for an exciting match!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Match Status Footer -->
                <div class="relative z-10 mt-6 pt-4 border-t border-gray-700">
                  <div class="grid grid-cols-2 items-center text-xs text-gray-400">
                    <div class="flex items-center space-x-2">
                      <i class="ri-football-line"></i>
                      <span>Match</span>
                    </div>
                    <div class="flex items-center space-x-1 justify-end">
                      <div class="
                        w-2 h-2 rounded-full 
                        ${match.submit ? 'bg-green-500' : 'bg-blue-500'} 
                        animate-pulse
                      "></div>
                      <span>{{ match.submitted ? 'Completed' : 'Scheduled' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Empty State -->
          <section
            v-if="totalPages === 0"
            class="col-span-1 flex h-80 items-center justify-center 
            md:col-span-3"
            data-aos="fade-up"
          >
            <div class="text-center">
              <div class="
                rounded-full bg-gray-800 p-6 inline-block mb-4 
                border border-green-500/20
              ">
                <i class="ri-timer-flash-line text-4xl text-green-400"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">
                No Matches Scheduled
              </h3>
              <p class="text-gray-400 max-w-md">
                There are currently no matches scheduled. 
                Check back later for upcoming games and tournament draws.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
    <!-- Loading indicator -->
    <LoadingAnimation
    :is-loading="!isLoaded"
    loading-title="Draws"
    />
  </div>
</template>

<script>
import LoadingAnimation from '~/components/loading/LoadingAnimation.vue';
import handlesMedia from '~/mixins/shop/handlesMedia';

export default {
  mixins: [ handlesMedia ],
  components: { LoadingAnimation },
  data() {
    return {
      pageSEO: {
        title: 'Draws - TFW9s',
        description: ''
      },
      searchTeamName: '',
      matchRoundOption: [
        { text: 'Round', value: 'round' },
        { text: 'Semi', value: 'semi' },
        { text: 'Final', value: 'final' },
        { text: 'Pool A Round', value: 'pool_a_round' },
        { text: 'Pool B Round', value: 'pool_b_round' },
        { text: 'Pool C Round', value: 'pool_c_round' },
        { text: 'Pool D Round', value: 'pool_d_round' },
        { text: 'Pool A Semi', value: 'pool_a_semi' },
        { text: 'Pool B Semi', value: 'pool_b_semi' },
        { text: 'Pool C Semi', value: 'pool_c_semi' },
        { text: 'Pool D Semi', value: 'pool_d_semi' },
        { text: 'Pool A Grand Final', value: 'pool_a_grand_final' },
        { text: 'Pool B Grand Final', value: 'pool_b_grand_final' },
        { text: 'Pool C Grand Final', value: 'pool_c_grand_final' },
        { text: 'Pool D Grand Final', value: 'pool_d_grand_final' },
      ],
      matchTimeOption: [
        { text: '8:00 AM', value: '8:00' },
        { text: '8:25 AM', value: '8:25' },
        { text: '8:50 AM', value: '8:50' },
        { text: '9:15 AM', value: '9:15' },
        { text: '9:40 AM', value: '9:40' },
        { text: '10:05 AM', value: '10:05' },
        { text: '10:30 AM', value: '10:30' },
        { text: '10:55 AM', value: '10:55' },
        { text: '11:20 AM', value: '11:20' },
        { text: '11:45 AM', value: '11:45' },
        { text: '12:10 PM', value: '12:10' },
        { text: '12:35 PM', value: '12:35' },
        { text: '1:00 PM', value: '13:00' },
        { text: '1:25 PM', value: '13:25' },
        { text: '1:50 PM', value: '13:50' },
        { text: '2:15 PM', value: '14:15' },
        { text: '2:40 PM', value: '14:40' },
        { text: '3:05 PM', value: '15:05' },
        { text: '3:30 PM', value: '15:30' },
        { text: '3:55 PM', value: '15:55' },
        { text: '4:20 PM', value: '16:20' },
        { text: '4:45 PM', value: '16:45' },
        { text: '5:10 PM', value: '17:10' },
        { text: '5:35 PM', value: '17:35' },
        { text: '6:00 PM', value: '18:00' },
        { text: '6:00 PM', value: '18:00' },
        { text: '6:25 PM', value: '18:25' },
        { text: '6:50 PM', value: '18:50' },
        { text: '7:15 PM', value: '19:15' },
        { text: '7:40 PM', value: '19:40' },
        { text: '8:05 PM', value: '20:05' },
        { text: '8:30 PM', value: '20:30' },
        { text: '8:55 PM', value: '20:55' },
        { text: '9:20 PM', value: '21:20' },
        { text: '9:45 PM', value: '21:45' },
        { text: '10:00 PM', value: '22:00' },
      ],
      selectedRegion: 13,
      selectedAgeGroup: 1,
      selectedYear: 2026,
      AgeGroupList: [],
      EventList: [],
      RegionList: [],
      matchList: [],
      isLoaded: false,
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      eventStatus: null,
    }
  },
  computed: {
    soccerPatternStyle() {
      return { backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='%235EE738'/%3E%3C/svg%3E")` }
    },
    formattedAgeGroup() {
      return this.AgeGroupList.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
    formattedYears() {
      const currentYear = new Date().getFullYear();

      return [
        {
          text: `Year ${currentYear - 1}`,
          value: currentYear - 1
        },
        {
          text: `Year ${currentYear}`,
          value: currentYear
        }
      ];
    },
    formattedRegions() {
      const regions = this.RegionList.map(region => ({
        id: region.id ? region.id : null,
        name: region.name ? region.name : 'Unknown'
      }));

      const uniqueRegions = [ ...new Set(regions.map(region => region.name)) ]
        .filter(region => region).sort();

      const formattedRegions = uniqueRegions.map(regionName => {
        const regionId = regions.find(region => region.name === regionName).id;
        return {
          text: regionName,
          value: regionId
        };
      });
      return formattedRegions;
    },
    completedMatches() {
      const searchTerm = this.searchTeamName.toLowerCase().trim();
      
      return this.matchList.filter(match => {
        if (!match.submitted) return false;
        
        if (searchTerm) {
          const team1Name = match.team1.name.toLowerCase() || '';
          const team2Name = match.team2.name.toLowerCase() || '';
          return team1Name.includes(searchTerm) || team2Name.includes(searchTerm);
        }
        
        return true;
      });
    },
  
    upcomingMatches() {
      const searchTerm = this.searchTeamName.toLowerCase().trim();
      
      return this.matchList.filter(match => {
        if (match.submitted) return false;
        
        if (searchTerm) {
          const team1Name = match.team1.name.toLowerCase() || '';
          const team2Name = match.team2.name.toLowerCase() || '';
          return team1Name.includes(searchTerm) || team2Name.includes(searchTerm);
        }
        
        return true;
      });
    },
    filteredMatchList() {
      if (this.eventStatus === 'complete') {
        return this.completedMatches;
      } else if (this.eventStatus === 'upcoming') {
        return this.upcomingMatches;
      } else {

        const searchTerm = (this.searchTeamName || '')
          .toString()
          .toLowerCase()
          .trim();
        
        if (!searchTerm) {
          return this.matchList;
        }
        
        return this.matchList.filter(match => {
          const team1Name = match.team1.name.toLowerCase() || '';
          const team2Name = match.team2.name.toLowerCase() || '';
          return team1Name.includes(searchTerm) || team2Name.includes(searchTerm);
        });
      }
    },
  },
  watch: {
    matchList: {
      handler(newEvents) {
        if (Array.isArray(newEvents) && newEvents.length > 0) {
          const firstEvent = newEvents[0];
          if (firstEvent && firstEvent.event_date) {
            const eventDate = new Date(firstEvent.event_date);
            if (!isNaN(eventDate)) {
              this.selectedYear = eventDate.getFullYear();
              this.selectedRegion = firstEvent.region_id;
              this.selectedAgeGroup = firstEvent.agegroup_id;
              this.retrieveEventMatch()
            } else {
              console.error('Invalid event date format');
            }
          } else {
            console.error('Missing or invalid event data');
          }
        }
      },
      immediate: true,
    },
    selectedYear: {
      handler(newYear) {
        if (newYear && this.isLoaded) {
          this.page = 1
          /*
           * this.selectedRegion = null
           * this.selectedAgeGroup = null
           */
          this.selectedAgeGroup = this.formattedAgeGroup[0].value || null;
          this.selectedRegion = this.formattedRegions[0].value || null;
        }
      },
      immediate: true,
    },
    selectedAgeGroup: {
      handler(newYear) {
        if (newYear && this.isLoaded) {
          this.page = 1
          this.selectedRegion = null;
          this.retrieveEventMatch()
        }
      },
      immediate: true,
    },
    selectedRegion: {
      handler(newEvent) {
        if (newEvent && this.isLoaded) {
          this.page = 1
          this.retrieveEventMatch();
        } else if (this.isLoaded) {
          this.team = []
          this.totalPages = 0
        }
      },
      immediate: true,
    },
    searchTeamName(newVal) {
      if (newVal) {
        this.page = 1;
      }
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  created() {
    this.retrieveAgeGroups();
    this.retrieveEventMatch();
    this.retrieveRegions();
  },
  methods: {
    formatYear(date) {
      const eventDate = new Date(date);
      return eventDate.toDateString();
    },
    setEventStatus(status) {
      this.eventStatus = this.eventStatus === status ? null : status
    },
    AMPMformat(time) {
      // eslint-disable-next-line camelcase
      const matched = this.matchTimeOption.find(data => data.value === time);
      if (matched) {
        return matched.text;
      } else {
        return 'Unknown';
      }
    },
    doubleDigitFormat(num) {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num.toString();
      }
    },
    retrieveAgeGroups() {
      const query = {
        sort: 'latest',
        q: this.query,
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.AgeGroupList= response.data.ageGroups;
        })
    },
    retrieveEventMatch() {
      this.isLoaded = false
      const query = {
        region: this.selectedRegion,
        agegroup: this.selectedAgeGroup,
        year: this.selectedYear,
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/eventmatches?${queryString}`)
        .then((response) => {
          this.matchList = response.data.eventMatches
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isLoaded = true;
        });
    },
    retrieveRegions() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxRegionsPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/regions?${queryString}`)
        .then((response) => {
          this.RegionList = response.data.regions;
        })
    },
    setPage(page) {
      this.page = page
      this.retrieveEventMatch()
    },
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>