<!-- description/index.vue -->
<template>
  <div>
    <p>Product ID: {{ productId }}
    </p>
    <AppTextarea v-model="description" label="Product Description" placeholder="Enter Product description" auto-grow />

    <AppTextarea v-model="specifications" label="Product Specifications" placeholder="Enter product specifications"
      auto-grow />
    <AppTextarea v-model="shortdescription" label="Short Description" placeholder="Enter short description" auto-grow />

  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch ,computed, onMounted} from 'vue';
import { useProductsStore } from '@/stores/module/products';
import { useRoute } from 'vue-router';


const emit = defineEmits(['updateDescription']);

// Reactive properties for the description, specifications, and short description
const description = ref('');
const specifications = ref('');
const shortdescription = ref('');
const productStore = useProductsStore();

interface RouteParams {
  id: string; // Specify that 'id' is a string
}
const route = useRoute();
const params = route.params as RouteParams;

// Extract the product ID from the route parameters
const productId = params.id;
onMounted(async () => {
  const fetchedProduct = await productStore.fetchProductById(productId);

  if (fetchedProduct) {
    // Populate form fields with the fetched product data
    description.value = fetchedProduct.description;
    specifications.value = fetchedProduct.specifications;
    shortdescription.value = fetchedProduct.short_description;
  } else {
    console.error("Failed to fetch product data");
  }
});
// Emit the updated description data whenever any field changes
watch([description, specifications, shortdescription], () => {
  emit('updateDescription', {
    description: description.value,
    specifications: specifications.value,
    shortdescription: shortdescription.value,
  });
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
