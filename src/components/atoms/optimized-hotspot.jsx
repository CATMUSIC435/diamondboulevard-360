import { useMemo } from "react";
import * as THREE from "three";

export function OptimizedHotspot({ text, bg = "#002d4d" }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    const lines = text.split(/<br\s*\/?>/i);
    
    const fontSize = 80;
    const fontStyle = `bold ${fontSize}px Inter, Arial`;
    ctx.font = fontStyle;

    const lineHeights = fontSize * 1.2;
    let maxTextWidth = 0;
    lines.forEach(line => {
      const metrics = ctx.measureText(line);
      if (metrics.width > maxTextWidth) maxTextWidth = metrics.width;
    });

    const paddingY = 60;
    canvas.width = maxTextWidth + paddingX * 2;
    canvas.height = (lines.length * lineHeights) + paddingY * 2;

    ctx.font = fontStyle;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const r = canvas.height / 2;
    ctx.fillStyle = bg;
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, r);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    lines.forEach((line, index) => {
      const yPos = paddingY + (index + 0.5) * lineHeights;
      ctx.fillText(line, canvas.width / 2, yPos);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, bg]);

  const aspect = texture.image ? texture.image.width / texture.image.height : 4;

  return (
    <sprite scale={[aspect * 16, 16, 5]}>
      <spriteMaterial map={texture} transparent={true} depthTest={false} />
    </sprite>
  );
}