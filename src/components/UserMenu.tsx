import { User } from "@supabase/supabase-js";
import React from "react";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

interface UserMenuProps {
  user: User | null;
  onSignOut: () => void;
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <HiOutlineUser className="w-5 h-5" />
        <span className="hidden sm:inline-block">{user?.email}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <HiOutlineLogout className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
