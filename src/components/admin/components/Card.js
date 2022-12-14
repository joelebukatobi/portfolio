export default function Card({ caption, total, svg }) {
  return (
    <div className="card">
      <h3 className="capitalize">{caption}</h3>
      <div className="flex items-end">
        <svg>
          <use href={`/images/sprite.svg#${svg}`} />
        </svg>
        <h5 className="font-normal">
          You have a total of <br /> {total} {caption}
        </h5>
      </div>
    </div>
  );
}
