export function scrollToSection(section: string) {
  const pricingSection = document.getElementById(section);
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Option() {
  return (
    <div className="flex flex-col items-start text-left space-y-4 md:flex-row md:items-center md:text-center md:space-y-0 md:space-x-8">
      <a
        onClick={() => scrollToSection("features")}
        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        Features
      </a>
      <button
        onClick={() => scrollToSection("pricing")}
        className="text-gray-400 cursor-pointer hover:text-white transition-colors"
      >
        Pricing
      </button>
      <a
        onClick={() => scrollToSection("about")}
        className="text-gray-400 hover:text-white cursor-pointer transition-colors"
      >
        About
      </a>
    </div>
  );
}
