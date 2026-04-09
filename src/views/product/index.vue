<template>
  <el-table
    class="product-table"
    :data="filterTableData"
    v-loading="loadingTable"
    :fit="true"
    stripe
  >
    <el-table-column label="名称" prop="name" align="center" />
    <el-table-column label="价格" prop="price" align="center" />
    <el-table-column label="原价" prop="originalPrice" align="center" />
    <el-table-column label="库存" prop="stock" align="center" />
    <el-table-column label="类别" prop="category" align="center" />
    <el-table-column label="描述" prop="description" align="center" />
    <el-table-column label="图片" prop="image" align="center">
      <template #default="scope">
        <img
          class="rounded-2xl text-center inline-block"
          :src="scope.row.image"
          width="60"
          height="60"
          srcset=""
        />
      </template>
    </el-table-column>
    <el-table-column label="评分" prop="rating" align="center" />
    <el-table-column label="销量" prop="sales" align="center" />
    <el-table-column align="center">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <el-pagination
      :disabled="loadingTable"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <MessageBoxPup
    ref="MessageBox"
    @custom-event-getProduct="customEventGetProduct"
  />
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import MessageBoxPup from "./components/messageBox/index.vue";
import { useProductsStore } from "@/stores/products.ts";
import type { Product, ApiResponse } from "@/type/index";
//表格数据收集
const tableData = ref<Product[]>([]);
// 数据总和
const total = ref<number>(0);
// 当前页面展示的数据
const pageSize = ref<number>(10);
// 当前页码数
const currentPage = ref(1);
// 当前页面数据条数
const currentTableData = ref<Product[]>([]);
//解构store中的方法
const { storeGetProductsList, storeDeleteProductById } = useProductsStore();
//操作子组件中的属性和方法
const MessageBox = ref<InstanceType<typeof MessageBoxPup>>();
// 表格loading
const loadingTable = ref<boolean>(true);

onMounted(async () => {
  // 获取产品列表
  await initTableData();
});

const initTableData = async () => {
  await storeGetProductsList()
    .then((res: any) => {
      tableData.value = res.data;
      currentTableData.value = res.data;
      total.value = res.data.length;
      loadingTable.value = false;
    })
    .catch((err: string | any) => {
      ElMessage.error(err.message);
    });
  //初始化分页
  handleSizeChange(pageSize.value);
};

const search = ref("");
// 实现筛选效果，当用户搜索时在全部数据中进行搜索
const filterTableData = computed(() => {
  if (search.value !== "") {
    const filterData = tableData.value.filter(
      (data: Product) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase()),
    );
    total.value = filterData.length;
    return filterData;
  } else {
    total.value = tableData.value.length;
    return currentTableData.value;
  }
});
//监听计算属性
// watch(filterTableData, (newVal) => {
//   console.log("这是监听的数据",newVal);
// })
// 编辑按钮
const handleEdit = (index: number, row: Product) => {
  //操作子组件中的属性和方法
  MessageBox.value?.showMessageBox(row);
};
// 删除按钮
const count = ref(1);
const handleDelete = async (index: number, row: Product) => {
  // 找到要删除ID在数组中的索引
  const productIndex = tableData.value.findIndex(
    (item: Product) => item.id === row.id,
  );
  // 确认删除弹框
  ElMessageBox.confirm("此操作将永久删除此项, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // 确认删除的后续操作
      // 发送删除请求
      await storeDeleteProductById(row.id)
        .then((res: any) => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          // 将本地的数据同时删除
          tableData.value.splice(productIndex, 1);
          // 将当前页的数据项同时删除
          const currentPageDeleteProductIndex =
            currentTableData.value.findIndex(
              (item: Product) => item.id === row.id,
            );
          currentTableData.value.splice(currentPageDeleteProductIndex, 1);
          // 重新计算总数据
          total.value = tableData.value.length;
          // 记录删除多少条数据，如果大于当前展示页的数据跳转到首页
          if (count.value < pageSize.value) {
            count.value++;
          } else {
            ElMessage({
              type: "warning",
              message: "当前页数据已被全部删除,已为你跳转至首页",
            });
            // 将删除的计数重置
            count.value = 1;
            // 跳转到下一页
            currentPage.value = 1;
            handleCurrentChange(1);
          }
        })
        .catch((err: string | any) => {
          ElMessage.error(err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
// 展示当前页面数据条数的方法
const handleSizeChange = (val: number) => {
  // 当用户选择每页展示的数据条数时，将当前页码数重置为1
  currentPage.value = 1;
  // 将当前页码数和每页展示的数据条数作为参数，将数据按照要求进行切割
  currentTableData.value = tableData.value.slice(0, val);
};

// 展示当前页码数的方法
const handleCurrentChange = (val: number) => {
  // 将当前页码数和每页展示的数据条数作为参数，将数据按照要求进行切割
  currentTableData.value = tableData.value.slice(
    (val - 1) * pageSize.value,
    val * pageSize.value,
  );
};
//接受子组件Product是否修改完毕
const customEventGetProduct = async (e: boolean) => {
  loadingTable.value = true;
  if (e) {
    // 获取产品列表
    try {
      await initTableData();
      ElMessage.success("修改成功");
    } catch (error: string | any) {
      ElMessage.error(error);
    }
  }
};
</script>

<style lang="less" scoped>
.product-table {
  // min-width: 1190px;
  max-height: calc(-60px + 100vh);
  height: 85vh;
}
</style>
