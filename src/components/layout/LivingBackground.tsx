"use client";

import { useEffect, useRef } from "react";
import { useScroll, useVelocity } from "motion/react";

/**
 * THE LIVING BACKGROUND (SUMI-NAGASHI SHADER)
 * 
 * A procedural shader that simulates:
 * 1. Simplex Noise (Fluid Dynamics)
 * 2. Physics Reaction (Velocity Stretching)
 * 3. Friction Heat (Color Shift)
 */

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform float u_time;
  uniform float u_velocity; // Scroll Velocity (Stress)
  uniform vec2 u_resolution;
  
  varying vec2 vUv;

  // BRAND COLORS (Converted to Linear RGB)
  const vec3 C_WASHI = vec3(0.98, 0.976, 0.965);     // #FAF9F6
  const vec3 C_SUMI = vec3(0.1, 0.1, 0.1);           // #1A1A1A
  const vec3 C_PERSIMMON = vec3(0.91, 0.36, 0.01);   // #E85D04

  // --- SIMPLEX NOISE FUNCTION ---
  // Standard artistic noise for organic texture
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // 1. ASPECT RATIO CORRECTION
    float aspect = u_resolution.x / u_resolution.y;
    vec2 pos = uv;
    pos.x *= aspect;

    // 2. PHYSICS: VELOCITY STRETCH
    // We stretch the coordinate space based on scroll speed.
    // This creates "Speed Lines" (Manga Aesthetic) and visual tension.
    float friction = abs(u_velocity) * 0.0005; // Scale down raw velocity
    float stretch = 1.0 + friction;
    pos.y /= stretch; // Stretching the coordinates vertically

    // 3. TIME FLOW
    float t = u_time * 0.05; // Slow drift
    
    // 4. GENERATE FLUID LAYERS
    // Layer 1: The Deep Ink (Sumi) - Slow, large movements
    float n1 = snoise(pos * 1.5 + vec2(0.0, t * 0.2));
    
    // Layer 2: The Energy (Persimmon) - Faster, opposing direction
    float n2 = snoise(pos * 4.0 - vec2(t * 0.1, t * 0.4));

    // 5. COLOR MIXING
    vec3 color = C_WASHI;

    // Add Sumi (Shadows)
    // Only where noise is deep. Multiplied by 0.04 for extreme subtlety (Ghostly).
    float sumiMask = smoothstep(0.4, 0.8, n1);
    color = mix(color, C_SUMI, sumiMask * 0.04); 

    // Add Persimmon (Heat)
    // "Friction Generates Heat"
    // We only reveal the orange core when velocity is high (friction) OR deeply buried in the noise.
    float heatMask = smoothstep(0.4, 0.7, n2);
    float heatIntensity = clamp(friction * 0.2, 0.0, 0.05); // Max 5% intensity
    color = mix(color, C_PERSIMMON, heatMask * (0.01 + heatIntensity));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // --- COMPILE SHADERS ---
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- GEOMETRY (Full Screen Quad) ---
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER, 
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), 
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // --- UNIFORMS ---
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uVel = gl.getUniformLocation(program, "u_velocity");

    // --- RENDER LOOP ---
    let frameId: number;
    const startTime = performance.now();

    const render = () => {
      // 1. Resize Handling
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // 2. Update Uniforms
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, (performance.now() - startTime) * 0.001);
      
      // Inject Framer Motion Physics directly into WebGL
      gl.uniform1f(uVel, scrollVelocity.get());

      // 3. Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      gl.deleteProgram(program);
    };
  }, [scrollVelocity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

