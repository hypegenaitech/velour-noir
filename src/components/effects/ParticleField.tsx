'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COUNT_GOLD  = 800;
const COUNT_WHITE = 400;
const TOTAL       = COUNT_GOLD + COUNT_WHITE;
const BURST_DUR   = 1800; // ms — power4.out explosion

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.mixBlendMode = 'screen';
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ───────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    // ── Geometry & colour arrays ─────────────────────────────
    const positions  = new Float32Array(TOTAL * 3);
    const colours    = new Float32Array(TOTAL * 3);
    const sizes      = new Float32Array(TOTAL);
    const opacities  = new Float32Array(TOTAL);
    const phases     = new Float32Array(TOTAL); // sine-wave phase per particle
    const velY       = new Float32Array(TOTAL); // upward drift speed
    const velX       = new Float32Array(TOTAL); // x drift

    // burst: each particle has a pre-computed "explosion offset" from centre
    const burstX = new Float32Array(TOTAL);
    const burstY = new Float32Array(TOTAL);

    const W = window.innerWidth;
    const H = window.innerHeight;
    // map pixel coords → Three.js world units at z=0 (camera z=500, fov=60)
    const vFov  = (60 * Math.PI) / 180;
    const wUnit = 2 * Math.tan(vFov / 2) * 500; // world-height at z=0
    const scale = wUnit / H;                      // px → world

    const goldR = 0xC8 / 255, goldG = 0xA9 / 255, goldB = 0x6E / 255;

    const diag = Math.sqrt(W * W + H * H) * scale;

    for (let i = 0; i < TOTAL; i++) {
      const isGold = i < COUNT_GOLD;

      // rest position: random spread across viewport
      const rx = (Math.random() - 0.5) * W * scale;
      const ry = (Math.random() - 0.5) * H * scale;
      positions[i * 3]     = rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      colours[i * 3]     = isGold ? goldR : 1;
      colours[i * 3 + 1] = isGold ? goldG : 1;
      colours[i * 3 + 2] = isGold ? goldB : 1;

      sizes[i]    = isGold ? Math.random() * 1.5 + 0.8 : Math.random() * 0.8 + 0.4;
      opacities[i] = isGold ? 0.18 + Math.random() * 0.27 : 0.06 + Math.random() * 0.10;
      phases[i]   = Math.random() * Math.PI * 2;
      velY[i]     = -(Math.random() * 0.35 + 0.12); // world units / frame @ 60fps
      velX[i]     = (Math.random() - 0.5) * 0.08;

      // burst: radial offset from screen centre so particles appear to fly outward
      const angle = Math.random() * Math.PI * 2;
      const dist  = diag * (0.4 + Math.random() * 0.6);
      burstX[i]   = Math.cos(angle) * dist;
      burstY[i]   = Math.sin(angle) * dist;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',  new THREE.BufferAttribute(positions,  3));
    geometry.setAttribute('color',     new THREE.BufferAttribute(colours,    3));
    geometry.setAttribute('size',      new THREE.BufferAttribute(sizes,      1));
    geometry.setAttribute('aOpacity',  new THREE.BufferAttribute(opacities,  1));

    // ── Custom shader material ───────────────────────────────
    const material = new THREE.ShaderMaterial({
      vertexColors:  true,
      transparent:   true,
      depthWrite:    false,
      blending:      THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        attribute float aOpacity;
        varying float vOpacity;
        varying vec3  vColor;
        void main() {
          vOpacity = aOpacity;
          vColor   = color;
          vec4 mv  = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize  = size * (1500.0 / -mv.z);
          gl_Position   = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        varying vec3  vColor;
        void main() {
          // soft circular disc
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = vOpacity * smoothstep(0.5, 0.1, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse parallax ───────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ──────────────────────────────────────────────
    const startTime = performance.now();
    let frameId: number;

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const halfW = (W / 2) * scale;
    const halfH = (H / 2) * scale;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const now     = performance.now();
      const elapsed = now - startTime;
      const t       = elapsed * 0.001;

      // burst progress: 0 → 1 over BURST_DUR ms, power4.out easing
      const bp  = Math.min(elapsed / BURST_DUR, 1);
      const be  = 1 - Math.pow(1 - bp, 4); // power4.out: fast-out, settle in

      const posArr = pos.array as Float32Array;

      for (let i = 0; i < TOTAL; i++) {
        const i3 = i * 3;

        if (bp < 1) {
          // During burst: particles start dispersed (rest + burst offset) and
          // converge to rest position as be → 1.
          // At be=0 they are fully displaced; at be=1 they are at rest.
          const displacement = 1 - be; // shrinks from 1 → 0
          posArr[i3]     = positions[i3]     + burstX[i] * displacement;
          posArr[i3 + 1] = positions[i3 + 1] + burstY[i] * displacement;
          posArr[i3 + 2] = positions[i3 + 2];
        } else {
          // Normal float after burst
          posArr[i3]     += velX[i] + Math.sin(phases[i] + t * 0.5) * 0.04;
          posArr[i3 + 1] += velY[i];

          // Wrap: when particle drifts off top, reset to bottom
          if (posArr[i3 + 1] < -halfH - 10) {
            posArr[i3 + 1] = halfH + 5;
            posArr[i3]     = (Math.random() - 0.5) * W * scale;
          }
        }
      }

      // Subtle camera mouse parallax (max ±15 world units)
      camera.position.x += (mouse.x * 15 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 8  - camera.position.y) * 0.03;

      pos.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 11 }}
    />
  );
}
