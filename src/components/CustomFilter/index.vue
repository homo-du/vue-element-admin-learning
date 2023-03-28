<template>
  <el-popover ref="popover" trigger="click" placement="bottom-start" @show="showPopover">
    <div style="padding: 10px;">
      <el-form :inline="false" ref="filterForm">

        <template v-if="filterType === 'date'">
          <el-form-item label="">
            <el-date-picker v-model="filter[filterType].value" type="datetimerange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy/MM/dd h:m:s A">
            </el-date-picker>
          </el-form-item>
        </template>

        <template v-else-if="filterType === 'select'">
          <el-form-item label="">
            <el-select v-model="filter[filterType].value" placeholder="请选择" multiple collapse-tags>
              <el-option v-for="(option, index) in filterOptions" :key="index" :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-else-if="filterType === 'search'">
          <el-input placeholder="搜索..." v-model="filter[filterType].value" size="medium" prefix-icon="el-icon-search"
            ref="searchInput">
          </el-input></template>

        <template v-else-if="filterType === 'number'">
          <el-form-item label="选择筛选方式">
            <el-select v-model="filter[filterType].operation" placeholder="请选择">
              <el-option label="等于" value="="></el-option>
              <el-option label="大于或等于" value=">="></el-option>
              <el-option label="小于或等于" value="<="></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="filter[filterType].value" placeholder="请输入"></el-input>
          </el-form-item>
        </template>

      </el-form>

      <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
        <el-button type="primary" size="mini" @click="handleConfirm">确认</el-button>
        <el-button size="mini" @click="handleReset">重置</el-button>
      </div>
    </div>
    <el-input slot="reference" placeholder="过滤" :value="displayFilter" :readonly="true" :clearable="false"
      :visible-arrow="false" style="cursor: pointer;"></el-input>
  </el-popover>
</template>

<script>
export default {
  props: {
    filterType: {
      type: String,
      required: true,
    },
    filterOptions: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      defaultFilter: {
        date: {
          filterType: 'date',
          value: '',
        },
        select: {
          filterType: 'select',
          value: '',
        },
        search: {
          filterType: 'search',
          value: '',
        },
        number: {
          filterType: 'number',
          operation: '',
          value: '',
        }
      },
      filter: null,
      displayFilter: '',
    }
  },
  created() {
    this.initFilter()
  },
  methods: {

    showPopover() {
      if (this.filterType == 'search') {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    },

    display() {
      this.displayFilter = ''
      for (let [key, value] of Object.entries(this.filter[this.filterType])) {
        if (key != 'filterType')
          this.displayFilter += value
      }
    },

    initFilter() {
      this.filter = JSON.parse(JSON.stringify(this.defaultFilter))
    },

    handleConfirm() {

      this.display()

      let filter = JSON.parse(JSON.stringify(this.filter))[this.filterType]
      if (this.displayFilter == '')
        filter = null
      this.$emit('update-filter', filter)
      this.$refs.popover.doClose()
    },

    handleReset() {
      this.filter = JSON.parse(JSON.stringify(this.defaultFilter))
    },
  },
};
</script>
