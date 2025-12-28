import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAA8CAYAAAB9uDYPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAmHSURBVHhe7Z1/aB1FFsd/s64kIgURBEUEBUUKKqIgiCBBWUJtMGIiiggiKNhFREREUbCKiIoREFBEUUQBQaSIiIJiLdYSC2sFBbHSWhREsaBgK/Yp1pJLsR/W2Pv+o5d52T63u/fevds8h3wgeW/ezG9md/f5zZud9Wc2e/p3/uP/lF+S/yV+b/q/+F75b6L/xVvl/+sT/b3+I/yO/P/4qf7e/if8/vzt+JP5NfO/8G/if83fmf8T/3R+uP+f/h3/TP5f/M/8r/xS/oX8b/mf8//mf8n/hX8y/2d+u//j/l/4N/1/nL/T/7N/u/9P/h/87/wf+b/wz/Jf57/N/73/Wf6T/M/8P/kf8//lf+h/z/+B/zf+D/1T/f/43/o/8f/l/8x/n/+z/xf+V/6/P8//uf8z/if9z/j/8L/tf8//i/8L/pf8L/pf9P/g/+T/y/+h/xf+J/xP+J/xf/Q/7/+X/5X/m/+j/w/93/of8f/qf8//j/9P/p/+D/5P/n/8n/pf8P/l/+b/zf/X/0P+v/h/+N/zv/L/6H/F/7P/A/4f/A/5f/I/4f/D/43/E/6H/f/zP+F/xf+3/wv+D/w/9x/nf8f/of9//o/8f/qf8f/i/9T/uf8P/h/8f/if8j/jf8//nf8f/u/9f/if9f/A/6X/f/3f9j/pf8T/if9D/uf8n/l/8//kf8f/of9X/tf8v/s/9v/E/4n/A/4n/I/63/E/6H/H/7n/N/5H/V/4v/b/w/8P/9/6P+R/z/9B/z/+F/xP+h/w/+T/1/+5/z/+T/xP+5/zP+T/1v+Z/y/+V/5v/N/7f/P/6f/B/5v/D/3H/D/6v/U/5f/c/4f/C/4H/I/5f/I/7n/M/5n/D/4P/O/4//X/3f+p/x/9z/s/9j/i/8D/qf9//q/8T/k/9b/tf9j/g/8f/lf9f/W/5n/M/7P/T/7v/V/7n/P/4f/N/7n/N/7P/B/4v/A/7n/X/63/Y/7n/R/6v/F/5v/b/7n/d/6v/f/5//R/5f/T/7v/T/7H/L/43/R/6P/c/4f/P/7n/f/7v/R/6f/X/63/E/5v/T/5P/L/4v/W/5P/f/7n/e/5n/R/7P/Y/4f/b/7n/c/6f/U/7P/T/5P/D/7P/f/7H/Q/5f/D/7H/E/6H/M/7P/L/7n/Y/6P/U/6H/d/6v/b/73/Q/5v/J/7v/c/7n/T/6v/Y/6P/P/7H/H/7v/H/7v/L/5v/e/63/L/5//Z"
      alt="Jeejal Amaan Logo"
      width={170}
      height={60}
      className={cn(className)}
      priority
    />
  );
}
