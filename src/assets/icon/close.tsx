import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={22}
        viewBox="0 -1 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill="black"
        />
    </svg>
);
export { SvgComponent as CloseButton };