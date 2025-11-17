<template>
  <CustomerLayout>
    <div class="container">
      <h3 class="mt-3">{{ $t("products.title") }}</h3>

      <div class="d-flex justify-content-between">
        <input
          type="text"
          class="form-control search"
          v-model="search"
          @keyup="handleSearch"
          :placeholder="$t('categories.search')"
        />
      </div>

      <div class="table-responsive mt-3 bordered-table">
        <table class="table table-striped table-hover align-middle shadow-sm">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>{{ $t("products.code") }}</th>
              <th>{{ $t("products.name") }}</th>
              <th>{{ $t("categories.description") }}</th>
              <th>{{ $t("products.categoryName") }}</th>
              <th>{{ $t("products.ChooseUnit") }}</th>
              <th>{{ $t("products.Quantity") }}</th>
              <th>{{ $t("products.actions") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="product._id">
              <th>{{ index + 1 }}</th>
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.category.name }}</td>

              <td>
                <select
                  class="form-select"
                  v-model="product.selectedUnit"
                  @change="calculateProductQty(product)"
                >
                  <option disabled value="">
                    -- {{ $t("products.ChooseUnit") }} --
                  </option>
                  <option
                    v-for="(unit, idx) in product.units"
                    :key="idx"
                    :value="unit.name"
                  >
                    {{ unit.name }}
                  </option>
                </select>
              </td>

              <td>{{ product.currentStock ?? "-" }}</td>
              <td>
                <button
                  class="btn btn-info ms-2"
                  @click="showProductMovement(product)"
                  data-bs-toggle="modal"
                  data-bs-target="#ProductMovementReportModal"
                >
                  {{ $t("categories.report") }}
                </button>
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
      <!-- Product Movement Report Modal -->

      <div
        class="modal fade"
        id="ProductMovementReportModal"
        tabindex="-1"
        aria-labelledby="ProductMovementReportModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="ProductMovementReportModalLabel">
                {{ $t("categories.productMovementReport") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="d-flex justify-content-between">
                <h5>{{ selectedProduct.name }}</h5>
                <div class="d-flex">
                  <p class="ms-2">{{ $t("categories.CurrentStock") }}:</p>
                  <strong class="ms-2">{{
                    this.selectedProduct.currentStock
                  }}</strong>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{{ $t("categories.createdAt") }}</th>
                      <th>{{ $t("categories.MovementType") }}</th>
                      <th>{{ $t("categories.Quantity") }}</th>
                      <th>{{ $t("categories.note") }}</th>
                      <th>{{ $t("categories.createdBy") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(movement, index) in movements" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        {{ new Date(movement.createdAt).toLocaleDateString() }}
                      </td>
                      <td>{{ movement.movementType }}</td>
                      <td>{{ movement.quantity }}</td>
                      <td>{{ movement.note }}</td>
                      <td>{{ movement.createdBy.username }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination
                  v-model="movements_page"
                  :total-rows="movements_total_rows"
                  :per-page="movements_limit"
                  aria-controls="my-table"
                />
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <button
                  class="btn btn-success"
                  @click="showProductMovementReport"
                >
                  {{ $t("categories.ShowReport") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomerLayout>
</template>

<script>
import { API_URL } from "../../config/env";
import CustomerLayout from "../../layouts/CustomerLayout.vue";
import { PAGE_LIMIT } from "../../utils/constants";

export default {
  components: { CustomerLayout },
  data() {
    return {
      search: "",
      products: [],
      page: 1,
      limit: PAGE_LIMIT,
      total_rows: 0,
      selectedProduct: {},
      movements: [],
      movements_page: 1,
      movements_limit: PAGE_LIMIT,
      movements_total_rows: 0,
    };
  },
  methods: {
    async handleSearch() {
      if (this.search.trim() === "") {
        this.page = 1;
        await this.paginate();
        return;
      }

      try {
        const res = await this.$http.get(
          `products/search-all?search=${this.search}&pageStr=${this.page}&limitStr=${this.limit}`
        );
        this.products = this.addSelectedUnitField(res.data.products);
        this.total_rows = res.data.total_rows;
      } catch (err) {
        console.error(err);
        this.$toast.error(err.message);
      }
    },

    async paginate() {
      try {
        const res = await this.$http.get(
          `products/paginate-all?pageStr=${this.page}&limitStr=${this.limit}`
        );
        this.products = this.addSelectedUnitField(res.data.products);
        this.total_rows = res.data.total_rows;
      } catch (err) {
        console.error(err);
        this.$toast.error(err.message);
      }
    },

    async calculateProductQty(product) {
      if (!product.selectedUnit) return;

      try {
        const res = await this.$http.get(
          `products/calculate-current-stock?productId=${product._id}&unitName=${product.selectedUnit}`
        );
        const currentStock = res.data.currentStock;

        const target = this.products.find((p) => p._id === product._id);
        if (target) target.currentStock = currentStock;
      } catch (err) {
        console.error(err);
        this.$toast.error(err.message);
      }
    },

    addSelectedUnitField(products) {
      // Ensure each product has its own selectedUnit field
      return products.map((p) => ({
        ...p,
        selectedUnit: "", // default empty, or "piece" if you prefer
      }));
    },
    async showProductMovement(product) {
      this.selectedProduct = product;
      await this.$http
        .get(
          `stock-movements/paginate-by-product-id?pageStr=${this.movements_page}&limitStr=${this.movements_limit}&id=${this.selectedProduct._id}`
        )
        .then((res) => {
          console.log(res);
          this.movements = res.data.movements;
          this.movements_total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error(err.response.data.error.message);
        });
    },
    async showProductMovementReport() {
      const id = this.selectedProduct._id;
      const reqUrl = `${API_URL}stock-movements/generate-product-movement-report?id=${id}`;
      window.open(reqUrl, "_blank");
    },
  },

  async mounted() {
    await this.paginate();
  },

  watch: {
    async page() {
      if (!this.search) await this.paginate();
      else await this.handleSearch();
    },
    async movements_page(val) {
      await this.showProductMovement(this.selectedProduct);
    },
  },
};
</script>
