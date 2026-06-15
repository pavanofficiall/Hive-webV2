"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeCrystals({ layout = "hero" }: { layout?: "hero" | "who-we-work-with" | "who-we-work-with-left" | "who-we-work-with-right" | "case-studies" | "case-studies-bg" | "case-studies-fg" | "cta" }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        // 1. Scene setup
        const scene = new THREE.Scene()
        sceneRef.current = scene

        // 2. Camera setup
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
        camera.position.z = 8
        cameraRef.current = camera

        // 3. Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // 4. Lights setup
        const ambientLight = new THREE.AmbientLight(0x030712, 2.5)
        scene.add(ambientLight)

        // Vibrant neon blue directional light (simulating main ambient color)
        const dirLight = new THREE.DirectionalLight(0x3b82f6, 6)
        dirLight.position.set(-6, 4, 3)
        scene.add(dirLight)

        // Hot pink/magenta light from the top-right to create premium accents
        const magentaLight = new THREE.PointLight(0xd946ef, 12, 25)
        magentaLight.position.set(5, 4, 2)
        scene.add(magentaLight)

        // Bright cyan light from the lower-left for soft fill highlights
        const cyanLight = new THREE.PointLight(0x06b6d4, 8, 20)
        cyanLight.position.set(-5, -4, 1)
        scene.add(cyanLight)

        // 5. Procedural Crystal geometries
        // Detail = 0 gives a sharp icosahedron (20 faces), flatShading reveals low-poly facets
        const crystalGeometry1 = new THREE.IcosahedronGeometry(1, 0)
        const crystalGeometry2 = new THREE.OctahedronGeometry(0.8, 0)

        // Standard flat-shaded metallic materials
        const royalBlueMat = new THREE.MeshStandardMaterial({
            color: 0x1e4ed8,
            metalness: 0.9,
            roughness: 0.12,
            flatShading: true,
        })

        const electricBlueMat = new THREE.MeshStandardMaterial({
            color: 0x2563eb,
            metalness: 0.85,
            roughness: 0.15,
            flatShading: true,
        })

        const darkBlueMat = new THREE.MeshStandardMaterial({
            color: 0x1d4ed8,
            metalness: 0.95,
            roughness: 0.1,
            flatShading: true,
        })

        // Create multiple crystals with unique scaling, positioning, and rotation speeds
        let crystalsData = []

        if (layout === "cta") {
            crystalsData = [
                {
                    // Left Crystal
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.9, 1.35, 0.9],
                    basePos: [-3.8, 0, 0.5],
                    rotSpeedX: -0.4,
                    rotSpeedY: 0.3,
                    bobSpeed: 1.2,
                    scrollRotateFactor: -1.8,
                    scrollShiftY: -0.4,
                },
                {
                    // Right Crystal
                    geometry: crystalGeometry1,
                    material: royalBlueMat,
                    scale: [0.95, 1.35, 0.95],
                    basePos: [3.8, 0, 0.2],
                    rotSpeedX: 0.5,
                    rotSpeedY: -0.3,
                    bobSpeed: 1.1,
                    scrollRotateFactor: 1.9,
                    scrollShiftY: -0.4,
                }
            ]
        } else if (layout === "who-we-work-with") {
            crystalsData = [
                {
                    // Crystal 1: Left Top
                    geometry: crystalGeometry1,
                    material: royalBlueMat,
                    scale: [1, 1.4, 0.9],
                    basePos: [-3.8, 1.6, -1],
                    rotSpeedX: 0.3,
                    rotSpeedY: 0.5,
                    bobSpeed: 0.8,
                    scrollRotateFactor: 2.2,
                    scrollShiftY: -1.0,
                },
                {
                    // Crystal 2: Right Mid
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.85, 1.2, 0.85],
                    basePos: [3.8, 0.2, 0.2],
                    rotSpeedX: 0.5,
                    rotSpeedY: -0.3,
                    bobSpeed: 1.1,
                    scrollRotateFactor: 1.9,
                    scrollShiftY: -0.8,
                },
                {
                    // Crystal 3: Left Lower
                    geometry: crystalGeometry1,
                    material: darkBlueMat,
                    scale: [0.65, 0.9, 0.65],
                    basePos: [-3.0, -1.8, -1.5],
                    rotSpeedX: -0.2,
                    rotSpeedY: 0.6,
                    bobSpeed: 1.4,
                    scrollRotateFactor: -1.4,
                    scrollShiftY: -0.6,
                }
            ]
        } else if (layout === "case-studies") {
            crystalsData = [
                {
                    // Crystal 1: Left Mid
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.85, 1.2, 0.85],
                    basePos: [-3.8, 0.6, 0.5],
                    rotSpeedX: -0.4,
                    rotSpeedY: 0.3,
                    bobSpeed: 1.2,
                    scrollRotateFactor: -1.8,
                    scrollShiftY: -0.9,
                },
                {
                    // Crystal 2: Right Top
                    geometry: crystalGeometry1,
                    material: royalBlueMat,
                    scale: [1, 1.4, 0.9],
                    basePos: [3.8, 1.8, -0.8],
                    rotSpeedX: -0.3,
                    rotSpeedY: 0.4,
                    bobSpeed: 0.9,
                    scrollRotateFactor: -2.0,
                    scrollShiftY: -1.1,
                },
                {
                    // Crystal 3: Right Lower
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.6, 0.85, 0.6],
                    basePos: [3.0, -1.6, -1.2],
                    rotSpeedX: 0.4,
                    rotSpeedY: -0.5,
                    bobSpeed: 1.3,
                    scrollRotateFactor: 1.7,
                    scrollShiftY: -0.5,
                }
            ]
        } else if (layout === "case-studies-bg") {
            crystalsData = [
                {
                    // Crystal 1: Right Mid-Top (Small background)
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.35, 0.525, 0.35],
                    basePos: [3.8, 0.6, -1.0],
                    rotSpeedX: -0.04,
                    rotSpeedY: 0.08,
                    bobSpeed: 1.2,
                    scrollRotateFactor: -1.8,
                    scrollShiftY: -0.9,
                },
                {
                    // Crystal 2: Left Top (Big background)
                    geometry: crystalGeometry1,
                    material: royalBlueMat,
                    scale: [0.9, 1.3, 0.9],
                    basePos: [-3.8, 1.2, -0.8],
                    rotSpeedX: -0.3,
                    rotSpeedY: 0.4,
                    bobSpeed: 0.9,
                    scrollRotateFactor: -2.0,
                    scrollShiftY: -1.1,
                }
            ]
        } else if (layout === "case-studies-fg") {
            crystalsData = [
                {
                    // Crystal 3: Right Lower (Medium-Small foreground, above content)
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.35, 0.525, 0.35],
                    basePos: [4.8, -0.6, 0.5],
                    rotSpeedX: 0.4,
                    rotSpeedY: -0.5,
                    bobSpeed: 1.3,
                    scrollRotateFactor: 1.7,
                    scrollShiftY: -0.5,
                }
            ]
        } else if (layout === "who-we-work-with-left") {
            crystalsData = [
                {
                    // Left background crystal (large)
                    geometry: crystalGeometry1,
                    material: royalBlueMat,
                    scale: [1, 1.4, 0.9],
                    basePos: [-1.2, 0.5, -1],
                    rotSpeedX: 0.2,
                    rotSpeedY: 0.3,
                    bobSpeed: 0.6,
                    scrollRotateFactor: 1.5,
                    scrollShiftY: -0.8,
                }
            ]
        } else if (layout === "who-we-work-with-right") {
            crystalsData = [
                {
                    // Right foreground crystal (small)
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.65, 0.9, 0.65],
                    basePos: [2.1, -0.6, 0.2],
                    rotSpeedX: 0.3,
                    rotSpeedY: -0.2,
                    bobSpeed: 0.7,
                    scrollRotateFactor: 1.6,
                    scrollShiftY: -0.6,
                }
            ]
        } else {
            // "hero" or default (all 7 crystals)
            crystalsData = [
                {
                    // Crystal 1: Large Top-Left
                    geometry: crystalGeometry1,
                    material: royalBlueMat,
                    scale: [1, 1.4, 0.9],
                    basePos: [-3.8, 2.2, -1],
                    rotSpeedX: 0.3,
                    rotSpeedY: 0.5,
                    bobSpeed: 0.8,
                    scrollRotateFactor: 2.2,
                    scrollShiftY: -1.5,
                },
                {
                    // Crystal 2: Mid-Left
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.8, 1.2, 0.8],
                    basePos: [-4.5, -0.6, 0.5],
                    rotSpeedX: -0.4,
                    rotSpeedY: 0.3,
                    bobSpeed: 1.2,
                    scrollRotateFactor: -1.8,
                    scrollShiftY: -1.2,
                },
                {
                    // Crystal 3: Bottom-Center (behind text)
                    geometry: crystalGeometry1,
                    material: darkBlueMat,
                    scale: [0.75, 1.1, 0.75],
                    basePos: [0, -1.8, -0.5],
                    rotSpeedX: 0.2,
                    rotSpeedY: -0.4,
                    bobSpeed: 0.7,
                    scrollRotateFactor: 1.5,
                    scrollShiftY: -2.0,
                },
                {
                    // Crystal 4: Top-Right
                    geometry: crystalGeometry1,
                    material: electricBlueMat,
                    scale: [0.9, 1.3, 0.9],
                    basePos: [3.8, 2.4, -0.8],
                    rotSpeedX: -0.3,
                    rotSpeedY: 0.4,
                    bobSpeed: 0.9,
                    scrollRotateFactor: -2.0,
                    scrollShiftY: -1.6,
                },
                {
                    // Crystal 5: Mid-Right
                    geometry: crystalGeometry2,
                    material: royalBlueMat,
                    scale: [0.85, 1.2, 0.85],
                    basePos: [4.2, -0.8, 0.2],
                    rotSpeedX: 0.5,
                    rotSpeedY: -0.3,
                    bobSpeed: 1.1,
                    scrollRotateFactor: 1.9,
                    scrollShiftY: -1.3,
                },
                {
                    // Crystal 6: Lower-Left
                    geometry: crystalGeometry1,
                    material: darkBlueMat,
                    scale: [0.5, 0.75, 0.5],
                    basePos: [-2.8, -2.8, -2],
                    rotSpeedX: -0.2,
                    rotSpeedY: 0.6,
                    bobSpeed: 1.4,
                    scrollRotateFactor: -1.4,
                    scrollShiftY: -0.8,
                },
                {
                    // Crystal 7: Lower-Right
                    geometry: crystalGeometry2,
                    material: electricBlueMat,
                    scale: [0.55, 0.8, 0.55],
                    basePos: [2.6, -3.0, -1.8],
                    rotSpeedX: 0.4,
                    rotSpeedY: -0.5,
                    bobSpeed: 1.3,
                    scrollRotateFactor: 1.7,
                    scrollShiftY: -0.9,
                }
            ]
        }

        const meshes: THREE.Mesh[] = []

        crystalsData.forEach((data) => {
            const mesh = new THREE.Mesh(data.geometry, data.material)
            mesh.scale.set(data.scale[0], data.scale[1], data.scale[2])
            mesh.position.set(data.basePos[0], data.basePos[1], data.basePos[2])
            
            // Randomize starting rotation
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
            
            // Store variables for animation loop
            mesh.userData = { ...data }
            
            scene.add(mesh)
            meshes.push(mesh)
        })

        // 6. Resizing & scroll state
        let targetScroll = 0
        let currentScroll = 0
        let aspectX = Math.min(Math.max(width / height, 0.6), 1.8) / 1.3

        const handleScroll = () => {
            targetScroll = window.scrollY
        }
        window.addEventListener("scroll", handleScroll, { passive: true })

        const handleResize = () => {
            if (!container || !renderer || !camera) return
            const w = container.clientWidth
            const h = container.clientHeight

            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)

            // Adjust mesh X spacing based on aspect ratio (so elements scale nicely on mobile)
            aspectX = Math.min(Math.max(w / h, 0.6), 1.8) / 1.3

            // Adjust crystal scales on mobile for performance and layout cleanups
            const isMobile = w < 768
            meshes.forEach((mesh) => {
                const data = mesh.userData
                const baseScale = data.scale
                if (isMobile) {
                    // Hide foreground/large overlapping crystals on mobile to keep centered text clear
                    if (
                        layout === "case-studies-fg" ||
                        layout === "who-we-work-with-right" ||
                        data.basePos[2] > 0
                    ) {
                        mesh.scale.set(0, 0, 0)
                    } else {
                        mesh.scale.set(baseScale[0] * 0.55, baseScale[1] * 0.55, baseScale[2] * 0.55)
                    }
                } else {
                    mesh.scale.set(baseScale[0], baseScale[1], baseScale[2])
                }
            })
        }
        window.addEventListener("resize", handleResize)
        
        // Run initial resize to trigger mobile positioning
        handleResize()

        // 7. Interactive mouse shift (for parallax effect)
        let mouseX = 0
        let mouseY = 0
        let targetMouseX = 0
        let targetMouseY = 0

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.4
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * -0.4
        }
        window.addEventListener("mousemove", handleMouseMove)

        // 8. Animation Loop
        const clock = new THREE.Clock()
        let frameId: number

        const animate = () => {
            frameId = requestAnimationFrame(animate)

            const time = clock.getElapsedTime()

            // Smoothly interpolate scroll and mouse movement (lerp)
            currentScroll += (targetScroll - currentScroll) * 0.08
            mouseX += (targetMouseX - mouseX) * 0.05
            mouseY += (targetMouseY - mouseY) * 0.05

            const maxScroll = height * 1.5
            const scrollFraction = Math.min(currentScroll / maxScroll, 1)

            meshes.forEach((mesh) => {
                const data = mesh.userData

                // 1. Idle rotation
                mesh.rotation.x += 0.0002 * data.rotSpeedX
                mesh.rotation.y += 0.0002 * data.rotSpeedY

                // 2. Scroll-linked rotation (GSAP-like scrub behavior)
                mesh.rotation.y += scrollFraction * data.scrollRotateFactor * 0.02
                mesh.rotation.z += scrollFraction * data.scrollRotateFactor * 0.01

                // 3. Position: base + scroll vertical slide + bobbing + mouse parallax shift
                const bobOffset = Math.sin(time * data.bobSpeed + data.basePos[0]) * 0.12
                const scrollOffset = scrollFraction * data.scrollShiftY
                
                mesh.position.y = data.basePos[1] + scrollOffset + bobOffset + mouseY * (data.basePos[2] < -1 ? 0.3 : 1)
                mesh.position.x = data.basePos[0] * aspectX + mouseX * (data.basePos[2] < -1 ? 0.3 : 1)
            })

            renderer.render(scene, camera)
        }

        animate()

        // Cleanup
        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)

            // Dispose geometries and materials
            crystalGeometry1.dispose()
            crystalGeometry2.dispose()
            royalBlueMat.dispose()
            electricBlueMat.dispose()
            darkBlueMat.dispose()

            // Clean WebGL context
            if (rendererRef.current && rendererRef.current.domElement) {
                rendererRef.current.dispose()
                if (container.contains(rendererRef.current.domElement)) {
                    container.removeChild(rendererRef.current.domElement)
                }
            }
        }
    }, [layout])

    return (
        <div 
            ref={containerRef} 
            className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none" 
            style={{ mixBlendMode: "screen" }}
        />
    )
}
