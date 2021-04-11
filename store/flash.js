export const state = () => ({
  message: false,
  type: "error"
});

export const getters = {
  message(state) {
    return state.message;
  },
  type(state) {
    return state.type;
  }
};

export const mutations = {
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  SET_TYPE(state, type) {
    state.type = type;
  }
};

export const actions = {
  async setMessage({ commit }, message) {
    commit("SET_MESSAGE", message);
  },
  async setType({ commit }, type) {
    commit("SET_TYPE", type);
  },
  async hide({ commit }) {
    setTimeout(() => {
      commit("SET_MESSAGE", null);
      commit("SET_TYPE", "error");
    }, 6000);
  }
};
