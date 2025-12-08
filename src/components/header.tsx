import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          APG
        </Link>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <Link href="/program" className="header__link">
                Program
              </Link>
            </li>
            <li className="header__item">
              <Link href="/admissions" className="header__link">
                Admissions
              </Link>
            </li>
            <li className="header__item">
              <Link href="/fleet" className="header__link">
                Fleet
              </Link>
            </li>
            <li className="header__item">
              <Link href="/careers" className="header__link">
                Careers
              </Link>
            </li>
            <li className="header__item">
              <Link href="/testimonials" className="header__link">
                Testimonials
              </Link>
            </li>
            <li className="header__item">
              <Link href="/contact" className="header__link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}