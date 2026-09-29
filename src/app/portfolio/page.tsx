import Image from "next/image";
import abacusWebImg from "@/app/assets/abacus-web.jpeg";
import abacusMobileImg from "@/app/assets/abacus-mobile-app.jpeg";
import doorstepImg from "@/app/assets/doorstep-services-web.jpeg";
import ecommerceImg from "@/app/assets/e-commerce-web.jpeg";
import tradingAppImg from "@/app/assets/tradingmobileapp.jpeg";
import videoCallImg from "@/app/assets/viceo-call.jpeg";

const PROJECTS = [
  {
    title: "Abacus Web Platform",
    image: abacusWebImg,
    category: "Web Application"
  },
  {
    title: "Abacus Mobile App",
    image: abacusMobileImg,
    category: "Mobile Application"
  },
  {
    title: "Doorstep Services Platform",
    image: doorstepImg,
    category: "Web & Mobile Platform"
  },
  {
    title: "E-Commerce Solution",
    image: ecommerceImg,
    category: "E-commerce"
  },
  {
    title: "Trading Mobile App",
    image: tradingAppImg,
    category: "FinTech"
  },
  {
    title: "Video Calling Integration",
    image: videoCallImg,
    category: "Communication"
  }
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 mt-10">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Explore our recent projects and success stories.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-card shadow-sm hover:shadow-lg transition-all">
              <div className="relative aspect-video bg-muted overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full mb-2 inline-block">
                  {project.category}
                </span>
                <h3 className="font-semibold text-xl">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
