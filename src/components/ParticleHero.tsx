"use client"

import { useRef, useEffect, useState } from "react"

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFormationPhase, setIsFormationPhase] = useState(true)

  useEffect(() => {
    // Load IBM Plex Sans font to match the portfolio
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.7 // 70% of screen height
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      vx: number
      vy: number
      isForming: boolean
      formingProgress: number
    }[] = []

    let textImageData: ImageData | null = null
    let animationStartTime = Date.now()

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = "white"
      ctx.save()

      const textSize = isMobile ? 100 : 200 // 2x larger
      ctx.font = `bold ${textSize}px 'IBM Plex Sans', sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.fillText("CHIBUZOR", canvas.width / 2, canvas.height / 2)

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return textSize / 160
    }

    function createParticle(scale: number, isInitialLoad = false) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data

      for (let attempt = 0; attempt < 100; attempt++) {
        const targetX = Math.floor(Math.random() * canvas.width)
        const targetY = Math.floor(Math.random() * canvas.height)

        if (data[(targetY * canvas.width + targetX) * 4 + 3] > 128) {
          let startX, startY

          if (isInitialLoad) {
            const side = Math.floor(Math.random() * 4)
            switch (side) {
              case 0: // top
                startX = Math.random() * canvas.width
                startY = -50
                break
              case 1: // right
                startX = canvas.width + 50
                startY = Math.random() * canvas.height
                break
              case 2: // bottom
                startX = Math.random() * canvas.width
                startY = canvas.height + 50
                break
              case 3: // left
                startX = -50
                startY = Math.random() * canvas.height
                break
              default:
                startX = Math.random() * canvas.width
                startY = Math.random() * canvas.height
            }
          } else {
            startX = targetX
            startY = targetY
          }

          return {
            x: startX,
            y: startY,
            baseX: targetX,
            baseY: targetY,
            size: Math.random() * 1.5 + 0.5,
            color: "white",
            scatteredColor: "#60ff00",
            life: Math.random() * 100 + 50,
            vx: 0,
            vy: 0,
            isForming: isInitialLoad,
            formingProgress: 0,
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      const baseParticleCount = 8000
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))

      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale, true)
        if (particle) {
          particle.formingProgress = -Math.random() * 2
          particles.push(particle)
        }
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "hsl(220, 13%, 9%)" // Portfolio dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 200
      const currentTime = Date.now()
      const elapsedTime = (currentTime - animationStartTime) / 1000

      // Set loaded state once particles finish forming (no double loading)
      if (!isLoaded && elapsedTime > 3) {
        setIsLoaded(true)
      }

      // Transition from formation phase to maintenance phase after 8 seconds
      if (isFormationPhase && elapsedTime > 8) {
        setIsFormationPhase(false)
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (p.isForming && p.formingProgress < 1) {
          if (p.formingProgress < 0) {
            p.formingProgress += 0.02
          } else {
            const easeProgress = 1 - Math.pow(1 - p.formingProgress, 3)

            const dx = p.baseX - p.x
            const dy = p.baseY - p.y

            p.x += dx * 0.08 * (1 + easeProgress)
            p.y += dy * 0.08 * (1 + easeProgress)

            p.formingProgress += 0.015

            const danceOffset = Math.sin(elapsedTime * 3 + i * 0.1) * (1 - easeProgress) * 10
            p.x += danceOffset

            if (p.formingProgress >= 1) {
              p.isForming = false
              p.x = p.baseX
              p.y = p.baseY
            }
          }

          ctx.fillStyle = `rgba(96, 255, 0, ${Math.max(0, p.formingProgress)})`
        } else {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window)) && isLoaded) {
            const force = (maxDistance - distance) / maxDistance
            const angle = Math.atan2(dy, dx)
            const moveX = Math.cos(angle) * force * 80
            const moveY = Math.sin(angle) * force * 80
            p.x = p.baseX - moveX
            p.y = p.baseY - moveY

            ctx.fillStyle = p.scatteredColor
          } else {
            p.x += (p.baseX - p.x) * 0.15
            p.y += (p.baseY - p.y) * 0.15

            if (isLoaded) {
              const danceX = Math.sin(elapsedTime * 2 + i * 0.05) * 0.5
              const danceY = Math.cos(elapsedTime * 1.5 + i * 0.07) * 0.3
              p.x += danceX
              p.y += danceY
            }

            ctx.fillStyle = p.color
          }
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        // Only manage particle lifecycle after formation phase
        if (!p.isForming && !isFormationPhase) {
          p.life--
          if (p.life <= 0) {
            const newParticle = createParticle(scale, false)
            if (newParticle) {
              particles[i] = newParticle
            } else {
              particles.splice(i, 1)
              i--
            }
          }
        }
      }

      // Only replenish particles after formation phase is complete
      if (isLoaded && !isFormationPhase) {
        const baseParticleCount = 8000
        const targetParticleCount = Math.floor(
          baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
        )
        while (particles.length < targetParticleCount) {
          const newParticle = createParticle(scale, false)
          if (newParticle) particles.push(newParticle)
        }
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      // Only reset particles if this is the first time, not on resize
      if (particles.length === 0) {
        createInitialParticles(newScale)
        animationStartTime = Date.now()
      }
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, isLoaded, isFormationPhase])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with Chibuzor name"
      />
    </div>
  )
}