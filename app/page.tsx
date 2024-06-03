import TryForFreeBtn from "@/components/TryForFreeBtn";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative m-0 min-h-screen bg-gradient-to-b from-black to-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/grid.png"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-25"
        />
      </div>
      <nav className="relative flex justify-between px-[9rem] pt-[2.5rem]">
        <h1 className="text-white text-[2rem] font-[700]">NexTalk</h1>
        <div className="flex gap-[1.5rem] text-white">
          <Link href="/" className="text-[1.5rem] hover:underline"> Home </Link>
          <Link href="/about" className="text-[1.5rem] hover:underline"> About </Link>
          <Link href="/login" className="text-[1.5rem] hover:underline"> Log In </Link>
          <TryForFreeBtn />
        </div>
      </nav>

      <div className="relative flex justify-between pl-[10rem] pr-[25rem]">
        <div>
          <Image
            src="/images/chatpreview.png"
            alt="chat preview"
            width={640}
            height={480}
            className="transition duration-300 ease-in-out hover:scale-[1.02] mt-[8rem]"
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-[3rem] text-white font-[700] leading-[1.1]">REAL TIME <br /> COMMUNICATION</h1>
            <p className="text-[1.5rem] text-[#ffffff]">From anywhere, with anyone.</p>
          </div>
          <TryForFreeBtn />
        </div>
      </div>
    </div>
  );
}
