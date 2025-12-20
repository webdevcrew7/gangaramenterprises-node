'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTACT_INFO } from '@/constants/contact';

interface NavItem {
    id: string;
    label: string;
    icon: string;
    href: string;
    isExternal?: boolean;
    isWhatsApp?: boolean;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'fa-home', href: '/' },
    { id: 'categories', label: 'Categories', icon: 'fa-th-large', href: '#collections' },
    { id: 'services', label: 'Services', icon: 'fa-briefcase', href: '/services' },
    { id: 'contact', label: 'Contact', icon: 'fa-location-dot', href: '/contact' },
    {
        id: 'whatsapp',
        label: 'WhatsApp',
        icon: 'fa-whatsapp',
        href: CONTACT_INFO.whatsapp,
        isExternal: true,
        isWhatsApp: true,
    },
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
        if (item.href.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(item.href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const isActive = (item: NavItem) => {
        if (item.href === '/') {
            return pathname === '/';
        }
        if (item.href.startsWith('#')) {
            return false;
        }
        return pathname?.startsWith(item.href);
    };

    return (
        <nav id="mobile-bottom-nav" className="mobile-bottom-nav md:hidden">
            {navItems.map((item) => {
                const isActiveItem = isActive(item);
                const Component = item.isExternal ? 'a' : Link;
                const linkProps = item.isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                return (
                    <Component
                        key={item.id}
                        href={item.href}
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item)}
                        className={`mobile-nav-item ${isActiveItem ? 'active' : ''} ${item.isWhatsApp ? 'whatsapp-item' : ''}`}
                        data-nav={item.id}
                        {...linkProps}
                    >
                        <i className={`fa-${item.isWhatsApp ? 'brands' : 'solid'} ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </Component>
                );
            })}
        </nav>
    );
}
