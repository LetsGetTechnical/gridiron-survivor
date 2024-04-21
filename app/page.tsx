import AuthButton from '../components/AuthButton';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
        <AuthButton />
      </nav>
    </div>
  );
}