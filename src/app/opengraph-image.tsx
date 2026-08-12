import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BizHR — California HR Compliance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617',
          position: 'relative',
        }}
      >
        {/* Skyline silhouette band */}
        <svg
          width="1200"
          height="280"
          viewBox="0 0 1600 400"
          style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.5 }}
        >
          <g fill="#162454">
            <rect x="200" y="260" width="60" height="140" />
            <rect x="270" y="200" width="45" height="200" />
            <rect x="410" y="120" width="55" height="280" />
            <rect x="420" y="90" width="35" height="35" />
            <rect x="590" y="270" width="65" height="130" />
            <rect x="670" y="230" width="48" height="170" />
            <rect x="780" y="255" width="58" height="145" />
            <rect x="1100" y="240" width="46" height="160" />
            <rect x="1225" y="200" width="40" height="200" />
            <rect x="1340" y="230" width="42" height="170" />
          </g>
        </svg>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
            }}
          />
          <span style={{ color: '#67e8f9', fontSize: 24, letterSpacing: 4, fontWeight: 700 }}>
            CALIFORNIA HR COMPLIANCE
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 128,
            fontWeight: 900,
            color: 'white',
            letterSpacing: -2,
            textShadow: '0 0 60px rgba(34,211,238,0.4)',
          }}
        >
          BizHR
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#a1a1aa',
            marginTop: 20,
            fontWeight: 400,
          }}
        >
          Free tools, built by someone who&apos;d rather earn your trust
        </div>
      </div>
    ),
    { ...size }
  )
}
