<template>
  <form ref="dropzoneForm" class="dropzone" id="my-dropzone">
    <div class="dz-message">
      Drag and drop files here or click to upload.
    </div>
  </form>
</template>

<script lang="ts">
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "FileUploader",
  emits: ['updateFiles'], // Standard way to define emitted events
  setup(props, { emit }) {
    const dropzoneForm = ref<HTMLFormElement | null>(null);

    onMounted(() => {
      if (dropzoneForm.value) {
        const myDropzone = new Dropzone(dropzoneForm.value, {
          url: "/file/upload", // Adjust your upload URL here
          autoProcessQueue: false, // Manual processing
          maxFilesize: 2, // Max file size in MB
          acceptedFiles: ".jpg,.jpeg,.png,.pdf", // File types
        });

        myDropzone.on("addedfile", (file: File) => {
          console.log(`File added: ${file.name}`);
        });

        // Emit files to parent component
        myDropzone.on("queuecomplete", () => {
          emit('updateFiles', myDropzone.getAcceptedFiles());
        });
      }
    });

    return {
      dropzoneForm,
    };
  },
});
</script>

<style scoped>
.dropzone {
  border: 2px dashed #007bff;
  padding: 20px;
  text-align: center;
}
</style>
