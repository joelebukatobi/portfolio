import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import '../assets/styles/main.scss';
import store from 'store/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
