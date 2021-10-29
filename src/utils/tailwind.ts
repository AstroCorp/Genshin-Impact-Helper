import { create } from 'tailwind-rn';

const { tailwind, getColor } = create({
    ...require('tailwind-rn/styles.json'),
    'font-genshin': {
        'fontFamily': 'HYWenHei-85W',
    },
});

export { tailwind, getColor };
