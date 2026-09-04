import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
  color?: 'green' | 'blue' | 'red' | 'gray';
};

function Button({ children, isLoading, onClick, className = '', color = 'blue' }: Props) {
  const colorClasses = {
    green: 'bg-green-500 hover:bg-green-600 text-white',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white'
  };

  const useCustomColor = className.includes('bg-');
  const colorClass = useCustomColor ? '' : colorClasses[color];

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className={`px-4 py-2 rounded ${className} ${colorClass} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}

export default Button;
