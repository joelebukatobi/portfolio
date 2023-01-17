// React
import { useState, useEffect } from 'react';
// Next JS
import Link from 'next/link';
import { useRouter } from 'next/router';
// Components
import Input from '@/admin//elements/Input';
import Select from '@/admin//elements/Select';
import Layout from '@/admin//layouts/Layout';
import Loading from '@/admin//components/Loading';
// Config & Helpers
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers//index';
// External Libraries
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Profile({ token, user, username }) {
  // Assigns Next JS useRouter to a variable
  const navigate = useRouter();
  // State Management
  const { data, loading } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [image, setImage] = useState();
  const [role, setRole] = useState(user.role.id);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [content, setContent] = useState(user.image);
  // handleChange
  const imageChange = (file) => {
    setImage(file[0]);
    setContent(file[0].name);
  };

  // Role Options
  const options = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Editor' },
    { value: '3', label: 'Author' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // FormData
    const body = new FormData();
    // body.append('_method', 'put');
    body.append('first_name', firstName);
    body.append('last_name', lastName);
    body.append('username', username);
    body.append('new_image', image);
    body.append('role_id', role);
    body.append('email', email);
    body.append('password', password);
    body.append('password_confirmation', passwordConfirmation);
    // Post Requests
    const res = await fetch(`${API_URL}/api/users/${username}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Updated: User updated successfully');
      setTimeout(() => {
        setContent();
        navigate.push(`/admin/users/${user.username}`);
      }, 5000);
    } else {
      toast.error(`Error: ${data.message}`);
    }
  };

  return (
    <Layout>
      {loading && <Loading />}
      {user && (
        <div className="w-1/2">
          <ToastContainer autoClose={4000} position="bottom-right" theme="colored" />
          <header className="flex flex-col ">
            <div className="flex items-center mb-[1.6rem]">
              <h3 className="text-black/90 mr-[1.6rem]">Welcome {user.first_name}</h3>
              <figcaption onClick={handleSubmit} className="tag">
                <p>Save</p>
              </figcaption>
            </div>

            <div className="flex">
              <Link href="/admin">
                <h5 className="text-black/70 hover:text-black">Dashboard &nbsp;</h5>
              </Link>
              <h5>&gt; &nbsp;</h5>
              {loading === false && user.role.id === '1' ? (
                <>
                  <Link href={`/admin/users`}>
                    <h5 className=" text-black/70 hover:text-black">Users &nbsp;</h5>
                  </Link>
                  <h5>&gt; &nbsp;</h5>
                </>
              ) : (
                ''
              )}
              <Link href={`/admin/users/${user.username}`}>
                <h5 className=" text-black/70 hover:text-black">User &nbsp;</h5>
              </Link>
            </div>
          </header>
          <form className="mt-[4rem]" onSubmit={handleSubmit}>
            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'first_name'}
                label={'First Name'}
                placeholder={`${user.first_name}`}
                type={'text'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
              <Input
                name={'last_name'}
                label={'Last Name'}
                placeholder={`${user.last_name}`}
                type={'text'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
            </div>
            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'email'}
                label={'Email'}
                placeholder={`${user.email}`}
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
            </div>
            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'new_image'}
                label={'Profile Picture'}
                placeholder={'Profile Picture'}
                type={'file'}
                onChange={(e) => imageChange(e.target.files)}
                required
                after={content || 'Upload an image'}
                className={'mb-[2.4rem] '}
              />
              {loading === false && user.role.id === 1 ? (
                <div className="w-full">
                  <label className="text-black/70" htmlFor="role">
                    Role
                  </label>
                  <section className="!w-full !h-[5rem] border-[.16rem]  border-[#ECECEC] rounded-[.4rem] mt-[.8rem] pr-[.8rem]">
                    <select
                      name="role"
                      className="w-full h-full bg-white outline-none rounded-[.4rem] pl-[.8rem] mb-0"
                      required
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value={1}>Admin</option>
                      <option value={2}>Editor</option>
                      <option value={3}>Author</option>
                    </select>
                  </section>
                </div>
              ) : (
                // <Select placeHolder="Role" label="Role" options={options} onChange={(value) => setRole(value.value)} />
                ''
              )}
            </div>

            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'password'}
                label={'Password'}
                placeholder={'Password'}
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
              <Input
                name={'password_confirmation'}
                label={'Confirm Password'}
                placeholder={'Password'}
                type={'password'}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { profile } }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/users/${profile}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data.user);
  return {
    props: {
      token,
      username: profile,
      user: data.user,
    },
  };
}
