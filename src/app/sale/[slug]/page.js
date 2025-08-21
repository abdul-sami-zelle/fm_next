import SaleClient from "@/UI/Components/SaleClient/SaleClient";

// export async function generateMetadata({params}) {
//     return {
//       title: `Tent Sale - My Furniture Mecca`,
//       description: `Browse our ${params.sale} collection`,
//     };
//   }


// export async function generateMetadata(props) {
//   const params = await props.params; 
//   const { slug } = params;

//   const res = await fetch(`https://fmapi.myfurnituremecca.com/api/v1/sales-page/get`, { cache: "no-store" });

//   if (!res.ok) {
//     return {
//       title: "Labor Day Sale - Furniture Mecca",
//       description: "Browse our collection of quality furniture."
//     };
//   }

//   const { seoData } = await res.json();
//   const meta = seoData?.[0]?.meta || {};

//   return {
//     title: meta.title || "Labor Day Sale - Furniture Mecca",
//     description: meta.description || "Browse our collection of quality furniture.",
//     openGraph: {
//       title: meta.og_title || meta.title,
//       description: meta.og_description || meta.description,
//       url: `https://fmapi.myfurnituremecca.com/api/v1/sales-page/get`,
//       images: [
//         {
//           url: meta.og_image?.startsWith("http") 
//             ? meta.og_image 
//             : `https://fmapi.myfurnituremecca.com/${meta.og_image?.replace(/^\//, '')}`,
//           width: 1200,
//           height: 630
//         }
//       ]
//     }
//   };
// }

export async function generateMetadata({ params }) {
  const { slug } = params;
  // console.log("cat param", slug)

  try {
    const res = await fetch(
      `https://fmapi.myfurnituremecca.com/api/v1/productCategory/get-seo?slug=${params.slug}`,
      { cache: "no-store" }
    );



    if (!res.ok) {
      return {
        title: `${params.name} - Furniture Mecca`,
        description: "Browse our collection of quality furniture.",
      };
    }

    console.log("res data", res);

    const { seoData } = await res.json();
    console.log("seo data", seoData)

    if (!seoData || seoData.length === 0) {
      return {
        title: `${params.name} - Furniture Mecca`,
        description: "Browse our collection of quality furniture.",
      };
    }

    if (seoData || seoData.length > 0) {
      return {
        title: `${seoData[0].name} - Furniture Mecca`,
        description: "Browse our collection of quality furniture.",
      };
    }

    const meta = seoData[0].meta;
    const slug = seoData[0].slug;

    const imageUrl = meta.og_image?.startsWith("http")
      ? meta.og_image
      : `https://fmapi.myfurnituremecca.com${meta.og_image.startsWith("/") ? meta.og_image : `/${meta.og_image}`}`;

    return {
      title: `${meta.title}` || `${seoData[0].name} - Furniture Mecca`,
      description: meta.description || "Browse our collection of quality furniture.",
      keywords: meta.keywords || undefined,
      alternates: {
        canonical: meta.canonical_url || `https://myfurnituremecca.com/${slug}`,
      },
      openGraph: {
        title: `${meta.og_title} - Furniture Mecca` || meta.title,
        description: meta.og_description || meta.description,
        url: `https://myfurnituremecca.com/${slug}`,
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
      title: `${params.slug} - Furniture Mecca`,
      description: "Browse our collection of quality furniture.",
    };
  }
}
  
  export default function ActiveCategoryPage({ params }) {
    console.log(" page param", params)
    return <SaleClient slug={params} />
  }
  