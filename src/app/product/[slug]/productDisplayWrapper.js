import dynamic from 'next/dynamic';

// Import the actual client component dynamically (without ssr: false here)
const ProductDisplay = dynamic(() => import('./productDisplay'));

export default function ProductDisplayWrapper({ params }) {
  return <ProductDisplay params={params} />;
}
