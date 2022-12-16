// React
import { useEffect, useState } from 'react';
// Next JS
import Link from 'next/link';
// Components
import Card from '@/admin//components//Card';
import Modal from '@/admin//components/Modal';
import Layout from '@/admin//layouts/Layout';
// Config & Helpers
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers//index';
// External Libraries
import moment from 'moment/moment';

export default function index({ posts, categories, tags, projects }) {
  // State
  const [slug, setSlug] = useState('');
  const [open, setOpen] = useState(false);

  // Toggle Modal
  const toggle = () => {
    setOpen(true);
  };

  // Set ID
  let id = 1;
  return (
    <Layout>
      <div className="flex justify-between">
        <Card caption={'posts'} total={`${posts.length}`} svg={'icon-post'} />
        <Card caption={'tags'} total={`${tags.length}`} svg={'icon-tag'} />
        <Card caption={'categories'} total={`${categories.length}`} svg={'icon-category'} />
        <Card caption={'projects'} total={`${projects.length}`} svg={'icon-folder'} />
      </div>
      <div className="mt-[4rem]">
        <div className=" border-[.1rem] border-black/10 rounded-[.8rem]">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Title</th>
                <th>Category</th>
                <th>Published Date</th>
                <th>Author</th>
                <th className="@apply rounded-tr-[.8rem] w-[10%] pl-[0]">Edit</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                return (
                  <tr key={post.id}>
                    <td>{id++}</td>
                    <td className="capitalize">{post.title.substring(0, 30)}</td>
                    <td className="first-letter:capitalize">{post.category.name}</td>
                    <td>{moment(post.created_at).format('L')}</td>
                    <td>{post.user.first_name + ' ' + post.user.last_name}</td>
                    <td>
                      <div className="flex items-center gap-x-[.8rem] pl-[1.6rem]">
                        <Link href={`/admin/posts/${post.slug}/`}>
                          <svg className="hover:stroke-green-600">
                            <use href={`/images/sprite.svg#icon-post`} />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await Promise.all([
    fetch(`${API_URL}/api/posts`),
    fetch(`${API_URL}/api/categories`),
    fetch(`${API_URL}/api/tags`),
    fetch(`${API_URL}/api/projects`),
  ]);

  const data = await Promise.all(res.map((res) => res.json()));

  return {
    props: {
      posts: data[0].posts,
      categories: data[1].categories,
      tags: data[2].tags,
      projects: data[3].projects,
    },
  };
}
