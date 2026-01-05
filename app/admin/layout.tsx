'use client'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Hide the main site header/footer for admin pages - use specific selectors */}
            <style jsx global>{`
        /* Hide main site components but NOT admin header */
        .site-header, footer, .mobile-bottom-nav, .floating-contact-buttons {
          display: none !important;
        }
        main {
          padding-bottom: 0 !important;
        }
      `}</style>
            {children}
        </>
    )
}

