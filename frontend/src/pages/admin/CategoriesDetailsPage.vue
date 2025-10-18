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
              <th scope="col">{{ $t("categories.minStockQty") }}</th>
              <th scope="col">{{ $t("categories.CurrentStock") }}</th>
              <th scope="col">{{ $t("categories.units") }}</th>
              <th scope="col">{{ $t("categories.createdBy") }}</th>
              <th scope="col">{{ $t("categories.createdAt") }}</th>
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
              <td>{{ product.minStockQty }}</td>
              <td>{{ product.currentStock }}</td>
              <td>
                <i
                  class="fa-solid fa-lg fa-circle-info icon text-success"
                  data-bs-target="#addProductUnitModal"
                  data-bs-toggle="modal"
                  @click="selectProduct(product)"
                ></i>
              </td>
              <td>{{ product.createdBy.username }}</td>
              <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
              <td>{{ new Date(product.updatedAt).toLocaleDateString() }}</td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <i
                    class="fa-solid fa-lg fa-pen-to-square text-primary icon ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editProductModal"
                    @click="selectProduct(product)"
                  ></i>
                  <button
                    class="btn btn-success ms-2"
                    @click="selectProduct(product)"
                    data-bs-toggle="modal"
                    data-bs-target="#AddIncomingQtyModal"
                  >
                    {{ $t("categories.incoming") }}
                  </button>
                  <button
                    class="btn btn-danger ms-2"
                    @click="selectProduct(product)"
                    data-bs-toggle="modal"
                    data-bs-target="#AddOutGoingQtyModal"
                  >
                    {{ $t("categories.outgoing") }}
                  </button>
                  <button
                    class="btn btn-info ms-2"
                    @click="showProductMovement(product)"
                    data-bs-toggle="modal"
                    data-bs-target="#ProductMovementReportModal"
                  >
                    {{ $t("categories.report") }}
                  </button>
                </div>
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
      <!-- Edit Product Modal -->

      <div
        class="modal fade"
        id="editProductModal"
        tabindex="-1"
        aria-labelledby="editProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="editProductModalLabel">
                {{ $t("categories.EditProduct") }}
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
              <input
                type="text"
                class="form-control"
                v-model="selectedProduct.code"
              />
              <label for="">{{ $t("categories.name") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="selectedProduct.name"
              />
              <label for="">{{ $t("categories.description") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="selectedProduct.description"
              />
              <label for="">{{ $t("categories.MinimumStockQuantity") }}</label>
              <input
                type="number"
                min="0"
                class="form-control"
                v-model="selectedProduct.minStockQty"
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
                @click="update"
              >
                {{ $t("units.save") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Product Unit Modal -->

      <div
        class="modal fade"
        id="addProductUnitModal"
        tabindex="-1"
        aria-labelledby="addProductUnitModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addProductUnitModalLabel">
                {{ $t("categories.AddProductUnit") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="">{{ $t("categories.UnitName") }}</label>
              <input type="text" class="form-control" v-model="unit.name" />
              <label for="">{{ $t("categories.PiecesPerUnit") }}</label>
              <input
                type="number"
                min="1"
                class="form-control"
                v-model="unit.piecesInUnit"
              />
              <button
                class="btn btn-success mt-2 mb-2"
                @click="addUnit(selectedProduct._id)"
                data-bs-dismiss="modal"
              >
                {{ $t("categories.save") }}
              </button>
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ $t("categories.UnitName") }}</th>
                    <th>{{ $t("categories.PiecesPerUnit") }}</th>
                    <th>{{ $t("categories.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(unit, index) in selectedProduct.units"
                    :key="index"
                  >
                    <td>{{ unit.name }}</td>
                    <td>{{ unit.piecesInUnit }}</td>
                    <td>
                      <i
                        class="fa-solid fa-lg fa-pen-to-square text-primary icon"
                        data-bs-toggle="modal"
                        data-bs-target="#EditProductUnitModal"
                        @click="selectUnit(unit)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {{ $t("units.cancel") }}
              </button>
              <!-- <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="save"
              >
                {{ $t("units.save") }}
              </button> -->
            </div>
          </div>
        </div>
      </div>
      <!-- Add Incoming Qty Modal -->

      <div
        class="modal fade"
        id="AddIncomingQtyModal"
        tabindex="-1"
        aria-labelledby="AddIncomingQtyModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="AddIncomingQtyModalLabel">
                {{ $t("categories.AddIncomingQty") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h6>{{ selectedProduct.name }}</h6>
              <label for="">{{ $t("categories.incomingQty") }}</label>
              <input
                type="number"
                min="1"
                class="form-control w-50"
                v-model="selectedProduct.qty"
              />
              <label for="">{{ $t("categories.UnitName") }}</label>
              <div class="row mt-2 ms-1 me-1">
                <select
                  v-model="selectedProduct.selectedUnit"
                  class="form-select w-50"
                >
                  <option
                    v-for="(unit, index) in selectedProduct.units"
                    :key="index"
                    :value="unit.name"
                  >
                    {{ unit.name }}
                  </option>
                </select>
              </div>
              <label for="">{{ $t("categories.notes") }}</label>
              <input
                type="text"
                min="1"
                class="form-control w-50"
                v-model="selectedProduct.note"
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
                @click="addIncomingQty"
              >
                {{ $t("units.save") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Outgoing Qty Modal -->

      <div
        class="modal fade"
        id="AddOutGoingQtyModal"
        tabindex="-1"
        aria-labelledby="AddOutGoingQtyModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="AddOutGoingQtyModalLabel">
                {{ $t("categories.AddOutgoingQty") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h6>{{ selectedProduct.name }}</h6>
              <label for="">{{ $t("categories.outgoingQty") }}</label>
              <input
                type="number"
                min="1"
                class="form-control w-50"
                v-model="selectedProduct.qty"
              />
              <label for="">{{ $t("categories.UnitName") }}</label>
              <div class="row mt-2 ms-1 me-1">
                <select
                  v-model="selectedProduct.selectedUnit"
                  class="form-select w-50"
                >
                  <option
                    v-for="(unit, index) in selectedProduct.units"
                    :key="index"
                    :value="unit.name"
                  >
                    {{ unit.name }}
                  </option>
                </select>
              </div>
              <label for="">{{ $t("categories.notes") }}</label>
              <input
                type="text"
                min="1"
                class="form-control w-50"
                v-model="selectedProduct.note"
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
                @click="addOutgoingQty"
              >
                {{ $t("units.save") }}
              </button>
            </div>
          </div>
        </div>
      </div>

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

      <!-- edit unit modal -->
      <div
        class="modal fade"
        id="EditProductUnitModal"
        tabindex="-1"
        aria-labelledby="EditProductUnitModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="EditProductUnitModalLabel">
                {{ $t("categories.EditProductUnit") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="">{{ $t("categories.UnitName") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="selectedUnit.name"
              />
              <label for="">{{ $t("categories.PiecesPerUnit") }}</label>
              <input
                type="number"
                min="1"
                class="form-control"
                v-model="selectedUnit.piecesInUnit"
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
                @click="updateProductUnit"
              >
                {{ $t("units.update") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { API_URL } from "../../config/env";
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
      unit: {},
      search: "",
      movements: [],
      movements_total_rows: 0,
      movements_page: 1,
      movements_limit: PAGE_LIMIT,
      selectedUnit: {},
      oldUnitName: "",
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
        // !this.product.description ||
        !this.product.minStockQty
      ) {
        this.$toast.warning(this.$t("units.fillAllFields"));
        return;
      }

      this.product.category = this.categoryId;
      this.product.units = [
        {
          name: "piece",
          isBaseUnit: true,
          piecesInUnit: 1,
        },
      ];

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
      console.log("selected product", this.selectProduct);
    },
    async addUnit(productId) {
      // validations
      if (!this.unit.name || !this.unit.piecesInUnit) {
        this.$toast.warning(this.$t("categories.FillAllFields"));
        return;
      }
      await this.$http
        .post(`products/add-unit/${productId}`, this.unit)
        .then(async (res) => {
          console.log(res);
          this.$toast.success(this.$t("categories.UnitAddedSuccessfully"));
          this.unit = {};
          await this.paginate();
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    async update() {
      // validations
      if (
        !this.selectedProduct.code ||
        !this.selectedProduct.name ||
        !this.selectedProduct.minStockQty
      ) {
        this.$toast.warning(this.$t("categories.FillAllFields"));
        return;
      }

      const payload = {
        code: this.selectedProduct.code,
        name: this.selectedProduct.name,
        description: this.selectedProduct.description,
        minStockQty: this.selectedProduct.minStockQty,
        category: this.selectedProduct.category._id,
        units: this.selectedProduct.units,
      };

      console.log("payload", payload);

      await this.$http
        .put(`products`, this.selectedProduct._id, payload)
        .then((res) => {
          console.log(res);
          this.$toast.success(this.$t("categories.ProductUpdatedSuccessfully"));
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error(err.message);
        });
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
          `products/search?search=${this.search}&pageStr=${this.page}&limitStr=${this.limit}&categoryId=${this.categoryId}`
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
    async addIncomingQty() {
      // validation
      console.log(
        this.selectedProduct.qty,
        this.selectedProduct.selectedUnit,
        this.selectedProduct.note
      );
      if (
        !this.selectedProduct.qty ||
        !this.selectedProduct.selectedUnit ||
        !this.selectedProduct.note
      ) {
        this.$toast.warning(this.$t("categories.FillAllFields"));
        return;
      }

      await this.$http
        .post("products/incoming-qty", {
          productId: this.selectedProduct._id,
          qty: this.selectedProduct.qty,
          note: this.selectedProduct.note,
          selectedUnit: this.selectedProduct.selectedUnit,
        })
        .then(async (res) => {
          console.log(res);
          this.$toast.success(this.$t("categories.QuantityAddedSuccessfully"));
          await this.paginate();
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.response.data.error.message);
        });
    },
    async addOutgoingQty() {
      // validation
      console.log(
        this.selectedProduct.qty,
        this.selectedProduct.selectedUnit,
        this.selectedProduct.note
      );
      if (
        !this.selectedProduct.qty ||
        !this.selectedProduct.selectedUnit ||
        !this.selectedProduct.note
      ) {
        this.$toast.warning(this.$t("categories.FillAllFields"));
        return;
      }

      await this.$http
        .post("products/outgoing-qty", {
          productId: this.selectedProduct._id,
          qty: this.selectedProduct.qty,
          note: this.selectedProduct.note,
          selectedUnit: this.selectedProduct.selectedUnit,
        })
        .then(async (res) => {
          console.log(res);
          this.$toast.success(
            this.$t("categories.QuantityDecreasedSuccessfully")
          );
          await this.paginate();
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.response.data.error.message);
        });
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
          this.$toast.error(err.message);
        });
    },
    async updateProductUnit() {
      // validations
      if (!this.selectedUnit.name || !this.selectedUnit.piecesInUnit) {
        this.$toast.warning(this.$t("categories.FillAllFields"));
        return;
      }

      if (this.oldUnitName === "piece") {
        this.$toast.warning(this.$t("categories.YouCantChangeThisUnitName"));
        return;
      }

      const productId = this.selectedProduct._id;

      const payload = {
        piecesInUnit: this.selectedUnit.piecesInUnit,
        oldUnitName: this.oldUnitName,
        name: this.selectedUnit.name,
      };

      await this.$http
        .put(`products/update-unit-by-name`, productId, payload)
        .then(async (res) => {
          console.log(res);
          this.$toast.success(this.$t("categories.UnitUpdatedSuccessfully"));
          this.unit = {};
          await this.paginate();
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    selectUnit(unit) {
      this.selectedUnit = unit;
      this.oldUnitName = unit.name;
    },
    async showProductMovementReport() {
      const id = this.selectedProduct._id;
      const reqUrl = `${API_URL}stock-movements/generate-product-movement-report?id=${id}`;
      window.open(reqUrl, "_blank");
    },
    showMovementsReport(movements) {},
  },
  async mounted() {
    this.categoryId = this.$route.params.id;
    await this.getCategoryDetails(this.categoryId);
    await this.paginate();
  },
  watch: {
    async page(val) {
      if (!this.search) {
        await this.paginate();
      } else {
        await this.handleSearch();
      }
    },
    async movements_page(val) {
      await this.showProductMovement(this.selectedProduct);
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
