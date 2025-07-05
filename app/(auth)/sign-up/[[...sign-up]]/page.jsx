import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-md overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-blue-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Community</h2>
          <p className="text-gray-600 text-lg">Join us and take advantage of our amazing features. Sign up now to get started.</p>
          <div className="mt-6 flex space-x-4">
            <span className="w-12 h-12 bg-blue-300 rounded-full" />
            <span className="w-16 h-16 bg-purple-300 rounded-full" />
            <span className="w-12 h-12 bg-blue-400 rounded-full" />
          </div>
        </div>
        
        {/* Right Side - SignUp Form */}
        <div className="w-1/2 p-8 flex justify-center items-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
}