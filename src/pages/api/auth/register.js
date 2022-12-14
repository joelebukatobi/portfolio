import cookie from 'cookie';
import { API_URL } from '@/config//index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { first_name, last_name, username, email, password, password_confirmation, role_id } = req.body;

    const api = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
        password_confirmation,
        role_id,
      }),
    });

    const data = await api.json();

    if (api.success === true) {
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
