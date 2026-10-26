<template>
  <v-container class="login-page d-flex justify-center align-center" style="height: 100vh;">
    <v-card width="420" class="pa-6">
      <v-card-title class="text-h5 text-center mb-4">
         Login
      </v-card-title>

      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          variant="outlined"
          class="mb-3"
          prepend-inner-icon="mdi-email"
        />

        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          variant="outlined"
          class="mb-3"
          prepend-inner-icon="mdi-lock"
        />

        <v-btn
          color="primary"
          class="mt-2"
          block
          @click="handleLogin"
        >
          Login
        </v-btn>

        <div class="text-center mt-4">
          <RouterLink to="/register">Create a new account</RouterLink>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

async function handleLogin() {
  const payload = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post("http://localhost:7000/api/auth/login", payload);
    const res = response.data;

    if (res.success) {
      // ✅ เพิ่ม JWT: เก็บ Token ลง localStorage
      localStorage.setItem("token", res.token);
      // ✅ เก็บ Role ไว้ใช้ตรวจสิทธิ์ใน Router Guard
      localStorage.setItem("role", res.role);

      // ✅ Redirect ตาม Role
      if (res.role === "admin") {
        router.push("/admin");
      } else if (res.role === "evaluator") {
        router.push("/Assessor");
      } else if (res.role === "evaluatee") {
        router.push("/user");
      }
    } else {
      alert("ไม่พบผู้ใช้");
    }
  } catch (e) {
    console.log(e);
    alert("เข้าสู่ระบบไม่สำเร็จ");
  }
}
</script>
