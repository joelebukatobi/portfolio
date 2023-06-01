export default function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="about__imagebox">
          <div className="about__image">
            <img src="/images/image-one.webp" alt="header-image" />
          </div>
        </div>
        <div className="about__text">
          <div className="about__name">
            <h1>
              Hi 👋🏾, I'm
              <br />
              Joel Ebuka Tobi
            </h1>
            <div className="about__decor">
              <hr />
            </div>
          </div>
          <div className="about__me">
            <div className="about__icon">
              <svg>
                <use href="/images/sprite.svg/#icon-about" />
              </svg>
            </div>
            <div className="about__content">
              <h3>A Developer</h3>
              <h5>
                <div>
                  and I'm a <span>Developer </span>
                </div>
                with a passion for crafting user-friendly and visually appealing applications. I'm skilled in
                <span> frontend</span> and <span> backend </span> development, and I'm currently interested in
                leveraging
                <span> cloud technologies</span> to create efficient and scalable solutions.
              </h5>
              <ul className="about__list">
                <li>
                  <a href="https://github.com/joelebukatobi">
                    <svg>
                      <use href="/images/sprite.svg#icon-github" />
                    </svg>
                    <p>Github</p>
                  </a>
                </li>
                <li>
                  <a href="https://dribbble.com/JetDev">
                    <svg>
                      <use href="/images/sprite.svg#icon-dribbble" />
                    </svg>
                    <p>Dribble</p>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/joelebukatobi/">
                    <svg>
                      <use href="/images/sprite.svg#icon-linkedin" />
                    </svg>
                    <p>LinkedIn</p>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/joelebukatobi">
                    <svg>
                      <use href="/images/sprite.svg#icon-twitter" />
                    </svg>
                    <p>Twitter</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
