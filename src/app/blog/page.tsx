export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Latest Insights</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thoughts, news, and technical articles from the Deveraa team.
        </p>
        <div className="grid gap-8 text-left">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 border rounded-xl bg-card">
              <h3 className="font-semibold text-xl mb-2">Blog Post Title {i}</h3>
              <p className="text-muted-foreground">Read more about our latest thoughts on software development...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
