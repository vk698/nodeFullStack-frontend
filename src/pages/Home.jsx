import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">

     
     
      <video
        src="/images/spidey.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-0 left-[-22%] h-full w-[50%] object-contain object-bottom-left scale-x-[-1]"
      />

     
      <video
        src="/images/spidey.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-0 right-0 h-full w-[50%] object-contain object-bottom-right"
      />
       <nav className="relative z-10 flex items-center justify-between px-10 py-6">

        <h1 className="text-3xl font-bold text-white">
          MyApp
        </h1>

        <div className="flex items-center gap-8">

          <Link
            to="/notes"
            className="text-lg font-medium text-white hover:text-gray-300"
          >
            Notes
          </Link>

          <Link
            to="/login"
            className="text-lg font-medium text-white hover:text-gray-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-white px-5 py-2.5 font-semibold text-black hover:bg-gray-200"
          >
            Register
          </Link>

        </div>
      </nav>
    </div>
  );
}