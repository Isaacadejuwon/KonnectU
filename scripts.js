document.addEventListener('DOMContentLoaded', () => {
  // Form Submission
  const form = document.getElementById('signupForm');
  if (!form) {
    console.error('Form element with ID "signupForm" not found');
    return;
  }

  console.log('Form element found:', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    // Collect form data
    const formData = new FormData(form);
    const formValues = {
      fname: formData.get('entry.137930516') || '',
      lname: formData.get('entry.365860481') || '',
      email: formData.get('entry.1596585368') || '',
      phone: formData.get('entry.1599107456') || '',
      location: formData.get('entry.344818518') || '',
      profession: formData.get('entry.1088893444') || '',
      to_email: formData.get('entry.1596585368') || ''
    };

    // Validate form data
    if (!formValues.email || !formValues.to_email) {
      console.error('Form Validation Error: Email field is missing or empty');
      alert('Please provide a valid email address.');
      return;
    }

    try {
      console.log('Form Values:', formValues);
      console.log('Sending confirmation email to:', formValues.to_email);

      // Send confirmation email to the user
      const userEmailResponse = await emailjs.send(
        'service_zhya6yp',
        'template_jurukgu',
        formValues
      );
      console.log('User Confirmation Email Response:', userEmailResponse);

      // Send forwarding email
      const forwardEmailResponse = await emailjs.send(
        'service_zhya6yp',
        'template_jurukgu',
        formValues
      );
      console.log('Forward Email Response:', forwardEmailResponse);

      // Submit to Google Form
      const googleFormResponse = await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      console.log('Google Form Submission Response:', googleFormResponse);

      // Show the thank-you popup
      const thankYouPopup = document.getElementById('thank-you-popup');
      thankYouPopup.style.display = 'flex';

      // Reset the form
      form.reset();
    } catch (error) {
      console.error('Form Submission Error:', error);
      alert('Oops! Something went wrong—try again. Check the console for details.');
    }
  });

  // Button Hover Effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', () => {
      btn.style.transform = 'scale(1.1)';
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