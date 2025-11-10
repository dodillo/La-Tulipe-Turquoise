"use client"

import { useEffect, useRef, useState } from "react"

export function EasterEgg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let clicks = 0
    let lastClickTime = 0

    const handleClick = (e: MouseEvent) => {
      const now = Date.now()

      if (now - lastClickTime < 300) {
        clicks++
      } else {
        clicks = 1
      }

      lastClickTime = now

      if (clicks === 3) {
        setIsActive(true)
        triggerBloomEffect(e.clientX, e.clientY)
        clicks = 0
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  const triggerBloomEffect = (x: number, y: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.display = "block"

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
      color: string
    }> = []

    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2
      const speed = 3 + Math.random() * 6

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: Math.random() * 6 + 2,
        color: ["#d946ef", "#06b6d4", "#f97316", "#ec4899"][Math.floor(Math.random() * 4)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.life -= 0.015

        if (p.life <= 0) {
          particles.splice(i, 1)
        } else {
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      } else {
        canvas.style.display = "none"
        setIsActive(false)
      }
    }

    animate()
  }

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" style={{ display: "none" }} />
}
