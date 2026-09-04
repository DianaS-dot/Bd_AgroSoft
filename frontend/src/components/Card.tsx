import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Card({ children }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: '350px' }}>
      <div>{children}</div>
    </div>
  );
}

export default Card;
