import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="flex flex-col sm:flex-row w-full py-8 bg-slate-200" >
        <p className='flex justify-center text-black text-xl font-semibold pr-0  pb-5 sm:pb-0 pl-5 sm:pr-20 sm:pl-20'>Sustainability Checker</p>
        <ul className="flex justify-end items-center flex-wrap gap-5 ml-0 sm:ml-20 mr-20">
            <li className="block text-black hover:text-cyan-600 hover:-translate-y-1"><Link href="/">Home</Link></li>
            <li className="block text-black hover:text-cyan-600 hover:-translate-y-1"><Link href="/about">How it works</Link></li>
            <li className="block text-black hover:text-cyan-600 hover:-translate-y-1"><Link href="/submission">Submission</Link></li>
            <li className="block text-black hover:text-cyan-600 hover:-translate-y-1"><Link href="/login">Log In</Link></li>
            <form >
            <input type="text" placeholder="Search.." ></input>
            </form>
            </ul>
        </div>
    </div>
  );
}
