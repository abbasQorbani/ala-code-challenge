<template>
  <q-card class="my-card col-md-6 col-xs-10">
    <q-card-section class="bg-primary text-white q-mb-sm">
      <div class="text-h6">Login</div>
      <div class="text-subtitle2">Fill the form with wanted data</div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="center" class="col-12">
      <q-form
        align="center"
        class="col-12"
        ref="form"
        autofocus
        @submit="loginUser()"
      >
        <q-input
          filled
          class="q-mb-md"
          v-model="phoneNumber"
          label="Your phone number *"
          lazy-rules
          :rules="[
            (val) =>
              validatePhoneNumber(val) || 'Please insert your phone number',
          ]"
          name="phone number"
        />
        <q-input
          filled
          class="q-mb-md"
          v-model="nationalCode"
          label="Your national code *"
          lazy-rules
          :rules="[
            (val) =>
              validateNationalCode(val) || 'Please insert your national code',
          ]"
          name="national code"
        />
        <q-btn
          outline
          class="q-mb-md"
          color="primary"
          padding="xs lg"
          label="Login"
          type="submit"
          :loading="loginStore.loading"
        ></q-btn>
      </q-form>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import {
  validatePhoneNumber,
  validateNationalCode,
} from '../../utils/regex.util';
import { useLoginStore } from 'stores/login';
import { QForm, useQuasar } from 'quasar';
const loginStore = useLoginStore();
const quasarInstance = useQuasar();
const form: Ref<QForm | null> = ref(null);
const phoneNumber: Ref<string> = ref('');
const nationalCode: Ref<string> = ref('');

async function loginUser(): Promise<void> {
  await (form.value as QForm).validate().then(async (response) => {
    if (response) {
      loginStore.setLoginData(phoneNumber.value, nationalCode.value);
      await loginStore.login();
      if (loginStore.hasError) {
        quasarInstance.notify({
          progress: true,
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Something went wrong, please contact support',
        });
      } else {
        quasarInstance.notify({
          progress: true,
          color: 'primary',
          textColor: 'white',
          message: 'Welcome',
        });
      }
    }
  });
}
</script>
<!-- 09216053835 -->
<!-- 0311091581 -->
