<template>
  <div class="home-card-wrapper">
    <q-card>
      <q-card-section class="home-card-header">
        <span class="text-weight-bold style-text">{{ title }}</span>
      </q-card-section>

      <q-card-section class="home-card-body">
        <div class="home-card-image">
          <img :src="image" alt="SENA" />
        </div>
        <q-separator color="grey-4" style="height: 2px;" />
        <div class="home-card-button">
          <q-btn
            unelevated
            label="VER"
            class="style-btn"
            @click.stop="onClick"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import Logo from '../assets/Logo.png'

defineProps({
  title: {
    type: String,
    required: true
  },
  onClick: {
    type: Function,
    required: true
  },
  image: {
    type: String,
    default: Logo
  }
})
</script>

<style scoped>
.home-card-wrapper {
  width: 350px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}


.home-card-header {
  background-color: var(--color_card);
  color: var(--color_text_card);
  text-align: center;
  padding: 16px 20px;
  font-size: 18px;
}

.home-card-body {
  padding: 0;
}

.home-card-image {
  display: flex;
  justify-content: center;
  padding: 40px 0 40px 0;
}

.home-card-image img {
  height: 100px;
}

.home-card-button {
  display: flex;
  justify-content: center;
  padding: 20px 0 20px 0;
}

.style-btn {
  width: 160px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
}
</style>