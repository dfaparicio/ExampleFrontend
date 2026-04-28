<template>
  <q-page class="historial-page">

    <!-- Header -->
    <q-header class="sena-header">
      <q-toolbar>
        <img :src="LogoBlanco" alt="SENA" class="home-logo" />
        <q-space />
        <q-btn flat round dense icon="logout" class="text-white" @click="onLogout" />
      </q-toolbar>
    </q-header>

    <!-- Contenido principal -->
    <div class="page-content">

      <!-- Título -->
      <div class="title-wrapper">
        <h1 class="page-title">REGISTRO DE SOLICITUDES</h1>
        <div class="title-line"></div>
      </div>

      <q-tabs v-model="activeTab" class="sena-tabs" active-color="white" active-bg-color="green-8"
        indicator-color="transparent" align="justify" dense narrow>

        <q-tab name="catalogo" class="sena-tab">
          <div class="tab-inner">
            <q-icon name="inventory" size="22px" />
            <span class="tab-label"> CATÁLOGO DE FORMACIÓN COMPLEMENTARIA </span>
          </div>
        </q-tab>

        <q-tab name="solicitud" class="sena-tab">
          <div class="tab-inner">
            <q-icon name="assignment" size="22px" />
            <span class="tab-label">SOLICITAR INSCRIPCIÓN</span>
          </div>
        </q-tab>

        <q-tab name="historial" class="sena-tab">
          <div class="tab-inner">
            <q-icon name="history" size="22px" />
            <span class="tab-label">GESTIÓN DE SOLICITUDES</span>
          </div>
        </q-tab>
      </q-tabs>

      <!-- Paneles de contenido de los tabs -->
      <q-tab-panels v-model="activeTab" animated class="tab-panels">


        <!-- Panel: catalogo DE MEJORAMIENTO -->
        <q-tab-panel name="catalogo" class="panel-content">
          <ComplementaryCatalogo @select-course="handleCourseSelection" />
        </q-tab-panel>

        <!-- Panel: solicitud -->
        <q-tab-panel name="solicitud" class="panel-content">
          <ApplicationRegistration ref="registrationForm" />
        </q-tab-panel>

        <!-- Panel: historial -->
        <q-tab-panel name="historial" class="panel-content">
          <div class="pending-box">Pendiente por agregar elementos</div>
        </q-tab-panel>

      </q-tab-panels>
    </div>

    <!-- Footer -->
    <q-footer class="sena-footer">
      <div class="footer-text">
        REPFORA - SENA 2026 © Todos los derechos reservados
      </div>
    </q-footer>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoBlanco from '../assets/LogoBlanco.png'
import ApplicationRegistration from '../components/ApplicationRegistration.vue'
import ComplementaryCatalogo from '../components/ComplementaryCatalogo.vue'

const router = useRouter()

const activeTab = ref('catalogo')
const registrationForm = ref(null)
const searchQuery = ref('')
const filterFicha = ref(null)
const filterPrograma = ref(null)
const filterEstado = ref(null)

function onLogout() {
  router.push('/login')
}

function handleCourseSelection(courseData) {
  console.log('Curso recibido en Register.vue:', courseData.PRF_DENOMINACION)
  activeTab.value = 'solicitud'
  
  // Pequeño delay para asegurar que el componente se monte/actualice antes de llamar a su función
  setTimeout(() => {
    if (registrationForm.value && registrationForm.value.fillFromCatalogo) {
      registrationForm.value.fillFromCatalogo(courseData)
    } else {
      console.error('No se pudo encontrar la referencia al formulario de registro')
    }
  }, 100)
}
</script>

<style scoped>
/* Layout principal de la página */
.historial-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 20px 0px 20px;
}

/* Header */
.sena-header {
  background-color: var(--color_header) !important;
  padding: 10px 0 10px 0;
}

.home-logo {
  height: 45px;
}

/* Título y botón volver */
.title-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
}


.title-wrapper {
  width: 100%;
  text-align: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color_button_closed);
  margin: 0;
  line-height: 1.2;
}

/* Línea verde */
.title-line {
  width: 85%;
  height: 3px;
  background-color: #2e7d32;
  margin: 7px auto 0;
}

/* Tabs (solicitud / catalogo / historial) */
.sena-tabs {
  padding-top: 30px;
  width: 100%;
}

:deep(.sena-tabs .q-tabs__content) {
  width: 100%;
  display: flex;
}

:deep(.sena-tabs .q-tab) {
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  padding: 12px 8px;
}

.sena-tab {
  color: var(--color_header) !important;
  font-weight: 600;
  font-size: 0.78rem;
  width: 100% !important;
}

:deep(.q-tab--active) {
  background-color: var(--color_header) !important;
  color: var(--color_text_card) !important;
}

:deep(.q-tab--active .q-icon) {
  color: var(--color_text_card) !important;
}

.tab-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  width: 100%;
}

.tab-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Contenedor de filtros y búsqueda */
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0 20px 0;
  gap: 12px;
  flex-wrap: wrap;
}

/* Filtros a la izquierda */
.filters-left {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-select {
  width: 130px;
}

/* Input de búsqueda a la derecha */
.search-input {
  width: 250px;
}

/* Labels más pequeños en filtros */
:deep(.filter-select .q-field__label) {
  font-size: 0.7rem;
}

:deep(.filter-select .q-field__native) {
  font-size: 0.8rem;
}

/* Paneles de contenido de tabs */
.tab-panels {
  background: transparent !important;
}

.panel-content {
  padding: 0 !important;
}

/* Caja de pendiente */
.pending-box {
  background-color: var(--color_tooltip);
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: var(--color_button_closed);
  font-size: 1.1rem;
  font-weight: 500;
}

/* Filtros (radios y select) */
.filters-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 24px;
}

.ficha-select {
  min-width: 260px;
}

/* Tablas */
.sena-table {
  background: white;
  border-radius: 6px;
}

:deep(.sena-table .q-table__top),
:deep(.sena-table thead tr th) {
  font-weight: 700;
  font-size: 0.78rem;
  color: var(--color_button_closed);
  background-color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

:deep(.sena-table tbody tr:hover) {
  background-color: rgba(46, 125, 50, 0.08);
}

/* Footer */
.sena-footer {
  background-color: var(--color_tooltip) !important;
  text-align: center;
}

.footer-text {
  color: var(--color_button_closed);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 12px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .page-content {
    padding: 16px;
  }

  .page-title {
    font-size: 1.4rem;
  }

  .title-line {
    width: 95%;
  }

  .sena-tabs {
    padding-top: 20px;
  }

  .tab-label {
    font-size: 0.65rem;
    letter-spacing: 0.3px;
  }

  :deep(.sena-tabs .q-tab) {
    padding: 10px 4px;
  }

  .tab-inner {
    gap: 3px;
  }

  .filters-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .ficha-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .tab-label {
    font-size: 0.6rem;
  }

  :deep(.sena-tabs .q-tab .q-icon) {
    font-size: 18px !important;
  }

  .tab-inner {
    padding: 6px 2px;
  }
}
</style>