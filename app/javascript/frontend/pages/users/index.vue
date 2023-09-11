<template>
  <div class="page-header">
    <h2>成员列表</h2>

    <div class="page-actions ms-auto">
      <router-link to="/users/new" class="btn btn-primary">新增成员</router-link>
    </div>
  </div>

  <div class="card card-x-table">
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
              <td class="x-actions text-end">
                <router-link :to="`/users/${user.id}/edit`"><i class="far fa-pencil-alt" /> 修改</router-link>
                <a href="#" @click.prevent="onRemove(user.id)"><i class="far fa-trash-alt" /> 删除</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <PaginationBar2 class="mb-0 mt-2" :pagination="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as requests from '@/requests'
import { getCurrentInstance, reactive, ref } from 'vue'
import PaginationBar2 from '@/components/PaginationBar2.vue'
import Validations from '@/components/simple_form/Validations';
import { useRouter } from 'vue-router';

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const validations = reactive<Validations>(new Validations())

const users = ref(await new requests.UserPaginationList().setup(proxy).perform())

async function onRemove(user_id) {
  if (!confirm("是否删除用户？")) {
    return
  }

  try {
    await new requests.UserDestroy().setup(proxy, (req) => {
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