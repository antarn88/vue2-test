import { Module } from "vuex";
import { SortType } from "../../enums/SortType";
import { OrderType } from "../../enums/OrderType";

interface UserState {
  currentPage: number;
  currentPerPage: number;
  orderType: OrderType;
  sortType: SortType;
  totalUserListLength: number;
}

const state: UserState = {
  currentPage: 1,
  currentPerPage: 10,
  orderType: OrderType.ASC,
  sortType: SortType.NAME,
  totalUserListLength: 0,
};

const getters = {
  getCurrentPage: (state: UserState) => state.currentPage,
  getCurrentPerPage: (state: UserState) => state.currentPerPage,
  getOrderType: (state: UserState) => state.orderType,
  getSortType: (state: UserState) => state.sortType,
  getTotalUserListLength: (state: UserState) => state.totalUserListLength,
};

const actions = {
  setCurrentPage({ commit }: any, page: number) {
    commit("SET_CURRENT_PAGE", page);
  },
  setCurrentPerPage({ commit }: any, perPage: number) {
    commit("SET_CURRENT_PER_PAGE", perPage);
  },
  setOrderType({ commit }: any, orderType: OrderType) {
    commit("SET_ORDER_TYPE", orderType);
  },
  setSortType({ commit }: any, sortType: SortType) {
    commit("SET_SORT_TYPE", sortType);
  },
  setTotalUserListLength({ commit }: any, length: number) {
    commit("SET_TOTAL_USER_LIST_LENGTH", length);
  },
};

const mutations = {
  SET_CURRENT_PAGE(state: UserState, page: number) {
    state.currentPage = page;
  },
  SET_CURRENT_PER_PAGE(state: UserState, perPage: number) {
    state.currentPerPage = perPage;
  },
  SET_ORDER_TYPE(state: UserState, orderType: OrderType) {
    state.orderType = orderType;
  },
  SET_SORT_TYPE(state: UserState, sortType: SortType) {
    state.sortType = sortType;
  },
  SET_TOTAL_USER_LIST_LENGTH(state: UserState, length: number) {
    state.totalUserListLength = length;
  },
};

const userStore: Module<UserState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default userStore;
