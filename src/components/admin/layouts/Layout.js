// React
import { useEffect } from 'react';
// Next JS
import { useRouter } from 'next/router';
import Head from 'next/head';
// Components
import Navbar from '@/admin//layouts/Navbar';
import Body from '@/admin//layouts/Body';
import Sidebar from '@/admin//layouts/Sidebar';
import Loading from '@/admin//components/Loading';
import Login from '@/admin//components/Login';
// Config & Helpers
import { API_URL } from '@/config/index';
// External Libraries
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/features//user/userActions';

export default function Layout({ children }) {
  const { data, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Head>
        <title>Admin | JetDev</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
      </Head>
      <div id="admin">
        {data ? (
          <>
            <Navbar data={data} />
            <Sidebar state={data} />
            <Body>{children}</Body>
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}
