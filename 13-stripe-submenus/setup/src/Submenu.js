import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'


const Submenu = () => {
  const { isSubmenuOpen, location, page: { page, links } } = useGlobalContext();
  const container = useRef(null);
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    setColumns(2);

    const submenu = container.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) setColumns(3);
    if (links.length > 3) setColumns(4);

  }, [location, links])
  return (
    <aside className={`submenu ${isSubmenuOpen && 'show'}`} ref={container}>
      <h4>{page}</h4>
      <div className={`submenu-center col-${columns}`}>
        {
          links.map((link, index) => {
            const { label, icon, url } = link;
            return (
              <a href={url} key={index}>{icon}{label}</a>
            )
          })
        }
      </div>
    </aside>
  )
}

export default Submenu
