document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // UI loading
  document.getElementById('submit_button').style.display = "none";
  document.getElementById('loading_button').style.display = "block";

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // WhatsApp number (India: 91)
  const phoneNumber = "919270139519";

  // Create WhatsApp message
  const whatsappMessage =
    `*New Contact Form Message from website*

Name: ${name}
Email: ${email}
Message: ${message}`;

  // Encode message
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // WhatsApp URL
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // Reset UI
  document.getElementById('submit_button').style.display = "block";
  document.getElementById('loading_button').style.display = "none";
  document.getElementById('contactForm').reset();
});

