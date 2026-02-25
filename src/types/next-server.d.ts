// Override for corrupted node_modules/next/server.d.ts (OneDrive sync issue)
declare module "next/server" {
  export class NextRequest extends Request {
    readonly nextUrl: URL & {
      pathname: string
      searchParams: URLSearchParams
      basePath: string
    }
    readonly cookies: {
      get(name: string): { name: string; value: string } | undefined
      getAll(): { name: string; value: string }[]
      set(name: string, value: string): void
      delete(name: string): void
      has(name: string): boolean
    }
    readonly geo?: {
      city?: string
      country?: string
      region?: string
      latitude?: string
      longitude?: string
    }
    readonly ip?: string
  }

  export class NextResponse<T = unknown> extends Response {
    static json<JsonBody>(
      body: JsonBody,
      init?: ResponseInit
    ): NextResponse<JsonBody>
    static redirect(url: string | URL, status?: number): NextResponse
    static next(init?: {
      request?: { headers?: Headers }
      headers?: HeadersInit
    }): NextResponse
    static rewrite(
      destination: string | URL,
      init?: ResponseInit
    ): NextResponse
    cookies: {
      get(name: string): { name: string; value: string } | undefined
      getAll(): { name: string; value: string }[]
      set(name: string, value: string, options?: Record<string, unknown>): void
      delete(name: string): void
    }
  }

  export type NextMiddleware = (
    request: NextRequest,
    event: NextFetchEvent
  ) =>
    | NextResponse
    | Response
    | void
    | Promise<NextResponse | Response | void>

  export class NextFetchEvent extends Event {
    sourcePage: string
    waitUntil(promise: Promise<unknown>): void
  }
}
