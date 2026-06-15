import { useEffect, useState } from "react"

const REGISTRY = "https://registry.npmjs.org"
const CACHE_TTL_MS = 5 * 60 * 1000

const cache = new Map<string, { version: string; ts: number }>()

export function useNpmVersion(packageName: string): string | null {
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const cached = cache.get(packageName)
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      setVersion(cached.version)
      return
    }

    fetch(`${REGISTRY}/${packageName}/latest`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { version?: string }) => {
        if (cancelled || !data.version) return
        cache.set(packageName, { version: data.version, ts: Date.now() })
        setVersion(data.version)
      })
      .catch(() => {
        /* silent fallback — badge renders without version */
      })

    return () => {
      cancelled = true
    }
  }, [packageName])

  return version
}
