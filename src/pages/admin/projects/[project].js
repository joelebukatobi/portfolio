// React
import { useState } from 'react';
// Next JS
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// Components
import Layout from '@/admin//layouts/Layout';
import Input from '@/admin//elements/Input';
import Textarea from '@/admin//elements/Textarea';
// Config & Helpers
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers//index';
// External Libraries
import { ToastContainer, toast } from 'react-toastify';

export default function Listing({ project, token }) {
  // Assigns Next JS useRouter to a variable
  const navigate = useRouter();
  // Store values gotten from form
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [technologies, setTechnologies] = useState(project.technologies);
  const [website, setWebsite] = useState(project.website);
  const [design, setDesign] = useState(project.design);
  const [image, setImage] = useState(project.image);
  const [content, setContent] = useState(project.image);

  // handleChange
  const imageChange = (file) => {
    setImage(file[0]);
    setContent(file[0].name);
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Data
    const body = new FormData();
    body.append('name', name);
    body.append('description', description);
    body.append('technologies', technologies);
    body.append('website', website);
    body.append('design', design);
    body.append('new_image', image);

    // Post Requests
    const res = await fetch(`${API_URL}/api/projects/${project.slug}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Saved: Project edited successfully');
      setTimeout(() => {
        setContent(null);
        navigate.push('/admin/projects');
      }, 5000);
    } else {
      toast.error(`Error ${data.message}`);
    }
  };

  return (
    <Layout>
      <div>
        <ToastContainer autoClose={4000} position="bottom-right" theme="colored" />
        <header className="flex flex-col ">
          <div className="flex items-center mb-[1.6rem]">
            <h3 className="text-black/90 mr-[1.6rem]">Projects</h3>
            <figcaption onClick={handleSubmit} className="tag">
              <p>Update</p>
            </figcaption>
          </div>
          <div className="flex">
            <Link href="/admin">
              <h5 className="text-black/70 hover:text-black">Dashboard &nbsp;</h5>
            </Link>
            <h5>&gt; &nbsp;</h5>
            <Link href="/admin/projects">
              <h5 className="text-black/70 hover:text-black">Projects &nbsp;</h5>
            </Link>
            <h5>&gt; &nbsp;</h5>
            <Link href={`/admin/projects/${project.slug}`}>
              <h5 className="capitalize text-black/70 hover:text-black">{project.name}</h5>
            </Link>
          </div>
        </header>
        <div className="w-1/2 mt-[2.4rem] mb-[2.4rem] rounded-[.4rem] h-[24rem] border-[.16rem] border-black/10 overflow-hidden p-[.16rem]">
          <img className="w-full rounded-[.4rem]" src={`${API_URL}/storage/${project.image}`} alt="post-thumbnail" />
        </div>

        <form className="w-1/2 mt-[4rem]" onSubmit={handleSubmit}>
          <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
            <Input
              label={'Name'}
              placeholder={'Name'}
              type={'text'}
              value={name}
              name={'name'}
              onChange={(e) => setName(e.target.value)}
              required={'required'}
              className={'mb-[2.4rem]'}
              classInput={'capitalize'}
            />
            <Input
              label={'Website Link'}
              placeholder={'Website Link'}
              type={'text'}
              value={website}
              name={'website'}
              onChange={(e) => setWebsite(e.target.value)}
              required={'required'}
              className={'mb-[2.4rem]'}
            />
          </div>
          <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
            <Input
              label={'Design Link'}
              placeholder={'Design Link'}
              type={'text'}
              value={design}
              name={'design'}
              onChange={(e) => setDesign(e.target.value)}
              required={'required'}
              className={'mb-[2.4rem]'}
            />
            <Input
              label={'Technologies'}
              placeholder={'Technologies'}
              type={'text'}
              value={technologies}
              name={'technologies'}
              onChange={(e) => setTechnologies(e.target.value)}
              required={'required'}
              className={'mb-[2.4rem]'}
            />
          </div>
          <div className="flex items-start gap-x-[3.2rem]">
            <Input
              label={'Image'}
              placeholder={'Project Image'}
              name={'new_image'}
              type={'file'}
              onChange={(e) => imageChange(e.target.files)}
              required
              after={content || 'Upload an image'}
              className={'mb-[2.4rem] '}
            />
          </div>
          <div className="flex items-start gap-x-[3.2rem]">
            <Textarea
              name={'Description'}
              label={'Description'}
              placeholder={'Description'}
              type={'text'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={'mb-[2.4rem]'}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { project } }) {
  const { token } = parseCookies(req);
  const res = await Promise.all([
    fetch(`${API_URL}/api/projects/${project}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);
  const data = await Promise.all(res.map((res) => res.json()));
  console.log(data[0]);
  return {
    props: {
      token,
      project: data[0].project,
    },
  };
}
