import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold font-mono text-cyan-400/30 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Maybe it was lost in the glitch...
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium font-mono text-sm bg-gradient-to-r from-cyan-500 to-violet-600 text-black hover:from-cyan-400 hover:to-violet-500 transition-all duration-200"
        >
          <span>← Back to Grid</span>
        </Link>
      </div>
    </div>
  );
}