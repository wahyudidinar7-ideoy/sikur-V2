import confetti from 'canvas-confetti';

export function fireJoyfulConfetti() {
  // Pastel and vivid kindergarten colors
  const colors = ['#10B981', '#FACC15', '#FB923C', '#F472B6', '#38BDF8', '#A78BFA'];

  // Left burst
  confetti({
    particleCount: 45,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.8 },
    colors,
  });

  // Right burst
  confetti({
    particleCount: 45,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.8 },
    colors,
  });

  // Center stars
  confetti({
    particleCount: 30,
    spread: 80,
    origin: { y: 0.6 },
    colors,
  });
}
