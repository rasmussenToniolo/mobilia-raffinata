interface NavbarProps {
  selectedEl: string;
  setSelectedEl: (el: string) => void;
}

export function Navbar(props: NavbarProps) {

  return (
    <div className="navbar">
      <ul className="navbar__list">
        <li onClick={() => props.setSelectedEl('home')} className={`navbar__list--item ${props.selectedEl === 'home' ? 'selected' : ''}`}>Home</li>
        <li onClick={() => props.setSelectedEl('about')} className={`navbar__list--item ${props.selectedEl === 'about' ? 'selected' : ''}`}>About</li>
        <li onClick={() => props.setSelectedEl('products')}  className={`navbar__list--item ${props.selectedEl === 'products' ? 'selected' : ''}`}>Products</li>
        <li onClick={() => props.setSelectedEl('contact')}  className={`navbar__list--item ${props.selectedEl === 'contact' ? 'selected' : ''}`}>Contact</li>
      </ul>
    </div>
  )
}
