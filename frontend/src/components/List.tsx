import { useState } from 'react';

type Props = {
  data: string[];
  onSelect?: (elemento: string) => void;
};

function List({ data, onSelect }: Props) {
  const [index, setIndex] = useState(0);

  const handleClick = (i: number, elemento: string) => {
    setIndex(i);
    onSelect?.(elemento);
  };

  return (
    <ul className="space-y-2 mb-4">
      {data.map((elemento, i) => (
        <li
          key={elemento}
          onClick={() => handleClick(i, elemento)}
          className={`p-2 rounded cursor-pointer ${index === i ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {elemento}
        </li>
      ))}
    </ul>
  );
}

export default List;
