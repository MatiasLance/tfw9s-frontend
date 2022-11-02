export default {
  data() {
    return { max14chars: v => v.length <= 14 || 'Make it shorter!' }
  }
}