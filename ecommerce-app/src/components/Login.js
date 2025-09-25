import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    otp: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (formData.emailOrPhone === 'admin@urbanhive.com' && formData.password === 'Admin@123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      navigate('/admin-panel');
      return;
    }
    
    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll simulate a successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'user');
    navigate('/');
  };

  const sendOtp = async () => {
    // Implement OTP sending logic here
    setIsOtpSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              loginMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setLoginMethod('email')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setLoginMethod('phone')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {loginMethod === 'email' ? 'Email' : 'Phone Number'}
            </label>
            <input
              type={loginMethod === 'email' ? 'email' : 'tel'}
              placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter phone number'}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            />
          </div>

          {!isOtpSent ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                maxLength="6"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              />
            </div>
          )}

          {!isOtpSent ? (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={sendOtp}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Login with OTP instead
              </button>
              <a href="/forgot-password" className="text-blue-600 hover:text-blue-500 text-sm">
                Forgot password?
              </a>
            </div>
          ) : (
            <div className="text-center">
              <button
                type="button"
                onClick={sendOtp}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Resend OTP
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;