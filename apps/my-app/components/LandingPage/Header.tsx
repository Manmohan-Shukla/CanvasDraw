import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div
            className="flex items-center space-x-2"
            onClick={() => {
              router.push(`http://localhost:3000`);
            }}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 cursor-pointer text-black" />
            </div>
            <span className="text-xl font-bold cursor-pointer text-white">
              CanvasDraw
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <button
              onClick={scrollToPricing}
              className="text-gray-400 cursor-pointer hover:text-white transition-colors"
            >
              Pricing
            </button>
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <Button
              variant="outline"
              className="mr-2 border-gray-700 cursor-pointer text-black hover:bg-gray-200"
              onClick={() => {
                router.push(`http://localhost:3000/login`);
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-white hover:bg-gray-200 cursor-pointer text-black"
              onClick={() => {
                router.push(`http://localhost:3000/signup`);
              }}
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 cursor-pointer" />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </a>
              <button
                onClick={scrollToPricing}
                className="text-gray-400 hover:text-white  cursor-pointer transition-colors text-left"
              >
                Pricing
              </button>
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  className="bg-white text-black cursor-pointer hover:bg-gray-200"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-white hover:bg-gray-200 cursor-pointer text-black"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
