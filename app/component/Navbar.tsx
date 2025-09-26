// app/component/Navbar.tsx
import { useEffect, useMemo, useState, useCallback, Fragment, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Info, Phone, Smartphone, LayoutDashboard, LogOut, Menu,
  X, ChevronLeft, ChevronRight, ChevronDown, User as UserIcon, Code2,
  Wrench, Briefcase, Github, BookOpen
} from "lucide-react";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../redux/slices/authSlice";
import useSocketConnection from "./useSocketconnection";
import { socket } from "../utils/socket";

type RootState = any;

const W_OPEN = 264;
const W_COLLAPSED = 76;
const LS_COLLAPSED = "sidebar:collapsed";

const NAV = [
  { path: "/", label: "Profile", icon: UserIcon, exact: true },
  { path: "/projects", label: "Projects", icon: Smartphone },
  { path: "/blog", label: "Blog", icon: BookOpen },
  { path: "/case-studies", label: "Case Studies", icon: Briefcase },
  { path: "/services", label: "Services", icon: Wrench },
  { path: "/contact", label: "Contact", icon: Phone },
  { path: "/help", label: "Help", icon: HelpCircle },
  { path: "/about", label: "About", icon: Info },
  { path: "/open-source", label: "Open Source", icon: Github },
];

function useMediaQuery(q: string) {
  const [m, setM] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(q).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = window.matchMedia(q);
    const on = () => setM(mm.matches);
    on();
    mm.addEventListener?.("change", on);
    return () => mm.removeEventListener?.("change", on);
  }, [q]);
  return m;
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((s: RootState) => s.auth);

  useSocketConnection(user?._id);
  useEffect(() => {
    if (!user) dispatch(fetchUser() as any);
  }, [dispatch, user]);
  useEffect(() => {
    if (user?._id) socket.emit("setUser", { userId: user._id });
  }, [user?._id]);

  const [dispatchUnread, setDispatchUnread] = useState(0);
  useEffect(() => {
    const onUnread = (e: any) => setDispatchUnread(e?.detail?.count ?? 0);
    window.addEventListener("dispatch:unread", onUnread as EventListener);
    return () =>
      window.removeEventListener("dispatch:unread", onUnread as EventListener);
  }, []);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(LS_COLLAPSED) === "1";
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_COLLAPSED, collapsed ? "1" : "0");
    }
  }, [collapsed]);

  const sideW = collapsed ? W_COLLAPSED : W_OPEN;
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isDesktop) document.body.style.paddingLeft = `${sideW}px`;
    else document.body.style.paddingLeft = "0px";
    return () => {
      document.body.style.paddingLeft = "0px";
    };
  }, [isDesktop, sideW]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setConfirmOpen(false);
        setProfileOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggleCollapsed = () => setCollapsed((v) => !v);
  const openDrawer = () => setDrawerOpen(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleLogout = useCallback(() => {
    dispatch(logout() as any);
    setConfirmOpen(false);
    setDrawerOpen(false);
    window.location.assign("/");
  }, [dispatch]);

  const [profileOpen, setProfileOpen] = useState(false);

  // Single ref used for whichever user menu is currently mounted (desktop/mobile)
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [userMenuOpen]);

  /** ---------- UI helpers ---------- */
  const rowBase =
    "group relative flex items-center rounded-xl px-2 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500";
  const rowActive =
    "bg-gradient-to-r from-cyan-600 to-emerald-500 text-white shadow-[0_6px_16px_rgba(0,201,255,.25)]";
  const rowIdle = "text-slate-200 hover:bg-white/5 active:bg-white/10";

  const iconCapsuleActive = "grid h-8 w-8 place-items-center rounded-lg bg-white/20 text-white";
  const iconCapsuleIdle = "grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-slate-200 group-hover:bg-white/15";

  const labelClsActive = "truncate text-[13px] font-semibold";
  const labelClsIdle = "truncate text-[13px] font-medium";

  const DispatchBadge = useMemo(
    () =>
      dispatchUnread > 0 ? (
        <motion.span
          key={dispatchUnread}
          initial={{ scale: 0, y: -2 }}
          animate={{ scale: 1, y: 0 }}
          className="ml-auto inline-flex min-w-[20px] px-1.5 h-5 rounded-full bg-cyan-600 text-white text-[11px] leading-5 justify-center font-semibold"
        >
          {dispatchUnread > 99 ? "99+" : dispatchUnread}
        </motion.span>
      ) : null,
    [dispatchUnread]
  );

  const Avatar = () =>
    user?.photo ? (
      <img
        src={user.photo}
        alt="User"
        className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
      />
    ) : (
      <div className="h-8 w-8 rounded-full grid place-items-center bg-white/10 text-slate-200 ring-1 ring-white/10">
        <UserIcon size={16} />
      </div>
    );

  function AvatarButton({
    onClick,
    title = "Account",
  }: { onClick: () => void; title?: string }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-label={title}
        title={title}
      >
        <Avatar />
        {/* Neat chevron that never blocks pointer events */}
        <span className="pointer-events-none absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 grid h-4 w-4 place-items-center rounded-full bg-black/70 ring-1 ring-white/10 shadow">
          <ChevronDown className="h-3 w-3 text-slate-200" />
        </span>
      </button>
    );
  }

  /** ---------- Auth loading ---------- */
  const authLoading =
    loading === true || loading === "loading" || loading === "pending";
  const [booting, setBooting] = useState(true);
  useEffect(() => setBooting(false), []);
  const showAuthSpinner = !user && (authLoading || booting);

  function LoadingAuthBlock({ compact = false }: { compact?: boolean }) {
    return (
      <>
        <div className="h-px my-2 bg-white/10" />
        <div className={`${rowBase} bg-white/5 ring-1 ring-white/10`}>
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
          </div>
          {!compact && (
            <span className="ml-2 truncate text-[13px] font-medium text-slate-200">
              Checking account…
            </span>
          )}
        </div>
      </>
    );
  }

  function SidebarInner({
    compact = false,
    onNavigate,
  }: { compact?: boolean; onNavigate?: () => void }) {
    return (
      <div className="relative flex h-full flex-col overflow-visible">
        {/* Subtle background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
        </div>

        {/* Brand */}
        <div className="px-3 pt-3 pb-2 text-white relative z-10">
          <Link to="/" onClick={onNavigate} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 transition">
            <div className="relative h-9 w-9 rounded-xl bg-white/5 shadow ring-1 ring-white/10 grid place-items-center">
              <Code2 className="h-5 w-5 text-cyan-400" />
            </div>
            {!compact && (
              <div className="min-w-0">
                <div className="text-[15px] font-bold text-white">LA • Portfolio</div>
                <div className="text-[11px] text-white/70 -mt-0.5">Full-Stack • DevOps • ML</div>
              </div>
            )}
          </Link>
        </div>

        <div className={`${compact ? "" : "ml-2"} my-1 h-px bg-white/10`} />

        {/* Nav */}
        <div className="px-3 py-2 flex-1 overflow-y-auto relative z-10">
          {NAV.map(({ path, label, icon: Icon, exact }, idx) => (
            <Fragment key={path}>
              <NavLink to={path} end={exact} onClick={onNavigate}>
                {({ isActive }) => (
                  <motion.div
                    className={`${rowBase} ${isActive ? rowActive : rowIdle}`}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <AnimatePresence>
                      {isActive && !compact && (
                        <motion.span
                          layoutId="active-bar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] rounded bg-white/70"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className={isActive ? iconCapsuleActive : iconCapsuleIdle}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {!compact && (
                      <>
                        <span className={`ml-2 ${isActive ? labelClsActive : labelClsIdle}`}>
                          {label}
                        </span>
                        {path === "/" && (isActive
                          ? dispatchUnread > 0 && (
                              <span className="ml-auto inline-flex min-w-[20px] px-1.5 h-5 rounded-full bg-white/20 text-white text-[11px] leading-5 justify-center font-semibold">
                                {dispatchUnread > 99 ? "99+" : dispatchUnread}
                              </span>
                            )
                          : DispatchBadge)}
                      </>
                    )}
                  </motion.div>
                )}
              </NavLink>

              {idx < NAV.length - 1 && (
                <div className={`${compact ? "" : "ml-2"} my-1 h-px bg-white/10`} />
              )}
            </Fragment>
          ))}

          {/* Auth area */}
          {showAuthSpinner ?  <LoadingAuthBlock compact={compact} /> : null }
           
            
        </div>

        {/* Footer / Account (overflow-visible so menus can pop OUTSIDE) */}
        <div className="mt-auto px-3 py-3 border-t border-white/10 bg-gradient-to-r from-gray-950/50 to-gray-900/50 relative z-20 overflow-visible">
          {user ? (
            <>
              {/* EXPANDED (desktop) */}
              {!compact && (
                <div className="flex items-center gap-2">
                  <div ref={userMenuRef} className="relative">
                    <AvatarButton onClick={() => setUserMenuOpen((v) => !v)} />
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 28 }}
                          className="absolute bottom-10 left-0 w-48 rounded-lg bg-gray-900 text-white ring-1 ring-white/10 shadow-xl overflow-hidden z-[100]"
                        >
                          <button
                            onClick={() => {
                              setProfileOpen(true);
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                          >
                            View Profile
                          </button>
                          <div className="h-px bg-white/10" />
                          <button
                            onClick={() => {
                              setConfirmOpen(true);
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                          >
                            Sign out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Name & email never shrink the avatar */}
                  <div className="min-w-0 cursor-pointer" onClick={() => setProfileOpen(true)} title="View profile">
                    <div className="text-[13px] font-semibold text-white truncate">
                      {user.displayName || user.username || user.email || "Account"}
                    </div>
                    {user.email && (
                      <div className="text-[11px] text-slate-300 truncate">{user.email}</div>
                    )}
                  </div>

                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="ml-auto grid place-items-center rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20"
                    title="Sign out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              )}

              {/* COMPACT (collapsed) — avatar centered, menu pops OUTSIDE right */}
              {compact && (
                <div className="relative flex items-center justify-center overflow-visible">
                  <div ref={userMenuRef} className="relative overflow-visible">
                    <AvatarButton onClick={() => setUserMenuOpen((v) => !v)} />
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 28 }}
                          // pop to the RIGHT of the collapsed rail; never overlaps avatar
                          className="absolute left-[calc(100%+8px)] bottom-0 w-56 rounded-lg bg-gray-900 text-white ring-1 ring-white/10 shadow-2xl overflow-hidden z-[200]"
                        >
                          <div className="px-3 py-2 border-b border-white/10">
                            <div className="text-[13px] font-semibold truncate">
                              {user.displayName || user.username || "Account"}
                            </div>
                            {user.email && (
                              <div className="text-[11px] text-slate-300 truncate">{user.email}</div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setProfileOpen(true);
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                          >
                            View Profile
                          </button>
                          <div className="h-px bg-white/10" />
                          <button
                            onClick={() => {
                              setConfirmOpen(true);
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                          >
                            Sign out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </>
          ) : (
            !compact && (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-cyan-600/90 px-3 py-1.5 text-sm font-semibold text-white hover:bg-cyan-600"
                >
                  Sign up
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top bar (MOBILE) */}
      <div className="lg:hidden fixed z-40 top-0 inset-x-0 h-14 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur border-b border-white/10 flex items-center justify-between px-3">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
        </div>

        <button
          onClick={openDrawer}
          className="grid h-10 w-10 place-items-center rounded-lg hover:bg-white/10 active:scale-95 text-slate-200"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Code2 className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-bold text-white">RN • Portfolio</div>
            <div className="text-[11px] text-white/70 -mt-0.5">Full-Stack • DevOps • ML</div>
          </div>
        </Link>

        <div className="flex items-center gap-2" ref={userMenuRef}>
          {user ? (
            <div className="relative">
              <AvatarButton onClick={() => setUserMenuOpen((v) => !v)} />
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute right-0 mt-2 w-44 rounded-lg bg-gray-900 text-white ring-1 ring-white/10 shadow-xl overflow-hidden z-[100]"
                  >
                    <button
                      onClick={() => {
                        setProfileOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-white/10"
                    >
                      View Profile
                    </button>
                    <div className="h-px bg-white/10" />
                    <button
                      onClick={() => {
                        setConfirmOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/10"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-cyan-600/90 px-2.5 py-1 text-xs font-semibold text-white hover:bg-cyan-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Desktop sidebar */}
      <motion.aside
        className="hidden lg:block fixed z-40 left-0 top-0 h-screen bg-gradient-to-b from-gray-950 to-gray-900 border-r border-white/10 shadow-[0_0_40px_rgba(0,0,0,.35)] overflow-visible"
        animate={{ width: collapsed ? W_COLLAPSED : W_OPEN }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className="relative h-full overflow-visible">
          <SidebarInner compact={collapsed} />
          <button
            onClick={toggleCollapsed}
            className="absolute -right-3 top-14 z-50 grid h-6 w-6 place-items-center rounded-full bg-gray-900 text-slate-200 border border-white/10 shadow hover:bg-gray-800"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed z-[60] left-0 top-0 h-screen w-[88%] max-w-[340px] bg-gradient-to-b from-gray-950 to-gray-900 border-r border-white/10 shadow-xl text-white"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              role="dialog"
              aria-modal="true"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              <div className="h-px mx-3 my-2 bg-white/10" />
              <div className="h-[calc(100%-56px)] pb-[env(safe-area-inset-bottom)]">
                <SidebarInner compact={false} onNavigate={() => setDrawerOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Profile modal */}
      <AnimatePresence>
        {profileOpen && user && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/50 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProfileOpen(false)}
          >
            <motion.div
              className="mx-4 w-full max-w-md rounded-xl bg-gray-900 text-white p-5 shadow-2xl ring-1 ring-white/10"
              initial={{ scale: 0.95, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-title"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.photo || ""}
                  alt="Profile"
                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/10 bg-white/5"
                  onError={(e: any) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
                <div className="min-w-0">
                  <h3 id="profile-title" className="text-lg font-bold text-white truncate">
                    {user.displayName || user.username || "Account"}
                  </h3>
                  <div className="text-[12px] text-slate-300 truncate">{user.email}</div>
                </div>
              </div>

              <div className="grid gap-2">
                {user.username && <DetailRow label="Username" value={user.username} />}
                {user.role && <DetailRow label="Role" value={String(user.role)} />}
                {user.phone && <DetailRow label="Phone" value={user.phone} />}
                {user._id && <DetailRow label="User ID" value={user._id} mono />}
                {user.createdAt && (
                  <DetailRow label="Joined" value={new Date(user.createdAt).toLocaleString()} />
                )}
                {user.lastLogin && (
                  <DetailRow label="Last Login" value={new Date(user.lastLogin).toLocaleString()} />
                )}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout confirm */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/50 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmOpen(false)}
          >
            <motion.div
              className="mx-4 w-full max-w-sm rounded-xl bg-gray-900 text-white p-5 shadow-2xl ring-1 ring-white/10"
              initial={{ scale: 0.95, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-title"
            >
              <h3 id="logout-title" className="text-lg font-bold text-white mb-2">Sign out?</h3>
              <p className="text-sm text-slate-300 mb-4">You can sign back in anytime.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Sign out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Small helper for profile rows */
function DetailRow({ label, value, mono = false }: { label: string; value: any; mono?: boolean }) {
  if (value == null || value === "") return null;
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
      <div className="w-28 shrink-0 text-[12px] font-semibold text-slate-300">{label}</div>
      <div className={`text-sm text-white break-all ${mono ? "font-mono" : ""}`}>{String(value)}</div>
    </div>
  );
}
