// React
import { use, useState } from 'react';
// Next JS
import Link from 'next/link';
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

export default function index({ tag, token }) {
  // Store values gotten from form
  const navigate = useRouter();
  const [name, setName] = useState(tag.name);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/tags/${tag.slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Saved: Tag edited successfully');
      setTimeout(() => {
        navigate.push('/admin/categories');
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
            <h3 className="text-black/90 mr-[1.6rem] capitalize">{tag.name}</h3>
            <figcaption role="button" className="tag" onClick={handleSubmit}>
              <p>Publish</p>
            </figcaption>
          </div>

          <div className="flex">
            <Link href="/admin">
              <h5 className="text-black/70 hover:text-black">Dashboard &nbsp;</h5>
            </Link>
            <h5>&gt; &nbsp;</h5>
            <Link href="/admin/tags">
              <h5 className="text-black/70 hover:text-black">Tags &nbsp;</h5>
            </Link>
            <h5>&gt; &nbsp;</h5>
            <Link href={`/admin/tags/${tag.slug}`}>
              <h5 className=" text-black/70 hover:text-black capitalize">{tag.name} &nbsp;</h5>
            </Link>
          </div>
        </header>
        <form action="" className="mt-[4rem] w-1/2">
          <Input
            label={'Name'}
            placeholder={'Name'}
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={'mb-[2.4rem]'}
            classInput={'mt-[.8rem]'}
          />
          {/* <Textarea
            label={'Description'}
            placeholder={'Description'}
            type={'text'}
            onChange
            required
            className={'mb-[2.4rem]'}
            classTextArea={'mt-[.8rem]'}
          /> */}
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { tag } }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/tags/${tag}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return {
    props: {
      token,
      tag: data.tag,
    },
  };
}
