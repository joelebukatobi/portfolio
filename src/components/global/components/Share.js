import Link from 'next/link';

export default function Share({ className }) {
  return (
    <div className={`blog__share ${className}`}>
      <h6>Share</h6>
      <hr />
      <ul>
        <li>
          <Link href="">
            <svg>
              <use href="/images/sprite.svg/#icon-facebook" />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="">
            <svg>
              <use href="/images/sprite.svg/#icon-twitter" />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="">
            <svg>
              <use href="/images/sprite.svg/#icon-linkedin" />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
}
