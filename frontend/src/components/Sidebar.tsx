'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  if (!user) return null;

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '15px', height: '15px' }}>
          <rect x="2" y="2" width="5" height="5" rx="1"/>
          <rect x="9" y="2" width="5" height="5" rx="1"/>
          <rect x="2" y="9" width="5" height="5" rx="1"/>
          <rect x="9" y="9" width="5" height="5" rx="1"/>
        </svg>
      )
    },
    {
      href: '/chat',
      label: 'Chat',
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '15px', height: '15px' }}>
          <path d="M2 11V5a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H5l-3 2v-2z"/>
        </svg>
      )
    }
  ];

  const workspaceItems = [
    {
      href: '/upload',
      label: 'Upload',
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
          <path d="M8 2v8M5 7l3-3 3 3"/>
          <path d="M3 13h10"/>
        </svg>
      )
    },
    {
      href: '/documents',
      label: 'Documents',
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" style={{ width: '15px', height: '15px' }}>
          <rect x="3" y="2" width="10" height="12" rx="1"/>
          <path d="M6 6h4M6 9h4M6 12h2"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      width: '220px',
      minWidth: '220px',
      height: '100vh',
      background: '#0a0a0a',
      borderRight: '0.5px solid #181818',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0
    }}>
      {/* BRAND SECTION */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '0.5px solid #181818' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#00B4D8', letterSpacing: '-0.5px' }}>Clarix</div>
        <div style={{ fontSize: '9px', color: '#2a2a2a', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>ENTERPRISE SEARCH</div>
      </div>

      {/* NAV SECTION */}
      <div style={{ padding: '12px 10px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '9px', color: '#2a2a2a', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0 8px', marginBottom: '6px', marginTop: '4px' }}>
          NAVIGATION
        </div>
        
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 10px',
                borderRadius: '8px',
                fontSize: '13px',
                color: isActive ? '#00B4D8' : '#444444',
                background: isActive ? '#0d2535' : 'transparent',
                cursor: 'pointer',
                marginBottom: '2px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#111111';
                  e.currentTarget.style.color = '#888888';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#444444';
                }
              }}>
                <div style={{ display: 'flex', color: isActive ? '#00B4D8' : 'inherit' }}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        <div style={{ fontSize: '9px', color: '#2a2a2a', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0 8px', marginBottom: '6px', marginTop: '16px' }}>
          WORKSPACE
        </div>
        
        {workspaceItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 10px',
                borderRadius: '8px',
                fontSize: '13px',
                color: isActive ? '#00B4D8' : '#444444',
                background: isActive ? '#0d2535' : 'transparent',
                cursor: 'pointer',
                marginBottom: '2px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#111111';
                  e.currentTarget.style.color = '#888888';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#444444';
                }
              }}>
                <div style={{ display: 'flex', color: isActive ? '#00B4D8' : 'inherit' }}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* USER SECTION */}
      <div style={{ padding: '14px 10px', borderTop: '0.5px solid #181818', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 10px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background 0.15s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#111111'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: '#0d2535',
            border: '0.5px solid #1a4a5a',
            fontSize: '11px',
            fontWeight: 600,
            color: '#00B4D8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {getInitials(user.name)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#cccccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '10px', color: '#333333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Employee'} · {user.org_name || 'Workspace'}
            </div>
          </div>
        </div>

        <div onClick={logout} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          color: '#2a2a2a',
          cursor: 'pointer',
          marginTop: '4px',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#555555';
          e.currentTarget.style.background = '#0f0f0f';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#2a2a2a';
          e.currentTarget.style.background = 'transparent';
        }}>
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ width: '12px', height: '12px' }}>
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3 M10 11l4-3-4-3M14 8H6" />
          </svg>
          Log out
        </div>
      </div>
    </div>
  );
}
