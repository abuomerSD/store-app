<template>
  <AdminLayout>
    <div class="container mt-3">
      <h3>{{ $t("units.title") }}</h3>
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
              <th scope="col">{{ $t("categories.name") }}</th>
              <th scope="col">{{ $t("categories.qtyPerUnit") }}</th>
              <th scope="col">{{ $t("categories.createdBy") }}</th>
              <th scope="col">{{ $t("categories.createdAt") }}</th>
              <th scope="col">{{ $t("categories.updatedAt") }}</th>
              <th scope="col">{{ $t("categories.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in units" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ unit.name }}</td>
              <td>{{ unit.qtyPerUnit }}</td>
              <td>{{ unit.createdBy.username }}</td>
              <td>{{ new Date(unit.createdAt).toLocaleDateString() }}</td>
              <td>{{ new Date(unit.updatedAt).toLocaleDateString() }}</td>
              <td>
                <i
                  class="fa-solid fa-lg fa-pen-to-square text-primary icon"
                  data-bs-toggle="modal"
                  data-bs-target="#editUnitModal"
                  @click="selectUnit(unit)"
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
      <!-- Add Unit Modal -->

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
                {{ $t("units.addUnit") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="">{{ $t("units.name") }}</label>
              <input type="text" class="form-control" v-model="unit.name" />
              <label for="">{{ $t("units.convertionFactor") }}</label>
              <input
                type="number"
                min="1"
                class="form-control"
                v-model="unit.qtyPerUnit"
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

      <!-- edit unit modal -->
      <div
        class="modal fade"
        id="editUnitModal"
        tabindex="-1"
        aria-labelledby="editUnitModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="editUnitModalLabel">
                {{ $t("units.updateUnit") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label for="">{{ $t("units.name") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="selectedUnit.name"
              />
              <label for="">{{ $t("units.convertionFactor") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="selectedUnit.qtyPerUnit"
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
import AdminLayout from "../../layouts/AdminLayout.vue";
import { PAGE_LIMIT } from "../../utils/constants";

export default {
  components: {
    AdminLayout,
  },
  data() {
    return {
      unit: {},
      units: [],
      selectedUnit: {},
      page: 1,
      limit: PAGE_LIMIT,
    };
  },
  methods: {
    async paginate() {
      await this.$http
        .get(`units/paginate?pageStr=${this.page}&limitStr=${this.limit}`)
        .then((res) => {
          console.log(res);
          this.units = res.data.units;
          this.total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
    async save() {
      // validation
      if (!this.unit.name || !this.unit.qtyPerUnit) {
        this.$toast.warning(this.$t("units.fillAllFields"));
        return;
      }

      await this.$http
        .post("units", this.unit)
        .then(async (res) => {
          console.log(res);
          this.$toast.success(this.$t("units.unitSavedSuccessfully"));
          await this.paginate();
          this.unit = {};
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error(err.message);
        });
    },
    async update() {
      // validation
      if (!this.selectedUnit.name || !this.selectedUnit.qtyPerUnit) {
        this.$toast.warning(this.$t("units.fillAllFields"));
        return;
      }
      const id = this.selectedUnit._id;
      console.log("this.selectedUnit", this.selectedUnit);
      await this.$http.put("units", id, this.selectedUnit).then(async (res) => {
        console.log(res);
        this.$toast.success(this.$t("units.unitUpdatedSuccessfully"));
        await this.paginate();
        this.selectedUnit = {};
      });
    },
    selectUnit(unit) {
      this.selectedUnit = unit;
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
