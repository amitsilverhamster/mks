<template>
    <v-sheet class="mx-auto" theme="light" color="white">
        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">

                <v-card class="mx-4" color="grey-lighten-1" height="200" width="325">
                    <v-img src="../../../assets/bakery-ingredients (4).jpg" cover :aspect-ratio="1"></v-img>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>

        <v-expand-transition>
            <v-sheet v-if="model != null" height="200">
                <div class="d-flex fill-height align-center justify-center">
                    <h3 class="text-h6">
                        Selected {{ model }}
                    </h3>
                </div>
            </v-sheet>
        </v-expand-transition>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        model: null,
    }),
}
</script>