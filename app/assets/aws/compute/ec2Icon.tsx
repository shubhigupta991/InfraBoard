import React from 'react';

function Ec2Icon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      className={className}
    >
      <defs>
        <linearGradient
          id="Arch_Amazon-EC2_32_svg__a"
          x1="0%"
          x2="100%"
          y1="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#C8511B"></stop>
          <stop offset="100%" stopColor="#F90"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="url(#Arch_Amazon-EC2_32_svg__a)" d="M0 0h40v40H0z"></path>
        <path
          fill="#FFF"
          d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z"
        ></path>
      </g>
    </svg>
  );
}

export default React.memo(Ec2Icon);
