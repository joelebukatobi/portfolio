import Link from 'next/link';
export default function Copyright() {
  return (
    <>
      <section className="copyright container">
        <div className="copyright__design">
          <p>
            Designed and Develop by
            <Link href="" className="">
              <span> JetDev</span>
            </Link>
          </p>
          <ul className="copyright__list">
            <li>
              <a href="mailto:joelebuka@gmail.com">
                <svg>
                  <use href="/images/sprite.svg#icon-email" />
                </svg>
                <p>Email</p>
              </a>
            </li>

            <li>
              <a href="https://facebook.com/joelebukatobi">
                <svg>
                  <use href="/images/sprite.svg#icon-facebook" />
                </svg>
                <p>Facebook</p>
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
            <li>
              <a href="https://instagram.com/joelebukatobi">
                <svg>
                  <use href="/images/sprite.svg#icon-instagram" />
                </svg>
                <p>Instagram</p>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <script src="/js/index.js"></script>
    </>
  );
}
