// =========================================================
// Connect AI & Dashboard Interaction App
// =========================================================

document.addEventListener('DOMContentLoaded', async () => {
  const topology = new TopologyGraph('topologyCanvas');

  // Load Graph Data
  try {
    const res = await fetch('/api/graph');
    if (res.ok) {
      const data = await res.json();
      topology.setData(data);
    } else {
      // Fallback sample data if standalone
      loadFallbackData(topology);
    }
  } catch (e) {
    loadFallbackData(topology);
  }

  // Auto fit view after load
  setTimeout(() => topology.fitView(), 300);

  // UI Elements
  const chatStream = document.getElementById('chatStream');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const brainBtn = document.getElementById('brainBtn');
  const brainDropdown = document.getElementById('brainDropdown');
  const menuViewTopology = document.getElementById('menuViewTopology');
  const menuToggleMode = document.getElementById('menuToggleMode');
  const menuRefreshGit = document.getElementById('menuRefreshGit');
  const menuChangeGit = document.getElementById('menuChangeGit');
  const knowledgeModeBadge = document.getElementById('knowledgeModeBadge');
  const btnFit = document.getElementById('btnFit');
  const btnRandomNode = document.getElementById('btnRandomNode');
  const btnPulse = document.getElementById('btnPulse');
  const injectCombatBtn = document.getElementById('injectCombatBtn');
  const injectCustomBtn = document.getElementById('injectCustomBtn');
  const syncGitBtn = document.getElementById('syncGitBtn');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const nodeModal = document.getElementById('nodeModal');
  const modalClose = document.getElementById('modalClose');

  // Brain Dropdown Toggle
  brainBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    brainDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!brainDropdown.contains(e.target) && e.target !== brainBtn) {
      brainDropdown.classList.remove('active');
    }
  });

  // Dropdown Menu 1: View Topology
  menuViewTopology.addEventListener('click', () => {
    brainDropdown.classList.remove('active');
    topology.fitView();
    topology.pulseAll();
  });

  // Dropdown Menu 2: Toggle Knowledge Mode
  let isKnowledgeOn = true;
  menuToggleMode.addEventListener('click', () => {
    isKnowledgeOn = !isKnowledgeOn;
    if (isKnowledgeOn) {
      knowledgeModeBadge.className = 'badge-status-on';
      knowledgeModeBadge.textContent = '🟢 ON';
    } else {
      knowledgeModeBadge.className = 'badge-status-off';
      knowledgeModeBadge.textContent = '🔴 OFF';
    }
  });

  // Dropdown Menu 3: Refresh Git
  menuRefreshGit.addEventListener('click', () => {
    brainDropdown.classList.remove('active');
    topology.pulseAll();
    const timeStr = getCurrentTime();
    const refreshGroup = document.createElement('div');
    refreshGroup.className = 'message-group ai-group';
    refreshGroup.innerHTML = `
      <div class="avatar-badge ai-badge">+</div>
      <div class="message-meta">
        <span class="sender-name">Connect AI</span>
        <span class="timestamp">${timeStr}</span>
      </div>
      <div class="sync-card">
        <span class="sync-icon">🔄</span>
        <span class="sync-text"><strong>[P-Reinforce Refresh]</strong> 원격 저장소(<code>wonseokjung/p-reinforce-wiki.git</code>) 최신 지식을 동기화했습니다.</span>
      </div>
    `;
    chatStream.appendChild(refreshGroup);
    chatStream.scrollTop = chatStream.scrollHeight;
  });

  // Dropdown Menu 4: Change Git
  menuChangeGit.addEventListener('click', () => {
    brainDropdown.classList.remove('active');
    const newUrl = prompt("새로운 깃허브 지식 저장소 URL을 입력하세요:", "https://github.com/wonseokjung/p-reinforce-wiki.git");
    if (newUrl) {
      document.getElementById('currentGitRepo').textContent = newUrl.split('/').pop();
      alert(`지식 저장소가 ${newUrl} 로 변경되었습니다!`);
    }
  });

  // Node Click -> Open Karpathy Wiki Modal
  topology.onNodeClick = (node) => {
    document.getElementById('modalCategory').textContent = node.category || 'Topics';
    document.getElementById('modalTitle').textContent = node.label;
    document.getElementById('modalUuid').textContent = (node.id.length > 12) ? node.id.substring(0, 12) : node.id;
    document.getElementById('modalConfidence').textContent = (88 + Math.floor(Math.random() * 11)) + '.' + Math.floor(Math.random() * 9) + '%';
    document.getElementById('modalSummary').textContent = node.summary || `${node.label}에 대한 핵심 지식 및 추출된 패턴 요약입니다.`;

    // Connected synapses
    const connected = topology.edges
      .filter(e => e.source === node || e.target === node)
      .map(e => (e.source === node ? e.target.label : e.source.label));

    const synapseListEl = document.getElementById('modalSynapses');
    synapseListEl.innerHTML = '';
    if (connected.length === 0) {
      synapseListEl.innerHTML = '<li>연결된 시냅스 없음</li>';
    } else {
      connected.forEach(lbl => {
        const li = document.createElement('li');
        li.textContent = `[[${lbl}]]`;
        synapseListEl.appendChild(li);
      });
    }

    nodeModal.classList.add('active');
  };

  modalClose.addEventListener('click', () => {
    nodeModal.classList.remove('active');
  });

  // Toolbar Actions
  btnFit.addEventListener('click', () => topology.fitView());
  btnPulse.addEventListener('click', () => topology.pulseAll());

  btnRandomNode.addEventListener('click', () => {
    injectNewKnowledge('Prompt_Autonomous_Evolution', 'Skills', '#7B61FF', '프롬프트의 자율 진화 및 피드백 루프 자동화 엔진입니다.');
  });

  // Inject Combat AI Button Action
  injectCombatBtn.addEventListener('click', () => {
    playMatrixDownloadSequence('Sample Pack / Combat AI', () => {
      topology.focusNode('combat_ai');
      topology.pulseAll();
    });
  });

  // Inject Custom Knowledge Button Action
  injectCustomBtn.addEventListener('click', () => {
    const titles = [
      { label: 'Agentic_Workflow_Patterns', cat: 'Topics', color: '#00D4FF', desc: '다중 에이전트 협업 및 라우팅 오케스트레이션 패턴.' },
      { label: 'Karpathy_Memory_Synthesizer', cat: 'Skills', color: '#7B61FF', desc: '원시 메모리 파편을 영속적 지식 베이스로 압축하는 합성기.' },
      { label: 'Neural_Synapse_Optimizer', cat: 'Decisions', color: '#FF5555', desc: '지식 그래프 간 연결 강도를 최적화하는 보상 함수 결정.' },
      { label: 'Growth_Hacking_Engine_v3', cat: 'Projects', color: '#FFAA00', desc: '자동 콘텐츠 배포 및 바이럴 트래픽 분석 파이프라인.' }
    ];
    const picked = titles[Math.floor(Math.random() * titles.length)];
    playMatrixDownloadSequence(picked.label, () => {
      injectNewKnowledge(picked.label, picked.cat, picked.color, picked.desc);
    });
  });

  // P-Reinforce Sync Button Action
  syncGitBtn.addEventListener('click', () => {
    const timeStr = getCurrentTime();
    const syncGroup = document.createElement('div');
    syncGroup.className = 'message-group ai-group';
    syncGroup.innerHTML = `
      <div class="avatar-badge ai-badge">+</div>
      <div class="message-meta">
        <span class="sender-name">Connect AI</span>
        <span class="timestamp">${timeStr}</span>
      </div>
      <div class="sync-card">
        <span class="sync-icon">🚀</span>
        <span class="sync-text"><strong>[P-Reinforce Sync]</strong> 로컬 위키(${topology.nodes.length}개 노드, ${topology.edges.length}개 시냅스)를 GitHub 원격 두뇌에 <strong>[Commit: ${Math.random().toString(16).substring(2, 9)}]</strong>으로 성공적으로 동기화했습니다.</span>
      </div>
    `;
    chatStream.appendChild(syncGroup);
    chatStream.scrollTop = chatStream.scrollHeight;
    topology.pulseAll();
  });

  // Clear Chat Logs
  clearChatBtn.addEventListener('click', () => {
    chatStream.innerHTML = '';
  });

  // Chat Input Send
  const handleSend = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const timeStr = getCurrentTime();
    
    // Append User Bubble
    const userGroup = document.createElement('div');
    userGroup.className = 'message-group user-group';
    userGroup.innerHTML = `
      <div class="avatar-badge user-badge">👤</div>
      <div class="message-meta">
        <span class="sender-name">You</span>
        <span class="timestamp">${timeStr}</span>
      </div>
      <div class="user-bubble">${escapeHtml(text)}</div>
    `;
    chatStream.appendChild(userGroup);
    chatInput.value = '';
    chatStream.scrollTop = chatStream.scrollHeight;

    // Simulate AI Response with knowledge awareness
    setTimeout(() => {
      const aiGroup = document.createElement('div');
      aiGroup.className = 'message-group ai-group';
      aiGroup.innerHTML = `
        <div class="avatar-badge ai-badge">+</div>
        <div class="message-meta">
          <span class="sender-name">Connect AI</span>
          <span class="timestamp">${getCurrentTime()}</span>
        </div>
        <div class="ai-bubble">
          대표님, 현재 토폴로지에 연결된 <strong>${topology.nodes.length}개의 지식 노드</strong>와 <strong>${topology.edges.length}개의 시냅스</strong>를 기반으로 분석을 마쳤습니다. 요청하신 지식에 대해 즉시 자율 정원사(P-Reinforce) 프로세스를 가동합니다! 🫡
        </div>
      `;
      chatStream.appendChild(aiGroup);
      chatStream.scrollTop = chatStream.scrollHeight;
      topology.pulseAll();
    }, 600);
  };

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // =========================================================
  // Matrix Downloader Animation Sequence
  // =========================================================
  function playMatrixDownloadSequence(packName, onComplete) {
    const timeStr = getCurrentTime();
    const group = document.createElement('div');
    group.className = 'message-group ai-group';

    const card = document.createElement('div');
    card.className = 'matrix-terminal-card';
    card.innerHTML = `
      <div class="log-line">[SYSTEM] MATRIX UPLINK ESTABLISHED...</div>
      <div class="log-line highlight">[SYSTEM] DOWNLOADING BRAIN PACK: ${packName}</div>
      <div class="log-line progress">
        <span class="bar">[SYSTEM] <span class="ascii-bar">██</span> <span class="num">15</span>%</span>
      </div>
    `;

    group.innerHTML = `
      <div class="avatar-badge ai-badge">+</div>
      <div class="message-meta">
        <span class="sender-name">Connect AI</span>
        <span class="timestamp">${timeStr}</span>
      </div>
    `;
    group.appendChild(card);
    chatStream.appendChild(group);
    chatStream.scrollTop = chatStream.scrollHeight;

    const barEl = card.querySelector('.ascii-bar');
    const numEl = card.querySelector('.num');

    let percent = 15;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 25) + 15;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        barEl.textContent = '████████████████';
        numEl.textContent = '100';

        const successLine = document.createElement('div');
        successLine.className = 'log-line success';
        successLine.textContent = '[SYSTEM] KNOWLEDGE INJECTED TO LOCAL NEURAL NET';
        card.appendChild(successLine);

        // Append Neo Quote
        setTimeout(() => {
          const neoGroup = document.createElement('div');
          neoGroup.className = 'message-group ai-group';
          neoGroup.innerHTML = `
            <div class="avatar-badge ai-badge">+</div>
            <div class="message-meta">
              <span class="sender-name">Connect AI</span>
              <span class="timestamp">${getCurrentTime()}</span>
            </div>
            <div class="ai-bubble">
              I know ${packName}. Ask me anything related to this.
            </div>
          `;
          chatStream.appendChild(neoGroup);
          chatStream.scrollTop = chatStream.scrollHeight;

          if (onComplete) onComplete();
        }, 400);

      } else {
        const blocks = Math.floor((percent / 100) * 16);
        barEl.textContent = '█'.repeat(blocks);
        numEl.textContent = percent;
      }
    }, 180);
  }

  function injectNewKnowledge(title, cat, color, summary) {
    const newId = `node_${Date.now()}`;
    const connectedTargets = ['root'];

    // Connect to 1-2 random related nodes
    if (topology.nodes.length > 2) {
      const rand1 = topology.nodes[1 + Math.floor(Math.random() * (topology.nodes.length - 1))];
      if (rand1 && rand1.id !== 'root') connectedTargets.push(rand1.id);
    }

    topology.addDynamicNode({
      id: newId,
      label: title,
      category: cat,
      color: color,
      size: 13,
      summary: summary
    }, connectedTargets);

    // Also trigger P-Reinforce Sync Card
    setTimeout(() => {
      const syncGroup = document.createElement('div');
      syncGroup.className = 'message-group ai-group';
      syncGroup.innerHTML = `
        <div class="avatar-badge ai-badge">+</div>
        <div class="message-meta">
          <span class="sender-name">Connect AI</span>
          <span class="timestamp">${getCurrentTime()}</span>
        </div>
        <div class="sync-card">
          <span class="sync-icon">✨</span>
          <span class="sync-text"><strong>[P-Reinforce Synapse]</strong> <code>[[${title}]]</code> 노드가 실시간 토폴로지에 결합되었습니다. (총 ${topology.nodes.length}개 노드)</span>
        </div>
      `;
      chatStream.appendChild(syncGroup);
      chatStream.scrollTop = chatStream.scrollHeight;
    }, 300);
  }

  function getCurrentTime() {
    const d = new Date();
    const hours = d.getHours();
    const period = hours >= 12 ? '오후' : '오전';
    const h12 = hours % 12 || 12;
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${period} ${String(h12).padStart(2, '0')}:${m}`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function loadFallbackData(topo) {
    // Fallback embedded dataset
    topo.setData({
      nodes: [
        { id: "root", label: "Workspace Root", category: "root", color: "#00FF88", size: 18, summary: "P-Reinforce 메인 루트 저장소" },
        { id: "combat_ai", label: "Sample_Pack_Combat", category: "Topics", color: "#00D4FF", size: 14, summary: "Combat AI 및 전술적 프롬프트 패턴" },
        { id: "proj_manual", label: "직접-새로운_프로젝트지정방법", category: "Topics", color: "#00D4FF", size: 12, summary: "프로젝트 트리 생성 가이드" },
        { id: "exp_sync", label: "Experiments_Sync_Tag", category: "Projects", color: "#FFAA00", size: 13, summary: "실험 지식 동기화 프로세스" },
        { id: "prompt_inject", label: "Auto_Prompt_Injection_Technique", category: "Topics", color: "#00D4FF", size: 12, summary: "자율 지식 주입 기법" },
        { id: "eng_workflow", label: "Engineering_Prompt_Workflow", category: "Projects", color: "#FFAA00", size: 14, summary: "프롬프트 체인 워크플로우" }
      ],
      edges: [
        { source: "root", target: "combat_ai" },
        { source: "combat_ai", target: "prompt_inject" },
        { source: "combat_ai", target: "eng_workflow" },
        { source: "eng_workflow", target: "exp_sync" },
        { source: "combat_ai", target: "proj_manual" }
      ]
    });
  }
});
