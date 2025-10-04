<template>
  <h3>Categories Details</h3>
</template>

<script>
export default {
  data() {
    return {
      categoryId: "",
    };
  },
  methods: {
    async paginate() {},
  },
  async mounted() {
    this.categoryId = this.$route.params.id;
    await this.paginate();
  },
};
</script>

<style></style>
