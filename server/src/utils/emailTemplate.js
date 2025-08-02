function emailTemplate({ userName, movieName, seat, slot, status, date }) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 24px; max-width: 600px; margin: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="background-color: #2e86de; padding: 16px; border-radius: 8px 8px 0 0; color: white;">
        <h2 style="margin: 0;">🎬 Booking Confirmed!</h2>
      </div>

      <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
        <p style="font-size: 15px;">Thank you for booking with us! Here are your booking details:</p>

        <table style="width: 100%; margin-top: 16px; font-size: 15px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: 600;">🎞️ Movie</td>
            <td style="padding: 8px;">${movieName}</td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="padding: 8px; font-weight: 600;">💺 Seat</td>
            <td style="padding: 8px;">${seat}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: 600;">⏰ Slot</td>
            <td style="padding: 8px;">${slot}</td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="padding: 8px; font-weight: 600;">📅 Date</td>
            <td style="padding: 8px;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: 600;">💳 Payment Status</td>
            <td style="padding: 8px;">${status}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; font-size: 15px;">We hope you enjoy your movie! 🍿</p>
        <p style="font-size: 14px; color: #555;">Need help? Contact our support team anytime.</p>
      </div>
    </div>
  `;
}

module.exports = emailTemplate;
