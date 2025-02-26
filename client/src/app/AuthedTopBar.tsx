import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  onMenuIconClick: () => void;
}

function AuthedTopBar({ onMenuIconClick }: Props) {
  return (
    <>
      <nav className="bg-sky-800 py-4 px-4">
        <div>
          <FontAwesomeIcon
            icon={faBars}
            onClick={onMenuIconClick}
            className="text-white text-xl cursor-pointer"
          />
        </div>
      </nav>
    </>
  );
}

export default AuthedTopBar;
