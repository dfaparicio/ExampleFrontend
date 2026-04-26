<template>
  <q-page>
    <!-- Header con logo SENA -->
    <q-header class="home-header">
      <q-toolbar>
        <img :src="LogoBlanco" alt="SENA" class="home-logo" />
      </q-toolbar>
    </q-header>

    <!-- Botón de atrás debajo del escudo (solo en paso 1) -->
    <div v-if="step === 1" class="back-button-container">
      <q-btn round icon="arrow_back" class="bg-green-9 text-white" size="md" @click="router.push('/')" />
    </div>

    <!-- Contenedor centrado del formulario -->
    <div class="login-body">
      <div class="login-container">
        <q-card class="login-card">
          <!-- Paso 1: Ingresar email -->
          <template v-if="step === 1">


            <!-- Header del card con avatar y título -->
            <div class="login-card-header">
              <!-- <div class="login-avatar">
                <q-icon name="account_circle" size="48px" />
              </div> -->
              <h2 class="login-title">REPFORA COMPLEMENTARIAS</h2>
              <!-- <p class="login-subtitle">Ingresa tu correo para continuar</p> -->
            </div>

            <div class="login-card-header2">
              <div>
                <img :src="Logo" alt="">
              </div>
              <div class="login-title2">
                <h4>LOGIN</h4>
              </div>
            </div>

            <q-separator color="grey-3" style="height: 1px;" />

            <!-- Formulario de email -->
            <div class="login-card-body">
              <q-form @submit.prevent="step = 2" class="login-form">
                <q-input v-model="email" type="email" label="Correo Electrónico" outlined dense color="green-9" class="email-input" />
                <q-btn type="submit" class="login-btn style-btn" label="Enviar código" unelevated no-caps />
              </q-form>
            </div>
          </template>

          <!-- Paso 2: Verificar código -->
          <template v-else-if="step === 2">
            <!-- Header del card con avatar y título -->
            <div class="login-card-header">
              <h2 class="login-title">REPFORA COMPLEMENTARIAS</h2>
            </div>

            <div class="login-card-header2">
              <div>
                <img :src="Logo" alt="">
              </div>
              <div class="login-title2">
                <h4>VERIFICAR CÓDIGO</h4>
              </div>
            </div>

            <q-separator color="grey-3" style="height: 1px;" />

            <!-- Formulario de verificación -->
            <div class="login-card-body">
              <q-form @submit.prevent="router.push('/register')" class="login-form">
                <div class="code-inputs">
                  <input v-for="(digit, index) in 6" :key="index" v-model="codeDigits[index]" type="text"
                    inputmode="numeric" maxlength="1" class="code-digit" @input="onDigitInput($event, index)"
                    @keydown="onDigitKeydown($event, index)" />
                </div>

                <q-btn type="submit" class="login-btn style-btn" label="Verificar" unelevated no-caps />

                <div class="login-buttons-secondary">
                  <q-btn flat class="login-btn-secondary" label="Reenviar código" no-caps />
                  <q-btn flat class="login-btn-secondary" label="Volver al inicio" no-caps @click="step = 1" />
                </div>
              </q-form>
            </div>
          </template>
        </q-card>

        <!-- Indicador de seguridad -->
        <div class="login-secure">
          <q-icon name="lock" size="18px" />
          <span>Acceso seguro y encriptado</span>
        </div>
      </div>
    </div>

    <!-- Footer con copyright -->
    <q-footer class="home-footer">
      <div class="home-footer-text">
        REPFORA - SENA 2026 © Todos los derechos reservados
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoBlanco from '../assets/LogoBlanco.png'
import Logo from '../assets/Logo.png'

const router = useRouter()
const email = ref('')
const step = ref(1)
const codeDigits = ref(['', '', '', '', '', ''])

function onDigitInput(event, index) {
  const value = event.target.value
  if (value.length === 1 && index < 5) {
    const nextInput = event.target.nextElementSibling
    if (nextInput) nextInput.focus()
  }
}

function onDigitKeydown(event, index) {
  if (event.key === 'Backspace' && !event.target.value && index > 0) {
    const prevInput = event.target.previousElementSibling
    if (prevInput) prevInput.focus()
  }
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

/* ── Botón de atrás debajo del escudo ── */
.back-button-container {
  padding: 16px 24px 0;
}

.login-body {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
}

.login-container {
  width: 100%;
  max-width: 440px;
}

.login-card {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.login-card-header {
  background-color: var(--color_header);
  color: var(--color_text_card);
  text-align: center;
  padding: 20px 20px;
}

.login-card-header2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0 30px 0;
  gap: 30px;
}

.login-card-header2 img {
  height: 120px;
}

.login-title2 h4 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

.login-avatar {
  width: 72px;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.login-avatar .q-icon {
  font-size: 48px;
  color: white;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: white;
  line-height: 1.2;
}

.login-subtitle {
  font-size: 16px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

.login-card-body {
  padding: 24px;
}

.login-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color_button_closed);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-btn {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: var(--color_button);
  color: var(--color_text_button);
}

.login-btn-secondary {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
}

.login-buttons-secondary {
  display: flex;
  gap: 12px;
}

.login-buttons-secondary .login-btn-secondary {
  width: 50%;
}

.code-inputs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 8px 0 16px 0;
}

.code-digit {
  width: 48px;
  height: 56px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  color: var(--color_button_closed);
}

.code-digit:focus {
  border-color: var(--color_input);
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15);
}

.login-secure {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  color: var(--color_button_closed);
  opacity: 0.8;
  font-size: 0.875rem;
  font-weight: 500;
}

.login-secure .q-icon {
  font-size: 18px;
}

.home-footer {
  background-color: var(--color_tooltip);
  padding: 12px 0;
  height: 50px;
}

.home-footer-text {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color_button_closed);
}

.email-input :deep(.q-field__control) {
  height: 50px;
}

.email-input :deep(.q-field__label) {
  font-size: 16px;
  padding: 5px 0 0 0 ;
}
</style>
