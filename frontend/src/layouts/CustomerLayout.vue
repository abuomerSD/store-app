<template>
  <Navbar></Navbar>
  <slot></slot>
</template>

<script>
import Navbar from "../components/customer/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style></style>
