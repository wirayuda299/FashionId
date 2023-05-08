import { NavLink } from "react-router-dom"
import { footerNav } from "../../data/FooterLinks"

const FooterLinks = () => {
  return (
    <div className='flex w-full h-full flex-wrap justify-between mx-auto'>
      {footerNav.map(item => (
        <div key={item.title}>
          <h3 className='text-base sm:text-lg sm:font-semibold uppercase pb-5 '>{item.title}</h3>
          <ul className='list-none '>
            {item.links.map(link => (
              <li key={link.id} className='py-2 px-0 text-sm '>
                <NavLink
                  to={link?.url}
                  className='text-white no-underline transition-all hover:text-[#ffef5eff]'>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
export default FooterLinks