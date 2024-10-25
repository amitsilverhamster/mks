<template>
    <v-container>
        <v-data-table :headers="headers" :items="items" :search="search" :loading="loading">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Banners</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                        hide-details></v-text-field>
                    <v-btn color="primary" :to="{ name: 'AdminBannerCreate' }">Create Banner</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn icon @click="editBanner(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteProduct(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '@plugins/axios'
const headers = ref([
    { title: 'Title', value: 'title' },
    { title: 'Subtitle ', value: 'subtitle' },
    { title: "button_text", value: "button_text" },
    { title: "button_url", value: "button_url" },
    { title: ' Order_By', value: 'Order_By' },
    { title: 'Actions', value: 'actions', sortable: false },
]);

const loading = ref(false);
const router = useRouter();
const items = ref([]);

const search = ref('');

const getBanner = () => {
    loading.value = true;
    axiosInstance.get('banners')
        .then(response => {
            loading.value = false;
            items.value = response.data.data;
        })
        .catch(error => {
            loading.value = false;
            console.log(error);
        });
}
const editBanner = (item) => {
    // Navigate to the edit page with the product ID
    // Assuming you have a route named 'AdminBannerEdit' that takes an 'id' parameter
    router.push({ name: 'AdminBannerEdit', params: { id: item.id } });
};

const deleteProduct = (item) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        axiosInstance.delete(`banners/${item.id}`)
            .then(() => {
                getBanner(); // Refresh the product list
            })
            .catch(error => {
                console.log(error);
            });
    }
};

onMounted(getBanner);
</script>