<template>
  <OModal :active="active" @close="closeDialog" :width="'960px'">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Add Series
                </h3>
                <hr class="my-3 lg:w-[918px]"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Title:
                    </label>
                    <VTextField
                    id="title"
                    v-model="SeriesData.name"
                    label="Enter Event Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="selecttype" class="mb-1 block">
                      Type:
                    </label>
                    <VSelect
                    v-model="SeriesData.type"
                    :items="SeriesList"
                    label="Choose Category"
                    :rules="rules"
                    solo
                    >
                    </VSelect>
                  </div>
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Location:
                    </label>
                    <VTextField
                    id="address"
                    v-model="SeriesData.address"
                    name="address"
                    label="Enter Event Address"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="selectdate" class="mb-1 block">
                      Event Dates:
                    </label>
                    <ODatepicker
                      v-model="dateRange"
                      range
                      :rules="rules"
                      label="Click to select start date, then end date"
                      icon="calendar"
                      @input="handleDateRangeChange"
                    />
                  </div>
                  <div class="col-span-1">
                    <label
                      for="price"
                      class="mb-1 flex justify-between"
                    >
                      <p>Registration Fee: </p>
                      <span class="font-semibold">
                        {{ formatCurrency(SeriesData.price) }}
                      </span>
                    </label>
                    <VTextField
                      id="name"
                      v-model="SeriesData.price"
                      label="Enter Fee"
                      :rules="rules"
                      type="number"
                      step=".01"
                      min="0.00"
                      solo
                    />
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
                <div class="col-span-1 md:col-span-2">
                  <ImageUpload
                     @update-image="updateImage"
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
import ImageUpload from '~/components/ImageUpload'
import currencyMixin from '@/mixins/currency/handlesCurrency';

export default {
  name: 'AddSeriesModal',
  components: { ImageUpload },
  mixins: [ currencyMixin ],
  props: {
    active: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      valid: true,
      showGenerateCreatedImageBtn: false,
      imgUrl: [],
      imgList: [],
      dateRange: [],
      SeriesData: {
        name: null,
        description: null,
        ageGroup: '',
        start: null,
        end: null,
        type: null,
        address: null,
        price: null
      },
      SeriesList: [
        { text: 'Weekly Competitions', value: 'weekly' },
        { text: 'Tournaments', value: 'tournament' },
        { text: 'Central Coast', value: 'coast' },
      ],
      rules: [ value => !!value || 'Required' ],
      dateRules: [ value => (value && value.length === 2) || 'Please select both start and end dates' ]
    }
  },
  methods: {
    handleDateRangeChange(newDates) {
      if (newDates && newDates.length === 2) {
        const [ startDate, endDate ] = newDates;
        try {
          const sDate = new Date(startDate);
          sDate.setHours(12, 0, 0, 0);
      
          const eDate = new Date(endDate);
          eDate.setHours(12, 0, 0, 0);

          if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) {
            throw new TypeError('Invalid date values');
          }

          if (sDate > eDate) {
            this.$oruga.notification.open({
              message: 'End date must be after start date',
              variant: 'danger',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
            this.SeriesData.start = null;
            this.SeriesData.end = null;
            this.dateRange = [];
            return;
          }

          this.SeriesData.start = sDate;
          this.SeriesData.end = eDate;
          this.dateRange = [ sDate, eDate ];
        } catch (error) {
          console.error('Date handling error:', error);
          this.SeriesData.start = null;
          this.SeriesData.end = null;
          this.dateRange = [];
        }
      } else {
        this.SeriesData.start = null;
        this.SeriesData.end = null;
      }
    },
    updateImage(image) {
      this.imgList = image
    },
    DatePickerToSQL(datestring) {
      if (!datestring ||
          !(datestring instanceof Date) ||
          isNaN(datestring.getTime())) {
        console.error('Invalid date:', datestring);
        return null;
      }

      const year = datestring.getFullYear();
      const month = String(datestring.getMonth() + 1).padStart(2, '0');
      const day = String(datestring.getDate()).padStart(2, '0');

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
      }

      if (!this.dateRange || this.dateRange.length !== 2) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Please select both start and end dates.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      }

      if (this.SeriesData.description === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Description should not be empty',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      }

      this.confirm();
      return true;
    },

    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirm() {
      this.addSeries()
      this.closeDialog()
    },
    addSeries() {
      const startDate = this.DatePickerToSQL(this.SeriesData.start);
      const endDate = this.DatePickerToSQL(this.SeriesData.end);
      // Check if date conversion was successful
      if (!startDate || !endDate) {
        this.$oruga.notification.open({
          message: 'Invalid date format - please reselect dates',
          variant: 'danger',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
        return;
      }

      const formData = new FormData();
      formData.append('type', this.SeriesData.type);
      formData.append('name', this.SeriesData.name);
      formData.append('description', this.SeriesData.description);
      formData.append('address', this.SeriesData.address);
      formData.append('start', startDate);
      formData.append('end', endDate);
      formData.append('price', this.currencyToCents(this.SeriesData.price));

      for (let i = 0; i < this.imgList.length; i++) {
        formData.append('photo[]', this.imgList[i], 'newsThumbnail.png');
      }

      this.$axios
        .$post('v1/series', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          this.$emit('confirm', response.data); // Pass the response data to parent
          this.$oruga.notification.open({
            message: 'Series added successfully!',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        })
        .catch((error) => {
          let errorMessage = 'Failed to add series';
          if (error.response) {
            if (error.response.status === 403) {
              this.$router.push('/unauthorized');
              return;
            }
            errorMessage = error.response.data.message || errorMessage;
          }
          this.$oruga.notification.open({
            message: errorMessage,
            variant: 'danger',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          console.error('API Error:', error);
        });
    },
    closeDialog() {
      this.$emit('close')
      this.reset()
    },
    reset() {
      this.SeriesData = {
        name: null,
        description: null,
        type: null,
        address: null,
        start: null,
        end: null,
        price: null
      };
      this.dateRange = [];
      this.imgList = [];
      this.imgUrl = [];
      this.showGenerateCreatedImageBtn = false;
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