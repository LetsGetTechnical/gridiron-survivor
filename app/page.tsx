import AuthButton from '../components/AuthButton';

export default function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <nav className="flex w-full flex-1 flex-col items-center justify-center">
        <p>Gridiron Survivor</p>
        <AuthButton />
      </nav>
    </div>
  );
}
