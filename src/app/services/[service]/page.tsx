export default async function ServiceDetailPage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  
  return (
    <div className="container mx-auto px-4 py-24 sm:px-8 max-w-3xl text-center">
      <h1 className="text-4xl font-bold mb-6 capitalize">{service.replace("-", " ")} Service</h1>
      <p className="text-lg text-muted-foreground">
        Detailed information about our {service.replace("-", " ")} offerings will go here.
      </p>
    </div>
  );
}
