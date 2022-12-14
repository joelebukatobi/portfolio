// Components
import Button from '@/admin//elements/Button';
// Next JS
import { useRouter } from 'next/router';
// Config & Helpers
import { API_URL } from '@/config/index';
// Extblankernal Libraries
import { ToastContainer, toast } from 'react-toastify';

export default function Modal({ open, close, modal, slug, token, text }) {
  // Brings in next/router
  const navigate = useRouter();
  // Handles category delete
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/${modal}/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(`Deleted: ${text} deleted successfully`);
      setTimeout(() => {
        close(false);
        navigate.push(`/admin/${modal}`);
      }, 5000);
    } else {
      toast.error(`Error: ${data.message}`);
    }
  };
  return (
    <>
      <ToastContainer autoClose={4000} position="bottom-right" theme="colored" />
      <div className={open ? 'modal' : 'hidden'}>
        <main>
          <header>
            <h4>Confirmation</h4>
          </header>
          <section>
            <div className="h-[6.4rem] w-[6.4rem] rounded-[100%] bg-red-100 p-[1.6rem] mb-[1.6rem]">
              <svg className="stroke-red-600">
                <use href={`/images/sprite.svg#icon-trash`} />
              </svg>
            </div>
            <p>Are you sure you want to delete this {text}</p>
          </section>
          <footer>
            <Button
              onClick={() => {
                close(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleDelete}>Confirm</Button>
          </footer>
        </main>
      </div>
    </>
  );
}
