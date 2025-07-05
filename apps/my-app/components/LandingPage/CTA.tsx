import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const CTA = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-3 text-white text-lg">
              Loved by 100,000+ creators
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to bring your ideas to life?
          </h2>

          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of teams already creating amazing things with
            CanvasDraw. Start for free, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4"
            >
              Start Drawing Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="border-black text-black hover:bg-black hover:text-white text-lg px-8 py-4 transition-all duration-300"
            >
              View Pricing
            </Button>
          </div>

          <p className="text-white text-sm mt-6">
            Free forever • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
