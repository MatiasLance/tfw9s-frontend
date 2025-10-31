export default {
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0]
      this.processFile(file)
    },
    
    handleFileDrop(event) {
      event.preventDefault()
      this.dragOver = false
      
      const file = event.dataTransfer.files[0]
      this.processFile(file)
    },
    
    processFile(file) {
      this.form.photo = null
      this.photoPreview = null
      this.errors.photo = ''
      
      if (!file) return
      
      if (!file.type.startsWith('image/')) {
        this.errors.photo = 'Please select an image file'
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        this.errors.photo = 'File size must be less than 5MB'
        return
      }
      
      this.form.photo = file
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.photoPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    
    removePhoto() {
      this.form.photo = null
      this.photoPreview = null
      this.$refs.fileInput.value = ''
    },
  }
}