export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explore our recent projects and success stories.
        </p>
        <div className="grid sm:grid-cols-2 gap-8 text-left">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-xl overflow-hidden border bg-card">
              <div className="aspect-video bg-muted" />
              <div className="p-6">
                <h3 className="font-semibold text-lg">Project Name {i}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
