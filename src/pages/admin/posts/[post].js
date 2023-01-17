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
import Select from '@/admin//elements/Select';
const Editor = dynamic(() => import('@/admin//components/Editor'), { ssr: false });
// Config & Helpers
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers//index';
// External Libraries
import { ToastContainer, toast } from 'react-toastify';

export default function Post({ post, tags, categories, users, token }) {
  // Assigns Next JS useRouter to a variable
  const navigate = useRouter();
  // Store values gotten from form
  const [title, setTitle] = useState(post.title);
  const [tag, setTag] = useState(post.tags);
  const [category, setCategory] = useState(post.category.id);
  const [author, setAuthor] = useState(post.user.id);
  const [image, setImage] = useState(post.image);
  const [content, setContent] = useState(post.image);
  const [article, setArticle] = useState(post.post);
  const [description, setDescription] = useState(post.description);

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
    body.append('new_image', image);
    body.append('cat_id', category);
    body.append('user_id', author);
    for (var i = 0; i < tags.length; i++) {
      body.append('tags[]', tags[i]);
    }

    // Post Requests
    const res = await fetch(`${API_URL}/api/posts/${post.slug}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Saved: Post edited successfully');
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
            <h3 className="text-black/90 mr-[1.6rem]">{post.title}</h3>
            <figcaption onClick={handleSubmit} className="tag">
              <p>Update</p>
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
            <h5>&gt; &nbsp;</h5>
            <Link href={`/admin/posts/${post.title}`}>
              <h5 className="capitalize text-black/70 hover:text-black">{post.title}</h5>
            </Link>
          </div>
          <hr className="my-[2.4rem]" />
          <p className="text-black/70">
            <strong>Instruction:</strong> Please make sure every input is filled accordingly in order to ensure that the
            form is submitted
          </p>
        </header>
        <div className="mt-[2.4rem] mb-[2.4rem] rounded-[.4rem] w-full h-[24rem] border-[.16rem] border-black/10 overflow-hidden p-[.16rem]">
          <img className="w-full rounded-[.4rem]" src={`${API_URL}/storage/${post.image}`} alt="post-thumbnail" />
        </div>
        <form className="mt-[4rem]" onSubmit={handleSubmit}>
          <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
            <Input
              label={'Title'}
              placeholder={'Article One'}
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
              name={'new_image'}
              type={'file'}
              onChange={(e) => imageChange(e.target.files)}
              required={'required'}
              after={content.substring(0, 30) || 'Upload An Image'}
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
          </div>{' '}
          <div className="flex items-start gap-x-[3.2rem]">
            <Textarea
              label={'Description'}
              placeholder={'Description'}
              type={'text'}
              value={description}
              name={'description'}
              onChange={(e) => setDescription(e.target.value)}
              required={'required'}
              className={'mb-[2.4rem]'}
              classTextArea={'mt-[.8rem] !h-[12rem]'}
            />
          </div>
          <div>
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

export async function getServerSideProps({ req, query: { post } }) {
  const { token } = parseCookies(req);
  const res = await Promise.all([
    fetch(`${API_URL}/api/posts/${post}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
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
  // console.log(data[0]);
  return {
    props: {
      token,
      post: data[0].post,
      tags: data[1].tags,
      categories: data[2].categories,
      users: data[3].users,
    },
  };
}
