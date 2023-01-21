// Components
import Layout from '@/global//layouts/Layout';
// Config & Helpers
import { API_URL } from '@/config/index';
//
export default function projects({ projects }) {
  return (
    <Layout
      project={'navbar__projects'}
      header="_projects"
      site_name={'Projects | JetDev'}
      url="https://www.joelebukatobi.dev/projects"
    >
      <section id="projects" className={`works container`}>
        <div className="works__grid">
          {projects.map((project) => (
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await Promise.all([fetch(`${API_URL}/api/projects`)]);
  const data = await Promise.all(res.map((res) => res.json()));

  return {
    props: {
      projects: data[0].projects,
    },
  };
}
