<template>

                    <div class="bg-white p-4 rounded">
                        <form class="container">
                            <div class="pb-5">
                                <h4 class="text-dark text-center">Send Us a message</h4>
                                <p class="text-dark py-3">Please fill out the form below and we will get back to
                                    you as soon as possible.</p>
                            </div>
                            <div class="py-3">
                                <input type="text" class="form-control" id="exampleInputName"
                                    aria-describedby="nameHelp" placeholder="Name">
                            </div>
                            <div class="py-3">
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Email">
                            </div>
                            <div class="py-3">
                                <input type="test" class="form-control" id="exampleInputSubject"
                                    aria-describedby="SubjectHelp" placeholder="Subject">
                            </div>
                            <div class="py-3">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                    placeholder="Message"></textarea>
                            </div>

                            <button type="submit" class="btn from-btn-color text-light rounded-1 mt-3">Send Message</button>
                        </form>
                    </div>

               
</template>
<script setup>
</script>
<style scoped>
.from-btn-color {
    background-color: #045DA1;
    color: #fff;
}
</style>