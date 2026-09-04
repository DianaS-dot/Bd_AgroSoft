interface CardBodyProps {
  title: string;
  text: string;
}

function CardBody({ title, text }: CardBodyProps) {
  return (
    <>
      <h5 className="text-xl font-bold mb-2">{title}</h5>
      <p className="text-gray-600 mb-4">{text}</p>
    </>
  );
}

export default CardBody;
