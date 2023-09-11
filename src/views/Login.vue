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
                  email或密碼錯誤
                  </v-alert>
                  <v-alert v-show="captchaFail" type="error" class="mb-4" data-test="loginAlert">
                  驗證碼輸入錯誤
                  </v-alert>
                  <v-text-field v-model="formData.email" :rules="emailRules" label="Email" required data-test="email"></v-text-field>
                  <v-text-field v-model="formData.password" :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                  :type="pwShow ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="pwShow = !pwShow"
                  data-test="password"></v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="formData.inpcaptcha" label="請輸入驗證碼,區分大小寫" required></v-text-field>
                  <canvas ref="domRef" width="152" height="40" class="cursor-pointer" @click="getImgCode"></canvas>
                  <v-btn x-large block :disabled="!valid" color="pink-accent-1" @click="login" data-test="loginBtn">
                  Login
                  </v-btn>
              </v-form>
          </v-container>
      </v-card>
  </div>
</template>
<script setup>
import { ref, reactive ,onMounted } from "vue";
import router from "@/router";
const valid = ref(true);
const pwShow = ref(false);
const loginFail = ref(false);
const captchaFail = ref(false);
const domRef = ref(null);
const formData = reactive({
    email: "",
    password: "",
    captcha: "",
    inpcaptcha:"",
});

//E-mail驗證
const emailRules = [
    (v) => !!v || "Required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

//密碼驗證
const rules = {
    required: (value) => !!value || "Required",
    min: (v) => (v && v.length >= 6) || "Min 6 characters",
};

//登入
const login = () => {
  if (formData.inpcaptcha === formData.captcha) {
    captchaFail.value = false;
    if (formData.email === "admin@gmail.com" && formData.password === "123456") {
      loginFail.value = false;
      setCookie("authToken", "your-auth-token-value", 1);
      router.push("/");
    } else {
      loginFail.value = true;
    }
  }else {
    captchaFail.value = true;
  }
};

//Cookie設定
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
};

//繪製驗證碼
const getImgCode = () => {
  if (domRef.value) {
    const canvas = domRef.value;
    const ctx = canvas.getContext("2d");
      // 清空Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "24px Arial"; // 字體字號
  ctx.fillStyle = "black"; // 顏色

  // 生成隨機英數字
  const captchaText = generateCaptchaText(); // 你需要实现一个生成验证码文本的函数

  // 将验证码文本绘制在Canvas上
  ctx.fillText(captchaText, 20, 30);

  // 生成干擾線
  drawRandomLines(ctx, canvas.width, canvas.height);
  };
}
const generateCaptchaText = () => {
  // 生成6個隨機英數字
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters.charAt(randomIndex);
    formData.captcha = captcha;
  }
  console.log(formData.captcha)
  return captcha;
};
//繪製干擾線
const drawRandomLines = (ctx, width, height) => {
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.strokeStyle = "gray";
    ctx.stroke();
  }
};
onMounted(() => {
  getImgCode();
});
</script>