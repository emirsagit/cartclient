import queryString from "query-string";

export const state = () => ({
  products: [],
  empty: false,
  subtotal: false,
  total: false,
  stockHasChanged: false,
  shipping: false
});

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },

  SET_EMPTY(state, empty) {
    state.empty = empty;
  },

  SET_TOTAL(state, total) {
    state.total = total;
  },

  SET_SUBTOTAL(state, subtotal) {
    state.subtotal = subtotal;
  },

  SET_STOCKHASCHANGED(state, stockHasChanged) {
    state.stockHasChanged = stockHasChanged;
  },

  SET_SHIPPING(state, shipping) {
    state.shipping = shipping;
  }
};

export const getters = {
  products(state) {
    return state.products;
  },

  isEmpty(state) {
    return state.empty;
  },

  count(state) {
    return state.products.length;
  },

  total(state) {
    return state.total;
  },

  subtotal(state) {
    return state.subtotal;
  },

  stockHasChanged(state) {
    return state.stockHasChanged;
  },

  shipping(state) {
    return state.shipping;
  }
};

export const actions = {
  async getCart({ commit, state }) {
    let query = {};

    if (state.shipping) {
      query.shipping_id = state.shipping.id;
    }

    let response = await this.$axios.$get(
      `api/cart?${queryString.stringify(query)}`
    );

    commit("SET_PRODUCTS", response.data);
    commit("SET_EMPTY", response.meta.empty);
    commit("SET_TOTAL", response.meta.total);
    commit("SET_SUBTOTAL", response.meta.subtotal);
    commit("SET_STOCKHASCHANGED", response.meta.stockHasChanged);
  },

  async destroy({ dispatch }, productId) {
    let response = await this.$axios.$delete(`api/cart/${productId}`);

    dispatch("getCart");
  },

  async store({ dispatch }, products) {
    await this.$axios.$post("api/cart", {
      products: products
    });

    dispatch("getCart");
  },

  async update({ dispatch }, { productId, quantity }) {
    await this.$axios.$patch(`api/cart/${productId}`, {
      quantity
    });

    dispatch("getCart");
  },

  async setShipping({ commit }, shippingMethod) {
    commit("SET_SHIPPING", shippingMethod);
  }
};
