import { Palette, Github, Twitter, Linkedin } from "lucide-react";
import { scrollToSection } from "./Option";

const Footer = () => {
  return (
    <footer id="about" className="bg-gray-900 text-black py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center text-white space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5  text-black" />
              </div>
              <span className="text-xl font-bold">CanvasDraw</span>
            </div>
            <p className="text-white mb-6 max-w-md">
              The ultimate whiteboard for teams. Create, collaborate, and
              visualize your ideas with the power of real-time collaboration.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-black cursor-pointer transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-black cursor-pointer transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-black cursor-pointer transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a
                  onClick={() => scrollToSection("features")}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a
                  onClick={() => scrollToSection("about")}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-white">
          <p>&copy; 2024 CanvasDraw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
