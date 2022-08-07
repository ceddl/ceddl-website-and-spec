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
            'small': ['Arimo', 'sans-serif'],
        },
        fontSize: {
            'xxs': '.55rem',
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        colors: {
            'white': {
                DEFAULT: '#FFFFFF',
            },
            'brown': {
                DEFAULT: '#453015',
                '50': '#CD9B5B',
                '100': '#C8914A',
                '200': '#AF7935',
                '300': '#8B612A',
                '400': '#684820',
                '500': '#453015',
                '600': '#392811',
                '700': '#2E200E',
                '800': '#22180A',
                '900': '#160F07'
            },
            'orange': {
                DEFAULT: '#FB8817',
                '50': '#FEE5CB',
                '100': '#FEDAB7',
                '200': '#FDC68F',
                '300': '#FCB167',
                '400': '#FC9D3F',
                '500': '#FB8817',
                '600': '#D66C04',
                '700': '#9F5003',
                '800': '#683402',
                '900': '#311901'
            },
            'yellow': {
                DEFAULT: '#FFF01B',
                '50': '#FFFCD3',
                '100': '#FFFBBE',
                '200': '#FFF895',
                '300': '#FFF56D',
                '400': '#FFF344',
                '500': '#FFF01B',
                '600': '#E7D800',
                '700': '#B4A800',
                '800': '#817900',
                '900': '#4E4900'
            },
            'green': {
                DEFAULT: '#E4FF01',
                '50': '#F8FFB9',
                '100': '#F5FFA4',
                '200': '#F1FF7B',
                '300': '#EDFF53',
                '400': '#E8FF2A',
                '500': '#E4FF01',
                '600': '#BCD200',
                '700': '#93A400',
                '800': '#6A7600',
                '900': '#414800'
            },
            'gray': {
                DEFAULT: '#6B7280',
                '50': '#F3F3F5',
                '100': '#E3E5E8',
                '200': '#C5C8CE',
                '300': '#A6ABB5',
                '400': '#888E9B',
                '500': '#6B7280',
                '600': '#565C67',
                '700': '#41454E',
                '800': '#2C2F35',
                '900': '#17191C'
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
