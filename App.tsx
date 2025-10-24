
import React, { useState, FC } from 'react';
import { UserData, CreditStatus } from './types';

// --- Static Data ---
const sampleData: UserData[] = [
  { email: 'aa@aa.com', name: 'Alex Anderson', creditStatus: CreditStatus.OK },
  { email: 'bb@bb.com', name: 'Bailey Brown', creditStatus: CreditStatus.NOT_OK },
];


// --- Helper Components (defined outside the main App component) ---

const LoadingSpinner: FC = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

interface ResultCardProps {
  user: UserData;
}

const ResultCard: FC<ResultCardProps> = ({ user }) => {
  const isOk = user.creditStatus === CreditStatus.OK;
  const imageUrl = `https://picsum.photos/seed/${user.email}/500/300${isOk ? '' : '?grayscale'}`;
  const statusColor = isOk ? 'text-green-400 bg-green-900/50' : 'text-red-400 bg-red-900/50';
  const borderColor = isOk ? 'border-green-500/30' : 'border-red-500/30';

  return (
    <div className={`bg-gray-800 rounded-2xl overflow-hidden border ${borderColor} shadow-2xl shadow-black/30 animate-fade-in`}>
      <img src={imageUrl} alt="AI generated placeholder" className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-xl font-bold text-white">{user.name}</p>
            <p className="text-sm text-gray-400 mt-2">Email</p>
            <p className="text-md text-gray-300">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Credit Score</p>
            <span className={`px-4 py-1.5 rounded-full text-lg font-semibold ${statusColor}`}>
              {user.creditStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---

function App() {
  const [email, setEmail] = useState<string>('');
  const [result, setResult] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setError(null);

    // Simulate network delay for a better UX
    setTimeout(() => {
      const foundUser = sampleData.find(user => user.email.toLowerCase() === email.toLowerCase().trim());
      if (foundUser) {
        setResult(foundUser);
      } else {
        setError('Email not found. Try "aa@aa.com" or "bb@bb.com".');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md mx-auto text-center">
        
        <header className="mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            ConCreds
          </h1>
          <p className="text-gray-400 mt-2">Check your conceptual credit score instantly.</p>
        </header>

        <form onSubmit={handleCheckScore} className="flex flex-col gap-4">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email (e.g., aa@aa.com)"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Checking...</span>
              </>
            ) : (
              'Check Score'
            )}
          </button>
        </form>

        <div className="mt-8 h-80 flex items-center justify-center">
          {!isLoading && !error && !result && (
              <p className="text-gray-500">Your credit score result will appear here.</p>
          )}
          {isLoading && (
             <div className="flex flex-col items-center gap-2 text-gray-400">
               <LoadingSpinner />
               <p>Analyzing records...</p>
             </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg animate-fade-in">
              <p>{error}</p>
            </div>
          )}
          {result && <ResultCard user={result} />}
        </div>
        
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
