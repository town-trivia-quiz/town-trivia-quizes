<template>
  <div class="card mt-1 mb-1">
    <div class="card-body">
      <span class="fw-bold">{{ username }}</span> : {{ chat }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Chat",
  props: ["chat"],
  computed: {
    ...mapState(["username"])
  }
};
</script>

<style></style>
