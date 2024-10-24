<template>
  <h2 class="py-5">Edit Product</h2>
  <p>Product ID: {{ productId }}</p>
  <VForm @submit.prevent="handleSubmit">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab v-for="(tab, index) in tabs" :key="`window${index}`" :value="`window${index}`">
          {{ tab.label }}
        </VTab>
      </VTabs>
      <VBtn type="submit">Save</VBtn>
    </div>

    <VCard class="mt-5">
      <VCardText>
        <VWindow v-model="currentTab">
          <VWindowItem v-for="(tab, index) in tabs" :key="`window${index}`" :value="`window${index}`">
            <component :is="tab.component" @updateBasicDetails="handleBasicDetails"
              @updateDescription="handleDescription" @updateFiles="handleFiles" />
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
  </VForm>
  <VSnackbar v-model="snackbar.visible" :timeout="snackbar.timeout" color="success">
    {{ snackbar.message }}
  </VSnackbar>
</template>

<script lang="ts" setup>
import { Product, useProductsStore } from '@/stores/module/products';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import basicDetails from './forms/basic_details/index.vue';
import description from './forms/description/index.vue';
interface RouteParams {
  id: string; // Specify that 'id' is a string
}
const route = useRoute();
const params = route.params as RouteParams;

// Extract the product ID from the route parameters
const productId = params.id;
console.log('Editing product with ID:', productId);


const currentTab = ref('window0');
const basicDetailsData = ref<Record<string, any>>({});
const descriptionData = ref<Record<string, any>>({});
const filesData = ref<File[]>([]);
const snackbar = ref({
  visible: false,
  message: '',
  timeout: 3000, // Duration before auto-hide
});

const handleBasicDetails = (data: Record<string, any>) => {
  basicDetailsData.value = data;
};

const handleDescription = (data: Record<string, any>) => {
  descriptionData.value = data;
};

const handleFiles = (files: File[]) => {
  filesData.value = files;
};

const handleSubmit = async () => {
  const formData = new FormData();

  // Append basic details data to formData
  for (const [key, value] of Object.entries(basicDetailsData.value)) {
    formData.append(key, value as string);
  }

  // Append description data to formData
  for (const [key, value] of Object.entries(descriptionData.value)) {
    formData.append(key, value as string);
  }

  // Append files data to formData
  filesData.value.forEach((file) => {
    formData.append('images', file);
  });

  const productsStore = useProductsStore();

  // Create a complete Product object
  const product: Product = {
    name: basicDetailsData.value.name || '',
    description: descriptionData.value.description || '',
    specifications: descriptionData.value.specifications || '',
    images: [], // You might want to handle how images are populated
    default_image: basicDetailsData.value.default_image || '',
    short_description: descriptionData.value.shortdescription || 'empty',
    meta_title: basicDetailsData.value.meta_title || '',
    meta_description: basicDetailsData.value.meta_description || '',
    sku: basicDetailsData.value.sku || '',
    primary_category_id: basicDetailsData.value.primary_category_id || '',
    category_ids: basicDetailsData.value.category_ids || [],
    slug: basicDetailsData.value.slug || '',
    indexing: basicDetailsData.value.indexing, // Set default value or adjust based on your needs
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // products_category_link: [], // Populate if necessary
    // primary_category: { product_id: '', category_id: '', created_at: '', updated_at: '' }, // Adjust as per your logic
  };

  try {
    // Pass the complete Product object and files
    await productsStore.createProduct(product, filesData.value);
    console.log('Product created successfully');
    // Show success message in Snackbar
    snackbar.value.visible = true;
    snackbar.value.message = "Product updated successfully!";

    // Navigate back to the product list page
    // await router.push('/product'); // Adjust this path to match your route configuration for the product list
  } catch (error) {
    console.error('Error updating product:', error);
    snackbar.value.visible = true;
    snackbar.value.message = "Error updating product. Please try again.";
  }
};

// Define the tab structure
const tabs = [
  {
    label: 'Basic details',
    component: basicDetails,
  },
  {
    label: 'Description',
    component: description,
  },
];
</script>

<style scoped>
.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
