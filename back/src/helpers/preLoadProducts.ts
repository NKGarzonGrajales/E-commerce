import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  //id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 15 Pro Max Smartphone",
    price: 1499,
    description:
      "The iPhone 15 Pro Max blends high performance with elegance. It features a 6.7-inch Super Retina XDR OLED display, an A17 Pro chip, a triple camera system, and up to 1TB of storage. Its ceramic shield front and stainless steel frame offer both durability and luxury!.",
    image:
      "https://m.media-amazon.com/images/I/616mZZm8-7L._AC_SX679_.jpg",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 299,
    description:
      "The Sony WH-1000XM5 now feature two processors inside the headphones to process information from eight distinct microphones. These mics are used to provide better noise cancellation in the mid-to-high frequencies. These are the Sony HD Noise Cancelling Processor Q1 and the Integrated Processor V1 which was also present in the Sony WF-1000XM4 TWS earbuds.",
    image:
      "https://images.indianexpress.com/2022/05/Sony-WH-1000XM5-.jpg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "13-inch MacBook Pro",
    price: 3197,
    description:
      "The new M2 chip makes the 13‑inch MacBook Pro more capable than ever. The same compact design supports up to 20 hours of battery life1 and an active cooling system to sustain enhanced performance. Featuring a brilliant Retina display, a FaceTime HD camera, and studio‑quality mics, it’s our most portable pro laptop",
    image:
      "https://res.cloudinary.com/ekeza2li/image/upload/v1787188836/Macbook_Pro.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Apple Watch Series 9",
    price: 429,
    description:
      "The Apple Watch Series 9 features a 1.9-inch Retina LTPO OLED display, the powerful Apple S9 chip, and up to 64GB of storage. It includes health monitoring tools like ECG, heart rate tracking, and temperature sensing, plus a battery life of up to 18 hours. Its also dust resistant (IP6X) and water resistant up to 50 meters.",
    image:
      "https://m.media-amazon.com/images/I/61DZ+Vezk0L._AC_SX342_SY445_.jpg",
    categoryId: 10,
    stock: 10,
  },
  {
    name: "Amazon Echo Speaker (4th Gen)",
      price: 63,
      description:
        "The Amazon Echo (4th Gen) is a smart speaker with premium sound, featuring a spherical design and built-in Alexa. It offers rich audio, smart home hub capabilities, and voice control for music, lights, and more. It's available in multiple colors and supports multi-room music.",
      image:
        "https://m.media-amazon.com/images/I/81t8gScXClL._AC_SL1500_.jpg",
      categoryId: 11,
      stock: 10,
  },
  {
      name: "CRUA 32 Monitor 4K",
      price: 399,
      description:
        "Gaming Monitor, IPS UHD(3840 * 2160P) 144Hz Monitors, Computer Monitor Support Free Sync, HDR, DCI-P3 97%, 1.07B Color Depth, with HDMI 2.0/DP 1.4 and Built-in Speaker, Support Wall- Black.",
      image:
        "https://m.media-amazon.com/images/I/71wYxDXBN9L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      categoryId: 7,
      stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
