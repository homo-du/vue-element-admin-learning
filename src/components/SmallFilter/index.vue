<template>
  <el-popover ref="popover" trigger="click" placement="bottom-start">
    <div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="option in options" :key="option" :label="option" style="display:block;"
          v-if="propUniqueValues && propName"></el-checkbox>
      </el-checkbox-group>

      <div style="display: flex; justify-content: flex-start;">
        <el-button type="text" size="mini" @click="handleConfirm">确认</el-button>
        <el-button type="text" size="mini" @click="handleReset">重置</el-button>
      </div>
    </div>
    <div slot="reference" style="cursor: pointer;">
      <i class="el-icon-arrow-down"></i>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "SmallFilter",
  props: {
    propUniqueValues: {
      type: Object,
      required: true,
    },
    propName: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      checkList: [],
    }
  },
  computed: {
    options() {
      let options = this.propUniqueValues[this.propName]
      return options
    }
  },
  methods: {

    handleConfirm() {
      this.$emit('update-filter', this.checkList)
      this.$refs.popover.doClose()
    },

    handleReset() {
      this.checkList = []
    },
  },
};
</script>