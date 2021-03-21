export const state = () => ({
  products: [],
  empty: false,
  subtotal: false,
  total: false,
  stockHasChanged: false
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
    return state.subtotal;
  },

  subtotal(state) {
    return state.total;
  },

  stockHasChanged(state) {
    return state.stockHasChanged;
  }
};

export const actions = {
  async getCart({ commit }) {
    let response = await this.$axios.$get("cart");
    commit("SET_PRODUCTS", response.data);
    commit("SET_EMPTY", response.meta.empty);
    commit("SET_TOTAL", response.meta.total);
    commit("SET_SUBTOTAL", response.meta.subtotal);
    commit("SET_STOCKHASCHANGED", response.meta.stockHasChanged);
  },

  async destroy({ dispatch }, productId) {
    let response = await this.$axios.$delete(`cart/${productId}`);

    dispatch("getCart");
  },

  async store({ dispatch }, products ) {
    await this.$axios.$post("cart", {
      products: products
    });

    dispatch("getCart");
  },

  async update({ dispatch }, { productId, quantity }) {
    let response = await this.$axios.$patch(`cart/${productId}`, {
      quantity
    });

    dispatch("getCart");
  }
};
