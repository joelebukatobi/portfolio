// Next JS
import Link from 'next/link';
//
export default function Aside({ className, categories }) {
  return (
    <>
      <div className={`blog__categories ${className}`}>
        <h6>Categories</h6>
        <hr />
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
