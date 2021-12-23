module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        drawer: {
          background: '#EBE4D7',
          button: '#4E5769',
          text: '#BEBDB8',
        },
        header: {
          background: '#454C5C',
          border: '#545B6B',
          underline: '#D17B6A',
        },
        modal: {
          background: '#F2EFEB',
          border: '#D6C3B2',
        },
        screen: {
          background: '#F9F6F1',
          title: '#BF9000',
          text: '#A89000',
        },
        settings: {
          text: '#69748C',
        },
      },
      fontFamily: {
        genshin: ['HYWenHei-85W'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
