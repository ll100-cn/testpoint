<template>
  <div v-if="(_.head(errors) instanceof ErrorAccessDenied)">
    <div class="z-block-empty">
      <h3 class="text-danger">无法访问</h3>
      <p><small>拒绝授权访问</small></p>
      <router-link to="/dashboard">返回首页</router-link>
    </div>
  </div>
  <div v-else-if="(_.head(errors) instanceof ErrorUnauthorized)">
    <div class="z-block-empty">
      <h3 class="text-danger">无法访问</h3>
      <p><small>身份验证失败</small></p>
      <router-link to="/login">重新登陆</router-link>
    </div>
  </div>
  <div v-else-if="errors.length > 0">
    <div class="z-block-empty">
      <h3 class="text-danger">未知错误</h3>
      <router-link to="/dashboard">返回首页</router-link>
    </div>
    <template v-if="is_dev">
      <div class="m-3">
        <a class="btn btn-link btn-sm" data-bs-toggle="collapse" href="#errorMessage" role="button" aria-expanded="false" aria-controls="collapseExample">
          详细信息
        </a>
        <div id="errorMessage" class="collapse show">
          <Card>
            <CardContent>
              <ul class="list-group list-group-flush">
                <li v-for="error in errors" :key="error" class="list-group-item text-danger">
                  {{ buildErrorMessage(error) }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ErrorAccessDenied, ErrorUnauthorized } from "@/lib/requests"
import { Card, CardContent } from '$ui/card'
import _ from "lodash"

const props = defineProps<{
  errors: any[]
}>()
const is_dev = import.meta.env.MODE === 'development'

function buildErrorMessage(error) {
  return error?.stack ?? error
}

</script>
