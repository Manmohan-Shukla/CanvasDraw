import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Zap, Layers, Smartphone, Lock, Download } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Real-time Collaboration",
      description:
        "Work together seamlessly with your team. See live cursors, edits, and comments as they happen.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed and performance. Create complex diagrams without any lag or delays.",
    },
    {
      icon: Layers,
      title: "Infinite Canvas",
      description:
        "Never run out of space. Pan and zoom freely across an unlimited drawing surface.",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description:
        "Works perfectly on desktop, tablet, and mobile. Your work syncs across all devices.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description:
        "End-to-end encryption ensures your drawings and data remain completely private.",
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description:
        "Export to PNG, SVG, PDF, or share with a simple link. Integrate with your workflow.",
    },
  ];

  return (
    <section id="features" className="pt-16 pb-2 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Everything you need to{" "}
            <span className="gradient-text">create amazing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features designed for modern teams who need to think, plan,
            and create together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-black"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
