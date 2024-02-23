<script setup>
import { ref } from 'vue'

const newPassword = ref({
  password1: '',
  password2: '',
});

const onSubmit = () => {
  console.log("Login data:", newPassword.value);
};

const onReset = () => {
  newPassword.value.password1 = '';
  newPassword.value.password2 = '';
};
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-sm bg-grey-3" style="width: 400px;">
          <q-card-section class="bg-primary" style="border-radius: inherit">
            <div class="text-h6 text-center text-white">New Password</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input filled  v-model="newPassword.password1" label="New password" />
              <q-input filled  v-model="newPassword.password2" label="Password" type="password" />
              <div class="q-mt-lg flex flex-center">
                <q-btn   label="save"  color="primary"/>
                <q-btn  class="q-ml-lg justify-end" label="back" outline color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

