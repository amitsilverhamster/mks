<template>
    <section class="projects py-5">
        <div class="container">
            <div class="text-center py-5">
                <h2 class="fs-1">Our Projects</h2>
            </div>
            <div class="row">
                <div v-for="(project, index) in projects" :key="index" class="col-12 col-md-4 col-lg-4 text-light">
                    <div>
                        <img :src="project.image" class="img-fluid" :alt="project.title">
                    </div>
                    <div class="pt-4 ps-5">
                        <h4 class="fw-bold">{{ project.title }}</h4>
                        <p>{{ project.description }}</p>
                    </div>
                </div>
            </div>
            <div class="text-center py-5">
                <button type="button" class="btn btn-color rounded-1 fw-bold mt-5">Learn More</button>
            </div>
        </div>
    </section>
</template>

<script setup>
const projects = [
    {
        title: 'ZLD Plant',
        description: 'The Ring Dryer is a special development of the Flash Dryer Incorporating an internal airborne recycle For greatly improved operation',
        image: 'src/assets/Blue Modern A sweet Ending To A New Beginning Wedding Tag (4).png'
    },
    {
        title: 'Fructose Plant',
        description: 'MKS Industrial Solutions is a leading Rice-based and Maize Based fructose Plant manufacturer in India ( F42, F55, F90, Fructose)',
        image: 'src/assets/Blue Modern A sweet Ending To A New Beginning Wedding Tag (5)_1.png'
    },
    {
        title: 'Starch Plant',
        description: 'At MKS Industrial Solutions, we offer specialized engineering and turkey solutions for starch and derivative production plants.',
        image: 'src/assets/Blue Modern A sweet Ending To A New Beginning Wedding Tag (6).png'
    }
];
</script>

<style scoped>
.projects {
    background-color: #1B326A;
}

.projects img {
    border-radius: 0px 61px;
    box-shadow: #00000091 3px 9px 10px 0px;
}

.btn-color {
    background-color: #ffff;
    color: #1B326A;
}

h2 {
    color: #ffff;
}
</style>