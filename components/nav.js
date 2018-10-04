import React from 'react'
import Link from 'next/link'

const links = [
  // { href: 'https://github.com/albertlauncher/albert', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <div className="nav-wrapper purple">
        <Link prefetch href="/">
          <a className="brand-logo center">Alberthub</a>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            {links.map(({ key, href, label }) => (
              <li key={key}>
                <Link href={href}>
                  <a>{label}</a>
                </Link>
              </li>
            ))}
          </li>
        </ul>
    </div>
  </nav>
)

export default Nav
