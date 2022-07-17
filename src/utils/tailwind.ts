import { create } from 'twrnc';

const tailwindStyles = create(require(`../../tailwind.config.js`));

const tailwind = (styles: string) => tailwindStyles`${styles}`;

export default tailwind;
