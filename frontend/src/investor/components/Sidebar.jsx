import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaRegMoneyBillAlt,
  FaFileContract,
  FaChevronDown,
  FaCog,
  FaChartLine,
  FaProjectDiagram,
  FaHandshake,
} from "react-icons/fa";
import { MdInsights, MdOutlineExplore } from "react-icons/md";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } ${variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-sm"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <NavLink end to="/" className="font-bold text-xl block">
            Innoventures
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" ||
                  pathname.includes("dashboard") ||
                  pathname.includes("activity") ||
                  pathname.includes("investor") ||
                  pathname.includes("investment-portfolio")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname === "/" || pathname.includes("dashboard")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className={`shrink-0 fill-current ${pathname === "/" ||
                                  pathname.includes("dashboard") ||
                                  pathname.includes("investment-portfolio")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                                }`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                              <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                                }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/investor/dashboard"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Overview & Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/investor/investment-portfolio"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Investment Portfolio
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Explore Startups */}
              <SidebarLinkGroup
                activecondition={
                  pathname.includes("my-projects") ||
                  pathname.includes("featured-startups") ||
                  pathname.includes("recommended-startups") ||
                  pathname.includes("fydp-projects")
                }
              >
                {(handleClick, open) => (
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("my-projects")
                          ? ""
                          : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MdOutlineExplore
                            className={`shrink-0 fill-current ${pathname.includes("my-projects")
                                ? "text-violet-500"
                                : "text-gray-400 dark:text-gray-500"
                              }`}
                          />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Explore Startups
                          </span>
                        </div>
                        <div className="flex shrink-0 ml-2">
                          <FaChevronDown
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                              }`}
                          />
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/investor/recommended-startups"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " +
                              (isActive
                                ? "text-violet-500"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium">
                              Recommended Startups
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/investor/fydp-projects"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " +
                              (isActive
                                ? "text-violet-500"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium">FYDP Projects</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Send Proposals */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${pathname.includes("send-proposals")
                    ? "bg-gray-100 dark:bg-gray-700/50"
                    : ""
                  }`}
              >
                <NavLink
                  end
                  to="/investor/send-proposals"
                  className={({ isActive }) =>
                    `block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${isActive
                      ? "text-violet-500"
                      : "hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  <div className="flex items-center">
                    <FaHandshake
                      className={`shrink-0 ${pathname.includes("send-proposals")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                        }`}
                    />
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Send Proposals
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Investment Insights */}
              <SidebarLinkGroup activecondition={pathname.includes("investor-engagement")}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("investor-engagement")
                          ? ""
                          : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MdInsights
                            className={`shrink-0 ${pathname.includes("investor-engagement")
                                ? "text-violet-500"
                                : "text-gray-400 dark:text-gray-500"
                              }`}
                          />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Investment Insights
                          </span>
                        </div>
                        <div className="flex shrink-0 ml-2">
                          <FaChevronDown
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                              }`}
                          />
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>

                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/investor/active-projects"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " +
                              (isActive
                                ? "text-violet-500"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium">Active Projects</span>
                          </NavLink>
                        </li>
         
                      </ul>
                    </div>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/investor/financial-reports"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " +
                              (isActive
                                ? "text-violet-500"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium">Financial Reports</span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/investor/analysis"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " +
                              (isActive
                                ? "text-violet-500"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium">Market Analysis</span>
                          </NavLink>
                        </li>
    
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Smart Contracts */}
              <SidebarLinkGroup activecondition={pathname.includes("smart-contracts")}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("smart-contracts")
                          ? ""
                          : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaFileContract
                            className={`shrink-0 ${pathname.includes("smart-contracts")
                                ? "text-violet-500"
                                : "text-gray-400 dark:text-gray-500"
                              }`}
                          />
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Smart Contracts
                          </span>
                        </div>
                        <div className="flex shrink-0 ml-2">
                          <FaChevronDown
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                              }`}
                          />
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/investor/contracts"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " +
                              (isActive
                                ? "text-violet-500"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium">My Contracts</span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">

                        </li>
                        <li className="mb-1 last:mb-0">

                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Account Settings */}
             

              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("settings")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaCog
                              className={`shrink-0 fill-current ${pathname.includes("settings")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                                }`}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Account Settings
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <FaChevronDown
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                                }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/investor/general"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                General Settings
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/investor/security"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Security Settings
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/investor/notifications"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Notifications
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("settings")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaCog
                              className={`shrink-0 fill-current ${pathname.includes("settings")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                                }`}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Milestones
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <FaChevronDown
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                                }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li>
                            <NavLink
                              end
                              to="/investor/milestones"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Milestones
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;