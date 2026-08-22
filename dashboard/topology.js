// =========================================================
// Live Workspace Topology - Force-Directed Graph Engine
// =========================================================

class TopologyGraph {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.container = this.canvas.parentElement;

    this.nodes = [];
    this.edges = [];
    this.particles = [];

    // Camera / Viewport
    this.camera = { x: 0, y: 0, zoom: 1 };
    this.isDragging = false;
    this.draggedNode = null;
    this.hoveredNode = null;
    this.dragStart = { x: 0, y: 0 };
    this.lastMouse = { x: 0, y: 0 };

    // Simulation params
    this.params = {
      repulsion: 4200,
      springLength: 95,
      springStrength: 0.045,
      centerGravity: 0.015,
      damping: 0.88,
      timeStep: 0.7
    };

    this.onNodeClick = null;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
    this.startLoop();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);

    if (this.camera.x === 0 && this.camera.y === 0) {
      this.camera.x = this.width / 2;
      this.camera.y = this.height / 2;
    }
  }

  setData(data) {
    const nodeMap = new Map();

    // Map nodes
    this.nodes = data.nodes.map((n, i) => {
      const angle = (i / data.nodes.length) * Math.PI * 2;
      const radius = 180 + (Math.random() * 120);
      const node = {
        id: n.id,
        label: n.label || n.id,
        category: n.category || 'Topics',
        color: n.color || '#00D4FF',
        size: n.size || 12,
        summary: n.summary || '',
        x: (this.width / 2) + Math.cos(angle) * radius,
        y: (this.height / 2) + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        isRoot: n.id === 'root'
      };
      if (node.isRoot) {
        node.x = this.width / 2;
        node.y = this.height / 2;
      }
      nodeMap.set(node.id, node);
      return node;
    });

    // Map edges
    this.edges = [];
    data.edges.forEach(e => {
      const source = nodeMap.get(e.source);
      const target = nodeMap.get(e.target);
      if (source && target) {
        this.edges.push({ source, target });
      }
    });

    this.updateCounters();
    this.spawnSynapseParticles();
  }

  updateCounters() {
    const nodeCountEl = document.getElementById('nodeCount');
    const synapseCountEl = document.getElementById('synapseCount');
    if (nodeCountEl) nodeCountEl.textContent = this.nodes.length;
    if (synapseCountEl) synapseCountEl.textContent = this.edges.length;
  }

  spawnSynapseParticles() {
    this.particles = [];
    this.edges.forEach(edge => {
      if (Math.random() > 0.3) {
        this.particles.push({
          edge,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          color: edge.source.color || '#00FF88'
        });
      }
    });
  }

  addDynamicNode(nodeData, targetNodeIds = ['root']) {
    const rootNode = this.nodes.find(n => n.id === 'root') || { x: this.width / 2, y: this.height / 2 };
    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 60;

    const newNode = {
      id: nodeData.id || `node_${Date.now()}`,
      label: nodeData.label || 'New_Knowledge',
      category: nodeData.category || 'Topics',
      color: nodeData.color || '#00FF88',
      size: nodeData.size || 14,
      summary: nodeData.summary || '새롭게 주입된 지식 노드입니다.',
      x: rootNode.x + Math.cos(angle) * distance,
      y: rootNode.y + Math.sin(angle) * distance,
      vx: Math.cos(angle) * 8,
      vy: Math.sin(angle) * 8,
      isNew: true,
      birthTime: Date.now()
    };

    this.nodes.push(newNode);

    targetNodeIds.forEach(tId => {
      const target = this.nodes.find(n => n.id === tId);
      if (target) {
        this.edges.push({ source: newNode, target });
        this.particles.push({
          edge: { source: newNode, target },
          progress: 0,
          speed: 0.01,
          color: newNode.color
        });
      }
    });

    this.updateCounters();
    this.focusNode(newNode.id);
  }

  pulseAll() {
    this.edges.forEach(edge => {
      for (let i = 0; i < 3; i++) {
        this.particles.push({
          edge,
          progress: i * 0.25,
          speed: 0.012 + Math.random() * 0.008,
          color: '#00FF88'
        });
      }
    });
  }

  fitView() {
    if (this.nodes.length === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    this.nodes.forEach(n => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const graphWidth = Math.max(maxX - minX + 180, 400);
    const graphHeight = Math.max(maxY - minY + 180, 400);

    const scaleX = this.width / graphWidth;
    const scaleY = this.height / graphHeight;
    this.camera.zoom = Math.min(Math.min(scaleX, scaleY), 1.2) * 0.85;
    this.camera.x = this.width / 2 - cx * this.camera.zoom;
    this.camera.y = this.height / 2 - cy * this.camera.zoom;
  }

  focusNode(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) return;
    this.camera.zoom = 1.1;
    this.camera.x = this.width / 2 - node.x * this.camera.zoom;
    this.camera.y = this.height / 2 - node.y * this.camera.zoom;
  }

  // =========================================================
  // Physics Simulation Step
  // =========================================================
  stepSimulation() {
    const { repulsion, springLength, springStrength, centerGravity, damping, timeStep } = this.params;
    const cx = this.width / 2;
    const cy = this.height / 2;

    // 1. Repulsion between all node pairs
    for (let i = 0; i < this.nodes.length; i++) {
      const n1 = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        let dx = n2.x - n1.x;
        let dy = n2.y - n1.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < 380) {
          const force = repulsion / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          n1.vx -= fx;
          n1.vy -= fy;
          n2.vx += fx;
          n2.vy += fy;
        }
      }
    }

    // 2. Spring force along edges
    for (let i = 0; i < this.edges.length; i++) {
      const { source, target } = this.edges[i];
      let dx = target.x - source.x;
      let dy = target.y - source.y;
      let dist = Math.sqrt(dx * dx + dy * dy) || 1;
      let displacement = dist - springLength;

      let force = displacement * springStrength;
      let fx = (dx / dist) * force;
      let fy = (dy / dist) * force;

      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    }

    // 3. Center gravity & integrate velocity
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];

      if (n === this.draggedNode) {
        n.vx = 0;
        n.vy = 0;
        continue;
      }

      // Root node sticks near center
      if (n.isRoot) {
        n.vx += (cx - n.x) * 0.05;
        n.vy += (cy - n.y) * 0.05;
      } else {
        n.vx += (cx - n.x) * centerGravity;
        n.vy += (cy - n.y) * centerGravity;
      }

      n.vx *= damping;
      n.vy *= damping;

      n.x += n.vx * timeStep;
      n.y += n.vy * timeStep;
    }

    // 4. Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
      }
    }
  }

  // =========================================================
  // Canvas Render Loop
  // =========================================================
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save();
    this.ctx.translate(this.camera.x, this.camera.y);
    this.ctx.scale(this.camera.zoom, this.camera.zoom);

    // Draw Subtle Grid Dots
    this.drawBackgroundGrid();

    // 1. Draw Synapse Edges
    this.ctx.lineWidth = 1.2;
    for (let i = 0; i < this.edges.length; i++) {
      const { source, target } = this.edges[i];
      const isHighlighted = (this.hoveredNode && (this.hoveredNode === source || this.hoveredNode === target));

      this.ctx.beginPath();
      this.ctx.moveTo(source.x, source.y);
      this.ctx.lineTo(target.x, target.y);

      if (isHighlighted) {
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.7)';
        this.ctx.lineWidth = 2;
      } else {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        this.ctx.lineWidth = 1;
      }
      this.ctx.stroke();
    }

    // 2. Draw Synapse Flow Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const { source, target } = p.edge;
      const px = source.x + (target.x - source.x) * p.progress;
      const py = source.y + (target.y - source.y) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // 3. Draw Nodes
    const now = Date.now();
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const isHovered = (n === this.hoveredNode);
      const isRoot = n.isRoot;

      // Root Pulsing Ring
      if (isRoot) {
        const pulse = (Math.sin(now * 0.003) + 1) / 2;
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.size + 8 + pulse * 6, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(0, 255, 136, ${0.4 + pulse * 0.4})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }

      // Node Glow
      this.ctx.save();
      this.ctx.shadowColor = n.color;
      this.ctx.shadowBlur = isHovered ? 25 : (isRoot ? 20 : 12);

      // Node Circle
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      this.ctx.fillStyle = n.color;
      this.ctx.fill();

      // Inner Core
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.size * 0.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fill();
      this.ctx.restore();

      // Node Label
      this.ctx.save();
      this.ctx.font = '10px "Fira Code", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      const label = n.label;
      const textWidth = this.ctx.measureText(label).width;
      const labelY = n.y + n.size + 12;

      // Label background pill
      this.ctx.fillStyle = isHovered ? 'rgba(0, 255, 136, 0.2)' : 'rgba(10, 15, 22, 0.75)';
      this.ctx.strokeStyle = isHovered ? '#00FF88' : 'rgba(255, 255, 255, 0.1)';
      this.ctx.lineWidth = 1;

      this.ctx.beginPath();
      this.ctx.roundRect(n.x - textWidth / 2 - 6, labelY - 7, textWidth + 12, 14, 4);
      this.ctx.fill();
      this.ctx.stroke();

      // Label text
      this.ctx.fillStyle = isHovered ? '#00FF88' : (isRoot ? '#00FF88' : '#CBD5E1');
      this.ctx.fillText(label, n.x, labelY);
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  drawBackgroundGrid() {
    const spacing = 40;
    const startX = -this.camera.x / this.camera.zoom;
    const startY = -this.camera.y / this.camera.zoom;
    const endX = startX + this.width / this.camera.zoom;
    const endY = startY + this.height / this.camera.zoom;

    const firstX = Math.floor(startX / spacing) * spacing;
    const firstY = Math.floor(startY / spacing) * spacing;

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let x = firstX; x < endX; x += spacing) {
      for (let y = firstY; y < endY; y += spacing) {
        this.ctx.fillRect(x, y, 1.2, 1.2);
      }
    }
  }

  startLoop() {
    const loop = () => {
      this.stepSimulation();
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // =========================================================
  // User Input & Interactions
  // =========================================================
  bindEvents() {
    this.canvas.addEventListener('mousedown', e => {
      const mouse = this.getCanvasMouse(e);
      const clicked = this.findNodeAt(mouse.x, mouse.y);

      if (clicked) {
        this.draggedNode = clicked;
        if (this.onNodeClick) this.onNodeClick(clicked);
      } else {
        this.isDragging = true;
        this.dragStart = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mousemove', e => {
      const rect = this.canvas.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        if (!this.isDragging && !this.draggedNode) return;
      }

      const mouse = this.getCanvasMouse(e);

      if (this.draggedNode) {
        this.draggedNode.x = mouse.x;
        this.draggedNode.y = mouse.y;
        this.draggedNode.vx = 0;
        this.draggedNode.vy = 0;
      } else if (this.isDragging) {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        this.camera.x += dx;
        this.camera.y += dy;
        this.dragStart = { x: e.clientX, y: e.clientY };
      } else {
        const hovered = this.findNodeAt(mouse.x, mouse.y);
        this.hoveredNode = hovered;
        this.canvas.style.cursor = hovered ? 'pointer' : 'grab';
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.draggedNode = null;
    });

    this.canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const mouse = this.getCanvasMouse(e);

      const newZoom = Math.max(0.3, Math.min(3.0, this.camera.zoom * zoomFactor));

      // Zoom towards mouse pointer
      this.camera.x = mouse.screenX - (mouse.screenX - this.camera.x) * (newZoom / this.camera.zoom);
      this.camera.y = mouse.screenY - (mouse.screenY - this.camera.y) * (newZoom / this.camera.zoom);
      this.camera.zoom = newZoom;
    }, { passive: false });
  }

  getCanvasMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    return {
      screenX,
      screenY,
      x: (screenX - this.camera.x) / this.camera.zoom,
      y: (screenY - this.camera.y) / this.camera.zoom
    };
  }

  findNodeAt(x, y) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      const dist = Math.hypot(n.x - x, n.y - y);
      if (dist <= n.size + 10) {
        return n;
      }
    }
    return null;
  }
}
