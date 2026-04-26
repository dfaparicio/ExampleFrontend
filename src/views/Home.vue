<template>
  <q-page>
    <q-header class="home-header">
      <q-toolbar>
        <img :src="LogoBlanco" alt="SENA" class="home-logo" />
        <q-space />
        <q-btn flat round dense icon="logout" @click="onLogout" class="text-white" />
      </q-toolbar>
    </q-header>

    <div class="home">
      <div class="home-body">
        <h1 class="home-title">
          NOVEDADES Y REPORTES
        </h1>

        <div class="row justify-center home-cards-container">
          <HomeCard title="Novedades" :onClick="() => router.push('/novedades')" />
          <HomeCard title="Consultar Programación" :onClick="() => router.push('/programacion')" />
          <HomeCard title="Registro Complementarias" :onClick="() => router.push('/login')" />
        </div>
      </div>
    </div>

    <q-footer class="home-footer">
      <div class="home-footer-text">
        REPFORA - SENA 2026 © Todos los derechos reservados
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LogoBlanco from '../assets/LogoBlanco.png'
import HomeCard from '../components/HomeCard.vue'

const router = useRouter()

function onLogout() {
  router.push('/login')
}
</script>

<style scoped>
.home-header {
  background-color: var(--color_header);
  padding: 10px 0 10px 0;
}

.home-logo {
  height: 45px;
}

.home{
  padding: 120px;
}

.home-cards-container {
  gap: 40px;
}

.home-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--color_button_closed);
  margin: 0 0 50px 0;
  text-transform: uppercase;
  line-height: 1.2;
}

.home-footer {
  background-color: var(--color_tooltip);
  color: var(--color_button_closed);
  padding: 12px 0;
  height: 50px;
}

.home-footer-text {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color_button_closed);
}
</style>