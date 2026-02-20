import React from 'react';

const BackgroundAnimator = () => {
    return (
        <>
            <style>
                {`
          @keyframes bgPan {
            0% { transform: scale(1); background-position: center; }
            50% { transform: scale(1.1); background-position: left; }
            100% { transform: scale(1); background-position: center; }
          }
          .animate-bg-global {
            animation: bgPan 20s ease-in-out infinite alternate;
          }
        `}
            </style>
            {/* Background Image Container */}
            <div
                className="w-full h-full animate-bg-global bg-cover bg-center"
                style={{
                    // Check korun ei link-ti browser-e kaj korche kina
                    backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000')",
                }}
            ></div>
        </>
    );
};

export default BackgroundAnimator;