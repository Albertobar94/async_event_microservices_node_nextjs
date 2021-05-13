import React from 'react';
import Link from "next/link";

interface Props {
  currentUser: {
    id: string;
    email: string;
  } | undefined;
};

const Header = ({ currentUser }: Props) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ].filter(t => t);

  return (
    <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Link href="/">
          <a>Hi Puto!</a>
        </Link>
        {currentUser
        ? (
          <ul>
            {links.map(link => {
              return (
                link &&
                <li key={link.label} style={{
                  listStyle: 'none'
                }}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              )
            })}
          </ul>
        )
        : (
          <ul>
            {links.map(link => {
              return (
                link &&
                <li key={link.label} style={{
                  listStyle: 'none'
                }}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              )
            })}
          </ul>
        )
      }
      </nav>
  )
}

export default Header
