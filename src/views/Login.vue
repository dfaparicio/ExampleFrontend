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
      <div class="login-content-wrapper">
        <div class="login-container">
          <q-card class="login-card">
          <!-- Paso 1: Confirmar email -->
          <template v-if="step === 1">
            <div class="login-card-header">
              <h2 class="login-title">REPFORA COMPLEMENTARIAS</h2>
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

            <div class="login-card-body">
              <q-form @submit.prevent="step = 2" class="login-form">
                <div class="text-center q-mb-md">
                  <p class="text-grey-8 text-weight-medium">¿Confirma el envío del código a este correo?</p>
                  <div class="email-display q-pa-sm bg-grey-2 rounded-borders text-green-9 text-weight-bold">
                    {{ email }}
                  </div>
                </div>
                <q-btn type="submit" class="login-btn style-btn" label="Sí, enviar código" unelevated no-caps />
              </q-form>
            </div>
          </template>

          <!-- Paso 2: Verificar código -->
          <template v-else-if="step === 2">
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

        <div class="login-secure">
          <q-icon name="lock" size="18px" />
          <span>Acceso seguro y encriptado</span>
        </div>
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
const email = ref('usuario@sena.edu.co')
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
  padding: 10px 0;
}

.home-logo {
  height: clamp(35px, 5vh, 55px);
}

.back-button-container {
  padding: 16px clamp(16px, 3vw, 24px) 0;
}

.login-body {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0;
  overflow: hidden;
}

.login-content-wrapper {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px clamp(8px, 1.5vw, 15px);
  overflow-y: auto;
}

.login-container {
  width: 100%;
  max-width: 380px;
  flex-shrink: 0;
}

.login-card {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.login-card-header {
  background-color: var(--color_header);
  color: var(--color_text_card);
  text-align: center;
  padding: clamp(15px, 3vw, 25px) clamp(15px, 3vw, 25px);
}

.login-card-header2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: clamp(10px, 2vh, 25px);
  gap: clamp(8px, 1.5vw, 18px);
}

.login-card-header2 img {
  height: clamp(45px, 9vh, 90px);
  width: auto;
}

.login-title2 h4 {
  margin: 0;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 700;
  text-align: center;
}

.login-title {
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 700;
  margin: 0;
  color: white;
  line-height: 1.2;
}

.login-card-body {
  padding: clamp(22px, 2.5vw, 22px);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.5vw, 16px);
}

.email-display {
  border: 1px solid #e0e0e0;
  font-size: 1.1rem;
}

.login-btn {
  width: 100%;
  height: clamp(34px, 4vh, 42px);
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  font-weight: 600;
  border-radius: 8px;
  background-color: var(--color_button);
  color: var(--color_text_button);
}

.login-btn-secondary {
  width: 100%;
  height: clamp(36px, 5vh, 44px);
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 600;
  border-radius: 8px;
}

.login-buttons-secondary {
  display: flex;
  gap: clamp(8px, 2vw, 16px);
}

.login-buttons-secondary .login-btn-secondary {
  width: 50%;
}

.code-inputs {
  display: flex;
  justify-content: center;
  gap: clamp(6px, 1.5vw, 12px);
  margin: 8px 0 clamp(12px, 2vw, 20px) 0;
  padding: 0 clamp(4px, 1vw, 10px);
}

.code-digit {
  width: clamp(32px, 6.5vw, 48px);
  height: clamp(40px, 9vh, 56px);
  font-size: clamp(16px, 3.5vw, 24px);
  font-weight: 600;
  text-align: center;
  border: 2px solid #e0e0e0;
  border-radius: clamp(8px, 2vw, 12px);
  outline: none;
  transition: all 0.2s ease;
  color: var(--color_button_closed);
  padding: 0;
  box-sizing: border-box;
}

.code-digit:focus {
  border-color: var(--color_input);
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15);
}

.login-secure {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: clamp(15px, 2vw, 25px);
  color: var(--color_button_closed);
  opacity: 0.8;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: 500;
}

.home-footer {
  background-color: var(--color_tooltip);
  padding: clamp(6px, 0.8vh, 10px) 0;
  height: clamp(35px, 5vh, 45px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-footer-text {
  text-align: center;
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
  font-weight: 600;
  color: var(--color_button_closed);
}

@media (max-width: 768px) {
  .login-container {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .login-buttons-secondary {
    flex-direction: column;
  }
  .login-buttons-secondary .login-btn-secondary {
    width: 100%;
  }
}
</style>