<template>
  <OModal :active="active" @close="closeDialog" :width="'960px'">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Edit Players
                </h3>
                <hr class="my-3 lg:w-[918px]"/>
                {{ series }}
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-2 md:col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Contact First Name *
                    </label>
                    <VTextField
                    v-model="SeriesData.contact_firstname"
                    id="title"
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
                    v-model="SeriesData.contact_lastname"
                    id="title"
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
                        v-model="SeriesData.phone_number"
                        label="Phone Number"
                        :rules="rules"
                        type="text"
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
                      v-model="SeriesData.email"
                      id="title"
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
                      v-model="SeriesData.player_firstname"
                      id="title"
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
                      v-model="SeriesData.player_lastname"
                      id="title"
                      label="Player Last Name"
                      :rules="rules"
                      type="text"
                      solo
                      />
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="col-span-1">
                      <label for="teamname">
                        Team Name *
                      </label>
                      <VTextField
                      v-model="SeriesData.team_name"
                      id="title"
                      label="Team Name"
                      :rules="rules"
                      type="text"
                      solo
                      />
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <label for="selectdate" class="mb-1 block">
                      Date of Birth *
                    </label>
                    <ODatepicker
                    :value="selectedDate"
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
                        v-model="SeriesData.agegroup"
                        :items="AgeGroupList"
                        label="Choose Age Group"
                        :rules="rules"
                        solo
                        >
                      </VSelect>
                    </div>
                  </div>
                  <div class="col-span-1 md:col-span-2">
                    <label for="teamdescription" class="mb-1 block">
                      Description:
                    </label>
                    <VTextarea
                      id="name"
                      v-model="SeriesData.description"
                      label="Enter Event Description"
                      :rules="rules"
                      type="text"
                      solo
                    />
                  </div>
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
import currencyMixin from '@/mixins/currency';

export default {
  name: 'EditPlayersModal',
  mixins: [ currencyMixin ],
  props: {
    active: {
      type: Boolean,
      required: true
    },
    agegroup: {
      type: Array,
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
      SeriesData: {
        name: null,
        description: null
      },
      AgeGroupList: [
        { text: 'Under 6', value: 'Under 6' },
        { text: 'Under 7', value: 'Under 7' },
        { text: 'Under 8', value: 'Under 8' },
        { text: 'Under 9', value: 'Under 9' },
        { text: 'Under 10', value: 'Under 10' },
        { text: 'Under 11', value: 'Under 11' },
      ],
      rules: [ value => !!value || 'Required' ],
      phoneCode: '+61',
      phoneDigits: '',
      selectedDate: '',
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.SeriesData = this.series;
          this.selectedDate = new Date(this.SeriesData.dob);
        }
      },
      immediate: true,
    },
  },
  computed: {
    phoneNumber: {
      get() {
        return `${this.phoneCode}${this.phoneDigits}`
      },
    },
    formattedAgeGroup() {
      return this.agegroup.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.max_age }));
    },
  },
  methods: {
    updateImageEdit(image) {
      this.imgListEdit = image
    },
    DatePickerToSQL(datestring) {
      let eventYear = datestring.getUTCFullYear();
      let eventMonth = datestring.getUTCMonth() + 1;
      let eventDay = datestring.getUTCDate(); // Get day

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
      const eventMonthStr = eventMonth.toString().padStart(2, '0');
      const eventDayStr = eventDay.toString().padStart(2, '0');
      const event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;

      return event_date;
    },
    validate() {
      console.log(this.SeriesData)
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
      const formData = new FormData();
      formData.append('contact_firstname', this.SeriesData.contact_firstname);
      formData.append('contact_lastname', this.SeriesData.contact_lastname);
      formData.append('phone_number', this.SeriesData.phone_number);
      formData.append('email', this.SeriesData.email);
      formData.append('player_firstname', this.SeriesData.player_firstname);
      formData.append('player_lastname', this.SeriesData.player_lastname);
      formData.append('team_name', this.SeriesData.team_name);
      formData.append('dob', this.SeriesData.dob);
      formData.append('agegroup', this.SeriesData.agegroup);
      formData.append('description', this.SeriesData.description);

      for (let i = 0; i < this.imgListEdit.length; i++) {
        formData.append('photo[]', this.imgListEdit[i]);
      }

      this.$axios
        .$post(`/v1/players/${this.series.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          console.log('Success')
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
    },
    reset() {
      this.SeriesData = []
      this.imgList = []
      this.imgUrl = []
      this.showGenerateCreatedImageBtn = false
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
</style>

