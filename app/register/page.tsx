import { Metadata } from 'next';
import Register from './Register';

export const metadata: Metadata = {
  title: 'Registration | Gridiron Survivor',
  description: 'Fantasy Football Survivor Pool',
};

export default async function RegisterPage() {
  return <Register />;
}
