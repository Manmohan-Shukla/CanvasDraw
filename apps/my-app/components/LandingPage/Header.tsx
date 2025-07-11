import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FRONTEND_URL } from "@/config";
import Option from "./Option";
import { toast } from "sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    router.push(`${FRONTEND_URL}${path}`);
  };

  const pathname = usePathname();
  const shouldShowOption =
    !pathname.includes("/login") && !pathname.includes("/signup");

  const Logo = () => (
    <button
      onClick={() => router.push(FRONTEND_URL)}
      className="flex items-center cursor-pointer space-x-2"
    >
      <div className="w-8 h-8 bg-white rounded-lg  flex items-center justify-center">
        <Palette className="w-5 h-5 text-black" />
      </div>
      <span className="text-xl font-bold text-white">CanvasDraw</span>
    </button>
  );
  const [hasToken, setHasToken] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);
  const Out = () => {
    setHasToken(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push(`${FRONTEND_URL}`);
  };

  const Signout = () => {
    return (
      <div>
        <Button
          variant="outline"
          className="border-gray-700 text-black cursor-pointer hover:bg-gray-200"
          onClick={Out}
        >
          Signout
        </Button>
      </div>
    );
  };

  const NavButtons = () => (
    <>
      <Button
        variant="outline"
        className="border-gray-700 text-black cursor-pointer hover:bg-gray-200"
        onClick={() => handleNavigate("login")}
      >
        Sign In
      </Button>
      <Button
        className="bg-white text-black cursor-pointer hover:bg-gray-200"
        onClick={() => handleNavigate("signup")}
      >
        Get Started
      </Button>
    </>
  );

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />

          <nav className="hidden md:flex items-center space-x-6">
            {shouldShowOption && <Option />}
            {hasToken ? <Signout /> : <NavButtons />}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {shouldShowOption && <Option />}
              <div className="flex flex-col cursor-pointer space-y-2 pt-4">
                {hasToken ? <NavButtons /> : <Signout />}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
