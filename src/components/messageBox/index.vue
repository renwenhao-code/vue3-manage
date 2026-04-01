<template>
  <div class="message-box-container">
    <el-button type="primary" @click="showMessageBox"
      >显示可拖拽消息框</el-button
    >
    <el-dialog
      v-model="dialogFormVisible"
      title="编辑商品"
      width="800"
      :draggable="true"
      :align-center="true"
    >
      <el-form :model="goods" label-width="120px" :inline="true">
        <el-form-item label="商品名称">
          <el-input v-model="goods.name"></el-input>
        </el-form-item>
        <el-form-item label="商品现售价格">
          <el-input v-model="goods.price"></el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input v-model="goods.originalPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品股票代码">
          <el-input v-model="goods.stock"></el-input>
        </el-form-item>

        <el-form-item label="商品图片">
          <img :src="goods.image" width="177px" alt="" />
        </el-form-item>
        <el-form-item label="商品详情">
          <el-input v-model="goods.description" type="textarea" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="goods.category" style="width: 177px">
            <el-option
              v-for="item in categoryList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="goods.category"></el-input> -->
        </el-form-item>

        <el-form-item label="商品评分">
          <el-input v-model="goods.rating"></el-input>
        </el-form-item>
        <el-form-item label="商品销量">
          <el-input v-model="goods.sales"></el-input>
        </el-form-item>
        <el-form-item label="商品创建时间">
          <p>{{ goods.createTime }}</p>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="calcelForm">取消</el-button>
          <BaseButton
            type="primary"
            @click="submitForm"
            :disabled="submitDisabled"
          >
            提交
          </BaseButton>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product } from "@/type/index";
import { ElMessage, ElMessageBox } from "element-plus";
import { useProductsStore } from "@/stores/products.ts";
// import BaseButton from "@/components/baseButton/index.vue";
//定义自定义事件
const emits = defineEmits(["custom-event-getProduct"]);

const dialogFormVisible = ref(false);

const submitDisabled = ref(true);

const categoryList = ref([
  "电子产品",
  "服装鞋帽",
  "食品饮料",
  "家居用品",
  "图书文具",
  "运动户外",
]);

// 正确初始化goods（严格匹配Product类型，非空对象）
const goods = ref<Product>({
  id: "",
  name: "",
  price: 0,
  originalPrice: 0,
  stock: 0,
  category: "", // 必须保留，保证响应式
  description: "",
  image: "",
  rating: 0,
  sales: 0,
  createTime: "",
});
// 解构出store中的方法
const { storeEditProduct } = useProductsStore();





// 监听goods，当goods变化时，将submitDisabled设为true，防止重复提交
// 创建 watch 并保存停止函数
let stopWatch = watch(
  goods,
  (newVal) => {
    submitDisabled.value = false;
  },
  { deep: true }
);

// 需要赋值但不触发 watch 的操作
const updateWithoutTrigger = (newData) => {
  // 1. 停止监听
  stopWatch();
  // 2. 执行赋值
  goods.value = { ...newData };
  // 3. 重新开启监听
  stopWatch = watch(
    goods,
    (newVal) => {
      submitDisabled.value = false;
    },
    { deep: true }
  );
};

// 显示消息框（编辑商品，赋值行数据）
const showMessageBox = (row: Product) => {
  dialogFormVisible.value = true;
  goods.value = { ...row };
  updateWithoutTrigger(row);
};








// 取消时重置为初始值，不要清空成{}
function calcelForm() {
  dialogFormVisible.value = false;
  // 重置为初始值，而非空对象！
  goods.value = {
    id: "",
    name: "",
    price: 0,
    originalPrice: 0,
    stock: 0,
    category: "",
    description: "",
    image: "",
    rating: 0,
    sales: 0,
    createTime: "",
  };
}
//提交数据请求
async function submitForm(done) {
  try {
    await storeEditProduct(goods.value);
    dialogFormVisible.value = false;
    //告知父组件修改完成
    emits("custom-event-getProduct", true);
  } catch (error) {
    ElMessage.error("修改失败");
  } finally {
    done();
  }
}
//将属性和方法暴露出去
defineExpose({
  showMessageBox,
});
</script>

<style scoped>
.message-box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 自定义消息框样式 */
:deep(.draggable-message-box) {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 消息框标题栏样式 */
:deep(.draggable-message-box .el-message-box__header) {
  cursor: move;
  user-select: none;
}
</style>
<style lang="less" scoped>
:deep(.el-textarea__inner) {
  height: 177px;
}
</style>