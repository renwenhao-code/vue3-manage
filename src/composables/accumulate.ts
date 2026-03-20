import { ref, onMounted, onUnmounted } from "vue";

export function accumulate(target:number) {
  let count = ref(0);

  let timer:any = ref(null);
  onMounted(() => {
    timer = setInterval(() => {
      if (count.value > target) return;
      if (count.value < target) {
        count.value++;
      }
    }, 20);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return count;
}
