// src/pages/PoliceChat.jsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { socket } from '../utils/socket';
import {
  Check, CheckCheck, Paperclip, Send, ExternalLink, CheckCircle,
  Navigation2, Shield, Phone, Mail
} from 'lucide-react';

/** =========================
 * Config
 * ========================= */
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.s3rhub.com';
const NAVBAR_H = 0;

/** =========================
 * Safe localStorage helpers (SSR-safe)
 * ========================= */
const hasWindow = typeof window !== 'undefined';
const lsGet = (k) => { try { return hasWindow ? window.localStorage.getItem(k) : null; } catch { return null; } };
const lsRemove = (k) => { try { if (hasWindow) window.localStorage.removeItem(k); } catch { } };

/** ========================= */
const STORAGE_KEYS = {
  active: 'activeDispatch',
  roomId: 'roomId',
  userId: 'userId',
  policeId: 'policeId',
  userLocation: 'userLocation',
  frontlineLocation: 'frontlineLocation', // parity with DispatchRequest
};

// after STORAGE_KEYS
const DISPATCH_LIST_KEY = 'dispatchList';

const clearDispatchStorage = () => {
  try {
    lsRemove(DISPATCH_LIST_KEY); // wipe the list of dispatches
    Object.values(STORAGE_KEYS).forEach((k) => lsRemove(k)); // wipe legacy keys
  } catch {}
};

/** --- Distance/ETA utils --- */
const toRad = (d) => (d * Math.PI) / 180;
function haversineMeters(a, b) {
  if (!a || !b || a.lat == null || a.lon == null || b.lat == null || b.lon == null) return null;
  const R = 6371008.8, dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon), la1 = toRad(a.lat), la2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
const metersToKm = (m) => m / 1000;
const metersToMiles = (m) => m * 0.000621371;
const formatMeters = (m) => m == null ? '—' : (m < 1000 ? `${Math.round(m)} m` : `${metersToKm(m).toFixed(m < 1e4 ? 2 : 1)} km`);
const formatMiles = (m) => m == null ? '—' : (metersToMiles(m) < 10 ? `${metersToMiles(m).toFixed(2)} mi` : `${metersToMiles(m).toFixed(1)} mi`);
function formatDurationSeconds(s) {
  if (s == null || !isFinite(s) || s <= 0) return '—';
  if (s < 60) return `${Math.ceil(s)}s`;
  const m = Math.floor(s / 60), rs = Math.round(s % 60);
  if (m < 60) return rs ? `${m}m ${rs}s` : `${m}m`;
  const h = Math.floor(m / 60), rm = m % 60; return rm ? `${h}h ${rm}m` : `${h}h`;
}

/** =========================
 * URL query parsing (Router-agnostic, SSR-safe)
 * ========================= */
function parseLocationParam(raw) {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw);
    if (v && typeof v === 'object') {
      const lat = v.lat ?? v.latitude;
      const lon = v.lon ?? v.longitude;
      if ([lat, lon].every((n) => Number.isFinite(Number(n)))) {
        return { lat: Number(lat), lon: Number(lon) };
      }
    }
  } catch {}
  const parts = String(raw).split(',').map(Number);
  if (parts.length === 2 && parts.every(Number.isFinite)) return { lat: parts[0], lon: parts[1] };
  return null;
}

function getQueryParams() {
  if (!hasWindow) return {};
  try {
    const url = new URL(window.location.href);
    const p = url.searchParams;
    return {
      roomId: p.get('roomId') || null,
      userId: p.get('userId') || null,
      userLocation: parseLocationParam(p.get('userLocation')),
      frontlineLocation: parseLocationParam(p.get('frontlineLocation')),
    };
  } catch { return {}; }
}

/** Background location singleton */
function ensureBgService() {
  if (!hasWindow) return null;
  if (window.__policeBG) return window.__policeBG;
  const svc = {
    watchId: null,
    intervalId: null,
    last: null,
    lastSentAt: 0,
    roomId: null,
    policeId: null,
    running: false,
    subscribers: new Set(),
    subscribe(fn) { this.subscribers.add(fn); return () => this.subscribers.delete(fn); },
    _notify() { this.subscribers.forEach(fn => { try { fn(this.last); } catch { } }); },
    start({ roomId, policeId }) {
      if (!('geolocation' in navigator)) return console.warn('Geolocation not available.');
      if (this.running && this.roomId === roomId) return;
      this.roomId = roomId; this.policeId = policeId; this.running = true;
      const opts = { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 };
      try {
        this.watchId = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude, heading, speed, accuracy } = pos.coords || {};
            this.last = {
              lat: latitude, lon: longitude,
              heading: heading ?? null,
              speed: typeof speed === 'number' ? speed : null,
              accuracy: accuracy ?? null,
              ts: Date.now()
            };
            this._notify();
          },
          (e) => console.warn('watchPosition error:', e),
          opts
        );
      } catch (e) { console.warn('Failed to start watchPosition:', e); }
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude, heading, speed, accuracy } = pos.coords || {};
            this.last = {
              lat: latitude, lon: longitude,
              heading: heading ?? null,
              speed: typeof speed === 'number' ? speed : null,
              accuracy: accuracy ?? null,
              ts: Date.now()
            };
            this._notify(); this._emit();
          },
          (e) => console.warn('getCurrentPosition error:', e),
          opts
        );
      } catch (e) { console.warn('Failed to getCurrentPosition:', e); }
      this.intervalId = window.setInterval(() => this._emit(), 60_000);
      document.addEventListener('visibilitychange', this._onVisibility, false);
    },
    _onVisibility() { /* hook for future throttling */ },
    _emit() {
      if (!this.running || !this.last || !this.roomId) return;
      const now = Date.now(); if (now - this.lastSentAt < 5000) return; this.lastSentAt = now;
      socket.emit('policeLocationUpdate', {
        roomId: this.roomId,
        location: {
          latitude: this.last.lat,
          longitude: this.last.lon,
          heading: this.last.heading,
          speed: this.last.speed,
          accuracy: this.last.accuracy,
          timestamp: this.last.ts
        }
      });
    },
    stop() {
      this.running = false;
      try { if (this.watchId != null) navigator.geolocation.clearWatch(this.watchId); } catch { }
      if (this.intervalId != null) clearInterval(this.intervalId);
      document.removeEventListener('visibilitychange', this._onVisibility, false);
      this.watchId = null; this.intervalId = null; this.last = null; this.lastSentAt = 0; this.roomId = null; this.policeId = null;
    }
  };
  window.__policeBG = svc; return svc;
}

/** Simple redirect helper */
function goHome() {
  if (hasWindow) window.location.assign('/');
}

export default function PoliceChat() {
  const { user: police } = useSelector((s) => s.auth);

  // Query params (router-agnostic) + legacy fallbacks
  const qp = getQueryParams();
  const roomId = qp.roomId || lsGet(STORAGE_KEYS.roomId);
  const passedUserId = qp.userId || lsGet(STORAGE_KEYS.userId);
  const userLocation = qp.userLocation || tryParse(lsGet(STORAGE_KEYS.userLocation));
  const initialFrontlineLoc = qp.frontlineLocation || tryParse(lsGet(STORAGE_KEYS.frontlineLocation));
  const policeId = police?._id || lsGet(STORAGE_KEYS.policeId) || null;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [otherTyping, setOtherTyping] = useState(false);
  const [resolveModal, setResolveModal] = useState({ open: false, by: '', roomId: '' });

  const [policePos, setPolicePos] = useState(() => {
    if (initialFrontlineLoc?.lat != null && initialFrontlineLoc?.lon != null) {
      return { lat: Number(initialFrontlineLoc.lat), lon: Number(initialFrontlineLoc.lon), ts: Date.now() };
    }
    return null;
  });

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [profilesById, setProfilesById] = useState({});

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  /** ============== CLEAR-ALL helper ============== */
  const clearAllDispatchClientStateAndExit = useCallback(() => {
    // Stop BG GPS
    ensureBgService()?.stop();

    // Clear LS
    clearDispatchStorage();

    // Clear in-memory UI state
    setMessages([]);
    setInput('');
    setOtherTyping(false);
    setProfile(null);
    setProfilesById({});
    setPolicePos(null);
    setResolveModal({ open: false, by: '', roomId: '' });

    // Go home
    goHome();
  }, []);

  // Notifications
  useEffect(() => {
    if (hasWindow && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => { });
    }
  }, []);

  // Guard (redirect if missing required params)
  useEffect(() => {
    if (!roomId || !policeId) goHome();
  }, [roomId, policeId]);

  // BG location
  useEffect(() => {
    if (!roomId || !policeId) return;
    const svc = ensureBgService(); svc?.start({ roomId, policeId });
    const unsub = svc?.subscribe((last) => setPolicePos(last || null));
    return () => { unsub && unsub(); };
  }, [roomId, policeId]);

  // Fetch chat counterparty user (header card)
  useEffect(() => {
    if (!passedUserId) return;
    let mounted = true;
    (async () => {
      try {
        setLoadingProfile(true);
        const { data } = await axios.post(`${API_BASE}/api/v1/user/by-id`, { userId: passedUserId });
        if (mounted && data?.success && data?.data) setProfile(data.data);
      } catch (e) { console.warn('Fetch user profile failed', e); }
      finally { mounted && setLoadingProfile(false); }
    })();
    return () => { mounted = false; };
  }, [passedUserId]);

  // helper: ensure a sender mini profile is cached (socket fetchUser)
  const ensureProfile = useCallback((userId) => {
    if (!userId) return;
    if (profilesById[userId]) return;

    socket.emit('fetchUser', { userId }, (res) => {
      if (res?.ok && res.user) {
        setProfilesById(prev => ({ ...prev, [userId]: res.user }));
      } else {
        setProfilesById(prev => ({
          ...prev,
          [userId]: { _id: userId, displayName: `User ${String(userId).slice(-4)}`, photo: null }
        }));
      }
    });
  }, [profilesById]);

  // Chat listeners
  useEffect(() => {
    const onChat = (msg) => {
      if (msg.roomId && msg.roomId !== roomId) return;

      const senderId = String(msg.senderId);
      if (!profilesById[senderId]) ensureProfile(senderId);

      const isFromOther = senderId !== String(policeId);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          senderId: senderId,
          message: msg.message,
          timestamp: msg.timestamp || new Date().toISOString(),
          delivered: true,
          seen: !isFromOther
        }
      ]);
      if (isFromOther) socket.emit('markAsSeen', { roomId, userId: policeId });
    };
    socket.on('chatMessage', onChat);
    return () => socket.off('chatMessage', onChat);
  }, [roomId, policeId, profilesById, ensureProfile]);

  useEffect(() => {
    const onSeen = ({ userId: seenBy, roomId: seenRoom }) => {
      if (seenRoom !== roomId) return;
      if (String(seenBy) === String(policeId)) return;
      setMessages((prev) => prev.map((m) => String(m.senderId) === String(policeId) ? { ...m, seen: true } : m));
    };
    socket.on('messagesSeen', onSeen);
    return () => socket.off('messagesSeen', onSeen);
  }, [roomId, policeId]);

  useEffect(() => {
    const handleTyping = ({ roomId: typingRoom, isTyping }) => {
      if (typingRoom !== roomId) return;
      setOtherTyping(!!isTyping);
    };
    socket.on('typing', handleTyping);
    return () => socket.off('typing', handleTyping);
  }, [roomId]);

  /** ====== CRITICAL: when resolved, clear everything and go home ====== */
  useEffect(() => {
    const onResolved = ({ by, roomId: resolvedRoomId }) => {
      if (resolvedRoomId && resolvedRoomId !== roomId) return;

      // Optional toast
      if (hasWindow && 'Notification' in window && Notification.permission === 'granted') {
        const n = new Notification('Dispatch Resolved', {
          body: `Room ${resolvedRoomId || roomId}${by ? ` • by ${by}` : ''}`,
          icon: '/favicon.ico',
          tag: `resolved-${resolvedRoomId || roomId}`,
          renotify: true
        });
        n.onclick = () => { window.focus(); n.close(); };
      }

      // Clear everything & exit immediately
      clearAllDispatchClientStateAndExit();
    };

    socket.on('dispatchResolved', onResolved);
    return () => socket.off('dispatchResolved', onResolved);
  }, [roomId, clearAllDispatchClientStateAndExit]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);

  const sendMessage = () => {
    const text = input.trim(); if (!text || !roomId || !policeId) return;
    socket.emit('chatMessage', { roomId, senderId: policeId, message: text });
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        senderId: policeId,
        message: text,
        timestamp: new Date().toISOString(),
        delivered: true,
        seen: false
      }
    ]);
    setInput('');
    socket.emit('typing', { roomId, senderId: policeId, isTyping: false });
    inputRef.current?.focus();
  };

  const onInputChange = (val) => {
    setInput(val);
    if (!roomId || !policeId) return;
    socket.emit('typing', { roomId, senderId: policeId, isTyping: true });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(
      () => socket.emit('typing', { roomId, senderId: policeId, isTyping: false }),
      900
    );
  };

  const mineBubble = 'self-end bg-amber-50 border border-amber-100 text-gray-900 rounded-tr-md';
  const otherBubble = 'self-start bg-white border border-gray-200 text-gray-900 rounded-tl-md';

  const userLat = userLocation?.lat ?? userLocation?.latitude ?? null;
  const userLon = userLocation?.lon ?? userLocation?.longitude ?? null;

  const distMeters = useMemo(() => {
    if (!policePos || userLat == null || userLon == null) return null;
    return haversineMeters(
      { lat: policePos.lat, lon: policePos.lon },
      { lat: Number(userLat), lon: Number(userLon) }
    );
  }, [policePos, userLat, userLon]);

  const etaSeconds = useMemo(() => {
    if (distMeters == null || !(policePos?.speed > 0.5)) return null;
    return distMeters / (policePos.speed || 1);
  }, [distMeters, policePos?.speed]);

  const openGMapsView = (lat, lon) => window.open(
    `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    '_blank', 'noopener,noreferrer'
  );
  const openGMapsGo = (lat, lon) => window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving&dir_action=navigate`,
    '_blank', 'noopener,noreferrer'
  );

  const initials = (name) => {
    if (!name) return 'U';
    const p = String(name).trim().split(/\s+/);
    return (p[0]?.[0] || 'U').toUpperCase() + (p[1]?.[0] || '').toUpperCase();
  };

  const handleClearStorage = () => {
    clearAllDispatchClientStateAndExit();
  };

  /** Message bubble with avatar + name */
  const MessageBubble = ({ m }) => {
    const mine = String(m.senderId) === String(policeId);
    const p = profilesById[m.senderId];
    const displayName = p?.displayName || p?.username || (mine ? 'You' : `User ${String(m.senderId).slice(-4)}`);
    const photo = p?.photo || null;

    return (
      <div className={['flex items-end gap-2', mine ? 'justify-end' : 'justify-start'].join(' ')}>
        {!mine ? (
          photo ? (
            <img src={photo} alt={displayName} className="h-8 w-8 rounded-lg object-cover ring-1 ring-amber-100" />
          ) : (
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-100">
              <span className="text-[10px] font-bold">{initials(displayName)}</span>
            </div>
          )
        ) : (
          <div className="h-8 w-8" />
        )}

        <div className="flex min-w-0 max-w-[78%] flex-col">
          <div className="mb-0.5 px-1 text-[11px] font-medium text-gray-600">{displayName}</div>
          <div className={['rounded-2xl px-3 py-2 shadow-sm transition-all duration-200', mine ? mineBubble : otherBubble].join(' ')}>
            <div className="whitespace-pre-wrap break-words text-[clamp(14px,3.2vw,16px)]">{m.message}</div>
            <div className="mt-1 flex items-center justify-end gap-1">
              <span className="text-[clamp(10px,2.6vw,12px)] text-gray-500">{fmtTime(m.timestamp)}</span>
              {mine ? (m.seen ? <CheckCheck className="h-4 w-4 text-amber-500" /> : <Check className="h-4 w-4 text-gray-400" />) : null}
            </div>
          </div>
        </div>

        {mine ? (
          photo ? <img alt="" src={photo} className="h-8 w-8 rounded-lg opacity-0" /> : <div className="h-8 w-8" />
        ) : (
          <div className="h-8 w-8" />
        )}
      </div>
    );
  };

  /** ====== S24 Ultra style (Light / White) ====== */
  return (
    <div
      className="min-h-[100dvh] w-full bg-[radial-gradient(1200px_600px_at_20%_-10%,#fde68a33_0,#ffffff_40%),linear-gradient(180deg,#fff,#fff)] grid place-items-center"
      style={{ ['--pad-top']: `${NAVBAR_H}px`, paddingTop: `calc(${NAVBAR_H}px + env(safe-area-inset-top, 0px))` }}
    >
      {/* Device shell */}
      <div className="relative mx-auto h-[calc(100dvh-24px-var(--pad-top,0px))] max-h-[880px] w-[min(420px,92vw)]">
        <div className="absolute inset-0 rounded-[36px] bg-neutral-200 shadow-[0_40px_80px_rgba(0,0,0,.20)]" />
        <div className="absolute inset-[6px] rounded-[32px] bg-neutral-50" />
        <div className="absolute left-1/2 top-[10px] -translate-x-1/2">
          <div className="h-3 w-3 rounded-full bg-neutral-300 ring-2 ring-neutral-400 shadow-inner" />
        </div>

        {/* Screen */}
        <div className="absolute inset-[8px] overflow-hidden rounded-[30px]">
          <div className="relative flex min-h-0 h-full w-full flex-col bg-gradient-to-br from-white via-white to-amber-50">
            {/* Header */}
            <div className="sticky top-0 z-20 px-3 pt-2">
              <div className="w-full rounded-2xl border border-amber-100 bg-white/90 p-3 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/75">
                <div className="flex items-center gap-3">
                  {profile?.photo ? (
                    <img
                      src={profile.photo}
                      alt={profile?.displayName || profile?.username || 'User'}
                      className="h-10 w-10 rounded-xl object-cover ring-1 ring-amber-100"
                    />
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                      <span className="text-[12px] font-bold">
                        {initials(profile?.displayName || profile?.username)}
                      </span>
                    </div>
                  )}

                  {/* Identity */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-semibold text-gray-900 text-[clamp(13px,3.4vw,15px)]">
                        {profile?.displayName || profile?.username || passedUserId || 'User'}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-[2px] text-[10px] font-semibold text-amber-700">
                        <Shield className="h-3 w-3" />
                        {profile?.role ?? 'user'}
                      </span>
                      {profile?.status && (
                        <span
                          className={[
                            'inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold border',
                            profile.status === 'online'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : profile.status === 'offline'
                              ? 'bg-orange-50 text-gray-700 border-orange-200'
                              : 'bg-gray-50 text-gray-600 border-gray-200',
                          ].join(' ')}
                        >
                          • {profile.status}
                        </span>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
                      {passedUserId && (
                        <span className="inline-flex items-center gap-1">
                          <Shield className="h-3 w-3 opacity-60" />
                          <span className="truncate">{passedUserId}</span>
                        </span>
                      )}
                      {profile?.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {profile.phone}
                        </span>
                      )}
                      {profile?.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {profile.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clear immediately if needed */}
                  <button
                    className="shrink-0 inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-700 transition hover:bg-red-100 active:scale-95"
                    onClick={handleClearStorage}
                    title="Clear and go home"
                  >
                    Clear Data
                  </button>

                  {/* Quick actions */}
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <button
                      className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-700 transition hover:bg-amber-100 active:scale-95"
                      onClick={() => userLat != null && userLon != null && openGMapsView(userLat, userLon)}
                      title="View in Google Maps"
                    >
                      View <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-95 active:scale-95"
                      onClick={() => userLat != null && userLon != null && openGMapsGo(userLat, userLon)}
                      title="Navigate"
                    >
                      Go <Navigation2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="px-1 pt-1 text-[10px] text-gray-500">
                  Live police location is sent every <b>60s</b>
                  {policePos?.accuracy != null && <> · GPS accuracy: ~{Math.round(policePos.accuracy)} m</>}
                  {distMeters != null && <> · Distance: {formatMeters(distMeters)} ({formatMiles(distMeters)})</>}
                  {etaSeconds != null && <> · ETA: {formatDurationSeconds(etaSeconds)}</>}
                </div>

                {loadingProfile && <div className="mt-2 text-[11px] text-amber-600">Loading user details…</div>}
              </div>
            </div>

            {/* Messages area — the ONLY scroller */}
            <div className="relative flex-1 min-h-0 px-3 pb-2 pt-2">
              <div className="relative z-[1] flex h-full min-h-0 w-full flex-col rounded-[20px] bg-white shadow-[inset_0_0_24px_rgba(0,0,0,0.05)]">
                <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-gray-200" />
                <div
                  className="mt-2 flex-1 min-h-0 overflow-y-auto px-4 pb-[7.5rem] scroll-smooth"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain',
                    touchAction: 'pan-y',
                    scrollbarGutter: 'stable',
                  }}
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="flex flex-col gap-3">
                    {messages.map((m) => (<MessageBubble key={m.id} m={m} />))}
                    {otherTyping && (
                      <div className="ml-1 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm">
                        <Dots /><span className="text-[12px]">Typing…</span>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {/* Composer */}
                <div className="pointer-events-none sticky bottom-0 z-10" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                  <div className="pointer-events-auto px-4 pb-3">
                    <div className="flex w-full items-center gap-2 rounded-full border border-amber-200 bg-white/95 p-2 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/80">
                      <button
                        className="grid h-10 w-10 place-items-center rounded-full text-amber-600 transition hover:bg-amber-50 active:scale-95"
                        onClick={(e) => e.preventDefault()}
                        title="Attach"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <input
                        ref={inputRef}
                        id="msgInput"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                        className="h-10 flex-1 bg-transparent text-[clamp(14px,3.2vw,16px)] outline-none placeholder:text-gray-400"
                      />
                      <button
                        title="Send"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        className={[
                          'grid h-10 w-10 place-items-center rounded-full transition active:scale-95',
                          input.trim() ? 'bg-amber-500 text-white hover:brightness-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        ].join(' ')}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resolve FAB (optimistic: also clear and exit) */}
                <button
                  onClick={() => {
                    if (!roomId) return;
                    socket.emit('resolveDispatch', { roomId, by: police?.name || 'Police' });
                    // Optional: optimistic clear + exit (remove if you want to wait for server)
                    clearAllDispatchClientStateAndExit();
                  }}
                  className="absolute right-5 bottom-[7.5rem] grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl transition hover:brightness-95 active:scale-95"
                  title="Mark as resolved"
                >
                  <CheckCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side keys (cosmetic) */}
        <div className="absolute -left-1 top-[80px] h-10 w-1 rounded-r bg-neutral-300" />
        <div className="absolute -left-1 top-[135px] h-16 w-1 rounded-r bg-neutral-300" />
        <div className="absolute -right-1 top-[100px] h-16 w-1 rounded-l bg-neutral-300" />
      </div>

      {/* Resolve Modal (kept for UX if you disable optimistic clear) */}
      {resolveModal.open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-[2px]"
          onClick={() => { setResolveModal({ open: false, by: '', roomId: '' }); goHome(); }}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl animate-in fade-in zoom-in duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resolve-title"
          >
            <div className="mb-1 text-3xl">✅</div>
            <h3 id="resolve-title" className="mb-1 text-lg font-bold text-gray-900">Dispatch Resolved</h3>
            <p className="mb-4 text-sm text-gray-600">
              Room <b>{resolveModal.roomId}</b> marked as resolved{resolveModal.by ? ` by ${resolveModal.by}` : ''}.
            </p>
            <div className="flex justify-center">
              <button
                className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:brightness-95 active:scale-95"
                onClick={() => { setResolveModal({ open: false, by: '', roomId: '' }); goHome(); }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function tryParse(v) { try { return JSON.parse(v || 'null'); } catch { return null; } }
function Dots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
    </span>
  );
}
