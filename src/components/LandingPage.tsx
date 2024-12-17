import { motion } from "framer-motion";
import {
  IoCalendar,
  IoCheckmark,
  IoNutrition,
  IoRestaurant,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import analysisImage from "../assets/landing-page/analysis.png";
import calendarImage from "../assets/landing-page/calendar.png";
import mealPlanImage from "../assets/landing-page/meal-plan.png";
import { NutriPlanLogo } from "./icons/NutriPlanLogo";

// Add animation variants
const fadeInUp = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideIn = (direction: "left" | "right") => ({
  hidden: {
    x: direction === "left" ? -100 : 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

const WaveConnector = () => (
  <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10">
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 17.75C960 17.75 1056 35.5 1152 44.375C1248 53.25 1344 53.25 1392 53.25H1440V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
        fill="white"
      />
    </svg>
  </div>
);

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base Gradient - Extend it to blend with services */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-transparent" />

    {/* Moving Food Elements */}
    <div className="absolute inset-0">
      {/* Floating Icons */}
      <div className="absolute w-full h-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-icon opacity-30 text-blue-600`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${
                1.5 + Math.random() * 0.5
              })`,
            }}
          >
            {i % 4 === 0 && (
              <div className="bg-blue-100 p-4 rounded-xl shadow-lg">
                <IoRestaurant className="w-12 h-12" />
              </div>
            )}
            {i % 4 === 1 && (
              <div className="bg-green-100 p-4 rounded-xl shadow-lg">
                <IoNutrition className="w-12 h-12" />
              </div>
            )}
            {i % 4 === 2 && (
              <div className="bg-indigo-100 p-4 rounded-xl shadow-lg">
                <svg className="w-12 h-12" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12,3L4,9V21H20V9L12,3M12,7.5L16,10.5V17H8V10.5L12,7.5M6.5,12L8,13.5V17H6.5V12M17.5,12V17H16V13.5L17.5,12Z"
                  />
                </svg>
              </div>
            )}
            {i % 4 === 3 && (
              <div className="bg-purple-100 p-4 rounded-xl shadow-lg">
                <svg className="w-12 h-12" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.36,10.22L13.16,10L3.21,0.0799999999999983L4.63,-1.33L21.29,15.33L19.88,16.74L13,9.87"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/40 to-green-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/40 to-blue-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-green-400/40 to-blue-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-slide-right"
            style={{
              top: `${15 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
    </div>

    {/* Subtle Grid Pattern */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #4299e1 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }}
    />

    {/* Very Light Overlay for Better Text Readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30" />
  </div>
);

// Add these additional animations to your styles
const animationStyles = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1) perspective(1000px) rotateX(20deg);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1) perspective(1000px) rotateX(25deg);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9) perspective(1000px) rotateX(15deg);
    }
    100% {
      transform: translate(0px, 0px) scale(1) perspective(1000px) rotateX(20deg);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: perspective(1000px) rotateX(45deg) rotateZ(-45deg) translateY(0);
    }
    50% {
      transform: perspective(1000px) rotateX(45deg) rotateZ(-45deg) translateY(-20px);
    }
  }

  @keyframes rays {
    0% {
      opacity: 0.5;
      transform: perspective(1000px) rotateX(45deg) translateY(0%);
    }
    50% {
      opacity: 0.8;
      transform: perspective(1000px) rotateX(45deg) translateY(-50%);
    }
    100% {
      opacity: 0.5;
      transform: perspective(1000px) rotateX(45deg) translateY(-100%);
    }
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }

  @keyframes float-icon {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-15px) rotate(5deg);
    }
    75% {
      transform: translateY(15px) rotate(-5deg);
    }
  }

  @keyframes slide-right {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .animate-float-icon {
    animation: float-icon 6s ease-in-out infinite;
  }

  .animate-slide-right {
    animation: slide-right 8s linear infinite;
  }

  @keyframes float-bg {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-5px) scale(1.02);
    }
  }

  .animate-float-bg {
    animation: float-bg 20s ease-in-out infinite;
  }

  @keyframes service-light-ray {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-service-light-ray {
    animation: service-light-ray 1s ease-out;
  }

  @keyframes shine {
    to {
      transform: translateX(200%) rotate(25deg);
    }
  }

  .animate-shine {
    animation: shine 0.8s ease-in-out;
  }

  @keyframes sweep {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    5% {
      opacity: 0.2;
    }
    95% {
      opacity: 0.2;
    }
    100% {
      transform: translateX(300%);
      opacity: 0;
    }
  }

  .sweep-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2),
      transparent
    );
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    will-change: transform;
  }

  .group:hover .sweep-overlay {
    animation: sweep 0.4s ease-out;
  }

  .service-image-container {
    background: white;
  }
`;

// Add these background patterns for different sections
const SectionBackgrounds = {
  services: (
    <div className="absolute inset-0">
      {/* Dotted Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#4299e1 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  ),

  about: (
    <div className="absolute inset-0">
      {/* Wavy Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%234299e1' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px auto",
        }}
      />
    </div>
  ),

  pricing: (
    <div className="absolute inset-0">
      {/* Hexagon Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V10C10 4.477 5.523 0 0 0h24c-5.523 0-10 4.477-10 10v20c0 5.523 4.477 10 10 10H0z' fill='%234299e1' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px auto",
        }}
      />
    </div>
  ),
};

// Add this for header animations
const headerAnimationStyles = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .nav-link {
    position: relative;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #3B82F6;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

// Update the aboutImage object with a composition of existing images
const AboutComposition = () => (
  <div className="relative w-full h-[500px] bg-white rounded-xl shadow-lg p-6 group">
    {/* Add sweep overlay at wrapper level */}
    <div className="sweep-overlay" />

    {/* Main Feature Display */}
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Left Column */}
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4 h-[220px] relative overflow-hidden">
          <img
            src={mealPlanImage}
            alt="Meal Planning"
            className="object-contain w-full h-full"
          />
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-blue-600">
            Meal Planning
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 h-[220px] relative overflow-hidden">
          <img
            src={analysisImage}
            alt="Nutrition Analytics"
            className="object-contain w-full h-full"
          />
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-green-600">
            Analytics
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="relative">
        <div className="bg-indigo-50 rounded-lg p-4 h-full relative overflow-hidden">
          <img
            src={calendarImage}
            alt="Calendar View"
            className="object-contain w-full h-full"
          />
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-indigo-600">
            Calendar
          </div>
        </div>
      </div>
    </div>

    {/* Logo Overlay */}
    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
      <NutriPlanLogo className="h-8 w-auto" showText={true} />
    </div>

    {/* Feature Indicators */}
    <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
      AI-Powered
    </div>
  </div>
);

// Add this helper style at the top of your component
const gridPattern = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, #4299e1 1px, transparent 1px),
                     linear-gradient(to bottom, #4299e1 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

export function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: "AI-Powered Meal Planning",
      description:
        "Get personalized meal suggestions tailored to your preferences, dietary restrictions, and nutritional goals. Our AI analyzes your profile to create the perfect meal plan for you.",
      icon: IoNutrition,
      image: mealPlanImage,
    },
    {
      title: "Smart Calendar Integration",
      description:
        "Plan your meals ahead with our intuitive calendar interface. Schedule meals, track portions, and maintain a healthy eating routine effortlessly.",
      icon: IoCalendar,
      image: calendarImage,
    },
    {
      title: "Nutrition Analytics",
      description:
        "Track your nutritional intake with detailed analytics. Monitor calories, macros, and micronutrients to ensure you're meeting your health goals.",
      icon: IoRestaurant,
      image: analysisImage,
    },
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic meal suggestions",
        "Simple calendar view",
        "Basic nutrition tracking",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99/mo",
      features: [
        "Advanced AI suggestions",
        "Full calendar features",
        "Detailed nutrition analytics",
        "Custom meal plans",
        "Priority support",
      ],
      cta: "Try Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro features",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Team management",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <style>{animationStyles}</style>
      <style>{gridPattern}</style>

      {/* Fixed Header */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 animate-[slideDown_0.5s_ease-out]">
        <style>{headerAnimationStyles}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <NutriPlanLogo className="h-10 w-auto" showText={true} />
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
                { name: "Pricing", href: "#pricing" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 text-sm"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center">
              {/* Only keep the Login button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="group relative px-4 py-2 overflow-hidden rounded-lg bg-blue-600 text-white shadow-md transition-all duration-200 hover:shadow-lg hover:bg-blue-700"
              >
                <span className="relative flex items-center">
                  Login
                  <svg
                    className="w-4 h-4 ml-2 transform transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-16">
          <HeroBackground />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          >
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your Personal</span>
                <span className="block text-blue-600">AI Meal Planner</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Transform your eating habits with AI-powered meal planning and
                nutrition tracking.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
          <WaveConnector />
        </section>

        {/* Services Section */}
        <section id="services" className="relative bg-white">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-gray-900">
                Our Services
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Everything you need for a healthier lifestyle
              </p>
            </motion.div>

            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={slideIn(index % 2 === 0 ? "left" : "right")}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12`}
                >
                  <div className="lg:w-1/2">
                    <div className="rounded-xl shadow-lg overflow-hidden bg-white relative group">
                      <div className="sweep-overlay" />
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center space-x-3 mb-4">
                      <service.icon className="h-8 w-8 text-blue-500" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative bg-gray-50">
          {SectionBackgrounds.about}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          >
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  About NutriPlan
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  We're on a mission to make healthy eating simple and
                  accessible for everyone. Our AI-powered platform combines
                  cutting-edge technology with nutritional science to provide
                  personalized meal planning solutions.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <IoCheckmark className="h-6 w-6 text-green-500 mt-1 mr-2" />
                      <span className="text-gray-500">
                        Advanced AI technology for personalized recommendations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <IoCheckmark className="h-6 w-6 text-green-500 mt-1 mr-2" />
                      <span className="text-gray-500">
                        Evidence-based nutrition science
                      </span>
                    </li>
                    <li className="flex items-start">
                      <IoCheckmark className="h-6 w-6 text-green-500 mt-1 mr-2" />
                      <span className="text-gray-500">
                        User-friendly interface and seamless experience
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 lg:mt-0">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <AboutComposition />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative bg-white">
          {SectionBackgrounds.pricing}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Choose the plan that's right for you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className={`rounded-lg shadow-lg bg-white overflow-hidden ${
                    plan.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex-grow">
                      {plan.popular && (
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
                          Most Popular
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                      <p className="mt-4 text-3xl font-bold text-gray-900">
                        {plan.price}
                      </p>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <IoCheckmark className="h-6 w-6 text-green-500 mt-1 mr-2" />
                            <span className="text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/login")}
                      className={`mt-8 w-full py-3 px-4 rounded-md font-medium ${
                        plan.popular
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative bg-gray-900 text-white">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <NutriPlanLogo
                  className="h-12 w-auto text-white"
                  showText={true}
                />
                <p className="mt-4 text-gray-400">
                  Making healthy eating simple and accessible for everyone.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      API
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} NutriPlan. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
