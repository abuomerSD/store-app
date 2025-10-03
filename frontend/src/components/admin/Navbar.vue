<template>
  <nav class="navbar navbar-expand-lg bg-primary">
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
            <a
              class="nav-link active text-white"
              aria-current="page"
              href="#"
              >{{ $t("navbar.home") }}</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">{{
              $t("navbar.categories")
            }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">{{
              $t("navbar.products")
            }}</a>
          </li>
        </ul>
        <div class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-black"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-language"></i>
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
        <p class="nav-item">{{ user.username }}</p>
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
      lang: "ar",
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
  },
  mounted() {
    this.getUser();
  },
  watch: {
    lang(newLang) {
      this.$i18n.locale = newLang;
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
