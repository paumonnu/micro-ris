import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router';

interface Props {
  route: string;
  label: string;
  icon: IconProp;
  onClick?: () => void;
}

function MenuItem({ icon, route, onClick = () => {}, label }: Props) {
  return (
    <>
      <NavLink
        to={route}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700 ${
            isActive ? 'bg-zinc-200' : ''
          }`
        }
      >
        <FontAwesomeIcon className="w-6 h-6" icon={icon} />
        <span className="mx-2 text-sm font-medium">{label}</span>
      </NavLink>
    </>
  );
}

export default MenuItem;
