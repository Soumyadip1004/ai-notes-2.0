import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Header from "./header";

export default function Navbar() {
  const isUser = null;

  return (
    <Header>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          height={40}
          width={40}
          alt="Logo"
          className="size-12"
        />
        <span className="flex flex-col text-2xl leading-5 font-extrabold text-white">
          AI <span className="text-[16px] font-medium">Notes</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {isUser ? (
          <Button className="rounded-[8px]">Logout</Button>
        ) : (
          <>
            <Button
              className="rounded-[8px] max-sm:hidden"
              variant="outline"
              asChild
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button className="rounded-[8px]" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
      </div>
    </Header>
  );
}
