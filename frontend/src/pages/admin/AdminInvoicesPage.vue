<template>
  <AdminLayout>
    <div class="container mt-3">
      <h3>{{ $t("invoices.title") }}</h3>
      <div class="d-flex justify-content-between">
        <div>
          <input
            type="text"
            class="form-control search"
            v-model="search"
            @keyup="handleSearch"
            :placeholder="$t('invoices.search')"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <i
            class="fa-solid fa-xl fa-plus icon text-success"
            data-bs-toggle="modal"
            data-bs-target="#addInvoiceModal"
          ></i>
        </div>
      </div>
      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>{{ $t("invoices.Date") }}</th>
              <th>{{ $t("invoices.InvoiceNumber") }}</th>
              <th>{{ $t("invoices.CustomerName") }}</th>
              <th>{{ $t("invoices.info") }}</th>
              <th>{{ $t("invoices.Actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in invoices" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ new Date(invoice.createdAt).toLocaleDateString() }}</td>
              <td>{{ invoice.invoiceNumber }}</td>
              <td>{{ invoice.customerName }}</td>
              <td>{{ invoice.info }}</td>
              <td>
                <i
                  class="fa-solid fa-lg fa-eye icon text-success"
                  @click="showInvoiceFile(invoice.file)"
                ></i>
                <i class="fa-solid fa-trash fa-lg icon text-danger"></i>
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
    </div>

    <!-- Modals -->
    <!-- Add Invoice Modal -->
    <div
      class="modal fade"
      id="addInvoiceModal"
      tabindex="-1"
      aria-labelledby="addInvoiceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addInvoiceModalLabel">
              {{ $t("invoices.addInvoice") }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label for="">{{ $t("invoices.invoiceNumber") }}</label>
            <input type="text" class="form-control" v-model="invoiceNumber" />
            <label for="">{{ $t("invoices.customerName") }}</label>
            <input type="text" class="form-control" v-model="customerName" />
            <label for="">{{ $t("invoices.info") }}</label>
            <input type="text" class="form-control" v-model="info" />
            <label for="">{{ $t("invoices.selectfile") }}</label>
            <input
              type="file"
              class="form-control"
              @change="onFileChange"
              ref="fileChooser"
              accept="application/pdf,.pdf"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ $t("invoices.cancel") }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="save"
              data-bs-dismiss="modal"
            >
              {{ $t("invoices.save") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Invoice Modal  -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteInvoiceModal"
      tabindex="-1"
      aria-labelledby="deleteInvoiceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteInvoiceModalLabel">
              {{ $t("invoices.deleteinvoice") }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ $t("invoices.cancel") }}
            </button>
            <button type="button" class="btn btn-danger">
              {{ $t("invoices.Delete") }}
            </button>
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
      file: null,
      invoiceNumber: "",
      customerName: "",
      info: "",
      invoices: [],
      total_rows: 1,
      page: 1,
      limit: PAGE_LIMIT,
      search: "",
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async save() {
      // validation
      if (
        !this.file ||
        !this.invoiceNumber ||
        !this.customerName ||
        !this.info
      ) {
        this.$toast.warning(this.$t("invoices.PleaseFillAllFields"));
        return;
      }

      const payload = {
        invoiceNumber: this.invoiceNumber,
        customerName: this.customerName,
        info: this.info,
      };

      await this.$http
        .upload("invoices", this.file, payload)
        .then(async (res) => {
          console.log(res);
          this.file = null;
          this.invoiceNumber = "";
          this.customerName = "";
          this.info = "";
          this.$refs.fileChooser.value = "";
          this.$toast.success(this.$t("invoices.InvoiceSavedSuccessfully"));
          await this.paginate();
        })
        .catch((err) => {
          console.error(err.message);
          this.$toast.error(err.message);
        });
    },
    async paginate() {
      await this.$http
        .get(`invoices/paginate?page=${this.page}&limit=${this.limit}`)
        .then((res) => {
          console.log(res);
          this.invoices = res.data.invoices;
          this.total_rows = res.data.total_rows;
        })
        .catch((err) => {
          console.error(err.message);
          this.$toast.error(err.message);
        });
    },
    async handleSearch() {},
    async showInvoiceFile(filePath) {
      window.open(
        `${API_URL}invoices/get-invoice-file?filePath=${filePath}`,
        "_blank"
      );
    },
  },
  async mounted() {
    await this.paginate();
  },
  watch: {
    async page() {
      if (!this.search) {
        await this.paginate();
      } else {
        await this.handleSearch();
      }
    },
  },
};
</script>

<style></style>
