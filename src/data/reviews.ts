import { ProductReview } from '../types';

export const CUSTOMER_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Pattarapol K.',
    location: 'Bangkok, Thailand',
    rating: 5,
    date: '2 วันที่แล้ว',
    title: 'Finally found a tumbler that actually fits my daily routine.',
    comment: 'คุณภาพเนื้อแก้วดีมาก ผิวแมตต์สัมผัสแล้วหรูหรา ไม่ลื่นมือเลย ใส่น้ำแข็งตอน 8 โมงเช้า กลับมาตอน 3 ทุ่ม น้ำแข็งยังละลายไม่หมด ไร้หยดน้ำเกาะข้างแก้วให้โต๊ะทำงานเปียก 10/10 ครับ',
    verified: true,
    productColor: 'Matte Charcoal',
    likes: 42
  },
  {
    id: 'rev-2',
    author: 'Varisara N.',
    location: 'Chiang Mai, Thailand',
    rating: 5,
    date: '5 วันที่แล้ว',
    title: 'Looks premium, feels premium, and keeps iced drinks cold all day.',
    comment: 'ซื้อรุ่น Classic Tumbler 500ml สี Nordic Sage มาใช้ประจำวัน เก็บความเย็นได้ดีมาก ใส่น้ำแข็งตั้งแต่เช้าถึงเย็นยังไม่ละลาย ไม่เหม็นกลิ่นโลหะเลย สีสวยมินิมอลถูกใจสุดๆ เพื่อนที่ออฟฟิศเห็นแล้วถามตลอดว่าซื้อจากไหน',
    verified: true,
    productColor: 'Nordic Sage',
    likes: 38
  },
  {
    id: 'rev-3',
    author: 'Chanon T.',
    location: 'Nonthaburi, Thailand',
    rating: 5,
    date: '1 สัปดาห์ที่แล้ว',
    title: 'Perfect size for work and travel.',
    comment: 'รุ่น Everyday 750ml พกไปฟิตเนสและวางในรถได้พอดี ฝาปิดแน่นไม่มีน้ำรั่วซึมสักหยด ใส่ชาเขียวเย็นไว้ข้ามคืนยังเย็นเจี๊ยบ คุ้มค่าราคามาก',
    verified: true,
    productColor: 'Terracotta Warmth',
    likes: 29
  },
  {
    id: 'rev-4',
    author: 'Kornkanok M.',
    location: 'Phuket, Thailand',
    rating: 5,
    date: '2 สัปดาห์ที่แล้ว',
    title: 'แพ็คเกจจิ้งสวยงามจัดส่งรวดเร็วมาก',
    comment: 'สั่งเซ็ตของขวัญ Signature Gift Box ให้หัวหน้าวันเกิด ประทับใจกล่องและริบบิ้นมาก ตัวแก้วสลักชื่อเลเซอร์ได้ด้วย สวยงามพรีเมียมเกินราคามากค่ะ',
    verified: true,
    productColor: 'Cream Pearl',
    likes: 19
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/src/assets/images/sipora_sage_tumbler_1787742175217.jpg',
    tag: 'Daily Hydration',
    productName: 'Sipora Classic 500ml (Sage)',
    handle: '@nicha_vibes',
    likes: 1420
  },
  {
    id: 'ig-2',
    image: '/src/assets/images/sipora_black_tumbler_1787742193176.jpg',
    tag: 'Office Desk Setup',
    productName: 'Sipora Pro 900ml (Charcoal)',
    handle: '@minimal_workspace',
    likes: 2890
  },
  {
    id: 'ig-3',
    image: '/src/assets/images/sipora_cream_tumbler_1787742210614.jpg',
    tag: 'Morning Routine',
    productName: 'Sipora Classic 500ml (Cream)',
    handle: '@driveandbrew',
    likes: 1980
  },
  {
    id: 'ig-4',
    image: '/src/assets/images/sipora_blue_tumbler_1787742722065.jpg',
    tag: 'Ice Chill 24H',
    productName: 'Sipora Everyday 750ml (Sky Blue)',
    handle: '@fit_life_th',
    likes: 2150
  },
  {
    id: 'ig-5',
    image: '/src/assets/images/sipora_pink_tumbler_1787742704037.jpg',
    tag: 'Pastel Lifestyle',
    productName: 'Sipora Slim Tumbler (Blush)',
    handle: '@pastel_daily_th',
    likes: 3120
  },
  {
    id: 'ig-6',
    image: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg',
    tag: 'Color Lineup',
    productName: 'Sipora Signature Collection',
    handle: '@sipora_community',
    likes: 4240
  }
];
