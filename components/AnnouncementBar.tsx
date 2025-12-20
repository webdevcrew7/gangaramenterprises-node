'use client';

export default function AnnouncementBar() {
    const announcements = [
        '🔥 MEGA SALE - Up to 50% OFF on Selected Items',
        '✨ FREE CONSULTATION on Home Interiors',
        '🏠 Custom Modular Kitchens Starting ₹49,999',
        '🎬 Home Theatre Installation - Special Offers',
        '📞 Call Now for Exclusive Deals',
    ];

    // Duplicate for seamless infinite scroll
    const duplicatedAnnouncements = [...announcements, ...announcements];

    return (
        <div className="announcement-bar">
            <div className="announcement-track">
                {duplicatedAnnouncements.map((text, index) => (
                    <span key={index} className="announcement-text">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
