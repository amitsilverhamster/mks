<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="form.name" label="Name" :rules="nameRules" required></v-text-field>

      <v-text-field v-model="form.slug" label="Slug" :rules="slugRules" required></v-text-field>

      <v-text-field v-model="form.sortDescription" label="Sort Description" :rules="sortDescriptionRules"
        required></v-text-field>

      <v-textarea v-model="form.longDescription" label="Long Description" :rules="longDescriptionRules"
        required></v-textarea>

      <v-file-input v-model="form.images" label="Images" :rules="imagesRules" multiple required></v-file-input>
      <v-btn :to="{ name: 'AdminProducts' }" color="secondry" class="mr-2">Back</v-btn>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import axiosInstance from '@plugins/axios';
import { ref } from 'vue';

const form = ref({
  name: '',
  slug: '',
  sortDescription: '',
  longDescription: '',
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

const submitForm = () => {
  try {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('slug', form.value.slug);
    formData.append('sortDescription', form.value.sortDescription);
    formData.append('longDescription', form.value.longDescription);
    form.value.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    axiosInstance.post('/api/products', formData, {
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
</script>