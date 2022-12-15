// Components
import Navbar from '@/global//layouts/Navbar';
import About from '@/global//components/About';
import Contact from '@/global//components/Contact';
import Posts from '@/global//components/Posts';
import Copyright from '@/global//layouts/Copyright';

import { API_URL } from '@/config/index';
const qs = require('qs');

export default function Home({ posts, projects }) {
  return (
    <div id="global">
      <Navbar />
      <About />
      <section id="projects" className="works container pt-16">
        <div className="works__heading">
          <h4>_featured projects</h4>
        </div>

        <div className="works__grid">
          {projects.slice(0, 3).map((project) => (
            <div
              href={project.website}
              className="works__card"
              onClick={() => window.open(`${project.website}`, '_blank')}
              key={project.id}
            >
              <figure>
                <img src={`${API_URL}/storage/${project.image}`} alt="project-thumbnail" />
              </figure>
              <h5>{project.name}</h5>
              <p>{project.description}</p>
              <p>{project.technologies}</p>
              <div className="works__card__group">
                <a href={project.website} target="_blank">
                  <div className="works__card__project">
                    <svg>
                      <use href="/images/sprite.svg#icon-link" />
                    </svg>
                    <p>Live</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="post container">
        <div className="post__heading">
          <h4>_recent blogposts</h4>
        </div>
        <Posts posts={posts} className="post__row" page="post" />
      </section>
      <Contact />
      <Copyright />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await Promise.all([fetch(`${API_URL}/api/posts`), fetch(`${API_URL}/api/projects`)]);
  const data = await Promise.all(res.map((res) => res.json()));
  return {
    props: {
      posts: data[0].posts,
      projects: data[1].projects,
    },
  };
}
