// React
import { useEffect, useState } from 'react';
// Next JS
import Head from 'next/head';
import { useRouter } from 'next/router';
// Components
import Navbar from '@/admin//layouts/Navbar';
import Body from '@/admin//layouts/Body';
import Sidebar from '@/admin//layouts//Sidebar';
import Loading from '@/admin//components//Loading';
// Config & Helpers
import { API_URL } from '@/config/index';
// External Libraries
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/features//user/userActions';

export default function Layout({ children }) {
  const [user, setUser] = useState();
  //
  const navigate = useRouter().push;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((data) => {
        setUser(data);
        if (data === null) {
          navigate('/admin/login');
        }
      });
  }, []);

  return (
    <>
      <Head>
        <title>Admin | JetDev </title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
      </Head>
      <div id="admin">
        {user ? (
          <>
            <Navbar user={user} />
            <Sidebar user={user} />
            <Body>{children}</Body>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
