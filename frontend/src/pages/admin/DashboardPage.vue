<template>
  <AdminLayout>
    <div class="container mt-3">
      <h3>{{ $t("dashboard.title") }}</h3>
      <div class="row mt-4">
        <div class="col-md-4">
          <router-link to="/admin/categories" class="text-decoration-none">
            <div class="card text-center shadow-sm mb-3">
              <div class="card-body">
                <h5 class="card-title">
                  {{ $t("dashborad.categories") }}
                </h5>
                <p class="card-text display-6">{{ categoriesCount }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link to="/admin/products" class="text-decoration-none">
            <div class="card text-center shadow-sm mb-3">
              <div class="card-body">
                <h5 class="card-title">
                  {{ $t("dashboard.products") }}
                </h5>
                <p class="card-text display-6">{{ productsCount }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link to="/admin/users" class="text-decoration-none">
            <div class="card text-center shadow-sm mb-3">
              <div class="card-body">
                <h5 class="card-title">
                  {{ $t("dashboard.users") }}
                </h5>
                <p class="card-text display-6">{{ usersCount }}</p>
              </div>
            </div>
          </router-link>
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
  data() {
    return {
      categoriesCount: 0,
      productsCount: 0,
      usersCount: 0,
    };
  },
  created() {
    this.fetchCounts();
  },
  methods: {
    async fetchCounts() {
      await this.$http
        .get("dashboard/get-counts")
        .then((res) => {
          console.log(res);
          this.categoriesCount = res.data.categoriesCount;
          this.productsCount = res.data.productsCount;
          this.usersCount = res.data.usersCount;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>
