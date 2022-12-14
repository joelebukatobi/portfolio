// React
import React from 'react';
import ReactMarkdown from 'react-markdown';
// Next JS
import Head from 'next/head';
// Components
import Aside from '@/global//components/Aside';
import Share from '@/global//components/Share.js';
import Navbar from '@/global//layouts/Navbar';
import Copyright from '@/global//layouts/Copyright';

// Config & Helpers
import { API_URL } from '@/config/index';

export default function Post({ post, categories, keywords }) {
  return (
    <div id="global">
      <Head>
        <meta name="description" content={post.description.substring(0, 100)} />
        <meta property="og:description" content={post.description.substring(0, 100)} />
        <meta property="og:url" content={`https://joelebukatobi.dev/blog/${post.slug} `} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Navbar blog={'navbar__blog'} title="_blog" pagetitle={'Blog | JetDev'} />
      <section className="blogpost container">
        <div className="blogpost__image">
          <img src={`${API_URL}/storage/${post.image}`} alt="post-thumbnail" />
          {/* <img src={post.attributes.image.data.attributes.formats.large.url} alt="blog image" /> */}
        </div>
        <div className="blogpost__main">
          <div className="blogpost__aside">
            <Aside categories={categories} className={'blogpost__categories'} />
            <Share className={'blogpost__share'} />
          </div>
          <div className="blogpost__content">
            <h3>{post.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.post }} />
          </div>
        </div>
      </section>
      <Copyright />
    </div>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await Promise.all([fetch(`${API_URL}/api/posts/${slug}`), fetch(`${API_URL}/api/categories`)]);
  const data = await Promise.all(res.map((res) => res.json()));
  return {
    props: {
      post: data[0].post,
      categories: data[1].categories,
    },
  };
}

Post.defaultProps = {
  keywords:
    'web development, web design, software development, branding, identity branding, mobile app development, mobile app design, ui/ux design, IT consultancy,',
};
