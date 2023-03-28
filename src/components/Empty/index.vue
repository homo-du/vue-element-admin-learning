<template>
  <div>
    <el-empty description="暂无数据" :image-size='image_size'></el-empty>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: {
    image_size: {
      type: Number,
      default: 50
    }
  }
}
</script>