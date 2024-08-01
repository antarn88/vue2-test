<template>
  <div class="container">
    <h1 class="text-center my-5">Felhasználók</h1>

    <div v-if="isError" class="col-lg-8 offset-lg-2 text-center">
      <div class="card text-bg-danger">
        <div class="card-header">Hiba a felhasználók betöltésekor!</div>
        <div class="card-body">
          <h5 class="card-title">Nem sikerült a felhasználói listát betölteni.</h5>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border spinner-border-big" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else v-show="!isError" class="row">
      <div class="col-lg-10 offset-lg-1 col-md-12">
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-primary">
            <nuxt-link :to="`/users/0`" class="text-light text-decoration-none">Hozzáad</nuxt-link>
          </button>
        </div>

        <div class="table-responsive">
          <table class="table table-striped mb-5">
            <thead v-if="!isEmptyList" class="table-dark">
              <tr>
                <th scope="col" class="user-select-none cursor-pointer">#</th>

                <!-- Név fejléc -->
                <th scope="col">
                  <span class="d-inline-block align-middle">
                    <span v-if="$store.state.user.sortType === sortTypes.NAME">
                      <img
                        v-if="$store.state.user.orderType === orderTypes.ASC"
                        src="@/assets/svg/arrow-up-a-z-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = orderTypes.DESC"
                      />
                      <img
                        v-else
                        src="@/assets/svg/arrow-up-z-a-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = orderTypes.ASC"
                      />
                    </span>
                    <span class="cursor-pointer user-select-none" @click="sortType = sortTypes.NAME">Név</span>
                  </span>
                </th>

                <!-- Email fejléc -->
                <th scope="col">
                  <span class="d-inline-block align-middle">
                    <span v-if="$store.state.user.sortType === sortTypes.EMAIL">
                      <img
                        v-if="$store.state.user.orderType === orderTypes.ASC"
                        src="@/assets/svg/arrow-up-a-z-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = orderTypes.DESC"
                      />
                      <img
                        v-else
                        src="@/assets/svg/arrow-up-z-a-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = orderTypes.ASC"
                      />
                    </span>
                    <span class="cursor-pointer user-select-none" @click="sortType = sortTypes.EMAIL">E-mail</span>
                  </span>
                </th>

                <!-- Kor fejléc -->
                <th scope="col">
                  <span class="d-inline-block align-middle">
                    <span v-if="$store.state.user.sortType === sortTypes.AGE">
                      <img
                        v-if="$store.state.user.orderType === orderTypes.ASC"
                        src="@/assets/svg/arrow-up-1-9-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = orderTypes.DESC"
                      />
                      <img
                        v-else
                        src="@/assets/svg/arrow-up-9-1-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = orderTypes.ASC"
                      />
                    </span>
                    <span class="cursor-pointer user-select-none" @click="sortType = sortTypes.AGE">Kor</span>
                  </span>
                </th>

                <th scope="col" class="cursor-pointer user-select-none">Törlés</th>
              </tr>
            </thead>
            <tbody>
              <!-- Empty callout -->
              <tr v-if="isEmptyList">
                <th scope="row" colspan="5" class="text-center">Nincs megjeleníthető felhasználó.</th>
              </tr>

              <tr v-for="(user, index) in users" :key="user.id">
                <th scope="row">{{ currentPerPage * (currentPage - 1) + index + 1 }}</th>
                <td class="cursor-pointer">
                  <nuxt-link :to="`/users/${user.id}`" class="text-decoration-none text-black">{{ user.name }}</nuxt-link>
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.age }}</td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    :disabled="isDeleting"
                    @click="setDeletingUserId(user.id)"
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            </tbody>

            <tfoot v-if="!isEmptyList">
              <tr>
                <td scope="row" colspan="5" class="text-end">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center user-select-none">
                      <span>Oldalméret:</span>
                      <select v-model="currentPerPage" class="form-select form-select-sm w-auto ms-2" @change="onChangePageSize">
                        <option v-for="(pageSize, index) in pageSizes" :key="index" :value="pageSize">
                          {{ pageSize }}
                        </option>
                      </select>
                    </div>
                    <nav aria-label="Page navigation">
                      <ul class="pagination mb-0">
                        <li class="page-item">
                          <a class="page-link text-dark cursor-pointer user-select-none" aria-label="First" @click.prevent="goToFirstPage">
                            <span aria-hidden="true">&laquo;&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item">
                          <a
                            class="page-link text-dark cursor-pointer user-select-none"
                            aria-label="Previous"
                            @click.prevent="goToPreviousPage"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>

                        <!-- Dinamikusan generált oldalszámok -->
                        <template v-if="totalPages > 0">
                          <li
                            v-for="pageNumber in displayedPages"
                            :key="pageNumber"
                            class="page-item"
                            :class="{ active: pageNumber === currentPage }"
                          >
                            <a
                              class="page-link cursor-pointer user-select-none"
                              :class="pageNumber === currentPage ? 'text-white' : 'text-dark'"
                              @click.prevent="goToPage(pageNumber)"
                              >{{ pageNumber }}</a
                            >
                          </li>
                        </template>
                        <li class="page-item">
                          <a class="page-link cursor-pointer user-select-none" aria-label="Next" @click.prevent="goToNextPage">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link text-dark cursor-pointer user-select-none" aria-label="Last" @click.prevent="goToLastPage">
                            <span aria-hidden="true">&raquo;&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <ConfirmModal :id="deletingUserId" @confirmed-delete="deleteUser" />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import ConfirmModal from "../../components/ConfirmModal.vue";
  import { OrderType } from "../../enums/OrderType";
  import { SortType } from "../../enums/SortType";
  import { User } from "../../models/User";
  import UserService from "../../services/UserService";

  export default Vue.extend({
    name: "IndexPage",
    components: {
      ConfirmModal,
    },

    data() {
      return {
        users: [] as User[],
        isLoading: true,
        deletingUserId: "",
        isDeleting: false,
        isError: false,
        isEmptyList: false,
        pageSizes: [10, 25, 50, 100],
        displayedPages: [] as number[],
        sortTypes: SortType,
        orderTypes: OrderType,
        currentPerPage: this.$store.state.user.currentPerPage,
        orderType: this.$store.state.user.orderType,
        sortType: this.$store.state.user.sortType,
      };
    },

    head() {
      return {
        title: "Felhasználók",
      };
    },

    computed: {
      totalPages(): number {
        return Math.ceil(this.totalUserListLength / this.currentPerPage);
      },

      totalUserListLength(): number {
        return this.$store.state.user.totalUserListLength;
      },

      currentPage(): number {
        return this.$store.state.user.currentPage;
      },
    },

    watch: {
      orderType(newOrder: OrderType) {
        this.$store.dispatch("user/setCurrentPage", 1);
        this.$store.dispatch("user/setOrderType", newOrder);
        this.fetchUsers();
      },

      sortType(newSort: SortType) {
        this.$store.dispatch("user/setCurrentPage", 1);
        this.$store.dispatch("user/setSortType", newSort);
        this.fetchUsers();
      },

      currentPerPage() {
        this.$store.dispatch("user/setCurrentPage", 1);
        this.fetchUsers();
      },
    },

    mounted() {
      this.fetchUsers();
    },

    methods: {
      async fetchUsers() {
        try {
          this.isLoading = true;

          const usersResponse = await UserService.getUsers({
            _page: this.currentPage,
            _per_page: this.currentPerPage,
            _sort: this.sortType,
            _order: this.orderType,
          });

          this.$store.dispatch("user/setTotalUserListLength", usersResponse.items);

          this.users = usersResponse.data;
          this.isError = false;

          if (!this.users.length) {
            this.isEmptyList = true;
          }

          this.updateDisplayedPages();
        } catch (error) {
          this.isError = true;
        } finally {
          this.isLoading = false;
        }
      },

      goToPage(page: number) {
        this.$store.dispatch("user/setCurrentPage", page);
        this.fetchUsers();
      },

      goToFirstPage() {
        if (this.currentPage === 1) return;
        this.$store.dispatch("user/setCurrentPage", 1);
        this.fetchUsers();
      },

      goToPreviousPage() {
        if (this.currentPage === 1) return;
        this.$store.dispatch("user/setCurrentPage", this.currentPage - 1);
        this.fetchUsers();
      },

      goToNextPage() {
        if (this.currentPage === this.totalPages) return;
        this.$store.dispatch("user/setCurrentPage", this.currentPage + 1);
        this.fetchUsers();
      },

      goToLastPage() {
        if (this.currentPage === this.totalPages) return;
        this.$store.dispatch("user/setCurrentPage", this.totalPages);
        this.fetchUsers();
      },

      updateDisplayedPages() {
        const maxDisplayedPages = 5;
        const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
        const startPage = Math.max(1, this.currentPage - halfMaxDisplayedPages);
        const endPage = Math.min(this.totalPages, startPage + maxDisplayedPages - 1);

        this.displayedPages = [];
        for (let i = startPage; i <= endPage; i++) {
          this.displayedPages.push(i);
        }
      },

      async deleteUser(id: string): Promise<void> {
        try {
          this.isDeleting = true;
          await UserService.deleteUser(id);
          this.users = this.users.filter((user) => user.id !== id);
          this.fetchUsers();
          this.$toast.success("Sikeresen törölve lett a felhasználó!");
        } catch (error) {
          this.$toast.error("Hiba a felhasználó törlésekor!");
        } finally {
          this.isDeleting = false;
          this.isEmptyList = !this.users.length;
        }

        this.deletingUserId = "";
      },

      setDeletingUserId(id: string) {
        this.deletingUserId = id;
      },

      onChangePageSize(event: Event): void {
        const select = event.target as HTMLSelectElement;
        this.$store.dispatch("user/setCurrentPerPage", parseInt(select.value));
      },
    },
  });
</script>

<style lang="scss" scoped>
  .spinner-border {
    margin-top: 50px;
    width: 3rem;
    height: 3rem;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .page-link {
    color: #000;
  }

  .page-link:focus,
  .form-select:focus {
    outline: none;
    box-shadow: none;
  }

  .not-allowed {
    cursor: not-allowed;
    pointer-events: all;
  }
</style>
