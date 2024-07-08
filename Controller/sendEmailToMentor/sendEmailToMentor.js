const sendEmailToMentor = async (mentorEmail, subject, text, html) => {
    try {
      const mailOptions = {
        from: `"Sender Name" <${process.env.EMAIL_USER}>`,
        to: mentorEmail,
        subject: subject,
        text: text,
        html: html
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
  