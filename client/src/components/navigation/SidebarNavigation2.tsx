import {
  faChartLine,
  faUsers,
  faXRay,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';

type Props = {
  open: boolean;
  onClickBackground: () => void;
  onMenuItemClick: () => void;
};

function SidebarNavigation({
  open = false,
  onClickBackground,
  onMenuItemClick,
}: Props) {
  const transitionDuration = '4000';

  return (
    <>
      <div
        className={`w-full h-full z-100 fixed top-0 bg-white/40 transition duration-${transitionDuration} ${
          open ? `pointer-events-auto` : `pointer-events-none opacity-0`
        }`}
        onClick={onClickBackground}
      >
        <aside
          className={`flex flex-col w-96 h-screen px-5 py-8 overflow-y-auto bg-zinc-100 border-zinc-300 border-r rtl:border-r-0 rtl:border-l dark:bg-zinc-900 dark:border-zinc-700 absolute top-0 transition-all duration-${transitionDuration} ${
            open ? 'left-0' : '-left-96'
          }`}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <a href="#"></a>

          <div className="flex flex-col justify-between flex-1">
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                <label className="block px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">
                  analytics
                </label>
                <MenuItem
                  icon={faChartLine}
                  label="Dashboard"
                  route="/dashboard"
                  onClick={onMenuItemClick}
                />
              </div>

              <div className="space-y-3 ">
                <label className="block px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">
                  Studies
                </label>
                <MenuItem
                  icon={faXRay}
                  label="Radiology"
                  route="/radiology"
                  onClick={onMenuItemClick}
                />
              </div>

              <div className="space-y-3 ">
                <label className="block px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">
                  Management
                </label>
                <MenuItem
                  icon={faUsers}
                  label="Users"
                  route="/users"
                  onClick={onMenuItemClick}
                />
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SidebarNavigation;
