<template>
  <AdminLayout>
    <div class="container">
      <h3 class="mt-3">{{ $t("categories.title") }}</h3>
      <div class="d-flex justify-content-between">
        <!-- <AutoComplete
          v-model="search"
          :suggestions="items"
          @complete="handleSearch"
          class="form-control w-50"
          :placeholder="$t('categories.search')"
        /> -->
        <input
          type="text"
          class="form-control search"
          v-model="search"
          @keyup="handleSearch"
          :placeholder="$t('categories.search')"
        />
        <div class="d-flex justify-content-center align-items-center">
          <i
            class="fa-solid fa-xl fa-plus icon text-success"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
          ></i>
        </div>
      </div>
      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t("categories.name") }}</th>
              <th scope="col">{{ $t("categories.description") }}</th>
              <th scope="col">{{ $t("categories.createdBy") }}</th>
              <th scope="col">{{ $t("categories.link") }}</th>
              <th scope="col">{{ $t("categories.createdAt") }}</th>
              <th scope="col">{{ $t("categories.updatedAt") }}</th>
              <th scope="col">{{ $t("categories.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td>{{ category.createdBy.username }}</td>
              <td>
                <router-link :to="`/admin/categories/${category._id}`"
                  ><i
                    class="fa-solid fa-lg fa-circle-info text-success icon"
                  ></i
                ></router-link>
              </td>
              <td>{{ new Date(category.createdAt).toLocaleDateString() }}</td>
              <td>{{ new Date(category.updatedAt).toLocaleDateString() }}</td>
              <td>
                <i
                  class="fa-solid fa-lg fa-pen-to-square text-primary icon"
                  data-bs-toggle="modal"
                  data-bs-target="#editCategoryModal"
                  @click="selectCategory(category)"
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
      <div>
        <!-- Add Category Modal -->
        <div
          class="modal fade"
          id="addCategoryModal"
          tabindex="-1"
          aria-labelledby="addCategoryModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addCategoryModalLabel">
                  {{ $t("categories.addCategory") }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <label for="">{{ $t("categories.name") }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="category.name"
                />
                <label for="">{{ $t("categories.description") }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="category.description"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {{ $t("categories.cancel") }}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="save"
                  data-bs-dismiss="modal"
                >
                  {{ $t("categories.save") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Edit Category Modal -->
        <div
          class="modal fade"
          id="editCategoryModal"
          tabindex="-1"
          aria-labelledby="editCategoryModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="editCategoryModalLabel">
                  {{ $t("categories.editCategory") }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <label for="">{{ $t("categories.name") }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="selectedCategory.name"
                />
                <label for="">{{ $t("categories.description") }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="selectedCategory.description"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {{ $t("categories.cancel") }}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="update"
                  data-bs-dismiss="modal"
                >
                  {{ $t("categories.update") }}
                </button>
              </div>
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
      category: {
        name: "",
        description: "",
      },
      selectedCategory: {},
      categories: [],
      page: 1,
      limit: PAGE_LIMIT,
      total_rows: 0,
      search: "",
      items: [],
    };
  },
  methods: {
    async paginate() {
      this.$http
        .get(`categories/paginate?pageStr=${this.page}&limitStr=${this.limit}`)
        .then((res) => {
          this.categories = res.data.categories;
          this.total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    async save() {
      // validation
      if (this.category.name.trim() === "") {
        this.$toast.warning(this.$t("catgories.enterCategoryName"));
        return;
      }
      if (this.category.description.trim() === "") {
        this.$toast.warning(this.$t("catgories.enterCategoryDescription"));
        return;
      }

      await this.$http
        .post("categories", this.category)
        .then(async (res) => {
          console.log(res);
          if (res.status === "success") {
            this.$toast.success(
              this.$t("categories.categorySavedSuccessfully")
            );
            this.category = {
              name: "",
              description: "",
            };
            await this.paginate();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    async update() {
      // validation
      if (this.selectedCategory.name.trim() === "") {
        this.$toast.warning(this.$t("catgories.enterCategoryName"));
        return;
      }
      if (this.selectedCategory.description.trim() === "") {
        this.$toast.warning(this.$t("catgories.enterCategoryDescription"));
        return;
      }

      await this.$http
        .put("categories", this.selectedCategory._id, this.selectedCategory)
        .then(async (res) => {
          console.log(res);
          if (res.status === "success") {
            this.$toast.success(
              this.$t("categories.categoryUpdatedSuccessfully")
            );
            await this.paginate();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    selectCategory(category) {
      this.selectedCategory = {
        _id: category._id,
        name: category.name,
        description: category.description,
      };
      console.log(this.selectCategory);
    },
    async handleSearch() {
      // validate
      if (this.search.trim() === "") {
        // this.$toast.warning(this.$t("categories.enterSearchKeywords"));
        this.page = 1;
        await this.paginate();
        return;
      }

      await this.$http
        .get(
          `categories/search?search=${this.search}&pageStr=${this.page}&limitStr=${this.limit}`
        )
        .then((res) => {
          console.log(res);
          this.categories = res.data.categories;
          this.total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
  },
  async mounted() {
    await this.paginate();
  },
  watch: {
    page: {
      immediate: false,
      handler: async function (newVal, oldVal) {
        try {
          if (this.search === "") {
            await this.paginate();
          } else {
            await this.handleSearch();
          }
        } catch (err) {
          console.error("Pagination failed:", err);
        }
      },
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}

.search {
  width: 200px;
}
</style>
