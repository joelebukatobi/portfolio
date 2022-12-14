import Link from 'next/link';
export default function Posts({ posts, className, page }) {
  return (
    <div className={className}>
      {posts.slice(0, 3).map((post) => (
        <div className={`${page}__card`} onClick={() => (window.location.href = `/blog/${post.slug}`)} key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.description.substring(0, 200)}...</p>
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
