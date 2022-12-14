// Config
import { API_URL } from '@/config//index';
// Cookies
import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    const api = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // deleteCookie
    if (api.ok) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/',
        })
      );
    }

    res.status(200).json({ message: 'User logged out successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
