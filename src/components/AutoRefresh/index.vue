<template>
  <div class="auto-refresh">
    <el-button icon="el-icon-refresh" class="refresh-btn" @click="refresh"></el-button>
    <el-select class="interval-select" v-model="selectedInterval" @change="setInterval">
      <el-option v-for="item in intervalOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'AutoRefresh',
  props: {
    intervalOptions: {
      type: Array,
      default: () => [
        { label: 'OFF', value: 'off' },
        { label: '5s', value: '5' },
        { label: '10s', value: '10' },
        { label: '30s', value: '30' },
        { label: '45s', value: '45' },
        { label: '1m', value: '60' },
        { label: '5m', value: '300' },
      ]
    },
    defaultInterval: {
      type: String,
      default: "off",
    },
  },
  data() {
    return {
      intervalId: null,
      selectedInterval: this.defaultInterval,
    };
  },
  methods: {
    refresh() {
      // 手动刷新
      this.$emit("refresh")
      //重启定时器
      this.setInterval()
    },
    startAutoRefresh() {
      // 自动刷新
      this.intervalId = setInterval(() => {
        this.$emit("refresh");
      }, this.selectedInterval * 1000)
    },
    stopAutoRefresh() {
      clearInterval(this.intervalId)
    },
    setInterval() {
      if (this.selectedInterval == "off") {
        this.stopAutoRefresh()
      } else {
        this.stopAutoRefresh()
        this.startAutoRefresh()
      }
    },
  },
  watch: {
    defaultInterval: function () {
      this.selectedInterval = this.defaultInterval
    },
    selectedInterval(newVal) {
      this.setInterval()
    },
  },
  mounted() {
    this.setInterval()
  },
  beforeDestroy() {
    this.stopAutoRefresh()
  },
}
</script>

<style scoped>
.auto-refresh {
  align-items: center;
  margin: auto;
}

.refresh-btn {
  cursor: pointer;
}
</style>
