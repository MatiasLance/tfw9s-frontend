<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="text-brand-black mb-3 font-bold">
                    {{ team.id?'Update':'Create' }} Series Team
                </h3>
                <hr class="my-3 lg:w-[918px]"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1 md:col-span-2">
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
                  <div class="col-span-1">
                    <label for="selectevent" class="mb-1 block">
                      Series:
                    </label>
                    <VSelect
                    v-model="TeamData.series_id"
                    :items="formattedSeries"
                    label="Choose Series"
                    :rules="rules"
                    :readonly="active"
                    solo
                    >
                    </VSelect>
                  </div>
                  <div class="col-span-1">
                    <label for="selectevent" class="mb-1 block">
                      Player Limit:
                    </label>
                    <VTextField
                    id="title"
                    v-model="TeamData.player_limit"
                    label="Enter Registration Player Limit"
                    :rules="rules"
                    type="number"
                    min="1"
                    solo
                    />
                  </div>
                  <div class="col-span-1 md:col-span-2" >
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
                  <div class="col-span-1" >
                    <label for="teamname" class="mb-1 block">
                      Coach Mobile Number:
                    </label>
                    <VTextField
                    id="number"
                    v-model="TeamData.coach_mobile"
                    label="Enter Mobile Number"
                    type="tel"
                    solo
                    />
                  </div>
                  <div class="col-span-1" >
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
                  <div class="col-span-1 md:col-span-2" >
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
                  <div class="col-span-1" >
                    <label for="teamname" class="mb-1 block">
                      Manager Mobile Number:
                    </label>
                    <VTextField
                    id="number"
                    v-model="TeamData.manager_mobile"
                    label="Enter Mobile Number"
                    type="tel"
                    solo
                    />
                  </div>
                  <div class="col-span-1" >
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
                  <div class="col-span-1 md:col-span-2" >
                    <label for="teamname" class="mb-1 block">
                      Add Discount:
                    </label>
                    <template>
                      <VSelect
                        ref="discountSelect"
                        v-model="TeamData.discount_codes_id"
                        :items="formatDiscountCode"
                        density="comfortable"
                        @update:menu="onMenuOpen"
                      >
                        <template v-if="loading" #append-item>
                          <div class="py-2 text-center text-gray-500">
                            Loading...
                          </div>
                        </template>
                      </VSelect>
                    </template>
                  </div>
                  <div class="col-span-1 md:col-span-2" >
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
                        <br />
                        <div class="flex justify-start">
                            <VBtn @click="rotateAnti">
                                <i class="ri-anticlockwise-line"></i>
                            </VBtn>
                            <VBtn @click="rotate">
                                <i class="ri-clockwise-line"></i>
                            </VBtn>
                            <VBtn @click="flipx">
                                <i class="ri-arrow-left-right-line"></i>
                            </VBtn>
                            <VBtn @click="flipy">
                                <i class="ri-arrow-up-down-line"></i>
                            </VBtn>
                        </div>
                        <div class="flex justify-start">
                            <VBtn @click="zoomIn">
                                <i class="ri-zoom-in-line"></i>
                            </VBtn>
                            <VBtn @click="zoomOut">
                                <i class="ri-zoom-out-line"></i>
                            </VBtn>
                            <VBtn plain @click="setImagePreset">
                                set
                            </VBtn>
                            <VBtn plain @click="clearImagePreset">
                                clr
                            </VBtn>
                        </div>
                        <br />
                        <VBtn
                        v-if="showGenerateCreatedImageBtn"
                        dark
                        large
                        class="from-brand-black to-brand-black bg-gradient-to-r"
                        @click="generateImage"
                        >
                          GENERATE
                        </VBtn>
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
                            my-2 size-6
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

