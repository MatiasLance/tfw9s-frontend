<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-white
    to-green-50/30 p-6 shadow-2xl sm:p-8">
      <!-- Header -->
      <div class="mb-6 text-center">
        <div class="mb-3 flex justify-center">
          <div class="flex size-12 items-center justify-center rounded-full
          bg-gradient-to-r from-green-600 to-green-700">
            <i class="ri-team-line text-xl text-white"></i>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">
          {{ team.id ? 'Update Team' : 'Create New Team' }}
        </h3>
        <p class="mt-2 text-gray-600">
          {{ team.id ? 'Edit your rugby team details' : 
          'Build your rugby squad for the tournament' }}
        </p>
      </div>

      <VForm ref="form" v-model="valid" lazy-validation>
        <!-- Form Content -->
        <div class="max-h-[60vh] space-y-6 overflow-y-auto px-1 py-2">
          <!-- Basic Information Section -->
          <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50">
            <h4 class="mb-4 flex items-center gap-2 text-lg font-semibold
            text-gray-800">
              <i class="ri-information-line text-green-600"></i>
              Basic Information
            </h4>
            
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <!-- Team Name -->
              <div class="col-span-1 md:col-span-2">
                <label class="mb-2 flex items-center gap-2 text-sm font-medium
                text-gray-700">
                  <i class="ri-hashtag text-green-600"></i>
                  Team Name
                </label>
                <VTextField
                  v-model="TeamData.name"
                  label="Enter Team Name"
                  :rules="rules"
                  type="text"
                  solo
                  class="rounded-lg"
                  hide-details
                />
              </div>

              <!-- Age Group -->
              <div class="col-span-1">
                <label class="mb-2 flex items-center gap-2 text-sm font-medium
                text-gray-700">
                  <i class="ri-user-star-line text-green-600"></i>
                  Age Group
                </label>
                <VSelect
                  v-model="TeamData.agegroup_id"
                  :items="formattedAgeGroup"
                  label="Choose Age Group"
                  :rules="rules"
                  solo
                  class="rounded-lg"
                  hide-details
                />
              </div>

              <!-- Region -->
              <div class="col-span-1">
                <label class="mb-2 flex items-center gap-2 text-sm font-medium
                text-gray-700">
                  <i class="ri-map-pin-line text-green-600"></i>
                  Region
                </label>
                <VSelect
                  v-model="TeamData.region_id"
                  :items="formattedRegions"
                  label="Choose Region"
                  :rules="rules"
                  solo
                  class="rounded-lg"
                  hide-details
                />
              </div>

              <!-- Series -->
              <div class="col-span-1">
                <label class="mb-2 flex items-center gap-2 text-sm font-medium
                text-gray-700">
                  <i class="ri-trophy-line text-green-600"></i>
                  Series
                </label>
                <VSelect
                  v-model="TeamData.series_id"
                  :items="formattedSeries"
                  label="Choose Series"
                  :rules="rules"
                  :readonly="active"
                  solo
                  class="rounded-lg"
                  hide-details
                />
              </div>

              <!-- Player Limit -->
              <div class="col-span-1">
                <label class="mb-2 flex items-center gap-2 text-sm font-medium
                text-gray-700">
                  <i class="ri-group-line text-green-600"></i>
                  Player Limit
                </label>
                <VTextField
                  v-model="TeamData.player_limit"
                  label="Enter Player Limit"
                  :rules="rules"
                  type="number"
                  min="1"
                  solo
                  class="rounded-lg"
                  hide-details
                />
              </div>
            </div>
          </div>

          <!-- Coaching Staff Section -->
          <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50">
            <h4 class="mb-4 flex items-center gap-2 text-lg font-semibold
            text-gray-800">
              <i class="ri-user-voice-line text-blue-600"></i>
              Coaching Staff
            </h4>
            
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="col-span-1 md:col-span-2">
                <VTextField
                  v-model="TeamData.coach_name"
                  label="Coach Name"
                  type="text"
                  solo
                  class="rounded-lg"
                  hide-details
                  prepend-inner-icon="mdi-account"
                />
              </div>
              <div class="col-span-1">
                <VTextField
                  v-model="TeamData.coach_mobile"
                  label="Coach Mobile"
                  type="tel"
                  solo
                  class="rounded-lg"
                  hide-details
                  prepend-inner-icon="mdi-phone"
                />
              </div>
              <div class="col-span-1">
                <VTextField
                  v-model="TeamData.coach_email"
                  label="Coach Email"
                  type="email"
                  solo
                  class="rounded-lg"
                  hide-details
                  prepend-inner-icon="mdi-email"
                />
              </div>
            </div>
          </div>

          <!-- Management Section -->
          <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50">
            <h4 class="mb-4 flex items-center gap-2 text-lg font-semibold
            text-gray-800">
              <i class="ri-user-settings-line text-purple-600"></i>
              Team Management
            </h4>
            
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="col-span-1 md:col-span-2">
                <VTextField
                  v-model="TeamData.manager_name"
                  label="Manager Name"
                  type="text"
                  solo
                  class="rounded-lg"
                  hide-details
                  prepend-inner-icon="mdi-account-tie"
                />
              </div>
              <div class="col-span-1">
                <VTextField
                  v-model="TeamData.manager_mobile"
                  label="Manager Mobile"
                  type="tel"
                  solo
                  class="rounded-lg"
                  hide-details
                  prepend-inner-icon="mdi-phone"
                />
              </div>
              <div class="col-span-1">
                <VTextField
                  v-model="TeamData.manager_email"
                  label="Manager Email"
                  type="email"
                  solo
                  class="rounded-lg"
                  hide-details
                  prepend-inner-icon="mdi-email"
                />
              </div>
            </div>
          </div>

          <!-- Discount & Media Section -->
          <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50">
            <h4 class="mb-4 flex items-center gap-2 text-lg font-semibold
            text-gray-800">
              <i class="ri-image-circle-line text-amber-600"></i>
              Media & Discounts
            </h4>

            <!-- Discount Code -->
            <div class="mb-6">
              <label class="mb-2 flex items-center gap-2 text-sm font-medium
              text-gray-700">
                <i class="ri-coupon-line text-amber-600"></i>
                Discount Code
              </label>
              <VSelect
                ref="discountSelect"
                v-model="TeamData.discount_codes_id"
                :items="formatDiscountCode"
                density="comfortable"
                @update:menu="onMenuOpen"
                class="rounded-lg"
                hide-details
              >
                <template v-if="loading" #append-item>
                  <div class="flex items-center justify-center gap-2 py-3
                  text-gray-500">
                    <i class="ri-loader-4-line animate-spin"></i>
                    Loading discounts...
                  </div>
                </template>
              </VSelect>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="mb-3 flex items-center gap-2 text-sm font-medium
              text-gray-700">
                <i class="ri-image-2-line text-amber-600"></i>
                Team Logo & Images
              </label>
              
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <!-- Croppa Editor -->
                <div class="space-y-4">
                  <div class="rounded-xl border-2 border-dashed border-gray-300
                  p-4 transition-colors hover:border-green-400">
                    <Croppa
                      v-model="TeamData.myImage"
                      :width="280"
                      :height="280"
                      :quality="5"
                      placeholder="Drag team logo here"
                      :placeholder-font-size="14"
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
                    />
                  </div>

                  <!-- Image Controls -->
                  <div class="flex flex-wrap gap-2">
                    <VBtn
                      small
                      outlined
                      class="rounded-lg"
                      @click="rotateAnti"
                    >
                      <i class="ri-anticlockwise-line mr-1"></i>
                      Rotate Left
                    </VBtn>
                    <VBtn
                      small
                      outlined
                      class="rounded-lg"
                      @click="rotate"
                    >
                      <i class="ri-clockwise-line mr-1"></i>
                      Rotate Right
                    </VBtn>
                    <VBtn
                      small
                      outlined
                      class="rounded-lg"
                      @click="flipx"
                    >
                      <i class="ri-arrow-left-right-line mr-1"></i>
                      Flip X
                    </VBtn>
                    <VBtn
                      small
                      outlined
                      class="rounded-lg"
                      @click="flipy"
                    >
                      <i class="ri-arrow-up-down-line mr-1"></i>
                      Flip Y
                    </VBtn>
                    <VBtn
                      small
                      outlined
                      class="rounded-lg"
                      @click="zoomIn"
                    >
                      <i class="ri-zoom-in-line mr-1"></i>
                      Zoom In
                    </VBtn>
                    <VBtn
                      small
                      outlined
                      class="rounded-lg"
                      @click="zoomOut"
                    >
                      <i class="ri-zoom-out-line mr-1"></i>
                      Zoom Out
                    </VBtn>
                  </div>

                  <!-- Generate Button -->
                  <VBtn
                    v-if="showGenerateCreatedImageBtn"
                    block
                    class="rounded-lg bg-gradient-to-r from-green-600
                    to-green-700 font-semibold text-white shadow-lg
                    transition-all hover:shadow-green-500/30"
                    @click="generateImage"
                  >
                    <i class="ri-download-cloud-line mr-2"></i>
                    Generate Team Logo
                  </VBtn>
                </div>

                <!-- Image Preview -->
                <div class="space-y-3">
                  <h5 class="text-sm font-medium text-gray-700">
                    Current Images
                  </h5>
                  <div
                    v-for="(photo, photoIndex) in imgUrl"
                    :key="photo"
                    class="group relative overflow-hidden rounded-lg
                    border-2 border-gray-200 transition-all hover:border-green-400"
                  >
                    <VImg 
                      :src="photo" 
                      class="h-50 w-full object-cover transition-transform
                      group-hover:scale-105"
                    />
                    <button
                      type="button"
                      class="absolute right-2 top-2 flex size-8 items-center
                      justify-center rounded-full bg-red-500 text-white
                      opacity-0 transition-all group-hover:opacity-100
                      hover:bg-red-600"
                      @click="removeImage(photoIndex)"
                    >
                      <i class="ri-close-line text-sm"></i>
                    </button>
                  </div>
                  
                  <div v-if="!imgUrl.length" class="flex h-32 items-center
                  justify-center rounded-lg border-2 border-dashed border-gray-300">
                    <p class="text-gray-500">
                      No images uploaded
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <VBtn
            large
            outlined
            class="w-full rounded-xl border-2 border-gray-300 font-semibold
            text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50
            sm:w-32"
            @click="closeDialog"
          >
            Cancel
          </VBtn>
          <VBtn
            large
            :disabled="!valid"
            class="w-full rounded-xl bg-gradient-to-r from-green-600
            to-green-700 font-semibold text-white shadow-lg transition-all
            hover:from-green-500 hover:to-green-600 hover:shadow-green-500/30
            disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none
            sm:w-32"
            @click="validate"
          >
            <i class="ri-check-line mr-2"></i>
            {{ team.id ? 'Update' : 'Create' }}
          </VBtn>
        </div>
      </VForm>
    </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import fields from '../../mixins/dataset/fields';
import regions from '../../mixins/dataset/regions';
import series from '../../mixins/dataset/series';
import AgegroupList from '../../mixins/dataset/agegroups';

export default {
  name: 'ManageSeriesTeamModal',
  mixins: [
    fields, regions, series, AgegroupList
  ],
  props: {
    active: {
      type: Boolean,
      required: true
    },
    team: {
      type: [ Array, Object ],
      default: () => ({}),
    },
    series: {
      type: [ Array, Object ],
      default: () => ({}),
    },
  },
  data() {
    return {
      fieldQuery: '',
      valid: true,
      showGenerateCreatedImageBtn: false,
      imgUrl: [],
      imgList: [],
      discountCode: [],
      eventId: null,
      TeamData: {
        name: null,
        description: null,
        discountCode: null
      },
      rules: [ value => !!value || 'Required' ],
      hasMore: true,
      loading: false,
      page: 1,
      query: '',
      menuContent: null
    }
  },
  computed: {
    formatDiscountCode() {
      return [
        { text: 'No Discount', value: 0 },
        ...this.discountCode.map(discount =>
          ({ text: discount.code, value: discount.id }))
      ]
    },
    formattedField() {
      return this.FieldList.map(FieldList =>
        ({ text: FieldList.name, value: FieldList.id }));
    },
    formattedAgeGroup() {
      return this.AgegroupList.map(AgegroupList =>
        ({ text: AgegroupList.name, value: AgegroupList.id }));
    },
    formattedSeries() {
      return this.SeriesList.map(SeriesList => ({
        text: SeriesList.name,
        value: SeriesList.id,
      }));
    },
    formattedRegions() {
      try {
        if (!Array.isArray(this.RegionList)) {
          // eslint-disable-next-line no-console
          console.error('Regions is not an array:', this.RegionList);
          return [];
        }
        const regionsData = this.RegionList.map(item => {
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
        }).filter(Boolean);
        return regionsData;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error formatting regions:', error);
        return [];
      }
    },
    filteredField() {
      return this.formattedField.filter(FieldList =>
        FieldList && FieldList.text && typeof FieldList.text === 'string' ?
          FieldList.text.toLowerCase().includes(this.fieldQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.retrieveRegions()
          this.retrieveFields()
          this.retrieveSeries()
          this.retrieveAgegroups()
          if (this.team && this.team.id) {
            this.TeamData = { ...this.team };
            this.imgUrl = this.TeamData.media.map((x) =>
              `${this.$config.baseURL}/storage/${x.path}`);
            this.imgList = this.TeamData.media.map((x) => x.hash);
          } else {
            this.TeamData = {};
            this.imgUrl = [];
            this.imgList = [];
          }
          this.TeamData.series_id = this.series.id || null;
        }
      },
      immediate: true,
    }
  },
  mounted() {
    this.discountCodeList();
  },
  beforeDestroy() {
    const selectComponent = this.$refs.discountSelect;
    if (selectComponent && 'menuContentRef' in selectComponent) {
      const menu = selectComponent.menuContentRef;
      if (menu && '$el' in menu) {
        this.menuContent = menu.$el;
        if (this.menuContent) {
          this.menuContent.removeEventListener('scroll', this.handleScroll);
        }
      }
    }
  },
  methods: {
    discountCodeList(loadMore = false) {
      const query = {
        q: this.query || null,
        sort: 'a_to_z',
        page: this.page,
        maxDiscountPerPage: 500,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] === null || query[key] === '') {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString();

      this.loading = true;

      this.$axios
        .$get(`v1/discountcode?${queryString}`)
        .then((response) => {
          const newDiscounts = response.data.discount;

          if (loadMore && Array.isArray(newDiscounts)) {
            this.discountCode = [ ...this.discountCode, ...newDiscounts ];
          } else {
            this.discountCode = newDiscounts;
          }
          if (newDiscounts.length < this.maxDiscountPerPage) {
            this.hasMore = false;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error('Failed to fetch discount codes:', error);
          this.loading = false;
        });
    },
    onMenuOpen(isOpen) {
      if (isOpen && this.discountCode.length > 0 && this.hasMore) {
        this.$nextTick(() => {
          const selectComponent = this.$refs.discountSelect;
          if (selectComponent && 'menuContentRef' in selectComponent) {
            const menu = selectComponent.menuContentRef;
            if (menu && '$el' in menu) {
              this.menuContent = menu.$el;
              if (this.menuContent) {
                this.menuContent.addEventListener('scroll', this.handleScroll);
              }
            }
          }
        });
      }
    },
    handleScroll(e) {
      const element = e.target;

      if (
        element.scrollHeight - element.scrollTop <= element.clientHeight + 50 &&
        !this.loading &&
        this.hasMore
      ) {
        this.page++;
        this.discountCodeList(true);
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
      this.saveSeriesTeam()
      this.closeDialog()
    },
    saveSeriesTeam() {
      const formData = new FormData();
      formData.append('name', this.TeamData.name);
      formData.append('agegroup_id', this.TeamData.agegroup_id);
      formData.append('series_id', this.TeamData.series_id);
      formData.append('region_id', this.TeamData.region_id);
      formData.append('coach_name', this.TeamData.coach_name);
      formData.append('coach_mobile', this.TeamData.coach_mobile);
      formData.append('coach_email', this.TeamData.coach_email);
      formData.append('manager_name', this.TeamData.manager_name);
      formData.append('manager_mobile', this.TeamData.manager_mobile);
      formData.append('manager_email', this.TeamData.manager_email);
      formData.append('player_limit', this.TeamData.player_limit);
      formData.append('discount_code_id', this.TeamData.discount_codes_id);

      for (let i = 0; i < this.imgList.length; i++) {
        formData.append('photo[]', this.imgList[i]);
      }
      const team = { ...this.team }
      const endpoint = this.team.id ? `v1/teams/${this.team.id}` : 'v1/teams';

      this.$axios
        .$post(`${endpoint}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `Series Team ${team.id ? 'Updated' : 'Created'}`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.reset();
          this.$emit('confirm')
        })
        .catch((error) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: error.response.data.message || 'Something went wrong.',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
          if (error.response && error.response.status === 403) {
            this.$router.push('/unauthorized');
          } else {
            // eslint-disable-next-line no-console
            console.error('Error:', error);
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
    /*  IMAGE */
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

::v-deep .v-text-FieldList.v-text-FieldList--solo:not(.v-text-FieldList--solo-flat)
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

::v-deep .v-text-FieldList input::label {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
  height: 50px !important;
}
</style>

