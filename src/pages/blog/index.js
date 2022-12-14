import Layout from '@/global//layouts/Layout';
import Aside from '@/global//components/Aside';
import Posts from '@/global//components/Posts';
// Config & Helpers
import { API_URL } from '@/config/index';

export default function index({ posts, categories }) {
  return (
    <Layout blog={'navbar__blog'} title="_blog" pagetitle={'Blog | JetDev'} url="blog">
      <section className="blog container">
        <div className="blog__right">
          <Aside categories={categories} />{' '}
        </div>
        {/* <div className="blog__left">
          {posts.map((post) => (
            <div className="blog__card" key={post.id}>
              <h4>{post.attributes.title}</h4>
              <p>{post.attributes.description.substring(0, 250)}...</p>
              <Link href={`/blog/${post.attributes.slug}`}>Read More</Link>
            </div>
          ))}
        </div> */}
        <Posts posts={posts} className="blog__left" page="blog" />
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
