<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 mx-auto" style="max-width: 400px">
      <h3 class="text-center mb-4">{{ $t("loginPage.title") }}</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">{{ $t("loginPage.username") }}</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-3">
          <label class="form-label">{{ $t("loginPage.password") }}</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">{{ $t("loginPage.language") }}</label>
          <select class="form-select" v-model="lang" @change="changeLanguage">
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ $t("loginPage.title") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      lang: "en",
      user: {},
    };
  },
  methods: {
    async handleSubmit() {
      await this.$http
        .post("auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            const authStore = useAuthStore();
            authStore.login(res.data.user, res.data.auth_token);
            this.$router.push({ name: "AdminDashboard" });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
            this.$toast.error(
              this.$i18n.locale === "ar"
                ? err.response.data.data.message_ar
                : err.response.data.data.message_en
            );
          } else {
            console.log(err.response.data.data.message[0].message);

            this.$toast.error(err.response.data.data.message[0].message);
          }
        });
    },

    changeLanguage() {
      this.$i18n.locale = this.lang;

      if (this.lang === "ar") {
        document.documentElement.dir = "rtl";
        document.body.style.fontFamily = "'Cairo', sans-serif";
      } else {
        document.documentElement.dir = "ltr";
        document.body.style.fontFamily = "'Roboto', sans-serif";
      }
    },
  },
  mounted() {},
};
</script>
