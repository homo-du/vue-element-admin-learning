<template>
  <el-tag :type="configs[2]" :color="configs[0]" :class="configs[3]">
    <span><i :class='configs[1]'></i></span>
    {{ severity }}
  </el-tag>
</template>

<script>
export default {
  name: 'Severity',
  props: {
    severity: {
      type: String,
    }
  },
  computed: {
    configs() {
      let map = {
        //severity:[bg-color, icon, type，class]
        '严重': [null, 'el-icon-error', 'danger', 'severity-tag'],
        '紧急': [null, 'el-icon-error', 'warning', 'severity-tag'],
        '轻微': ['#FFFEE7', 'el-icon-error', null, 'p1-tag'],
        '恢复': [null, 'el-icon-success', 'success', 'severity-tag'],
      }
      return map[this.severity] || [null, null, 'info', 'severity-tag']
    }
  }
}
</script>

<style scoped>
.severity-tag {
  margin: 4px;
}

.p1-tag {
  margin: 4px;
  color: gold;
  border-color: #FFFBA4;
}
</style>