import { TbGuitarPickFilled } from 'react-icons/tb';

interface CorrectometerProps {
  accuracy: number;
}

const Correctometer = ({ accuracy }: CorrectometerProps) => {
  const pointerPositions = {
    right: { position: '-top-5', color: 'text-[#00F5B5]' },
    almostRight: { position: 'top-20', color: 'text-[#26C0C9]' },
    almostAlmostRight: { position: 'top-40', color: 'text-[#458BCF]' },
    middle: { position: 'top-64', color: 'text-[#6656D6]' },
    almostAlmostWrong: { position: 'bottom-40', color: 'text-[#C61E9D]' },
    almostWrong: { position: 'bottom-20', color: 'text-[#C61E9D]' },
    wrong: { position: '-bottom-5', color: 'text-[#FB037A]' },
  };

  const accuracyRange =
    accuracy <= 20
      ? 'wrong'
      : accuracy <= 40
      ? 'almostWrong'
      : accuracy <= 49
      ? 'almostAlmostWrong'
      : accuracy <= 60
      ? 'middle'
      : accuracy <= 69
      ? 'almostAlmostRight'
      : accuracy <= 99
      ? 'almostRight'
      : 'right';

  const { position, color } = pointerPositions[accuracyRange];

  return (
    <div className="h-full w-[280px] flex flex-col justify-center items-center gap-3">
      <p className="text-2xl font-bold uppercase bg-gradient-to-b from-[#C47BFD] via-[#C47BFD] to-[#343234] inline-block text-transparent bg-clip-text">
        Are you close?
      </p>
      <div className="w-[85%] h-[90%] rounded-[30px] p-12 bg-[#251926] shadow-custom flex items-center">
        <div className="bg-[#534657] h-full w-14 rounded-full p-2 relative">
          <div className="bg-gradient-to-b from-[#00FEC1] via-[#6E49D7] to-[#FB037A] h-full rounded-full" />
          <TbGuitarPickFilled
            className={`rotate-90 absolute left-16 ${position} ${color}`}
            size={80}
          />
        </div>
      </div>
    </div>
  );
};

export default Correctometer;
