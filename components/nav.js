import React from 'react'
import Link from 'next/link'

const links = [
  { href: '/ideas', label: 'Ideas' },
  { href: 'https://github.com/albertlauncher/albert', label: 'Github'}
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper purple">
            <Link prefetch href="/">
              <a className="brand-logo left" style={{paddingLeft:"10px"}}>Alberthub</a>
            </Link>
            <ul className="right">
                {links.map(({ key, href, label }) => (
                  <li key={key}>
                    <Link href={href}>
                      <a>{label}</a>
                    </Link>
                  </li>
                ))}
            </ul>
        </div>
      </nav>
    )
  }
}