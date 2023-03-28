<template>
  <div class="pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="totalRows"
      :hide-on-single-page="true" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "MyPagination",
  props: {
    currentPage_got: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 100
    },
    totalRows: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    }
  },
  data() {
    return {
      currentPage: this.currentPage_got,
    }
  },
  watch: {
    currentPage_got: function () {
      this.currentPage = this.currentPage_got
    }
  },
  methods: {
    // Handle page size changes
    handleSizeChange(size) {
      this.$emit('update:pageSize', size);
      this.$emit('size-change', size);
    },
    // Handle current page changes
    handleCurrentChange(page) {
      this.$emit('update:currentPage', page);
      this.$emit('current-change', page);
    }
  }
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
</style>