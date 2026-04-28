/**
 * Contact form module: client-side validation, fetch submission,
 * and status feedback for the #contact-form.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Initialises the contact form. If #contact-form is not present in the DOM,
 * returns early without attaching any listeners.
 */
export function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(form);
  });
}

/**
 * Validates all fields and, if valid, submits the form via fetch.
 * @param {HTMLFormElement} form
 */
async function handleSubmit(form) {
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  const nameValid = validateField(
    nameInput,
    nameInput.value.trim().length > 0,
    'Please enter your name.'
  );
  const emailValid = validateField(
    emailInput,
    emailInput.value.trim().length > 0 && EMAIL_REGEX.test(emailInput.value.trim()),
    'Please enter a valid email address.'
  );
  const messageValid = validateField(
    messageInput,
    messageInput.value.trim().length > 0,
    'Please enter a message.'
  );

  if (!nameValid || !emailValid || !messageValid) return;

  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      showStatus('Thank you! Your message has been sent.', 'success');
      form.reset();
    } else {
      showStatus('Message could not be delivered. Please try again later.', 'error');
    }
  } catch {
    showStatus('Unable to send message. Please try again or email directly.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
}

/**
 * Validates a single field. Adds or removes the `error` class and manages
 * the associated error message element linked via `aria-describedby`.
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @param {boolean} isValid
 * @param {string} errorText - Message to display when invalid.
 * @returns {boolean} Whether the field is valid.
 */
function validateField(field, isValid, errorText) {
  const errorId = `${field.id}-error`;

  if (isValid) {
    field.classList.remove('error');

    const existing = document.getElementById(errorId);
    if (existing) existing.remove();

    // Remove aria-describedby if we added it for this error
    const describedBy = field.getAttribute('aria-describedby') || '';
    const updated = describedBy
      .split(' ')
      .filter((id) => id !== errorId)
      .join(' ')
      .trim();
    if (updated) {
      field.setAttribute('aria-describedby', updated);
    } else {
      field.removeAttribute('aria-describedby');
    }
  } else {
    field.classList.add('error');

    let errorEl = document.getElementById(errorId);
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.id = errorId;
      errorEl.className = 'error-message';
      field.insertAdjacentElement('afterend', errorEl);
    }
    errorEl.textContent = errorText;

    // Link field to error message via aria-describedby
    const describedBy = field.getAttribute('aria-describedby') || '';
    const ids = describedBy.split(' ').filter(Boolean);
    if (!ids.includes(errorId)) {
      ids.push(errorId);
      field.setAttribute('aria-describedby', ids.join(' '));
    }
  }

  return isValid;
}

/**
 * Updates the #form-status live region with a message and type class.
 *
 * @param {string} message - Text to display.
 * @param {'success'|'error'} type - Determines the CSS modifier class applied.
 */
function showStatus(message, type) {
  const statusEl = document.querySelector('#form-status');
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.classList.remove('form-status--success', 'form-status--error');
  statusEl.classList.add(`form-status--${type}`);
}
