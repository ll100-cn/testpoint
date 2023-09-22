<template>
  <div class="dropdown dropdown-no-arrow">
    <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown">
      <i class="far fa-ellipsis-h"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-end">
      <slot />
    </div>
  </div>
</template>