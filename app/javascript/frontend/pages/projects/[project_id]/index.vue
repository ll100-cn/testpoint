<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const params = route.params as any

const project_id = params.project_id

router.push(`/projects/${project_id}/issues`)
</script>