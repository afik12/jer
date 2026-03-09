import { getJerseyById } from "@/lib/mock-jerseys";
import { ProductPageClient } from "@/components/ProductPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const jersey = await getJerseyById(id);
  return <ProductPageClient jersey={jersey} />;
}
