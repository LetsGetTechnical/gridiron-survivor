// import AuthButton from "@/components/AuthButton";
import Login from "./login/page";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
        {/* <AuthButton /> */}
   <Login />
      </nav>
    </div>
  );
}