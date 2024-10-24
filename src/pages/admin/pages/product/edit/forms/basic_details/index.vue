<template>
  <VRow>

    <VCol cols="6">
      <p>Product ID: {{ productId }}
      </p>
      <AppTextField v-model="name" label="Name" placeholder="Johndoe" />
    </VCol>
    <VCol cols="6">
      <AppAutocomplete v-model="selectedprimary_categoryId" :items="categoryItems" item-title="category_name"
        item-value="id" label="Primary category" placeholder="Select" />
    </VCol>
    <VCol cols="6">
      <AppTextField v-model="slug" label="Slug" type="text" placeholder="http://localhost:5173/product/create" />
      <p>Slug Value: {{ slug }}</p>

    </VCol>
    <VCol cols="6">
      <AppAutocomplete v-model="selectedCategoryIds" :items="categoryItems" item-title="category_name" item-value="id"
        placeholder="Select" label="Categories" chips multiple />
    </VCol>
    <VCol cols="6">
      <AppTextField v-model="sku" label="SKU" placeholder="sku" />
    </VCol>
    <VCol cols="12">
      <VFileInput label="File input" multiple @change="handleFileInput" accept="image/*" />
      <div v-if="uploadedFileNames.length">
        <p>Selected files:</p>
        <VRow>
          <VCol cols="2" v-for="(file, index) in uploadedFilePreviews" :key="index">
            <img :src="file.url" width="150px" />{{ file.name }}
            <button @click="removeFile(index)" color="error">Remove</button>

          </VCol>
        </VRow>
        <VRow>
          <VCol cols="2" v-for="(file, index) in uploadedFileNames" :key="index">
            <img :src="getImageUrl(file)" width="150px" />{{ file }}

          </VCol>
        </VRow>

      </div>
    </VCol>
    <VCol cols="6">
      <AppTextField v-model="meta_title" label="Meta Title" placeholder="Meta Title" />
      <div class="demo-space-x">
        <VSwitch v-model="indexing" label="Indexing" />
      </div>
    </VCol>
    <VCol cols="6">
      <AppTextarea v-model="meta_description" label="Meta Description" placeholder="Meta Description" auto-grow />
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { useProductCategoryStore } from '@/stores/module/product-category';
import { useProductsStore } from '@/stores/module/products';

import { computed, defineEmits, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { VCol } from 'vuetify/lib/components/index.mjs';


const emit = defineEmits(['updateBasicDetails', 'updateFiles']); // Allow both events
const name = ref('');
const selectedprimary_categoryId = ref('');
const slug = computed(() => {
  return name.value
    .toLowerCase()
    .replace(/[\s/\\|]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
});
const sku = ref('');
const meta_title = ref('');
const meta_description = ref('');
const indexing = ref(false);
const selectedCategoryIds = ref([]);
const uploadedFiles = ref<File[]>([]); // Store the uploaded files
const uploadedFileNames = ref<string[]>([]); // Store plain file names for the images
const productCategoryStore = useProductCategoryStore();
const productStore = useProductsStore();

interface RouteParams {
  id: string; // Specify that 'id' is a string
}
const route = useRoute();
const params = route.params as RouteParams;

// Extract the product ID from the route parameters
const productId = params.id;

const getImageUrl = (file: string) => {
  return `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_UPLOADS_DIR}${file}`;
}
// Fetch and populate product details on component mount
onMounted(async () => {
  productCategoryStore.fetchProductCategories();

  const fetchedProduct = await productStore.fetchProductById(productId);

  if (fetchedProduct) {
    // Populate form fields with the fetched product data
    name.value = fetchedProduct.name;
    slug.value = fetchedProduct.slug;
    sku.value = fetchedProduct.sku;
    meta_title.value = fetchedProduct.meta_title;
    meta_description.value = fetchedProduct.meta_description;
    selectedprimary_categoryId.value = fetchedProduct.primary_category_id;
    selectedCategoryIds.value = fetchedProduct.category_ids;
    indexing.value = fetchedProduct.indexing;
    uploadedFiles.value = fetchedProduct.images; // Assuming this is an array of image URLs
    uploadedFileNames.value = fetchedProduct.images;
  } else {
    console.error("Failed to fetch product data");
  }
});


// Generate category items for autocomplete
const categoryItems = computed(() => {
  return productCategoryStore.productCategories;
});
console.log('categoryItems:', categoryItems);
const productItemsByID = computed(() => {
  return productStore.products;
});
console.log('productItemsByID hello:', productItemsByID);

// Helper function to get updated details in the required format
const getUpdatedDetails = () => {
  return {
    name: name.value,
    images: uploadedFiles.value, // Use raw filenames array
    default_image: uploadedFileNames.value[0] || '', // Use the first image as the default
    meta_title: meta_title.value,
    meta_description: meta_description.value,
    sku: sku.value,
    primary_category_id: selectedprimary_categoryId.value,
    category_ids: selectedCategoryIds.value,
    slug: slug.value,
    indexing: indexing.value,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// Handle file input change
const uploadedFilePreviews = ref<{ name: string; url: string }[]>([]);

const handleFileInput = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    uploadedFiles.value = Array.from(files); // Store file objects
    uploadedFilePreviews.value = []; // Clear previous previews

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedFilePreviews.value.push({
          name: file.name,
          url: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    });

    // Emit the files to the parent
    emit('updateFiles', uploadedFiles.value);
  }
};
const removeFile = (index: number) => {
  uploadedFilePreviews.value.splice(index, 1);
  uploadedFiles.value.splice(index, 1);
  emit('updateFiles', uploadedFiles.value); // Emit the updated files to the parent
};

// Watch for changes in the form fields
watch(
  [name, selectedprimary_categoryId, slug, sku, meta_title, meta_description, indexing, selectedCategoryIds, uploadedFiles],
  () => {
    emit('updateBasicDetails', getUpdatedDetails());
  }
);
</script>

<style scoped>
.demo-space-x {
  display: flex;
  gap: 10px;
}
</style>
