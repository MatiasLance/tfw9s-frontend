<template>
  <OModal :active="active" :width="'960px'" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="text-brand-black mb-3 font-bold">
                    Edit Player
                </h3>
                <hr class="my-3 lg:w-[918px]"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-2 md:col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Contact First Name *
                    </label>
                    <VTextField
                    id="title"
                    v-model="SeriesData.contact_firstname"
                    label="Contact First Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Contact Last Name *
                    </label>
                    <VTextField
                    id="title"
                    v-model="SeriesData.contact_lastname"
                    label="Contact Last Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Phone *
                    </label>
                    <div class="flex w-full">
                      <VTextField
                        v-model="phoneCode"
                        type="text"
                        class="w-4"
                        solo
                        disabled
                      />
                      <VTextField
                        v-model="phoneDigits"
                        label="Phone Number"
                        :rules="rules"
                        type="number"
                        solo
                      />
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="teamname">
                        Email *
                      </label>
                      <VTextField
                      id="title"
                      v-model="SeriesData.email"
                      label="Email"
                      :rules="rules"
                      type="email"
                      solo
                      />
                    </div>
                  </div>
                  <hr class="col-span-2" />
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="teamname">
                        Player First Name *
                      </label>
                      <VTextField
                      id="title"
                      v-model="SeriesData.player_firstname"
                      label="Player First Name"
                      :rules="rules"
                      type="text"
                      solo
                      />
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="teamname">
                        Player Last Name *
                      </label>
                      <VTextField
                      id="title"
                      v-model="SeriesData.player_lastname"
                      label="Player Last Name"
                      :rules="rules"
                      type="text"
                      solo
                      />
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="selectseries" class="mb-1 block">
                        Select Series *
                      </label>
                      <VSelect
                        v-model="SeriesData.seriesID"
                        :items="formattedSeries"
                        label="Choose Series"
                        :rules="rules"
                        solo
                        @change="handleSelectChangeSeries"
                        >
                      </VSelect>
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <label for="selectdate" class="mb-1 block">
                      Date of Birth *
                    </label>
                    <ODatepicker
                    v-model="selectedDate"
                    icon="calendar"
                    :rules="rules"
                    />
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="selectagegroup" class="mb-1 block">
                        Age Group:
                      </label>
                      <VSelect
                        v-model="SeriesData.agegroup_id"
                        :items="formattedAgeGroup"
                        label="Choose Age Group"
                        :rules="rules"
                        solo
                        >
                      </VSelect>
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="teamname">
                        Team Name *
                      </label>
                      <VSelect
                        v-model="SeriesData.teamId"
                        :items="formattedTeam"
                        label="Choose Team"
                        :rules="rules"
                        solo
                        >
                      </VSelect>
                    </div>
                  </div>
                </div>
                <div class="col-span-1 md:col-span-2">
                  <ImageUploadEdit
                    :imglistedit="imgListEdit"
                    :imgurledit="imgUrlEdit"
                     @update-image="updateImageEdit"
                  />
                </div>
                <hr class="my-3"/>
                <div class="flex flex-col justify-end gap-2 md:flex-row">
                  <VBtn
                  depressed
                  color="success"
                  class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                  :disabled="!valid"
                  @click="validate"
                  >
                    OK
                  </VBtn>
                  <VBtn
                  depressed
                  color="error"
                  class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                  @click="closeDialog"
                  >
                    Cancel
                  </VBtn>
                </div>
            </VForm>
        </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import ImageUploadEdit from '~/components/ImageUploadEdit'
import currencyMixin from '@/mixins/currency';

export default {
  name: 'EditPlayersModal',
  components: { ImageUploadEdit },
  mixins: [ currencyMixin ],
  props: {
    active: {
      type: Boolean,
      required: true
    },
    series: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      valid: true,
      showGenerateCreatedImageBtn: false,
      imgUrlEdit: [],
      imgListEdit: [],
      seriesList: [],
      teamList: [],
      ageGroupList: [],
      SeriesData: { agegroup_id: null },
      rules: [ value => !!value || 'Required' ],
      phoneCode: '+61',
      phoneDigits: '',
      selectedDate: '',
      team: [],
      ageGroup: [],
      loading: false
    }
  },
  computed: {
    phoneNumber: {
      get() {
        return `${this.phoneCode}${this.phoneDigits}`
      },
    },
    formattedSeries() {
      return this.seriesList.map(series =>
        ({
          text: `${this.capitalizeFirstLetter(series.name)}
          ${this.capitalizeFirstLetter(series.type)} Series`,
          value: series.id
        }));
    },
    formattedTeam() {
      return this.teamList.map(team =>
        ({
          text: `${this.capitalizeFirstLetter(team.name)}`,
          value: team.id
        }));
    },
    formattedAgeGroup() {
      return this.ageGroupList.map(ageGroup =>
        ({
          text: `${this.capitalizeFirstLetter(ageGroup.name)}`,
          value: ageGroup.id
        }));
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.SeriesData = { ...this.series };
          this.SeriesData.agegroup_id = this.series.agegroup_id || null;
          this.SeriesData.teamId = this.series.team_id || null;
          this.SeriesData.seriesID = this.series.series_id || null;
          this.imgUrlEdit = (this.series.media || []).map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`
          );
          this.imgListEdit = (this.series.media || []).map((x) => x.hash);
          this.selectedDate = this.series.dob ? new Date(this.series.dob) : null;
          this.phoneDigits = (this.SeriesData.phone_number || '').replace(/^\+61/, '') || '';

          if (this.SeriesData.seriesID) {
            this.retrieveSeries(this.SeriesData.seriesID);
          }
        }
      },
      immediate: true,
    },
    selectedDate: {
      handler(newDate) {
        if (newDate && this.active) {
          this.SeriesData.dob = this.DatePickerToSQL(newDate);
        }
      },
      immediate: true,
    },
  },
  created() {
    this.listOfSeriesData();
  },
  methods: {
    handleSelectChangeSeries(value) {
      if (!value) {
        this.teamList = []
        this.ageGroupList = []
        return
      }
      this.retrieveSeries(value)
    },

    retrieveSeries(id) {
      if (!id) {
        this.teamList = []
        this.ageGroupList = []
        return
      }

      this.loading = true
      this.$axios
        .$get(`v1/series/${id}`)
        .then((response) => {
          const series = response && response.data && response.data.series ?
            response.data.series : null

          const teams = (series && Array.isArray(series.team)) ? series.team : []


          this.teamList = teams

          const agegroups = teams.flatMap(t => t.agegroup ? [ t.agegroup ] : [])

          const deduped = []
          const seen = new Set()
          for (const ag of agegroups) {
            if (!ag || ag.id == null) continue
            if (!seen.has(ag.id)) {
              seen.add(ag.id)
              deduped.push(ag)
            }
          }
          this.ageGroupList = deduped

          if (this.SeriesData && this.SeriesData.teamId) {
            const foundTeam = this.teamList.find(t => t.id === this.SeriesData.teamId)
            if (!foundTeam) {
              this.SeriesData.teamId = null
            }
          }

          if (this.SeriesData && this.SeriesData.agegroup_id) {
            const foundAge = this.ageGroupList.find(a => a.id === this.SeriesData.agegroup_id)
            if (!foundAge) {
              this.SeriesData.agegroup_id = null
            }
          }
        })
        .catch((error) => {
          console.error('Failed to retrieve series:', error)
        })
        .finally(() => {
          this.loading = false
        })
    },

    capitalizeFirstLetter(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    },
    updateImageEdit(image) {
      this.imgListEdit = image
    },
    DatePickerToSQL(datestring) {
      if (!datestring) return '';
      const d = new Date(datestring);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
      } else if (!this.SeriesData.dob) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Please select Date of Birth.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (this.SeriesData.description === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Description should not be empty',
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
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirm() {
      this.editSeries()
      this.closeDialog()
    },
    editSeries() {
      this.SeriesData.phone_number = this.phoneNumber;
      const formData = new FormData();
      formData.append('contact_firstname', this.SeriesData.contact_firstname);
      formData.append('contact_lastname', this.SeriesData.contact_lastname);
      formData.append('phone_number', this.SeriesData.phone_number);
      formData.append('email', this.SeriesData.email);
      formData.append('player_firstname', this.SeriesData.player_firstname);
      formData.append('player_lastname', this.SeriesData.player_lastname);
      formData.append('teamID', this.SeriesData.teamId);
      formData.append('dob', this.SeriesData.dob);
      formData.append('agegroupID', this.SeriesData.agegroup_id);
      formData.append('description', this.SeriesData.description);
      formData.append('seriesID', this.SeriesData.seriesID);

      for (let i = 0; i < this.imgListEdit.length; i++) {
        formData.append('photo[]', this.imgListEdit[i]);
      }

      this.$axios
        .$post(`/v1/players/${this.series.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          this.$emit('confirm')
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            this.$router.push('/unauthorized');
          } else {
            console.error('Error:', error);
          }
        });
    },
    closeDialog() {
      this.$emit('close')
      this.reset()
      this.team = []
      this.ageGroup = []
    },
    reset() {
      this.SeriesData = { agegroup_id: null }
      this.selectedDate = null;
      this.imgList = []
      this.imgUrl = []
      this.imgListEdit = []
      this.imgUrlEdit = []
      this.showGenerateCreatedImageBtn = false
      this.teamList = []
      this.ageGroupList = []
    },
    handleCroppaFileSizeExceed(file) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'File size exceeds. Please choose a file smaller than 32mb.',
        position: 'bottom',
        variant: 'danger',
        queue: true,
      });
    },
    handleCroppaFileTypeMismatch(file) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Invalid file type. Please choose a jpeg, png or webp file.',
        position: 'bottom',
        variant: 'danger',
        queue: true,
      });
    },
    /* ADD IMAGE */
    zoomIn() {
      this.SeriesData.myImage.zoomIn();
    },
    zoomOut() {
      this.SeriesData.myImage.zoomOut();
    },
    rotateAnti() {
      this.SeriesData.myImage.rotate(-1);
    },
    rotate() {
      this.SeriesData.myImage.rotate();
    },
    flipx() {
      this.SeriesData.myImage.flipX();
    },
    flipy() {
      this.SeriesData.myImage.flipY();
    },
    setImagePreset() {
      const metadata = this.SeriesData.myImage.getMetadata()
      localStorage.setItem(
        'metadata',
        JSON.stringify(metadata)
      );
      this.applyMetadata()
      this.$oruga.notification.open({
        message: 'Image preset applied on proceeding uploads',
        variant: 'info',
        duration: 5000,
        position: 'bottom',
        queue: true,
      })
    },
    clearImagePreset() {
      localStorage.removeItem('metadata')
      this.applyMetadata()
    },
    applyMetadata() {
      this.$nextTick(() => {
        const jsonMetadata = localStorage.getItem('metadata')
        if (jsonMetadata !== null) {
          const metadata = JSON.parse(jsonMetadata);
          const currentMetadata = this.SeriesData.myImage.getMetadata()
          currentMetadata.orientation = metadata.orientation
          this.SeriesData.myImage.applyMetadata(currentMetadata);
        }
        // Force the canvas to update and display the metadata updates
        this.SeriesData.myImage.moveUpwards(1)
        this.SeriesData.myImage.moveDownwards(1)
      })
    },
    generateImage() {
      this.SeriesData.myImage.generateBlob(
        (blob) => {
          this.imgUrl.splice(0, 1, URL.createObjectURL(blob));
          this.imgList.splice(0, 1, blob);
        },
      );
      this.SeriesData.myImage.remove();
    },
    /** REMOVE IMAGE IN IMGURL AND IMGLIST */
    removeImage(index) {
      this.imgUrl.splice(index, 1)
      this.imgList.splice(index, 1)
    },
    handleNewImageCreate() {
      this.showGenerateCreatedImageBtn = true;
    },
    handleImageRemoveCreate() {
      this.showGenerateCreatedImageBtn = false;
    },
    listOfSeriesData() {
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
          const series = (response && response.data && response.data.series) ?
            response.data.series : [];
          this.seriesList = series;
          this.teamList = series.flatMap(s => s.team || []);
          this.ageGroupList = this.teamList.flatMap(t => t.agegroup ? [ t.agegroup ] : []);

          if (this.SeriesData && this.SeriesData.seriesID) {
            this.retrieveSeries(this.SeriesData.seriesID)
          }
        })
        .catch((err) => {
          console.error('Failed to fetch series list:', err)
        })
    }
  }
}
</script>


<style scoped>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1C1B1C;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
> .v-input__control > .v-input__slot {
box-shadow: none;
border: 1px rgb(243 244 246 / var(--tw-border-opacity));
background-color: rgb(243 244 246 / var(--tw-bg-opacity));
padding: 0.5rem 0.75rem;
width: 100%;
appearance: none;
border-radius: 0;
transition: border-color 0.3s;
}

::v-deep .v-text-field input::label {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
  height: 50px !important;
}

::v-deep .o-input {
  box-shadow: none !important;
  border: 1px rgb(243 244 246 / var(--tw-border-opacity)) !important;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity)) !important;
  height: 2.75rem;
  width: 100% !important;
  appearance: none !important;
  border-radius: 0 !important;
  transition: border-color 0.3s !important;
}

::v-deep input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>

