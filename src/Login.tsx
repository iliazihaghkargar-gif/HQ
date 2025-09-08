import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const CORRECT_ID = '876547';
  const CORRECT_PASSWORD = 'EO-ny0987-ioprm';
  const MAX_ATTEMPTS = 3;
  const LOCK_DURATION = 30; // seconds

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockTime > 0) {
      interval = setInterval(() => {
        setLockTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            setError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`System locked. Try again in ${lockTime} seconds.`);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (id === CORRECT_ID && password === CORRECT_PASSWORD) {
        setError('');
        // Success animation before login
        setTimeout(() => {
          onLogin();
        }, 1000);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true);
          setLockTime(LOCK_DURATION);
          setError(`Too many failed attempts. System locked for ${LOCK_DURATION} seconds.`);
        } else {
          setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
        }
        
        // Clear form on error
        setId('');
        setPassword('');
      }
      setIsLoading(false);
    }, 1500);
  };

  const isFormValid = id.length > 0 && password.length > 0;
  const isSuccess = id === CORRECT_ID && password === CORRECT_PASSWORD && !error && isLoading;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main login container */}
      <div className={`relative z-10 w-full max-w-md mx-4 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Glowing border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-2xl blur-sm opacity-30 animate-pulse"></div>
        
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-green-500/50 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 border-b border-green-500/30">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full border border-green-500/30 mb-4">
                <div className="absolute w-16 h-16 bg-green-400/20 rounded-full blur-md animate-pulse"></div>
                <Shield className="relative w-8 h-8 text-green-400 animate-pulse" />
              </div>
              
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-2">
                SECURE ACCESS
              </h1>
              <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
          </div>

          {/* Login form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ID Field */}
              <div className="space-y-2">
                <label className="block text-green-300 text-sm font-semibold">
                  ACCESS ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 placeholder-gray-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300 font-mono"
                    placeholder="Enter your ID"
                    disabled={isLocked}
                    maxLength={6}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-green-300 text-sm font-semibold">
                  SECURITY KEY
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 pr-12 text-green-400 placeholder-gray-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300 font-mono"
                    placeholder="Enter your security key"
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-400 transition-colors duration-200"
                    disabled={isLocked}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              {/* Success message */}
              {isSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 animate-pulse" />
                  <span className="text-green-400 text-sm">Access granted! Loading...</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading || isLocked}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 relative overflow-hidden ${
                  isFormValid && !isLoading && !isLocked
                    ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-400/25 transform hover:scale-105'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLocked ? (
                  `LOCKED (${lockTime}s)`
                ) : isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    AUTHENTICATING...
                  </div>
                ) : (
                  'ACCESS SYSTEM'
                )}
                
                {/* Button glow effect */}
                {isFormValid && !isLoading && !isLocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 animate-pulse"></div>
                )}
              </button>
            </form>

            {/* Security info */}
            <div className="mt-6 pt-4 border-t border-green-500/20">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Attempts: {attempts}/{MAX_ATTEMPTS}</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  ENCRYPTED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default Login;