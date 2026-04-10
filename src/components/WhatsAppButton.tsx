import React from "react";

const WhatsAppButton: React.FC = () => {
    const handleClick = () => {
        // Open a generic WhatsApp URL. Change to a specific number if needed.
        window.open("https://wa.me/911234567890", "_blank");
    };

    return (
        <div
            className="fixed bottom-10 right-6 z-[9999] cursor-pointer"
            onClick={handleClick}
            title="Contact Support on WhatsApp"
        >
            <img
                src="/whatsapp-icon.svg"
                alt="WhatsApp Support"
                className="h-10 w-10 hover:scale-110 transition-transform drop-shadow-lg"
                style={{ background: 'transparent' }}
            />
        </div>
    );
};

export default WhatsAppButton;
