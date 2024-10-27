<template>
    <div class="bg-white p-4 rounded">
        <form class="container" @submit.prevent="handleSubmit">
            <div class="pb-5">
                <h4 class="text-dark text-center">Send Us a message</h4>
                <p class="text-dark py-3">Please fill out the form below and we will get back to
                    you as soon as possible.</p>
            </div>
            <div class="py-3">
                <input type="text" class="form-control" id="exampleInputName" v-model="name"
                    aria-describedby="nameHelp" placeholder="Name">
            </div>
            <div class="py-3">
                <input type="email" class="form-control" id="exampleInputEmail1" v-model="email"
                    aria-describedby="emailHelp" placeholder="Email">
            </div>
            <div class="py-3">
                <input type="text" class="form-control" id="exampleInputSubject" v-model="subject"
                    aria-describedby="SubjectHelp" placeholder="Subject">
            </div>
            <div class="py-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" v-model="message" rows="3"
                    placeholder="Message"></textarea>
            </div>
            <button type="submit" class="btn from-btn-color text-light rounded-1 mt-3">Send Message</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '@plugins/axios';

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const handleSubmit = async () => {
    try {
        const response = await axiosInstance.post('/mailer/send-email', {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        });
        console.log('Email sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
</script>

<style scoped>
.from-btn-color {
    background-color: #045DA1;
    color: #fff;
}
</style>