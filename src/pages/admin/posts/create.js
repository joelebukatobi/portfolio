// / React
import { useState } from 'react';
// Next JS
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// Components
import Layout from '@/admin//layouts/Layout';
import Textarea from '@/admin//elements/Textarea';
import Input from '@/admin//elements/Input';
import Select from '@/admin//elements/Select';
const Editor = dynamic(() => import('@/admin//components/Editor'), { ssr: false });
// Config & Helpers
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers//index';
// External Libraries
import { ToastContainer, toast } from 'react-toastify';

export default function Post({ tags, categories, users, token }) {
  // Assigns Next JS useRouter to a variable
  const navigate = useRouter();
  // Store values gotten from form
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tag, setTag] = useState();
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [article, setArticle] = useState();

  // Tags Options
  const tagOptions = [];
  tags.map((tag) => {
    tagOptions.push({ value: `${tag.id}`, label: `${tag.name}` });
  });
  // Categories Options\
  const catOptions = [];
  categories.map((category) => {
    catOptions.push({ value: `${category.id}`, label: `${category.name}` });
  });
  // Author Options
  const authorOptions = [];
  users.map((user) => {
    authorOptions.push({ value: `${user.id}`, label: `${user.first_name + ' ' + user.last_name}` });
  });

  // handleChange
  const imageChange = (file) => {
    setImage(file[0]);
    setContent(file[0].name);
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Put tag values in an array
    const tags = [];
    tag.map((value) => {
      tags.push(value.value);
    });

    // Form Data
    const body = new FormData();
    body.append('title', title);
    body.append('post', article);
    body.append('description', description);
    body.append('image', image);
    body.append('cat_id', category);
    body.append('user_id', author);
    for (var i = 0; i < tags.length; i++) {
      body.append('tags[]', tags[i]);
    }

    // Post Requests
    const res = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Saved: Post created successfully');
      setTimeout(() => {
        setContent(null);
        navigate.push('/admin/posts');
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
            <h3 className="text-black/90 mr-[1.6rem]">Posts</h3>
            <figcaption onClick={handleSubmit} className="tag">
              <p>Publish</p>
            </figcaption>
          </div>

          <div className="flex">
            <Link href="/admin">
              <h5 className="text-black/70 hover:text-black">Dashboard &nbsp;</h5>
            </Link>
            <h5>&gt; &nbsp;</h5>
            <Link href="/admin/posts">
              <h5 className="text-black/70 hover:text-black">Posts &nbsp;</h5>
            </Link>
          </div>
        </header>
        <form className="mt-[4rem]" onSubmit={handleSubmit}>
          <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
            <Input
              label={'Title'}
              placeholder={'Title'}
              type={'text'}
              value={title}
              name={'title'}
              onChange={(e) => setTitle(e.target.value)}
              required={'required'}
              className={'mb-[2.4rem]'}
              classInput={'capitalize'}
            />
            <Input
              label={'Image'}
              placeholder={'Thumbnail'}
              name={'image'}
              type={'file'}
              onChange={(e) => imageChange(e.target.files)}
              required={'required'}
              after={'Upload An Image'}
              className={'mb-[2.4rem]'}
            />
          </div>
          <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem]">
            <Select
              placeHolder="Author"
              label="Author"
              options={authorOptions}
              onChange={(value) => setAuthor(value.value)}
            />
            <Select
              placeHolder="Categories"
              label="Categories"
              options={catOptions}
              onChange={(value) => setCategory(value.value)}
            />
            <Select placeHolder="Tags" label="Tags" isMulti options={tagOptions} onChange={(value) => setTag(value)} />
          </div>
          <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
            <Textarea
              label={'Description'}
              placeholder={'Description'}
              type={'text'}
              value={description}
              name={'description'}
              onChange={(e) => setDescription(e.target.value)}
              required={'required'}
              classTextArea={'mt-[.8rem] !h-[12rem]'}
            />
          </div>
          <div className="mt-[2.4rem]">
            <label className="text-black/70">Post</label>
            <div className="mt-[.8rem]">
              <Editor onChange={setArticle} value={article} />
            </div>
          </div>
          <Input name={'cat_id'} className={'hidden'} />
          <Input name={'user_id'} className={'hidden'} />
          <Input name={'tags'} className={'hidden'} />
          <Input name={'post'} className={'hidden'} />
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await Promise.all([
    fetch(`${API_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${API_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);
  const data = await Promise.all(res.map((res) => res.json()));
  return {
    props: {
      token,
      tags: data[0].tags,
      categories: data[1].categories,
      users: data[2].users,
    },
  };
}
