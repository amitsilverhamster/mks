<template>
    <section>
        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button v-for="(item, index) in sortedCarouselItems" :key="index" type="button" :data-bs-target="'#carouselExampleCaptions'" :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : undefined" :aria-label="'Slide ' + (index + 1)"></button>
            </div>
            <div class="carousel-inner">
                <div v-for="(item, index) in sortedCarouselItems" :key="index" :class="['carousel-item', { active: index === 0 }]">
                    <img :src="item.image" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <transition name="fade">
                            <h3 class="fw-bolder">{{ item.title }}</h3>
                        </transition>
                        <transition name="fade">
                            <p class="fw-bold">{{ item.subtitle }}</p>
                        </transition>
                        <transition name="fade">
                            <a :href="item.buttonUrl" class="btn btn-outline-light">{{ item.buttonText }}</a>
                        </transition>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axiosInstance from '@plugins/axios';

const baseUrl = 'http://localhost:3001/uploads/';

const carouselItems = ref([]);

const fetchBanners = async () => {
    try {
        const response = await axiosInstance.get('/banners');
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
            carouselItems.value = response.data.data.map((item, index) => ({
                image: baseUrl + item.default_image,
                title: item.title,
                subtitle: item.subtitle,
                buttonText: item.button_text,
                buttonUrl: item.button_url,
                order: index + 1 // Assuming the order is based on the index
            }));
        } else {
            console.error('Unexpected response format:', response.data);
        }
    } catch (error) {
        console.error('Error fetching banners:', error);
    }
};

onMounted(() => {
    fetchBanners();
});

const sortedCarouselItems = computed(() => {
    return carouselItems.value.slice().sort((a, b) => a.order - b.order);
});
</script>

<style scoped>
.carousel-caption {
    bottom: 13.25rem !important;
}
.carousel-indicators [data-bs-target] {
    box-sizing: content-box !important;
    flex: 0 1 auto !important;
    width: 10px !important; /* Adjust size to create a circle */
    height: 10px !important;
    padding: 0 !important;
    margin-right: 3px !important;
    margin-left: 3px !important;
    text-indent: -999px !important;
    cursor: pointer !important;
    background-color: #000 !important;
    background-clip: padding-box !important;
    border: 0 !important;
    border-radius: 50% !important; /* Makes the indicator circular */
    opacity: 0.5 !important;
    transition: opacity 0.6s ease !important; ;
}

.carousel-indicators .active {
    opacity: 1 !important; /* Increases opacity for the active dot */
    background-color: #ffffff !important; /* Optional: Active dot color */
}

.fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
}
</style>