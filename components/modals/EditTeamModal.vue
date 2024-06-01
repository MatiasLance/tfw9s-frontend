<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Edit Team
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
                    <label for="selectfield" class="mb-1 block">
                      Field:
                    </label>
                    <VSelect
                    v-model="TeamData.field_id"
                    :items="filteredField"
                    label="Choose a Field"
                    :rules="rules"
                    solo
                    >
                      <template #prepend-item>
                        <div class="sticky-search-bar px-3">
                          <SearchBar v-model="fieldQuery" />
                        </div>
                      </template>
                    </VSelect>
                  </div>
                  <div class="col-span-1">
                    <label for="selectevent" class="mb-1 block">
                      Series:
                    </label>
                    <VSelect
                    v-model="TeamData.event_id"
                    :items="formattedEvent"
                    label="Choose Series"
                    :rules="rules"
                    solo
                    >
                    </VSelect>
                  </div>
                  <div class="col-span-1 md:col-span-2">
                    <label for="teamname" class="mb-1 block">
                      Coach Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="TeamData.coach_name"
                    label="Enter Coach Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Coach Mobile Number:
                    </label>
                    <VTextField
                    id="number"
                    v-model="TeamData.coach_mobile"
                    label="Enter Mobile Number"
                    :rules="rules"
                    type="tel"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Coach Email:
                    </label>
                    <VTextField
                    id="email"
                    v-model="TeamData.coach_email"
                    label="Enter Coach Email"
                    :rules="rules"
                    type="email"
                    solo
                    />
                  </div>
                  <div class="col-span-1 md:col-span-2">
                    <label for="teamname" class="mb-1 block">
                      Manager Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="TeamData.manager_name"
                    label="Enter Manager Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Manager Mobile Number:
                    </label>
                    <VTextField
                    id="number"
                    v-model="TeamData.manager_mobile"
                    label="Enter Mobile Number"
                    :rules="rules"
                    type="tel"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="teamname" class="mb-1 block">
                      Manager Email:
                    </label>
                    <VTextField
                    id="email"
                    v-model="TeamData.manager_email"
                    label="Enter Manager Email"
                    :rules="rules"
                    type="email"
                    solo
                    />
                  </div>
                  <div class="col-span-1 md:col-span-2">
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
                        class="bg-gradient-to-r from-brand-black to-brand-black"
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
                            absolute
                            left-0 my-2
                            h-6
                            w-6 text-brand-lgrey
                            shadow-sm
                            hover:bg-brand-black
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

export default {
  name: 'EditTeamModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    team: {
      type: Object,
      default: () => ({}),
    },
    // eslint-disable-next-line vue/prop-name-casing
    field: {
      type: Array,
      required: true
    },
    event: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      fieldQuery: '',
      valid: true,
      showGenerateCreatedImageBtn: false,
      imgUrl: [],
      imgList: [],
      eventId: null,
      TeamData: {
        name: null,
        description: null
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedField() {
      return this.field.map(field =>
        ({ text: field.name, value: field.id }));
    },
    formattedEvent() {
      return this.event.map(event => ({
        text: `${event.name} - ${event.agegroup?event.agegroup.name:''}`,
        value: event.id,
        // eslint-disable-next-line max-len, vue/max-len
        disabled: this.eventId === event.id?false:event.team.length >= event.teamcount
      }));
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
    active: {
      handler(newActive) {
        if (newActive) {
          this.TeamData = this.team;
          this.eventId = this.team.event_id
          const matchingEvent = this.formattedEvent.find(event =>
            event.value === this.team.event_id);
          this.TeamData.event_id = matchingEvent ?
            matchingEvent.value : null;
          const matchingField = this.filteredField.find(field =>
            field.value === this.team.field_id);
          this.TeamData.field_id = matchingField ?
            matchingField.value : null;
          this.imgUrl = this.TeamData.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          this.imgList = this.TeamData.media.map((x) => x.hash);
        }
      },
      immediate: true,
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
      this.editTeam()
      this.closeDialog()
    },
    editTeam() {
      const formData = new FormData();
      formData.append('name', this.TeamData.name);
      formData.append('description', this.TeamData.description);
      formData.append('field_id', this.TeamData.field_id);
      formData.append('event_id', this.TeamData.event_id);
      formData.append('coach_name', this.TeamData.coach_name);
      formData.append('coach_mobile', this.TeamData.coach_mobile);
      formData.append('coach_email', this.TeamData.coach_email);
      formData.append('manager_name', this.TeamData.manager_name);
      formData.append('manager_mobile', this.TeamData.manager_mobile);
      formData.append('manager_email', this.TeamData.manager_email);

      for (let i = 0; i < this.imgList.length; i++) {
        formData.append('photo[]', this.imgList[i]);
      }

      this.$axios
        .$post(`v1/teams/${this.team.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

