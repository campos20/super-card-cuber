import type { CompetitorInfoDto } from "../lib/dto";

interface Props {
  competitor: CompetitorInfoDto;
}

export const Card = ({ competitor }: Props) => {
  return (
    <div>
      <h2>{competitor.person.name}</h2>
    </div>
  );
};
