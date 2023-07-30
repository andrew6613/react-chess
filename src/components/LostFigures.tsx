import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div>
      <h3>{title}</h3>
      {figures.map((fig) => (
        <div key={fig.id}>
          {fig.name} {fig.logo && <img width={20} height={20} src={fig.logo} />}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
