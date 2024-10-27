<template>
  <v-container>
    <h1>Create Banner</h1>
    <v-form ref="formRef" @submit.prevent="submitForm">
      <v-text-field v-model="form.title" label="Title" :rules="titleRules" required></v-text-field>

      <v-text-field v-model="form.subtitle" label="Subtitle" :rules="subtitleRules" required></v-text-field>

      <v-text-field v-model="form.Order_By" label="Order_By" :rules="Order_ByRules" required></v-text-field>

      <v-text-field v-model="form.button_text" label="Button text" :rules="button_textRules" required></v-text-field>
      <v-text-field v-model="form.button_url" label="Button url" :rules="button_urlRules" required></v-text-field>

      <v-file-input v-model="form.background_images" label="Background images" :rules="background_imagesRules" multiple
        required @change="previewImages" @click:clear="previewImages"></v-file-input>
      <v-row class="py-5">
        <v-col v-for="(image, index) in imagePreviews" :key="index" cols="12" sm="6" md="4">
          <v-img :src="image" aspect-ratio="1" class="mb-4"></v-img>
        </v-col>
      </v-row>
      <v-btn :to="{ name: 'AdminBanners' }" color="secondry" class="mr-2">Back</v-btn>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import axiosInstance from '@plugins/axios';
import { ref } from 'vue';
const formRef = ref(null);
const form = ref({
  title: '',
  subtitle: '',
  Order_By: '',
  button_text: '',
  button_url: '',
  background_images: [],
});
const imagePreviews = ref<string[]>([]);

const titleRules = [
  (v: string) => !!v || 'Title is required',
  (v: string) => v.length <= 50 || 'Title must be less than 80 characters',
];

const button_urlRules = [
  (v: string) => !!v || 'Button Url is required',
  (v: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'Button Url  must be a valid format',
];
const Order_ByRules = [
  (v: string) => !!v || 'Order By is required',
  (v: string) => Number.isInteger(Number(v)) || 'Order By must be an integer',
];
const button_textRules = [
  (v: string) => !!v || 'Button Text is required',
  (v: string) => v.length <= 50 || 'Button Text must be less than 80 characters',
];

const subtitleRules = [
  (v: string) => !!v || 'Subtitle is required',
  (v: string) => v.length <= 100 || 'Subtitle must be less than 100 characters',
];

const background_imagesRules = [
  (v: File[]) => v.length > 0 || 'At least one image is required',
];

const previewImages = () => {
  imagePreviews.value = [];
  if (form.value.background_images) {
    Array.from(form.value.background_images).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          imagePreviews.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('subtitle', form.value.subtitle);
    formData.append('Order_By', form.value.Order_By);
    formData.append('button_text', form.value.button_text);
    formData.append('button_url', form.value.button_url);
    form.value.background_images.forEach((background_image: File) => {
      formData.append('background_images', background_image);
    });

    const response = await axiosInstance.post('/banners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Form submitted successfully:', response.data);
    resetForm();
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const resetForm = () => {
  form.value = {
    title: '',
    subtitle: '',
    Order_By: '',
    button_text: '',
    button_url: '',
    background_images: [],
  };
  formRef.value.resetValidation();
  imagePreviews.value = [];
};
</script>