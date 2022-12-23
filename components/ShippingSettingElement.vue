<template>
    <div>
        <article
            v-for="setting in options"
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
                    <template v-if="setting.country">
                        <p>
                            Country: {{ setting.country }}
                        </p>
                        <div
                            class="mb-6 grid grid-cols-1
                            gap-4 sm:grid-cols-2"
                        >
                            <p>
                                Shipping:
                                {{ setting.shipping_value }}
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
                    </template>
                    <template v-if="setting.state">
                        <p>
                            State: {{ setting.state }}
                        </p>
                        <div
                            class="mb-6 grid grid-cols-1
                            gap-4 sm:grid-cols-2"
                        >
                            <p>
                                Shipping:
                                {{ setting.shipping_value }}
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
                    </template>
                    <template v-if="setting.city">
                        <p>
                            City: {{ setting.city }}
                        </p>
                        <div
                            class="mb-6 grid grid-cols-1
                            gap-4 sm:grid-cols-2"
                        >
                            <p>
                                Shipping:
                                {{ setting.shipping_value }}
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
                    </template>
                </section>
                </div>
            <div class="mt-4 flex flex-wrap justify-start gap-2">
<template v-if="shippingType === 'own'">
    <template v-if="setting.country">
        <button
            type="button"
            class="
            mr-2
            flex
            cursor-pointer
            items-center text-lg
            text-brand-red
            hover:text-brand-dred hover:underline hover:decoration-brand-dred
            "
            @click="removeShippingOwnCountry(setting.id)"
        >
            <i class="ri-delete-bin-5-line"></i> Remove
        </button>
    </template>
    <template v-if="setting.state">
        <button
            type="button"
            class="
            mr-2
            flex
            cursor-pointer
            items-center text-lg
            text-brand-red
            hover:text-brand-dred hover:underline hover:decoration-brand-dred
            "
            @click="removeShippingOwnState(setting.id)"
        >
            <i class="ri-delete-bin-5-line"></i> Remove
        </button>
    </template>
    <template v-if="setting.city">
        <button
            type="button"
            class="
            mr-2
            flex
            cursor-pointer
            items-center text-lg
            text-brand-red
            hover:text-brand-dred hover:underline hover:decoration-brand-dred
            "
            @click="removeShippingOwnCity(setting.id)"
        >
            <i class="ri-delete-bin-5-line"></i> Remove
        </button>
    </template>
</template>
<template v-if="shippingType === 'other'">
    <template v-if="setting.country">
        <button
        type="button"
        class="
        mr-2
        flex
        cursor-pointer
        items-center text-lg
        text-brand-red
        hover:text-brand-dred hover:underline hover:decoration-brand-dred
        "
        @click="removeShippingOtherCountry(setting.id)"
    >
        <i class="ri-delete-bin-5-line"></i> Remove
    </button>
    </template>
    <template v-if="setting.state">
        <button
        type="button"
        class="
        mr-2
        flex
        cursor-pointer
        items-center text-lg
        text-brand-red
        hover:text-brand-dred hover:underline hover:decoration-brand-dred
        "
        @click="removeShippingOtherState(setting.id)"
        >
        <i class="ri-delete-bin-5-line"></i> Remove
        </button>
    </template>
    <template v-if="setting.city">
        <button
        type="button"
        class="
        mr-2
        flex
        cursor-pointer
        items-center text-lg
        text-brand-red
        hover:text-brand-dred hover:underline hover:decoration-brand-dred
        "
        @click="removeShippingOtherCity(setting.id)"
        >
        <i class="ri-delete-bin-5-line"></i> Remove
        </button>
    </template>
</template>
            </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
  name: 'ShippingSettingElement',
  props: {
    options: {
      type: Array,
      required: true
    },
    shippingType: {
      type: String,
      required: true
    }
  },
  methods: {
    removeShippingOwnCountry(index) {
      // delete own country
      this.$axios
        .$delete(`/v1/shipping/country/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `${response.title} for Own Country`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('change')
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
    removeShippingOwnState(index) {
    // delete own state
      this.$axios
        .$delete(`/v1/shipping/state/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `${response.title} for Own State`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('change')
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
    removeShippingOwnCity(index) {
      // delete own city
      this.$axios
        .$delete(`/v1/shipping/city/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `${response.title} for Own City`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('change')
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
    removeShippingOtherCountry(index) {
      // delete other country
      this.$axios
        .$delete(`/v1/shipping/othercountry/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `${response.title} for Other Country`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('change')
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
    removeShippingOtherState(index) {
      // delete other state
      this.$axios
        .$delete(`/v1/shipping/otherstate/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `${response.title} for Other State`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('change')
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
    removeShippingOtherCity(index) {
      // delete other city
      this.$axios
        .$delete(`/v1/shipping/othercity/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: `${response.title} for Other City`,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('change')
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
  }
}
</script>