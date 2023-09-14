<template>
  <div v-if="status == '403'">
    <div class="z-block-empty">
      <h3 class="text-danger">无法访问</h3>
      <p><small>拒绝授权访问</small></p>
      <a class="text-primary text-center" role="button" @click="redirect('/dashboard')">返回首页</a>
    </div>
  </div>
  <div v-else-if="status == '401'">
    <div class="z-block-empty">
      <h3 class="text-danger">无法访问</h3>
      <p><small>身份验证失败</small></p>
      <a class="text-primary text-center" role="button" @click="redirect('/sign_in')">重新登陆</a>
    </div>
  </div>
  <div v-else>
    <div class="z-block-empty">
      <h3 class="text-danger">未知错误</h3>
      <a class="text-primary text-center" role="button" @click="redirect('/dashboard')">返回首页</a>
    </div>
    <p v-if="ERROR_MESSAGE" class="d-inline-flex gap-1">
      <a class="btn btn-link btn-sm" data-bs-toggle="collapse" href="#errorMessage" role="button" aria-expanded="false" aria-controls="collapseExample">
        详细信息
      </a>
    </p>
    <div id="errorMessage" class="collapse">
      <div class="card card-body">
        <p class="text-danger px-5">
          {{ ERROR_MESSAGE }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useSessionStore } from "@/store/session"
import { redirect } from "@/lib/utils"

const route = useRoute()
const store = useSessionStore()

const { error } = store
const { status } = route.query

const ERROR_MESSAGE = computed(() => {
  console.log(error)
  return error instanceof Error ? error.stack : error
})

</script>
