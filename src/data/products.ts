import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sipora-classic-500',
    slug: 'sipora-classic-tumbler-500ml',
    name: 'Sipora Classic Tumbler 500ml',
    nameTh: 'แก้วน้ำเก็บอุณหภูมิ Sipora Classic 500 มล.',
    tagline: 'The iconic everyday tumbler for coffee, iced tea, and all-day hydration.',
    category: 'classic-tumblers',
    categoryName: 'Classic Tumblers',
    price: 890,
    compareAtPrice: 1190,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 342,
    capacity: '500ml (17 oz)',
    hotHours: 12,
    coldHours: 24,
    colors: [
      {
        name: 'Matte Charcoal',
        nameTh: 'สีชาโคลด้าน',
        hex: '#2B2D2F',
        image: '/src/assets/images/classic_tumbler_black_1787744223307.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Nordic Sage',
        nameTh: 'สีเขียวเสจ',
        hex: '#7A8B7B',
        image: '/src/assets/images/classic_tumbler_sage_1787744243641.jpg',
        secondaryImage: '/src/assets/images/sipora_hero_banner_1787742229226.jpg'
      },
      {
        name: 'Cream Pearl',
        nameTh: 'สีครีมมุก',
        hex: '#E8E4DC',
        image: '/src/assets/images/classic_tumbler_cream_1787744265459.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Dusty Rose',
        nameTh: 'สีชมพูดัสตี้โรส',
        hex: '#D8A499',
        image: '/src/assets/images/classic_tumbler_rose_1787744280454.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Ocean Blue',
        nameTh: 'สีฟ้าโอเชียน',
        hex: '#3B6B88',
        image: '/src/assets/images/classic_tumbler_blue_1787744298421.jpg',
        secondaryImage: '/src/assets/images/classic_tumbler_black_1787744223307.jpg'
      }
    ],
    sizes: ['500ml'],
    description: 'Engineered for seamless daily hydration, the Sipora Classic Tumbler combines double-wall vacuum insulation with a sleek, ergonomic silhouette. Keep your hot roast steamy for 12 hours or iced matcha cold for up to 24 hours without condensation.',
    descriptionTh: 'แก้วน้ำเก็บอุณหภูมิรุ่นซิกเนเจอร์ ออกแบบด้วยเทคโนโลยี Double-Wall Vacuum Insulation กักเก็บความร้อนได้นาน 12 ชั่วโมง และความเย็นสดชื่นได้นานถึง 24 ชั่วโมง ไร้หยดน้ำเกาะรอบแก้ว 100% ตัวแก้วผลิตจากสแตนเลสสตีลเกรดพรีเมียม 18/8 ผิวสัมผัสเนื้อแมตต์หรูหรา',
    features: [
      'TempShield™ Double-wall vacuum insulation keeps drinks hot 12h / cold 24h',
      '18/8 Pro-grade stainless steel ensures pure taste and zero flavor transfer',
      'Splash-proof magnetic slider lid for effortless one-handed sipping',
      'Sweat-free exterior finish with durable powder-coat grip',
      'Fits standard car cup holders and desktop coasters',
      '100% BPA-Free and toxin-free'
    ],
    specifications: {
      material: '18/8 Food-Grade Stainless Steel / Tritan™ Lid',
      weight: '310 g',
      height: '17.8 cm',
      diameter: '8.4 cm',
      dishwasherSafe: true,
      cupHolderFriendly: true,
      bpaFree: true
    },
    inStock: true,
    badge: 'BEST SELLER'
  },
  {
    id: 'sipora-handle-tumbler-900',
    slug: 'sipora-handle-pro-tumbler-900ml',
    name: 'Sipora Handle Pro Tumbler 900ml',
    nameTh: 'แก้วเก็บความเย็นพร้อมหูจับ Sipora Handle Pro 900 มล.',
    tagline: 'Maximum capacity hydration tumbler with comfort handle and 3-way rotating lid.',
    category: 'handle-tumblers',
    categoryName: 'Handle Tumblers',
    price: 1290,
    compareAtPrice: 1590,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.96,
    reviewCount: 412,
    capacity: '900ml (30 oz)',
    hotHours: 12,
    coldHours: 32,
    colors: [
      {
        name: 'Cream Pearl',
        nameTh: 'สีครีมมุก',
        hex: '#E8E4DC',
        image: '/src/assets/images/handle_tumbler_cream_1787744317015.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Nordic Sage',
        nameTh: 'สีเขียวเสจ',
        hex: '#7A8B7B',
        image: '/src/assets/images/handle_tumbler_sage_1787744336378.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Matte Charcoal',
        nameTh: 'สีชาโคลด้าน',
        hex: '#2B2D2F',
        image: '/src/assets/images/handle_tumbler_black_1787744353565.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Terracotta Pink',
        nameTh: 'สีชมพูเทอราคอตต้า',
        hex: '#C88A82',
        image: '/src/assets/images/handle_tumbler_pink_1787744372961.jpg',
        secondaryImage: '/src/assets/images/handle_tumbler_cream_1787744317015.jpg'
      },
      {
        name: 'Pastel Lavender',
        nameTh: 'สีม่วงพาสเทลลาเวนเดอร์',
        hex: '#A594B8',
        image: '/src/assets/images/handle_tumbler_lavender_1787744389131.jpg',
        secondaryImage: '/src/assets/images/handle_tumbler_cream_1787744317015.jpg'
      }
    ],
    sizes: ['900ml'],
    description: 'The heavyweight hydration master. Boasting an ultra-generous 900ml capacity and an ergonomic silicone comfort-grip handle, this tumbler keeps ice intact for over 32 hours. Features our 3-position Sip-or-Straw rotating lid.',
    descriptionTh: 'แก้วเก็บความเย็นรุ่นเรือธง ความจุจุใจ 900 มล. เก็บน้ำแข็งได้นานสะใจกว่า 32 ชั่วโมง มาพร้อมหูจับซิลิโคนนุ่มกระชับมือ และฝา 3 ฟังก์ชัน (ใช้หลอดดูด / จิบดื่ม / ปิดล็อค) ฐานแก้วทรงสลิมสามารถวางในช่องวางแก้วในรถยนต์ได้พอดี',
    features: [
      'Massive 900ml capacity with tapered slim base for vehicle holders',
      'Dual-function 3-way lid: Straw opening, direct sip mouth, and full seal',
      'Reinforced ergonomic handle with soft-touch silicone comfort lining',
      'Ice retention tested up to 32+ hours in tropical heat',
      'Includes reusable silicone-tipped 18/8 stainless steel straw'
    ],
    specifications: {
      material: '18/8 Stainless Steel, BPA-Free Eastman Tritan, Silicone',
      weight: '490 g',
      height: '23.8 cm',
      diameter: '9.2 cm (base 7.2 cm)',
      dishwasherSafe: true,
      cupHolderFriendly: true,
      bpaFree: true
    },
    inStock: true,
    badge: 'FLAGSHIP'
  },
  {
    id: 'sipora-everyday-750',
    slug: 'sipora-everyday-bottle-750ml',
    name: 'Sipora Everyday Bottle 750ml',
    nameTh: 'ขวดน้ำเก็บอุณหภูมิ Sipora Everyday 750 มล.',
    tagline: 'Your reliable hydration partner for gym, commute, and outdoor adventures.',
    category: 'thermal-bottles',
    categoryName: 'Thermal Bottles',
    price: 1090,
    compareAtPrice: 1390,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.95,
    reviewCount: 289,
    capacity: '750ml (25 oz)',
    hotHours: 14,
    coldHours: 28,
    colors: [
      {
        name: 'Pacific Slate Blue',
        nameTh: 'สีฟ้าแปซิฟิกสเลต',
        hex: '#5B7C99',
        image: '/src/assets/images/bottle_pacific_blue_1787744407867.jpg',
        secondaryImage: '/src/assets/images/sipora_flask_750_1787742967763.jpg'
      },
      {
        name: 'Matte Charcoal',
        nameTh: 'สีชาโคลด้าน',
        hex: '#2B2D2F',
        image: '/src/assets/images/sipora_flask_750_1787742967763.jpg',
        secondaryImage: '/src/assets/images/bottle_pacific_blue_1787744407867.jpg'
      },
      {
        name: 'Nordic Sage',
        nameTh: 'สีเขียวเสจ',
        hex: '#7A8B7B',
        image: '/src/assets/images/classic_tumbler_sage_1787744243641.jpg',
        secondaryImage: '/src/assets/images/bottle_pacific_blue_1787744407867.jpg'
      }
    ],
    sizes: ['750ml'],
    description: 'Designed for active lifestyles, the Sipora Everyday Bottle features a 100% leak-proof twist cap with an integrated flexible carry loop. Large enough to keep you fueled all day, slim enough for vehicle holders and desk spaces.',
    descriptionTh: 'ขวดน้ำเก็บอุณหภูมิความจุ 750 มล. ฝาเกลียวปิดสนิทกันน้ำรั่วซึม 100% มาพร้อมหูหิ้วซิลิโคนพกพาสะดวก เหมาะกับการออกกำลังกาย ทำงาน หรือเดินทางท่องเที่ยว เก็บน้ำแข็งได้นานถึง 28 ชั่วโมง และเครื่องดื่มร้อน 14 ชั่วโมง',
    features: [
      '100% Leak-Proof Flex Cap with ergonomic carry handle',
      'Ultra-durable triple-layered thermal barrier',
      'Wide mouth fits full ice cubes and enables easy cleaning',
      'Electropolished interior resists odors and stains',
      'Quiet-touch silicone base boot included'
    ],
    specifications: {
      material: '18/8 Stainless Steel, Food-grade Silicone',
      weight: '385 g',
      height: '24.5 cm',
      diameter: '7.8 cm',
      dishwasherSafe: true,
      cupHolderFriendly: true,
      bpaFree: true
    },
    inStock: true,
    badge: 'POPULAR'
  },
  {
    id: 'sipora-summit-flask-1000',
    slug: 'sipora-summit-thermal-flask-1000ml',
    name: 'Sipora Summit Thermal Flask 1000ml',
    nameTh: 'กระบอกน้ำเก็บอุณหภูมิ Sipora Summit 1,000 มล.',
    tagline: 'Extreme temperature endurance for trekking, endurance workouts, and expeditions.',
    category: 'thermal-bottles',
    categoryName: 'Thermal Bottles',
    price: 1390,
    compareAtPrice: 1690,
    isNew: true,
    rating: 4.97,
    reviewCount: 98,
    capacity: '1000ml (34 oz)',
    hotHours: 18,
    coldHours: 36,
    colors: [
      {
        name: 'Deep Navy',
        nameTh: 'สีกรมท่าเข้ม',
        hex: '#1D2A3A',
        image: '/src/assets/images/sipora_flask_large_1787742945014.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Matte Charcoal',
        nameTh: 'สีชาโคลด้าน',
        hex: '#2B2D2F',
        image: '/src/assets/images/sipora_black_tumbler_1787742193176.jpg',
        secondaryImage: '/src/assets/images/sipora_flask_large_1787742945014.jpg'
      },
      {
        name: 'Nordic Sage',
        nameTh: 'สีเขียวเสจ',
        hex: '#7A8B7B',
        image: '/src/assets/images/sipora_sage_tumbler_1787742175217.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      }
    ],
    sizes: ['1000ml'],
    description: 'Built to withstand the harshest environments while keeping liquid arctic-cold for 36 hours or piping hot for 18 hours. Features our reinforced stainless carabiner loop cap and powder armor coating.',
    descriptionTh: 'กระบอกน้ำเก็บอุณหภูมิสายลุยขนาด 1 ลิตร เก็บความเย็นได้ยาวนานสูงสุด 36 ชั่วโมง และความร้อน 18 ชั่วโมง ตัวถังหนาพิเศษ ทนต่อแรงกระแทก เหมาะสำหรับกิจกรรมกลางแจ้ง ยิม หรือการเดินทางไกล',
    features: [
      'Ultra-insulated double chamber with copper lining barrier',
      'Reinforced stainless steel heavy-duty loop cap',
      'Textured scratch-resistant ArmorGrip™ exterior',
      'Wide ice opening with threaded leak-tight lock'
    ],
    specifications: {
      material: 'Extra-Gauge 18/8 Stainless Steel, Copper Sub-layer',
      weight: '460 g',
      height: '27.2 cm',
      diameter: '8.8 cm',
      dishwasherSafe: true,
      cupHolderFriendly: false,
      bpaFree: true
    },
    inStock: true,
    badge: 'EXTREME PERFORMANCE'
  },
  {
    id: 'sipora-slim-straw-600',
    slug: 'sipora-slim-straw-tumbler-600ml',
    name: 'Sipora Slim Straw Tumbler 600ml',
    nameTh: 'แก้วเก็บความเย็นทรงสลิมพร้อมหลอด Sipora 600 มล.',
    tagline: 'Sleek ultra-slim silhouette with splash-resistant straw lid for modern workspaces.',
    category: 'classic-tumblers',
    categoryName: 'Classic Tumblers',
    price: 950,
    compareAtPrice: 1190,
    isNew: true,
    rating: 4.93,
    reviewCount: 148,
    capacity: '600ml (20 oz)',
    hotHours: 10,
    coldHours: 26,
    colors: [
      {
        name: 'Blush Rose',
        nameTh: 'สีชมพูบลัชโรส',
        hex: '#E29F94',
        image: '/src/assets/images/slim_tumbler_blush_1787744421741.jpg',
        secondaryImage: '/src/assets/images/classic_tumbler_rose_1787744280454.jpg'
      },
      {
        name: 'Nordic Sage',
        nameTh: 'สีเขียวเสจ',
        hex: '#7A8B7B',
        image: '/src/assets/images/classic_tumbler_sage_1787744243641.jpg',
        secondaryImage: '/src/assets/images/slim_tumbler_blush_1787744421741.jpg'
      },
      {
        name: 'Cream Pearl',
        nameTh: 'สีครีมมุก',
        hex: '#E8E4DC',
        image: '/src/assets/images/classic_tumbler_cream_1787744265459.jpg',
        secondaryImage: '/src/assets/images/slim_tumbler_blush_1787744421741.jpg'
      },
      {
        name: 'Matte Charcoal',
        nameTh: 'สีชาโคลด้าน',
        hex: '#2B2D2F',
        image: '/src/assets/images/classic_tumbler_black_1787744223307.jpg',
        secondaryImage: '/src/assets/images/slim_tumbler_blush_1787744421741.jpg'
      }
    ],
    sizes: ['600ml'],
    description: 'Minimalist, tapered design engineered specifically for modern desks and vehicle cup holders. Includes an 18/8 stainless steel straw with a soft silicone comfort tip.',
    descriptionTh: 'แก้วเก็บความเย็นทรงสลิม 600 มล. จับถนัดมือ ไร้หยดน้ำเกาะ วางในช่องวางแก้วได้ทุกขนาด มาพร้อมหลอดดูดสแตนเลสและปลอกซิลิโคนนุ่ม',
    features: [
      'Slim ergonomic profile with easy single-hand grip',
      'TempShield™ vacuum keeps ice frozen for 26 hours',
      'Dual-opening lid: use with straw or direct sip',
      'Included stainless steel straw with food-grade silicone tip'
    ],
    specifications: {
      material: '18/8 Pro-Grade Stainless Steel, Tritan Lid, Silicone',
      weight: '330 g',
      height: '20.2 cm',
      diameter: '7.4 cm',
      dishwasherSafe: true,
      cupHolderFriendly: true,
      bpaFree: true
    },
    inStock: true,
    badge: 'NEW SLIM'
  },
  {
    id: 'sipora-horizon-flask-1200',
    slug: 'sipora-horizon-mega-flask-1200ml',
    name: 'Sipora Horizon Mega Flask 1200ml',
    nameTh: 'กระบอกน้ำเก็บความเย็นไซส์ใหญ่ Sipora Horizon 1,200 มล.',
    tagline: 'All-day colossal hydration with dual-wall vacuum and heavy-duty stainless loop handle.',
    category: 'thermal-bottles',
    categoryName: 'Thermal Bottles',
    price: 1590,
    compareAtPrice: 1890,
    isFeatured: true,
    rating: 4.98,
    reviewCount: 184,
    capacity: '1200ml (40 oz)',
    hotHours: 20,
    coldHours: 40,
    colors: [
      {
        name: 'Matte Charcoal',
        nameTh: 'สีชาโคลด้าน',
        hex: '#2B2D2F',
        image: '/src/assets/images/sipora_black_tumbler_1787742193176.jpg',
        secondaryImage: '/src/assets/images/sipora_flask_large_1787742945014.jpg'
      },
      {
        name: 'Deep Navy',
        nameTh: 'สีกรมท่าเข้ม',
        hex: '#1D2A3A',
        image: '/src/assets/images/sipora_flask_large_1787742945014.jpg',
        secondaryImage: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
      },
      {
        name: 'Nordic Sage',
        nameTh: 'สีเขียวเสจ',
        hex: '#7A8B7B',
        image: '/src/assets/images/sipora_sage_tumbler_1787742175217.jpg',
        secondaryImage: '/src/assets/images/sipora_flask_large_1787742945014.jpg'
      }
    ],
    sizes: ['1200ml'],
    description: 'Designed for high-performance hydration that lasts the entire day and night. Keeps 1.2 liters of water iced cold for up to 40 hours with triple-layer vacuum insulation.',
    descriptionTh: 'กระบอกน้ำเก็บความเย็นขนาดยักษ์ 1,200 มล. (1.2 ลิตร) เก็บน้ำแข็งยาวนานถึง 40 ชั่วโมง และเก็บน้ำร้อน 20 ชั่วโมง เหมาะสำหรับผู้ที่ต้องการดื่มน้ำให้ครบตามเป้าหมายในแต่ละวันโดยไม่ต้องเติมบ่อย',
    features: [
      'Massive 1.2L capacity with heavy-duty thermal insulation',
      'Wide mouth for effortless ice loading and fruit infusions',
      'Heavy-duty stainless steel handle for easy carrying',
      'Durable powder coat finish resistant to drops and scratches'
    ],
    specifications: {
      material: '18/8 Pro-Grade Stainless Steel',
      weight: '520 g',
      height: '28.5 cm',
      diameter: '9.4 cm',
      dishwasherSafe: true,
      cupHolderFriendly: false,
      bpaFree: true
    },
    inStock: true,
    badge: 'MAX CAPACITY'
  }
];

export const CATEGORIES = [
  {
    id: 'classic-tumblers',
    name: 'Classic Tumblers',
    nameTh: 'แก้วเก็บอุณหภูมิทรงคลาสสิก',
    count: '2 models',
    image: '/src/assets/images/sipora_sage_tumbler_1787742175217.jpg',
    description: 'Everyday insulated tumblers for iced drinks, matcha, and all-day hydration.'
  },
  {
    id: 'handle-tumblers',
    name: 'Handle Tumblers (900ml)',
    nameTh: 'แก้วเก็บความเย็นพร้อมหูจับ',
    count: '1 model',
    image: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg',
    description: 'Maximum capacity 900ml hydration tumbler with ergonomic comfort carry handle.'
  },
  {
    id: 'thermal-bottles',
    name: 'Thermal Bottles & Flasks',
    nameTh: 'กระบอกน้ำเก็บความเย็น',
    count: '3 models',
    image: '/src/assets/images/sipora_black_tumbler_1787742193176.jpg',
    description: '100% leak-proof insulated flasks (750ml - 1200ml) for active workouts and expeditions.'
  }
];
