tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                royal: {
                    800: '#000000', // Changed to Black based on card
                    900: '#111111',
                },
                gold: {
                    400: '#fbbf24',
                    500: '#c5a059', // Muted Gold from card
                    600: '#b08d55',
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        }
    }
};
