export class CountdownTimer {
  constructor(targetDate, containerId) {
    this.targetDate = new Date(targetDate);
    this.containerId = containerId;
    this.interval = null;
  }

  start() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;

      if (distance < 0) {
        container.innerHTML = '<div class="text-2xl font-bold text-white">Sale Ended!</div>';
        clearInterval(this.interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      container.innerHTML = `
        <div class="flex space-x-4 justify-center">
          <div class="text-center">
            <div class="text-3xl font-bold text-white">${days}</div>
            <div class="text-sm text-gray-300">Days</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">${hours}</div>
            <div class="text-sm text-gray-300">Hours</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">${minutes}</div>
            <div class="text-sm text-gray-300">Minutes</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">${seconds}</div>
            <div class="text-sm text-gray-300">Seconds</div>
          </div>
        </div>
      `;
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}