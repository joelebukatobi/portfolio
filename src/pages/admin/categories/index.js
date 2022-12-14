// React
import { useState } from 'react';
// Next JS
import Link from 'next/link';
// Components
import Layout from '@/admin//layouts/Layout';
import Modal from '@/admin//components/Modal';
// Config & Helpers
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers//index';
// External Libraries
import moment from 'moment/moment';

export default function index({ categories, token }) {
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
      <div className="">
        <header className="flex items-center">
          <h3 className="text-black/90 mr-[1.6rem]">Categories</h3>
          <div className="tag">
            <p>
              <Link href="/admin/categories/create/">Create New</Link>
            </p>
          </div>
        </header>
        <div className="mt-[2.4rem] border-[.1rem] border-black/10 rounded-[.8rem]">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="w-[35%]">Description</th>
                <th>Date</th>
                <th className="rounded-tr-[.8rem] pl-[0]">Edit</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>{id++}</td>
                    <td className="capitalize">{category.name}</td>
                    <td className="first-letter:capitalize">{category.description.substring(0, 50)}...</td>
                    <td>{moment(category.created_at).format('L')}</td>
                    <td>
                      <div className="flex items-center gap-x-[.8rem] pl-[1.6rem]">
                        <Link href={`/admin/categories/${category.slug}/`}>
                          <svg className="hover:stroke-green-600">
                            <use href={`/images/sprite.svg#icon-post`} />
                          </svg>
                        </Link>
                        <div onClick={(e) => (e.preventDefault(), setSlug(category.slug), setOpen(toggle))}>
                          <svg className="hover:stroke-red-600">
                            <use href={`/images/sprite.svg#icon-trash`} />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={open} close={setOpen} modal={'categories'} slug={slug} token={token} text={'category'} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/categories`, {
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
      categories: data.categories,
    },
  };
}
