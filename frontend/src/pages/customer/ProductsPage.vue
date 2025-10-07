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

      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("products.code") }}</th>
              <th>{{ $t("products.name") }}</th>
              <th>{{ $t("categories.description") }}</th>
              <th>{{ $t("products.categoryName") }}</th>
              <th>{{ $t("products.ChooseUnit") }}</th>
              <th>{{ $t("products.Quantity") }}</th>
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
    </div>
  </CustomerLayout>
</template>

<script>
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
  },

  async mounted() {
    await this.paginate();
  },

  watch: {
    async page() {
      if (!this.search) await this.paginate();
      else await this.handleSearch();
    },
  },
};
</script>
