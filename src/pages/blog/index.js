// Next JS
import Link from 'next/link';
// Components
import Layout from '@/global//layouts/Layout';
import Aside from '@/global//components/Aside';
// Config & Helpers
import { API_URL } from '@/config/index';

export default function index({ posts, categories }) {
  return (
    <Layout
      blog={'navbar__blog'}
      header="_blog"
      title={'Blog | Joel Ebuka Tobi'}
      url="https://www.joelebukatobi.dev/blog"
    >
      <section className="blog container">
        <div className="blog__right">
          <Aside categories={categories} />
        </div>
        <div className="blog__left">
          {posts.map((post) => (
            <div className="blog__card" onClick={() => (window.location.href = `/blog/${post.slug}`)} key={post.id}>
              <h4>{post.title}</h4>
              <p>
                {post.description.substring(0, 195)}...
                <Link href={`/blog/${post.slug}`}> Read More</Link>
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await Promise.all([fetch(`${API_URL}/api/posts`), fetch(`${API_URL}/api/categories`)]);
  const data = await Promise.all(res.map((res) => res.json()));

  return {
    props: {
      posts: data[0].posts,
      categories: data[1].categories,
    },
  };
}
