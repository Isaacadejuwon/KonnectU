document.addEventListener('DOMContentLoaded', () => {
  // Form Submission
  const form = document.getElementById('signupForm');
  const submitButton = document.getElementById('submitButton');
  const loadingMessage = document.getElementById('loadingMessage');

  if (!form || !submitButton) {
    console.error('Form or submit button not found');
    return;
  }

  console.log('Form element found:', form);

  // Flag to prevent multiple submissions
  let isSubmitting = false;

  // Counter to track click events
  let clickCount = 0;

  const handleClick = async () => {
    clickCount++;
    console.log(`Submit button clicked ${clickCount} time(s)`);

    if (isSubmitting) {
      console.log('Submission already in progress, ignoring additional click');
      return;
    }

    isSubmitting = true;

    submitButton.disabled = true;
    submitButton.style.cursor = 'not-allowed';
    loadingMessage.style.display = 'block';

    // Collect form data
    const formData = new FormData(form);
    const formValues = {
      fname: formData.get('entry.137930516') || '',
      lname: formData.get('entry.365860481') || '',
      email: formData.get('entry.1596585368') || '',
      phone: formData.get('entry.1599107456') || '',
      location: formData.get('entry.344818518') || '',
      profession: formData.get('entry.1088893444') || '',
      to_email: formData.get('entry.1596585368') || '' // User’s email for confirmation email
    };

    // Create a separate object for the forwarded email
    const forwardFormValues = {
      ...formValues, // Copy all fields from formValues
      to_email: 'support@konnectusolutions.com' // Override to_email with your team's email
    };

    // Validate form data
    if (!formValues.email || !formValues.to_email) {
      console.error('Form Validation Error: Email field is missing or empty');
      alert('Please provide a valid email address.');

      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.style.cursor = 'pointer';
      loadingMessage.style.display = 'none';
      return;
    }

    try {
      console.log('Form Values (User Confirmation):', formValues);
      console.log('Form Values (Forwarded):', forwardFormValues);
      console.log('Sending confirmation email to:', formValues.to_email);
      console.log('Sending forwarded email to:', forwardFormValues.to_email);

      const [userEmailResponse, forwardEmailResponse] = await Promise.all([
        emailjs.send(
          'service_zhya6yp',
          'template_jurukgu',
          formValues
        ),
        emailjs.send(
          'service_zhya6yp',
          'template_z7s4w4m',
          forwardFormValues // Use the updated formValues for the forwarded email
        )
      ]);
      console.log('User Confirmation Email Response:', userEmailResponse);
      console.log('Forward Email Response:', forwardEmailResponse);

      const googleFormResponse = await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      console.log('Google Form Submission Response:', googleFormResponse);

      const thankYouPopup = document.getElementById('thank-you-popup');
      thankYouPopup.style.display = 'flex';

      form.reset();
    } catch (error) {
      console.error('Form Submission Error:', error);
      alert('Oops! Something went wrong—try again. Check the console for details.');
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.style.cursor = 'pointer';
      loadingMessage.style.display = 'none';
    }
  };

  // Remove any existing event listeners
  submitButton.removeEventListener('click', handleClick);
  submitButton.addEventListener('click', handleClick);

  // Button Hover Effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', () => {
      if (!btn.disabled) {
        btn.style.transform = 'scale(1.1)';
      }
    });
    btn.addEventListener('mouseout', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  // Popup Functionality
  const privacyLink = document.getElementById('privacy-link');
  const termsLink = document.getElementById('terms-link');
  const privacyPopup = document.getElementById('privacy-popup');
  const termsPopup = document.getElementById('terms-popup');
  const thankYouPopup = document.getElementById('thank-you-popup');
  const closePrivacy = document.getElementById('close-privacy');
  const closeTerms = document.getElementById('close-terms');
  const closeThankYou = document.getElementById('close-thank-you');

  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    privacyPopup.style.display = 'flex';
  });

  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    termsPopup.style.display = 'flex';
  });

  closePrivacy.addEventListener('click', () => {
    privacyPopup.style.display = 'none';
  });

  closeTerms.addEventListener('click', () => {
    termsPopup.style.display = 'none';
  });

  closeThankYou.addEventListener('click', () => {
    thankYouPopup.style.display = 'none';
  });

  [privacyPopup, termsPopup, thankYouPopup].forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
});