<template>
  <v-row justify="center" align="center">
    <v-col cols="8" sm="6" md="1">
      <v-card>
        <img src="@/static/1.png"/>
      </v-card>
    </v-col>
  </v-row>
  <div class="d-flex align-center flex-column">
      <v-card width="400">
          <v-container>
              <v-form v-model="valid" lazy-validation>
                  <v-alert v-show="loginFail" type="error" class="mb-4" data-test="loginAlert">
                  You are entering an incorrect email and/or password.
                  </v-alert>
                  <v-text-field v-model="formData.email" :rules="emailRules" label="Email" required data-test="email"></v-text-field>
                  <v-text-field v-model="formData.password" :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                  :type="pwShow ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="pwShow = !pwShow"
                  data-test="password"></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn x-large block :disabled="!valid" color="pink-accent-1" @click="login" data-test="loginBtn">
                  Login
                  </v-btn>
              </v-form>
          </v-container>
      </v-card>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import router from "@/router";
const valid = ref(true);
const pwShow = ref(false);
const loginFail = ref(false);
const formData = reactive({
    email: "",
    password: "",
});
const emailRules = [
    (v) => !!v || "Required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
const rules = {
    required: (value) => !!value || "Required",
    min: (v) => (v && v.length >= 6) || "Min 6 characters",
};
const login = () => {
  if (formData.email === "admin@gmail.com" && formData.password === "123456") {
    setCookie("authToken", "your-auth-token-value", 1);
    router.push("/");
  } else {
    loginFail.value = true;
  }
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
};
</script>