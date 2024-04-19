import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  // value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const InputField = ({ label, placeholder, onChange, className }: InputFieldProps) => {
  return (
    <>
      <label className="sr-only">{label}</label>
      <Input
        type="text"
        // value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("text-base text-zinc-900 border-zinc-300 placeholder:border-zinc-400", className)}
      />
    </>
  );
}