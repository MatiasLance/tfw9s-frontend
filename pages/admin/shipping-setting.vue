<template>
    <div>
        <BaseHeader class="bg-gradient-to-r from-brand-grey to-brand-black">
            <div
                class="
                space-y-3
                px-6
                text-left
                sm:text-left
                lg:col-span-6 lg:mt-10
                xl:mt-10
                "
            >
                <span
                class="
                    superheadline
                    flex flex-row
                    items-center
                    pb-3
                    text-[1rem]
                    font-normal
                "
                >
                <span class="font-medium">
                    <NuxtLink to="/">
                    <VBtn text color="white">Home</VBtn>
                    </NuxtLink>
                    <NuxtLink to="/admin">
                    <VBtn text color="white">Admin</VBtn>
                    </NuxtLink>
                </span>
                </span>
                <h1
                    class="flex flex-row text-3xl font-bold
                    text-white lg:text-6xl"
                >
                Shipping Settings
                </h1>
            </div>
        </BaseHeader>
        <section class="container mx-auto max-w-screen-xl px-4 py-7">
            <div class="mb-20 mt-10 w-full">
                <div>
        <main class="w-full px-4">
          <div class="my-6 flex flex-wrap items-center justify-between gap-4">
            <div
              class="flex flex-wrap justify-start gap-2"
            >
            <button
              type="button"
              class="
                block w-40 rounded-md
                border
                border-solid border-brand-black bg-brand-black
                px-4
                py-2
                text-center
                text-white
                hover:bg-brand-slate
                focus:bg-brand-black
                md:inline-block
              "
              @click="addShip"
            >
              <span class="flex items-center justify-center" aria-hidden="true">
                <i class="ri-add-line"></i>
                <span class="pr-1">Add Setting</span>
              </span>
            </button>
            <button
              type="button"
              class="
                block w-40 rounded-md
                border
                border-solid border-brand-grey bg-brand-black
                px-4
                py-2
                text-center
                text-white
                hover:bg-brand-slate
                focus:bg-brand-black
                md:inline-block
              "
              @click="productsLink"
            >
              <span class="flex items-center justify-center" aria-hidden="true">
                <i class="ri-arrow-right-line mr-2"></i>
                Products
              </span>
            </button>
            <button
              type="button"
              class="
                block w-40 rounded-md
                border
                border-solid border-brand-black bg-brand-black
                px-4
                py-2
                text-center
                text-white
                hover:bg-brand-slate
                focus:bg-brand-black
                md:inline-block
              "
              @click="categoriesLink"
            >
              <span class="flex items-center justify-center" aria-hidden="true">
                <i class="ri-arrow-right-line mr-2"></i>
                Categories
              </span>
            </button>
            </div>
          </div>
        </main>
      </div>
            </div>
            <div
                v-if="showAddShippingSettingForm"
                class="mx-auto my-3 rounded border border-gray-200
                bg-white p-4
                shadow-lg
                md:p-7 lg:p-6"
            >
                <form action="" @submit.prevent="proceed">
                    <div class="col-span-3 mb-4">
                        <label class="mb-1 block">Label as: </label>
                        <input
                        v-model="settingName"
                        placeholder="Items below 10kg"
                        required
                        class="
                            w-full
                            appearance-none
                            border border-gray-100
                            bg-transparent
                            py-2
                            text-4xl font-bold placeholder:text-brand-lgrey
                            hover:border-gray-400
                            focus:border-gray-400 focus:outline-none
                        "
                        />
                    </div>
                    <div class="grid grid-cols-3 gap-4">

                    <div class="col-span-3 flex flex-col space-y-3">
                        <hr class="my-3 w-32" />
                        <h3 class="mb-5 text-xl font-bold">
                            Own Country
                        </h3>
<label
    class="
    col-span-2
    my-1 flex w-full cursor-pointer items-center
    justify-start
    bg-transparent p-3 text-lg
    hover:border-brand-black
    hover:bg-blue-50 sm:col-span-1
    "
    >
    <span>
        <input
        v-model="own.country.activate"
        name="ownCountryActivate"
        type="checkbox"
        class="
        mt-1 mr-2 h-4 w-4 self-center bg-gray-200
        text-brand-black focus:ring-brand-black"
        />
    </span>
    <span class="self-center">Activate</span>
</label>
                    </div>
                        <!-- COUNTRY own -->
                    <section
                        id="ownCountry"
                        class="col-span-3 grid grid-cols-3 gap-4"
                    >
                        <div class="col-span-3 mb-4">
                            <label class="mb-1 block">Country</label>
                            <select
                                v-model.trim="own.country.name"
                                :disabled="!own.country.activate"
                                class="block w-full appearance-none border
border-gray-200 bg-gray-100 py-4
px-5
text-base
uppercase
hover:border-gray-400 focus:border-gray-400
focus:outline-none disabled:opacity-75"
                            >
                                <option
                                    v-for="(place, key) in countries"
                                    :key="key"
                                    :value="place"
                                    class="uppercase"
                                >
                                    {{ place }}
                                </option>
                            </select>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Shipping value per product
                            </label>
                            <div class="relative w-full">
                                <input
                                    v-model.trim="own.country.shippingValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100 py-4 px-5
                                        pr-12
                                        pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    :disabled="!own.country.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Express Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                    v-model.trim="own.country.expressPostValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100
                                        py-4
                                        px-5 pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    :disabled="!own.country.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Registered Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                v-model.trim="own.country.registeredPostValue"
                                class="
                                w-full
                                appearance-none
                                border border-transparent
                                bg-gray-100
                                py-4
                                px-5 pr-12
                                pl-8
                                text-base
                                hover:border-gray-400
                                focus:border-gray-500
                                focus:outline-none focus:ring-0
                                disabled:opacity-75
                                "
                                type="tel"
                                :disabled="!own.country.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4">
                            <div class="grid w-full grid-cols-3 gap-2">
                                <div
                                    class="col-span-1 flex flex-col
                                    justify-start space-y-2"
                                >
                                <label class="mb-1 block">
                                    Insurance Value</label>
                                <div
                                    class="relative w-full"
                                >
                                    <div
                                        class="pointer-events-none absolute
                                        inset-y-0
                                        left-0 flex items-center pl-4"
                                    >
                                    <span class="text-lg text-gray-700"></span>
                                    </div>
                                    <input
                                        v-model="own.country.insuranceValue"
                                        class="
                                            w-full
                                            appearance-none
                                            border border-transparent
                                            bg-gray-100 py-4 px-5
                                            pr-12
                                            pl-8
                                            text-base
                                            hover:border-gray-400
                                            focus:border-gray-500
                                            focus:outline-none focus:ring-0
                                            disabled:opacity-75
                                        "
                                        type="tel"
                                        :disabled="!own.country.activate"
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="col-span-3 flex flex-col space-y-3">
                        <hr class="my-3 w-32" />
                        <h3 class="mb-5 text-xl font-bold">
                            Own State
                        </h3>
<label
    class="
    col-span-2
    my-1 flex w-full
    cursor-pointer
    bg-transparent p-3 text-lg
    hover:border-brand-black
    hover:bg-blue-50 sm:col-span-1
    "
    >
    <span>
        <input
        v-model="own.state.activate"
        name="ownStateActivate"
        type="checkbox"
        class="
        mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
        focus:ring-brand-black"
        />
    </span>
    <span>Activate</span>
</label>
                    </div>
                        <!-- STATE own -->
                    <section
                        id="ownState"
                        class="col-span-3 grid grid-cols-3 gap-4"
                    >
                        <div class="col-span-3 mb-4">
                            <label class="mb-1 block">State </label>
                            <template v-if="own.country.name === 'Australia'">
                                <select
                                    v-model.trim="own.state.name"
                                    name="state"
                                    class="
                                    block w-full appearance-none border
                                    border-gray-200 bg-gray-100 py-4
                                    px-5
                                    text-base
                                    uppercase
                                    hover:border-gray-400 focus:border-gray-400
                                    focus:outline-none disabled:opacity-75
                                    "
                                    :disabled="!own.state.activate"
                                >
                                    <option value="NSW">
                                        NEW SOUTH WALES
                                    </option>
                                    <option value="QLD">
                                        QUEENSLAND
                                    </option>
                                    <option value="ACT">
                                        AUSTRALIAN CAPITAL TERRITORY
                                    </option>
                                    <option value="VIC">
                                        VICTORIA
                                    </option>
                                    <option value="NT">
                                        NORTHERN TERRITORY
                                    </option>
                                    <option value="WA">
                                        WESTERN AUSTRALIA</option>
                                    <option value="SA">
                                    SOUTH AUSTRALIA
                                    </option>
                                    <option value="TAS">
                                    TASMANIA
                                    </option>
                                </select>
                            </template>
                            <template v-else>
                                <input
                                    v-model.trim="own.state.name"
                                    name="state"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100
                                        py-4
                                        px-5
                                        text-base uppercase
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="text"
                                    required
                                    :disabled="!own.state.activate"
                                />
                            </template>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Shipping value per product
                            </label>
                            <div class="relative w-full">
                                <div
                                    class="pointer-events-none
                                    absolute inset-y-0 left-0
                                    flex items-center pl-4"
                                >
                                    <span class="text-lg text-gray-700"></span>
                                </div>
                                <input
                                    v-model.trim="own.state.shippingValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100 py-4 px-5
                                        pr-12
                                        pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    required
                                    :disabled="!own.state.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Express Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                    v-model.trim="own.state.expressPostValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100
                                        py-4
                                        px-5 pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    required
                                    :disabled="!own.state.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Registered Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                    v-model.trim="own.state.registeredPostValue"
                                    class="
                                    w-full
                                    appearance-none
                                    border border-transparent
                                    bg-gray-100
                                    py-4
                                    px-5 pr-12
                                    pl-8
                                    text-base
                                    hover:border-gray-400
                                    focus:border-gray-500
                                    focus:outline-none focus:ring-0
                                    disabled:opacity-75
                                    "
                                    type="tel"
                                    required
                                    :disabled="!own.state.activate"
                                />
                            </div>
                        </div>
<div class="col-span-3 mb-4">
    <div class="grid w-full grid-cols-3 gap-2">
        <div
            class="col-span-1 flex flex-col
            justify-start space-y-2"
        >
            <label class="mb-1 block">
                Insurance Value</label>
            <div
                class="relative w-full"
            >
                <div
                    class="pointer-events-none absolute
                    inset-y-0
                    left-0 flex items-center pl-4"
                >
                <span class="text-lg text-gray-700"></span>
                </div>
                <input
                    v-model="own.state.insuranceValue"
                    class="
                        w-full
                        appearance-none
                        border border-transparent
                        bg-gray-100 py-4 px-5
                        pr-12
                        pl-8
                        text-base
                        hover:border-gray-400
                        focus:border-gray-500
                        focus:outline-none focus:ring-0
                        disabled:opacity-75
                    "
                    type="tel"
                    :disabled="!own.state.activate"
                />
            </div>
        </div>
    </div>
</div>
                    </section>

                    <div class="col-span-3 flex flex-col space-y-3">
                        <hr class="my-3 w-32" />
                        <h3 class="mb-5 text-xl font-bold">
                            Own City
                        </h3>
                        <label
                            class="
                            col-span-2
                            flex w-full cursor-pointer
                            bg-transparent
                            p-3 text-lg
                            hover:border-brand-black
                            hover:bg-blue-50 sm:col-span-1
                            "
                            >
                            <span>
                                <input
                                v-model="own.city.activate"
                                name="ownCityActivate"
                                type="checkbox"
                                class="
                                mt-1 mr-1
                                h-4 w-4 bg-gray-200 text-brand-black
                                focus:ring-brand-black"
                                />
                            </span>
                            <span>Activate</span>
                        </label>
                </div>
                        <!-- CITY own -->
                    <section
                        id="ownCity"
                        class="col-span-3 grid grid-cols-3 gap-4"
                    >
                        <div class="col-span-3 mb-4">
                            <label class="mb-1 block">City </label>
                            <input
                                v-model.trim="own.city.name"
                                class="
                                    w-full
                                    appearance-none
                                    border border-transparent
                                    bg-gray-100
                                    py-4
                                    px-5
                                    text-base uppercase
                                    hover:border-gray-400
                                    focus:border-gray-500
                                    focus:outline-none focus:ring-0
                                    disabled:opacity-75
                                "
                                type="text"
                                required
                                :disabled="!own.city.activate"
                            />
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Shipping value per product
                            </label>
                            <div class="relative w-full">
                                <div
                                    class="pointer-events-none
                                    absolute inset-y-0 left-0
                                    flex items-center pl-4"
                                >
                                    <span class="text-lg text-gray-700"></span>
                                </div>
                                <input
                                    v-model.trim="own.city.shippingValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100 py-4 px-5
                                        pr-12
                                        pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    required
                                    :disabled="!own.city.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Express Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                    v-model.trim="own.city.expressPostValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100
                                        py-4
                                        px-5 pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    required
                                    :disabled="!own.city.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Registered Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                v-model.trim="own.city.registeredPostValue"
                                class="
                                w-full
                                appearance-none
                                border border-transparent
                                bg-gray-100
                                py-4
                                px-5 pr-12
                                pl-8
                                text-base
                                hover:border-gray-400
                                focus:border-gray-500
                                focus:outline-none focus:ring-0
                                disabled:opacity-75
                                "
                                type="tel"
                                required
                                :disabled="!own.city.activate"
                                />
                            </div>
                        </div>
<div class="col-span-3 mb-4">
    <div class="grid w-full grid-cols-3 gap-2">
        <div
            class="col-span-1 flex flex-col
            justify-start space-y-2"
        >
        <label class="mb-1 block">
            Insurance Value
        </label>
            <div
                class="relative w-full"
            >
                <div
                    class="pointer-events-none absolute
                    inset-y-0
                    left-0 flex items-center pl-4"
                >
                <span class="text-lg text-gray-700"></span>
                </div>
                <input
                    v-model="own.city.insuranceValue"
                    class="
                        w-full
                        appearance-none
                        border border-transparent
                        bg-gray-100 py-4 px-5
                        pr-12
                        pl-8
                        text-base
                        hover:border-gray-400
                        focus:border-gray-500
                        focus:outline-none focus:ring-0
                        disabled:opacity-75
                    "
                    type="tel"
                    :disabled="!own.city.activate"
                />
            </div>
        </div>
    </div>
</div>
                    </section>

                    <div class="col-span-3 flex flex-col space-y-3">
                        <hr class="my-3 w-32" />
                        <h3 class="mb-5 text-xl font-bold">
                            Other Country
                        </h3>
                        <label
                            class="
                            col-span-2
                            flex w-full cursor-pointer
                            bg-transparent
                            p-3 text-lg
                            hover:border-brand-black
                            hover:bg-blue-50 sm:col-span-1
                            "
                            >
                            <span>
                                <input
                                v-model="other.country.activate"
                                name="otherCountryActivate"
                                type="checkbox"
                                class="
                                mt-1 mr-1
                                h-4 w-4 bg-gray-200 text-brand-black
                                focus:ring-brand-black"
                                />
                            </span>
                            <span>Activate</span>
                        </label>
                    </div>
                        <!-- COUNTRY other -->
                    <section
                        id="otherCountry"
                        class="col-span-3 grid grid-cols-3 gap-4"
                    >
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Shipping value per product
                            </label>
                            <div class="relative w-full">
                                <input
                                    v-model.trim="other.country.shippingValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100 py-4 px-5
                                        pr-12
                                        pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    :disabled="!other.country.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Express Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                v-model.trim="other.country.expressPostValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100
                                        py-4
                                        px-5 pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    required
                                    :disabled="!other.country.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Registered Post Value
                            </label>
                            <div class="relative w-full">
                                <input
                                v-model.trim="other.country.registeredPostValue"
                                class="
                                w-full
                                appearance-none
                                border border-transparent
                                bg-gray-100
                                py-4
                                px-5 pr-12
                                pl-8
                                text-base
                                hover:border-gray-400
                                focus:border-gray-500
                                focus:outline-none focus:ring-0
                                disabled:opacity-75
                                "
                                type="tel"
                                required
                                :disabled="!other.country.activate"
                                />
                            </div>
                        </div>
<div class="col-span-3 mb-4">
    <div class="grid w-full grid-cols-3 gap-2">
        <div
            class="col-span-1 flex flex-col
            justify-start space-y-2"
        >
        <label class="mb-1 block">
            Insurance Value</label>
        <div
            class="relative w-full"
        >
            <div
                class="pointer-events-none absolute
                inset-y-0
                left-0 flex items-center pl-4"
            >
            <span class="text-lg text-gray-700"></span>
            </div>
            <input
                v-model="other.country.insuranceValue"
                class="
                    w-full
                    appearance-none
                    border border-transparent
                    bg-gray-100 py-4 px-5
                    pr-12
                    pl-8
                    text-base
                    hover:border-gray-400
                    focus:border-gray-500
                    focus:outline-none focus:ring-0
                    disabled:opacity-75
                "
                type="tel"
                :disabled="!other.country.activate"
            />
        </div>
        </div>
    </div>
</div>
                    </section>

                    <div class="col-span-3 flex flex-col space-y-3">
                        <hr class="my-3 w-32" />
                        <h3 class="mb-5 text-xl font-bold">
                            Other State
                        </h3>
                        <label
                            class="
                            col-span-2
                            flex w-full cursor-pointer
                            bg-transparent
                            p-3 text-lg
                            hover:border-brand-black
                            hover:bg-blue-50 sm:col-span-1
                            "
                            >
                            <span>
                                <input
                                v-model="other.state.activate"
                                name="otherStateActivate"
                                type="checkbox"
                                class="
                                mt-1 mr-1
                                h-4 w-4 bg-gray-200 text-brand-black
                                focus:ring-brand-black"
                                />
                            </span>
                            <span>Activate</span>
                        </label>
                    </div>
                        <!-- STATE other -->
                    <section
                        id="otherState"
                        class="col-span-3 grid grid-cols-3 gap-4"
                    >
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Shipping value per product
                            </label>
                            <div class="relative w-full">
                                <div
                                    class="pointer-events-none
                                    absolute inset-y-0 left-0
                                    flex items-center pl-4"
                                >
                                    <span class="text-lg text-gray-700"></span>
                                </div>
                                <input
                                    v-model.trim="other.state.shippingValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100 py-4 px-5
                                        pr-12
                                        pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    :disabled="!other.state.activate"
                                />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Registered Post Value
                            </label>
                            <div
                                class="relative w-full"
                            >
                                <div
                                    class="pointer-events-none absolute
                                    inset-y-0
                                    left-0 flex items-center pl-4"
                                >
                                <span class="text-lg text-gray-700"></span>
                                </div>
                            <input
                            v-model.trim="other.state.registeredPostValue"
                            class="
                                w-full
                                appearance-none
                                border border-transparent
                                bg-gray-100
                                py-4
                                px-5 pr-12
                                pl-8
                                text-base
                                hover:border-gray-400
                                focus:border-gray-500
                                focus:outline-none focus:ring-0
                                disabled:opacity-75
                            "
                            type="tel"
                            :disabled="!other.state.activate"
                            />
                            </div>
                        </div>
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Express Post Value
                            </label>
                            <input
                                v-model.trim="other.state.expressPostValue"
                                class="
                                    w-full
                                    appearance-none
                                    border border-transparent
                                    bg-gray-100
                                    py-4
                                    px-5 pl-8
                                    text-base
                                    hover:border-gray-400
                                    focus:border-gray-500
                                    focus:outline-none focus:ring-0
                                    disabled:opacity-75
                                "
                                type="tel"
                                :disabled="!other.state.activate"
                            />
                        </div>
<div class="col-span-3 mb-4">
    <div class="grid w-full grid-cols-3 gap-2">
        <div
            class="col-span-1 flex flex-col
            justify-start space-y-2"
        >
        <label class="mb-1 block">
            Insurance Value</label>
        <div
            class="relative w-full"
        >
            <div
                class="pointer-events-none absolute
                inset-y-0
                left-0 flex items-center pl-4"
            >
            <span class="text-lg text-gray-700"></span>
            </div>
            <input
                v-model="other.state.insuranceValue"
                class="
                    w-full
                    appearance-none
                    border border-transparent
                    bg-gray-100 py-4 px-5
                    pr-12
                    pl-8
                    text-base
                    hover:border-gray-400
                    focus:border-gray-500
                    focus:outline-none focus:ring-0
                    disabled:opacity-75
                "
                type="tel"
                :disabled="!other.state.activate"
            />
        </div>
        </div>
    </div>
</div>
                    </section>

                    <div class="col-span-3 flex flex-col space-y-3">
                        <hr class="my-3 w-32" />
                        <h3 class="mb-5 text-xl font-bold">
                            Other City
                        </h3>
                        <label
                            class="
                            col-span-2
                            flex w-full cursor-pointer
                            bg-transparent
                            p-3 text-lg
                            hover:border-brand-black
                            hover:bg-blue-50 sm:col-span-1
                            "
                            >
                            <span>
                                <input
                                v-model="other.city.activate"
                                name="otherCityActivate"
                                type="checkbox"
                                class="
                                mt-1 mr-1
                                h-4 w-4 bg-gray-200 text-brand-black
                                focus:ring-brand-black"
                                />
                            </span>
                            <span>Activate</span>
                        </label>
                    </div>
                        <!-- CITY other -->
                    <section
                        id="otherCity"
                        class="col-span-3 grid grid-cols-3 gap-4"
                    >
                        <div class="col-span-3 mb-4 lg:col-span-1">
                            <label class="mb-1 block">
                                Shipping value per product
                            </label>
                            <div class="relative w-full">
                                <div
                                    class="pointer-events-none
                                    absolute inset-y-0 left-0
                                    flex items-center pl-4"
                                >
                                    <span class="text-lg text-gray-700"></span>
                                </div>
                                <input
                                    v-model.trim="other.city.shippingValue"
                                    class="
                                        w-full
                                        appearance-none
                                        border border-transparent
                                        bg-gray-100 py-4 px-5
                                        pr-12
                                        pl-8
                                        text-base
                                        hover:border-gray-400
                                        focus:border-gray-500
                                        focus:outline-none focus:ring-0
                                        disabled:opacity-75
                                    "
                                    type="tel"
                                    :disabled="!other.city.activate"
                                />
                            </div>
                        </div>
<div class="col-span-3 mb-4 lg:col-span-1">
    <label class="mb-1 block">
        Registered Post Value
    </label>
    <div
        class="relative w-full"
    >
        <div
            class="pointer-events-none absolute
            inset-y-0
            left-0 flex items-center pl-4"
        >
        <span class="text-lg text-gray-700"></span>
        </div>
    <input
    v-model.trim="other.city.registeredPostValue"
    class="
        w-full
        appearance-none
        border border-transparent
        bg-gray-100
        py-4
        px-5 pr-12
        pl-8
        text-base
        hover:border-gray-400
        focus:border-gray-500
        focus:outline-none focus:ring-0
        disabled:opacity-75
    "
    type="tel"
    :disabled="!other.city.activate"
    required
    />
    </div>
</div>
<div class="col-span-3 mb-4 lg:col-span-1">
    <label class="mb-1 block">
        Express Post Value
    </label>
    <input
        v-model.trim="other.city.expressPostValue"
        class="
            w-full
            appearance-none
            border border-transparent
            bg-gray-100
            py-4
            px-5 pl-8
            text-base
            hover:border-gray-400
            focus:border-gray-500
            focus:outline-none focus:ring-0
            disabled:opacity-75
        "
        type="tel"
        :disabled="!other.city.activate"
        required
    />
</div>
<div class="col-span-3 mb-4">
    <div class="grid w-full grid-cols-3 gap-2">
        <div
            class="col-span-1 flex flex-col
            justify-start space-y-2"
        >
            <label class="mb-1 block">
                Insurance Value</label>
            <div
                class="relative w-full"
            >
                <div
                    class="pointer-events-none absolute
                    inset-y-0
                    left-0 flex items-center pl-4"
                >
                <span class="text-lg text-gray-700"></span>
                </div>
                <input
                    v-model="other.city.insuranceValue"
                    class="
                        w-full
                        appearance-none
                        border border-transparent
                        bg-gray-100 py-4 px-5
                        pr-12
                        pl-8
                        text-base
                        hover:border-gray-400
                        focus:border-gray-500
                        focus:outline-none focus:ring-0
                        disabled:opacity-75
                    "
                    type="tel"
                    :disabled="!other.city.activate"
                />
            </div>
        </div>
    </div>
</div>
                    </section>
                        <!-- BUTTONS -->
                        <div class="col-span-3 my-4">
                            <hr class="my-4" />
                            <div
                                class="flex flex-col justify-start
                                sm:flex-row sm:justify-end
                                sm:space-x-4"
                            >
                                <button
                                type="submit"
                                class="
                                    my-2
                                    inline-block
                                    w-full
                                    border border-transparent
                                    bg-brand-green
                                    py-3
                                    px-5
                                    text-center
                                    font-bold
                                    text-white
                                    hover:bg-brand-dgrey
                                "
                                >
                                Confirm
                                </button>
                                <button
                                type="button"
                                class="
                                    my-2
                                    inline-block
                                    w-full
                                    border border-transparent
                                    bg-brand-lgrey
                                    py-3
                                    px-5
                                    text-center
                                    font-bold
                                    text-brand-black
                                    hover:bg-brand-dgrey hover:text-white
                                "
                                @click="cancel"
                                >
                                Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="my-16">
                <h2 class="pb-6 font-bold uppercase text-gray-400">
                    saved
                </h2>

                <div
                    class="grid grid-cols-2 gap-4"
                >
                    <article
                        v-for="setting in shippingSettingsList"
                        :key="setting.id"
                        class="mb-5 border border-gray-200 bg-white shadow-lg"
                    >
                        <div
                            class="relative overflow-hidden bg-brand-lgrey
                            p-0.5"
                        >
                            <span
                                class="h-60 w-60
                                text-6xl text-brand-dgrey"
                            >
                               {{ setting.name }}
                            </span>
                        </div>
                        <div class="border-t border-t-gray-200 p-4">
                            <div class="grid grid-cols-2 gap-4">
                                <section class="col-span-2">
                                <p>
                                    Country: {{ setting.country }}
                                </p>
                                <div
                                    class="mb-6 grid grid-cols-1
                                    gap-4 sm:grid-cols-2"
                                >
                                    <p>
                                        Shipping:
                                        {{ setting.shipping_rate }}
                                    </p>
                                    <p>
                                        Insurance:
                                        {{ setting.insurance_value }}
                                    </p>
                                    <p>
                                        Registered:
                                        {{ setting.registered_value }}
                                    </p>
                                    <p>
                                        Express:
                                        {{ setting.express_value }}
                                    </p>
                                </div>
                                <p>
                                    State: {{ setting.state }}
                                </p>
                                <div
                                    class="mb-6 grid grid-cols-1
                                    gap-4 sm:grid-cols-2"
                                >
                                    <p>
                                        Shipping:
                                        {{ setting.shipping_rate }}
                                    </p>
                                    <p>
                                        Insurance:
                                        {{ setting.insurance_value }}
                                    </p>
                                    <p>
                                        Registered:
                                        {{ setting.registered_value }}
                                    </p>
                                    <p>
                                        Express:
                                        {{ setting.express_value }}
                                    </p>
                                </div>
                                <p>
                                    City: {{ setting.city }}
                                </p>
                                <div
                                    class="mb-6 grid grid-cols-1
                                    gap-4 sm:grid-cols-2"
                                >
                                    <p>
                                        Shipping:
                                        {{ setting.shipping_rate }}
                                    </p>
                                    <p>
                                        Insurance:
                                        {{ setting.insurance_value }}
                                    </p>
                                    <p>
                                        Registered:
                                        {{ setting.registered_value }}
                                    </p>
                                    <p>
                                        Express:
                                        {{ setting.express_value }}
                                    </p>
                                </div>
                            </section>
                            </div>
                        <div class="mt-4 flex flex-wrap justify-start gap-2">
            <button
                type="button"
                class="
                mr-2
                flex
                cursor-pointer
                items-center text-lg
                text-brand-black
                hover:text-brand-dred
                hover:underline hover:decoration-brand-dred
                "
                @click="removeShipping(setting.id)"
            >
                <i class="ri-delete-bin-5-line"></i> Remove
            </button>
                        </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import BaseHeader from '~/components/base/BaseHeader';
import aosMixin from '~/mixins/aos';
import currencyMixin from '@/mixins/currency';

const countryList = {
  'AF': 'Afghanistan',
  'AX': 'Åland Islands',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua and Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BS': 'Bahamas',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia',
  'BQ': 'Bonaire, Sint Eustatius and Saba',
  'BA': 'Bosnia and Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory',
  'BN': 'Brunei Darussalam',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'CV': 'Cabo Verde',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'KY': 'Cayman Islands',
  'CF': 'Central African Republic',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands',
  'CO': 'Colombia',
  'KM': 'Comoros',
  'CD': 'Congo (the Democratic Republic of the)',
  'CG': 'Congo',
  'CK': 'Cook Islands',
  'CR': 'Costa Rica',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CW': 'Curaçao',
  'CY': 'Cyprus',
  'CZ': 'Czechia',
  'CI': 'Côte d\'Ivoire',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'SZ': 'Eswatini',
  'ET': 'Ethiopia',
  'FK': 'Falkland Islands [Malvinas]',
  'FO': 'Faroe Islands',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'FR': 'France',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories',
  'GA': 'Gabon',
  'GM': 'Gambia',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GG': 'Guernsey',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard Island and McDonald Islands',
  'VA': 'Holy See',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran (Islamic Republic of)',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IM': 'Isle of Man',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JE': 'Jersey',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KP': 'North Korea',
  'KR': 'South Korea',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Lao People\'s Democratic Republic',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macao',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia (Federated States of)',
  'MD': 'Moldova (the Republic of)',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'MP': 'Northern Mariana Islands',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestine, State of',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines',
  'PN': 'Pitcairn',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'MK': 'Republic of North Macedonia',
  'RO': 'Romania',
  'RU': 'Russian Federation',
  'RW': 'Rwanda',
  'RE': 'Réunion',
  'BL': 'Saint Barthélemy',
  'SH': 'Saint Helena, Ascension and Tristan da Cunha',
  'KN': 'Saint Kitts and Nevis',
  'LC': 'Saint Lucia',
  'MF': 'Saint Martin (French part)',
  'PM': 'Saint Pierre and Miquelon',
  'VC': 'Saint Vincent and the Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'ST': 'Sao Tome and Principe',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SX': 'Sint Maarten (Dutch part)',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia and the South Sandwich Islands',
  'SS': 'South Sudan',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan',
  'SR': 'Suriname',
  'SJ': 'Svalbard and Jan Mayen',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syrian Arab Republic',
  'TW': 'Taiwan',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania, United Republic of',
  'TH': 'Thailand',
  'TL': 'Timor-Leste',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad and Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks and Caicos Islands',
  'TV': 'Tuvalu',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates',
  'GB': 'United Kingdom of Great Britain and Northern Ireland',
  'UM': 'United States Minor Outlying Islands',
  'US': 'United States of America',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VE': 'Venezuela (Bolivarian Republic of)',
  'VN': 'Viet Nam',
  'VG': 'Virgin Islands (British)',
  'VI': 'Virgin Islands (U.S.)',
  'WF': 'Wallis and Futuna',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
};

export default {
  name: 'shipping-setting',
  components: { BaseHeader },
  mixins: [
    aosMixin,
    currencyMixin,
  ],
  data() {
    return {
      editingShippingSetting: {},
      editedShippingSetting: {},
      shippingSettingsList: [],
      settingName: '',
      ownOrOtherCountry: 'other',
      ownOrOtherState: '',
      ownOrOtherCity: '',
      own: {
        country: {
          name: 'Australia',
          shippingValue: 0,
          insuranceValue: 0,
          registeredPostValue: 0,
          expressPostValue: 0,
          maxShippingValue: 0,
          freeShippingValue: 0,
          maxShippingCheck: false,
          freeShippingCheck: false,
          showMaxShipping: false,
          showFreeShippingNote: false,
          activate: false,
        },
        state: {
          name: 'NSW',
          shippingValue: 0,
          insuranceValue: 0,
          registeredPostValue: 0,
          expressPostValue: 0,
          maxShippingValue: 0,
          freeShippingValue: 0,
          maxShippingCheck: false,
          freeShippingCheck: false,
          showMaxShipping: false,
          showFreeShippingNote: false,
          activate: false,
        },
        city: {
          name: 'Sydney',
          shippingValue: 0,
          insuranceValue: 0,
          registeredPostValue: 0,
          expressPostValue: 0,
          maxShippingValue: 0,
          freeShippingValue: 0,
          maxShippingCheck: false,
          freeShippingCheck: false,
          showMaxShipping: false,
          showFreeShippingNote: false,
          activate: false,
        }
      },
      other: {
        country: {
          shippingValue: 0,
          insuranceValue: 0,
          registeredPostValue: 0,
          expressPostValue: 0,
          maxShippingValue: 0,
          freeShippingValue: 0,
          maxShippingCheck: false,
          freeShippingCheck: false,
          showMaxShipping: false,
          showFreeShippingNote: false,
          activate: false,
        },
        state: {
          shippingValue: 0,
          insuranceValue: 0,
          registeredPostValue: 0,
          expressPostValue: 0,
          maxShippingValue: 0,
          freeShippingValue: 0,
          maxShippingCheck: false,
          freeShippingCheck: false,
          showMaxShipping: false,
          showFreeShippingNote: false,
          activate: false,
        },
        city: {
          shippingValue: 0,
          insuranceValue: 0,
          registeredPostValue: 0,
          expressPostValue: 0,
          maxShippingValue: 0,
          freeShippingValue: 0,
          maxShippingCheck: false,
          freeShippingCheck: false,
          showMaxShipping: false,
          showFreeShippingNote: false,
          activate: false,
        },
      },
      country: 'Australia',
      ownCountry: '',
      state: '',
      city: '',
      shippingRateCountry: 0,
      shippingRateState: 0,
      shippingRateCity: 0,
      registeredValueCountry: 0,
      registeredValueState: 0,
      registeredValueCity: 0,
      insuranceCheck: false,
      insuranceCheck2: false,
      insuranceCheck3: false,
      insuranceCheck4: false,
      insuranceCheck5: false,
      insuranceCheck6: false,
      insuranceCountry: 0,
      insuranceState: 0,
      insuranceCity: 0,
      expressValueCountry: 0,
      expressValueState: 0,
      expressValueCity: 0,
      maxShippingValueCountry: 0,
      maxShippingValueState: 0,
      maxShippingValueCity: 0,
      freeShippingValueCountry: 0,
      freeShippingValueState: 0,
      freeShippingValueCity: 0,
      maxShippingCheckCountry: false,
      maxShippingCheckState: false,
      maxShippingCheckCity: false,
      freeShippingCheckCountry: false,
      freeShippingCheckState: false,
      freeShippingCheckCity: false,
      showMaxShippingCountry: false,
      showMaxShippingState: false,
      showMaxShippingCity: false,
      isDefaultCountry: false,
      showRegisteredPost: false,
      showExpressPost: false,
      selectShippingMode: '',
      showAddShippingSettingForm: false,
      showFreeShippingNoteCountry: false,
      showFreeShippingNoteState: false,
      showFreeShippingNoteCity: false,
      shippingChoice: 'AU',
      countries: countryList,
      showInsurance: false,
      showInsurance2: false,
      showInsurance3: false,
      showInsurance4: false,
      showInsurance5: false,
      showInsurance6: false,
      showSample: false,
      showOwnState: false,
      showOtherState: false,
      showOwnCity: false,
      showOtherCity: false,
      showSelectState: false,
      showSelectCity: false
    }
  },
  mounted() {
    /*
     * todo: remove comment when backend is ready.
     * this.retrieveShipping()
     */
  },
  methods: {
    testFunc6() {
      this.showOwnCity = true
      this.showOtherCity = false
    },
    testFunc7() {
      this.showOtherCity = true
      this.showOwnCity = false
    },
    testFunc4() {
      this.showOwnState = true
      this.showOtherState = false
      this.showSelectCity = true
    },
    testFunc5() {
      this.showOtherState = true
      this.showOwnState = false
      this.showSelectCity = true
    },
    testFunc2() {
      this.showSelectState = true
    },
    testFunc1() {
      this.showOwnState = false
      this.showOtherState = false
      this.showOwnCity = false
      this.showOtherCity = false
      this.showSelectState = false
      this.showSelectCity = false
      this.ownOrOtherState = ''
      this.ownOrOtherCity = ''
    },
    categoriesLink() {
      this.$router.push('/admin/categories')
    },
    productsLink() {
      this.$router.push('/admin/parts-list')
    },
    toggleShippingMode() {
      if (this.selectShippingMode === 'standard') {
        this.showRegisteredPost = true
        this.showExpressPost = false
        this.own.country.expressPostValue = 0.00
      }
      if (this.selectShippingMode === 'express') {
        this.showExpressPost = true
        this.showRegisteredPost = false
        this.own.country.registeredPostValue = 0.00
      }
    },
    toggleInsurance() {
      if (this.insuranceCheck === true) {
        this.showInsurance = true
      } else {
        this.showInsurance = false
        this.own.country.insuranceValue = 0.00
      }
    },
    toggleInsurance2() {
      if (this.insuranceCheck2 === true) {
        this.showInsurance2 = true
      } else {
        this.showInsurance2 = false
        this.own.state.insuranceValue = 0.00
      }
    },
    toggleInsurance3() {
      if (this.insuranceCheck3 === true) {
        this.showInsurance3 = true
      } else {
        this.showInsurance3 = false
        this.own.city.insuranceValue = 0.00
      }
    },
    toggleInsurance4() {
      if (this.insuranceCheck4 === true) {
        this.showInsurance4 = true
      } else {
        this.showInsurance4 = false
        this.other.country.insuranceValue = 0.00
      }
    },
    toggleInsurance5() {
      if (this.insuranceCheck5 === true) {
        this.showInsurance5 = true
      } else {
        this.showInsurance5 = false
        this.other.state.insuranceValue = 0.00
      }
    },
    toggleInsurance6() {
      if (this.insuranceCheck6 === true) {
        this.showInsurance6 = true
      } else {
        this.showInsurance6 = false
        this.other.city.insuranceValue = 0.00
      }
    },
    toggleMaxShippingCountry() {
      if (this.own.country.maxShippingCheck === true) {
        this.own.country.showMaxShipping = true
      } else {
        this.own.country.showMaxShipping = false
      }
    },
    toggleMaxShippingCountryOther() {
      if (this.other.country.maxShippingCheck === true) {
        this.other.country.showMaxShipping = true
      } else {
        this.other.country.showMaxShipping = false
      }
    },
    toggleMaxShippingState() {
      if (this.own.state.maxShippingCheck === true) {
        this.own.state.showMaxShipping = true
      } else {
        this.own.state.showMaxShipping = false
      }
    },
    toggleMaxShippingStateOther() {
      if (this.other.state.maxShippingCheck === true) {
        this.other.state.showMaxShipping = true
      } else {
        this.other.state.showMaxShipping = false
      }
    },
    toggleMaxShippingCity() {
      if (this.own.city.maxShippingCheck === true) {
        this.own.city.showMaxShipping = true
      } else {
        this.own.city.showMaxShipping = false
      }
    },
    toggleMaxShippingCityOther() {
      if (this.other.city.maxShippingCheck === true) {
        this.other.city.showMaxShipping = true
      } else {
        this.other.city.showMaxShipping = false
      }
    },
    addShip() {
      this.showAddShippingSettingForm = true
    },
    hideShip() {
      this.showAddShippingSettingForm = false
    },
    checkActiveIfOwn() {
      return (
        this.own.country.activate === true ||
        this.own.state.activate === true ||
        this.own.city.activate === true
      )
    },
    checkActiveIfOther() {
      return (
        this.other.country.activate === true ||
        this.other.state.activate === true ||
        this.other.city.activate === true
      )
    },
    proceed() {
    // todo: remove this upon finalising
      this.$oruga.notification.open({
        message: 'Work in progress',
        variant: 'warning',
        duration: 3000,
        queue: true,
        position: 'bottom'
      })
      const shippingValuesForm = {
        name: this.settingName,
        country: this.own.country.name,
        state: this.own.state.name,
        city: this.own.city.name,
        // eslint-disable-next-line camelcase
        shipping_rate: this.own.country.shippingValue,
        // eslint-disable-next-line camelcase
        insurance_value: this.own.country.insuranceValue,
        // eslint-disable-next-line camelcase
        registered_value: this.own.country.registeredPostValue,
        // eslint-disable-next-line camelcase
        express_value: this.own.country.expressPostValue,
        // eslint-disable-next-line camelcase
        maxshipping_value: 0,
        // eslint-disable-next-line camelcase
        freeshipping_value: 0
      }
      const otherCountryForm = {
        name: this.settingName,
        country: 'Own Country',
        state: 'Own State',
        city: 'Own City',
        // eslint-disable-next-line camelcase
        shipping_rate: this.other.country.shippingValue,
        // eslint-disable-next-line camelcase
        insurance_value: this.other.country.insuranceValue,
        // eslint-disable-next-line camelcase
        registered_value: this.other.country.registeredPostValue,
        // eslint-disable-next-line camelcase
        express_value: this.other.country.expressPostValue,
        // eslint-disable-next-line camelcase
        maxshipping_value: 0,
        // eslint-disable-next-line camelcase
        freeshipping_value: 0
      }

      // own
      if (this.checkActiveIfOwn()) {
        if (!this.own.country.activate) {
          shippingValuesForm.country = 'n/a'
        }
        if (!this.own.state.activate) {
          shippingValuesForm.state = 'n/a'
        }
        if (!this.own.city.activate) {
          shippingValuesForm.city = 'n/a'
        }
        this.$axios
          .$post('v1/shipping/', shippingValuesForm)
          .then((response) => {
            this.$oruga.notification.open({
              message: `${response.title} for Own Country`,
              variant: 'success',
              duration: 3000,
              position: 'bottom',
              queue: true
            })
            this.retrieveShipping()
          })
          .catch((err) => {
            this.$oruga.notifcation.open({
              message: err.message,
              variant: 'danger',
              duration: 3000,
              position: 'bottom',
              queue: true
            })
          })
      } else {
        this.$oruga.notification.open({
          message: 'Own Country/State/City fields are currently disabled. To enable one, tick Activate checkbox.',
          variant: 'info',
          duration: 3000,
          position: 'bottom',
        })
      }
      // other
      if (this.checkActiveIfOther()) {
        if (!this.other.country.activate) {
          otherCountryForm.country = 'n/a'
        }
        if (!this.other.state.activate) {
          otherCountryForm.state = 'n/a'
        }
        if (!this.other.city.activate) {
          otherCountryForm.city = 'n/a'
        }
        setTimeout(() => {
          this.$axios
            .$post('v1/shipping/', otherCountryForm)
            .then((response) => {
              this.$oruga.notification.open({
                message: `${response.title} for Other Country`,
                variant: 'success',
                duration: 3000,
                position: 'bottom',
                queue: true
              })
              this.retrieveShipping()
            })
            .catch((err) => {
              this.$oruga.notifcation.open({
                message: err.message,
                variant: 'danger',
                duration: 3000,
                position: 'bottom',
                queue: true
              })
            })
        }, 3000);
      } else {
        this.$oruga.notification.open({
          message: 'Other Country/State/City fields are currently disabled. To enable one, tick Activate checkbox.',
          variant: 'info',
          duration: 3000,
          position: 'bottom',
        })
      }
    },
    retrieveShipping() {
      this.$axios
        .$get('v1/shipping/')
        .then((response) => {
          this.shippingSettingsList = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
    },
    editShipping(sid) {
      this.$axios
        .$get(`v1/shipping/${sid}`)
        .then((response) => {
          this.editingShippingSetting = response.data.data
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
    },
    // todo: hide update Shipping for now
    updateShipping() {
      this.$oruga.notification.open({
        message: 'Work in progress',
        variant: 'warning',
        duration: 3000,
        position: 'bottom',
        queue: true
      })
    },
    removeShipping(index) {
      this.$axios
        .$delete(`/v1/shipping/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.retrieveShipping()
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true
          })
        })
    },
    cancel() {
      this.hideShip()
    },
    setOwnCountry() {
      if (!this.isDefaultCountry) {
        this.ownCountry = ''
      } else {
        this.ownCountry = this.country
      }
    },
  }
}
</script>