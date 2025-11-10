import * as THREE from "three"

export const createFloatingFlowerScene = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0e27)

  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // Create rotating flower-like geometry
  const geometry = new THREE.IcosahedronGeometry(1, 5)
  const material = new THREE.MeshPhongMaterial({
    color: 0xd946ef,
    emissive: 0x6366f1,
    shininess: 100,
  })

  const flower = new THREE.Mesh(geometry, material)
  scene.add(flower)

  // Lighting
  const light1 = new THREE.PointLight(0xd946ef, 1, 100)
  light1.position.set(5, 5, 5)
  scene.add(light1)

  const light2 = new THREE.PointLight(0x06b6d4, 0.8, 100)
  light2.position.set(-5, -5, 5)
  scene.add(light2)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  const animate = () => {
    requestAnimationFrame(animate)

    flower.rotation.x += 0.003
    flower.rotation.y += 0.005

    renderer.render(scene, camera)
  }

  const handleResize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener("resize", handleResize)
  animate()

  return () => {
    window.removeEventListener("resize", handleResize)
    renderer.dispose()
  }
}

export const createParticleField = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d")!
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
  }> = []

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
    })
  }

  const animate = () => {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(10, 14, 39, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      // Draw gradient particles
      const gradient = ctx.createLinearGradient(p.x - p.size, p.y - p.size, p.x + p.size, p.y + p.size)
      gradient.addColorStop(0, "#d946ef")
      gradient.addColorStop(1, "#06b6d4")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const handleResize = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  window.addEventListener("resize", handleResize)
  animate()

  return () => {
    window.removeEventListener("resize", handleResize)
  }
}
