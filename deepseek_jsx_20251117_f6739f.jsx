import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

// Lazy load icons for better performance
const Menu = lazy(() => import('lucide-react').then(module => ({ default: module.Menu })));
const X = lazy(() => import('lucide-react').then(module => ({ default: module.X })));
const ChevronRight = lazy(() => import('lucide-react').then(module => ({ default: module.ChevronRight })));
const Mail = lazy(() => import('lucide-react').then(module => ({ default: module.Mail })));
const Phone = lazy(() => import('lucide-react').then(module => ({ default: module.Phone })));
const MapPin = lazy(() => import('lucide-react').then(module => ({ default: module.MapPin })));
const Rocket = lazy(() => import('lucide-react').then(module => ({ default: module.Rocket })));
const Zap = lazy(() => import('lucide-react').then(module => ({ default: module.Zap })));
const Package = lazy(() => import('lucide-react').then(module => ({ default: module.Package })));
const Palette = lazy(() => import('lucide-react').then(module => ({ default: module.Palette })));
const TrendingUp = lazy(() => import('lucide-react').then(module => ({ default: module.TrendingUp })));
const Shield = lazy(() => import('lucide-react').then(module => ({ default: module.Shield })));
const Users = lazy(() => import('lucide-react').then(module => ({ default: module.Users })));
const Award = lazy(() => import('lucide-react').then(module => ({ default: module.Award })));
const Check = lazy(() => import('lucide-react').then(module => ({ default: module.Check })));
const ArrowRight = lazy(() => import('lucide-react').then(module => ({ default: module.ArrowRight })));
const Globe = lazy(() => import('lucide-react').then(module => ({ default: module.Globe })));
const Building2 = lazy(() => import('lucide-react').then(module => ({ default: module.Building2 })));
const ShoppingCart = lazy(() => import('lucide-react').then(module => ({ default: module.ShoppingCart })));
const Heart = lazy(() => import('lucide-react').then(module => ({ default: module.Heart })));
const GraduationCap = lazy(() => import('lucide-react').then(module => ({ default: module.GraduationCap })));
const DollarSign = lazy(() => import('lucide-react').then(module => ({ default: module.DollarSign })));
const Calendar = lazy(() => import('lucide-react').then(module => ({ default: module.Calendar })));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MoveDifferentHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activePillar, setActivePillar] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    message: '',
    inquiryType: 'general'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scrolling
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Please describe your challenge';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call to both email and CRM
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, you would have:
      // 1. Email submission
      // 2. CRM integration (HubSpot, Salesforce, etc.)
      
      alert('Thank you! We will contact you within 24 hours to discuss your unique challenges.');
      setFormData({ name: '', email: '', company: '', message: '', inquiryType: 'general' });
      setFormErrors({});
    } catch (error) {
      alert('Sorry, there was an error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const pillars = [
    {
      title: 'Digital Marketing & Technology',
      icon: Zap,
      color: 'from-blue-800 to-cyan-600',
      services: [
        'Digital Marketing Strategy',
        'Web & App Design',
        'AI-Driven Automation',
        'CRM/ERP Implementation',
        'Customer Experience & Support Solutions'
      ],
      emphasis: 'Scalable tech stacks that grow with your business'
    },
    {
      title: 'Supply Chain & Logistics',
      icon: Package,
      color: 'from-green-700 to-emerald-600',
      services: [
        'Air & Ocean Freight',
        'Last-Mile Delivery Optimization',
        'Moving & Fleet Management',
        'Cargo Security',
        'Smart Warehousing',
        'Logistics Insurance'
      ],
      emphasis: 'Resilient, transparent, and sustainable supply chains'
    },
    {
      title: 'Design & Construction',
      icon: Palette,
      color: 'from-purple-800 to-pink-600',
      services: [
        'Interior & Architectural Design',
        'Office & Retail Space Planning',
        'Brand Identity Design',
        'Logo & Visual System Design'
      ],
      emphasis: 'Spaces and brands that inspire and perform'
    }
  ];

  const industries = [
    { name: 'E-commerce & Retail', icon: ShoppingCart, outcome: 'Faster delivery + unforgettable unboxing experiences' },
    { name: 'Manufacturing & Industrial', icon: Building2, outcome: 'Optimized supply chains + operational excellence' },
    { name: 'Healthcare & Wellness', icon: Heart, outcome: 'HIPAA-compliant tech + patient-centered design' },
    { name: 'Real Estate & PropTech', icon: Building2, outcome: 'Smart spaces + digital tenant experiences' },
    { name: 'Education & Non-Profit', icon: GraduationCap, outcome: 'Mission-driven design + donor engagement platforms' },
    { name: 'Fintech & Professional Services', icon: DollarSign, outcome: 'Secure systems + brand authority' }
  ];

  const caseStudies = [
    {
      stat: '32%',
      metric: 'Cost Reduction',
      desc: 'Reduced logistics costs while improving delivery speed for a furniture and construction materials supplier',
      industry: 'Construction'
    },
    {
      stat: '3x',
      metric: 'Lead Conversion',
      desc: 'Revamped digital presence and CRM for an interior design company',
      industry: 'Interior Design'
    },
    {
      stat: '48hrs',
      metric: 'Faster Deployment',
      desc: 'Streamlined warehouse operations with smart automation',
      industry: 'E-commerce'
    }
  ];

  const partners = [
    'Shopify', 'Google', 'Active Campaign', 'DBX Engine', 'Audio Wisdom', 
    'Infinite Digital Network', 'Cookie Yes', 'Decorpsa Interiors', 
    'Fundi InterioSolutions', 'Planning Interiors'
  ];

  const certifications = [
    { name: 'Google Ads Partner', icon: Award },
    { name: 'Meta Verified Partner', icon: Shield }
  ];

  const differentiators = [
    { icon: Rocket, title: 'No Cookie-Cutter Solutions', desc: 'Every strategy is custom-built for your unique challenges' },
    { icon: Users, title: 'Cross-Functional Teams', desc: 'Dedicated experts from all three pillars on every project' },
    { icon: TrendingUp, title: 'ROI-Focused', desc: 'We measure success by your growth, not billable hours' },
    { icon: Shield, title: 'Agility + Expertise', desc: 'Deep industry knowledge meets startup-level responsiveness' }
  ];

  const ceoMessage = {
    name: "Dennis Njagi",
    title: "CEO & Founder",
    message: "At Move Different, we believe that true transformation happens when we challenge conventional thinking. Since 2018, we've been helping businesses break free from traditional silos and embrace integrated solutions that drive real, sustainable growth. Our vision is to create a world where businesses don't just compete—they redefine their industries through innovative thinking and seamless execution.",
    year: "2018"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-green-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Move Different...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>Move Different Group - Integrated Consulting Solutions in Kenya</title>
          <meta name="description" content="Move Different Group provides integrated consulting services combining digital marketing, supply chain logistics, and design for exceptional business growth in Kenya and beyond." />
          <meta name="keywords" content="consulting Kenya, digital marketing Nairobi, logistics, design, business transformation, sustainable business" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`} aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <div className={`text-2xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  Move <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Different</span>
                </div>
              </div>
              
              <div className="hidden md:flex space-x-8">
                {['Services', 'Industries', 'Partners', 'Case Studies', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-500 transition-colors duration-300 font-medium focus:ring-2 focus:ring-green-500 focus:outline-none rounded-md px-3 py-2`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <a 
                  href="https://calendly.com/movedifferent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all font-semibold"
                >
                  Book Call
                </a>
                <a 
                  href="#contact"
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all font-semibold focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  Get Started
                </a>
              </div>

              <button
                className="md:hidden p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Suspense fallback={<div>...</div>}>
                  {isMenuOpen ? <X className={scrolled ? 'text-gray-700' : 'text-white'} /> : <Menu className={scrolled ? 'text-gray-700' : 'text-white'} />}
                </Suspense>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg">
              <div className="px-4 pt-2 pb-4 space-y-2">
                {['Services', 'Industries', 'Partners', 'Case Studies', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <a 
                    href="https://calendly.com/movedifferent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-green-600 hover:bg-green-50 rounded-md text-center font-semibold"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-green-900 to-purple-900"></div>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
              Move Different.<br />
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Solve Better.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed">
              Integrated consulting for the digital age—where marketing, logistics, and design converge to deliver exceptional client value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="px-8 py-4 bg-white text-green-600 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-lg inline-flex items-center justify-center focus:ring-2 focus:ring-green-500 focus:outline-none">
                Discover Your Solution <Suspense fallback={<span>→</span>}><ChevronRight className="ml-2" /></Suspense>
              </a>
              <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 font-bold text-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                Let's Transform Your Business
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Suspense fallback={<div>↓</div>}>
              <ChevronRight className="w-6 h-6 text-white rotate-90" />
            </Suspense>
          </div>
        </section>

        {/* CEO Message Section */}
        <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">DN</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{ceoMessage.name}</h3>
                <p className="text-green-600 font-semibold">{ceoMessage.title}</p>
                <p className="text-gray-500">Founding Year: {ceoMessage.year}</p>
              </div>
              <blockquote className="text-xl text-gray-700 italic text-center leading-relaxed">
                "{ceoMessage.message}"
              </blockquote>
            </div>
          </div>
        </section>

        {/* Integrated Approach */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Integrated Approach</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                Move Different Group connects the dots between digital transformation, operational efficiency, and brand experience.
              </p>
              <p className="text-2xl font-bold text-green-600 italic">
                "One problem. Infinite perspectives. One powerful solution."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: '🎯', title: 'Listen First', desc: 'Every engagement starts with understanding your unique challenges' },
                { icon: '🔄', title: 'Cross-Pollinate', desc: 'Blend expertise across digital, physical, and strategic domains' },
                { icon: '🚀', title: 'Deliver Value', desc: 'Craft holistic solutions that drive measurable, lasting results' }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Three Pillars</h2>
              <p className="text-xl text-gray-600">Integrated services that work together, not in silos</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="group cursor-pointer"
                  onClick={() => setActivePillar(activePillar === idx ? null : idx)}
                >
                  <div className={`bg-gradient-to-br ${pillar.color} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 text-white h-full`}>
                    <Suspense fallback={<div>Icon</div>}>
                      <pillar.icon className="w-16 h-16 mb-4" />
                    </Suspense>
                    <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                    
                    <div className={`space-y-2 mb-4 ${activePillar === idx ? 'block' : 'hidden lg:block'}`}>
                      {pillar.services.map((service, sidx) => (
                        <div key={sidx} className="flex items-start">
                          <Suspense fallback={<span>✓</span>}>
                            <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                          </Suspense>
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-white border-opacity-30">
                      <p className="text-sm font-semibold italic">{pillar.emphasis}</p>
                    </div>

                    <div className="mt-4 flex items-center text-white font-bold">
                      Learn More <Suspense fallback={<span>→</span>}><ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></Suspense>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-8">Certifications & Partnerships</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md">
                  <Suspense fallback={<div>🏆</div>}>
                    <cert.icon className="w-6 h-6 text-green-600 mr-3" />
                  </Suspense>
                  <span className="font-semibold text-gray-700">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-xl text-gray-600">Tailored solutions for every sector</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer focus:ring-2 focus:ring-green-500 focus:outline-none"
                  tabIndex={0}
                >
                  <Suspense fallback={<div>Icon</div>}>
                    <industry.icon className="w-12 h-12 text-green-600 mb-4" />
                  </Suspense>
                  <h3 className="text-xl font-bold mb-3">{industry.name}</h3>
                  <p className="text-gray-600 text-sm italic">{industry.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Success Snapshot</h2>
              <p className="text-xl text-gray-600">Real results from real partnerships</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-900 to-green-900 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="text-5xl font-bold text-green-400 mb-2">{study.stat}</div>
                  <div className="text-xl font-semibold mb-4">{study.metric}</div>
                  <p className="text-gray-300 mb-4">{study.desc}</p>
                  <div className="inline-block px-3 py-1 bg-green-600 bg-opacity-30 rounded-full text-sm">
                    {study.industry}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="#contact" className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:scale-105 font-bold focus:ring-2 focus:ring-green-500 focus:outline-none">
                Explore Full Case Studies <Suspense fallback={<span>→</span>}><ArrowRight className="ml-2" /></Suspense>
              </a>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We collaborate with industry leaders so you get best-in-class solutions—seamlessly integrated.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {partners.map((partner, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-xl transition-all group focus:ring-2 focus:ring-green-500 focus:outline-none">
                  <div className="text-center font-bold text-gray-700 group-hover:text-green-600 transition-colors">
                    {partner}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Move Different */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Move Different?</h2>
              <p className="text-xl text-gray-200">What sets us apart in a crowded consulting landscape</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiators.map((diff, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-white bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Suspense fallback={<div>Icon</div>}>
                      <diff.icon className="w-10 h-10" />
                    </Suspense>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{diff.title}</h3>
                  <p className="text-gray-200">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Move Differently?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Tell us your challenge. We'll craft your advantage.
              </p>

              <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 text-left">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name *"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        } text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-colors`}
                        required
                      />
                      {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email *"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        } text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-colors`}
                        required
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="business">Business/Partnership</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your challenge *"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.message ? 'border-red-500' : 'border-gray-300'
                      } text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-colors`}
                      required
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    {isSubmitting ? 'Sending...' : 'Schedule a Consultation'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">Or choose your preferred method:</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="https://calendly.com/movedifferent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold"
                    >
                      <Suspense fallback={<span>📅</span>}><Calendar className="w-5 h-5 mr-2" /></Suspense>
                      Book on Calendly
                    </a>
                    <a 
                      href="tel:+254798852545"
                      className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                    >
                      <Suspense fallback={<span>📞</span>}><Phone className="w-5 h-5 mr-2" /></Suspense>
                      Call Us Directly
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Suspense fallback={<span>📞</span>}><Phone className="w-8 h-8 mb-2" /></Suspense>
                  <span className="font-semibold">+254 798 852 545</span>
                </div>
                <div className="flex flex-col items-center">
                  <Suspense fallback={<span>📧</span>}><Mail className="w-8 h-8 mb-2" /></Suspense>
                  <div>
                    <div>info@movedifferent.co.ke</div>
                    <div className="text-sm text-gray-200">(General Inquiries)</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Suspense fallback={<span>📍</span>}><MapPin className="w-8 h-8 mb-2" /></Suspense>
                  <span>2nd Floor, The GreenHouse</span>
                  <span className="text-sm text-gray-200">Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Move <span className="text-green-400">Different</span>
                </h3>
                <p className="text-gray-400">Integrated consulting where marketing, logistics, and design converge.</p>
                <p className="text-gray-400 mt-2">Founded in {ceoMessage.year}</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Digital Marketing & Technology</li>
                  <li>Supply Chain & Logistics</li>
                  <li>Design & Construction</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Industries</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>E-commerce & Retail</li>
                  <li>Manufacturing</li>
                  <li>Healthcare</li>
                  <li>Real Estate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <p className="text-gray-400 mb-1">info@movedifferent.co.ke</p>
                <p className="text-gray-400 mb-2">business@movedifferent.co.ke</p>
                <p className="text-gray-400">+254 798 852 545</p>
                <p className="text-gray-400 text-sm mt-2">2nd Floor, The GreenHouse</p>
                <p className="text-gray-400 text-sm">Nairobi, Kenya</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2018-2024 Move Different Group. All rights reserved. Built for those who dare to solve differently.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default MoveDifferentHomepage;