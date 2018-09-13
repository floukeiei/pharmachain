<template>
  <div class="home">
    <HistoryAll />
  </div>
</template>

<script>
// @ is an alias to /src
import HistoryAll from '@/components/HistoryAll.vue'

export default {
  name: 'home',
  components: {
    HistoryAll
  }
}
</script>
