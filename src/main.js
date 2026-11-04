// Formulaire d'inscription : validation de l'email, message d'erreur, message de succès.
// Réf. : specs/specifications/newsletter-signup.md, ADR-0004.

const ERROR_MESSAGE = 'Valid email required'

const signup = document.getElementById('signup')
const form = signup.querySelector('form')
const email = form.elements.email
const error = document.getElementById('email-error')
const success = document.getElementById('success')
const successTitle = document.getElementById('success-title')
const successEmail = document.getElementById('success-email')
const dismiss = document.getElementById('dismiss')

function isValid() {
  email.value = email.value.trim()
  return email.checkValidity()
}

function showError() {
  email.setAttribute('aria-invalid', 'true')
  error.textContent = ERROR_MESSAGE
}

function clearError() {
  email.removeAttribute('aria-invalid')
  error.textContent = ''
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (!isValid()) {
    showError()
    email.focus()
    return
  }

  clearError()
  successEmail.textContent = email.value
  signup.hidden = true
  success.hidden = false
  successTitle.focus()
})

// après une erreur, on l'efface dès que la saisie devient valide (sans en afficher pendant la frappe)
email.addEventListener('input', () => {
  if (email.hasAttribute('aria-invalid') && email.checkValidity()) clearError()
})

dismiss.addEventListener('click', () => {
  form.reset()
  success.hidden = true
  signup.hidden = false
  email.focus()
})
