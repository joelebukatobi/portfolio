import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Projects from '@/components/Projects';
import Posts from '@/components/Posts';
import Copyright from '@/components/Copyright';

import { API_URL } from '@/config/index';
const qs = require('qs');

export default function Home({ posts, projects }) {
  return (
    <>
      <Navbar />
      <About />
      <section id="projects" className="works container pt-16">
        <div className="works__heading">
          <h4>_featured projects</h4>
        </div>
        <Projects projects={projects} />
      </section>
      <section className="post container">
        <div className="post__heading">
          <h4>_recent blogposts</h4>
        </div>
        {/* <div className="post__row">
          {posts.map((post) => (
            <div
              className="post__card"
              onClick={() => (window.location.href = `${post.attributes.slug}`)}
              key={post.id}
            >
              <h4>{post.attributes.title}</h4>
              <p>{post.attributes.description.substring(0, 200)}...</p>
              <Link href={`/blog/${post.attributes.slug}`}>Read More</Link>
            </div>
          ))}
        </div> */}
        <Posts posts={posts} className="post__row" page="post" />
      </section>
      <Contact />
      <Copyright />
    </>
  );
}

export async function getStaticProps() {
  const projects = qs.stringify(
    {
      populate: ['image'],
      sort: ['createdAt:desc'],
      pagination: {
        start: 0,
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const posts = qs.stringify(
    {
      sort: ['createdAt:asc'],
      pagination: {
        start: 0,
        limit: 6,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await Promise.all([
    fetch(`${API_URL}/api/blogposts?${posts}`),
    fetch(`${API_URL}/api/projects?${projects}`),
  ]);

  const content = await Promise.all(res.map((res) => res.json()));
  // console.log(res);

  return {
    props: {
      posts: content[0].data,
      projects: content[1].data,
    },
  };
}
