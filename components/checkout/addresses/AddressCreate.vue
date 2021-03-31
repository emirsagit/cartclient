<template>
  <form class="w-full mt-8 border p-3" @submit.prevent="fetch">
    <div class="flex flex-wrap -mx-3 mb-3">
      <!-- description -->
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Adres Adı (Ev, İş vb.)
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.description.$invalid"
            >(*)</span
          >
        </label>
        <input
          class="appearance-none block w-full text-gray-700 py-3 px-4 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
          :class="
            $v.form.description.$invalid
              ? 'border-blue-200'
              : 'border-green-500'
          "
          id="grid-first-name"
          v-model.trim.lazy="form.description"
          type="text"
          placeholder="Ev"
        />
      </div>
      <!-- name -->
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Teslİmat Alıcısı
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.name.$invalid"
            >(*)</span
          >
        </label>
        <input
          class="appearance-none block w-full text-gray-700 py-3 px-4 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
          :class="
            $v.form.name.$invalid ? 'border-blue-200' : 'border-green-500'
          "
          id="grid-last-name"
          type="text"
          v-model.trim.lazy="form.name"
          placeholder="İsim"
        />
      </div>
    </div>
    <!-- adress -->
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          Adres
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.address.$invalid"
            >(*)</span
          >
        </label>
        <input
          class="appearance-none block w-full text-gray-700 py-3 px-4 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
          type="text"
          :class="
            $v.form.address.$invalid ? 'border-blue-200' : 'border-green-500'
          "
          v-model.trim.lazy="form.address"
          placeholder="Açık Adres"
        />
      </div>
    </div>
    <!-- phone -->
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-city"
        >
          Telefon
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.phone.$invalid"
            >(*)</span
          >
        </label>
        <input
          class="appearance-none block w-full text-gray-700 py-3 px-4 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
          :class="
            $v.form.phone.$invalid ? 'border-blue-200' : 'border-green-500'
          "
          type="tel"
          v-model.trim.number="form.phone"
          placeholder="Örn: 5051234567"
        />
        <div class="text-xs text-red-500">
          <p
            v-if="
              !$v.form.phone.numeric ||
              !$v.form.phone.minLength ||
              !$v.form.phone.maxLength
            "
          >
            Örn: 5051234567
          </p>
        </div>
      </div>
      <!-- city -->
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-2">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Şehir
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.city_id.$invalid"
            >(*)</span
          >
        </label>
        <div class="relative">
          <cities-select
            v-model.trim.lazy="form.city_id"
            :class="
              $v.form.city_id.$invalid ? 'border-blue-200' : 'border-green-500'
            "
          />
          <svg-select-arrow />
        </div>
      </div>
      <!-- district -->
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-2">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          İlçe
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.district_id.$invalid"
            >(*)</span
          >
        </label>
        <div class="relative">
          <districts-select
            v-model.trim.lazy="form.district_id"
            :city="form.city_id"
            :class="
              $v.form.district_id.$invalid
                ? 'border-blue-200'
                : 'border-green-500'
            "
          />
          <svg-select-arrow />
        </div>
      </div>
      <!-- neighborhood -->
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-2">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Mahalle
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.form.neighborhood.$invalid"
            >(*)</span
          >
        </label>
        <div class="relative">
          <neighborhoods-select
            @neighborhoodSelected="changeNeighborhood"
            :district="form.district_id"
            :class="
              $v.form.neighborhood.$invalid
                ? 'border-blue-200'
                : 'border-green-500'
            "
          />
          <svg-select-arrow />
        </div>
      </div>
      <!-- postal_code -->
      <div class="w-full md:w-1/2 px-3 mb-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Posta Kodu
        </label>
        <div class="relative">
          <postal-code
            v-model.trim.lazy="form.postal_code"
            :postal_code="form.postal_code"
          />
        </div>
      </div>
    </div>
    <div>
      <button
        class="px-2 py-1 bg-teal-800 text-white rounded-lg font-bold hover:bg-teal-900 mr-4"
        type="submit"
        :class="{ 'opacity-50 hover:bg-teal-800': $v.$invalid }"
        :disabled="$v.$invalid"
      >
        Kaydet
      </button>
      <button
        class="px-2 py-1 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
        v-if="$parent.localAddresses.length"
        @click.prevent="$parent.creating = false"
      >
        Geri
      </button>
    </div>
    <div class="text-xs text-red-500 mt-4">
      <p v-if="$v.$invalid">Kaydetmek için gerekli alanları doldurun.</p>
    </div>
  </form>
</template>

<script>
import CitiesSelect from "../form/CitiesSelect.vue";
import DistrictsSelect from "../form/DistrictsSelect.vue";
import NeighborhoodsSelect from "../form/NeighborhoodsSelect.vue";
import SvgSelectArrow from "../form/SvgSelectArrow.vue";
import PostalCode from "../form/PostalCode.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  components: {
    CitiesSelect,
    SvgSelectArrow,
    DistrictsSelect,
    NeighborhoodsSelect,
    PostalCode,
  },

  mixins: [validationMixin],

  data() {
    return {
      cities: [],
      form: {
        description: "",
        name: this.$auth.user.name,
        address: "",
        phone: "",
        city_id: "",
        district_id: "",
        neighborhood: "",
        postal_code: "",
        is_default: true,
      },
    };
  },

  async asyncData({ app }) {
    let cities = await app.$axios.$get("api/cities");

    return {
      cities: cities.data,
    };
  },

  methods: {
    changeNeighborhood(neighborhood) {
      this.form.neighborhood = neighborhood.name;
      this.form.postal_code = neighborhood.postal_code;
    },

    async fetch() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let response = await this.$axios.$post("api/addresses", this.form);
        this.$emit("created", response.data);
      }
    },
  },

  validations: {
    form: {
      name: {
        required,
      },
      description: {
        required,
      },
      address: {
        required,
      },
      city_id: {
        required,
      },
      district_id: {
        required,
      },
      neighborhood: {
        required,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
    },
  },
};
</script>

