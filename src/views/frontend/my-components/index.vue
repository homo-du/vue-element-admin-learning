<template>
  <div class="card-container">
    <el-descriptions v-for="component in componentList" :key="component.prop" :column="1" border class="component-box">
      <el-descriptions-item label="名称"><strong>{{ component.label }}</strong></el-descriptions-item>
      <el-descriptions-item label="描述">{{ component.description }}</el-descriptions-item>
      <el-descriptions-item label="使用方法">
        <highlightjs language="html" :code="component.usage_code"></highlightjs>
      </el-descriptions-item>
      <el-descriptions-item label="效果">
        <component :is="component.prop"></component>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

//导入目录下所有符合条件的文件
const requireComponent = require.context(
  '@/components', // 组件目录的相对路径
  true, // 是否查询子目录
  /[A-Z]|[a-z]\w+\.(vue)$/ // 匹配基础组件文件名的正则表达式
)

export default {
  components: {
    // 动态导入组件
    ...requireComponent.keys().map(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = fileName
        .replace(/^\.\//, '')
        .replace(/\.\w+$/, '')
        .split('-')
        .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
        .join('')
      return { [componentName]: componentConfig.default || componentConfig }
    }).reduce((prev, next) => Object.assign(prev, next), {})
  },
  data() {
    return {
      componentList: [
        {
          prop: 'AutoRefresh',
          label: '自动刷新',
          description: '选择自动刷新时间间隔或手动刷新',
          usage_code: `<auto-refresh :intervalOptions='intervalOptions' @refresh='fetchData' />`,
        },
        {
          prop: 'Empty',
          label: '空状态',
          description: '数据为空时展示',
          usage_code: `<empty :image-size="'50'">`,
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
// 适应性布局，卡片宽度自适应，每行卡片数量自适应，会自动换行
.card-container {
  display: flex;
  flex-wrap: wrap;

  .component-box {
    margin: 10px;
    flex: 0 1 auto;
    min-width: 300px;
    width: auto;
  }
}
</style>