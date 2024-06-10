import { Metadata } from 'next';
import Register from './Register';

export const metadata: Metadata = {
  title: '...',
  description: '...',
};

export default async function RegisterPage() {
  return <Register />;
}
