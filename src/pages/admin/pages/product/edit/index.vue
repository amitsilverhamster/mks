<template>
  <v-container>
    <h1>Edit Product</h1>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="form.name" label="Name" :rules="nameRules" required></v-text-field>

      <v-text-field v-model="form.slug" label="Slug" :rules="slugRules" required></v-text-field>

      <v-text-field v-model="form.short_description" label="Sort Description" :rules="sortDescriptionRules"
        required></v-text-field>

      <v-textarea v-model="form.description" label="Long Description" :rules="longDescriptionRules"
        required></v-textarea>

      <v-file-input v-model="form.images" label="Images" :rules="imagesRules" multiple required @change="previewImages"
        @click:clear="previewImages"></v-file-input>
      <v-row class="py-5">
        <v-col v-for="(image, index) in imagePreviews" :key="index" cols="12" sm="6" md="4">
          <v-img :src="image" aspect-ratio="1" class="mb-4"></v-img>
        </v-col>
      </v-row>
      <v-row class="py-5">
        <v-col v-for="(image, index) in uploadedImages" :key="index" cols="12" sm="6" md="4">
          <v-img :src="getImageUrl(image)" aspect-ratio="1" class="mb-4"></v-img>
        </v-col>
      </v-row>
      <v-btn :to="{ name: 'AdminProducts' }" color="secondry" class="mr-2 my-5">Back</v-btn>
      <v-btn type="submit" color="primary my-5">Update</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import axiosInstance from '@plugins/axios';
import { ref } from 'vue';

const route = useRoute();
const imagePreviews = ref<string[]>([]);
const uploadedImages = ref<string[]>([]);
const form = ref({
  name: '',
  slug: '',
  short_description: '',
  description: '',
  images: [],
});

const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length <= 50 || 'Name must be less than 50 characters',
];

const slugRules = [
  (v: string) => !!v || 'Slug is required',
  (v: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'Slug must be a valid format',
];

const sortDescriptionRules = [
  (v: string) => !!v || 'Sort Description is required',
  (v: string) => v.length <= 100 || 'Sort Description must be less than 100 characters',
];

const longDescriptionRules = [
  (v: string) => !!v || 'Long Description is required',
];

const imagesRules = [
  (v: File[]) => v.length > 0 || 'At least one image is required',
];
const getImageUrl = (image: string) => {
  const baseUrl = 'http://localhost:3001/uploads/';
  return `${baseUrl}${image}`;
};

const submitForm = () => {
  try {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('slug', form.value.slug);
    formData.append('short_description', form.value.short_description);
    formData.append('description', form.value.description);
    form.value.images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    axiosInstance.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      console.log('Form submitted successfully:', response.data);
    }).catch(error => {
      console.error('Error submitting form:', error);
    });

  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const previewImages = () => {
  imagePreviews.value = [];
  uploadedImages.value = [];

  if (form.value.images) {
    Array.from(form.value.images).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          imagePreviews.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
     // Clear uploadedImages if imagePreviews is not empty
  if (imagePreviews.value.length > 0) {
    uploadedImages.value = [];
  }
  }
};

const getProductByID = (id: string) => {
  axiosInstance.get(`products/edit/${id}`)
    .then(response => {
      form.value.description = response.data.data.description;
      form.value.name = response.data.data.name;
      form.value.short_description = response.data.data.short_description;
      form.value.slug = response.data.data.slug;
      uploadedImages.value = response.data.data.images;
    })
    .catch(error => {
      console.log(error);
    });
}

onMounted(() => {
  const id = route.params.id;
  getProductByID(id);
});
</script>