import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSidebar } from '../ui/sidebar';
import { UserAvatar } from '../ui/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/useLogout';

interface Props {
  onSignOut: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

function AuthedTopBar({ onSignOut, userName, userEmail, userAvatar }: Props) {
  const { toggleSidebar } = useSidebar();
  const logout = useLogout();

  return (
    <>
      <nav className="w-full bg-primary flex justify-between items-center py-2 px-4">
        <div>
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={faBars}
              className="text-white text-xl cursor-pointer"
            />
          </button>
        </div>
        <div>
          <DropdownMenu defaultOpen={false}>
            <DropdownMenuTrigger asChild>
              <div className="text-light text-xs flex items-center cursor-pointer">
                <div className="mr-2">
                  <UserAvatar image="" userName={userName} />
                </div>
                <div className="text-background">
                  <div>{userName}</div>
                  <div>{userEmail}</div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

export default AuthedTopBar;
