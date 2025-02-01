document.getElementById('contactForm').addEventListener('submit', function (e) {

    document.getElementById('submit_button').style.display="none";
    document.getElementById('loading_button').style.display="block";

    console.log("cobatct ")
    e.preventDefault();
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Prepare the API request payload
    const requestBody = {
      mailto: "deveraapvt@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      username: "deveraapvt@gmail.com",
      apppassword: "mlvgulnxeshzeoqx",
      senderName: name,
    };

    console.log("request data",requestBody)
  
    // Send the POST request to the API
    fetch('https://mail.deveraa.com/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          // Show success alert using SweetAlert
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Thank you for contacting us!',
          //   text: 'We will get back to you soon.',
          // });
          document.getElementById('submit_button').style.display="block";
          document.getElementById('loading_button').style.display="none";
          // Optionally reset the form fields
          document.getElementById('contactForm').reset();
        } else {
          // Handle error
          throw new Error('Email sending failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
        });
        document.getElementById('submit_button').style.display="block";
        document.getElementById('loading_button').style.display="none";
      });
  });
  