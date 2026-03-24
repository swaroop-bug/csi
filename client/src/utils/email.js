import emailjs from '@emailjs/browser';

/**
 * Sends a welcome email using EmailJS.
 * Requires an EmailJS account (free tier allows 200 emails/month).
 * 
 * @param {string} toEmail - The new user's email address
 * @param {string} toName - The new user's full name
 */
export const sendWelcomeEmail = async (toEmail, toName) => {
  // We read these from the environment variables you'll set up.
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS is not configured. Skipping welcome email.');
    return;
  }

  const firstName = toName ? toName.split(' ')[0] : 'there';

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: toEmail,
        to_name: firstName,
        // Optional: you can pass more dynamic variables here if your template needs them
      },
      publicKey
    );
    console.log('Welcome email sent successfully!', response.status, response.text);
  } catch (error) {
    console.error('Failed to send welcome email via EmailJS:', error);
  }
};
