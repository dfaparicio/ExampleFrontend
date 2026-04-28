<template>
    <q-page class="sena-page">

        <div class="form-container">
            <div class="fecha-bar">
                <label>📅 Fecha de Solicitud:</label>
                <q-input v-model="formData.fechaSolicitud" type="date" outlined dense color="green-9" bg-color="white"
                    style="width: 150px" />
            </div>

            <div class="section-card">
                <div class="section-header">
                    <q-icon name="school" size="18px" />
                    <h2>Caracterización del Curso</h2>
                </div>
                <div class="section-body">
                    <div class="form-grid col-1" style="margin-bottom:18px;">
                        <div class="field-group">
                            <label class="field-label">Código del Curso <span class="required">*</span></label>
                            <q-input v-model="formData.codigoCurso" outlined dense placeholder="Ej: 123456"
                                color="green-9" bg-color="grey-1" />
                        </div>
                    </div>

                    <div class="form-grid col-2-1" style="margin-bottom:18px;">
                        <div class="field-group">
                            <label class="field-label">Nombre del Curso <span class="required">*</span></label>
                            <q-input v-model="formData.nombreCurso" outlined dense
                                placeholder="Nombre completo del curso" bg-color="green-1"
                                input-style="font-style:italic;color:#276749;" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Versión</label>
                            <q-input v-model="formData.version" outlined dense placeholder="—" bg-color="green-1"
                                input-style="font-style:italic;color:#276749;" />
                        </div>
                    </div>

                    <div class="form-grid col-3" style="margin-bottom:18px;">
                        <div class="field-group">
                            <label class="field-label">Duración en Horas</label>
                            <q-input v-model.number="formData.duracionHoras" type="number" outlined dense
                                placeholder="0" bg-color="green-1" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Fecha de Inicio <span class="required">*</span></label>
                            <q-input v-model="formData.fechaInicio" type="date" outlined dense color="green-9"
                                bg-color="grey-1" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Fecha de Terminación <span class="required">*</span></label>
                            <q-input v-model="formData.fechaTerminacion" type="date" outlined dense color="green-9"
                                bg-color="grey-1" />
                        </div>
                    </div>

                    <div class="form-grid col-3" style="margin-bottom:18px;">
                        <div class="field-group">
                            <label class="field-label">Número de Aprendices <span class="required">*</span></label>
                            <q-input v-model.number="formData.numAprendices" type="number" outlined dense
                                placeholder="0" color="green-9" bg-color="grey-1" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Municipio de Ejecución <span class="required">*</span></label>
                            <q-input v-model="formData.municipio" outlined dense placeholder="Municipio" color="green-9"
                                bg-color="grey-1" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Vereda</label>
                            <q-input v-model="formData.vereda" outlined dense placeholder="Vereda (si aplica)"
                                color="green-9" bg-color="grey-1" />
                        </div>
                    </div>

                    <div class="form-grid col-1">
                        <div class="field-group">
                            <label class="field-label">Dirección donde se impartirá el Curso</label>
                            <q-input v-model="formData.direccionCurso" outlined dense placeholder="Dirección completa"
                                color="green-9" bg-color="grey-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <q-icon name="category" size="18px" />
                    <h2>Tipo de Programa</h2>
                </div>
                <div class="section-body">
                    <div class="tipo-programa-grid">
                        <div class="tipo-card" :class="{ selected: formData.tipoProg === 'ATENCION_INSTITUCIONES' }"
                            @click="formData.tipoProg = 'ATENCION_INSTITUCIONES'">
                            <q-radio v-model="formData.tipoProg" val="ATENCION_INSTITUCIONES" color="green-9" dense />
                            <label>Atención a Instituciones</label>
                        </div>
                        <div class="tipo-card" :class="{ selected: formData.tipoProg === 'CAMPESENA' }"
                            @click="formData.tipoProg = 'CAMPESENA'">
                            <q-radio v-model="formData.tipoProg" val="CAMPESENA" color="green-9" dense />
                            <label>Campesena</label>
                        </div>
                        <div class="tipo-card" :class="{ selected: formData.tipoProg === 'RUTA_CAMPESENA' }"
                            @click="formData.tipoProg = 'RUTA_CAMPESENA'">
                            <q-radio v-model="formData.tipoProg" val="RUTA_CAMPESENA" color="green-9" dense />
                            <label>Ruta Campesena</label>
                        </div>
                    </div>

                    <div v-if="formData.tipoProg === 'CAMPESENA' || formData.tipoProg === 'RUTA_CAMPESENA'"
                        style="margin-top:18px;">
                        <div class="field-group" style="max-width:300px;">
                            <label class="field-label">ID Campesena</label>
                            <q-input v-model="formData.idCampesena" outlined dense placeholder="ID Campesena"
                                color="green-9" bg-color="grey-1" />
                        </div>
                    </div>

                    <div class="form-grid col-2" style="margin-top:18px;">
                        <div class="field-group">
                            <label class="field-label">Nombre Empresa / Institución</label>
                            <q-input v-model="formData.nombreEmpresa" outlined dense placeholder="Razón social o nombre"
                                color="green-9" bg-color="grey-1" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">NIT (si es empresa)</label>
                            <q-input v-model="formData.nit" outlined dense placeholder="Ej: 900.123.456-7"
                                color="green-9" bg-color="grey-1" />
                        </div>
                    </div>

                    <div class="form-grid col-2-1" style="margin-top:18px;">
                        <div class="field-group">
                            <label class="field-label">Nombre Contacto de la Empresa</label>
                            <q-input v-model="formData.contactoNombre" outlined dense placeholder="Nombre completo"
                                color="green-9" bg-color="grey-1" />
                        </div>
                        <div class="field-group">
                            <label class="field-label">Teléfono de Contacto</label>
                            <q-input v-model="formData.contactoTel" type="tel" outlined dense
                                placeholder="Ej: 3XX XXX XXXX" color="green-9" bg-color="grey-1" />
                        </div>
                    </div>

                    <div class="form-grid col-1" style="margin-top:18px;">
                        <div class="field-group">
                            <label class="field-label">Tipo de Población Atendida <span
                                    class="required">*</span></label>
                            <q-select v-model="formData.tipoPoblacion" :options="poblacionOptions" outlined dense
                                color="green-9" bg-color="grey-1" placeholder="Seleccione de la lista..." />
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <q-icon name="checklist" size="18px" />
                    <h2>Requisitos de Ingreso</h2>
                </div>
                <div class="section-body">
                    <table class="req-table">
                        <thead>
                            <tr>
                                <th style="width:50px;">#</th>
                                <th style="width:250px;">Requisito</th>
                                <th>Descripción / Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(req, index) in formData.requisitos" :key="index">
                                <td style="text-align:center;font-weight:600;color:#718096;">{{ index + 1 }}</td>
                                <td>
                                    <q-input v-model="req.nombre" dense outlined placeholder="Ej: Académico" 
                                        bg-color="grey-1" color="green-9" input-style="font-weight:500;" />
                                </td>
                                <td>
                                    <q-input v-model="req.observacion" dense outlined type="textarea" autogrow
                                        placeholder="Detalle del requisito..." bg-color="white" color="green-9" />
                                </td>
                                <td style="text-align:center;">
                                    <q-btn flat round dense icon="delete" color="red-4" size="sm" @click="eliminarRequisito(index)" />
                                </td>
                            </tr>
                            <tr v-if="formData.requisitos.length === 0">
                                <td style="text-align:center;color:#A0AEC0;font-size:13px;padding: 20px;" colspan="4">
                                    No hay requisitos cargados. Selecciona un curso del catálogo o añade uno nuevo.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- Botón para agregar más requisitos -->
                    <div class="flex justify-center q-mt-md">
                        <q-btn outline color="green-9" icon="add_circle" label="Añadir otro requisito" 
                            @click="agregarRequisitoManual" class="full-width" style="border-style: dashed;" />
                    </div>
                    <div class="req-note">
                        <q-icon name="info" size="16px" color="warning" />
                        <span>Según diseño curricular del programa. Validar idoneidad del instructor conforme a la
                            <strong>Guía GFPI-G-025 (núm. 7.5)</strong>.</span>
                    </div>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <q-icon name="manage_accounts" size="18px" />
                    <h2>Recursos</h2>
                </div>
                <div class="section-body">
                    <div style="margin-bottom:20px;">
                        <p class="subsection-title">Instructor</p>
                        <div class="form-grid col-4">
                            <div class="field-group span-2">
                                <label class="field-label">Nombre del Instructor(a) <span
                                        class="required">*</span></label>
                                <q-input v-model="formData.nombreInstructor" outlined dense
                                    placeholder="Nombre completo" color="green-9" bg-color="grey-1" />
                            </div>
                            <div class="field-group">
                                <label class="field-label">Cédula <span class="required">*</span></label>
                                <q-input v-model="formData.cedulaInstructor" outlined dense placeholder="N° documento"
                                    color="green-9" bg-color="grey-1" />
                            </div>
                            <div class="field-group">
                                <label class="field-label">Teléfono</label>
                                <q-input v-model="formData.telInstructor" type="tel" outlined dense
                                    placeholder="Teléfono" color="green-9" bg-color="grey-1" />
                            </div>
                            <div class="field-group span-full">
                                <label class="field-label">Correo Electrónico</label>
                                <q-input v-model="formData.correoInstructor" type="email" outlined dense
                                    placeholder="correo@sena.edu.co" color="green-9" bg-color="grey-1" />
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom:20px;">
                        <p class="subsection-title">Supervisor</p>
                        <div class="field-group">
                            <label class="field-label">Nombre del Supervisor <span class="required">*</span></label>
                            <q-input v-model="formData.nombreSupervisor" outlined dense
                                placeholder="Nombre completo del supervisor" color="green-9" bg-color="grey-1" />
                        </div>
                    </div>

                    <div>
                        <p class="subsection-title">Ambiente de Formación</p>
                        <div class="form-grid col-2">
                            <div class="field-group">
                                <label class="field-label">Nombre del Ambiente <span class="required">*</span></label>
                                <q-input v-model="formData.nombreAmbiente" outlined dense
                                    placeholder="Nombre del ambiente" color="green-9" bg-color="grey-1" />
                            </div>
                            <div class="field-group">
                                <label class="field-label">Dirección del Ambiente</label>
                                <q-input v-model="formData.dirAmbiente" outlined dense
                                    placeholder="Dirección del ambiente de formación" color="green-9"
                                    bg-color="grey-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <q-icon name="calendar_month" size="18px" />
                        <h2 class="q-mb-none">Programación de la Ficha</h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <span style="font-size:11px;opacity:0.75;">{{ sesiones.length }} / {{ maxSesiones }}
                            sesiones</span>
                        <button class="btn-ses" @click="agregarSesion" :disabled="sesiones.length >= maxSesiones">
                            <q-icon name="add" size="16px" /> Agregar sesión
                        </button>
                        <button class="btn-ses btn-ses-max" @click="completarMax">
                            <q-icon name="expand" size="16px" /> MAX (50)
                        </button>
                    </div>
                </div>
                <div class="section-body" style="padding:0;">
                    <table class="prog-table">
                        <thead>
                            <tr>
                                <th style="width:52px;">N°</th>
                                <th>Fecha</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th style="width:70px;">Horas</th>
                                <th style="width:42px;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sesion, index) in sesiones" :key="sesion.id">
                                <td class="session-num">{{ index + 1 }}</td>
                                <td><input type="date" v-model="sesion.fecha" class="prog-input" /></td>
                                <td><input type="time" v-model="sesion.inicio" class="prog-input" /></td>
                                <td><input type="time" v-model="sesion.fin" class="prog-input" /></td>
                                <td class="horas-calc">{{ calcularHoras(sesion) }}</td>
                                <td style="text-align:center;">
                                    <button class="btn-del-ses" @click="eliminarSesion(index)" title="Eliminar">
                                        <q-icon name="close" size="16px" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr class="total-horas-row">
                                <td colspan="4"
                                    style="text-align:right;padding-right:18px;letter-spacing:2px;font-size:11px;">TOTAL
                                    HORAS PROGRAMADAS</td>
                                <td style="text-align:center;">{{ totalHorasProg
                                }}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <q-icon name="draw" size="18px" />
                    <h2>Firmas de Aprobación</h2>
                </div>
                <div class="section-body">
                    <div class="firmas-grid">
                        <div class="firma-box">
                            <div class="firma-placeholder">
                                <q-icon name="draw" size="32px" color="grey-5" />
                                <span style="font-size:12px;color:#A0AEC0;margin-top:6px;">Espacio para firma</span>
                            </div>
                            <div class="firma-divider"></div>
                            <div class="firma-label">Firma del Coordinador Académico</div>
                        </div>

                        <div class="firma-box">
                            <div class="firma-placeholder">
                                <q-icon name="draw" size="32px" color="grey-5" />
                                <span style="font-size:12px;color:#A0AEC0;margin-top:6px;">Espacio para firma</span>
                            </div>
                            <div class="firma-divider"></div>
                            <div class="firma-label">Firma del Instructor</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button class="btn btn-outline" @click="limpiarFormulario">
                    <q-icon name="refresh" size="18px" /> Limpiar
                </button>
                <button class="btn btn-primary" @click="guardarFormulario">
                    <q-icon name="save" size="18px" /> Guardar Solicitud
                </button>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- ESTADO BÁSICO DEL FORMULARIO ---
const getInitialForm = () => ({
    fechaSolicitud: new Date().toISOString().split('T')[0],
    codigoCurso: '', nombreCurso: '', version: '', duracionHoras: null,
    fechaInicio: '', fechaTerminacion: '', numAprendices: null, municipio: '', vereda: '',
    direccionCurso: '', tipoProg: 'ATENCION_INSTITUCIONES', idCampesena: '',
    nombreEmpresa: '', nit: '', contactoNombre: '', contactoTel: '',
    tipoPoblacion: null, nombreInstructor: '', cedulaInstructor: '', telInstructor: '',
    correoInstructor: '', nombreSupervisor: '', nombreAmbiente: '', dirAmbiente: '',
    requisitos: []
})

const formData = ref(getInitialForm())

const poblacionOptions = [
    'Población general', 'Comunidades campesinas', 'Población víctima del conflicto',
    'Personas con discapacidad', 'Comunidades indígenas', 'Afrocolombianos',
    'Privados de la libertad', 'Adulto mayor', 'Jóvenes en acción', 'Otro'
]

// --- LÓGICA DE SESIONES (LA ÚNICA FUNCIONALIDAD ACTIVA) ---
const maxSesiones = 50
let sessionCounterId = 0
const generarSesionesIniciales = (cantidad) => {
    return Array.from({ length: cantidad }, () => ({
        id: sessionCounterId++, fecha: '', inicio: '', fin: ''
    }))
}

const sesiones = ref(generarSesionesIniciales(5))

const agregarSesion = () => {
    if (sesiones.value.length < maxSesiones) {
        sesiones.value.push({ id: sessionCounterId++, fecha: '', inicio: '', fin: '' })
    }
}

// --- LÓGICA DE REQUISITOS ---
const agregarRequisitoManual = () => {
    formData.value.requisitos.push({ nombre: 'Otro requisito', observacion: '' })
}

const eliminarRequisito = (index) => {
    formData.value.requisitos.splice(index, 1)
}

const eliminarSesion = (index) => {
    sesiones.value.splice(index, 1)
}

const completarMax = () => {
    const faltan = maxSesiones - sesiones.value.length
    for (let i = 0; i < faltan; i++) agregarSesion()
}

const calcularHoras = (sesion) => {
    if (sesion.inicio && sesion.fin) {
        const [hi, mi] = sesion.inicio.split(':').map(Number)
        const [hf, mf] = sesion.fin.split(':').map(Number)
        const diff = (hf * 60 + mf) - (hi * 60 + mi)
        return diff > 0 ? `${Math.floor(diff / 60)}:${String(diff % 60).padStart(2, '0')}` : '—'
    }
    return '—'
}

const totalHorasProg = computed(() => {
    let totalMin = 0
    sesiones.value.forEach(sesion => {
        if (sesion.inicio && sesion.fin) {
            const [hi, mi] = sesion.inicio.split(':').map(Number)
            const [hf, mf] = sesion.fin.split(':').map(Number)
            const diff = (hf * 60 + mf) - (hi * 60 + mi)
            if (diff > 0) totalMin += diff
        }
    })
    return `${Math.floor(totalMin / 60)}:${String(totalMin % 60).padStart(2, '0')}`
})

// --- FUNCIONES BÁSICAS DE BOTONES ---
const limpiarFormulario = () => {
    formData.value = getInitialForm()
    sesiones.value = generarSesionesIniciales(5)
}

const guardarFormulario = () => {
    console.log('Datos actuales:', formData.value, sesiones.value)
    alert('Maquetado listo. Botón guardar presionado.')
}

// --- FUNCIÓN PARA AUTOCOMPLETAR DESDE EL CATÁLOGO ---
const fillFromCatalogo = (course) => {
    if (!course) return
    
    formData.value.codigoCurso = course.COD_VER || ''
    formData.value.nombreCurso = course.PRF_DENOMINACION || ''
    formData.value.duracionHoras = Number(course.PRF_DURACION_MAXIMA) || null
    
    // Extraer versión
    const versionMatch = course.COD_VER?.match(/V(\d+)/i)
    formData.value.version = versionMatch ? versionMatch[1] : '1'

    // Procesar Requisitos: El contenido va a la columna OBSERVACIÓN
    if (course.PRF_DESCRIPCION_REQUISITO) {
        const lineas = course.PRF_DESCRIPCION_REQUISITO.split(/\n||\t/).filter(l => l.trim().length > 2)
        
        formData.value.requisitos = lineas.map(texto => ({
            nombre: 'Requisito de ingreso', 
            observacion: texto.trim().replace(/^[\s\u2022\u00b7\u25cf\u25cb\u25aa\u25ab\u25b6\u27a2\u27a4\u27b2\u27b5\u27b8\u27ba\u27bc\u27be\u27c0\u27c2\u27c4\u27c6\u27c8\u27ca\u27cc\u27ce\u27d0\u27d2\u27d4\u27d6\u27d8\u27da\u27dc\u27de\u27e0\u27e2\u27e4\u27e6\u27e8\u27ea\u27ec\u27ee\u27f0\u27f2\u27f4\u27f6\u27f8\u27fa\u27fc\u27fe\u2800]+/, '').trim()
        }))
    } else {
        formData.value.requisitos = [{ nombre: 'Requisito General', observacion: 'Sin requisitos específicos en catálogo' }]
    }
    
    console.log('Formulario actualizado con datos de:', course.PRF_DENOMINACION)
}

defineExpose({
    fillFromCatalogo
})
</script>

<style scoped>
.sena-page {
    padding: 20px 0 0 0;
}

:root {
    --sena-green: #00703C;
    --sena-green-dark: #004D2A;
    --sena-green-light: #E8F5EE;
    --sena-accent: #FFD100;
    --sena-gray: #4A5568;
    --sena-light: #F7F9FC;
    --sena-border: #CBD5E0;
    --section-radius: 10px;
}

.sena-logo {
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    color: var(--sena-green-dark, #004D2A);
    letter-spacing: -1px;
    flex-shrink: 0;
    border: 2px solid var(--sena-accent, #FFD100);
}

.header-titles {
    line-height: 1.3;
}

.header-titles .entity {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 4px;
}

.header-titles .title {
    font-size: 20px;
    font-weight: 700;
    color: white;
}

.header-titles .subtitle {
    font-size: 12px;
    color: var(--sena-accent, #FFD100);
    font-weight: 500;
    margin-top: 2px;
    letter-spacing: 0.5px;
}

.header-badge {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 8px 14px;
    text-align: right;
    flex-shrink: 0;
}

.header-badge .badge-label {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
}

.header-badge .badge-code {
    font-size: 13px;
    color: var(--sena-accent, #FFD100);
    font-weight: 600;
}

.form-container {
    width: 100%;
    max-width: 100%;
    padding: 40px 20px 40px 20px;
}

.fecha-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    background: white;
    border: 1px solid var(--sena-border, #CBD5E0);
    border-radius: var(--section-radius, 10px);
    padding: 14px 24px;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    width: 100%;
}

.fecha-bar label {
    font-size: 13px;
    font-weight: 600;
    color: var(--sena-gray, #4A5568);
}

.section-card {
    background: white;
    border: 1px solid var(--sena-border, #CBD5E0);
    border-radius: var(--section-radius, 10px);
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    width: 100%;
}

.section-header {
    background: var(--sena-green, #00703C);
    color: white;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-header h2 {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin: 0;
}

.section-body {
    padding: 24px;
}

.form-grid {
    display: grid;
    gap: 18px;
}

.col-1 {
    grid-template-columns: 1fr;
}

.col-2 {
    grid-template-columns: 1fr 1fr;
}

.col-3 {
    grid-template-columns: 1fr 1fr 1fr;
}

.col-2-1 {
    grid-template-columns: 2fr 1fr;
}

.col-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.span-2 {
    grid-column: span 2;
}

.span-full {
    grid-column: 1 / -1;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.field-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--sena-gray, #4A5568);
    letter-spacing: 0.6px;
    text-transform: uppercase;
}

.field-label .required {
    color: #E53E3E;
    margin-left: 2px;
}

.subsection-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--sena-green, #00703C);
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--sena-border, #CBD5E0);
}

.tipo-programa-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.tipo-card {
    border: 1.5px solid var(--sena-border, #CBD5E0);
    border-radius: 8px;
    padding: 8px 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #FAFBFC;
}

.tipo-card:hover {
    border-color: var(--sena-green, #00703C);
}

.tipo-card.selected {
    border-color: var(--sena-green, #00703C);
    background: var(--sena-green-light, #E8F5EE);
}

.tipo-card label {
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    color: #2D3748;
    margin: 0;
}

.req-table,
.prog-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.req-table th {
    background: var(--sena-green-light, #E8F5EE);
    color: var(--sena-green-dark, #004D2A);
    font-weight: 700;
    font-size: 11px;
    padding: 10px;
    text-align: left;
    border-bottom: 2px solid var(--sena-green, #00703C);
}

.req-table td {
    padding: 10px;
    border-bottom: 1px solid #EDF2F7;
}

.prog-table th {
    background: var(--sena-green-dark, #004D2A);
    color: white;
    font-weight: 600;
    font-size: 11px;
    padding: 10px;
    text-align: center;
}

.prog-table td {
    padding: 6px;
    border: 1px solid #E2E8F0;
    text-align: center;
}

.prog-table tr:nth-child(even) td {
    background: #F7FFF9;
}

.session-num {
    font-weight: 600;
    font-size: 12px;
    color: var(--sena-green-dark, #004D2A);
    background: var(--sena-green-light, #E8F5EE);
    width: 36px;
}

.prog-input {
    border: 1px solid var(--sena-border, #CBD5E0);
    border-radius: 4px;
    padding: 4px 6px;
    font-size: 12px;
    width: 100%;
    outline: none;
}

.prog-input:focus {
    border-color: var(--sena-green, #00703C);
}

.horas-calc {
    font-size: 12px;
    font-weight: 600;
    color: var(--sena-green-dark, #004D2A);
    background: var(--sena-green-light, #E8F5EE);
}

.total-horas-row td {
    background: var(--sena-green-dark, #004D2A) !important;
    color: white;
    font-weight: 700;
    font-size: 12px;
}

.btn-ses {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.15);
    color: white;
}

.btn-ses:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.btn-ses-max {
    background: rgba(255, 209, 0, 0.25);
    border-color: rgba(255, 209, 0, 0.5);
    color: var(--sena-accent, #FFD100);
}

.btn-del-ses {
    background: none;
    border: none;
    color: #FC8181;
    cursor: pointer;
    padding: 2px;
}

.firmas-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.firma-box {
    border: 1.5px dashed var(--sena-border, #CBD5E0);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background: #FAFBFC;
}

.firma-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80px;
    border-radius: 8px;
    background: #FAFBFC;
}

.firma-divider {
    height: 2px;
    background: var(--sena-gray, #4A5568);
    margin: 14px 0 10px;
    opacity: 0.3;
}

.firma-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--sena-gray, #4A5568);
}

.req-note {
    background: #FFFBEB;
    border: 1px solid #F6C90E;
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 12px;
    color: #744210;
    margin-top: 14px;
    display: flex;
    gap: 8px;
}

.form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding: 24px 0 0;
    max-width: 1600px;
    margin: 0 auto;
}

/* Para pantallas muy grandes, limitar el ancho del contenido para mejor legibilidad */
@media (min-width: 1600px) {
    .form-container {
        max-width: 1600px;
        margin: 0 auto;
    }

    .section-card {
        max-width: 100%;
    }
}

.btn {
    padding: 12px 28px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
}

.btn-outline {
    background: white;
    border: 1.5px solid var(--sena-border, #CBD5E0);
    color: var(--sena-gray, #4A5568);
}

.btn-primary {
    background: var(--sena-green, #00703C);
    color: white;
}

@media (max-width: 768px) {
    .sena-page {
        padding: 10px 0 0 0;
    }

    .form-container {
        padding: 20px 10px 20px 10px;
    }

    .col-2,
    .col-3,
    .col-4,
    .col-2-1 {
        grid-template-columns: 1fr;
    }

    .span-2,
    .span-full {
        grid-column: 1;
    }

    .tipo-programa-grid,
    .firmas-grid {
        grid-template-columns: 1fr;
    }

    .header-inner {
        flex-wrap: wrap;
    }
}

@media (min-width: 769px) and (max-width: 1200px) {
    .form-container {
        padding: 30px 15px 30px 15px;
    }
}

@media (min-width: 1201px) {
    .form-container {
        padding: 40px 20px 40px 20px;
    }
}

@media print {

    .sena-header,
    .form-actions,
    .btn-ses,
    .btn-del-ses {
        display: none !important;
    }

    .form-container {
        margin: 0;
        padding: 0;
        max-width: 100%;
    }

    .section-card {
        box-shadow: none;
        border: 1px solid #000;
        break-inside: avoid;
    }
}
</style>