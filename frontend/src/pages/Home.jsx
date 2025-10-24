import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Video,
  MessageSquare,
  Monitor,
  Users,
  Shield,
  Zap,
  Check
} from 'lucide-react';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "HD Video Quality",
      description:
        "Crystal-clear 4K video streaming with adaptive bitrate for smooth calls even on slower connections.",
      color: "red"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real-Time Chat",
      description:
        "Instant messaging with emoji reactions, file sharing, and threaded conversations during calls.",
      color: "blue"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Screen Sharing",
      description:
        "Share your entire screen or specific applications with one click. Perfect for presentations.",
      color: "green"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Virtual Backgrounds",
      description:
        "AI-powered background blur and custom backgrounds to maintain privacy and professionalism.",
      color: "purple"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "End-to-End Encryption",
      description:
        "Bank-level security ensures your conversations remain private and protected at all times.",
      color: "yellow"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Join",
      description:
        "No downloads required. Join meetings instantly from any browser with a single click.",
      color: "pink"
    }
  ];

  // Map of color -> Tailwind background class (so we don't rely on dynamic class strings)
  const colorMap = {
    red: "bg-red-500/10",
    blue: "bg-blue-500/10",
    green: "bg-green-500/10",
    purple: "bg-purple-500/10",
    yellow: "bg-yellow-500/10",
    pink: "bg-pink-500/10"
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header with Scroll Effect */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/95 backdrop-blur-lg shadow-lg py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Video className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              ConnectUs
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="hover:text-red-500 transition-colors duration-300">
              Features
            </a>
            <a href="#benefits" className="hover:text-red-500 transition-colors duration-300">
              Benefits
            </a>
            <a href="#pricing" className="hover:text-red-500 transition-colors duration-300">
              Pricing
            </a>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105"
            >
              Get Started Free
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-950/20">
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&q=80')] opacity-5 bg-cover bg-center"
            aria-hidden="true"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
                New: AI-Powered Background Blur
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Video Meetings
              <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              Connect with anyone, anywhere. Experience crystal-clear HD video, real-time collaboration,
              and seamless screen sharing—all in one powerful platform.
            </p>

            {/* Buttons Section with Join as Guest */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="group bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-red-500/50 flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold hover:scale-105">
                Watch Demo
              </button>

              {/* ✅ Join as Guest Button */}
              <Link
                to="/video"
                className="group bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg flex items-center justify-center space-x-2 hover:scale-105 border border-gray-700"
              >
                <span>Join as Guest</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-black" />
                <img src="https://i.pravatar.cc/40?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-black" />
                <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-black" />
                <img src="https://i.pravatar.cc/40?img=4" alt="User" className="w-10 h-10 rounded-full border-2 border-black" />
              </div>
              <div className="text-sm">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400">Trusted by 10,000+ teams</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-500 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 rounded-full p-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-gray-400">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Logos Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 mb-8 uppercase tracking-wider text-sm">
            Trusted by leading teams worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, i) => (
              <div key={i} className="text-center text-xl font-bold text-gray-600">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Everything You Need to Connect</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features designed to make remote collaboration feel natural and effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className={`${colorMap[feature.color]} inline-block p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-red-500">{feature.icon}</div>
                </div>
                <h4 className="text-2xl font-semibold mb-4 group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Image */}
      <section id="benefits" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
                alt="Professional video call"
                className="rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500"
              />
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <div>
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                <h3 className="text-4xl font-bold mt-4 mb-6">Built for Modern Teams</h3>
              </div>

              {[
                "99.9% uptime guarantee for reliable connectivity",
                "Works on any device - desktop, mobile, or tablet",
                "Record meetings with automated transcriptions",
                "Integrate with your favorite productivity tools",
                "24/7 customer support whenever you need help"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="bg-red-500/10 rounded-full p-1.5 mt-1 group-hover:bg-red-500 transition-colors duration-300">
                    <Check className="w-5 h-5 text-red-500 group-hover:text-white" />
                  </div>
                  <p className="text-lg text-gray-300 group-hover:text-white transition-colors">{benefit}</p>
                </div>
              ))}

              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-red-500/50 mt-8 hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h3>
          <p className="text-gray-400 text-lg mb-12">Start free, upgrade when you're ready</p>

          <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-2xl p-12">
            <h4 className="text-3xl font-bold mb-4">Free Forever Plan</h4>
            <p className="text-gray-400 mb-8">Unlimited 1-on-1 meetings • 40-minute group calls • Screen sharing • Chat</p>
            <Link
              to="/signup"
              className="inline-block bg-white text-black hover:bg-gray-100 transition-all duration-300 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold mb-4 text-white">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-red-500 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-red-500 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-red-500 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ConnectUs. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Developed by SaiRam</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
