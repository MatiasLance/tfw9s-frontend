export default {
  methods: {
    validateField(field) {
      this.errors[field] = ''
      
      switch (field) {          
      case 'firstName':
        if (!this.form.firstName.trim()) {
          this.errors.firstName = 'First name is required'
        } else if (this.form.firstName.trim().length < 2) {
          this.errors.firstName = 'First name must be at least 2 characters'
        }
        break
          
      case 'lastName':
        if (!this.form.lastName.trim()) {
          this.errors.lastName = 'Last name is required'
        } else if (this.form.lastName.trim().length < 2) {
          this.errors.lastName = 'Last name must be at least 2 characters'
        }
        break
          
      case 'dateOfBirth':
        if (!this.form.dateOfBirth) {
          this.errors.dateOfBirth = 'Date of birth is required'
        } else {
          const dob = new Date(this.form.dateOfBirth)
          const today = new Date()
          const minDate = new Date()
          minDate.setFullYear(today.getFullYear() - 100) // Max 100 years old
              
          if (dob > today) {
            this.errors.dateOfBirth = 'Date of birth cannot be in the future'
          } else if (dob < minDate) {
            this.errors.dateOfBirth = 'Please enter a valid date of birth'
          }
        }
        break

      case 'parentFirstName':
        if (!this.form.parentFirstName.trim()) {
          this.errors.parentFirstName = 'Parent first name is required'
        } else if (this.form.parentFirstName.trim().length < 2) {
          this.errors.parentFirstName = 'Parent first name must be at least 2 characters'
        }
        break

      case 'parentLastName':
        if (!this.form.parentLastName.trim()) {
          this.errors.parentLastName = 'Parent last name is required'
        } else if (this.form.parentLastName.trim().length < 2) {
          this.errors.parentLastName = 'Parent last name must be at least 2 characters'
        }
        break

      case 'parentContact':
        if (!this.form.parentContact.trim()) {
          this.errors.parentContact = 'Parent contact number is required'
        } else {
          const cleanPhone = this.form.parentContact.replace(/\D/g, '')
          let phoneToValidate = cleanPhone
          
          if (cleanPhone.startsWith('0')) {
            phoneToValidate = '61' + cleanPhone.substring(1)
          }
          
          const australianMobileRegex = /^61[4-5]\d{8}$/  // 61 + 4/5 + 8 digits
          const australianLandlineRegex = /^61[2-8]\d{8}$/ // 61 + 2-8 + 8 digits
          
          if (phoneToValidate.length < 9) {
            this.errors.parentContact = 'Please enter a valid Australian phone number'
          } else if (!australianMobileRegex.test(phoneToValidate) &&
          !australianLandlineRegex.test(phoneToValidate)) {
            this.errors.parentContact = 'Please enter a valid Australian mobile or landline number'
          }
        }
        break

      case 'parentEmail':
        if (!this.form.parentEmail.trim()) {
          this.errors.parentEmail = 'Parent email is required'
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(this.form.parentEmail)) {
            this.errors.parentEmail = 'Please enter a valid email address'
          }
        }
        break
      }
    }
  }
}