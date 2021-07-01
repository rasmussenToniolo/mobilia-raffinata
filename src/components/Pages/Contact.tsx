export function Contact() {
  return (
    <main className="contact">
      <h2 className="contact__title page-title">Contact us</h2>

      <form action="#" className="contact__form">
        <input type="text" className="contact__form--name-input contact__form--input" placeholder="Name" required />

        <input type="email" className="contact__form--email-input contact__form--input" placeholder="Email" required />

        <br />

        <textarea name="message" id="message" className="contact__form--message-input contact__form--input" placeholder="Message" required></textarea>

        <button type="submit" className="contact__form--submit-btn">Submit &rarr;</button>
      </form>
    </main>
  )
}
