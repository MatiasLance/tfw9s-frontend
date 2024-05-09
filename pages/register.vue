<template>
  <div  class="w-screen min-h-screen bg-[#1A1A1B]">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10"
          data-aos="fade-right"
      >
        <span
          color="white"
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          Register
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12" data-aos="fade-up">
      <VForm ref="form" v-model="valid" lazy-validation>
      <div
      class="grid grid-cols-1 gap-4 rounded-md bg-[#212121] p-4 md:grid-cols-2"
      >
      <div class="col-span-1">
        <label for="selectfield" class="mb-2 block text-white">
          Tournament:
        </label>
        <VSelect
        v-model="series"
        :items="filteredSeries"
        :hint="serieshint"
        label="Select Tournament"
        :rules="rules"
        :disabled="true"
        persistent-hint
        dark
        outlined
        >
          <template #prepend-item>
            <div class="sticky-search-bar px-3">
              <SearchBar v-model="seriesQuery" />
            </div>
          </template>
        </VSelect>
      </div>
      <div class="col-span-1">
        <label for="selectfield" class="mb-2 block text-white">
          Event:
        </label>
        <VSelect
        v-model="event"
        :items="formattedEvent"
        label="Select Event"
        :rules="rules"
        dark
        outlined
        >
          <template #prepend-item>
            <div class="sticky-search-bar px-3">
              <SearchBar v-model="eventQuery" />
            </div>
          </template>
        </VSelect>
      </div>
      <div class="col-span-1 md:col-span-2">
        <label for="teamname" class="mb-2 block text-white">
          Team Name:
        </label>
        <VTextField
        id="title"
        v-model="RegisterData.name"
        label="Enter Team Name"
        :rules="rules"
        type="text"
        dark
        outlined
        />
      </div>
      <div class="col-span-1 md:col-span-2">
        <label for="teamname" class="mb-2 block text-white">
          Coach Name:
        </label>
        <VTextField
        id="name"
        v-model="RegisterData.coach_name"
        label="Enter Coach Name"
        :rules="rules"
        type="text"
        dark
        outlined
        />
      </div>
      <div class="col-span-1">
        <label for="teamname" class="mb-2 block text-white">
          Coach Mobile Number:
        </label>
        <VTextField
        id="number"
        v-model="RegisterData.coach_mobile"
        label="Enter Mobile Number"
        :rules="rules"
        type="tel"
        dark
        outlined
        />
      </div>
      <div class="col-span-1">
        <label for="teamname" class="mb-2 block text-white">
          Coach Email:
        </label>
        <VTextField
        id="email"
        v-model="RegisterData.coach_email"
        label="Enter Coach Email"
        :rules="rules"
        type="email"
        dark
        outlined
        />
      </div>
      <div class="col-span-1 md:col-span-2">
        <label for="teamname" class="mb-2 block text-white">
          Manager Name:
        </label>
        <VTextField
        id="name"
        v-model="RegisterData.manager_name"
        label="Enter Manager Name"
        :rules="rules"
        type="text"
        dark
        outlined
        />
      </div>
      <div class="col-span-1">
        <label for="teamname" class="mb-2 block text-white">
          Manager Mobile Number:
        </label>
        <VTextField
        id="number"
        v-model="RegisterData.manager_mobile"
        label="Enter Mobile Number"
        :rules="rules"
        type="tel"
        dark
        outlined
        />
      </div>
      <div class="col-span-1">
        <label for="teamname" class="mb-2 block text-white">
          Manager Email:
        </label>
        <VTextField
        id="email"
        v-model="RegisterData.manager_email"
        label="Enter Manager Email"
        :rules="rules"
        type="email"
        dark
        outlined
        />
      </div>
      <NuxtLink
      :to="'/tournaments'"
      class="col-span-1"
      >
      <span
      class="
        inline-block
        w-full
        rounded-lg
        bg-[#212121] text-[#999999]
        border-2
        border-[#414141]
        py-3
        px-4
        text-center text-lg
        font-medium
        shadow-sm
        hover:text-white
        hover:bg-[#414141]
        transition
      "
    >
      Back to Tournaments
    </span>
    </NuxtLink>
    <button
    type="button"
    class="
    inline-block
    col-span-1
    select-none
    border border-transparent
    from-40% via-95% to-100%
    bg-gradient-to-tr
    from-[#5EE738]
    via-[#3e872a]
    to-[#050505]
    rounded-lg
    py-3
    px-4
    text-center text-lg
    font-medium
    text-white
    hover:brightness-125
    transition
  "
  :disabled="!valid"
  @click="validate"
    >
      Proceed to Payment
  </button>
      </div>
      </VForm>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      valid: false,
      RegisterData: [],
      series: null,
      event: null,
      serieshint: '',
      EventList: [],
      SeriesList: [],
      seriesQuery: '',
      eventQuery: '',
      rules: [ value => !!value || 'Required' ],
    };
  },
  computed: {
    formattedEvent() {
      return this.EventList.map(x => ({
        text: `${x.name} - ${x.agename}`,
        value: x.id,
        disabled: x.team.length >= x.teamcount,
      }));
    },
    formattedSeries() {
      return this.SeriesList.map(series => ({
        text: series.name,
        value: series.id,
      }));
    },
    filteredSeries() {
      return this.formattedSeries.filter(series =>
        series && series.text && typeof series.text === 'string' ?
          series.text.toLowerCase().includes(this.seriesQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    series: {
      handler(newseries) {
        let data = []
        data = this.SeriesList.find(x => x.id === newseries);
        this.serieshint = this.seriesType(data.type) ?? '';
        console.log('Series Data: ', data)

        this.EventList = data.event.map(x => {
          return { ...x, agename: x.agegroup.name??'???' }
        });
      },
      deep: true
    },
  },
  created() {
    this.retrieveSeries()
  },
  methods: {
    seriesType(type) {
      if (type === 'weekly') {
        return 'Weekly Competitions'
      } else if (type === 'tournament') {
        return 'Tournaments'
      } else if (type === 'coast') {
        return 'Central Coast'
      } else {
        return false
      }
    },
    validate() {
      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.confirm();
        return true;
      }
    },
    confirm() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in Progress...',
        position: 'bottom',
        variant: 'info',
        queue: true,
      });
      console.log(this.RegisterData, this.series, this.event)
    },
    retrieveSeries() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/series?${queryString}`)
        .then((response) => {
          this.SeriesList = response.data.series;
        })
        .finally(() => {
          this.series = parseInt(this.$route.query.id);
        });
    },
  }
};
</script>
