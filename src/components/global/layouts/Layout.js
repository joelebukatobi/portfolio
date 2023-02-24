import Navbar from '@/global//layouts/Navbar';
import Header from '@/global//layouts/Header';
import Copyright from '@/global//layouts/Copyright';

export default function Layout({ children, contact, header, project, resume, blog, works, site_name }) {
  return (
    <div id="global">
      <Navbar
        project={project}
        contact={contact}
        resume={resume}
        blog={blog}
        works={works}
        header={header}
        site_name={site_name}
      />
      <Header header={header} />
      {children}
      <Copyright />
    </div>
  );
}
