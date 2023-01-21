// Next JS
import Link from 'next/link';
import Head from 'next/head';
// Components
import Aside from '@/global//components/Aside';
import Layout from '@/global//layouts/Layout';

import { API_URL } from '@/config/index';
const qs = require('qs');

export default function Category({ posts, category, categories, keywords }) {
  return (
    <>
      <Layout
        blog={'navbar__blog'}
        description={category.description.substring(0, 100)}
        header="_blog"
        site_name={site_name}
        title={category.name}
        url={`https://joelebukatobi.dev/blog/category/${category.slug}`}
        keywords={keywords}
        article_section={category.name}
      >
        <section className="blog container">
          <div className="blog__right">
            <Aside categories={categories} />
          </div>
          <div className="blog__left">
            <div className="blog__heading">
              <p>
                <Link href="/blog">Blog</Link> / <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
              </p>
              <p>{category.description}</p>
            </div>
            {posts.map((post) => (
              <div className="blog__card">
                <h4>{post.title}</h4>
                <p>{post.description.substring(0, 250)}...</p>
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { category } }) {
  const res = await Promise.all([
    fetch(`${API_URL}/api/posts?category=${category}`),
    fetch(`${API_URL}/api/categories/${category}`),
    fetch(`${API_URL}/api/categories`),
  ]);
  const data = await Promise.all(res.map((res) => res.json()));
  return {
    props: {
      posts: data[0].posts,
      category: data[1].category,
      categories: data[2].categories,
    },
  };
}

Category.defaultProps = {
  keywords:
    'web development, web design, software development, branding, identity branding, mobile app development, mobile app design, ui/ux design, IT consultancy, web development, html, css, tailwindcss, tailwind javascript, responsive design, seo optimization, frontend, front-end, backend, back-end, full stack, front-end development, backend development, frontend web development, backend web development, web design, cross-browser compatibility, user experience (UX), web performance optimization, react, vue, CMS, strapi, payload cms, web standards, accessibility, git, webpack, web development trends, web development best practices, jQuery, bootstrap, php, wordpress, laravel, amazon web services, docker, github, github actions, kubernetes, terraform, typescript, python, fast api, elixir, phoenix, testing, cypress',
  site_name: 'Blog | JetDev',
};
