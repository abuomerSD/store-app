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
