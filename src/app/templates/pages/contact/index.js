import { layoutPage } from '../../partials/layout-page.js';

export function contactMeta() {
  return {
    title: 'Contact | Joel Ebuka Tobi',
    url: 'https://joelebukatobi.dev/contact',
  };
}

export function contactContent() {
  const content = `
<section id="contact" class="form container">
  <div class="form__content">
    <div class="form__text">
      <h1>Interested in <span>working</span> on a project together?</h1>
      <p>I'm open to work on both a contract or permanent basis, especially ambitious or large projects. However, if you have other request or question, don't hesitate to reach out.</p>
    </div>
    <form
      hx-post="/contact"
      hx-target="#contact-result"
      hx-swap="outerHTML"
      class="form__input"
    >
      <div class="group">
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
      </div>
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Hey Joel, I've got a project I'd like to work with you on..."></textarea>
      <button type="submit">Send</button>
    </form>
    <div id="contact-result"></div>
  </div>
</section>`;

  return layoutPage({
    activePage: 'contact',
    header: '_contact',
    content,
  });
}
