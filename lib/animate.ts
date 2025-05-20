import gsap from 'gsap';

type ExplodeEffectConfig = {
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  reverse?: boolean;
};

export const registerExplodeEffect = (): void => {
  gsap.registerEffect({
    name: 'explode',
    effect: (targets: gsap.TweenTarget, config: ExplodeEffectConfig) => {
      const { direction = 'down', duration = 4, reverse = false } = config;
      let x = 0, y = 0;

      switch (direction) {
        case 'up': y = -100; break;
        case 'down': y = 100; break;
        case 'left': x = -100; break;
        case 'right': x = 100; break;
      }

      const animationConfig = {
        duration,
        x,
        y,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.out'
      };

      return reverse
        ? gsap.to(targets, animationConfig)
        : gsap.from(targets, { ...animationConfig, opacity: 0 });
    },
    defaults: { direction: 'down', duration: 4, reverse: false },
    extendTimeline: true
  });
};
