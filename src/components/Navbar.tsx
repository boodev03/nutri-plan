import { IoCalendar, IoRestaurant } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { NutriPlanLogo } from "./icons/NutriPlanLogo";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NutriPlanLogo className="h-10 w-auto" showText={true} />
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <NavLink to="/suggest">
                {({ isActive }) => (
                  <div
                    className={`group inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                      isActive
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-2 py-2">
                      <IoRestaurant
                        className={`w-5 h-5 transform transition-all duration-200 ${
                          isActive
                            ? "text-blue-600 scale-110"
                            : "text-gray-400 group-hover:text-gray-500 group-hover:scale-105"
                        }`}
                      />
                      <span
                        className={`transform transition-all duration-200 ${
                          isActive
                            ? "translate-x-1"
                            : "group-hover:translate-x-1"
                        }`}
                      >
                        Suggest Goals
                      </span>
                    </div>
                  </div>
                )}
              </NavLink>

              <NavLink to="/calendar">
                {({ isActive }) => (
                  <div
                    className={`group inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                      isActive
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-2 py-2">
                      <IoCalendar
                        className={`w-5 h-5 transform transition-all duration-200 ${
                          isActive
                            ? "text-blue-600 scale-110"
                            : "text-gray-400 group-hover:text-gray-500 group-hover:scale-105"
                        }`}
                      />
                      <span
                        className={`transform transition-all duration-200 ${
                          isActive
                            ? "translate-x-1"
                            : "group-hover:translate-x-1"
                        }`}
                      >
                        Meal Calendar
                      </span>
                    </div>
                  </div>
                )}
              </NavLink>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserMenu user={user} onSignOut={signOut} />
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <div className="flex space-x-4 py-3">
            <NavLink to="/suggest">
              {({ isActive }) => (
                <div
                  className={`flex-1 group flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <IoRestaurant className="w-5 h-5 mr-2" />
                  Suggest Goals
                </div>
              )}
            </NavLink>

            <NavLink to="/calendar">
              {({ isActive }) => (
                <div
                  className={`flex-1 group flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <IoCalendar className="w-5 h-5 mr-2" />
                  Meal Calendar
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
