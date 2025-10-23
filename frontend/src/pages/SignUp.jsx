import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader, 
  ArrowLeft, Video, User, Check, X, Shield 
} from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',  // Use "username" instead of "name"
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    color: ''
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  // Password strength validation
  useEffect(() => {
    if (formData.password) {
      validatePassword(formData.password);
    } else {
      setPasswordStrength({ score: 0, feedback: '', color: '' });
      setPasswordRequirements({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
      });
    }
  }, [formData.password]);

  const validatePassword = (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordRequirements(requirements);
    const score = Object.values(requirements).filter(Boolean).length;
    let feedback = '';
    let color = '';
    if (score <= 2) {
      feedback = 'Weak';
      color = 'bg-red-500';
    } else if (score === 3 || score === 4) {
      feedback = 'Medium';
      color = 'bg-yellow-500';
    } else if (score === 5) {
      feedback = 'Strong';
      color = 'bg-green-500';
    }
    setPasswordStrength({ score, feedback, color });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validation
    if (!agreeToTerms) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (passwordStrength.score < 3) {
      setError('Please choose a stronger password');
      return;
    }
    setLoading(true);
    try {
      // Send "username" instead of "name" to the backend
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username: formData.username,  // Correct field
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('connectusToken', response.data.token);
      setSuccessMessage('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Logo and Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Video className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                ConnectUs
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
            <p className="text-gray-400">Join thousands of teams already using ConnectUs</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start space-x-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-400 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialSignup('google')}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group hover:scale-105"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span>Sign up with Google</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignup('facebook')}
                className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              >
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                <span>Facebook</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup('apple')}
                className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              >
                <img src="https://www.svgrepo.com/show/69341/apple-logo.svg" alt="Apple" className="w-5 h-5" />
                <span>Apple</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">Or sign up with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field (Username) */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"  // Matches formData.username
                  value={formData.username}  // Use username state
                  onChange={handleInputChange}
                  required
                  autoComplete="username"
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  aria-label="Full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Password strength:</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.feedback === 'Weak' ? 'text-red-500' :
                      passwordStrength.feedback === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {passwordStrength.feedback}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div
                        key={bar}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          bar <= passwordStrength.score ? passwordStrength.color : 'bg-gray-700'
                        }`}
                      ></div>
                    ))}
                  </div>
                  {/* Password Requirements */}
                  <div className="space-y-2 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400 mb-2">Password must contain:</p>
                    {[
                      { key: 'minLength', text: 'At least 8 characters' },
                      { key: 'hasUpperCase', text: 'One uppercase letter' },
                      { key: 'hasLowerCase', text: 'One lowercase letter' },
                      { key: 'hasNumber', text: 'One number' },
                      { key: 'hasSpecialChar', text: 'One special character (!@#$%^&*)' }
                    ].map((req) => (
                      <div key={req.key} className="flex items-center space-x-2">
                        {passwordRequirements[req.key] ? (
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        )}
                        <span className={`text-xs ${
                          passwordRequirements[req.key] ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>Passwords do not match</span>
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-2 text-sm text-green-500 flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Passwords match</span>
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 bg-gray-900 border-gray-700 rounded text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-400 cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-red-500 hover:text-red-400 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-red-500 hover:text-red-400 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !agreeToTerms}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-gray-400 text-center mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold transition-colors">
              Sign In
            </Link>
          </p>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-400">
                <p className="font-medium text-gray-300 mb-1">Your data is protected</p>
                <p>We never share your information with third parties</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Visual Section (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-purple-600 via-red-500 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="max-w-lg">
            {/* Illustration */}
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" 
                alt="Team working together"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            </div>

            {/* Features List */}
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-bold text-center mb-6">Join ConnectUs Today</h3>
              {[
                { icon: <Video className="w-5 h-5" />, text: 'Unlimited video meetings' },
                { icon: <Shield className="w-5 h-5" />, text: 'Enterprise-grade security' },
                { icon: <Check className="w-5 h-5" />, text: 'No credit card required' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="bg-white/20 rounded-full p-2">
                    {feature.icon}
                  </div>
                  <p className="font-medium">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-red-100 mb-4">Trusted by 10,000+ teams worldwide</p>
              <div className="flex justify-center items-center space-x-4">
                <img 
                  src="https://i.pravatar.cc/40?img=10" 
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=11" 
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=12" 
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=13" 
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="text-sm font-semibold">+10,000 more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;