import { motion } from "framer-motion";
import { Cpu, HardDrive, MemoryStick, Fan, Server, CircuitBoard, MonitorSmartphone, Gpu } from "lucide-react";

const PARTS = [
  { Icon: Cpu, x: "8%", y: "12%", size: 72, delay: 0, color: "var(--neon-blue)" },
  { Icon: Gpu, x: "78%", y: "18%", size: 110, delay: 1.2, color: "var(--neon-purple)" },
  { Icon: MemoryStick, x: "20%", y: "72%", size: 84, delay: 0.6, color: "var(--neon-cyan)" },
  { Icon: Fan, x: "68%", y: "78%", size: 96, delay: 2, color: "var(--neon-blue)" },
  { Icon: HardDrive, x: "42%", y: "22%", size: 78, delay: 1.6, color: "var(--neon-purple)" },
  { Icon: Server, x: "88%", y: "55%", size: 90, delay: 0.9, color: "var(--neon-cyan)" },
  { Icon: CircuitBoard, x: "5%", y: "48%", size: 120, delay: 2.4, color: "var(--neon-blue)" },
  { Icon: MonitorSmartphone, x: "52%", y: "88%", size: 76, delay: 1.8, color: "var(--neon-purple)" },
];

export function TechBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1, perspective: "1200px" }}
    >
      {/* ambient gradient wash */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.55 }}
      />
      {/* circuit grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.22 265 / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.22 265 / 0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      {/* floating parts */}
      {PARTS.map(({ Icon, x, y, size, delay, color }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y, filter: `drop-shadow(0 0 22px ${color})`, color }}
          initial={{ opacity: 0, scale: 0.4, rotateX: -60, rotateY: 40 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            scale: [0.5, 1, 1, 0.6],
            rotateX: [-60, 0, 0, 40],
            rotateY: [40, 0, 360, 320],
            y: [0, -30, -10, 20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
            times: [0, 0.25, 0.75, 1],
          }}
        >
          <Icon size={size} strokeWidth={1.1} />
        </motion.div>
      ))}
    </div>
  );
}

export default TechBackground;
