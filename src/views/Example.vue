<template>
  <form @submit.prevent="submit">
    <input type="email"
      placeholder="What's your email"
      v-model="email"
      :class="{ error: $v.email.$error }"
      @blur="$v.email.$touch()" />

    <!-- 欄位有輸入過，且不符合規則 error 才會變 true ($dirty + $invalid = $error) -->
    <!-- 觸發 $touch(), $dirty 屬性才會變成 true (表示有輸入過, 變髒了) -->
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">Please enter a valid email</p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
    <button :disabled="$v.$invalid" type="submit">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">Please fill out the required fields</p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('submit')
      }
    }
  }
}
</script>
