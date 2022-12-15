// React
import { useEffect, useState } from 'react';
// Next JS
import { useRouter } from 'next/router';
import Link from 'next/link';
// Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '@/features///user/userActions';

export default function Sidebar({ state }) {
  // Route Management
  const pathname = useRouter().pathname;
  const navigate = useRouter().push;

  // State
  const [open, setOpen] = useState(false);

  // // Logout Dispatch
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLogout())
      .unwrap()
      .then(() => navigate('/admin'));
  };

  // Toggle Menu
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <div className="">
        <ul>
          <li
            className={`
            ${pathname === '/admin' ? ' text-black font-bold' : 'text-black/70'}`}
          >
            <div className="flex items-center">
              <div className="h-[2rem]">
                <svg
                  className={`${pathname === '/admin' ? ' stroke-black' : 'stroke-black/70'}`}
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M9 22V12H15V22" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <Link href="/admin">Dashboard</Link>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path
                d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                stroke=""
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li
            className={`
            ${pathname === '/admin/posts' || pathname.includes('posts') ? 'text-black font-bold' : 'text-black/70'}`}
          >
            <div className="flex items-center">
              <div className="h-[2rem]">
                <svg
                  className={`${
                    pathname === '/admin/posts' || pathname.includes('posts') ? ' stroke-black' : 'stroke-black/70'
                  }`}
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link href="/admin/posts">Posts</Link>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path
                d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                stroke=""
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li
            className={`
            ${
              pathname === '/admin/categories' || pathname.includes('categories')
                ? ' text-black font-bold'
                : 'text-black/70'
            }`}
          >
            <div className="flex items-center">
              <div className="h-[2rem]">
                <svg
                  className={`${
                    pathname === '/admin/categories' || pathname.includes('categories')
                      ? 'stroke-black'
                      : 'stroke-black/70'
                  }`}
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17" cy="17" r="3" stroke="" strokeWidth="2" />
                  <path
                    d="M4 19V15C4 14.4477 4.44772 14 5 14H9C9.55228 14 10 14.4477 10 15V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19Z"
                    stroke=""
                    strokeWidth="2"
                  />
                  <path
                    d="M4 9V5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9Z"
                    stroke=""
                    strokeWidth="2"
                  />
                  <path
                    d="M14 9V5C14 4.44772 14.4477 4 15 4H19C19.5523 4 20 4.44772 20 5V9C20 9.55228 19.5523 10 19 10H15C14.4477 10 14 9.55228 14 9Z"
                    stroke=""
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <Link href="/admin/categories">Categories</Link>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path
                d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                stroke=""
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li
            className={`
            ${pathname === '/admin/tags' || pathname.includes('tags') ? ' text-black font-bold' : 'text-black/70'}`}
          >
            <div className="flex items-center">
              <div className="h-[2rem]">
                <svg
                  className={`${
                    pathname === '/admin/tags' || pathname.includes('tags') ? ' stroke-black' : 'stroke-black/70'
                  }`}
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link href="/admin/tags">Tags</Link>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path
                d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                stroke=""
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <li
            className={`
            ${
              pathname === '/admin/projects' || pathname.includes('projects')
                ? ' text-black font-bold'
                : 'text-black/70'
            }`}
          >
            <div className="flex items-center">
              <div className="h-[2rem]">
                <svg
                  className={`${
                    pathname === '/admin/projects' || pathname.includes('projects')
                      ? ' stroke-black'
                      : 'stroke-black/70'
                  }`}
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <Link href="/admin/projects">Projects</Link>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path
                d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                stroke=""
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          {state.role.id ? (
            <li
              className={`${
                pathname === '/users' || pathname.includes('users') ? ' text-black font-bold ' : 'text-black/70'
              } no-highlight`}
              onClick={toggle}
            >
              <div className="flex items-center">
                <div className="h-[2rem]">
                  <svg
                    className={`${
                      pathname === '/user' || pathname.includes('user') ? ' stroke-black' : 'stroke-black/70'
                    }`}
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Users
              </div>
              <svg
                className={`${
                  open && (pathname === '/admin' || pathname === '/users' || pathname.includes('users'))
                    ? ' stroke-black font-bold rotate-180'
                    : 'stroke-black/70'
                }`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                  stroke=""
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <ul className={open ? 'block no-highlight' : 'hidden'}>
                <li>
                  <Link href="/admin/users">All Users</Link>
                </li>
                <li>
                  <Link href={`/admin/users/${state.username}`}>My Profile</Link>
                </li>
              </ul>
            </li>
          ) : (
            <li
              className={`${
                pathname === '/users' || pathname.includes('users') ? ' text-black font-bold' : 'text-black/70'
              }`}
            >
              <div className="flex items-center">
                <div className="h-[2rem]">
                  <svg
                    className={`${
                      pathname === '/users' || pathname.includes('users') ? ' stroke-black' : 'stroke-black/70'
                    }`}
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke=""
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Link href={`/admin/users/${state.username}`}>Profile</Link>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden"
              >
                <path
                  d="M6.19043 9.36914L12.1904 15.3691L18.1904 9.36914"
                  stroke=""
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          )}
        </ul>
      </div>

      <div>
        <ul>
          <li className="text-black/70 hover:text-black">
            <div className="flex items-center">
              <div className="h-[2rem]">
                <svg
                  className="stroke-black/70 hover:stroke-black"
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.2959 21.5586H5.2959C4.76547 21.5586 4.25676 21.3479 3.88168 20.9728C3.50661 20.5977 3.2959 20.089 3.2959 19.5586V5.55859C3.2959 5.02816 3.50661 4.51945 3.88168 4.14438C4.25676 3.76931 4.76547 3.55859 5.2959 3.55859H9.2959"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.2959 17.5586L21.2959 12.5586L16.2959 7.55859"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.2959 12.5586H9.2959"
                    stroke=""
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                onClick={(e) => (
                  e.preventDefault(),
                  setTimeout(() => {
                    logout();
                  }, 1500)
                )}
              >
                Logout
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
