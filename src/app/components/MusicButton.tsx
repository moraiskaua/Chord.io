import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface MusicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon: IconType;
  size?: number;
  text?: string;
}

const MusicButton: React.FC<MusicButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  size,
  text,
  ...props
}) => {
  return (
    <button
      className={`${
        variant === 'secondary'
          ? 'bg-[#8C52B9] text-white border-2 border-primary rounded-2xl p-6 uppercase font-bold flex flex-col justify-center items-center gap-2'
          : 'bg-[#C47BFD] text-[#8C52B9]'
      } p-6 rounded-2xl`}
      type={variant === 'secondary' ? 'submit' : 'button'}
      {...props}
    >
      {text}
      <Icon
        size={size ?? 20}
        className={variant === 'secondary' ? 'rotate-90' : ''}
      />
    </button>
  );
};

export default MusicButton;
