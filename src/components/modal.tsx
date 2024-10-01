import React from 'react';
import { IoClose } from 'react-icons/io5';

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
}

export const Modal: React.FC<Props> = ({
  open,
  onClose,
  children,
  showCloseIcon,
}) => {
  const handleClose = () => {
    onClose(!open);
  };

  return (
    open && (
      <div
        className='fixed inset-0 bg-white bg-opacity-10 flex items-center justify-end z-50'
        onClick={handleClose}
      >
        <div className='bg-white p-2 rounded-lg relative h-full w-96'>
          {showCloseIcon && (
            <button
              className='absolute top-2 right-2 text-2xl bg-none border-none cursor-pointer'
              onClick={handleClose}
            >
              <IoClose />
            </button>
          )}
          <div
            className='overflow-y-auto max-h-[calc(100vh-20px)]'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  );
};
