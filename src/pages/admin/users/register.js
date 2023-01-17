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

export default function Register({ token }) {
  // Assigns Next JS useRouter to a variable
  const navigate = useRouter();
  const { loading } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [content, setContent] = useState();

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
    body.append('first_name', firstName);
    body.append('last_name', lastName);
    body.append('username', userName);
    body.append('image', image);
    body.append('role_id', role);
    body.append('email', email);
    body.append('password', password);
    body.append('password_confirmation', passwordConfirmation);
    // Post Requests
    const res = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Saved: User created successfully');
      setTimeout(() => {
        setContent();
        navigate.push(`/admin/users/${data.user.username}`);
      }, 5000);
    } else {
      toast.error(`Error ${data.message}`);
    }
  };

  return (
    <Layout>
      {loading && <Loading />}
      {token && (
        <div className="w-1/2">
          <ToastContainer autoClose={4000} position="bottom-right" theme="colored" />
          <header className="flex flex-col ">
            <div className="flex items-center mb-[1.6rem]">
              <h3 className="text-black/90 mr-[1.6rem]">Users</h3>
              <figcaption onClick={handleSubmit} className="tag">
                <p>Register</p>
              </figcaption>
            </div>

            <div className="flex">
              <Link href="/admin">
                <h5 className="text-black/70 hover:text-black">Dashboard &nbsp;</h5>
              </Link>
              <h5>&gt; &nbsp;</h5>
              <Link href={`/admin/users`}>
                <h5 className=" text-black/70 hover:text-black">All Users &nbsp;</h5>
              </Link>
            </div>
          </header>
          <form action="" className="mt-[4rem]" onSubmit={handleSubmit}>
            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'first_name'}
                label={'First Name'}
                placeholder="First Name"
                type={'text'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
              <Input
                name={'last_name'}
                label={'Last Name'}
                placeholder="Last Name"
                type={'text'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
            </div>
            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'username'}
                label={'Username'}
                placeholder="Username"
                type={'text'}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
              <Input
                name={'image'}
                label={'Profile Picture'}
                placeholder={'Profile Picture'}
                type={'file'}
                onChange={(e) => imageChange(e.target.files)}
                required
                after={content || 'Upload an image'}
                className={'mb-[2.4rem] '}
              />
            </div>
            <div className="flex items-start gap-x-[3.2rem] mb-[2.4rem];">
              <Input
                name={'email'}
                label={'Email'}
                placeholder="Email"
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={'mb-[2.4rem]'}
              />
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
              {/* <Select placeHolder="Role" label="Role" options={options} onChange={(value) => setRole(value.value)} /> */}
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

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}
