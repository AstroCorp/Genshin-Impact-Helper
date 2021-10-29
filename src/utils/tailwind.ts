import { create } from 'tailwind-rn';

const { tailwind, getColor } = create({
    ...require('tailwind-rn/styles.json'),
    ...require('./styles.json'),
});

export { tailwind, getColor };
