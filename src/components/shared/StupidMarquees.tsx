import { motion } from "framer-motion"

import Marquee from "react-fast-marquee"
import { TripleText } from "./TripleText"

type StupidMarqueesProps = {
  visible?: boolean
  alternative?: boolean
  speed?: number
  myon?: boolean
  uuuu?: boolean
  direction?: "left" | "right"
  opacity?: number
  miku?: boolean
}

type MarqueeEntry = {
  speed: number
  direction?: "left" | "right"
  top?: number | string
  bottom?: number | string
  left?: number
  height?: number | string
  fontSize?: string
  text: string
  isTriple?: boolean
}

const MIKU_TEXT = "miku miku miku miku miku miku miku miku miku miku miku"
const MIKU_TEXT_SHORT =
  "miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku"
const MYON_TEXT = "myon myon myon myon myon myon myon myon myon myon"
const MYON_TEXT_SHORT =
  "myon myon myon myon myon myon myon myon myon myon myon myon myon myon myon myon myon myon myon myon"
const UUUU_TEXT =
  "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
const UUUU_TEXT_LONG =
  "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
const MMMM_TEXT =
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"

function getText(
  miku?: boolean,
  myon?: boolean,
  uuuu?: boolean,
  short?: boolean,
) {
  if (miku) return short ? MIKU_TEXT_SHORT : MIKU_TEXT
  if (myon) return short ? MYON_TEXT_SHORT : MYON_TEXT
  if (uuuu) return short ? UUUU_TEXT_LONG : UUUU_TEXT
  return MMMM_TEXT
}

function getMarqueeEntries(props: StupidMarqueesProps): MarqueeEntry[] {
  const { miku, myon, uuuu, alternative, direction = "left" } = props
  const text = getText(miku, myon, uuuu)
  const entries: MarqueeEntry[] = [
    {
      speed: miku || myon || uuuu ? 900 : 50,
      direction,
      top: 56,
      left: 0,
      height: 40,
      text,
    },
    {
      speed: miku || myon || uuuu ? 300 : 50,
      direction,
      bottom: 0,
      left: 0,
      height: 20,
      text: getText(miku, myon, uuuu, true),
      fontSize: "0.3em",
    },
    {
      speed: miku || myon || uuuu ? 100 : 50,
      direction,
      bottom: "2em",
      left: 0,
      height: 100,
      text,
    },
    {
      speed: miku || myon || uuuu ? 600 : 50,
      direction,
      top: 0,
      left: 0,
      height: 200,
      text,
    },
  ]
  if (!alternative) {
    entries.push({
      speed: myon || uuuu ? 800 : 50,
      direction,
      top: "2em",
      left: 0,
      bottom: "2em",
      text: "",
      isTriple: true,
    })
  }
  if (alternative) {
    entries.push({
      speed: myon ? 100 : 50,
      direction,
      top: 44,
      left: 0,
      height: 300,
      text: getText(false, false, uuuu),
      fontSize: "9em",
    })
    entries.push({
      speed: 50,
      direction: "right",
      bottom: 44,
      left: 0,
      height: 300,
      text: getText(miku, myon, uuuu),
      fontSize: "9em",
    })
  }
  return entries
}

function StupidMarquees(props: StupidMarqueesProps) {
  const {
    visible,
    alternative,
    myon,
    uuuu,
    miku,
    direction = "left",
    opacity = 1,
  } = props
  const entries = getMarqueeEntries(props)

  return (
    <>
      {entries.map((entry, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: index is unique and stable
          key={`${entry.text}-${i}`}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity } : { opacity: 0 }}
        >
          <Marquee
            speed={entry.speed}
            gradient={false}
            direction={entry.direction ?? direction}
            style={{
              position: "fixed",
              zIndex: 2,
              ...(entry.top !== undefined ? { top: entry.top } : {}),
              ...(entry.bottom !== undefined ? { bottom: entry.bottom } : {}),
              ...(entry.left !== undefined ? { left: entry.left } : {}),
              ...(entry.height !== undefined ? { height: entry.height } : {}),
              pointerEvents: "none",
              userSelect: "none",
              fontFamily: "var(--font-retro)",
            }}
          >
            {entry.isTriple ? (
              <div>
                {myon ? (
                  <>
                    <TripleText
                      textProps={{ style: { fontSize: "9em" } }}
                      string="myon"
                    />
                    <TripleText
                      style={{ margin: "9em" }}
                      textProps={{ style: { fontSize: "9em" } }}
                      string="myon"
                    />
                    <TripleText
                      string="myon"
                      style={{ marginLeft: "2em" }}
                      textProps={{ style: { fontSize: "9em" } }}
                    />
                  </>
                ) : uuuu ? (
                  <h1 style={{ fontSize: "9em" }}>{UUUU_TEXT_LONG}</h1>
                ) : null}
              </div>
            ) : (
              <h1
                style={
                  entry.fontSize ? { fontSize: entry.fontSize } : undefined
                }
              >
                {entry.text}
              </h1>
            )}
          </Marquee>
        </motion.div>
      ))}
      {!alternative && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity } : { opacity: 0 }}
        >
          {!(miku || myon || uuuu) && (
            <div
              style={{
                position: "fixed",
                zIndex: 2,
                top: "50%",
                left: "50%",
                pointerEvents: "none",
                userSelect: "none",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "1em",
                fontVariationSettings: "'wdth' 125",
                letterSpacing: "-0.05em",
                fontFamily: "var(--font-retro)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1em",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "3em" }}>Please insert a</span>
                <img
                  src="/mmmm.webp"
                  width={36}
                  height={36}
                  alt="mmmm"
                  loading="lazy"
                  style={{ margin: "0 1em" }}
                />
                <span style={{ fontSize: "3em" }}>format disc</span>
              </div>
              <div style={{ display: "flex", gap: "1em" }}>
                <span style={{ fontSize: "3em" }}>into your</span>
                <span style={{ fontSize: "5em", fontWeight: "bold" }}>
                  MmmmStation 2
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  )
}

export default StupidMarquees
