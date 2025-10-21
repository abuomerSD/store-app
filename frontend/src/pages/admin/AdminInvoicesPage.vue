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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <th scope="row">{{ index + 1 }}</th>
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
    <!-- Modal -->
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
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ $t("invoices.cancel") }}
            </button>
            <button type="button" class="btn btn-primary">
              {{ $t("invoices.save") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout.vue";
export default {
  components: {
    AdminLayout,
  },
};
</script>

<style></style>
