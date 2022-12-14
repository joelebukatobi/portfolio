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

export default function Create({ token }) {
  // Assigns Next JS useRouter to a variable
  const navigate = useRouter();
  // Store values gotten from form
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [technologies, setTechnologies] = useState('');
  const [website, setWebsite] = useState('');
  const [design, setDesign] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

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
    body.append('image', image);

    // Post Requests
    const res = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Saved: Project created successfully');
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
              <p>Create New</p>
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
          </div>
        </header>
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
              classInput={'mt-[.8rem] capitalize'}
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
              classInput={'mt-[.8rem]'}
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
              classInput={'mt-[.8rem]'}
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
              classInput={'mt-[.8rem]'}
            />
          </div>
          <div className="flex items-start gap-x-[3.2rem]">
            <Input
              label={'Image'}
              placeholder={'Thumbnail'}
              name={'new_image'}
              type={'file'}
              onChange={(e) => imageChange(e.target.files)}
              required={'required'}
              after={content}
              className={'mb-[2.4rem] '}
              classInput={
                'mt-[.8rem] relative after:content-[attr(after)] after:bg-white after:h-full after:w-full after:absolute after:top-0  after:left-[1.6rem] after:z-10 after:flex after:items-center after:font-light after:text-[#b9bec7]'
              }
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
              classTextArea={'mt-[.8rem]'}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { listing } }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
