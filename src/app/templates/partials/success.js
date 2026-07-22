import { icon } from '../../../lib/icons.js';

export function successPartial() {
  return `
<section class="flex success" id="contact-result">
  <div class="success__main">
    <div class="success__icon">
      ${icon('check')}
    </div>
    <h5>Message Sent!</h5>
    <hr />
    <p>Thank you for reaching out. I will get back to you forthwith.</p>
    <a href="/">close</a>
  </div>
</section>`;
}
