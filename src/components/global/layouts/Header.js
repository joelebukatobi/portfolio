export default function Header({ header, children }) {
  return (
    <div className="container">
      <header className="header ">
        <div className="header__title">
          <h4>{header}</h4>
        </div>
        <div className="header__image">
          <svg>
            <use href="/images/sprite.svg/#icon-about" />
          </svg>
        </div>
      </header>
    </div>
  );
}
