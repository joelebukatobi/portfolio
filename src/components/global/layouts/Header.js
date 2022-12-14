export default function Header({ title, children }) {
  return (
    <header className="header container">
      <div className="header__title">
        <h4>{title}</h4>
      </div>
      <div className="header__image">
        <svg>
          <use href="/images/sprite.svg/#icon-about" />
        </svg>
      </div>
    </header>
  );
}
