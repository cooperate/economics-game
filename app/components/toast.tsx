import React from 'react';

const Toast = ({ message, isVisible }: {message: string, isVisible: boolean}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded">
      {message}
    </div>
  );
};

export default Toast;
