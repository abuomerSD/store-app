<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand text-white" href="#">Store App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="navbar-nav mb-2 mb-lg-0 text-white"
          :class="lang === 'ar' ? 'ms-auto' : 'me-auto'"
        >
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link text-white">{{
              $t("navbar.home")
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/categories" class="nav-link text-white">{{
              $t("navbar.categories")
            }}</router-link>
            <!-- <a class="nav-link text-white" href="#">{{
              $t("navbar.categories")
            }}</a> -->
          </li>
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link text-white">{{
              $t("navbar.products")
            }}</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/admin/units" class="nav-link text-white">{{
              $t("navbar.units")
            }}</router-link>
          </li> -->
          <li class="nav-item">
            <router-link to="/admin/users" class="nav-link text-white">{{
              $t("navbar.users")
            }}</router-link>
          </li>
        </ul>
        <div class="nav-item dropdown me-3">
          <a
            class="nav-link dropdown-toggle text-white"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-globe"></i>
            {{ lang }}
            <!-- {{ $t("navbar.language") }} -->
          </a>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" @click="setLangToAr">
                <i class="fi fi-sa"></i>
                {{ $t("navbar.arabic") }}</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="setLangToEn">
                <i class="fi fi-us"></i>
                {{ $t("navbar.english") }}</a
              >
            </li>
          </ul>
        </div>
        <h6 class="nav-item text-white ms-2 me-2">{{ user.username }}</h6>
        <button
          class="nav-item text-white btn btn-danger ms-2 me-2"
          data-bs-toggle="modal"
          data-bs-target="#logoutModal"
        >
          {{ $t("navbar.logout") }}
        </button>
      </div>
    </div>
    <!-- Modals -->
    <div>
      <!-- Add Category Modal -->
      <div
        class="modal fade"
        id="logoutModal"
        tabindex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="logoutModalLabel">
                {{ $t("categories.addCategory") }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {{ $t("navbar.DoYouWantToLogout") }}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {{ $t("categories.cancel") }}
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="logout"
                data-bs-dismiss="modal"
              >
                {{ $t("navbar.logout") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../../stores/auth";

export default {
  data() {
    return {
      user: {},
      lang: this.$i18n.locale,
    };
  },
  methods: {
    getUser() {
      const authStore = useAuthStore();
      this.user = authStore.user;
    },
    setLangToAr() {
      this.lang = "ar";
    },
    setLangToEn() {
      this.lang = "en";
    },
    async logout() {
      await this.$http
        .post("auth/logout", {})
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "AdminLogin" });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message);
        });
    },
  },
  mounted() {
    this.getUser();
  },
  watch: {
    lang(newLang) {
      this.$i18n.locale = newLang;
      localStorage.setItem("locale", newLang);
      if (newLang === "ar") {
        document.documentElement.dir = "rtl";
        document.body.style.fontFamily = "'Cairo', sans-serif";
      } else {
        document.documentElement.dir = "ltr";
        document.body.style.fontFamily = "'Roboto', sans-serif";
      }
    },
  },
};
</script>

<style></style>
