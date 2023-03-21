export const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  red: '#C04345',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};

export const Items = [
  {
    id: 1,
    category: 'product',
    productName: 'MI Super Bass Bluetooth Wireless Headphones',
    productPrice: 1799,
    description:
      'Up to 20 hours battery life | Super powerful Bass | 40mm dynamic driver | Pressure less ear muffs | Bluetooth 5.0 | Voice control',
    isOff: true,
    offPercentage: 10,
    productImage: require('../database/images/products/Mi1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/products/Mi1.png'),
      require('../database/images/products/Mi2.png'),
      require('../database/images/products/Mi3.png'),
    ],
  },
  {
    id: 2,
    category: 'product',
    productName: 'boAt Rockerz 450 Bluetooth Headphone',
    productPrice: 1499,
    description:
      'boAt Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
    isOff: false,
    productImage: require('../database/images/products/boat1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/products/boat1.png'),
      require('../database/images/products/boat2.png'),
      require('../database/images/products/boat3.png'),
    ],
  },
  {
    id: 3,
    category: 'accessory',
    productName: 'boAt Airdopes 441',
    productPrice: 1999,
    description:
      'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
    isOff: true,
    offPercentage: 18,
    productImage: require('../database/images/accessories/boatairpods1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/accessories/boatairpods1.png'),
      require('../database/images/accessories/boatairpods2.png'),
      require('../database/images/accessories/boatairpods3.png'),
    ],
  },
  {
    id: 4,
    category: 'accessory',
    productName: 'boAt Bassheads 242',
    productPrice: 399,
    description:
      'Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time.',
    isOff: false,
    productImage: require('../database/images/accessories/boatbassheads1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/accessories/boatbassheads1.png'),
      require('../database/images/accessories/boatbassheads2.png'),
      require('../database/images/accessories/boatbassheads3.png'),
    ],
  },
  {
    id: 5,
    category: 'accessory',
    productName: 'boAt Rockerz 255 Pro+',
    productPrice: 1499,
    description:
      'The unbeatable boAt signature sound shines through no matter what are you playing courtesy its 10mm drivers.',
    isOff: false,
    productImage: require('../database/images/accessories/boatrockerz1.png'),
    isAvailable: false,
    productImageList: [
      require('../database/images/accessories/boatrockerz1.png'),
      require('../database/images/accessories/boatrockerz2.png'),
      require('../database/images/accessories/boatrockerz3.png'),
    ],
  },
  {
    id: 6,
    category: 'accessory',
    productName: 'Boult Audio AirBass Propods TWS',
    productPrice: 1299,
    description:
      'One Touch Control & Voice Assistant: With one multifunction button, you can play/pause, previous/next track and answer/hang-up calls.Voice assistant function lets you access siri/Google Assistant',
    isOff: false,
    productImage: require('../database/images/accessories/boultairbass1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/accessories/boultairbass1.png'),
      require('../database/images/accessories/boultairbass2.png'),
      require('../database/images/accessories/boultairbass3.png'),
    ],
  },
];

export const SliderData = [
  {
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

export const Categories = [
  {
    title: 'Fashion Pria',
    illustration:
      'https://img.freepik.com/free-photo/guy-dressed-brown-outfit-wearing-sunglasses-poses-with-backpack_197531-26761.jpg?w=740&t=st=1679387568~exp=1679388168~hmac=5217254ff87c18f704cf35aa664e0eaabcef1e4d6e7432800e2e88fe81507735',
  },
  {
    title: 'Fashion Wanita',
    illustration:
      'https://img.freepik.com/free-photo/perky-girl-stylish-glasses-stares-amazement-walking-pink-wall-brunette-culottes-orange-blouse-posing-with-red-handbag_197531-14254.jpg?w=740&t=st=1679387663~exp=1679388263~hmac=3e3306f7a54fee52447c75eaa6c391d691f171cef621d9a84bcde26698fdd484',
  },
  {
    title: 'Outer Wear',
    illustration:
      'https://img.freepik.com/free-photo/fascinating-woman-winter-fur-coat-posing_273443-4008.jpg?w=740&t=st=1679390897~exp=1679391497~hmac=0bf384fb41af4bc1d95c248a3c00174375e5eb5b98f4bb6f6e364c720b6a8e11',
  },
  {
    title: 'Makanan',
    illustration:
      'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209262.jpg?t=st=1679387698~exp=1679388298~hmac=5fbaae28a9680f4a0c9043608b844a8d41a34fbeca26db83055ca645dd76ea86',
  },
];
