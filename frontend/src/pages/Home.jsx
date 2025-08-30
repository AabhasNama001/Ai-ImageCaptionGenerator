import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 p-4 text-white">
      {/* Background animation elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-20 animate-bg-dots"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes bg-dots {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
          50% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
          75% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-bg-dots {
          animation-name: bg-dots;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.01] border border-gray-700 p-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-white">
          Welcome to AI Image Caption Generator ✨
        </h1>
        <p className="mb-8 text-gray-300">
          Generate creative captions for your images instantly using AI. Perfect
          for social media, blogs, or creative projects.
        </p>

        <Link
          to="/create"
          className="inline-block rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:scale-105 hover:from-purple-600 hover:to-blue-600 transition-transform duration-300"
        >
          Generate Your Caption
        </Link>
      </div>
    </div>
  );
}
