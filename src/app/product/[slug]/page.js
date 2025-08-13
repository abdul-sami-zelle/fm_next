// import dynamic from 'next/dynamic';

// const ProductDisplayClient = dynamic(() => import('./productDisplay'), { ssr: false });

// export async function generateMetadata({ params }) {
//   const { slug: routeSlug } = params; // ✅ rename to avoid shadowing

//   try {
//     const res = await fetch(
//       `https://devapi.myfurnituremecca.com/api/v1/products/get-product-seo?slug=${routeSlug}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) {
//       return {
//         title: "Category - Furniture Mecca",
//         description: "Browse our collection of quality furniture.",
//       };
//     }

//     const { seoData } = await res.json();

//     if (!seoData || seoData.length === 0) {
//       return {
//         title: "Product - Furniture Mecca",
//         description: "Browse our collection of quality furniture.",
//       };
//     }

//     const meta = seoData[0].meta;
//     const productSlug = seoData[0].slug; // ✅ renamed

//     // ✅ Ensure correct absolute image URL without double slashes
//     const imageUrl = meta.og_image?.startsWith("http")
//       ? meta.og_image
//       : `https://devapi.myfurnituremecca.com${meta.og_image?.startsWith("/") ? meta.og_image : `/${meta.og_image}`}`;

//     return {
//       title: meta.title || `${seoData[0].name} - Furniture Mecca`,
//       description: meta.description || "Browse our collection of quality furniture.",
//       keywords: meta.keywords || undefined,
//       alternates: {
//         canonical: meta.canonical_url || `https://myfurnituremecca.com/${productSlug}`,
//       },
//       openGraph: {
//         title: meta.og_title || meta.title,
//         description: meta.og_description || meta.description,
//         url: `https://myfurnituremecca.com/${productSlug}`,
//         siteName: "Furniture Mecca",
//         images: [
//           {
//             url: imageUrl,
//             width: 1200,
//             height: 630,
//             alt: seoData[0].name,
//           },
//         ],
//         type: "website",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: meta.x_title || meta.title,
//         description: meta.x_description || meta.description,
//         images: [imageUrl], // ✅ Match OG image for consistency
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching SEO data:", error);
//     return {
//       title: "Product - Furniture Mecca",
//       description: "Browse our collection of quality furniture.",
//     };
//   }
// }


// export default function Page({ params }) {
//   return <ProductDisplayClient params={params} />;
// }


// Server Component - can use generateMetadata
import { siteUrl } from '@/utils/api';
import ProductDisplayWrapper from './productDisplayWrapper'; // This is still a server import

export async function generateMetadata({ params }) {
  const { slug: routeSlug } = params;

  try {
    const res = await fetch(
      `https://devapi.myfurnituremecca.com/api/v1/products/get-product-seo?slug=${routeSlug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: "Category - Furniture Mecca",
        description: "Browse our collection of quality furniture.",
      };
    }

    const { seoData } = await res.json();

    if (!seoData?.length) {
      return {
        title: "Product - Furniture Mecca",
        description: "Browse our collection of quality furniture.",
      };
    }

    const meta = seoData[0].meta;
    const productSlug = seoData[0].slug;

    const imageUrl = meta.og_image?.startsWith("http")
      ? meta.og_image
      : `https://devapi.myfurnituremecca.com${meta.og_image?.startsWith("/") ? meta.og_image : `/${meta.og_image}`}`;

    return {
      title: `${meta.title} - Furniture Mecca` || `${seoData[0].name} - Furniture Mecca`,
      description: meta.description || "Browse our collection of quality furniture.",
      keywords: meta.keywords || undefined,
      alternates: {
        canonical: meta.canonical_url || `${siteUrl}/product/${productSlug}`,
      },
      openGraph: {
        title: meta.og_title || meta.title,
        description: meta.og_description || meta.description,
        url: `${siteUrl}/product/${productSlug}`,
        siteName: "Furniture Mecca",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: seoData[0].name,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: meta.x_title || meta.title,
        description: meta.x_description || meta.description,
        images: [imageUrl], // ✅ Match OG image for consistency
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Product - Furniture Mecca",
      description: "Browse our collection of quality furniture.",
    };
  }
}

export default function Page({ params }) {
  return <ProductDisplayWrapper params={params} />;
}
