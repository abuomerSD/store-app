<template>
  <AdminLayout>
    <div class="container mt-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/admin/categories/">{{
              $t("categories.title")
            }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ category.name ? category.name : "" }}
          </li>
        </ol>
      </nav>
      <div class="d-flex justify-content-between">
        <div>
          <input
            type="text"
            class="form-control search"
            v-model="search"
            @keyup="handleSearch"
            :placeholder="$t('categories.search')"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <i
            class="fa-solid fa-xl fa-plus icon text-success"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
          ></i>
        </div>
      </div>
      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t("categories.code") }}</th>
              <th scope="col">{{ $t("categories.name") }}</th>
              <th scope="col">{{ $t("categories.description") }}</th>
              <th scope="col">{{ $t("categories.category") }}</th>
              <th scope="col">{{ $t("categories.updatedAt") }}</th>
              <th scope="col">{{ $t("categories.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
              <td>{{ new Date(product.updatedAt).toLocaleDateString() }}</td>
              <td>
                <i
                  class="fa-solid fa-lg fa-pen-to-square text-primary icon"
                  data-bs-toggle="modal"
                  data-bs-target="#editUnitModal"
                  @click="selectProduct(product)"
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
      <!-- Add Product Modal -->

      <div
        class="modal fade"
        id="addProductModal"
        tabindex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addProductModalLabel">
                {{ $t("categories.AddProduct") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="">{{ $t("categories.code") }}</label>
              <input type="text" class="form-control" v-model="product.code" />
              <label for="">{{ $t("categories.name") }}</label>
              <input type="text" class="form-control" v-model="product.name" />
              <label for="">{{ $t("categories.description") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="product.description"
              />
              <label for="">{{ $t("categories.MinimumStockQuantity") }}</label>
              <input
                type="number"
                min="0"
                class="form-control"
                v-model="product.minStockQty"
              />
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
      categoryId: "",
      category: {},
      product: {},
      products: [],
      selectedProduct: {},
      page: 1,
      limit: PAGE_LIMIT,
      total_rows: 0,
    };
  },
  methods: {
    async paginate() {
      await this.$http
        .get(
          `products/paginate?pageStr=${this.page}&limitStr=${this.limit}&categoryIdStr=${this.categoryId}`
        )
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
          this.total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    async save() {
      // validation
      if (
        !this.product.code ||
        !this.product.name ||
        !this.product.description ||
        !this.product.minStockQty
      ) {
        this.$toast.warning(this.$t("units.fillAllFields"));
        return;
      }

      this.product.category = this.categoryId;

      await this.$http
        .post("products", this.product)
        .then(async (res) => {
          console.log(res);
          this.$toast.success(this.$t("categories.ProductSavedSuccessfully"));
          await this.paginate();
          this.product = {};
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error(err.message);
        });
    },
    async getCategoryDetails(id) {
      await this.$http
        .get(`categories/${id}`)
        .then((res) => {
          console.log(res);
          this.category = res.data.category;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectProduct(product) {
      this.selectedProduct = product;
    },
  },
  async mounted() {
    this.categoryId = this.$route.params.id;
    await this.getCategoryDetails(this.categoryId);
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
