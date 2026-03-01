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
                    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661962821338-c07da63995f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvJTIwcmVzb3J0fGVufDB8fDB8fHww')",
                }}
            ></div>
        </>
    );
};

export default BackgroundAnimator;