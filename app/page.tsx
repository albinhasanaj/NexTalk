import TryForFreeBtn from "@/components/TryForFreeBtn";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // HELA SIDAN
    <main className="scrollbar">

      {/* TOPPEN AV SIDAN */}
      <div className="relative m-0 min-h-screen 
      image__gradient">
        <div className="absolute inset-0">
          <Image
            src="/images/grid.png"
            alt="background"
            layout="fill"
            objectFit="cover"
            className="opacity-25"
          />
        </div>

        {/* NAVBAR */}
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

            {/* BILD */}
            <Image
              src="/images/chatpreview.png"
              alt="chat preview"
              width={640}
              height={480}
              className="transition duration-300 ease-in-out hover:scale-[1.02] mt-[8rem]"
            />
          </div>

          {/* TEXTEN TILL HÖGER OM BILDEN */}
          <div className="flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-[3rem] text-white font-[700] leading-[1.1]">REAL TIME <br /> COMMUNICATION</h1>
              <p className="text-[1.5rem] text-[#ffffff]">From anywhere, with anyone.</p>
            </div>
            <TryForFreeBtn />
          </div>
        </div>
      </div>

      {/* MITTEN AV SIDAN */}
      <div className="flex flex-col items-center">

        {/* TEXT */}
        <div>
          <h1 className="text-[3rem] font-[700] text-white text-center leading-[1.2] mt-[7rem]">Features  Designed For <br /> Fun Chatting</h1>
          <p className="text-[1.3rem] text-center mt-[1rem]">Explore various features within this app, designed <br /> to enhance user experience to its fullest.</p>
        </div>

        {/* FEATURES */}
        <div className="w-[61rem] h-[14rem] bg-[#222] mt-[5rem] mb-[2rem] rounded-[10px] flex flex-col justify-center items-center gap-[1rem] shadow-[rgba(120,120,120,50)]">
          <div className="flex gap-[5rem]">
            <div className="flex items-center gap-[0.5rem]">
              <Image src="/icons/like-chats.svg" alt="feature1" width={48} height={48} />
              <span className="text-[1.5rem] text-white">Like Chats</span>
            </div>

            <div className="flex items-center gap-[0.5rem]">
              <Image src="/images/customize-profile.png" alt="feature1" width={48} height={48} />
              <span className="text-[1.5rem] text-white">Customize Profile</span>
            </div>

            <div className="flex items-center gap-[0.5rem]">
              <Image src="/images/nickname.png" alt="feature1" width={48} height={48} />
              <span className="text-[1.5rem] text-white">Nicknames</span>
            </div>
          </div>

          <div className="flex gap-[5rem]">
            <div className="flex items-center gap-[0.5rem]">
              <Image src="/images/pin-friends.png" alt="feature1" width={48} height={48} />
              <span className="text-[1.5rem] text-white">Pin Friends</span>
            </div>

            <div className="flex items-center gap-[0.5rem]">
              <Image src="/images/reaction.png" alt="feature1" width={48} height={48} />
              <span className="text-[1.5rem] text-white">Reactions</span>
            </div>
          </div>
        </div>
        <TryForFreeBtn />
      </div>

      {/* MITTEN AV SIDAN 2 */}
      <div className="mt-[13rem]">

        <div className="flex justify-between mx-[13rem]">
          <div>
            <div className="mb-[2rem]">
              <h1 className="text-[3rem] text-white leading-[1.1] mb-[0.5rem]">Powered by the <br /> most powerful <br /> technologies</h1>
              <p className="text-[1.3rem]">At NexTalk, we use the most advanced <br /> technologies to ensure a smooth and beautiful user <br /> experience, as well as keeping you and your data <br /> safe.</p>
            </div>
            <TryForFreeBtn />
          </div>

          {/* COLLAGE */}
          <div className="flex gap-[27px]">
            <div className="flex flex-col gap-[27px]">
              <div className="w-[250px] h-[200px] rounded-[15px] bg-white"></div>
              <div className="w-[250px] h-[200px] rounded-[15px] bg-white"></div>
            </div>
            <div>
              <div className="w-[250px] h-[427px] rounded-[15px] bg-white"></div>
            </div>
          </div>
        </div>

      </div>

      {/* SLUTET AV SIDAN */}
      <div className="flex items-center mt-[13rem] flex-col">
        <div className="flex flex-col items-center">
          <h1 className="text-[3rem] text-white font-[700]">Any Questions?</h1>
          <p className="text-[1.3rem]">Feel free to send us a message!</p>
        </div>

        <form action="">

          <div className="flex flex-col">
            <label htmlFor="name">Full Name*</label>
            <input placeholder="John Doe" id="name" type="text" className="px-[0.7rem] w-[32rem] h-[3rem] bg-[rgba(66,65,65,0.10)] border-white border-solid border-[1px] rounded-[5px] placeholder-[rgba(255,255,255,0.5)] text-white" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email Address*</label>
            <input placeholder="johndoe@gmail.com" id="email" type="email" className="px-[0.7rem] w-[32rem] h-[3rem] bg-[rgba(66,65,65,0.10)] border-white border-solid border-[1px] rounded-[5px] placeholder-[rgba(255,255,255,0.5)] text-white" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message">Message*</label>
            <textarea placeholder="Type your message here..." id="message" className="px-[0.7rem] py-[0.5rem] w-[32rem] h-[10rem] bg-[rgba(66,65,65,0.10)] border-white border-solid border-[1px] rounded-[5px] placeholder-[rgba(255,255,255,0.5)] text-white scrollbar" />
          </div>
        </form>
      </div>
    </main>
  );
}
