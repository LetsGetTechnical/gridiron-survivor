import AuthButton from "@/components/authbutton/AuthButton";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p className='pb-4'>Gridiron Survivor</p>
        <AuthButton />
      </nav>
    </div>
  );
}
