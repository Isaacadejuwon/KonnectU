document.addEventListener('DOMContentLoaded', () => {
  // Form Submission
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      alert('You’re in! Thanks for joining KonnectU!');
      form.reset();
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Oops! Something went wrong—try again.');
    }
  });

  // Button Hover Effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseout', () => btn.style.transform = 'scale(1)');
  });

  // Discover Now Button - Scroll to Signup
  const discoverBtn = document.querySelector('.btn-hero');
  discoverBtn.addEventListener('click', () => {
    document.querySelector('.signup').scrollIntoView({ behavior: 'smooth' });
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