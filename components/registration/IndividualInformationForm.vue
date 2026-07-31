<template>
  <div class="w-full max-w-screen">
    <div
      v-if="isUnderMaintenance"
      class="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 px-4"
    >
      <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-green-500">
        <div class="mb-6">
          <i class="ri-tools-line text-6xl text-green-600 animate-bounce"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-3">
          We’ll Be Right Back!
        </h1>
        <p class="text-gray-600 leading-relaxed">
          This registration form is currently undergoing scheduled maintenance.
          Please check back shortly. Thank you for your patience!
        </p>
      </div>
    </div>

    <form
      v-else
      class="w-full max-w-screen mx-auto border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl lg:p-8"
      @submit.prevent="submit"
    >
      <div class="grid gap-x-3 lg:grid-cols-2 mb-6">
        <div class="mb-4">
          <label for="team-select-header" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
            <i class="ri-football-line text-green-400" aria-hidden="true"></i>
            Team Name
          </label>
          <select
            id="team-select-header"
            v-model="player.teamName"
            :disabled="hasToken"
            class="w-full rounded-lg border border-white/5 bg-gray-200 px-3 py-2.5 text-sm font-medium text-black transition-all duration-200 focus:outline-none disabled:opacity-80 disabled:cursor-not-allowed"
          >
            <option value="" disabled>Select a team</option>
            <option
              v-for="team in teams"
              :key="team.id"
              :value="team.name"
            >
              {{ team.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="age-group-select-header" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
            <i class="ri-shield-line text-green-400" aria-hidden="true"></i>
            Age Group
          </label>
          <select
            id="age-group-select-header"
            v-model="player.ageGroup"
            :disabled="hasToken"
            class="w-full rounded-lg border border-white/5 bg-gray-200 px-3 py-2.5 text-sm font-medium text-black transition-all duration-200 focus:outline-none disabled:opacity-80 disabled:cursor-not-allowed"
          >
            <option value="" disabled>Select an age group</option>
            <option
              v-for="age in ageGroups"
              :key="age.id"
              :value="age.id"
            >
              {{ age.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- ========== REGISTRATION TYPE SELECTOR ========== -->
      <div class="mb-6">
        <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          How would you like to register?
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <div
            class="cursor-pointer rounded-xl border-2 p-4 transition-all duration-200"
            :class="registrationType === 'card'
              ? 'border-green-500 bg-green-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'"
            @click="setRegistrationType('card')"
          >
            <i class="ri-id-card-line text-2xl text-green-600 mb-2 block"></i>
            <span class="text-sm font-semibold text-gray-800">I have a player card</span>
            <p class="text-xs text-gray-500 mt-1">Search your child’s name</p>
          </div>
          <div
            class="cursor-pointer rounded-xl border-2 p-4 transition-all duration-200"
            :class="registrationType === 'new'
              ? 'border-green-500 bg-green-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'"
            @click="setRegistrationType('new')"
          >
            <i class="ri-user-add-line text-2xl text-green-600 mb-2 block"></i>
            <span class="text-sm font-semibold text-gray-800">I am a new player</span>
            <p class="text-xs text-gray-500 mt-1">Fill in player details</p>
          </div>
        </div>
      </div>

      <template v-if="registrationType">
        <!-- ===== OPTION 1: PLAYER CARD ===== -->
        <template v-if="registrationType === 'card'">
          <h2 class="mb-5 text-xl font-semibold">Player Card Registration</h2>
          <hr class="my-4" />

          <div class="mb-4 relative">
            <label class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
              <i class="ri-search-line text-green-600"></i>
              Search your child
            </label>
            <input
              v-model="cardSearchQuery"
              type="text"
              placeholder="Start typing first or last name..."
              class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              @focus="showCardSuggestions = cardSuggestions.length > 0"
              @blur="hideCardSuggestions"
              @input="debouncedCardSearch"
            />

            <p
              v-if="cardSearchLoading"
              class="mt-2 flex items-center gap-2 text-xs text-gray-500"
            >
              <i class="ri-loader-4-line animate-spin"></i>
              Looking for existing Player Cards…
            </p>

            <ul
              v-if="showCardSuggestions && cardSuggestions.length > 0"
              class="absolute z-10 mt-1 w-full rounded-lg border border-green-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] max-h-48 overflow-y-auto ring-1 ring-green-500/10"
            >
              <li
                v-for="(sug, index) in cardSuggestions"
                :key="`${sug.player_name}-${sug.masked_phone}-${index}`"
                class="flex items-center justify-between px-3 py-2 cursor-pointer text-sm text-black transition-colors hover:bg-green-50 hover:text-green-800"
                @mousedown.prevent="reviewCardMatch(sug)"
              >
                <span>
                  <span class="block font-semibold">{{ sug.player_name }}</span>
                  <span class="text-xs text-gray-500">
                    {{ sug.masked_phone }}
                    <template v-if="sug.team_name"> · {{ sug.team_name }}</template>
                  </span>
                </span>
                <i class="ri-arrow-right-s-line text-green-500"></i>
              </li>
            </ul>

            <p
              v-if="cardSearchCompleted && !cardSearchLoading && cardSuggestions.length === 0"
              class="mt-2 text-xs text-gray-600"
            >
              No likely Player Card was found. Check the spelling, or choose
              “I am a new player” if you do not already have one.
            </p>
          </div>

          <div v-if="selectedCardPlayer" class="mt-4">
            <div class="mb-4 rounded-lg bg-green-50 p-4 border border-green-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-semibold text-gray-800">
                    {{ selectedCardPlayer.player_name }}
                  </p>
                  <p class="text-xs text-gray-500 mt-0.5">
                    Registered phone: {{ selectedCardPlayer.masked_phone }}
                  </p>
                </div>
                <button
                  type="button"
                  class="text-xs text-red-500 hover:text-red-600 underline"
                  @click="clearCardPlayer"
                >
                  Change
                </button>
              </div>
            </div>

            <p class="mb-3 text-sm text-gray-600">
              Enter the current parent/contact details to continue this registration.
              These details are not returned by the Player Card search.
            </p>

            <div class="grid gap-x-3 lg:grid-cols-2">
              <div class="mb-4">
                <label for="card-contact-first-name" class="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-black">
                  Parent First Name*
                </label>
                <input
                  id="card-contact-first-name"
                  v-model.trim="contact.firstName"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div class="mb-4">
                <label for="card-contact-last-name" class="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-black">
                  Parent Last Name*
                </label>
                <input
                  id="card-contact-last-name"
                  v-model.trim="contact.lastName"
                  type="text"
                  required
                  class="w-full rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div class="mb-4">
                <label for="card-contact-phone" class="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-black">
                  Parent Phone Number*
                </label>
                <div class="flex">
                  <span class="rounded-l-lg border border-r-0 border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-700">{{ phoneCode }}</span>
                  <input
                    id="card-contact-phone"
                    v-model.trim="contact.phoneDigits"
                    type="tel"
                    inputmode="numeric"
                    placeholder="412345678"
                    required
                    class="w-full rounded-r-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label for="card-contact-email" class="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-black">
                  Parent Email*
                </label>
                <input
                  id="card-contact-email"
                  v-model.trim="contact.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div class="mb-4 lg:col-span-2">
                <label for="card-player-dob" class="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-black">
                  Player Date of Birth*
                </label>
                <input
                  id="card-player-dob"
                  v-model="player.dob"
                  type="date"
                  required
                  class="w-full rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 [color-scheme:light]"
                />
              </div>
            </div>

            <button
              type="button"
              class="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold
              text-white shadow-lg hover:scale-105 transition-transform
              focus:outline-none focus:ring-2 focus:ring-green-500"
              :class="{ 'cursor-not-allowed opacity-60': !isCardRegistrationValid }"
              :disabled="!isCardRegistrationValid || isLoading"
              @click="proceedToPayment"
            >
              <span class="text-gray-50">
                Continue to Payment
                <i class="ri-arrow-right-line mr-2"></i>
              </span>
            </button>
          </div>
        </template>

        <!-- ===== OPTION 2: NEW PLAYER (full form) ===== -->
        <template v-else-if="registrationType === 'new'">
          <h2 class="mb-5 text-xl font-semibold">Information</h2>
          <hr class="my-4" />

          <!-- Parent Details -->
          <div class="grid gap-x-3 lg:grid-cols-2">
            <div class="mb-4">
              <label for="first-name" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-user-line text-green-600" aria-hidden="true"></i>
                Parent First Name*
              </label>
              <input
                id="first-name"
                v-model="contact.firstName"
                name="contactfirstname"
                type="text"
                placeholder="Contact First Name"
                required
                class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            <div class="mb-4">
              <label for="last-name" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-user-line text-green-600" aria-hidden="true"></i>
                Parent Last Name*
              </label>
              <input
                id="last-name"
                v-model="contact.lastName"
                name="contactlastname"
                type="text"
                placeholder="Contact Last Name"
                required
                class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            <div class="mb-4">
              <label for="phone-code" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-phone-line text-green-600" aria-hidden="true"></i>
                Parent Phone Number*
              </label>
              <div class="flex w-full">
                <input
                  id="phone-code"
                  v-model="phoneCode"
                  name="phoneCode"
                  type="text"
                  placeholder="Code"
                  disabled
                  class="w-1/6 appearance-none rounded-l-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black/60 placeholder:text-black/60 cursor-not-allowed"
                />
                <input
                  id="phone-digits"
                  v-model="contact.phoneDigits"
                  name="phoneDigits"
                  type="text"
                  placeholder="Phone Number"
                  required
                  class="w-5/6 appearance-none rounded-r-lg border border-l-0 border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
            </div>

            <div class="mb-4">
              <label for="email" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-mail-line text-green-600" aria-hidden="true"></i>
                Parent Email*
              </label>
              <input
                id="email"
                v-model="contact.email"
                name="email"
                type="email"
                placeholder="Email"
                required
                class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
            </div>
          </div>

          <hr class="my-4" />

          <!-- Player Details -->
          <div class="grid gap-x-3 lg:grid-cols-2 mb-2">
            <div class="relative mb-4">
              <label for="player-first-name" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-user-line text-green-600" aria-hidden="true"></i>
                Player First Name*
              </label>
              <input
                id="player-first-name"
                v-model="player.firstName"
                name="playerfirstname"
                type="text"
                placeholder="Player First Name"
                required
                class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                @input="debouncedDuplicateSearch"
              />
            </div>

            <div class="mb-4">
              <label for="player-last-name" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-user-line text-green-600" aria-hidden="true"></i>
                Player Last Name*
              </label>
              <input
                id="player-last-name"
                v-model="player.lastName"
                name="playerlastname"
                type="text"
                placeholder="Player Last Name"
                required
                class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                @input="debouncedDuplicateSearch"
              />
            </div>

            <div
              v-if="duplicateSearchLoading || duplicateSuggestions.length > 0"
              class="relative -mt-2 mb-4 lg:col-span-2"
            >
              <p
                v-if="duplicateSearchLoading"
                class="flex items-center gap-2 text-xs text-gray-500"
              >
                <i class="ri-loader-4-line animate-spin"></i>
                Checking for an existing Player Card…
              </p>
              <div
                v-else
                class="overflow-hidden rounded-lg border border-amber-200 bg-amber-50 shadow-sm"
              >
                <p class="border-b border-amber-200 px-3 py-2 text-xs font-semibold text-amber-900">
                  Possible existing Player Cards
                </p>
                <button
                  v-for="(match, index) in duplicateSuggestions"
                  :key="`${match.player_name}-${match.masked_phone}-${index}`"
                  type="button"
                  class="flex w-full items-center justify-between gap-3 border-b border-amber-100 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-amber-100"
                  @click="openDuplicateWarning"
                >
                  <span>
                    <span class="block font-semibold text-gray-900">{{ match.player_name }}</span>
                    <span class="text-xs text-gray-600">
                      {{ match.masked_phone }}
                      <template v-if="match.team_name"> · {{ match.team_name }}</template>
                    </span>
                  </span>
                  <span class="text-xs font-semibold text-amber-800">Review</span>
                </button>
              </div>
            </div>

            <div class="mb-4">
              <label for="dob" class="mb-1.5 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-black">
                <i class="ri-calendar-line text-green-600" aria-hidden="true"></i>
                Date of Birth*
              </label>
              <input
                id="dob"
                v-model="player.dob"
                name="dob"
                type="date"
                placeholder="Date of Birth"
                required
                class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-200 px-3 py-2.5 text-sm text-black placeholder:text-black transition-colors duration-200 hover:border-gray-400 focus:border-green-500 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 [color-scheme:light]"
              />
            </div>
          </div>

          <!-- Photo upload -->
          <div class="relative">
            <label class="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black">
              <i class="ri-camera-line text-green-600" aria-hidden="true"></i>
              Player Photo
            </label>

            <div class="flex">
              <div
                v-if="cropping"
                class="relative flex size-[320px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-green-500/50 bg-black/5 shadow-inner"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100/50 ring-2 ring-green-400/30">
                    <i class="ri-football-line text-3xl text-green-600 animate-bounce" aria-hidden="true"></i>
                  </div>
                  <span class="text-sm font-medium text-green-700">Cropping…</span>
                </div>

                <VProgressCircular
                  v-show="false"
                  size="80"
                  width="8"
                  indeterminate
                  color="green"
                />
              </div>

              <div
                v-else-if="base64IMG"
                class="relative size-[320px] overflow-hidden rounded-xl border-2 border-green-500/40 shadow-[0_0_20px_rgba(94,231,56,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(94,231,56,0.4)]"
              >
                <img
                  class="size-full object-cover"
                  :src="base64IMG"
                  alt="Player preview"
                />
                <button
                  type="button"
                  class="group absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-red-600 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  @click="removePhoto"
                  aria-label="Remove player photo"
                >
                  <i class="ri-close-line text-red-300 text-lg transition-transform group-hover:rotate-90"></i>
                </button>
              </div>

              <ImageCropper
                v-else
                :width="320"
                :height="320"
                :prevent-white-space="true"
                initial-size="cover"
                @upload="handleUpload"
                class="rugby-cropper-wrapper"
              />
            </div>
          </div>

          <!-- Terms & submit -->
          <div class="flex w-full flex-wrap items-center justify-between gap-x-2 mt-4">
            <label class="my-4 mr-0 flex w-max items-center sm:mr-4 md:mr-8">
              <input
                v-model="hasAgreedToTerms"
                type="checkbox"
                class="text-brand-black mr-2 size-4 cursor-pointer rounded-full border-[3px] border-gray-300 bg-gray-400 hover:border-gray-700 focus:border-transparent focus:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2"
                required
              />
              <span class="mt-1 inline-block cursor-pointer text-gray-500">
                I have read and agree to the
                <a
                  class="decoration-none hover:text-brand-black hover:underline"
                  href="#"
                  @click.prevent="showTermsModal = true"
                >
                  Terms and Conditions
                </a>
              </span>
            </label>

            <button
              type="submit"
              class="w-24 cursor-pointer py-2 text-white"
              :class="{
                'bg-brand-black': !isLoading && !isPlayerLimitReached && !cropping,
                'bg-gray-400': isLoading || isPlayerLimitReached || cropping
              }"
              :disabled="isLoading || !isRegistrationTypeValid || cropping"
            >
              <span v-if="!isLoading" class="text-white">Confirm</span>
              <span v-if="isLoading">
                <VProgressCircular size="20" width="2" indeterminate color="white" />
              </span>
            </button>
          </div>
        </template>
      </template>

      <!-- Modal for Terms (same as before) -->
      <Modal :show="showTermsModal" @close="showTermsModal = false">
        <template #header>
          <h3>Terms and Conditions</h3>
        </template>
        <template #body>
          <TermsSection />
        </template>
        <template #footer>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="showTermsModal = false"
              class="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-transparent border border-gray-500/40 text-gray-300 hover:border-gray-400 hover:text-gray-100 hover:bg-gray-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-out"
            >
              <i class="ri-close-line text-lg transition-transform duration-200 group-hover:-translate-x-0.5"></i>
              <span>Cancel</span>
            </button>
            <button
              type="button"
              @click="agreeAndClose"
              class="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-b from-green-500 to-green-700 border border-green-400/30 shadow-lg shadow-green-900/30 text-white hover:from-green-400 hover:to-green-600 hover:border-green-300/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40 active:translate-y-0 active:shadow-md active:scale-[0.98] focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:hover:shadow-green-900/30 disabled:hover:from-green-500 disabled:hover:to-green-700 disabled:hover:border-green-400/30 transition-all duration-200 ease-out"
            >
              <i class="ri-check-line text-white text-lg transition-transform duration-200 group-hover:scale-110"></i>
              <span class="text-white">I Agree</span>
            </button>
          </div>
        </template>
      </Modal>

      <Modal :show="showDuplicateWarning" @close="closeDuplicateWarning">
        <template #header>
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <i class="ri-alert-line text-xl text-amber-700"></i>
            </span>
            <h3 class="text-lg font-bold text-gray-900">You may already have a Player Card</h3>
          </div>
        </template>
        <template #body>
          <div class="space-y-4 text-gray-700">
            <p>
              If your name appears below, you likely already own a Player Card and
              <strong>do not need to purchase another one</strong>.
            </p>
            <p class="text-sm">
              Please verify using the last three digits of the registered phone number.
            </p>

            <div class="overflow-hidden rounded-lg border border-gray-200">
              <div
                v-for="(match, index) in duplicateMatches"
                :key="`warning-${match.player_name}-${match.masked_phone}-${index}`"
                class="grid grid-cols-1 gap-1 border-b border-gray-200 bg-white px-4 py-3 last:border-b-0 sm:grid-cols-3 sm:gap-3"
              >
                <div>
                  <span class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Player</span>
                  <span class="font-semibold text-gray-900">{{ match.player_name }}</span>
                </div>
                <div>
                  <span class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Phone</span>
                  <span class="font-mono text-gray-900">{{ match.masked_phone }}</span>
                </div>
                <div>
                  <span class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Team / Age Group</span>
                  <span class="text-gray-900">
                    {{ match.team_name || 'Not provided' }}
                    <template v-if="match.age_group"> · {{ match.age_group }}</template>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="rounded-lg border border-green-700 px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-50"
              @click="useExistingPlayerCard"
            >
              I Found My Player Card
            </button>
            <button
              type="button"
              class="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
              @click="continueAfterDuplicateWarning"
            >
            <span class="text-gray-50">
              Continue Anyway
            </span>
            </button>
          </div>
        </template>
      </Modal>
    </form>
  </div>
</template>

<script>
import ImageCropper from '../ImageCropper.vue';
import Modal from '~/components/Modal';
import TermsSection from '~/components/TermsSection';

export default {
  components: { Modal, TermsSection, ImageCropper },
  props: {
    isLoading: { type: Boolean, default: false },
    price: { type: [String], required: true },
  },
  data() {
    return {
      isUnderMaintenance: false,
      registrationType: null,
      cardSearchQuery: '',
      cardSuggestions: [],
      showCardSuggestions: false,
      selectedCardPlayer: null,
      cardSearchLoading: false,
      cardSearchCompleted: false,

      cardDebounceTimer: null,
      cardAbortController: null,
      duplicateSuggestions: [],
      duplicateMatches: [],
      duplicateSearchLoading: false,
      showDuplicateWarning: false,
      duplicateWarningFromSubmit: false,
      duplicateDebounceTimer: null,
      duplicateAbortController: null,
      lastWarnedPlayerName: '',
      duplicateBypassName: '',
      duplicateWarningContext: 'new',
      pendingCardMatch: null,

      contact: {
        firstName: '',
        lastName: '',
        phoneDigits: '',
        email: '',
      },
      player: {
        firstName: '',
        lastName: '',
        teamName: '',
        dob: '',
        ageGroup: '',
        discountCodeId: null,
      },
      phoneCode: '+61',
      hasAgreedToTerms: false,
      showTermsModal: false,
      photo: null,
      cropping: false,
      series: [],
      team: {},
      isPlayerLimitReached: false,
      teams: [],
      ageGroups: [],
    };
  },
  computed: {
    phoneNumber() {
      return `${this.phoneCode}${this.contact.phoneDigits}`;
    },
    base64IMG: {
      get() {
        return this.$store.state.registration.base64IMG;
      },
      set(value) {
        this.$store.commit('registration/setBase64IMG', value);
      },
    },
    isRegistrationTypeValid() {
      return this.registrationType === 'new';
    },
    isCardRegistrationValid() {
      return Boolean(
        this.selectedCardPlayer &&
        this.contact.firstName.trim() &&
        this.contact.lastName.trim() &&
        /^\d{8,12}$/.test(this.contact.phoneDigits.replace(/\D/g, '')) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contact.email.trim()) &&
        this.player.dob &&
        this.player.teamName &&
        this.player.ageGroup
      );
    },
    hasToken() {
      return Boolean(this.$route.query.token);
    },
    newPlayerSearchQuery() {
      return `${this.player.firstName} ${this.player.lastName}`
        .trim()
        .replace(/\s+/g, ' ');
    },
    normalizedNewPlayerName() {
      return this.newPlayerSearchQuery.toLocaleLowerCase();
    },
  },
  mounted() {
    if (this.isUnderMaintenance) return;

    const token = this.$route.query.token;
    const id = this.$route.query.id;
    if (token) {
      this.retrieveTokenData(token);
    } else if (id) {
      this.retrieveSeries(id);
    }
  },
  beforeDestroy() {
    clearTimeout(this.cardDebounceTimer);
    if (this.cardAbortController) {
      this.cardAbortController.abort();
    }
    clearTimeout(this.duplicateDebounceTimer);
    if (this.duplicateAbortController) {
      this.duplicateAbortController.abort();
    }
  },
  methods: {
    setRegistrationType(type) {
      this.registrationType = type;
      this.player.firstName = '';
      this.player.lastName = '';
      this.player.dob = '';
      this.cardSearchQuery = '';
      this.cardSuggestions = [];
      this.selectedCardPlayer = null;
      this.cardSearchLoading = false;
      this.cardSearchCompleted = false;
      this.contact.firstName = '';
      this.contact.lastName = '';
      this.contact.phoneDigits = '';
      this.contact.email = '';
      this.removePhoto();
      this.cropping = false;
      this.hasAgreedToTerms = false;
      this.duplicateSuggestions = [];
      this.duplicateMatches = [];
      this.showDuplicateWarning = false;
      this.duplicateWarningFromSubmit = false;
      this.lastWarnedPlayerName = '';
      this.duplicateBypassName = '';
      this.duplicateWarningContext = 'new';
      this.pendingCardMatch = null;

      clearTimeout(this.cardDebounceTimer);
      if (this.cardAbortController) {
        this.cardAbortController.abort();
        this.cardAbortController = null;
      }
      clearTimeout(this.duplicateDebounceTimer);
      if (this.duplicateAbortController) {
        this.duplicateAbortController.abort();
        this.duplicateAbortController = null;
      }
    },

    debouncedCardSearch() {
      clearTimeout(this.cardDebounceTimer);
      if (this.cardAbortController) {
        this.cardAbortController.abort();
      }
      this.cardDebounceTimer = setTimeout(() => {
        this.onCardSearchInput();
      }, 500);
    },

    async onCardSearchInput() {
      const query = this.cardSearchQuery.trim();
      if (query.length < 2) {
        this.cardSuggestions = [];
        this.showCardSuggestions = false;
        this.cardSearchCompleted = false;
        this.cardSearchLoading = false;
        return;
      }

      this.cardAbortController = new AbortController();
      const signal = this.cardAbortController.signal;
      this.cardSearchLoading = true;
      this.cardSearchCompleted = false;

      try {
        const response = await this.$axios.$get('v1/players/player-card/matches', {
          params: { q: query, limit: 8 },
          signal,
        });
        if (signal.aborted) return;
        const data = response.data || response;
        const suggestions = data.matches || [];
        this.cardSuggestions = suggestions;
        this.showCardSuggestions = suggestions.length > 0;
        this.cardSearchCompleted = true;
      } catch (error) {
        if (this.$axios.isCancel(error) || error?.name === 'AbortError') {
          return;
        }
        console.error('Error fetching card suggestions:', error);
        this.cardSuggestions = [];
        this.showCardSuggestions = false;
      } finally {
        if (this.cardAbortController && this.cardAbortController.signal === signal) {
          this.cardAbortController = null;
        }
        if (!signal.aborted) {
          this.cardSearchLoading = false;
        }
      }
    },

    debouncedDuplicateSearch() {
      clearTimeout(this.duplicateDebounceTimer);

      if (this.duplicateAbortController) {
        this.duplicateAbortController.abort();
      }

      if (this.newPlayerSearchQuery.length < 2) {
        this.duplicateSuggestions = [];
        this.duplicateSearchLoading = false;
        return;
      }

      this.duplicateDebounceTimer = setTimeout(() => {
        this.fetchPotentialCardMatches();
      }, 450);
    },

    async fetchPotentialCardMatches(openWarning = false) {
      const query = this.newPlayerSearchQuery;
      if (query.length < 2) return [];

      if (this.duplicateAbortController) {
        this.duplicateAbortController.abort();
      }

      this.duplicateAbortController = new AbortController();
      const signal = this.duplicateAbortController.signal;
      this.duplicateSearchLoading = true;

      try {
        const response = await this.$axios.$get('v1/players/player-card/matches', {
          params: { q: query, limit: 8 },
          signal,
        });
        if (signal.aborted) return [];

        const data = response.data || response;
        const matches = data.matches || [];
        this.duplicateSuggestions = matches;

        const hasCompleteName =
          this.player.firstName.trim().length >= 2 &&
          this.player.lastName.trim().length >= 2;
        const highConfidenceMatches = matches.filter(match => match.score >= 84);
        const shouldWarnAutomatically =
          hasCompleteName &&
          highConfidenceMatches.length > 0 &&
          this.lastWarnedPlayerName !== this.normalizedNewPlayerName &&
          this.duplicateBypassName !== this.normalizedNewPlayerName;

        if (openWarning && matches.length > 0) {
          this.duplicateMatches = matches;
          this.showDuplicateWarning = true;
          this.duplicateWarningFromSubmit = true;
          this.duplicateWarningContext = 'new';
          this.lastWarnedPlayerName = this.normalizedNewPlayerName;
        } else if (shouldWarnAutomatically) {
          this.duplicateMatches = highConfidenceMatches;
          this.showDuplicateWarning = true;
          this.duplicateWarningFromSubmit = false;
          this.duplicateWarningContext = 'new';
          this.lastWarnedPlayerName = this.normalizedNewPlayerName;
        }

        return matches;
      } catch (error) {
        if (this.$axios.isCancel(error) || error?.name === 'AbortError') {
          return [];
        }

        console.error('Error checking existing Player Cards:', error);
        return [];
      } finally {
        if (this.duplicateAbortController?.signal === signal) {
          this.duplicateAbortController = null;
          this.duplicateSearchLoading = false;
        }
      }
    },

    openDuplicateWarning() {
      this.duplicateMatches = this.duplicateSuggestions;
      this.showDuplicateWarning = this.duplicateMatches.length > 0;
      this.duplicateWarningFromSubmit = false;
      this.duplicateWarningContext = 'new';
      this.lastWarnedPlayerName = this.normalizedNewPlayerName;
    },

    closeDuplicateWarning() {
      this.showDuplicateWarning = false;
      this.duplicateWarningFromSubmit = false;
      this.pendingCardMatch = null;
    },

    useExistingPlayerCard() {
      const isCardLookup = this.duplicateWarningContext === 'card';
      const selectedMatch = this.pendingCardMatch;
      const searchName = this.newPlayerSearchQuery;
      this.showDuplicateWarning = false;
      this.duplicateWarningFromSubmit = false;
      this.pendingCardMatch = null;

      if (isCardLookup && selectedMatch) {
        this.selectCardPlayer(selectedMatch);
        return;
      }

      this.setRegistrationType('card');
      this.cardSearchQuery = searchName;
      this.onCardSearchInput();
    },

    continueAfterDuplicateWarning() {
      if (this.duplicateWarningContext === 'card') {
        const searchName = this.cardSearchQuery;
        this.showDuplicateWarning = false;
        this.duplicateWarningFromSubmit = false;
        this.pendingCardMatch = null;
        this.setRegistrationType('new');

        const parts = searchName.trim().replace(/\s+/g, ' ').split(' ');
        this.player.firstName = parts.shift() || '';
        this.player.lastName = parts.join(' ');
        this.duplicateBypassName = this.normalizedNewPlayerName;
        this.debouncedDuplicateSearch();
        return;
      }

      const shouldSubmit = this.duplicateWarningFromSubmit;
      this.duplicateBypassName = this.normalizedNewPlayerName;
      this.showDuplicateWarning = false;
      this.duplicateWarningFromSubmit = false;

      if (shouldSubmit) {
        this.emitNewPlayerSubmission();
      }
    },

    reviewCardMatch(match) {
      this.pendingCardMatch = match;
      this.duplicateMatches = [match];
      this.duplicateWarningContext = 'card';
      this.duplicateWarningFromSubmit = false;
      this.showDuplicateWarning = true;
      this.showCardSuggestions = false;
    },

    selectCardPlayer(suggestion) {
      this.selectedCardPlayer = {
        player_name: suggestion.player_name,
        masked_phone: suggestion.masked_phone,
        first_name: suggestion.first_name,
        last_name: suggestion.last_name,
        team_name: suggestion.team_name,
        age_group: suggestion.age_group,
      };
      this.player.firstName = suggestion.first_name;
      this.player.lastName = suggestion.last_name;
      this.player.dob = '';
      this.cardSearchQuery = suggestion.player_name;
      this.showCardSuggestions = false;
    },
    clearCardPlayer() {
      this.selectedCardPlayer = null;
      this.cardSearchQuery = '';
      this.player.firstName = '';
      this.player.lastName = '';
      this.player.dob = '';
      this.cardSuggestions = [];
      this.showCardSuggestions = false;
      this.cardSearchCompleted = false;
    },
    hideCardSuggestions() {
      setTimeout(() => {
        this.showCardSuggestions = false;
      }, 200);
    },
    proceedToPayment() {
      if (!this.isCardRegistrationValid) return;

      this.$emit('submit', {
        contactFirstName: this.contact.firstName,
        contactLastName: this.contact.lastName,
        contactPhoneNumber: this.phoneNumber,
        contactEmail: this.contact.email,
        playerFirstName: this.selectedCardPlayer.first_name,
        playerLastName: this.selectedCardPlayer.last_name,
        dob: this.player.dob,
        teamName: this.teams.find(t => t.name.toLowerCase() === this.player.teamName.toLowerCase())?.id,
        ageGroup: this.player.ageGroup,
        price: this.price,
        discountCodeId: this.player.discountCodeId,
        renewal: true,
        playerId: null,
      });
    },
    async submit() {
      if (this.registrationType !== 'new') return;

      if (this.duplicateBypassName !== this.normalizedNewPlayerName) {
        await this.fetchPotentialCardMatches(true);

        if (this.showDuplicateWarning) {
          return;
        }
      }

      this.emitNewPlayerSubmission();
      return false;
    },
    emitNewPlayerSubmission() {
      this.$emit('submit', {
        contactFirstName: this.contact.firstName,
        contactLastName: this.contact.lastName,
        contactPhoneNumber: this.phoneNumber,
        contactEmail: this.contact.email,
        playerFirstName: this.player.firstName,
        playerLastName: this.player.lastName,
        teamName: this.teams.find(t => t.name.toLowerCase() === this.player.teamName.toLowerCase())?.id,
        dob: this.player.dob,
        ageGroup: this.player.ageGroup,
        price: this.price,
        photo: this.photo,
        discountCodeId: this.player.discountCodeId,
        renewal: false,
        playerId: null
      });
    },
    handleUpload(image) {
      this.cropping = true;
      try {
        if (image && image instanceof Blob) {
          this.photo = image;
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const targetWidth = 500;
              const targetHeight = 500;
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
              const base64Url = canvas.toDataURL('image/jpeg', 0.8);
              this.base64IMG = base64Url;
              this.cropping = false;
            };
            img.onerror = () => {
              console.error('Error loading image into canvas');
              this.cropping = false;
            };
            img.src = reader.result;
          };
          reader.onerror = () => {
            console.error('Error reading image as base64');
            this.cropping = false;
          };
          reader.readAsDataURL(image);
        } else {
          console.error('Invalid image file');
          this.cropping = false;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        this.cropping = false;
      }
    },
    removePhoto() {
      this.photo = null;
      this.base64IMG = '';
    },

    retrieveSeries(id) {
      this.$axios.$get(`v1/series/${id}`).then((response) => {
        const seriesData = response.data.series || {};
        this.series = seriesData;
        this.teams = seriesData.team || [];

        const seen = new Map();
        this.teams.forEach(team => {
          const ag = team.agegroup;
          if (ag && ag.id) {
            if (!seen.has(ag.id)) {
              seen.set(ag.id, { id: ag.id, name: ag.name || '' });
            }
          }
        });
        
        this.ageGroups = Array.from(seen.values());

        this.player.teamName = this.teams.length > 0 ? this.teams[0].name : '';
        this.player.ageGroup = this.ageGroups.length > 0 ? this.ageGroups[0].id : '';

        const firstTeam = this.teams[0] || {};
        const registered = firstTeam.registered_players_count || 0;
        const limit = firstTeam.player_limit || 0;
        this.isPlayerLimitReached = registered >= limit;
        if (this.isPlayerLimitReached) {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Player Registration Limit Reached',
            position: 'bottom',
            variant: 'info',
            queue: true,
          });
        }
      }).catch(err => {
        console.error('Failed to fetch series data', err);
      });
    },

    retrieveTokenData(key) {
      this.$axios.$get(`v1/series/token/${key}`).then((response) => {
        const seriesData = response.data.series || {};
        this.series = seriesData;

        const teamData = response.data.team || {};
        this.team = teamData;

        const registered = teamData.registered_players_count || 0;
        const limit = teamData.player_limit || 0;
        this.isPlayerLimitReached = registered >= limit;

        if (this.isPlayerLimitReached) {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Player Registration Limit Reached',
            position: 'bottom',
            variant: 'info',
            queue: true,
          });
        }

        if (teamData.name) {
          this.player.teamName = teamData.name;
          this.player.ageGroup = teamData.agegroup?.id || '';
          this.player.discountCodeId = teamData.discount_codes_id;

          this.teams = [{ id: teamData.id, name: teamData.name }];
          this.ageGroups = [{ id: teamData.agegroup?.id, name: teamData.agegroup?.name || '' }];
        }
      }).catch(err => {
        console.error('Failed to fetch token data', err);
      });
    },

    agreeAndClose() {
      this.hasAgreedToTerms = true;
      this.showTermsModal = false;
    },
  },
};
</script>
