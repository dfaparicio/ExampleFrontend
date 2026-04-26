<template>
  <q-page>
    <!-- Barra de búsqueda -->
    <div class="search-wrapper">
      <div class="search-bar">
        <div class="search-section">
          <q-icon name="search" class="section-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre del programa, área o código..."
            class="search-input"
            @input="onSearch"
          />
        </div>
        <button class="search-btn" @click="onSearch">
          <q-icon name="search" class="search-btn-icon" />
        </button>
      </div>
    </div>

    <!-- Layout principal -->
    <div class="main-layout">
      <!-- Sidebar de filtros -->
      <div class="sidebar-container">
        <q-card flat bordered class="filter-section">
          <q-card-section class="bg-green-9 q-py-md">
            <div class="text-white text-center text-weight-bold text-subtitle1">
              FILTROS DE BÚSQUEDA
            </div>
          </q-card-section>

          <q-card-section class="q-pa-md">
            <!-- Modalidad -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                MODALIDAD
              </div>
              <q-list dense>
                <q-item v-for="m in filters.modalidad" :key="m.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.modalidad"
                      :val="m.value"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ m.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :class="selected.modalidad.includes(m.value) ? 'bg-green-10 text-white' : 'bg-grey-4'"
                    >
                      {{ m.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Nivel de formación -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                NIVEL DE FORMACIÓN
              </div>
              <q-list dense>
                <q-item v-for="n in niveles" :key="n.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.nivel"
                      :val="n.value"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ n.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :class="selected.nivel.includes(n.value) ? 'bg-green-10 text-white' : 'bg-grey-4'"
                    >
                      {{ n.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Línea tecnológica -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                LÍNEA TECNOLÓGICA
              </div>
              <q-list dense>
                <q-item v-for="l in lineas" :key="l.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.linea"
                      :val="l.value"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="customEvents">{{ l.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :class="selected.linea.includes(l.value) ? 'bg-green-10 text-white' : 'bg-grey-4'"
                    >
                      {{ l.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Red de conocimiento -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                RED DE CONOCIMIENTO
              </div>
              <q-list dense>
                <q-item v-for="r in redes" :key="r.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.red"
                      :val="r.value"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="customEvents">{{ r.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :class="selected.red.includes(r.value) ? 'bg-green-10 text-white' : 'bg-grey-4'"
                    >
                      {{ r.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Apuestas prioritarias -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                APUESTAS PRIORITARIAS
              </div>
              <q-list dense>
                <q-item v-for="a in apuestas" :key="a.value" class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.apuesta"
                      :val="a.value"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="customEvents">{{ a.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :class="selected.apuesta.includes(a.value) ? 'bg-green-10 text-white' : 'bg-grey-4'"
                    >
                      {{ a.count }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Duración -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                DURACIÓN (HORAS)
              </div>
              <div class="row q-gutter-sm items-center">
                <div class="col">
                  <q-input
                    outlined
                    dense
                    v-model.number="selected.durMin"
                    type="number"
                    label="Mín"
                    color="green-9"
                    min="0"
                    @change="applyFilters"
                  />
                </div>
                <div class="text-grey-7 text-weight-bold">—</div>
                <div class="col">
                  <q-input
                    outlined
                    dense
                    v-model.number="selected.durMax"
                    type="number"
                    label="Máx"
                    color="green-9"
                    min="0"
                    @change="applyFilters"
                  />
                </div>
              </div>
            </div>

            <!-- FIC -->
            <div class="filter-group q-mb-md">
              <div class="text-green-9 text-weight-bold text-caption q-mb-sm">
                APOYO FIC
              </div>
              <q-list dense>
                <q-item class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.fic"
                      val="SI"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Con apoyo FIC</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge :class="selected.fic.includes('SI') ? 'bg-green-10 text-white' : 'bg-grey-4'">
                      {{ ficCount }}
                    </q-badge>
                  </q-item-section>
                </q-item>
                <q-item class="q-pl-none">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="selected.fic"
                      val="NO"
                      color="green-9"
                      dense
                      @update:model-value="applyFilters"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Sin apoyo FIC</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge :class="selected.fic.includes('NO') ? 'bg-green-10 text-white' : 'bg-grey-4'">
                      {{ noFicCount }}
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <!-- Acciones -->
          <q-card-actions class="q-pa-md">
            <q-btn
              outline
              color="green-9"
              label="Limpiar"
              @click="clearFilters"
              class="full-width"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Resultados -->
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
              <q-select
                outlined
                dense
                v-model="sortBy"
                :options="sortOptions"
                label="Ordenar por"
                color="green-9"
                emit-value
                map-options
                style="min-width: 200px"
                @update:model-value="applyFilters"
              />
            </div>

            <!-- Chips de filtros activos -->
            <div v-if="activeChips.length" class="q-mb-md">
              <q-chip
                v-for="chip in activeChips"
                :key="chip.key + chip.value"
                class="bg-green-10 text-white"
                removable
                @remove="removeChip(chip)"
              >
                {{ chip.label }}
              </q-chip>
            </div>

            <!-- Lista de cursos -->
            <div v-if="paginatedCourses.length">
              <q-card
                v-for="course in paginatedCourses"
                :key="course.COD_VER"
                flat
                bordered
                class="course-card q-mb-sm"
                clickable
                @click="goToCourse(course)"
              >
                <q-card-section class="q-pa-md">
                  <div class="row justify-between items-center">
                    <div class="col">
                      <div class="row items-center q-gutter-sm q-mb-sm">
                        <div class="text-subtitle1 text-weight-bold style-text course-title">
                          {{ course.PRF_DENOMINACION }}
                        </div>
                        <q-badge
                          :class="[
                            course.MODALIDAD === 'Presencial' ? 'bg-dark' :
                            course.MODALIDAD === 'Virtual' ? 'bg-purple-9' : 'bg-blue-9'
                          ]"
                          class="text-white"
                        >
                          {{ course.MODALIDAD }}
                        </q-badge>
                      </div>
                      <div class="row q-gutter-md items-center text-body2 text-grey-7">
                        <div class="flex items-center q-gutter-xs">
                          <q-icon name="schedule" size="16px" color="green-9" />
                          <span>{{ course.PRF_DURACION_MAXIMA }} horas</span>
                        </div>
                        <div class="text-grey-5">|</div>
                        <div class="flex items-center q-gutter-xs">
                          <q-icon name="school" size="16px" color="green-9" />
                          <span>{{ course.TIPO_DE_FORMACION }}</span>
                        </div>
                        <div class="text-grey-5">|</div>
                        <div class="flex items-center q-gutter-xs">
                          <q-icon name="workspace_premium" size="16px" color="green-9" />
                          <span>{{ course.NIVEL_DE_FORMACION }}</span>
                        </div>
                        <q-badge class="bg-grey-4 text-grey-8">
                          {{ course.PRF_EDAD_MIN_REQUERIDA ?? 14 }}+ Edad mínima
                        </q-badge>
                      </div>
                      <div v-if="course.LINEA_TECNOLOGICA" class="text-caption text-grey-6 q-mt-xs customEvents">
                        <q-icon name="label" size="14px" color="green-9" />
                        {{ course.LINEA_TECNOLOGICA }} · {{ course.RED_DE_CONOCIMIENTO }}
                      </div>
                    </div>
                    <q-icon
                      name="arrow_forward"
                      size="24px"
                      color="green-9"
                      class="course-arrow"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Sin resultados -->
            <div v-else class="text-center q-pa-xl">
              <q-icon name="search_off" size="64px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">No se encontraron programas con los filtros seleccionados.</div>
            </div>

            <!-- Paginación -->
            <div v-if="totalPages > 1" class="q-mt-lg flex justify-center">
              <q-pagination
                v-model="currentPage"
                :max="totalPages"
                :max-pages="5"
                color="green-9"
                active-color="green-9"
                text-color="black"
                active-text-color="white"
                @update:model-value="goPage(currentPage)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// ──────────────────────────────────────────────
// PROPS — pasa tus cursos desde el padre o reemplaza
// los datos de ejemplo con el import del JSON real:
//   import cursos from '@/data/complementarias_completo.json'
// ──────────────────────────────────────────────
const props = defineProps({
  courses: {
    type: Array,
    default: () => [
      { COD_VER: '03000089-1', PRF_DENOMINACION: 'ACABADOS PARA PIEZAS TEXTILES ARTESANALES', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 40, PRF_EDAD_MIN_REQUERIDA: 14, LINEA_TECNOLOGICA: 'DISEÑO', RED_TECNOLOGICA: 'DISEÑO DE MODAS Y CONFECCIONES', RED_DE_CONOCIMIENTO: 'Textil, Confección Diseño y Moda', APUESTAS_PRIORITARIAS: 'Economía popular', FIC: 'NO' },
      { COD_VER: '02000072-3', PRF_DENOMINACION: 'ACCIONES DE PREVENCION EN SALUD MENTAL', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 40, PRF_EDAD_MIN_REQUERIDA: 14, LINEA_TECNOLOGICA: 'CLIENTE', RED_TECNOLOGICA: 'TECNOLOGÍAS DE SERVICIOS DE SALUD', RED_DE_CONOCIMIENTO: 'Logística Y Gestión De La Producción', APUESTAS_PRIORITARIAS: 'Apuesta del sector', FIC: 'NO' },
      { COD_VER: '03000062-3', PRF_DENOMINACION: 'ACCIONES PARA LA CONSERVACION, PROTECCION Y RESTAURACION DE LOS SISTEMAS SOCIOECOLOGICOS', MODALIDAD: 'Virtual', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Complementaria virtual', PRF_DURACION_MAXIMA: 48, PRF_EDAD_MIN_REQUERIDA: 14, LINEA_TECNOLOGICA: 'PRODUCCIÓN Y TRANSFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS AGRÍCOLAS', RED_DE_CONOCIMIENTO: 'Agrícola', APUESTAS_PRIORITARIAS: 'Transición energética', FIC: 'NO' },
      { COD_VER: '01000014-1', PRF_DENOMINACION: 'AUTOCAD CIVIL 3D', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 120, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'MATERIALES HERRAMIENTAS', RED_TECNOLOGICA: 'MATERIALES PARA LA CONSTRUCCIÓN', RED_DE_CONOCIMIENTO: 'Infraestructura', APUESTAS_PRIORITARIAS: 'Fortalecimiento en programas TIC', FIC: 'NO' },
      { COD_VER: '02000016-1', PRF_DENOMINACION: 'GESTION DE SERVICIOS DE TECNOLOGIAS DE LA INFORMACION', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 200, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES GESTIÓN DE LA INFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS DE LA INFORMACIÓN, DISEÑO Y DESARROLLO DE SOFTWARE', RED_DE_CONOCIMIENTO: 'Informática, Diseño Y Desarrollo De Software', APUESTAS_PRIORITARIAS: 'Fortalecimiento en programas TIC', FIC: 'NO' },
      { COD_VER: '02000058-1', PRF_DENOMINACION: 'MICROSOFT WORD AVANZADO', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 30, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES GESTIÓN DE LA INFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS DE LA INFORMACIÓN, DISEÑO Y DESARROLLO DE SOFTWARE', RED_DE_CONOCIMIENTO: 'Informática, Diseño Y Desarrollo De Software', APUESTAS_PRIORITARIAS: 'Fortalecimiento en programas TIC', FIC: 'NO' },
      { COD_VER: '03000050-2', PRF_DENOMINACION: 'CATACION DE CAFE NIVEL 1', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 96, PRF_EDAD_MIN_REQUERIDA: 16, LINEA_TECNOLOGICA: 'PRODUCCIÓN Y TRANSFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS AGROINDUSTRIALES', RED_DE_CONOCIMIENTO: 'Agrícola', APUESTAS_PRIORITARIAS: 'Economía popular', FIC: 'NO' },
      { COD_VER: '02000082-1', PRF_DENOMINACION: 'REVIT BASICO', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 40, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'MATERIALES HERRAMIENTAS', RED_TECNOLOGICA: 'MATERIALES PARA LA CONSTRUCCIÓN', RED_DE_CONOCIMIENTO: 'Construcción', APUESTAS_PRIORITARIAS: 'Fortalecimiento en programas TIC', FIC: 'NO' },
      { COD_VER: '02000130-1', PRF_DENOMINACION: 'GESTION DE RESIDUOS DE APARATOS ELECTRICOS Y ELECTRONICOS', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 40, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'PRODUCCIÓN Y TRANSFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS DE MANTENIMIENTO PREDICTIVO, PREVENTIVO Y CORRECTIVO', RED_DE_CONOCIMIENTO: 'Electrónica Y Automatización', APUESTAS_PRIORITARIAS: 'Transición energética', FIC: 'NO' },
      { COD_VER: '02110009-1', PRF_DENOMINACION: 'DIRECCION DE PROYECTOS BAJO EL ESTANDAR PMI', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 120, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'CLIENTE', RED_TECNOLOGICA: 'TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y SERVICIOS FINANCIEROS', RED_DE_CONOCIMIENTO: 'Gestión Administrativa Y Financiera', APUESTAS_PRIORITARIAS: 'Apuesta del sector', FIC: 'NO' },
      { COD_VER: '02000118-1', PRF_DENOMINACION: 'ELABORACION DE ARTICULOS CIENTIFICOS EN ACTIVIDADES DE INVESTIGACION', MODALIDAD: 'Virtual', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Complementaria virtual', PRF_DURACION_MAXIMA: 120, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'CLIENTE', RED_TECNOLOGICA: 'TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y SERVICIOS FINANCIEROS', RED_DE_CONOCIMIENTO: 'Red Ins. de Pedagogía', APUESTAS_PRIORITARIAS: 'Apuesta del sector', FIC: 'NO' },
      { COD_VER: '03000060-1', PRF_DENOMINACION: 'PRESTACION DE SERVICIOS HOTELEROS EN IDIOMA INGLES', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 420, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'CLIENTE', RED_TECNOLOGICA: 'TECNOLOGÍAS DE SERVICIOS TURÍSTICOS', RED_DE_CONOCIMIENTO: 'Hotelería Y Turismo', APUESTAS_PRIORITARIAS: 'Economía popular', FIC: 'NO' },
      { COD_VER: '02000088-1', PRF_DENOMINACION: 'PROGRAMACION DE FIRMWARE EN DISPOSITIVOS ELECTRONICOS', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 40, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'PRODUCCIÓN Y TRANSFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS DE MANTENIMIENTO PREDICTIVO, PREVENTIVO Y CORRECTIVO', RED_DE_CONOCIMIENTO: 'Electrónica Y Automatización', APUESTAS_PRIORITARIAS: 'Fortalecimiento en programas TIC', FIC: 'NO' },
      { COD_VER: '03000086-1', PRF_DENOMINACION: 'INNOVACION Y CREATIVIDAD', MODALIDAD: 'Virtual', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Complementaria virtual', PRF_DURACION_MAXIMA: 60, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'CLIENTE', RED_TECNOLOGICA: 'TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y SERVICIOS FINANCIEROS', RED_DE_CONOCIMIENTO: 'Red Ins. de Pedagogía', APUESTAS_PRIORITARIAS: 'Economía popular', FIC: 'NO' },
      { COD_VER: '02000127-1', PRF_DENOMINACION: 'CURSO MODELO OMI 1.39 LIDERAZGO Y TRABAJO EN EQUIPO', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 20, PRF_EDAD_MIN_REQUERIDA: null, LINEA_TECNOLOGICA: 'CLIENTE', RED_TECNOLOGICA: 'LOGÍSTICA Y TRANSPORTE', RED_DE_CONOCIMIENTO: 'Transporte', APUESTAS_PRIORITARIAS: 'Apuesta del sector', FIC: 'NO' },
      { COD_VER: '03000143-2', PRF_DENOMINACION: 'EMPRENDIMIENTO EN APICULTURA', MODALIDAD: 'Presencial', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Curso especial', PRF_DURACION_MAXIMA: 288, PRF_EDAD_MIN_REQUERIDA: 15, LINEA_TECNOLOGICA: 'PRODUCCIÓN Y TRANSFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS PECUARIAS', RED_DE_CONOCIMIENTO: 'Pecuaria', APUESTAS_PRIORITARIAS: 'Economía popular', FIC: 'NO' },
      { COD_VER: 'distancia-01', PRF_DENOMINACION: 'FORMACION A DISTANCIA EN GESTION AMBIENTAL', MODALIDAD: 'A distancia', TIPO_DE_FORMACION: 'Complementaria', NIVEL_DE_FORMACION: 'Técnico', PRF_DURACION_MAXIMA: 880, PRF_EDAD_MIN_REQUERIDA: 18, LINEA_TECNOLOGICA: 'PRODUCCIÓN Y TRANSFORMACIÓN', RED_TECNOLOGICA: 'TECNOLOGÍAS AGRÍCOLAS', RED_DE_CONOCIMIENTO: 'Agrícola', APUESTAS_PRIORITARIAS: 'Transición energética', FIC: 'SI' },
    ]
  }
})

// ── Estado ──────────────────────────────────────
const allCourses   = ref([...props.courses])
const searchQuery  = ref('')
const sortBy       = ref('nombre')
const currentPage  = ref(1)
const PER_PAGE     = 15

const selected = ref({
  modalidad: [],
  nivel: [],
  linea: [],
  red: [],
  apuesta: [],
  fic: [],
  durMin: null,
  durMax: null,
})

const sortOptions = [
  { label: 'Nombre (A-Z)', value: 'nombre' },
  { label: 'Horas: menor a mayor', value: 'horas_asc' },
  { label: 'Horas: mayor a menor', value: 'horas_desc' }
]

// ── Helpers ──────────────────────────────────────
function countBy(field, val) {
  return allCourses.value.filter(c => c[field] === val).length
}

// ── Filtros estáticos ────────────────────────────
const filters = {
  modalidad: [
    { value: 'Presencial',  label: 'Presencial',  count: countBy('MODALIDAD', 'Presencial') },
    { value: 'Virtual',     label: 'Virtual',     count: countBy('MODALIDAD', 'Virtual') },
    { value: 'A distancia', label: 'A distancia', count: countBy('MODALIDAD', 'A distancia') },
  ]
}

const niveles = [
  { value: 'Complementaria virtual', label: 'Complementaria virtual', count: countBy('NIVEL_DE_FORMACION', 'Complementaria virtual') },
  { value: 'Curso especial',         label: 'Curso especial',         count: countBy('NIVEL_DE_FORMACION', 'Curso especial') },
  { value: 'Técnico',                label: 'Técnico',                count: countBy('NIVEL_DE_FORMACION', 'Técnico') },
  { value: 'Tecnólogo',              label: 'Tecnólogo',              count: countBy('NIVEL_DE_FORMACION', 'Tecnólogo') },
]

const lineas = [...new Set(allCourses.value.map(c => c.LINEA_TECNOLOGICA).filter(Boolean))].map(v => ({
  value: v,
  label: v.length > 40 ? v.slice(0, 38) + '…' : v,
  count: countBy('LINEA_TECNOLOGICA', v),
}))

const redes = [...new Set(allCourses.value.map(c => c.RED_DE_CONOCIMIENTO).filter(Boolean))].map(v => ({
  value: v, label: v, count: countBy('RED_DE_CONOCIMIENTO', v),
}))

const apuestas = [...new Set(allCourses.value.map(c => c.APUESTAS_PRIORITARIAS).filter(Boolean))].map(v => ({
  value: v, label: v, count: countBy('APUESTAS_PRIORITARIAS', v),
}))

const ficCount   = computed(() => allCourses.value.filter(c => c.FIC === 'SI').length)
const noFicCount = computed(() => allCourses.value.filter(c => c.FIC === 'NO').length)

// ── Cursos filtrados ─────────────────────────────
const filteredCourses = computed(() => {
  let list = allCourses.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.PRF_DENOMINACION.toLowerCase().includes(q) ||
      (c.RED_DE_CONOCIMIENTO ?? '').toLowerCase().includes(q) ||
      (c.LINEA_TECNOLOGICA ?? '').toLowerCase().includes(q)
    )
  }

  if (selected.value.modalidad.length) list = list.filter(c => selected.value.modalidad.includes(c.MODALIDAD))
  if (selected.value.nivel.length)     list = list.filter(c => selected.value.nivel.includes(c.NIVEL_DE_FORMACION))
  if (selected.value.linea.length)     list = list.filter(c => selected.value.linea.includes(c.LINEA_TECNOLOGICA))
  if (selected.value.red.length)       list = list.filter(c => selected.value.red.includes(c.RED_DE_CONOCIMIENTO))
  if (selected.value.apuesta.length)   list = list.filter(c => selected.value.apuesta.includes(c.APUESTAS_PRIORITARIAS))
  if (selected.value.fic.length)       list = list.filter(c => selected.value.fic.includes(c.FIC))

  if (selected.value.durMin != null && selected.value.durMin !== '')
    list = list.filter(c => c.PRF_DURACION_MAXIMA >= selected.value.durMin)
  if (selected.value.durMax != null && selected.value.durMax !== '')
    list = list.filter(c => c.PRF_DURACION_MAXIMA <= selected.value.durMax)

  if (sortBy.value === 'nombre')      list = [...list].sort((a, b) => a.PRF_DENOMINACION.localeCompare(b.PRF_DENOMINACION))
  else if (sortBy.value === 'horas_asc')  list = [...list].sort((a, b) => a.PRF_DURACION_MAXIMA - b.PRF_DURACION_MAXIMA)
  else if (sortBy.value === 'horas_desc') list = [...list].sort((a, b) => b.PRF_DURACION_MAXIMA - a.PRF_DURACION_MAXIMA)

  return list
})

// ── Paginación ───────────────────────────────────
const totalPages = computed(() => Math.ceil(filteredCourses.value.length / PER_PAGE))

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return filteredCourses.value.slice(start, start + PER_PAGE)
})

function goPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ── Acciones ─────────────────────────────────────
function applyFilters() { currentPage.value = 1 }
function onSearch()     { currentPage.value = 1 }

function clearFilters() {
  selected.value = { modalidad: [], nivel: [], linea: [], red: [], apuesta: [], fic: [], durMin: null, durMax: null }
  searchQuery.value = ''
  currentPage.value = 1
}

// ── Chips activos ────────────────────────────────
const activeChips = computed(() => {
  const chips = []
  selected.value.modalidad.forEach(v => chips.push({ key: 'modalidad', value: v, label: 'Modalidad: ' + v }))
  selected.value.nivel.forEach(v    => chips.push({ key: 'nivel',     value: v, label: 'Nivel: ' + v }))
  selected.value.linea.forEach(v    => chips.push({ key: 'linea',     value: v, label: 'Línea: ' + v.slice(0, 20) + '…' }))
  selected.value.red.forEach(v      => chips.push({ key: 'red',       value: v, label: 'Red: ' + v }))
  selected.value.apuesta.forEach(v  => chips.push({ key: 'apuesta',   value: v, label: 'Apuesta: ' + v }))
  selected.value.fic.forEach(v      => chips.push({ key: 'fic',       value: v, label: 'FIC: ' + v }))
  return chips
})

function removeChip(chip) {
  const arr = selected.value[chip.key]
  const idx = arr.indexOf(chip.value)
  if (idx > -1) arr.splice(idx, 1)
  applyFilters()
}

// ── Navegación a detalle del curso ──────────────
function goToCourse(course) {
  console.log('Navegar a detalle del curso:', course.COD_VER)
}
</script>

<style scoped>
/* Barra de búsqueda */
.search-wrapper {
  background: linear-gradient(135deg, var(--color_button) 0%, var(--color_card) 100%);
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
  max-width: 700px;
  height: 52px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
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

/* Layout principal */
.main-layout {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

/* Cards de cursos */
.course-card {
  transition: box-shadow 0.2s, transform 0.15s;
  border-left: 4px solid transparent;
}

.course-card:hover {
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
  transform: translateX(4px);
  border-left-color: var(--color_button);
}

.course-title {
  color: var(--color_button);
}

.course-arrow {
  transition: transform 0.2s;
}

.course-card:hover .course-arrow {
  transform: translateX(4px);
}

/* Paginación */
:deep(.q-pagination) button {
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
}

:deep(.q-pagination button:not(.active)) {
  border: 1.5px solid #ddd;
}

/* Responsive */
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar-container {
    flex: 1;
    width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .sidebar-container {
    flex: 0 0 320px;
  }
}
</style>
