export default function Success({ toggle, className }) {
  return (
    <section className={`${className} success `} onClick={toggle}>
      <div className="success__main">
        <div className="success__icon">
          <svg>
            <use href="/images/sprite.svg#icon-check" />
          </svg>
        </div>
        <h5>Message Sent!</h5>
        <hr />
        <p>Thank you for reaching out. I will get back to you forthwith.</p>
        <a href="/">close</a>
      </div>
    </section>
  );
}
