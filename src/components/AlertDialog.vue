<template>
  <div></div>
</template>
<script>
import bus from "@/util/Bus";
export default {
  created() {
    bus.$on(bus.error, data => {
      alert(data);
    });
  },
  beforeDestroy() {
    bus.$off(bus.error);
  }
};
</script>
