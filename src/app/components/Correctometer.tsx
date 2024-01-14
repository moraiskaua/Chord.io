import { TbGuitarPickFilled } from 'react-icons/tb';

interface CorrectometerProps {}

const Correctometer = ({}: CorrectometerProps) => {
  return (
    <div className="h-full w-[280px] flex flex-col justify-center items-center gap-3">
      <p className="text-2xl font-bold uppercase bg-gradient-to-b from-[#C47BFD] via-[#C47BFD] to-[#343234] inline-block text-transparent bg-clip-text">
        Are you close?
      </p>
      <div className="w-[85%] h-[90%] rounded-[30px] p-12 bg-[#251926] shadow-custom flex items-center">
        <div className="bg-[#534657] h-full w-14 rounded-full p-2 relative">
          <div className="bg-gradient-to-b from-[#00FEC1] via-[#6E49D7] to-[#FB037A] h-full rounded-full" />
          <TbGuitarPickFilled
            className={`rotate-90 absolute left-16 -bottom-5 transform`}
            color={'#FB037A'}
            size={80}
          />
        </div>
      </div>
    </div>
  );
};

export default Correctometer;
