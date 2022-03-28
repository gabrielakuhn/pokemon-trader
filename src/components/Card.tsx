interface CardProps {
  image: string;
  name: string
  base_experience: number
}

export const Card = ({image, name, base_experience}: CardProps) => {
  return (
    <div
      className="bg-white border border-slate-200 shadow font-sans p-3"
    >
      <div className="cursor-default">
        <img
          src={image}
          alt={name}
          className="m-auto"
        />
        <h2 className="capitalize">{name}</h2>
        <p className="text-xs text-slate-400">Exp: {base_experience}</p>
      </div>
    </div>
  );
};
