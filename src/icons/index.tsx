interface Props {
  size?: number;
  className?: string;
}

export const StarIcon = ({ size = 18, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M6.86642 1.75507L7.74642 3.51507C7.86642 3.76007 8.18642 3.99507 8.45642 4.04007L10.0514 4.30507C11.0714 4.47507 11.3114 5.21507 10.5764 5.94507L9.33642 7.18507C9.12642 7.39507 9.01142 7.80007 9.07642 8.09007L9.43142 9.62507C9.71142 10.8401 9.06642 11.3101 7.99142 10.6751L6.49642 9.79007C6.22642 9.63007 5.78142 9.63007 5.50642 9.79007L4.01142 10.6751C2.94142 11.3101 2.29142 10.8351 2.57142 9.62507L2.92642 8.09007C2.99142 7.80007 2.87642 7.39507 2.66642 7.18507L1.42642 5.94507C0.696419 5.21507 0.931419 4.47507 1.95142 4.30507L3.54642 4.04007C3.81142 3.99507 4.13142 3.76007 4.25142 3.51507L5.13142 1.75507C5.61142 0.800068 6.39142 0.800068 6.86642 1.75507Z"
      fill="none"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-x"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

export const SearchIcon = ({ size = 18, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M7.66732 14C11.1651 14 14.0007 11.1645 14.0007 7.66671C14.0007 4.1689 11.1651 1.33337 7.66732 1.33337C4.16951 1.33337 1.33398 4.1689 1.33398 7.66671C1.33398 11.1645 4.16951 14 7.66732 14Z"
      stroke="#181A1B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.6673 14.6667L13.334 13.3334"
      stroke="#181A1B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ArrowRight = ({ size = 18, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 8 12"
    fill="none"
    stroke="none"
    strokeWidth={1.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M0 1.41L4.58 6L0 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
      fill="#C4CDD5"
    />
  </svg>
);
export const ArrowLeft = ({ size = 18, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 8 12"
    fill="none"
    stroke="none"
    strokeWidth={1.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M7.41016 1.41L2.83016 6L7.41016 10.59L6.00016 12L0.000156403 6L6.00016 0L7.41016 1.41Z"
      fill="#C4CDD5"
    />
  </svg>
);
