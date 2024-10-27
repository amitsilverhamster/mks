<template>
  <footer>
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-6 col-md-2 col-lg-2">
            <h4 class="pb-2 text-start">About US</h4>
            <p class="text-dark text-start">We are an EPC-based
              organization that provides
              engineering services from
              feasibility studies to designing
              the world's most advanced
              industrial engineering</p>
          </div>
          <div class="col-6 col-md-2 col-lg-2">
            <h4 class="text-dark pb-2 text-start">Quick Links</h4>
            <ul class="text-dark list-unstyled text-start">
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Home</span>
              </li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>About
                  us</span></li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Products</span>
              </li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Projects</span>
              </li>
            </ul>
          </div>
          <div class="col-6 col-md-2 col-lg-2">
            <h4 class=" pb-2 text-start">Products</h4>
            <ul class="text-dark list-unstyled text-start">
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Dryers</span>
              </li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Evaporators</span>
              </li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Heat
                  Exchanger</span></li>
            </ul>
          </div>
          <div class="col-6 col-md-2 col-lg-2">
            <h4 class=" pb-2 text-start">Projects</h4>
            <ul class="text-dark list-unstyled text-start">
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>ZLD
                  Plant</span></li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Strach
                  Plant</span></li>
              <li class="py-1"><i
                  class="fa-solid fa-greater-than  text-light bg-dark rounded-circle  me-2 greater-icon "></i><span>Fructose
                  Plant</span></li>
            </ul>
          </div>
          <div class="col-12 col-md-3 col-lg-3">
            <h4 class=" pb-2 text-start">Contact Us</h4>
            <ul class="list-unstyled text-dark text-start">

              <li class="d-flex align-items-center py-2"><i class="fas fa-phone-alt me-3"></i> <span>
                  +91 93501-40037</span></li>
              <li class="d-flex align-items-center py-2"><i class="fas fa-envelope me-3"></i>
                <span> Sales@mksindustrialsolutions.com</span>
              </li>
              <li class="d-flex align-items-center py-2"><i class="fas fa-map-marker-alt me-3"></i>
                <span>
                  Manana Road Samalkha, Panipat, Haryana,
                  India, 132103</span>
              </li>
            </ul>
            <div class="social-media-icons">
              <a href="https://www.facebook.com" class="px-3 my-2 rounded" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com" class="px-3 my-2  rounded" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com" class="px-3 my-2  rounded" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" class="px-3 my-2  rounded" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  </footer>

</template>

<script lang="ts" setup>
//
</script>

<style scoped>
.social-media-icons {
  display: flex;
  gap: 10px;
}

h4 {
  color: #1B326A;
}
.social-media-icons a {
  border: 1px solid #0073e6;
  background-color: #0073e6;
  color: #fff;
  font-size: 24px;
  text-decoration: none;
}

.social-media-icons a:hover {
  color: #000 !important;
}

.greater-icon {

  padding: 5px;
  font-size: 10px;
}

footer {
  background-color: #ffffff;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  width: 100%;
  bottom: 0;
}
</style>