import CanvasApp from "@/UI/Modals/DesignYourRoomModal/Canvas/canvas";

export async function generateMetadata() {
    return {
        title: `Canvas - Furniture Mecca`,
        description: `Browse our  collection`,
    };
}

const dummyData = {
    _id: "6837f474d6bf575889dd9705",
    product_uid: 2642,
    variation_uid:0,
    name: "Heartcort Sofa and Loveseat",
    sku: "44604-38-35",
    quantity:1,
    is_protected:0,
    slug: "heartcort-sofa-and-loveseat",
    type: "simple",
    // cat:'Sectional',
    // cat:'Recliner-Sectional',
    // cat:'Recliner',
    cat:'LoveSeat',
    parent: 0,
    isVariable:0,
    attributes: [
      {
        _id: "679de4015c0da9f45dc41361",
        name: "Select Color",
        type: "color",
        options: [
          {
            name: "Light Gray",
            value: "#838585",
            _id: "6867be818d2488a32e4be7c4"
          }
        ]
      }
    ],
    regular_price: "1799",
    sale_price: "899",
    image: "/uploads/media/Products/1748497331372_963_Heartcort_Sofa_and_Loveseat_Img1.jpg",
    // png_image: "/furniture/Bartram-6-PC-Reclining-Sectional.png",
    // png_image:"/sectionals/Mason-2PC-Sectional.png" //sectional
    // png_image:'/Sofas&LoveSeat/Untitled-3.png' //Recliner
    // png_image:'/Sofas&LoveSeat/Untitled-4.png'
    png_image:'/uploads/Products/1752167591990_344_heartcort_png.png'
  }

export default function CanvasApp1() {
    
    return <CanvasApp data={dummyData}  />
}