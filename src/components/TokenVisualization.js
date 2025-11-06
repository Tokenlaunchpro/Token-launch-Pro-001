export class TokenVisualization {
  constructor(containerId) {
    this.containerId = containerId;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="relative w-full h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl overflow-hidden">
        <canvas id="token-canvas" class="absolute inset-0 w-full h-full"></canvas>
        
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="relative">
              <!-- Main Token -->
              <div class="w-32 h-32 mx-auto mb-6 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full animate-pulse"></div>
                <div class="absolute inset-2 bg-gradient-to-r from-purple-500 to-cyan-300 rounded-full flex items-center justify-center">
                  <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                
                <!-- Orbiting Elements -->
                <div class="absolute -inset-8">
                  <div class="w-4 h-4 bg-purple-400 rounded-full absolute animate-orbit-1"></div>
                  <div class="w-3 h-3 bg-cyan-400 rounded-full absolute animate-orbit-2"></div>
                  <div class="w-2 h-2 bg-white rounded-full absolute animate-orbit-3"></div>
                </div>
              </div>
              
              <h3 class="text-2xl font-bold text-white mb-2">TokenLaunchPro</h3>
              <p class="text-gray-300 mb-4">AI-Powered Token Creation</p>
              
              <div class="flex justify-center space-x-4 text-sm">
                <div class="bg-black/30 rounded-lg px-3 py-2">
                  <div class="text-green-400 font-bold">🔒 Secure</div>
                </div>
                <div class="bg-black/30 rounded-lg px-3 py-2">
                  <div class="text-blue-400 font-bold">⚡ Fast</div>
                </div>
                <div class="bg-black/30 rounded-lg px-3 py-2">
                  <div class="text-purple-400 font-bold">🤖 AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupCanvas();
    this.createParticles();
    this.animate();
  }

  setupCanvas() {
    this.canvas = document.getElementById('token-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  createParticles() {
    this.particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#9333ea' : '#22d3ee'
      });
    }
  }

  animate() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}