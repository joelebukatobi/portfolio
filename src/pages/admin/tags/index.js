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

export default function index({ tags, token }) {
  // Store values gotten from form
  const [slug, setSlug] = useState('');
  const [open, setOpen] = useState(false);
  // Toggle Modal
  const toggle = () => {
    setOpen(true);
  };

  // Set table ID
  let id = 1;
  return (
    <Layout>
      <div>
        <header className="flex items-center">
          <h3 className="text-black/90 mr-[1.6rem]">Tags</h3>
          <div className="tag">
            <p>
              <Link href="/admin/tags/create/">Create New</Link>
            </p>
          </div>
        </header>
        <div className="mt-[2.4rem] border-[.1rem] border-black/10 rounded-[.8rem]">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tag</th>
                <th>Published Date</th>
                <th className="@apply rounded-tr-[.8rem] w-[10%] pl-[0]">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => {
                return (
                  <tr key={tag.id}>
                    <td>{id++}</td>
                    <td className="capitalize">{tag.name}</td>
                    <td>{moment(tag.created_at).format('L')}</td>
                    <td>
                      <div className="flex items-center gap-x-[.8rem] pl-[1.6rem]">
                        <Link href={`/admin/tags/${tag.slug}/`}>
                          <svg className="hover:stroke-green-600">
                            <use href={`/images/sprite.svg#icon-post`} />
                          </svg>
                        </Link>
                        <div onClick={(e) => (e.preventDefault(), setSlug(tag.slug), setOpen(toggle))}>
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
      <Modal open={open} close={setOpen} modal={'tags'} slug={slug} token={token} text={'Tag'} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  console.log(token);
  const res = await fetch(`${API_URL}/api/tags`, {
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
      tags: data.tags,
    },
  };
}
