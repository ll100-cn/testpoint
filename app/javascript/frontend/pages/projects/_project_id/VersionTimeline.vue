<template>
  <div class="">
    <div class="mt-1">
      <h5 class="my-auto d-inline-block">版本号</h5>
      <a class="float-end small" data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_versions/new?ok_url=%2Fprojects%2F1%2Ftest_cases" href="#"><i class="fal fa-plus"></i> 新增</a>
    </div>

    <hr>

    <div class="">
      <ul class="timeline">
        <li class="timeline-item mb-5 ">
          <div class="small mb-2 text-muted">
            <a class="" href="/projects/1/test_cases?test_case_version_id=2">2023年05月01日 12:00</a>
          </div>

          <div class="dropdown">
            2023年第一季度开发计划
            <a id="version_test_case_version_2" class="small pl-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"><i class="far fa-cog"></i> 设置</a>
            <ul class="dropdown-menu" aria-labelledby="version_test_case_version_2">
              <li>
                <a data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_versions/2/edit?ok_url=%2Fprojects%2F1%2Ftest_cases" class="dropdown-item small" href="#"><i class="fal fa-edit"></i> 修改</a>
              </li>
              <li>
                <a data-confirm="确定要删除该版本号吗？" class="dropdown-item small" rel="nofollow" data-method="delete" href="/projects/1/test_case_versions/2"><i class="fal fa-trash"></i> 删除</a>
              </li>
            </ul>
          </div>

          <p class="text-muted">2023年 第一季度的开发计划，主要是拍照题的实现</p>
        </li>
        <li class="timeline-item mb-5 ">
          <div class="small mb-2 text-muted">
            <a class="" href="/projects/1/test_cases?test_case_version_id=3">2022年01月01日 12:00</a>
          </div>

          <div class="dropdown">
            2021年功能点
            <a id="version_test_case_version_3" class="small pl-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"><i class="far fa-cog"></i> 设置</a>
            <ul class="dropdown-menu" aria-labelledby="version_test_case_version_3">
              <li>
                <a data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_versions/3/edit?ok_url=%2Fprojects%2F1%2Ftest_cases" class="dropdown-item small" href="#"><i class="fal fa-edit"></i> 修改</a>
              </li>
              <li>
                <a data-confirm="确定要删除该版本号吗？" class="dropdown-item small" rel="nofollow" data-method="delete" href="/projects/1/test_case_versions/3"><i class="fal fa-trash"></i> 删除</a>
              </li>
            </ul>
          </div>

          <p class="text-muted">2022年前所有的功能点</p>
        </li>
        <li class="timeline-item mb-5 ">
          <div class="small mb-2 text-muted">
            <a class="" href="/projects/1/test_cases?test_case_version_id=4">2020年05月01日 12:00</a>
          </div>

          <div class="dropdown">
            旧版本需求
            <a id="version_test_case_version_4" class="small pl-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"><i class="far fa-cog"></i> 设置</a>
            <ul class="dropdown-menu" aria-labelledby="version_test_case_version_4">
              <li>
                <a data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_versions/4/edit?ok_url=%2Fprojects%2F1%2Ftest_cases" class="dropdown-item small" href="#"><i class="fal fa-edit"></i> 修改</a>
              </li>
              <li>
                <a data-confirm="确定要删除该版本号吗？" class="dropdown-item small" rel="nofollow" data-method="delete" href="/projects/1/test_case_versions/4"><i class="fal fa-trash"></i> 删除</a>
              </li>
            </ul>
          </div>

          <p class="text-muted">2020年5月份前的功能需求点</p>
        </li>
        <li class="timeline-item mb-5 ">
          <div class="small mb-2 text-muted">
            <a class="" href="/projects/1/test_cases?test_case_version_id=5">2017年12月01日 12:00</a>
          </div>

          <div class="dropdown">
            古版本
            <a id="version_test_case_version_5" class="small pl-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"><i class="far fa-cog"></i> 设置</a>
            <ul class="dropdown-menu" aria-labelledby="version_test_case_version_5">
              <li>
                <a data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_versions/5/edit?ok_url=%2Fprojects%2F1%2Ftest_cases" class="dropdown-item small" href="#"><i class="fal fa-edit"></i> 修改</a>
              </li>
              <li>
                <a data-confirm="确定要删除该版本号吗？" class="dropdown-item small" rel="nofollow" data-method="delete" href="/projects/1/test_case_versions/5"><i class="fal fa-trash"></i> 删除</a>
              </li>
            </ul>
          </div>

          <p class="text-muted">特别开始的版本</p>
        </li>
      </ul>
    </div>
  </div>
</template>