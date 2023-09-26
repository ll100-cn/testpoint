<template>
  <div class="page-header">
    <h2>用户列表</h2>
    <router-link to="/projects" class="ms-3">项目</router-link>

    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link to="/users/new" class="btn btn-primary">新增用户</router-link>
    </div>
  </div>

  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>邮箱</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user in users.list">
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link :to="`/users/${user.id}/edit`"><i class="far fa-pencil-alt" /> 修改</router-link>
                  <a href="#" @click.prevent="onRemove(user.id)"><i class="far fa-trash-alt" /> 删除</a>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <PaginationBar :pagination="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { getCurrentInstance, reactive, ref } from 'vue'
import PaginationBar from '@/components/PaginationBar.vue'
import Validations from '@/components/simple_form/Validations';
import { useRouter } from 'vue-router';

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const validations = reactive<Validations>(new Validations())

const users = ref(await new q.admin.UserReq.Page().setup(proxy).perform())

async function onRemove(user_id) {
  if (!confirm("是否删除用户？")) {
    return
  }

  try {
    await new q.admin.UserReq.Destroy().setup(proxy, (req) => {
      req.interpolations.id = user_id
    }).perform()

    router.go(0)
  } catch (error) {
    if (validations.handleError(error)) {
      alert(validations.avaliableFullMessages().join("\n"))
      return
    }

    throw error
  }
}
</script>