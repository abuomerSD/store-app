<template>
  <AdminLayout>
    <div class="container mt-3">
      <h3>{{ $t("users.title") }}</h3>
      <div class="d-flex justify-content-between">
        <div>
          <!-- <input
            type="text"
            class="form-control search"
            v-model="search"
            @keyup="handleSearch"
            :placeholder="$t('categories.search')"
          /> -->
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <i
            class="fa-solid fa-xl fa-plus icon text-success"
            data-bs-toggle="modal"
            data-bs-target="#addUnitModal"
          ></i>
        </div>
      </div>
      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t("users.username") }}</th>
              <th scope="col">{{ $t("categories.createdAt") }}</th>
              <th scope="col">{{ $t("categories.updatedAt") }}</th>
              <th scope="col">{{ $t("categories.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ user.username }}</td>
              <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              <td>{{ new Date(user.updatedAt).toLocaleDateString() }}</td>
              <td>
                <i
                  class="fa-solid fa-lg fa-pen-to-square text-primary icon"
                  data-bs-toggle="modal"
                  data-bs-target="#editUnitModal"
                  @click="selectUser(user)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-center">
        <b-pagination
          v-model="page"
          :total-rows="total_rows"
          :per-page="limit"
          aria-controls="my-table"
        />
      </div>

      <!-- Modals -->
      <!-- Add User Modal -->

      <div
        class="modal fade"
        id="addUnitModal"
        tabindex="-1"
        aria-labelledby="addUnitModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addUnitModalLabel">
                {{ $t("users.addUser") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="">{{ $t("users.username") }}</label>
              <input type="text" class="form-control" v-model="user.username" />
              <label for="">{{ $t("users.password") }}</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password"
              />
              <div class="row">
                <label for="#role" class="mt-2">{{ $t("users.role") }}</label>
              </div>
              <select name="" id="role" v-model="user.role" class="form-select">
                <option value="admin">admin</option>
                <option value="user" selected>user</option>
              </select>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {{ $t("units.cancel") }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="save"
              >
                {{ $t("units.save") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout.vue";
import { PAGE_LIMIT } from "../../utils/constants";

export default {
  components: {
    AdminLayout,
  },
  data() {
    return {
      user: {},
      users: [],
      selectedUser: {},
      page: 1,
      limit: PAGE_LIMIT,
    };
  },
  methods: {
    async paginate() {
      await this.$http
        .get(`users/paginate?pageStr=${this.page}&limitStr=${this.limit}`)
        .then((res) => {
          console.log(res);
          this.users = res.data.users;
          this.total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    async save() {
      // validation
      if (!this.user.username || !this.user.password) {
        this.$toast.warning(this.$t("units.fillAllFields"));
        return;
      }

      await this.$http
        .post("users", this.user)
        .then(async (res) => {
          console.log(res);
          this.$toast.success(this.$t("users.userSavedSuccessfully"));
          await this.paginate();
          this.user = {};
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error(err.message);
        });
    },
  },
  async mounted() {
    await this.paginate();
  },
  watch: {
    async page(val) {
      await this.paginate();
    },
  },
};
</script>

<style>
.search {
  width: 200px;
}

.icon {
  cursor: pointer;
}
</style>
