// React
import { useState, useEffect } from 'react';
// Next JS
import { useRouter } from 'next/router';
// Components
import Input from '@/admin//elements/Input';
import Button from '@/admin//elements/Button';
import Loading from '@/admin//components//Loading';
// External Libraries
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@/features//user/userActions';

export default function Login() {
  const reload = useRouter().reload;
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    dispatch(userLogin(data))
      .unwrap()
      .then(() => {
        reload('/admin');
      });
  };

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="register">
          <section>
            <header>
              <figure>
                <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V17C13 15.8954 13.8954 15 15 15H19C20.1046 15 21 15.8954 21 17V19ZM11 19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11H9C10.1046 11 11 11.8954 11 13V19ZM21 11C21 12.1046 20.1046 13 19 13H15C13.8954 13 13 12.1046 13 11V5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V11ZM11 7C11 8.10457 10.1046 9 9 9H5C3.89543 9 3 8.10457 3 7V5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V7Z"
                    fill=""
                  />
                </svg>
              </figure>
              <h2>
                Admin <br />
                Dashboard
              </h2>
            </header>
            <p>To register an account kindly enter your credentials below</p>
            <form className="w-full" onSubmit={handleSubmit}>
              <Input
                type={'email'}
                placeholder={'Email'}
                classButton={'top-[.8rem] invisible'}
                label={'Email'}
                classInput={'mt-[.8rem]'}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type={'password'}
                placeholder={'Password'}
                classButton={'top-[.8rem] invisible'}
                label={'Password'}
                classInput={'mt-[.8rem]'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className={'mt-[.8rem]'}>Login </Button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
