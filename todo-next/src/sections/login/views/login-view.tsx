'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);
      login(response.token, response.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        
        {/* Additional floating orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-300/15 to-blue-300/15 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-300/15 to-pink-300/15 rounded-full blur-2xl animate-float" style={{animationDelay: '2.5s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-indigo-400/30 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-teal-400/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fadeInUp">
        {/* Enhanced glass card */}
        <div className="glass-strong bg-white/85 border border-white/40 rounded-3xl shadow-2xl p-10 transition-all duration-700 hover:shadow-3xl hover:bg-white/90 hover-lift backdrop-blur-xl relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-50/20 rounded-3xl"></div>
          
          {/* Header */}
          <div className="text-center mb-10 animate-slideInFromLeft relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 animate-glow relative overflow-hidden group">
              {/* Icon background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg opacity-80 font-medium">Secure access to your account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-8 p-5 bg-red-50/95 border border-red-200/70 text-red-700 rounded-2xl glass animate-shake backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-red-100/50"></div>
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 mr-3">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="font-medium">{error}</div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Email field */}
            <div className="group animate-slideInFromLeft" style={{animationDelay: '0.1s'}}>
              <label htmlFor="email" className={`block text-sm font-bold mb-3 transition-all duration-300 ${emailFocused || email ? 'text-blue-600 transform -translate-y-1' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full px-5 py-4 bg-white/70 border-2 rounded-2xl focus:outline-none transition-all duration-500 placeholder-gray-400 glass hover:bg-white/90 text-gray-800 font-medium text-lg ${
                    emailFocused 
                      ? 'border-blue-500/80 shadow-[0_0_0_4px_rgba(59,130,246,0.15)] shadow-blue-500/25' 
                      : 'border-gray-200/60 hover:border-gray-300/80'
                  }`}
                  placeholder={emailFocused ? '' : 'Enter your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <div className={`absolute inset-y-0 right-0 flex items-center pr-5 transition-all duration-300 ${emailFocused ? 'scale-110' : ''}`}>
                  <svg className={`w-6 h-6 transition-colors duration-300 ${emailFocused ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                {/* Input glow effect */}
                {emailFocused && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 animate-pulse pointer-events-none"></div>
                )}
              </div>
            </div>

            {/* Password field */}
            <div className="group animate-slideInFromRight" style={{animationDelay: '0.2s'}}>
              <label htmlFor="password" className={`block text-sm font-bold mb-3 transition-all duration-300 ${passwordFocused || password ? 'text-blue-600 transform -translate-y-1' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`w-full px-5 py-4 pr-14 bg-white/70 border-2 rounded-2xl focus:outline-none transition-all duration-500 placeholder-gray-400 glass hover:bg-white/90 text-gray-800 font-medium text-lg ${
                    passwordFocused 
                      ? 'border-blue-500/80 shadow-[0_0_0_4px_rgba(59,130,246,0.15)] shadow-blue-500/25' 
                      : 'border-gray-200/60 hover:border-gray-300/80'
                  }`}
                  placeholder={passwordFocused ? '' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 right-0 flex items-center pr-5 transition-all duration-300 hover:scale-110 ${passwordFocused ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
                {/* Input glow effect */}
                {passwordFocused && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 animate-pulse pointer-events-none"></div>
                )}
              </div>
            </div>

            {/* Sign in button */}
            <div className="animate-slideInFromLeft" style={{animationDelay: '0.3s'}}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group hover-lift"
              >
                {/* Button gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 animate-shimmer"></div>
                
                {/* Button inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Loading spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Button text */}
                <span className={`relative transition-opacity duration-300 flex items-center justify-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              </button>
            </div>
          </form>

          {/* Security badge */}
          <div className="mt-8 text-center animate-slideInFromRight" style={{animationDelay: '0.4s'}}>
            <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50/80 px-4 py-2 rounded-full glass">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secured with advanced encryption
            </div>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500/50 rounded-full animate-ping"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-500/50 rounded-full animate-ping" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute top-1/2 -left-2 w-3 h-3 bg-indigo-500/40 rounded-full animate-ping" style={{animationDelay: '1.4s'}}></div>
        <div className="absolute top-1/4 -right-2 w-4 h-4 bg-pink-500/40 rounded-full animate-ping" style={{animationDelay: '2.1s'}}></div>
        <div className="absolute bottom-1/4 -left-1 w-2 h-2 bg-teal-500/40 rounded-full animate-ping" style={{animationDelay: '2.8s'}}></div>
      </div>
    </div>
  );
} 