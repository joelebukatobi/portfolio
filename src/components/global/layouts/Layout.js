import Navbar from '@/global//layouts/Navbar';
import Header from '@/global//layouts/Header';
import Copyright from '@/global//layouts/Copyright';

export default function Layout({ children, title, project, resume, blog, works, pagetitle }) {
  return (
    <div id="global">
      <Navbar project={project} resume={resume} blog={blog} works={works} pagetitle={pagetitle} />
      <Header title={title} />
      {children}
      <Copyright />
    </div>
  );
}
