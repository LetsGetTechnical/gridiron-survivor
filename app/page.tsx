import AuthButton from '../components/AuthButton';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p className='pb-4'>Gridiron Survivor</p>
        {/* <AuthButton /> */}
        <div className="grid gap-4 border rounded border-orange-600 py-10 px-4 w-screen">
          <Button>Custom Default Button</Button>
        </div>
      </nav>
    </div>
  );
}
