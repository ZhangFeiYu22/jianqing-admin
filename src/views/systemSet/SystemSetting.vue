<template>
  <third-menu :menulists="menulists"></third-menu>
</template>

<script>
export default {
  data() {
    return {
      menulists: [
        {
          pathname: "systemSetList",
          name: "系统设置",
          activeName: "first"
        }
      ]
    };
  }
};
</script>


