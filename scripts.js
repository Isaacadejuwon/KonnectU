document.addEventListener('DOMContentLoaded', () => {
  // Form Submission
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const formValues = {
      fname: formData.get('entry.137930516'),
      lname: formData.get('entry.365860481'),
      email: formData.get('entry.1596585368'),
      phone: formData.get('entry.1599107456'),
      location: formData.get('entry.344818518'),
      profession: formData.get('entry.1088893444')
    };

    try {
      // Send confirmation email via EmailJS
      await emailjs.send('service_zhya6yp', 'template_jurukgu', formValues);
      console.log('Confirmation email sent successfully');

      // Proceed with Google Form submission
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      alert('You’re in! Thanks for joining KonnectU! A confirmation email has been sent to your inbox.');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Oops! Something went wrong—try again.');
    }
  });

  // Button Hover Effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseout', () => btn.style.transform = 'scale(1)');
  });

  // Create Account Button - Scroll to Signup
  const createAccountBtn = document.querySelector('.app-btn-create');
  createAccountBtn.addEventListener('click', () => {
    document.querySelector('.signup').scrollIntoView({ behavior: 'smooth' });
  });

  // Login Button - Show Coming Soon Message
  const loginBtn = document.querySelector('.app-btn-login');
  loginBtn.addEventListener('click', () => {
    alert('Login functionality is coming soon!');
  });

  // Popup Functionality
  const privacyLink = document.getElementById('privacy-link');
  const termsLink = document.getElementById('terms-link');
  const privacyPopup = document.getElementById('privacy-popup');
  const termsPopup = document.getElementById('terms-popup');
  const closePrivacy = document.getElementById('close-privacy');
  const closeTerms = document.getElementById('close-terms');

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

  // Close popup when clicking outside content
  [privacyPopup, termsPopup].forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
});