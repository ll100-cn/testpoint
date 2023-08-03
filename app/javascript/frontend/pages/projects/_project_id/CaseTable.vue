<template>
  <div id="tp-main">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">标题</th>
          <th scope="col">平台</th>
          <th scope="col">标签</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="test_case in test_cases" :key="test_case.id">
          <td><a data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_cases/1?ok_url=%2Fprojects%2F1%2Ftest_cases" href="">{{ test_case.title }}</a></td>
          <td>
              <span class="badge" style="background-color: #932610; color: white;">Android</span>
              <span class="badge" style="background-color: #769C2A; color: white;">Web</span>
              <span class="badge" style="background-color: #10873A; color: white;">iOS</span>
          </td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { TestCase } from "@/models";

const props = defineProps({
  test_cases: {
    type: Array<TestCase>,
    required: true
  }
})
</script>