import React from 'react';

type ButtonTypes = {
  default: string;
  primary: string;
  secondary: string;
  error: string;
  success: string;
  warning: string;
  info: string;
};

type ButtonSizes = {
  sm: string;
  md: string;
  lg: string;
};

type ButtonProps = {
  type?: keyof ButtonTypes;
  size?: keyof ButtonSizes;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

function Button({
  children,
  type = 'default',
  size = 'md',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const colorClasses: ButtonTypes = {
    default: 'bg-neutral-200 hover:bg-neutral-300 text-dark',
    primary: 'bg-primary-500 hover:bg-primary-600 text-light',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-light',
    error: 'bg-error-500 hover:bg-error-600 text-dark',
    success: 'bg-success-500 hover:bg-success-600 text-dark',
    warning: 'bg-warning-500 hover:bg-warning-600 text-dark',
    info: 'bg-info-500 hover:bg-info-600 text-dark',
  };

  const sizeClasses: ButtonSizes = {
    sm: 'px-4 py-1 text-sm rounded-sm',
    md: 'px-5 py-1.5 rounded-md',
    lg: 'px-6 py-2 text-lg rounded-lg',
  };

  const spinnerSizeClasses: ButtonSizes = {
    sm: 'w-3 h-3 -ml-2 mr-2',
    md: 'w-4 h-4 -ml-2 mr-2',
    lg: 'w-4 h-4 -ml-2 mr-2',
  };

  const spinnerColorClasses: ButtonTypes = {
    default: 'text-gray-50 fill-gray-500',
    primary: 'text-gray-50 fill-primary-500',
    secondary: 'text-gray-50 fill-secondary-500',
    error: 'text-gray-50 fill-error-500',
    success: 'text-gray-50 fill-success-500',
    warning: 'text-gray-50 fill-warning-500',
    info: 'text-gray-50 fill-info-500',
  };

  const loadingClass = `bg-neutral-200 hover:!bg-neutral-200`;
  const disabedClass = `!bg-neutral-200 hover:!bg-neutral-200 !text-gray-50`;

  return (
    <>
      <button
        className={`${colorClasses[type]} ${sizeClasses[size]} ${
          loading ? loadingClass : ''
        } ${
          disabled || loading ? disabedClass : ''
        } flex items-center cursor-pointer font-md tracking-wide capitalize transition-colors duration-300 transform focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80`}
      >
        {loading && (
          <svg
            aria-hidden="true"
            className={`animate-spin ${spinnerSizeClasses[size]} ${spinnerColorClasses[type]}`}
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}

        {children}
      </button>
    </>
  );
}

export default Button;
