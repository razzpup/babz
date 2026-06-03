'use client';
import Link from 'next/link';



export default function CoolButton() {

  return (
    <Link href="/discography">
<button
  className="relative cursor-pointer border-2 border-primary group hover:border-[#5c0617] w-12 h-12 rounded-full duration-500 overflow-hidden flex items-center justify-center"
  type="button"
  
>
  <p
    className="font-Manrope  text-3xl h-full w-full flex items-center justify-center text-red-900 duration-500 relative z-10 group-hover:scale-0"
  >
    ×
  </p>
  <span className="absolute w-full h-full bg-primary group-hover:bg-[#c11c3d] hover:bg-[#9b0724] rotate-45 group-hover:top-6 duration-500 top-12 left-0"
  ></span>
  <span
     className="absolute w-full h-full bg-primary group-hover:bg-[#e5e5e5] hover:bg-[#b4b4b4] rotate-45 top-0 group-hover:left-6 duration-500 left-12"
  ></span>
  <span
     className="absolute w-full h-full bg-primary group-hover:bg-[#e5e5e5] hover:bg-[#b4b4b4] rotate-45 top-0 group-hover:right-6 duration-500 right-12"
  ></span>
  <span
className="absolute w-full h-full bg-primary group-hover:bg-[#c11c3d] hover:bg-[#9b0724] rotate-45 group-hover:bottom-6 duration-500 bottom-12 right-0"
  ></span>
</button>
</Link>
  );
}
