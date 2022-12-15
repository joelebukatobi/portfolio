// React
import { useEffect } from 'react';
// Next JS
import Link from 'next/link';
// Components
import Input from '@/admin//elements/Input';
// Config
import { API_URL } from '@/config//index';
// Redux Toolkit/admin

export default function Navbar({ data }) {
  // const { data } = useSelector((state) => state.user);
  return (
    <nav className="nav">
      <Link href="/admin">
        <div className="nav_logo">
          <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V17C13 15.8954 13.8954 15 15 15H19C20.1046 15 21 15.8954 21 17V19ZM11 19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11H9C10.1046 11 11 11.8954 11 13V19ZM21 11C21 12.1046 20.1046 13 19 13H15C13.8954 13 13 12.1046 13 11V5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V11ZM11 7C11 8.10457 10.1046 9 9 9H5C3.89543 9 3 8.10457 3 7V5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V7Z"
              fill=""
            />
          </svg>
          <div className="flex flex-col">
            <h5 className="font-bold">Admin</h5>
            <h6>Dashboard</h6>
          </div>
        </div>
      </Link>

      {/* <div className="nav_search">
        <Input
          placeholder={'Search'}
          classButton={'!visible'}
          svg={'icon-search'}
          classLabel={'hidden'}
          classInput={'mt-0'}
        />
      </div> */}

      <div className="nav_user">
        <img
          src={data.image === null ? `/images/user-placeholder.png` : `${API_URL}/storage/${data.image}`}
          alt="User's Image"
        />
        <div className="flex flex-col">
          <h5 className="font-semibold">Administrator</h5>
          <h6>{data.first_name + ' ' + data.last_name}</h6>
        </div>
      </div>
    </nav>
  );
}
