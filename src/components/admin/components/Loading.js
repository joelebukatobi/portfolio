// Next JS
import Image from 'next/image';
// Assets
import loading from '@/images//loading.gif';

export default function Login() {
  return (
    <div className="loading">
      <div className="h-[4rem] w-[4rem] border-red border-red-600 relative">
        <Image src={loading} alt="loading" layout="fill" object-fit="contain" priority />
      </div>
    </div>
  );
}
