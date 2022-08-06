module.exports = {
  content: [
    "./themes/**/layouts/**/*.html",
    "./content/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.html"
  ],
  theme: {
    fontFamily: {
      'big': ['Poppins', 'sans-serif'],
      'small': [ 'Arimo', 'sans-serif'],
    },
    colors: {
      'brown': {
        DEFAULT: '#3B3022',
        '50': '#D7C9B9',
        '100': '#CFBFAC',
        '200': '#C0AC92',
        '300': '#B19878',
        '400': '#A2845E',
        '500': '#896F4F',
        '600': '#6F5A40',
        '700': '#554531',
        '800': '#3B3022',
        '900': '#211B13'
      },
      'yellow': {
        DEFAULT: '#E4C632',
        '50': '#F9F3D4',
        '100': '#F7EEC2',
        '200': '#F2E49E',
        '300': '#EDDA7A',
        '400': '#E9D056',
        '500': '#E4C632',
        '600': '#D2B31C',
        '700': '#AE9417',
        '800': '#897512',
        '900': '#65570D'
      },
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
//
// --color-fg-default: #262626;
// --color-fg-muted: #4D4D4D;
// --color-fg-subtle: #666666;
// --color-fg-on-emphasis: #FFFFFF;
// --color-fg-brand: #CB3837;
// --color-fg-accent: #196CB2;
// --color-fg-success: #107010;
// --color-fg-attention: #886701;
// --color-fg-danger: #BB2E3E;
// --color-bg-default: #FFFFFF;
// --color-bg-subtle: #F7F7F7;
// --color-bg-inset: #F2F2F2;
// --color-bg-emphasis: #262626;
// --color-bg-accent: #F2F9FF;
// --color-bg-success: #DCFDD9;
// --color-bg-attention: #FFF5D8;
// --color-bg-danger: #FFDBDB;
// --color-border-default: #E6E6E6;
// --color-border-muted: #F2F2F2;
// --color-border-strong: #D0D0D0;
// --color-border-accent: #AFCEE9;
// --color-border-success: #93D58A;
// --color-border-attention: #EFD88F;
// --color-border-danger: #F1B8BC;
// --wombat-red-hover: #c40b0a;
// --button-green: #00C642;
// --wombat-yellow: #FFCD3A;
// --wombat-violet: #8956FF;
// --wombat-purple: #C836C3;
// --wombat-green: #00C642;
// --wombat-teal: #29ABE2;
// --light-blue: #70b8ff;
// --wombat-red: #cb3837;
// --header-color: #000;
// --bg-dark: #cb3837;
// --npmRed: #cb3837;
// --npmLightRed: #fb3e44;
// --blue: #357edd;
// --bg: #fff;
// --background-color: #fafafa;
