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
      categoryId: "",
      category: {},
    };
  },
  methods: {
    async paginate() {},
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
  },
  async mounted() {
    this.categoryId = this.$route.params.id;
    await this.getCategoryDetails(this.categoryId);
    await this.paginate();
  },
};
</script>

<style></style>
