import {  SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] via-[#e0e7ff] to-[#f3e8ff] px-4 py-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
        
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-purple-200 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to Micropen</h2>
          <p className="text-gray-700 text-base md:text-lg max-w-sm">
            A voice-to-paper platform for educators. Sign up to create, save, and manage question papers effortlessly.
          </p>
          <div className="mt-8 flex space-x-3">
            <span className="w-12 h-12 rounded-full bg-pink-400 opacity-70 blur-sm" />
            <span className="w-16 h-16 rounded-full bg-purple-400 opacity-70 blur-md" />
            <span className="w-12 h-12 rounded-full bg-blue-400 opacity-70 blur-sm" />
          </div>
        </div>

        {/* Right Side - SignIn Form */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white/70">
          <div className="w-full max-w-md">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">Sign Up to Continue</h3>
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
