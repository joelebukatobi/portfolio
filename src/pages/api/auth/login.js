import cookie from 'cookie';
import { API_URL } from '@/config//index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const api = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await api.json();

    if (api.ok) {
      // setCookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      );

      res.status(200).json(data);
    } else {
      res.json({
        message: data.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
