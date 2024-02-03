import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface MusicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon: IconType;
  text?: string;
}

const MusicButton: React.FC<MusicButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  text,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${
        variant === 'secondary'
          ? 'bg-[#8C52B9] text-white border-2 border-primary rounded-2xl p-6 text-xs md:text-lg uppercase font-bold flex flex-col justify-center items-center gap-2'
          : 'bg-[#C47BFD] text-[#8C52B9]'
      }
      ${disabled && 'opacity-50 pointer-events-none'}
      p-6 rounded-2xl`}
      type={variant === 'secondary' ? 'submit' : 'button'}
      {...props}
    >
      {text}
      <Icon
        className={
          variant === 'secondary' ? 'rotate-90 text-xl' : 'text-5xl md:text-6xl'
        }
      />
    </button>
  );
};

export default MusicButton;
