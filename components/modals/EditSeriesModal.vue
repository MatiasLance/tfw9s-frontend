<template>
  <OModal :active="active" :width="'960px'" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="text-brand-black mb-3 font-bold">
                    Edit Series
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
                    label="Enter Team Name"
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
                    <label for="daterange" class="mb-1 block">
                      Date Range:
                    </label>
                    <ODatepicker
                      v-model="selectedDateRange"
                      range
                      :rules="rules"
                      label="Click to select start date, then end date"
                      icon="calendar"
                    />
                  </div>
                  <div class="col-span-1">
                    <label
                      for="price"
                      class="mb-1 flex justify-between"
                    >
                      <p>Registration Fee: </p>
                      <span class="font-semibold">
                        {{formatCurrency(SeriesData.price) }}
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
                  <ImageUploadEdit
                    :imglistedit="imgListEdit"
                    :imgurledit="imgUrlEdit"
                    @update-image-edit="updateImageEdit"
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
import currencyMixin from '~/mixins/currency/handlesCurrency'

export default {
  name: 'EditSeriesModal',
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
      selectedDateRange: [],
      showGenerateCreatedImageBtn: false,
      imgUrlEdit: [],
      imgListEdit: [],
      SeriesData: {
        name: null,
        description: null,
        start: null,
        end: null,
        price: null,
        address: null,
        type: null,
        media: [],
      },
      SeriesList: [
        { text: 'Weekly Competitions', value: 'weekly' },
        { text: 'Tournaments', value: 'tournament' },
        { text: 'Central Coast', value: 'coast' },
      ],
      rules: [ value => !!value || 'Required' ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          if (newActive) {
            this.SeriesData = { ...this.series };

            this.SeriesData.price = this.series.price / 100;

            const startDate = new Date(this.series.start);
            const endDate = new Date(this.series.end);

            startDate.setHours(12, 0, 0, 0);
            endDate.setHours(12, 0, 0, 0);
            this.selectedDateRange = [ startDate, endDate ];
            this.imgUrlEdit = this.SeriesData.media.map((x) =>
              `${this.$config.baseURL}/storage/${x.path}`
            );
            this.imgListEdit = this.SeriesData.media.map((x) => x.hash);
          }
        }
      },
      immediate: true,
    },
    selectedDateRange: {
      handler(newRange) {
        if (newRange && newRange.length === 2) {
          const [ startDate, endDate ] = newRange;

          // Create new Date objects to avoid reference issues
          const sDate = new Date(startDate);
          const eDate = new Date(endDate);

          // Set time to noon to avoid timezone issues
          sDate.setHours(12, 0, 0, 0);
          eDate.setHours(12, 0, 0, 0);

          this.SeriesData.start = sDate;
          this.SeriesData.end = eDate;
        }
      }
    }
  },
  methods: {
    updateImageEdit(image) {
      this.imgListEdit = image
    },
    DatePickerToSQL(datestring) {
      if (!datestring || !(datestring instanceof Date) || isNaN(datestring.getTime())) {
        console.error('Invalid date:', datestring);
        return null;
      }

      // Create date in local timezone to avoid timezone issues
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
      } else if (!this.SeriesData.start && !this.SeriesData.end) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Please select for start and end dates.',
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
    async confirm() {
      await this.editSeries()
      this.closeDialog()
    },
    async editSeries() {
      const formData = new FormData();
      formData.append('type', this.SeriesData.type);
      formData.append('name', this.SeriesData.name);
      formData.append('description', this.SeriesData.description);
      formData.append('address', this.SeriesData.address);
      formData.append('start', this.DatePickerToSQL(this.SeriesData.start));
      formData.append('end', this.DatePickerToSQL(this.SeriesData.end));
      formData.append('price', this.SeriesData.price*100);

      for (let i = 0; i < this.imgListEdit.length; i++) {
        formData.append('photo[]', this.imgListEdit[i]);
      }

      try {
        await this.$axios.$post(`v1/series/${this.series.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        this.reset();
        this.$emit('confirm')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$router.push('/unauthorized');
        } else {
          console.error('Error:', error);
        }
      }
    },
    closeDialog() {
      this.SeriesData.price = this.series.price*100
      this.$emit('close')
      this.reset()
    },
    reset() {
      this.SeriesData = {
        name: null,
        description: null,
        start: null,
        end: null,
        price: null,
        address: null,
        type: null,
        media: [],
      }
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

::v-deep input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>

