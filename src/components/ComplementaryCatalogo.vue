<template>
  <q-page class="q-page">
    <!-- Barra de búsqueda -->
    <div class="search-wrapper">
      <div class="search-bar">
        <div class="search-section">
          <q-icon name="emoji_objects" class="section-icon" />
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre del programa, área o código..."
            class="search-input" />
        </div>
        <button class="search-btn" @click="onSearch">
          <q-icon name="search" class="search-btn-icon" />
        </button>
      </div>
    </div>

    <!-- Layout: Sidebar + Resultados -->
    <div class="main-layout">
      <div class="sidebar-container">
        <q-card flat bordered class="filter-section">
          <q-card-section class="bg-green-9 q-py-md">
            <div class="text-white text-center text-weight-bold text-subtitle1">
              FILTROS DE BÚSQUEDA
            </div>
          </q-card-section>

          <q-card-section class="q-pa-md">
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">MODALIDAD</div>
              <q-list dense>
                <q-item v-for="m in modalidades" :key="m.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox v-model="selected.modalidad" :val="m.value" color="green-9" dense />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ m.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge :class="selected.modalidad.includes(m.value) ? 'bg-green-10 text-white' : 'bg-grey-4'">
                      {{ m.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">LÍNEA TECNOLÓGICA</div>
              <q-list dense>
                <q-item v-for="l in lineas" :key="l.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox v-model="selected.linea" :val="l.value" color="green-9" dense />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="customEvents">{{ l.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge :class="selected.linea.includes(l.value) ? 'bg-green-10 text-white' : 'bg-grey-4'">
                      {{ l.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">RED DE CONOCIMIENTO</div>
              <q-list dense>
                <q-item v-for="r in redes" :key="r.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox v-model="selected.red" :val="r.value" color="green-9" dense />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="customEvents">{{ r.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge :class="selected.red.includes(r.value) ? 'bg-green-10 text-white' : 'bg-grey-4'">
                      {{ r.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">APUESTAS PRIORITARIAS</div>
              <q-list dense>
                <q-item v-for="a in apuestas" :key="a.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox v-model="selected.apuesta" :val="a.value" color="green-9" dense />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="customEvents">{{ a.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge :class="selected.apuesta.includes(a.value) ? 'bg-green-10 text-white' : 'bg-grey-4'">
                      {{ a.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">DURACIÓN (HORAS)</div>
              <div class="row q-gutter-sm items-center">
                <div class="col">
                  <q-input outlined dense v-model.number="selected.durMin" type="number" label="Mín" color="green-9"
                    min="0" />
                </div>
                <div class="text-grey-7 text-weight-bold">—</div>
                <div class="col">
                  <q-input outlined dense v-model.number="selected.durMax" type="number" label="Máx" color="green-9"
                    min="0" />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-md">
            <q-btn outline color="green-9" label="Limpiar" @click="clearFilters" class="full-width" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="results-container">
        <q-card flat bordered>
          <q-card-section class="q-pa-md">
            <div class="row justify-between items-center q-mb-md">
              <div>
                <div class="text-h6 text-weight-bold text-green-9">Resultados de búsqueda</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  {{ filteredCourses.length }} programa(s) encontrado(s)
                </div>
              </div>
              <q-select outlined dense v-model="sortBy" :options="sortOptions" label="Ordenar por" color="green-9"
                emit-value map-options style="min-width: 200px" />
            </div>

            <div v-if="activeChips.length" class="q-mb-md">
              <q-chip v-for="chip in activeChips" :key="chip.key + chip.value" class="bg-green-10 text-white" removable
                @remove="removeChip(chip)">
                {{ chip.label }}
              </q-chip>
            </div>

            <div class="results-scroll-container">
              <div v-if="loading" class="text-center q-pa-xl">
                <q-spinner size="50px" color="green-9" />
                <div class="text-h6 text-grey-6 q-mt-md">Cargando programas...</div>
              </div>

              <div v-else-if="paginatedCourses.length" class="courses-list">
                <q-card v-for="course in paginatedCourses" :key="course.COD_VER" flat bordered
                  class="course-card q-mb-sm">
                  <q-card-section class="q-pa-md">
                    <div class="row justify-between items-center">
                      <div class="col">
                        <div class="row items-center q-mb-sm">
                          <div class="text-subtitle1 text-weight-bold course-title">
                            {{ course.PRF_DENOMINACION || 'Sin nombre' }}
                          </div>
                          <span class="modalidad-badge q-ml-sm" :class="{ 'badge-presencial': course.MODALIDAD === 'Presencial', 'badge-virtual': course.MODALIDAD === 'Virtual', 'badge-mixto': course.MODALIDAD === 'Virtual/Presencial' }">
                            {{ course.MODALIDAD || 'N/A' }}
                          </span>
                        </div>
                        <div class="row q-gutter-md items-center text-body2 text-grey-7">
                          <div class="flex items-center q-gutter-xs">
                            <q-icon name="school" size="16px" color="green-9" />
                            <span>{{ course.TIPO_DE_FORMACION || 'Sin nivel' }}</span>
                          </div>
                          <div class="text-grey-5">|</div>
                          <div class="flex items-center q-gutter-xs">
                            <q-icon name="analytics" size="16px" color="green-9" />
                            <span>{{ course.PRF_DURACION_MAXIMA }} horas</span>
                          </div>
                          <div class="text-grey-5">|</div>
                          <div class="flex items-center q-gutter-xs">
                            <q-icon name="category" size="16px" color="green-9" />
                            <span>{{ course.RED_DE_CONOCIMIENTO || 'Sin red' }}</span>
                          </div>
                        </div>
                      </div>
                      <q-btn round color="green-9" size="md" icon="arrow_forward" @click="abrirModal(course)" />
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div v-else class="text-center q-pa-xl">
                <q-icon name="search_off" size="64px" color="grey-4" />
                <div class="text-h6 text-grey-6 q-mt-md">No se encontraron programas con los filtros seleccionados.</div>
              </div>
            </div>

            <div v-if="totalPages > 1" class="pagination-container q-mt-lg flex justify-center">
              <q-pagination v-model="currentPage" :max="totalPages" :max-pages="5" color="green-9"
                active-color="green-9" text-color="black" active-text-color="white" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de detalles -->
    <q-dialog v-model="showModal" persistent>
      <q-card class="modal-card">
        <q-card-section class="bg-green-9 text-white q-pa-md">
          <div class="row items-center justify-between">
            <div class="text-subtitle1 text-weight-bold">{{ selectedCourse?.PRF_DENOMINACION }}</div>
            <q-btn flat round dense color="white" icon="close" @click="cerrarModal" />
          </div>
        </q-card-section>

        <q-card-section class="modal-content">
          <div class="column q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <div class="info-section q-mb-lg">
                <div class="text-subtitle2 text-green-9 text-weight-bold q-mb-md">Información General</div>
                <div class="info-item q-mb-sm">
                  <q-icon name="badge" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Código:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.COD_VER }}</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="location_city" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Modalidad:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.MODALIDAD }}</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="schedule" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Duración:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.PRF_DURACION_MAXIMA }} horas</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="school" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Tipo de formación:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.TIPO_DE_FORMACION }}</span>
                </div>
                <div v-if="selectedCourse?.PRF_EDAD_MIN_REQUERIDA" class="info-item q-mb-sm">
                  <q-icon name="person" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Edad mínima:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.PRF_EDAD_MIN_REQUERIDA }} años</span>
                </div>
              </div>

              <div class="info-section q-mb-lg">
                <div class="text-subtitle2 text-green-9 text-weight-bold q-mb-md">Clasificación</div>
                <div class="info-item q-mb-sm">
                  <q-icon name="category" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Línea tecnológica:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.LINEA_TECNOLOGICA }}</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="hub" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Red tecnológica:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.RED_TECNOLOGICA }}</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="science" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Red de conocimiento:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.RED_DE_CONOCIMIENTO }}</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="star" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Apuesta prioritaria:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.APUESTAS_PRIORITARIAS }}</span>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div v-if="selectedCourse?.PRF_DESCRIPCION_REQUISITO" class="info-section q-mb-lg">
                <div class="text-subtitle2 text-green-9 text-weight-bold q-mb-md">Requisitos</div>
                <div class="info-content text-body2 text-grey-7">
                  {{ selectedCourse?.PRF_DESCRIPCION_REQUISITO }}
                </div>
              </div>

              <div class="info-section q-mb-lg">
                <div class="text-subtitle2 text-green-9 text-weight-bold q-mb-md">Información Adicional</div>
                <div v-if="selectedCourse?.PRF_RESOLUCION" class="info-item q-mb-sm">
                  <q-icon name="description" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Resolución:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.PRF_RESOLUCION }}</span>
                </div>
                <div v-if="selectedCourse?.PRF_FECHA_RESOLUCION" class="info-item q-mb-sm">
                  <q-icon name="calendar_today" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Fecha resolución:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.PRF_FECHA_RESOLUCION }}</span>
                </div>
                <div v-if="selectedCourse?.PRF_FCH_REGISTRO" class="info-item q-mb-sm">
                  <q-icon name="event" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Fecha registro:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.PRF_FCH_REGISTRO }}</span>
                </div>
                <div v-if="selectedCourse?.FECHA_ACTIVO_EN_EJECUCION" class="info-item q-mb-sm">
                  <q-icon name="play_circle" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Inicio ejecución:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.FECHA_ACTIVO_EN_EJECUCION }}</span>
                </div>
                <div class="info-item q-mb-sm">
                  <q-icon name="verified" color="green-9" class="q-mr-sm" />
                  <span class="text-weight-bold">Apoyo FIC:</span>
                  <span class="q-ml-sm">{{ selectedCourse?.FIC === 'SI' ? 'Sí' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="bg-grey-2 q-pa-md q-gutter-sm">
          <q-btn outline color="grey-7" label="Cerrar" class="col" @click="cerrarModal" />
          <q-btn color="green-9" label="Seleccionar Programa" class="col-8" icon="check_circle" @click="seleccionarCurso" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <button class="scroll-to-top-btn" @click="scrollToTop" aria-label="Volver arriba">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L12 20M12 4L5 11M12 4L19 11" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Subir</span>
    </button>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['select-course'])

const allCourses = ref([])
const loading = ref(true)

const loadCatalogo = async () => {
  loading.value = true
  try {
    const response = await fetch('/catalogo.json?t=' + Date.now(), {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    const catalogo = await response.json()
    allCourses.value = catalogo
  } catch (error) {
    console.error('Error cargando catálogo:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadCatalogo()
})

const searchQuery = ref('')
const sortBy = ref('nombre')
const currentPage = ref(1)
const PER_PAGE = 15
const showModal = ref(false)
const selectedCourse = ref(null)

const selected = ref({
  modalidad: [],
  linea: [],
  red: [],
  apuesta: [],
  durMin: null,
  durMax: null
})

const sortOptions = [
  { label: 'Nombre (A-Z)', value: 'nombre' },
  { label: 'Horas: menor a mayor', value: 'horas_asc' },
  { label: 'Horas: mayor a menor', value: 'horas_desc' }
]

const countBy = (campo, valor) => {
  if (!allCourses.value?.length) return 0
  return allCourses.value.filter(c => c[campo] === valor).length
}

const crearOpcionesFiltro = (campo) => {
  if (!allCourses.value?.length) return []
  const valoresUnicos = [...new Set(allCourses.value.map(c => c[campo]).filter(Boolean))]
  return valoresUnicos.map(v => ({
    value: v,
    label: v.length > 40 ? v.slice(0, 38) + '…' : v,
    count: countBy(campo, v)
  }))
}

const modalidades = computed(() => [
  { value: 'Presencial', label: 'Presencial', count: countBy('MODALIDAD', 'Presencial') },
  { value: 'Virtual', label: 'Virtual', count: countBy('MODALIDAD', 'Virtual') },
  { value: 'Virtual/Presencial', label: 'Virtual/Presencial', count: countBy('MODALIDAD', 'Virtual/Presencial') },
])

const lineas = computed(() => crearOpcionesFiltro('LINEA_TECNOLOGICA'))
const redes = computed(() => crearOpcionesFiltro('RED_DE_CONOCIMIENTO'))
const apuestas = computed(() => crearOpcionesFiltro('APUESTAS_PRIORITARIAS'))

const filteredCourses = computed(() => {
  if (!allCourses.value?.length) return []
  let resultado = allCourses.value

  if (searchQuery.value?.trim()) {
    const texto = searchQuery.value.toLowerCase()
    resultado = resultado.filter(c =>
      (c.PRF_DENOMINACION || '').toLowerCase().includes(texto) ||
      (c.RED_DE_CONOCIMIENTO || '').toLowerCase().includes(texto) ||
      (c.LINEA_TECNOLOGICA || '').toLowerCase().includes(texto)
    )
  }

  if (selected.value?.modalidad?.length > 0) {
    resultado = resultado.filter(c => selected.value.modalidad.includes(c.MODALIDAD))
  }

  if (selected.value?.linea?.length > 0) {
    resultado = resultado.filter(c => selected.value.linea.includes(c.LINEA_TECNOLOGICA))
  }

  if (selected.value?.red?.length > 0) {
    resultado = resultado.filter(c => selected.value.red.includes(c.RED_DE_CONOCIMIENTO))
  }

  if (selected.value?.apuesta?.length > 0) {
    resultado = resultado.filter(c => selected.value.apuesta.includes(c.APUESTAS_PRIORITARIAS))
  }

  if (selected.value?.durMin != null && selected.value.durMin !== '') {
    resultado = resultado.filter(c => c.PRF_DURACION_MAXIMA >= selected.value.durMin)
  }

  if (selected.value?.durMax != null && selected.value.durMax !== '') {
    resultado = resultado.filter(c => c.PRF_DURACION_MAXIMA <= selected.value.durMax)
  }

  if (sortBy.value === 'nombre') {
    resultado = [...resultado].sort((a, b) => {
      const nombreA = a.PRF_DENOMINACION || ''
      const nombreB = b.PRF_DENOMINACION || ''
      return nombreA.localeCompare(nombreB)
    })
  } else if (sortBy.value === 'horas_asc') {
    resultado = [...resultado].sort((a, b) => a.PRF_DURACION_MAXIMA - b.PRF_DURACION_MAXIMA)
  } else if (sortBy.value === 'horas_desc') {
    resultado = [...resultado].sort((a, b) => b.PRF_DURACION_MAXIMA - a.PRF_DURACION_MAXIMA)
  }

  return resultado
})

const totalPages = computed(() => {
  if (!filteredCourses.value) return 0
  return Math.ceil(filteredCourses.value.length / PER_PAGE)
})

const paginatedCourses = computed(() => {
  if (!filteredCourses.value) return []
  const inicio = (currentPage.value - 1) * PER_PAGE
  const fin = inicio + PER_PAGE
  return filteredCourses.value.slice(inicio, fin)
})

const clearFilters = () => {
  selected.value = {
    modalidad: [],
    linea: [],
    red: [],
    apuesta: [],
    durMin: null,
    durMax: null
  }
  searchQuery.value = ''
  currentPage.value = 1
}

const abrirModal = (curso) => {
  selectedCourse.value = curso
  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
  selectedCourse.value = null
}

const seleccionarCurso = () => {
  if (selectedCourse.value) {
    emit('select-course', { ...selectedCourse.value })
    cerrarModal()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const activeChips = computed(() => {
  const chips = []
  if (selected.value?.modalidad) {
    selected.value.modalidad.forEach(v => chips.push({ key: 'modalidad', value: v, label: 'Modalidad: ' + v }))
  }
  if (selected.value?.linea) {
    selected.value.linea.forEach(v => chips.push({ key: 'linea', value: v, label: 'Línea: ' + v.slice(0, 20) + '…' }))
  }
  if (selected.value?.red) {
    selected.value.red.forEach(v => chips.push({ key: 'red', value: v, label: 'Red: ' + v }))
  }
  if (selected.value?.apuesta) {
    selected.value.apuesta.forEach(v => chips.push({ key: 'apuesta', value: v, label: 'Apuesta: ' + v }))
  }
  return chips
})

const removeChip = (chip) => {
  const lista = selected.value?.[chip.key]
  if (!lista) return
  const indice = lista.indexOf(chip.value)
  if (indice > -1) {
    lista.splice(indice, 1)
  }
}

watch([searchQuery, sortBy, selected], () => {
  currentPage.value = 1
}, { deep: true })
</script>

<style scoped>
.q-page {
  padding: 20px 0 0 0;
}

.search-wrapper {
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 50px;
  width: 100%;
  max-width: 1500px;
  height: 52px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.search-section {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 20px;
  height: 100%;
  gap: 10px;
}

.section-icon {
  font-size: 20px;
  flex-shrink: 0;
  color: var(--color_button);
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: #444;
  font-family: 'Nunito', sans-serif;
  width: 100%;
  font-weight: 600;
}

.search-input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.search-btn {
  background: linear-gradient(135deg, var(--color_button), var(--color_card));
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 4px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 8px rgba(46, 125, 50, 0.4);
}

.search-btn:hover {
  transform: scale(1.07);
  box-shadow: 0 4px 14px rgba(46, 125, 50, 0.5);
}

.search-btn-icon {
  color: #ffffff;
  font-size: 20px;
}

.main-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  max-width: 100%;
  min-height: calc(100vh - 120px);
  padding: 0px !important;
}

.sidebar-container {
  flex: 0 0 320px;
  min-height: calc(100vh - 200px);
}

.sidebar-container .q-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-container .q-card-section:first-of-type {
  flex-shrink: 0;
}

.sidebar-container .q-card-section:nth-of-type(2) {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 350px);
}

.sidebar-container .q-card-section:nth-of-type(2)::-webkit-scrollbar {
  width: 6px;
}

.sidebar-container .q-card-section:nth-of-type(2)::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.sidebar-container .q-card-section:nth-of-type(2)::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.sidebar-container .q-card-section:nth-of-type(2)::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.sidebar-container .q-card-actions {
  flex-shrink: 0;
}

.results-container {
  flex: 1;
  min-width: 0;
  min-height: calc(100vh - 200px);
}

.results-container .q-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.results-container .q-card-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-card {
  transition: box-shadow 0.2s, transform 0.15s;
  border-left: 4px solid transparent;
  min-height: 120px;
}

.course-card:hover {
  color: white !important;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
  transform: translateX(4px);
  border-left-color: var(--color_button);
  background: linear-gradient(135deg, #2e7d32 0%, #3fa34d 50%, #66bb6a 100%);
}

.course-card:hover .course-title,
.course-card:hover .text-subtitle1,
.course-card:hover .text-weight-bold,
.course-card:hover .text-body2,
.course-card:hover .text-grey-7 {
  color: white !important;
}

.course-card:hover .q-icon {
  color: white !important;
}

.modalidad-badge {
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  transition: all 0.2s ease;
}

.badge-presencial {
  background: linear-gradient(135deg, #2e7d32, #43a047);
  color: white;
}

.badge-virtual {
  background: linear-gradient(135deg, #1565c0, #42a5f5);
  color: white;
}

.badge-mixto {
  background: linear-gradient(135deg, #6d4c41, #8d6e63);
  color: white;
}

.badge-default {
  background: linear-gradient(135deg, #616161, #757575);
  color: white;
}

.course-card:hover .modalidad-badge {
  background: linear-gradient(135deg, #ffffff, #f5f5f5) !important;
  color: #2e7d32 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.course-card .q-card-section {
  display: flex;
  align-items: center;
  min-height: 120px;
}

.course-title {
  color: var(--color_button);
}

.results-scroll-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.courses-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  min-height: 0;
}

.courses-list::-webkit-scrollbar {
  width: 6px;
}

.courses-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.courses-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.courses-list::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.pagination-container {
  flex-shrink: 0;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.results-container .q-card-section>div:first-child,
.results-container .q-card-section>div:nth-child(2) {
  flex-shrink: 0;
}

:deep(.q-pagination) button {
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
}

:deep(.q-pagination button:not(.active)) {
  border: 1.5px solid #ddd;
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .sidebar-container {
    flex: 1;
    width: 100%;
    min-height: auto;
  }

  .sidebar-container .q-card-section:nth-of-type(2) {
    max-height: none;
    overflow-y: visible;
  }

  .results-container {
    min-height: auto;
  }

  .results-scroll-container {
    min-height: auto;
  }

  .courses-list {
    overflow-y: visible;
  }

  .pagination-container {
    border-top: none;
    padding-top: 0;
  }

  .search-wrapper {
    padding: 16px;
  }

  .search-bar {
    height: 48px;
  }

  .search-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .course-card {
    min-height: auto;
  }

  .course-card .q-card-section {
    min-height: auto;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .main-layout {
    gap: 16px;
    padding: 16px;
  }

  .sidebar-container {
    flex: 0 0 280px;
  }
}

@media (min-width: 1201px) {
  .main-layout {
    gap: 24px;
    padding: 24px 32px;
  }
}

.scroll-to-top-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px auto 30px auto;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--color_button) 0%, var(--color_card) 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.35);
  transition: all 0.3s ease;
}

.scroll-to-top-btn svg {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.scroll-to-top-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(46, 125, 50, 0.45);
}

.scroll-to-top-btn:hover svg {
  transform: translateY(-2px);
}

.scroll-to-top-btn:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .scroll-to-top-btn {
    margin: 15px auto 25px auto;
    padding: 12px 22px;
    font-size: 14px;
  }

  .scroll-to-top-btn svg {
    width: 20px;
    height: 20px;
  }
}

.info-section {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid var(--color_button);
}

.info-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.info-content {
  white-space: pre-line;
  line-height: 1.6;
}

/* Modal de detalles */
.modal-card {
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.modal-card > .q-card-section:first-child {
  flex-shrink: 0;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  min-height: 100px;
  max-height: calc(85vh - 100px);
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.modal-card > .q-card-actions {
  flex-shrink: 0;
}

@media (min-width: 769px) and (max-width: 1200px) {
  .modal-card {
    max-width: 550px;
  }
}

@media (min-width: 1201px) {
  .modal-card {
    max-width: 650px;
  }
}
</style>