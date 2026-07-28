export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Services</h1>
        <p className="text-lg text-muted-foreground mb-8">
          End-to-end software development services tailored to your unique business needs.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {["Web Development", "Mobile Apps", "SaaS Solutions", "AI Solutions", "UI/UX Design", "Cloud & DevOps"].map(service => (
            <div key={service} className="p-6 border rounded-xl bg-card">
              <h3 className="font-semibold text-lg">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
