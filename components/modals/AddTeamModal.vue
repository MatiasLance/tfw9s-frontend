<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="text-brand-black mb-3 font-bold">
                    Add Team
                </h3>
                <hr class="my-3 lg:w-[918px]"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Name:
                    </label>
                    <VTextField
                      id="title"
                      v-model="TeamData.name"
                      label="Enter Team Name"
                      :rules="rules"
                      type="text"
                      solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="selectevent" class="mb-1 block">
                      Series:
                    </label>
                    <VSelect
                      v-model="TeamData.series_id"
                      :items="formattedSeries"
                      label="Choose Series"
                      :rules="rules"
                      solo
                    >
                    </VSelect>
                  </div>

                  <div class="col-span-1">
                    <label for="selectagegroup" class="mb-1 block">
                      Age Group:
                    </label>
                    <VSelect
                      v-model="TeamData.agegroup_id"
                      :items="formattedAgeGroup"
                      label="Choose Age Group"
                      :rules="rules"
                      solo
                    >
                    </VSelect>
                  </div>

                  <div class="col-span-1">
                    <label for="region" class="mb-1 block">
                      Region:
                    </label>
                    <VSelect
                      v-model="TeamData.region_id"
                      :items="formattedRegions"
                      label="Choose Region"
                      :rules="rules"
                      solo
                    >
                    </VSelect>
                  </div>
                  <div class="col-span-1 md:col-span-2" hidden>
                    <label for="teamname" class="mb-1 block">
                      Coach Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="TeamData.coach_name"
                    label="Enter Coach Name"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1" hidden>
                    <label for="teamname" class="mb-1 block">
                      Coach Mobile Number:
                    </label>
                    <VTextField
                    id="number"
                    v-model="TeamData.coach_mobile"
                    label="Enter Mobile Number"
                    type="number"
                    solo
                    />
                  </div>
                  <div class="col-span-1" hidden>
                    <label for="teamname" class="mb-1 block">
                      Coach Email:
                    </label>
                    <VTextField
                    id="email"
                    v-model="TeamData.coach_email"
                    label="Enter Coach Email"
                    type="email"
                    solo
                    />
                  </div>
                  <div class="col-span-1 md:col-span-2" hidden>
                    <label for="teamname" class="mb-1 block">
                      Manager Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="TeamData.manager_name"
                    label="Enter Manager Name"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1" hidden>
                    <label for="teamname" class="mb-1 block">
                      Manager Mobile Number:
                    </label>
                    <VTextField
                    id="number"
                    v-model="TeamData.manager_mobile"
                    label="Enter Mobile Number"
                    type="number"
                    solo
                    />
                  </div>
                  <div class="col-span-1" hidden>
                    <label for="teamname" class="mb-1 block">
                      Manager Email:
                    </label>
                    <VTextField
                    id="email"
                    v-model="TeamData.manager_email"
                    label="Enter Manager Email"
                    type="email"
                    solo
                    />
                  </div>
                  <div class="col-span-1 md:col-span-2" hidden>
                    <label for="photo" class="mb-1 block">
                        Image upload:
                    </label>
                    <!-- Insert myCroppa here -->
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div class="col-span-1">
                        <Croppa
                          v-model="TeamData.myImage"
                          :width="320"
                          :height="320"
                          :quality="5"
                          label="Place image here"
                          :label-font-size="15"
                          accept=".png, .webp, .jpeg, .jpg"
                          :file-size-limit="31457280"
                          :zoom-speed="5"
                          :prevent-white-space="false"
                          :show-loading="true"
                          initial-size="contain"
                          @file-size-exceed="handleCroppaFileSizeExceed"
                          @file-type-mismatch="handleCroppaFileTypeMismatch"
                          @new-image-drawn="handleNewImageCreate"
                          @image-remove="handleImageRemoveCreate"
                          @loading-end="applyMetadata"
                        >
                        </Croppa>
                        
                        <!-- START: Responsive Button Changes -->
                        <!-- This container allows buttons to wrap on small screens -->
                        <div class="mt-2 flex flex-wrap items-center gap-2">
                            <VBtn small @click="rotateAnti">
                                <i class="ri-anticlockwise-line"></i>
                            </VBtn>
                            <VBtn small @click="rotate">
                                <i class="ri-clockwise-line"></i>
                            </VBtn>
                            <VBtn small @click="flipx">
                                <i class="ri-arrow-left-right-line"></i>
                            </VBtn>
                            <VBtn small @click="flipy">
                                <i class="ri-arrow-up-down-line"></i>
                            </VBtn>
                            <VBtn small @click="zoomIn">
                                <i class="ri-zoom-in-line"></i>
                            </VBtn>
                            <VBtn small @click="zoomOut">
                                <i class="ri-zoom-out-line"></i>
                            </VBtn>
                            <VBtn small plain @click="setImagePreset">
                                set
                            </VBtn>
                            <VBtn small plain @click="clearImagePreset">
                                clr
                            </VBtn>
                        </div>
                        
                        <VBtn
                        v-if="showGenerateCreatedImageBtn"
                        dark
                        large
                        class="from-brand-black to-brand-black bg-gradient-to-r"
                        @click="generateImage"
                        >
                          GENERATE
                        </VBtn>
                        <!-- END: Responsive Button Changes -->

                      </div>
                      <div class="col-span-1 max-h-[320px] max-w-[320px]">
                        <div
                            v-for="(photo, photoIndex) in imgUrl"
                            :key="photo"
                            class="relative flex justify-center gap-1"
                        >
                        <VImg :src="photo"></VImg>
                        <button
                            type="button"
                            class="
                            text-brand-lgrey
                            hover:bg-brand-black absolute
                            left-0
                            my-2 h-6
                            w-6
                            shadow-sm
                            hover:text-white
                            "
                            @click="removeImage(photoIndex)"
                        >
                            <div class="ri-close-fill ri-lg"></div>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-3"/>
               <div class="flex flex-col justify-end gap-2 md:flex-row">
                  <VBtn
                  depressed
                  color="success"
                  class="custom-btn w-full md:w-[185px]"
                  :disabled="!valid"
                  @click="validate"
                  >
                    OK
                  </VBtn>
                  <VBtn
                  depressed
                  color="error"
                  class="custom-btn w-full md:w-[185px]"
                  @click="closeDialog"
                  >
                    Cancel
                  </VBtn>
                </div>
                <!-- END: Responsive Button Changes -->
            </VForm>
        </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';

export default {
  name: 'AddTeamModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    fromRegion: {
      type: Boolean,
      default: false
    },
    field: {
      type: Array,
      required: true
    },
    agegroup: {
      type: Array,
      required: true,
      default: () => []
    },
    series: {
      type: Array,
      required: true
    },
    regions: {
      type: Array,
      required: true,
      default: () => []
    },
    initialRegionId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      fieldQuery: '',
      valid: true,
      showGenerateCreatedImageBtn: false,
      imgUrl: [],
      imgList: [],
      TeamData: {
        name: null,
        agegroup_id: null,
        series_id: null,
        region_id: this.initialRegionId || null,
        coach_name: null,
        coach_mobile: null,
        coach_email: null,
        manager_name: null,
        manager_mobile: null,
        manager_email: null,
        type: 'default'
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedField() {
      return this.field.map(field =>
        ({ text: field.name, value: field.id }));
    },
    formattedAgeGroup() {
      if (!Array.isArray(this.agegroup)) return [];
      return this.agegroup.map(agegroup => 
        ({ text: agegroup.name || '', value: parseInt(agegroup.id || 0) }));
    },
    formattedSeries() {
      if (!this.series || this.series.length === 0) {
        return [];
      }
      return this.series.map(series => ({
        text: series.name,
        value: series.id,
      }));
    },
    formattedRegions() {
      try {
        const regionsData = this.regions.map(item => {
          // Add null checks for region properties
          if (item.id && item.name) {
            return {
              text: item.name,
              value: item.id
            };
          }
          if (item.data && item.data.id && item.data.name) {
            return {
              text: item.data.name,
              value: item.data.id
            };
          }
          return null;
        }).filter(Boolean); // Remove any null entries
        return regionsData;
      } catch (error) {
        console.error('Error formatting regions:', error);
        return [];
      }
    },
    filteredField() {
      return this.formattedField.filter(field =>
        field && field.text && typeof field.text === 'string' ?
          field.text.toLowerCase().includes(this.fieldQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    'TeamData.series_id'(newVal, oldVal) {
      if (newVal) {
        this.retrieveTeamLimits();
      }
    },
  },
  methods: {
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
      } else if (this.TeamData.description === '') {
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
      this.addTeam()
      this.closeDialog()
    },
    addTeam() {
      const formData = new FormData();
      const coachData = {
        name: this.TeamData.coach_name,
        mobile: this.TeamData.coach_mobile,
        email: this.TeamData.coach_email
      };

      const managerData = {
        name: this.TeamData.manager_name,
        mobile: this.TeamData.manager_mobile,
        email: this.TeamData.manager_email
      };
      formData.append('name', this.TeamData.name);
      formData.append('agegroup_id', parseInt(this.TeamData.agegroup_id));
      formData.append('series_id', this.TeamData.series_id);
      formData.append('region_id', this.TeamData.region_id);
      formData.append('coach', JSON.stringify(coachData));
      formData.append('manager', JSON.stringify(managerData));
      formData.append('type', this.TeamData.type || 'default');

      for (let i = 0; i < this.imgList.length; i++) {
        formData.append('photo[]', this.imgList[i], 'gymThumbnail.png');
      }

      this.$axios
        .$post('v1/teams', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          this.$emit('confirm', response);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            this.$router.push('/unauthorized');
          } else {
            console.error('Error:', error);
            this.$emit('confirm', {
              success: false,
              message: error.response.data.message || 'Failed to add team'
            });
          }
        });
    },
    closeDialog() {
      this.$emit('close')
      this.reset()
    },
    reset() {
      this.TeamData = []
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
      this.TeamData.myImage.zoomIn();
    },
    zoomOut() {
      this.TeamData.myImage.zoomOut();
    },
    rotateAnti() {
      this.TeamData.myImage.rotate(-1);
    },
    rotate() {
      this.TeamData.myImage.rotate();
    },
    flipx() {
      this.TeamData.myImage.flipX();
    },
    flipy() {
      this.TeamData.myImage.flipY();
    },
    setImagePreset() {
      const metadata = this.TeamData.myImage.getMetadata()
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
          const currentMetadata = this.TeamData.myImage.getMetadata()
          currentMetadata.orientation = metadata.orientation
          this.TeamData.myImage.applyMetadata(currentMetadata);
        }
        // Force the canvas to update and display the metadata updates
        this.TeamData.myImage.moveUpwards(1)
        this.TeamData.myImage.moveDownwards(1)
      })
    },
    generateImage() {
      this.TeamData.myImage.generateBlob(
        (blob) => {
          this.imgUrl.splice(0, 1, URL.createObjectURL(blob));
          this.imgList.splice(0, 1, blob);
        },
      );
      this.TeamData.myImage.remove();
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
    retrieveTeamLimits() {
      this.$axios
        .$get(`v1/teamlimit/${this.TeamData.series_id}`)
        .then((response) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.agegroup = response.data
            .filter(limit => limit.is_selected === 1)
            .map(limit => limit.age_groups)
            .flat();
        })
    },
  },
  mounted() {
    if (this.fromRegion && this.initialRegionId) {
      this.TeamData.region_id = this.initialRegionId;
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
</style>