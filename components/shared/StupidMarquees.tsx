"use client"
import { motion } from "framer-motion"
import Image from "next/image"
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
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity } : { opacity: 0 }}
      >
        <Marquee
          speed={miku || myon || uuuu ? 900 : 50}
          gradient={false}
          direction={direction}
          style={{
            position: "fixed",
            zIndex: 2,
            top: 56,
            left: 0,
            pointerEvents: "none",
            userSelect: "none",
            height: 40,
          }}
        >
          {miku ? (
            <h1>miku miku miku miku miku miku miku miku miku miku miku</h1>
          ) : myon ? (
            <h1>myon myon myon myon myon myon myon myon myon myon</h1>
          ) : uuuu ? (
            <h1>
              uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
            </h1>
          ) : (
            <h1>
              mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </h1>
          )}
        </Marquee>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity } : { opacity: 0 }}
      >
        <Marquee
          speed={miku || myon || uuuu ? 300 : 50}
          gradient={false}
          direction={direction}
          style={{
            position: "absolute",
            zIndex: 2,
            bottom: 0,
            left: 0,
            pointerEvents: "none",
            userSelect: "none",
            height: 20,
          }}
        >
          {miku ? (
            <h3>
              miku miku miku miku miku miku miku miku miku miku miku miku miku
              miku miku miku miku miku miku miku
            </h3>
          ) : myon ? (
            <h3>
              myon myon myon myon myon myon myon myon myon myon myon myon myon
              myon myon myon myon myon myon myon
            </h3>
          ) : uuuu ? (
            <h3>
              uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
            </h3>
          ) : (
            <h3>
              mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </h3>
          )}
        </Marquee>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity } : { opacity: 0 }}
      >
        <Marquee
          speed={miku || myon || uuuu ? 100 : 50}
          gradient={false}
          direction={direction}
          style={{
            position: "absolute",
            zIndex: 2,
            bottom: "2em",
            left: 0,
            height: 100,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {miku ? (
            <h1>
              miku miku miku miku miku miku miku miku miku miku miku miku miku
              miku miku miku miku miku miku miku
            </h1>
          ) : myon ? (
            <h1>myon myon myon myon myon myon myon myon myon myon</h1>
          ) : uuuu ? (
            <h1>
              uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
            </h1>
          ) : (
            <h1>
              mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </h1>
          )}
        </Marquee>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity } : { opacity: 0 }}
      >
        <Marquee
          speed={miku || myon || uuuu ? 600 : 50}
          gradient={false}
          direction={direction}
          style={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            left: 0,
            height: 200,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {miku ? (
            <h1>
              miku miku miku miku miku miku miku miku miku miku miku miku miku
              miku miku miku miku miku miku miku
            </h1>
          ) : myon ? (
            <h1>myon myon myon myon myon myon myon myon myon myon</h1>
          ) : uuuu ? (
            <h1>
              uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
            </h1>
          ) : (
            <h1>
              mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </h1>
          )}
        </Marquee>
      </motion.div>
      {!alternative && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity } : { opacity: 0 }}
        >
          {!(miku || myon || uuuu) && (
            <div
              style={{
                position: "absolute",
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
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1em",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "3em",
                  }}
                >
                  Please insert a
                </span>
                <Image
                  src="/mmmm.webp"
                  width={36}
                  height={36}
                  alt="mmmm"
                  style={{
                    margin: "0 1em",
                  }}
                />
                <span
                  style={{
                    fontSize: "3em",
                  }}
                >
                  format disc
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1em",
                }}
              >
                <span
                  style={{
                    fontSize: "3em",
                  }}
                >
                  into your
                </span>
                <span
                  style={{
                    fontSize: "5em",
                    fontWeight: "bold",
                  }}
                >
                  MmmmStation 2
                </span>
              </div>
            </div>
          )}
          <Marquee
            direction={direction}
            speed={myon || uuuu ? 800 : 50}
            gradient={false}
            style={{
              position: "absolute",
              zIndex: 2,
              top: "2em",
              left: 0,
              bottom: "2em",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {myon ? (
              <div>
                <TripleText
                  textProps={{ style: { fontSize: "9em" } }}
                  string="myon"
                />
                <TripleText
                  style={{
                    margin: "9em",
                  }}
                  textProps={{
                    style: {
                      fontSize: "9em",
                    },
                  }}
                  string="myon"
                />
                <TripleText
                  string="myon"
                  style={{
                    marginLeft: "2em",
                  }}
                  textProps={{
                    style: {
                      fontSize: "9em",
                    },
                  }}
                />
              </div>
            ) : uuuu ? (
              <h1 style={{ fontSize: "9em" }}>
                uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
              </h1>
            ) : null}
          </Marquee>
        </motion.div>
      )}
      {alternative && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
        >
          <Marquee
            speed={myon ? 100 : 50}
            gradient={false}
            style={{
              position: "absolute",
              zIndex: 2,
              top: 44,
              left: 0,
              pointerEvents: "none",
              userSelect: "none",
              height: 300,
            }}
          >
            {uuuu ? (
              <h1 style={{ fontSize: "9em" }}>
                uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
              </h1>
            ) : (
              <h1 style={{ fontSize: "9em" }}>
                mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
              </h1>
            )}
          </Marquee>
        </motion.div>
      )}
      {alternative && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
        >
          <Marquee
            direction="right"
            gradient={false}
            style={{
              position: "absolute",
              zIndex: 2,
              bottom: 44,
              left: 0,
              pointerEvents: "none",
              userSelect: "none",
              height: 300,
            }}
          >
            {miku ? (
              <h1 style={{ fontSize: "9em" }}>
                miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku
              </h1>
            ) : myon ? (
              <h1 style={{ fontSize: "9em" }}>
                myon myon myon myon myon myon myon myon myon myon myon myon myon
                myon myon myon myon myon myon
              </h1>
            ) : uuuu ? (
              <h1 style={{ fontSize: "9em" }}>
                uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
              </h1>
            ) : (
              <h1 style={{ fontSize: "9em" }}>
                mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
              </h1>
            )}
          </Marquee>
        </motion.div>
      )}
    </>
  )
}

export default StupidMarquees
