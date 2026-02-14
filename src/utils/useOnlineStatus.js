import { useEffect, useMemo, useState } from "react";

const readConnectionMeta = () => {
  if (typeof navigator === "undefined") {
    return { type: "unknown", downlink: null, rtt: null, saveData: false };
  }

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  return {
    type: connection?.effectiveType || "unknown",
    downlink: Number.isFinite(connection?.downlink) ? connection.downlink : null,
    rtt: Number.isFinite(connection?.rtt) ? connection.rtt : null,
    saveData: Boolean(connection?.saveData),
  };
};

const getInitialStatus = () => {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
};

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(getInitialStatus);
  const [lastChangedAt, setLastChangedAt] = useState(Date.now());
  const [connectionMeta, setConnectionMeta] = useState(readConnectionMeta);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateStatus = (nextStatus) => {
      setIsOnline(nextStatus);
      setLastChangedAt(Date.now());
      setConnectionMeta(readConnectionMeta());
    };

    const handleOnline = () => updateStatus(true);
    const handleOffline = () => updateStatus(false);
    const handleConnectionChange = () => {
      setConnectionMeta(readConnectionMeta());
    };
    const handleVisibilityOrFocus = () => {
      updateStatus(navigator.onLine);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    navigator.connection?.addEventListener?.("change", handleConnectionChange);

    handleVisibilityOrFocus();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      navigator.connection?.removeEventListener?.("change", handleConnectionChange);
    };
  }, []);

  return useMemo(
    () => ({
      isOnline,
      lastChangedAt,
      ...connectionMeta,
    }),
    [connectionMeta, isOnline, lastChangedAt]
  );
};

export default useOnlineStatus;
