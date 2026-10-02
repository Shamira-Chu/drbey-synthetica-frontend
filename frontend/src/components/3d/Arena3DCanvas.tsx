'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TrackRadar } from '@/components/3d/TrackRadar';
import { InspectionModal, InspectionData } from '@/components/3d/InspectionModal';

const INSPECTION_POINTS: InspectionData[] = [
  {
    id: 'jammer',
    title: 'Jammer & Cover de Capacete Glossy com Estrela',
    category: 'Posição',
    subtitle: 'Capacete de Jammer em vidro líquido temperado e capa de estrela iridescente',
    badge: 'Ataque // Jammer Glossy',
    description:
      'A jammer é a única atleta que pontua na partida, ultrapassando quadris das bloqueadoras adversárias. O helmet cover com a estrela holográfica identifica a líder de jam na pista.',
    specifications: [
      { label: 'Velocidade Média', value: '42 km/h na arrancada' },
      { label: 'Capacete Glossy', value: 'Vidro Líquido CPSC com refletor dicróico' },
      { label: 'Pontuação', value: '1 ponto por bloqueadora ultrapassada' },
    ],
    takeaways: [
      'O passe de estrela permite transferir a função de jammer para a pivô.',
      'O Jammer Lead tem o poder de encerrar o jam a qualquer momento.',
    ],
  },
  {
    id: 'pivo',
    title: 'Linha de Pivô & Apito Glossy',
    category: 'Tática',
    subtitle: 'A pivo comanda a velocidade e a formação do pack defensivo',
    badge: 'Controle // Pivô',
    description:
      'A pivô veste a faixa com a listra central. Ela dita o ritmo da parece de bloqueio, avisa sobre a aproximação da jammer e pode receber a estrela no passe de jammer.',
    specifications: [
      { label: 'Comunicação', value: 'Sinais de rádio no protetor auricular vidrado' },
      { label: 'Posicionamento', value: 'Frente do pack em curva 1 e 3' },
    ],
    takeaways: [
      'Coordenador direto do trípode na contenção de impactos.',
      'Garante a coesão do pack dentro dos 3 metros regulamentares.',
    ],
  },
  {
    id: 'sensores',
    title: 'Borda Externa & Sensores Ópticos Glossy',
    category: 'Tecnologia',
    subtitle: 'Sistema de varredura a laser para arbitragem assistida com refração',
    badge: 'Infraestrutura',
    description:
      'Varredores ópticos integrados na borda da pista detectam saídas ilegais e cortes em menos de 50 milissegundos, enviando retorno tátil instantâneo ao corpo de arbitragem.',
    specifications: [
      { label: 'Precisão', value: 'Sub-milimétrica (0.5mm)' },
      { label: 'Tempo de Resposta', value: '45ms' },
    ],
    takeaways: [
      'Elimina divergências visuais em saídas de curva em alta velocidade.',
      'Mantém o julgamento humano para faltas corporais de contato.',
    ],
  },
  {
    id: 'broadcast',
    title: 'Domo 360° & Câmeras Glossy',
    category: 'Mídia',
    subtitle: 'Transmissão imersiva com áudio direcional de impacto',
    badge: 'Transmissão',
    description:
      'Câmeras orbitalmente suspensas sobre a pista capturam os bouts em resolução 8K 120fps com captação sonora de atrito das rodas e voz dos juízes.',
    specifications: [
      { label: 'Resolução', value: '8K Volumétrico Domo 360°' },
      { label: 'Áudio', value: 'Spatial Binaural Floor Mics' },
    ],
    takeaways: [
      'Transmissão aberta e acessível para ligas de todo o continente.',
    ],
  },
];

type Viewpoint = 'firstPerson' | 'drone' | 'overview' | 'dome';

export const Arena3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<InspectionData | null>(null);
  const [currentView, setCurrentView] = useState<Viewpoint>('overview');
  const [audioMuted, setAudioMuted] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const crystalRef = useRef<THREE.Mesh | null>(null);
  const floatingBubblesRef = useRef<THREE.Mesh[]>([]);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 11, 21));

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x050611);
    scene.fog = new THREE.FogExp2(0x050611, 0.02);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 11, 21);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lights (Studio Glossy Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4, 35);
    cyanLight.position.set(-12, 10, 8);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xff2e97, 4, 35);
    magentaLight.position.set(12, 10, -8);
    scene.add(magentaLight);

    const violetLight = new THREE.PointLight(0xa855f7, 3, 30);
    violetLight.position.set(0, 18, 0);
    scene.add(violetLight);

    // 5. Track Oval Floor with Glossy Mirror Specular
    const trackGroup = new THREE.Group();

    // Outer Track Ring
    const outerTrackGeo = new THREE.RingGeometry(11.8, 12, 64);
    const outerTrackMat = new THREE.MeshBasicMaterial({
      color: 0xff2e97,
      side: THREE.DoubleSide,
    });
    const outerRing = new THREE.Mesh(outerTrackGeo, outerTrackMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = 0.01;
    trackGroup.add(outerRing);

    // Inner Track Ring
    const innerTrackGeo = new THREE.RingGeometry(7.8, 8, 64);
    const innerTrackMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
    });
    const innerRing = new THREE.Mesh(innerTrackGeo, innerTrackMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.01;
    trackGroup.add(innerRing);

    // Glossy Floor
    const floorGeo = new THREE.PlaneGeometry(38, 38);
    const floorMat = new THREE.MeshPhysicalMaterial({
      color: 0x080a1c,
      roughness: 0.1,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    trackGroup.add(floor);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(40, 40, 0x00f0ff, 0x181c3e);
    gridHelper.position.y = 0.02;
    trackGroup.add(gridHelper);

    scene.add(trackGroup);

    // 6. Central Glossy Liquid Glass Star Gem (Wannathis Style Glass Physical Material)
    const crystalGeo = new THREE.OctahedronGeometry(2.4, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92, // Glass transparency
      opacity: 1.0,
      transparent: true,
      roughness: 0.05,
      metalness: 0.05,
      ior: 1.6, // Glass Index of Refraction
      thickness: 2.2,
      attenuationColor: new THREE.Color(0x00f0ff),
      attenuationDistance: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xff2e97),
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.set(0, 4.6, 0);
    crystalRef.current = crystal;
    scene.add(crystal);

    // Wireframe Outer Cage in Cyan Iridescence
    const wireGeo = new THREE.OctahedronGeometry(3.0, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    wireCage.position.set(0, 4.6, 0);
    crystal.add(wireCage);

    // 7. Floating Glossy Soap-Bubble Spheres (Wannathis Signature Asset)
    const bubbleGroup = new THREE.Group();
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 0.9,
      transparent: true,
      roughness: 0.02,
      metalness: 0.1,
      ior: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
      specularColor: new THREE.Color(0xa855f7),
    });

    const bubbles: THREE.Mesh[] = [];
    const bubbleCoords = [
      { x: -7, y: 3.5, z: 4, r: 0.8 },
      { x: 8, y: 5.0, z: -3, r: 1.1 },
      { x: -5, y: 6.2, z: -6, r: 0.9 },
      { x: 6, y: 3.8, z: 7, r: 0.7 },
      { x: 0, y: 8.5, z: -2, r: 1.3 },
    ];

    bubbleCoords.forEach((b) => {
      const geo = new THREE.SphereGeometry(b.r, 32, 32);
      const mesh = new THREE.Mesh(geo, bubbleMat);
      mesh.position.set(b.x, b.y, b.z);
      bubbleGroup.add(mesh);
      bubbles.push(mesh);
    });

    floatingBubblesRef.current = bubbles;
    scene.add(bubbleGroup);

    // 8. Low-Poly Grandstands with Glossy Color Blocks
    const grandstandGroup = new THREE.Group();
    const colors = [0x00f0ff, 0xff2e97, 0xa855f7, 0xffb800, 0x10b981];

    for (let i = -14; i <= 14; i += 2) {
      const boxGeo = new THREE.BoxGeometry(1.2, 1.5 + Math.abs(i) * 0.1, 1.2);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[Math.abs(i) % colors.length],
        roughness: 0.3,
        metalness: 0.3,
      });
      const boxLeft = new THREE.Mesh(boxGeo, mat);
      boxLeft.position.set(-16, (1.5 + Math.abs(i) * 0.1) / 2, i);
      grandstandGroup.add(boxLeft);

      const boxRight = new THREE.Mesh(boxGeo, mat);
      boxRight.position.set(16, (1.5 + Math.abs(i) * 0.1) / 2, i);
      grandstandGroup.add(boxRight);
    }
    scene.add(grandstandGroup);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Glossy Glass Crystal
      if (crystalRef.current) {
        crystalRef.current.rotation.y = elapsedTime * 0.55;
        crystalRef.current.rotation.x = Math.sin(elapsedTime * 0.35) * 0.2;
        crystalRef.current.position.y = 4.6 + Math.sin(elapsedTime * 1.5) * 0.35;
      }

      // Animate Glossy Soap-Bubble Spheres
      floatingBubblesRef.current.forEach((bubble, idx) => {
        meshBob(bubble, elapsedTime, idx);
      });

      // Lerp camera
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.045);
        cameraRef.current.lookAt(0, 2, 0);
      }

      renderer.render(scene, camera);
    };

    function meshBob(mesh: THREE.Mesh, time: number, index: number) {
      mesh.position.y += Math.sin(time * 1.8 + index) * 0.008;
      mesh.rotation.y += 0.01;
    }

    animate();

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const changeView = (view: Viewpoint) => {
    setCurrentView(view);
    switch (view) {
      case 'firstPerson':
        targetCamPos.current.set(0, 2.2, 10);
        break;
      case 'drone':
        targetCamPos.current.set(12, 18, 12);
        break;
      case 'dome':
        targetCamPos.current.set(0, 28, 0.1);
        break;
      case 'overview':
      default:
        targetCamPos.current.set(0, 11, 21);
        break;
    }
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[650px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_12px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)] bg-[#050611]">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner Ticker Ribbon (Identical to Game Banner) */}
      <div className="absolute top-0 inset-x-0 bg-[#0A0C20]/90 backdrop-blur-md border-b border-cyan-500/30 overflow-hidden py-1.5 z-20">
        <div className="animate-ticker text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-cyan-300 font-medium whitespace-nowrap">
          <span className="mx-6">★ SYNTHETICA ARENA GLOSSY</span>
          <span className="mx-6 text-pink-400">«|||» TRANSMISSÃO AO VIVO</span>
          <span className="mx-6 text-amber-400">DOMO 360°</span>
          <span className="mx-6 text-violet-400">FLAT TRACK DERBY 2047</span>
          <span className="mx-6">★ SYNTHETICA ARENA GLOSSY</span>
          <span className="mx-6 text-pink-400">«|||» TRANSMISSÃO AO VIVO</span>
          <span className="mx-6 text-amber-400">DOMO 360°</span>
          <span className="mx-6 text-violet-400">FLAT TRACK DERBY 2047</span>
        </div>
      </div>

      {/* Top Right Track Radar Overlay */}
      <div className="absolute top-10 right-4 z-20 hidden md:block">
        <TrackRadar compact />
      </div>

      {/* Camera View Controls */}
      <div className="absolute top-10 left-4 z-20 flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#0A0C20]/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono shadow-lg">
        <button
          type="button"
          onClick={() => changeView('firstPerson')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'firstPerson'
              ? 'bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(0,240,255,0.8)]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          1ª Pessoa
        </button>
        <button
          type="button"
          onClick={() => changeView('drone')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'drone'
              ? 'bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(0,240,255,0.8)]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          Drone
        </button>
        <button
          type="button"
          onClick={() => changeView('overview')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'overview'
              ? 'bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(0,240,255,0.8)]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          Pontos de Vista
        </button>
        <button
          type="button"
          onClick={() => changeView('dome')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'dome'
              ? 'bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(0,240,255,0.8)]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          Domo 360°
        </button>
        <button
          type="button"
          onClick={() => setAudioMuted(!audioMuted)}
          className="p-1 rounded-full text-white/70 hover:text-cyan-400 ml-1"
          title="Alternar Áudio"
        >
          {audioMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Floating Center Interactive Prompt Card */}
      <div className="absolute bottom-16 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-20">
        <div className="glossy-card p-4 bg-[#0A0C20]/90 border border-pink-500/50 shadow-[0_0_30px_rgba(255,46,151,0.3)] flex items-center gap-3 max-w-md mx-auto">
          <span className="w-8 h-8 rounded-full bg-pink-500 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 shadow-[0_0_12px_rgba(255,46,151,0.6)]">
            E
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-pink-400 block">
              PRESSIONE [E] OU TOQUE PARA INSPECCIONAR
            </span>
            <span className="text-xs sm:text-sm font-display font-semibold text-white truncate block">
              Jammer & Star Helmet Cover Glossy
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPoint(INSPECTION_POINTS[0])}
            className="glossy-btn glossy-btn-magenta text-[10px] px-3.5 py-1.5 whitespace-nowrap"
          >
            Inspecionar
          </button>
        </div>
      </div>

      {/* Quick Inspection Nodes Selector Bar */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 overflow-x-auto max-w-full p-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono">
        {INSPECTION_POINTS.map((pt) => (
          <button
            key={pt.id}
            type="button"
            onClick={() => setSelectedPoint(pt)}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white/90 hover:text-cyan-300 border border-white/20 hover:border-cyan-400 transition-colors whitespace-nowrap"
          >
            💎 {pt.title.split('&')[0]}
          </button>
        ))}
      </div>

      <InspectionModal
        data={selectedPoint}
        onClose={() => setSelectedPoint(null)}
      />
    </div>
  );
};
