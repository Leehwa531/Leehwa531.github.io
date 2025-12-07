// Main JavaScript File

// --- 1. Data Structures ---

// Project Data
// Project Data
const projects = [
    {
        title: "WatchOut: Vision AI × Wearable IoT 융합 기반의 실시간 산업 안전 관제 플랫폼",
        description: "ArcFace 기반의 고정밀 얼굴 식별 파이프라인과 Wear OS 네이티브 낙상 감지 모듈을 Kafka 이벤트 스트림으로 통합한 End-to-End 안전 솔루션",
        tags: ["Python / FastAPI", "Vision AI (ArcFace / ONNX)", "Wear OS (Kotlin)", "Apache Kafka", "Redis"],
        image: "https://placehold.co/800x600?text=WatchOut+Architecture", // Placeholder for now
        githubLink: "https://github.com", // Placeholder
        demoLink: "#",
        colSpan: "lg:col-span-2", // Default span

        // Detailed Info
        period: "2024.08 - 2024.10 (7주)",
        role: "Core System Architect & Full-Cycle Developer",
        summary: "단순한 관제 시스템을 넘어, <strong class='text-[#333] bg-[#fff3cd]'>'0.1초의 오차도 허용하지 않는 신뢰성'</strong>에 집중했습니다. Vision AI의 오인식 문제를 독자적인 알고리즘으로 해결하고, Kafka 파이프라인을 통해 이기종 센서 데이터를 0.5초 이내에 동기화하여 현장의 안전 골든타임을 확보했습니다.",
        contributions: [
            "속도와 정확도를 잡는 하이브리드 AI 파이프라인: 얼굴 감지는 고속 Caffe SSD로, 식별은 고정밀 ArcFace(ResNet-100)로 이원화 설계하여 실시간성(Latency ≤ 0.5s)과 식별 정확도를 동시에 확보",
            "보안 오탐(False Positive) 차단을 위한 'Gap Check' 알고리즘 개발: 단순 코사인 유사도 임계값의 한계를 극복하기 위해 Top-K(5명) 후보군을 분석하고, 1·2순위 간 거리 차(Gap ≥ 0.1)가 명확할 때만 인증하는 독자 검증 로직 구현",
            "Wear OS 네이티브 낙상 감지 및 생존성 확보: 화면 꺼짐(Doze Mode) 상태에서도 센서가 동작하도록 Health Services API와 PassiveListenerService를 활용해 백그라운드 프로세스 생존성을 보장하는 낙상 감지 모듈 개발",
            "Device-to-Server 실시간 데이터 파이프라인 구축: 워치의 센서 이벤트를 'Wearable Data Layer → 모바일 앱 → Kafka → 백엔드'로 유실 없이 전달하는 이벤트 기반 아키텍처(EDA) 설계 및 구현",
            "임베딩 Hot-Reloading 시스템: 운영 중단 없이 신규 작업자를 반영하기 위해, PostgreSQL의 임베딩 데이터를 주기적으로 Fetch하여 메모리 캐시를 갱신하는 무중단 동기화 메커니즘 적용"
        ],
        metrics: [
            {
                label: "보안 오탐(False Positive)",
                value: "0건",
                visual: 100,
                change: "Gap Check 도입 전 대비 100% 개선"
            },
            {
                label: "이벤트 처리 지연",
                value: "0.5s 미만",
                visual: 95,
                change: "Kafka 비동기 파이프라인 최적화"
            },
            {
                label: "임베딩 갱신 다운타임",
                value: "0초",
                visual: 100,
                change: "Hot-Reloading 아키텍처 적용"
            }
        ],
        techDecisions: [
            {
                stack: "Apache Kafka (Backend)",
                reason: "AI 추론 서버에서 발생하는 간헐적인 트래픽 스파이크가 메인 백엔드 서버(Spring Boot)의 성능을 저하시키지 않도록, 결합도를 낮추고 이벤트를 비동기로 완충(Buffering)하기 위해 도입했습니다."
            },
            {
                stack: "ArcFace (AI)",
                reason: "초기 MobileFaceNet 도입 시 유사 인물 오인식 문제가 발생했습니다. 안전 도메인에서는 '속도'보다 '신뢰성'이 최우선이라 판단하여, 연산 비용이 크더라도 정확도가 압도적인 ResNet-100 기반 ArcFace로 교체하는 Trade-off를 결정했습니다."
            },
            {
                stack: "Wear OS Native (Mobile)",
                reason: "현장 작업자의 격렬한 움직임과 장시간 사용 환경에서도 OS에 의해 센서 프로세스가 종료(Kill)되지 않아야 했습니다. 크로스 플랫폼 대신 안드로이드 네이티브의 'PassiveListenerService'를 사용하여 앱 생존성과 배터리 효율을 극대화했습니다."
            }
        ],
        troubleshooting: {
            title: "코사인 유사도 임계값의 한계와 'Gap Check' 알고리즘",
            situation: "등록된 작업자가 늘어날수록, 얼굴 특징이 미세하게 비슷한 타인을 본인으로 잘못 인식하는 False Positive(보안 오탐) 사례가 간헐적으로 발생했습니다.",
            actions: [
                {
                    title: "Attempt 1 (단일 임계값)",
                    result: "단순히 '유사도 ≥ 0.5'이면 통과시키는 로직 사용. → 타인(0.51)과 본인(0.52)의 미세한 차이를 구분하지 못함."
                },
                {
                    title: "Solution (이중 검증 로직 설계)",
                    result: "가장 유사한 상위 5명(Top-K)을 추출한 뒤, 1순위와 2순위 후보 간의 유사도 격차(Gap)를 확인하는 로직을 추가했습니다."
                }
            ],
            codeSnippet: `
# 1순위와 2순위의 유사도 차이(gap)가 0.1 이상일 때만 인증
top_k_candidates = find_top_k_matches(embedding, k=5)
best_match = top_k_candidates[0]
second_match = top_k_candidates[1]

gap = best_match.distance - second_match.distance

if best_match.distance < THRESHOLD and gap > 0.1:
    return authorize(best_match.user_id)
else:
    # 애매한 경우 'Unknown' 처리하여 오인식 원천 차단
    return None
`
        }
    }
];



// Tech Stack Data
const skillCategories = [
    {
        id: 'backend',
        title: '메인 요리 (Backend)',
        description: '깊은 맛이 우러나는 핵심 비법',
        icon: 'server', // Lucide icon name
        skills: [
            {
                name: 'Java 17',
                level: '장인 (Advanced)',
                percentage: 90,
                keywords: ['Stream API', 'Lambda', 'OOP'],
                desc: '객체지향의 원칙(SOLID)을 칼질하듯 정교하게 지키며, Java 17의 신선한 문법(Record, Switch Expression)을 활용해 담백한 코드를 요리합니다.',
                context: 'SSAFY 공통 프로젝트 핵심 로직 구현',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
            },
            {
                name: 'Spring Boot',
                level: '장인 (Advanced)',
                percentage: 85,
                keywords: ['Security', 'JPA', 'AOP'],
                desc: 'Spring Security라는 강력한 보존료로 보안을 책임지며, AOP를 통해 로깅과 예외처리를 깔끔하게 분리해냈습니다.',
                context: '관통 프로젝트 인증/인가 서버 구축',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
            },
            {
                name: 'JPA / QueryDSL',
                level: '숙련 (Intermediate)',
                percentage: 78,
                keywords: ['N+1 해결', 'Fetch Join', '동적 쿼리'],
                desc: '복잡한 데이터 조회도 QueryDSL 레시피로 깔끔하게 처리합니다. N+1 문제는 Fetch Join으로 시원하게 뚫어버립니다.',
                context: '커뮤니티 검색 기능 최적화',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg'
            },
            {
                name: 'MySQL',
                level: '숙련 (Intermediate)',
                percentage: 75,
                keywords: ['인덱싱', '정규화', '실행계획'],
                desc: '대용량 주문(트래픽)이 들어와도 당황하지 않도록 인덱싱과 실행 계획 분석으로 DB 성능을 최적의 상태로 유지합니다.',
                context: '데이터베이스 설계 및 튜닝',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
            },
        ]
    },
    {
        id: 'devops',
        title: '주방 설비 (DevOps)',
        description: '효율적인 서빙 시스템 구축',
        icon: 'terminal',
        skills: [
            {
                name: 'AWS',
                level: '숙련 (Intermediate)',
                percentage: 70,
                keywords: ['EC2', 'RDS', 'S3'],
                desc: '어디서든 맛볼 수 있도록 EC2에 가게를 차리고, Route53으로 간판을 달았습니다. HTTPS 보안 인증서도 갖췄습니다.',
                context: '배포 파이프라인 구축',
                img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
            },
            {
                name: 'Docker',
                level: '기본 (Basic)',
                percentage: 50,
                keywords: ['Compose', 'Container'],
                desc: '주방 환경을 컨테이너에 담아 어디서든 똑같은 맛을 낼 수 있도록 도커를 활용합니다.',
                context: '개발 환경 통일화',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
            },
            {
                name: 'Git / GitHub',
                level: '장인 (Advanced)',
                percentage: 85,
                keywords: ['Git Flow', '협업', 'PR'],
                desc: 'Git Flow라는 레시피북을 통해 팀원들과 레시피가 섞이지 않도록 관리합니다. 코드 리뷰로 맛을 검증합니다.',
                context: '팀 프로젝트 형상 관리',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
            },
        ]
    },
    {
        id: 'frontend',
        title: '플레이팅 (Frontend)',
        description: '보기 좋은 떡이 먹기도 좋다',
        icon: 'layout',
        skills: [
            {
                name: 'Vue.js',
                level: '기본 (Basic)',
                percentage: 40,
                keywords: ['Lifecycle', 'Axios', 'Pinia'],
                desc: '백엔드 요리가 손님에게 잘 전달되도록 기본적인 화면 구성을 할 수 있습니다. 비동기 통신(Axios)으로 주문을 처리합니다.',
                context: 'Admin 페이지 구현',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
            },
        ]
    }
];

// --- 2. State Management ---
let activeTab = 'menu'; // 'menu' | 'dashboard'
let expandedId = 'Spring Boot';

// --- 3. Rendering Functions ---

// Render Projects
function renderProjects() {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    projectGrid.innerHTML = '';

    projects.forEach((project) => {
        const card = document.createElement('div');
        card.className = `
            relative group overflow-hidden rounded-xl border-4 border-ink-black 
            min-h-96 flex flex-col justify-end p-6 
            transition-all duration-500 ease-in-out
            hover:shadow-[8px_8px_0px_0px_rgba(204,51,51,1)] 
            ${project.colSpan} col-span-1 cursor-pointer
        `;

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" 
                class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out
                       group-hover:blur-sm group-hover:brightness-[0.25]">
            
            <div class="relative z-10 flex flex-col justify-between h-full pointer-events-none">
                <div class="transform md:-translate-y-[500px] md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <h3 class="text-4xl md:text-5xl font-dohyeon text-paper-bg mb-2 leading-none">
                        ${project.title}
                    </h3>
                    <p class="text-xl md:text-2xl font-dohyeon text-stamp-red opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        ${project.tags.join(' / ')}
                    </p>
                    <p class="text-paper-bg/80 mt-4 text-sm md:text-base font-sans max-w-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        ${project.description}
                    </p>
                </div>

                <div class="flex justify-end transform md:translate-y-[200%] md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-200">
                    <button class="pointer-events-auto inline-block py-3 px-8 border-2 border-paper-bg text-paper-bg 
                              font-dohyeon text-xl rounded hover:bg-paper-bg hover:text-ink-black transition-colors duration-300">
                        상세 보기 (View Details)
                    </button>
                </div>
            </div>
        `;

        // Attach click listener safely
        card.addEventListener('click', () => openProjectModal(project));

        projectGrid.appendChild(card);
    });
}

// Render Tech Stack
function renderTechStack() {
    const container = document.getElementById('tech-stack');
    if (!container) return;

    // Header
    let html = `
        <div class="max-w-5xl mx-auto px-4">
            <div class="mb-12 text-center relative">
                <div class="inline-block relative">
                    <h1 class="text-5xl md:text-6xl font-dohyeon mb-4 relative z-10">
                        엄선된 재료와 비법
                    </h1>
                    <div class="absolute bottom-1 left-0 w-full h-4 bg-stamp-red/20 -z-0 -rotate-1"></div>
                </div>
                
                <p class="text-xl text-ink-black/80 mt-4 max-w-2xl mx-auto">
                    박가네 주방에서 사용하는 신선한 기술 스택과<br/>
                    직접 체득한 <strong>숙련도(Confidence)</strong> 현황판입니다.
                </p>

                <!-- Tabs -->
                <div class="flex flex-wrap justify-center gap-4 mt-10">
                    <button onclick="switchTab('menu')" class="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-dohyeon border-2 transition-all duration-300 transform hover:-translate-y-1 ${activeTab === 'menu' ? 'bg-ink-black text-white border-ink-black shadow-[4px_4px_0px_0px_rgba(204,51,51,1)]' : 'bg-paper-bg text-ink-black border-ink-black hover:shadow-[4px_4px_0px_0px_rgba(51,51,51,0.3)]'}">
                        <i data-lucide="book-open" class="w-5 h-5"></i>
                        상세 메뉴판 (List)
                    </button>
                    <button onclick="switchTab('dashboard')" class="flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-dohyeon border-2 transition-all duration-300 transform hover:-translate-y-1 ${activeTab === 'dashboard' ? 'bg-ink-black text-white border-ink-black shadow-[4px_4px_0px_0px_rgba(204,51,51,1)]' : 'bg-paper-bg text-ink-black border-ink-black hover:shadow-[4px_4px_0px_0px_rgba(51,51,51,0.3)]'}">
                        <i data-lucide="award" class="w-5 h-5"></i>
                        숙련도 현황 (Chart)
                    </button>
                </div>
            </div>
            
            <div class="relative">
                <!-- Background Decoration -->
                <div class="absolute -top-10 -left-10 w-24 h-24 border-4 border-ink-black/5 rounded-full blur-sm -z-10"></div>
                <div class="absolute top-1/2 -right-10 w-32 h-32 border-4 border-stamp-red/5 rounded-full blur-sm -z-10"></div>
    `;

    // Content
    if (activeTab === 'menu') {
        html += `<div class="space-y-12 animate-fade-in-up">`;
        skillCategories.forEach(cat => {
            html += `
                <div class="relative">
                    <div class="flex items-end gap-3 mb-6 border-b-2 border-ink-black pb-2">
                        <div class="p-2 bg-ink-black text-white rounded-md transform -rotate-2 shadow-sm">
                            <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-dohyeon">${cat.title}</h3>
                            <p class="text-ink-black/60 text-sm">${cat.description}</p>
                        </div>
                    </div>
                    
                    <div class="grid gap-4">
            `;

            cat.skills.forEach(skill => {
                const safeId = skill.name.replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase();
                const isExpanded = expandedId === safeId; // Use safeId for comparison if expandedId stores safeId, or store name and compare. 
                // Let's store safeId in expandedId for consistency.
                // Note: Initial expandedId is 'Spring Boot', so we need to match that or change initial state.
                // Let's just use the name for expandedId state but safeId for DOM IDs.
                const isExpandedState = expandedId === skill.name;
                const isMaster = skill.level.includes('장인');

                html += `
                    <div id="card-${safeId}" onclick="toggleAccordion('${skill.name}')" class="relative border-2 border-ink-black rounded-lg transition-all duration-300 cursor-pointer overflow-hidden bg-white ${isExpandedState ? 'shadow-[6px_6px_0px_0px_rgba(204,51,51,1)] translate-x-0 translate-y-0' : 'hover:shadow-[4px_4px_0px_0px_rgba(51,51,51,0.2)] hover:-translate-y-0.5'}">
                        <div class="p-5 flex items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 p-2 border border-ink-black/20 rounded-lg bg-paper-bg flex items-center justify-center">
                                    <img src="${skill.img}" alt="${skill.name}" class="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h4 class="text-xl font-dohyeon flex items-center gap-2">
                                        ${skill.name}
                                        ${isMaster ? '<i data-lucide="star" class="w-5 h-5 text-stamp-red fill-stamp-red animate-pulse"></i>' : ''}
                                    </h4>
                                    <div class="flex flex-wrap gap-2 mt-1">
                                        ${skill.keywords.map(k => `<span class="text-xs px-2 py-0.5 rounded-full border border-ink-black/30 bg-paper-bg text-ink-black/70 font-sans">#${k}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4">
                                <div class="hidden md:flex items-center justify-center w-16 h-16 border-4 rounded-full opacity-80 transform rotate-12 mask-image-grunge ${isMaster ? 'border-stamp-red text-stamp-red' : 'border-ink-black/40 text-ink-black/40'}">
                                    <span class="text-sm font-dohyeon text-center leading-tight">${isMaster ? '참잘함' : '이수'}</span>
                                </div>
                                <div id="icon-${safeId}" class="transition-transform duration-300 ${isExpandedState ? 'rotate-180' : ''}">
                                    <i data-lucide="chevron-down" class="w-6 h-6 ${isExpandedState ? 'text-stamp-red' : 'text-ink-black/40'}"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div id="content-${safeId}" class="border-t-2 border-dashed border-ink-black/20 bg-paper-bg/50 grid transition-all duration-300 ease-in-out ${isExpandedState ? 'grid-rows-[1fr] opacity-100 p-5' : 'grid-rows-[0fr] opacity-0 p-0'}">
                            <div class="overflow-hidden">
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 class="font-dohyeon text-lg mb-2 flex items-center gap-2 text-ink-black">
                                            <i data-lucide="book-open" class="w-4 h-4"></i> 사용 비법 (Usage)
                                        </h5>
                                        <p class="text-ink-black/80 leading-relaxed text-sm bg-white p-3 rounded border border-ink-black/10 shadow-sm">${skill.desc}</p>
                                    </div>
                                    <div>
                                        <h5 class="font-dohyeon text-lg mb-2 flex items-center gap-2 text-stamp-red">
                                            <i data-lucide="zap" class="w-4 h-4"></i> 적용 사례 (Context)
                                        </h5>
                                        <div class="bg-stamp-red/5 p-3 rounded border border-stamp-red/20 shadow-sm">
                                            <p class="text-ink-black/80 text-sm flex items-start gap-2">
                                                <i data-lucide="check-circle-2" class="w-4 h-4 mt-0.5 text-stamp-red shrink-0"></i>
                                                ${skill.context}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <div class="flex justify-between text-sm font-dohyeon mb-1">
                                        <span>숙련도 (Confidence)</span>
                                        <span>${skill.percentage}%</span>
                                    </div>
                                    <div class="h-4 w-full bg-white border-2 border-ink-black rounded-full p-0.5">
                                        <div class="h-full bg-stamp-red rounded-full transition-all duration-1000 ease-out" style="width: ${skill.percentage}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `</div></div>`;
        });
        html += `</div>`;
    } else {
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">`;
        skillCategories.forEach(cat => {
            html += `
                <div class="border-4 border-ink-black bg-white p-6 relative shadow-[8px_8px_0px_0px_rgba(51,51,51,0.2)]">
                    <div class="absolute top-2 left-2 w-2 h-2 rounded-full bg-ink-black/20"></div>
                    <div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-ink-black/20"></div>
                    <div class="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-ink-black/20"></div>
                    <div class="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-ink-black/20"></div>

                    <h3 class="text-2xl font-dohyeon mb-6 text-center border-b-2 border-ink-black pb-2">${cat.title}</h3>
                    <div class="space-y-6">
            `;

            cat.skills.forEach(skill => {
                html += `
                    <div>
                        <div class="flex justify-between items-end mb-1">
                            <span class="font-bold flex items-center gap-2">
                                <img src="${skill.img}" alt="" class="w-5 h-5" />
                                ${skill.name}
                            </span>
                            <span class="font-dohyeon text-stamp-red">${skill.percentage}%</span>
                        </div>
                        <div class="h-6 w-full bg-paper-bg border-2 border-ink-black relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent); background-size: 10px 10px"></div>
                            <div class="h-full border-r-2 border-ink-black transition-all duration-1000 ease-out flex items-center justify-end pr-2 ${skill.percentage >= 80 ? 'bg-stamp-red text-white' : 'bg-ink-black text-white'}" style="width: ${skill.percentage}%"></div>
                        </div>
                    </div>
                `;
            });

            html += `</div></div>`;
        });
        html += `</div>`;
    }

    html += `</div></div>`;
    container.innerHTML = html;

    // Initialize Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- 4. Interactions ---

function switchTab(tab) {
    activeTab = tab;
    renderTechStack();
}

function toggleAccordion(name) {
    const safeName = name.replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase();
    const currentExpandedSafeName = expandedId ? expandedId.replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase() : null;

    // Helper to toggle classes
    const toggleClasses = (id, isOpening) => {
        const card = document.getElementById(`card-${id}`);
        const content = document.getElementById(`content-${id}`);
        const iconContainer = document.getElementById(`icon-${id}`);
        const icon = iconContainer ? iconContainer.querySelector('svg') : null;

        if (card && content) {
            if (isOpening) {
                // Open
                card.classList.remove('hover:shadow-[4px_4px_0px_0px_rgba(51,51,51,0.2)]', 'hover:-translate-y-0.5');
                card.classList.add('shadow-[6px_6px_0px_0px_rgba(204,51,51,1)]', 'translate-x-0', 'translate-y-0');

                content.classList.remove('grid-rows-[0fr]', 'opacity-0', 'p-0');
                content.classList.add('grid-rows-[1fr]', 'opacity-100', 'p-5');

                if (iconContainer) iconContainer.classList.add('rotate-180');
                if (icon) {
                    icon.classList.remove('text-ink-black/40');
                    icon.classList.add('text-stamp-red');
                }
            } else {
                // Close
                card.classList.add('hover:shadow-[4px_4px_0px_0px_rgba(51,51,51,0.2)]', 'hover:-translate-y-0.5');
                card.classList.remove('shadow-[6px_6px_0px_0px_rgba(204,51,51,1)]', 'translate-x-0', 'translate-y-0');

                content.classList.add('grid-rows-[0fr]', 'opacity-0', 'p-0');
                content.classList.remove('grid-rows-[1fr]', 'opacity-100', 'p-5');

                if (iconContainer) iconContainer.classList.remove('rotate-180');
                if (icon) {
                    icon.classList.add('text-ink-black/40');
                    icon.classList.remove('text-stamp-red');
                }
            }
        }
    };

    // Close currently expanded if it exists and is different from clicked
    if (expandedId && expandedId !== name) {
        toggleClasses(currentExpandedSafeName, false);
    }

    // Toggle clicked item
    if (expandedId === name) {
        // Closing the same item
        toggleClasses(safeName, false);
        expandedId = null;
    } else {
        // Opening new item
        toggleClasses(safeName, true);
        expandedId = name;
    }
}

function copyEmail() {
    const email = "yours@email.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('이메일 복사에 실패했습니다. 직접 복사해주세요: ' + email);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    }, 3000);
}

// --- Awards & Activities Data ---
const awardsData = [
    {
        id: 1,
        title: 'SSAFY 1학기 관통 프로젝트',
        rank: '최우수상 (1위)',
        issuer: '삼성전자 / SSAFY',
        date: '2025.06',
        desc: '금융 API를 활용한 맞춤형 예적금 추천 서비스 개발. 팀장 및 백엔드 리드 수행.',
        icon: 'trophy',
        iconColor: 'text-yellow-600'
    },
    {
        id: 2,
        title: '동의대 캡스톤 디자인 경진대회',
        rank: '금상',
        issuer: '동의대학교 공과대학',
        date: '2024.11',
        desc: 'AI 기반 잔반 줄이기 프로젝트. 이미지 분석 서버 구축 및 데이터 모델링 담당.',
        icon: 'medal',
        iconColor: 'text-slate-400'
    }
];

const certsData = [
    {
        id: 1,
        title: '정보처리기사',
        type: '기사 (Engineer)',
        issuer: '한국산업인력공단',
        date: '2024.06.28',
        number: '24-B0-123456',
        birth: '990101',
        desc: '소프트웨어 설계/구현 역량 인증',
        themeColor: 'bg-[#2c3e50]',
        textColor: 'text-white'
    },
    {
        id: 2,
        title: 'SQLD',
        type: '국가공인 SQL 개발자',
        issuer: '한국데이터산업진흥원',
        date: '2023.12.15',
        number: 'SQLD-23-0987',
        birth: '990101',
        desc: 'DB 모델링 및 쿼리 작성 능력',
        themeColor: 'bg-[#8c7b75]',
        textColor: 'text-white'
    }
];

const activitiesData = [
    {
        id: 1,
        title: '삼성청년SW아카데미 (SSAFY) 13기',
        role: '교육생 (Java 전공)',
        period: '2025.01 - 현재',
        desc: '알고리즘 집중 교육 및 1600시간의 몰입형 코딩 교육 수료 중. 매주 2회 이상의 코드 리뷰와 3회의 팀 프로젝트 수행.',
        highlight: '현재 진행중',
        icon: 'code'
    },
    {
        id: 2,
        title: '동의대 알고리즘 소모임 "COTE"',
        role: '운영진 및 멘토',
        period: '2024.03 - 2024.12',
        desc: '후배들을 위한 알고리즘 튜터링 진행 (백준 골드 달성 5명 배출). 주 1회 모의 코딩테스트 출제 및 해설.',
        highlight: null,
        icon: 'users'
    },
    {
        id: 3,
        title: '부산 IT 연합 해커톤',
        role: '백엔드 개발자',
        period: '2023.08 (무박 2일)',
        desc: '부산 지역 대학생들과 협업하여 "부산 맛집 지도" API 서버를 24시간 내에 구축 및 배포.',
        highlight: null,
        icon: 'map-pin'
    },
    {
        id: 4,
        title: '동의대학교 컴퓨터공학과',
        role: '졸업',
        period: '2018.03 - 2025.02',
        desc: '컴퓨터 구조, 운영체제, 네트워크 등 CS 기초 심화 학습. 학점 4.0/4.5 졸업.',
        highlight: '학사 취득',
        icon: 'graduation-cap'
    }
];

let activeAwardsTab = 'awards';

function renderAwards() {
    const container = document.getElementById('awards');
    if (!container) return;

    const tabs = [
        { id: 'awards', label: '🏆 맛집 인증서', count: awardsData.length },
        { id: 'certs', label: '💳 국가 공인 면허', count: certsData.length },
        { id: 'activities', label: '👣 수련의 길', count: activitiesData.length }
    ];

    let html = `
        <div class="absolute inset-0 bg-pattern-dots pointer-events-none"></div>
        <div class="max-w-5xl mx-auto relative z-10 px-4">
            <!-- Header -->
            <div class="mb-12 text-center">
                <h1 class="text-4xl md:text-5xl font-dohyeon mb-4 relative inline-block animate-fade-in-up">
                    <span class="relative z-10">명예의 전당 & 수련 일지</span>
                    <div class="absolute bottom-1 left-0 w-full h-3 bg-stamp-red/20 -rotate-1"></div>
                </h1>
                <p class="text-xl text-ink-black/70 mt-4 animate-fade-in-up delay-100">
                    박가네가 걸어온 길과 맛을 인정받은 기록들입니다.
                </p>

                <!-- Tabs -->
                <div class="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up delay-200">
                    ${tabs.map(tab => `
                        <button onclick="switchAwardsTab('${tab.id}')" 
                            class="px-6 py-2 rounded-full border-2 border-ink-black font-dohyeon text-lg transition-all transform hover:-translate-y-1 relative group 
                            ${activeAwardsTab === tab.id ? 'bg-ink-black text-paper-bg shadow-[4px_4px_0px_0px_#cc3333]' : 'bg-paper-bg text-ink-black hover:bg-ink-black/5'}">
                            ${tab.label}
                            <span class="ml-2 text-sm px-2 py-0.5 rounded-full ${activeAwardsTab === tab.id ? 'bg-stamp-red text-white' : 'bg-ink-black/10 text-ink-black'}">
                                ${tab.count}
                            </span>
                        </button>
                    `).join('')}
                </div>
            </div>
    `;

    // Content
    if (activeAwardsTab === 'awards') {
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">`;
        awardsData.forEach((item, index) => {
            html += `
                <div class="group relative bg-white border-2 border-ink-black p-6 shadow-[8px_8px_0px_0px_rgba(51,51,51,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(204,51,51,0.8)] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 animate-fade-in-up" style="animation-delay: ${index * 0.15}s">
                    <div class="flex flex-col items-center text-center relative z-10 pt-2">
                        <div class="w-16 h-16 bg-paper-bg border-2 border-ink-black rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <i data-lucide="${item.icon}" class="w-8 h-8 ${item.iconColor}"></i>
                        </div>
                        <h3 class="text-2xl font-dohyeon mb-2 break-keep">${item.title}</h3>
                        <div class="flex items-center gap-2 mb-4 text-sm text-ink-black/60 font-sans bg-paper-bg px-3 py-1 rounded-full">
                            <span class="font-bold text-ink-black">${item.issuer}</span>
                            <span class="text-ink-black/30">|</span>
                            <span>${item.date}</span>
                        </div>
                        <p class="text-ink-black/80 bg-paper-bg/50 p-4 rounded-lg border border-ink-black/10 w-full mb-4 leading-relaxed font-sans text-sm">
                            ${item.desc}
                        </p>
                        
                        <!-- Stamp Effect -->
                        <div class="absolute top-0 right-0 transform rotate-[15deg] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div class="w-20 h-20 border-4 border-stamp-red rounded-full flex items-center justify-center text-stamp-red font-dohyeon text-sm text-center leading-tight mask-image-grunge animate-stamp-bounce bg-white/80 backdrop-blur-sm shadow-lg">
                                <div class="w-[90%] h-[90%] border border-stamp-red rounded-full flex flex-col justify-center items-center p-1">
                                    <span class="text-lg">${item.rank.split(' ')[0]}</span>
                                </div>
                            </div>
                        </div>
                        <div class="absolute top-0 right-0 transform rotate-[15deg] opacity-40 group-hover:opacity-0 transition-opacity duration-300 grayscale">
                            <i data-lucide="medal" class="w-16 h-16 text-ink-black/20"></i>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else if (activeAwardsTab === 'certs') {
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">`;
        certsData.forEach((item, index) => {
            html += `
                <div class="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl duration-300 group select-none animate-fade-in-up" style="animation-delay: ${index * 0.15}s">
                    <div class="absolute inset-0 bg-[#f8f9fa]">
                        <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 15px 15px"></div>
                        <div class="absolute right-0 bottom-0 w-48 h-48 bg-ink-black/5 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                    </div>

                    <div class="absolute top-0 left-0 right-0 h-[28%] ${item.themeColor} flex items-center px-5 shadow-md z-10">
                        <div class="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center bg-white/10">
                            <i data-lucide="award" class="text-white w-6 h-6"></i>
                        </div>
                        <div class="ml-3 flex flex-col">
                            <span class="text-white font-dohyeon text-lg tracking-widest leading-none">LICENSE</span>
                            <span class="text-white/60 text-[10px] uppercase font-sans tracking-widest">National Technical Qualification</span>
                        </div>
                        <div class="ml-auto w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-200 via-yellow-400 to-yellow-600 shadow-inner flex items-center justify-center opacity-90 border border-yellow-100/50">
                            <i data-lucide="fingerprint" class="w-6 h-6 text-yellow-900/50"></i>
                        </div>
                    </div>
                    
                    <div class="absolute top-[28%] inset-x-0 bottom-0 p-5 flex">
                        <div class="w-[28%] flex flex-col items-center gap-2 pt-1">
                            <div class="w-full aspect-[3/4] bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner rounded-sm">
                                <i data-lucide="user" class="w-12 h-12 text-slate-400"></i>
                                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"></div>
                                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                            </div>
                        </div>

                        <div class="flex-1 pl-5 flex flex-col justify-between py-1 relative z-10">
                            <div>
                                <h3 class="text-xl font-bold text-slate-800 font-dohyeon leading-none tracking-tight">${item.title}</h3>
                                <p class="text-xs text-slate-500 font-sans mt-1 uppercase tracking-wide">${item.type}</p>
                            </div>

                            <div class="space-y-1.5 font-sans text-xs text-slate-700 mt-2">
                                <div class="flex justify-between border-b border-slate-200 pb-1">
                                    <span class="text-slate-400">성명</span>
                                    <span class="font-bold tracking-widest text-slate-900">박정훈</span>
                                </div>
                                <div class="flex justify-between border-b border-slate-200 pb-1">
                                    <span class="text-slate-400">생년월일</span>
                                    <span class="font-mono tracking-wide">${item.birth}</span>
                                </div>
                                <div class="flex justify-between border-b border-slate-200 pb-1">
                                    <span class="text-slate-400">발급번호</span>
                                    <span class="font-mono tracking-wide">${item.number}</span>
                                </div>
                                <div class="flex justify-between pt-0.5">
                                    <span class="text-slate-400">발급기관</span>
                                    <span class="font-bold text-slate-800">${item.issuer}</span>
                                </div>
                            </div>

                            <div class="absolute bottom-2 right-2 w-14 h-14 border-2 border-yellow-600/30 rounded-full flex items-center justify-center group-hover:border-yellow-600/60 transition-colors">
                                <div class="w-10 h-10 border border-yellow-600/50 rounded-full flex items-center justify-center bg-yellow-600/5">
                                    <i data-lucide="check-circle" class="w-6 h-6 text-yellow-600/50"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else if (activeAwardsTab === 'activities') {
        html += `<div class="relative max-w-3xl mx-auto pl-4 md:pl-0">
            <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-ink-black/20 md:-translate-x-1/2 border-l-2 border-dashed border-ink-black/30 h-full"></div>
        `;
        activitiesData.forEach((item, index) => {
            html += `
                <div class="relative mb-12 flex flex-col md:flex-row items-start w-full animate-fade-in-up ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}" style="animation-delay: ${index * 0.15}s">
                    <div class="flex-1 hidden md:block"></div>
                    <div class="absolute left-[-7px] md:left-1/2 top-[24px] w-4 h-4 bg-stamp-red border-2 border-paper-bg rounded-full md:-translate-x-1/2 z-10 shadow-md transform transition-transform hover:scale-150"></div>
                    ${item.highlight ? `<div class="absolute left-[-15px] md:left-1/2 top-[16px] w-8 h-8 bg-stamp-red/20 rounded-full md:-translate-x-1/2 animate-ping"></div>` : ''}

                    <div class="flex-1 w-full pl-4 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:pl-0' : 'md:pl-12 md:pr-0'}">
                        <div class="bg-white border-2 border-ink-black p-5 rounded-lg shadow-[4px_4px_0px_0px_rgba(51,51,51,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(204,51,51,0.5)] transition-all relative group transform hover:-translate-y-1">
                            <div class="absolute top-[22px] w-4 h-4 bg-white border-b-2 border-l-2 border-ink-black transform rotate-45 
                                ${index % 2 === 0 ? 'left-[-14px] md:right-[-10px] md:left-auto md:border-t-2 md:border-r-2 md:border-b-0 md:border-l-0' : 'left-[-14px] md:left-[-10px]'}">
                            </div>

                            ${item.highlight ? `<span class="absolute -top-3 right-4 bg-stamp-red text-white text-xs px-2 py-1 rounded font-dohyeon shadow-sm animate-pulse">${item.highlight}</span>` : ''}

                            <div class="flex items-center gap-3 mb-2 text-ink-black/50 text-sm font-bold">
                                <i data-lucide="calendar" class="w-4 h-4"></i>
                                ${item.period}
                            </div>
                            
                            <h3 class="text-xl font-dohyeon mb-1 group-hover:text-stamp-red transition-colors">${item.title}</h3>
                            <p class="text-ink-black font-bold text-sm mb-3 border-l-2 border-stamp-red pl-2">${item.role}</p>
                            <p class="text-ink-black/80 text-sm leading-relaxed bg-paper-bg p-3 rounded-md border border-ink-black/5">
                                ${item.desc}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `<div class="absolute bottom-0 left-[-9px] md:left-1/2 w-5 h-5 bg-ink-black md:-translate-x-1/2 rounded-full z-10"></div></div>`;
    }

    html += `</div>`;
    container.innerHTML = html;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function switchAwardsTab(tab) {
    activeAwardsTab = tab;
    renderAwards();
}

// --- 5. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("박가네 백엔드 맛집 오픈 준비 완료!");
    renderProjects();
    renderTechStack();
    renderAwards();

    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', copyEmail);
    }

    // --- Navigation Active State Observer ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active state from all links
                navLinks.forEach(link => {
                    const icon = link.querySelector('.nav-icon');
                    if (icon) {
                        icon.classList.remove('bg-stamp-red', 'rounded-sm', 'rotate-[135deg]');
                        icon.classList.add('bg-ink-black/30', 'rounded-xl');
                    }
                });

                // Add active state to current link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    const icon = activeLink.querySelector('.nav-icon');
                    if (icon) {
                        icon.classList.remove('bg-ink-black/30', 'rounded-xl');
                        icon.classList.add('bg-stamp-red', 'rounded-sm', 'rotate-[135deg]');
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

/* =====================================================================================
   PROJECT DETAIL MODAL LOGIC
   ===================================================================================== */

// Mock Data for Project Details (Based on user request)
const projectDetailsMock = {
    metrics: [
        { label: "API Latency", value: "0.15s", change: "93% 단축 (2.3s → 0.15s)", visual: 93 },
        { label: "Concurrency", value: "1,000+", change: "TPS 안정적 유지", visual: 100 },
        { label: "Test Coverage", value: "85%", change: "JUnit5 기반", visual: 85 },
    ],
    techDecisions: [
        { stack: "Redis (Cache)", reason: "반복적인 금융 상품 조회 쿼리 부하 감소 및 응답 속도 개선" },
        { stack: "Redisson (Lock)", reason: "스핀락 방식(Lettuce) 대비 Redis 부하가 적은 Pub/Sub 방식 채택" },
        { stack: "QueryDSL", reason: "복잡한 동적 쿼리 및 Type-Safe한 쿼리 작성을 위해 선택" },
        { stack: "Jenkins", reason: "Git Push 트리거를 통한 배포 자동화 구축 (Human Error 방지)" }
    ],
    contributions: [
        "Spring Security + JWT 기반 인증/인가 시스템 구현",
        "복잡한 금융 상품 검색을 위한 QueryDSL 동적 쿼리 최적화",
        "Redis Caching 전략 (Look-aside) 도입으로 조회 성능 개선",
        "선착순 이벤트 동시성 제어를 위한 Redis 분산락 적용"
    ],
    troubleshooting: {
        title: "선착순 이벤트 동시성 재고 이슈 해결",
        situation: "특판 상품 오픈 시 트래픽 폭주로 인해 실제 재고보다 많은 인원이 가입되는 'Over-selling' 현상 발생 (재고 -50 등 음수 발생).",
        actions: [
            { title: "Java synchronized", result: "실패: 다중 서버(Scale-out) 환경에서는 서버 간 동기화 불가 확인." },
            { title: "DB Pessimistic Lock", result: "보류: 정합성은 보장되나, 레코드 락 대기 시간 증가로 성능 저하 우려." },
            { title: "Redis Distributed Lock", result: "채택: Redisson의 Pub/Sub 방식을 사용하여 스핀락 부하를 줄이고 분산 환경 정합성 보장." }
        ],
        result: "JMeter 부하 테스트(User 1,000명) 결과, 데이터 정합성 100% 달성 및 평균 응답 시간 200ms 이내 유지."
    }
};

function openProjectModal(project) {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
        console.error("modal-root not found!");
        return;
    }

    // Use project data directly. 
    const detailData = project;

    const modalHTML = `
    <div class="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div class="flex min-h-full items-center justify-center p-4">
        
        <!-- Modal Container -->
        <div class="bg-white w-full max-w-6xl max-h-[90vh] md:rounded-2xl shadow-2xl relative flex flex-col font-sans text-[#333] overflow-hidden">
          
          <!-- Header Bar (Close Button) -->
          <div class="h-14 bg-[#f8f9fa] border-b border-[#eee] flex items-center justify-end px-6 shrink-0">
            <button onclick="closeProjectModal()" class="p-2 hover:bg-[#eee] rounded-full transition-colors">
              <i data-lucide="x" class="w-5 h-5 text-[#333]"></i>
            </button>
          </div>
          
          <!-- Scrollable Content Area -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="flex flex-col md:flex-row min-h-full">
              
              <!-- --- Left Sidebar (Sticky Info) --- -->
              <div class="w-full md:w-[28%] bg-[#fdfbf7] border-r border-[#eee] flex flex-col gap-6 p-6 md:sticky md:top-0 md:h-full overflow-y-auto custom-scrollbar">
                
                <!-- Title & Meta -->
                <div>
                  <span class="inline-block px-2 py-0.5 bg-[#cc3333] text-white text-[10px] font-bold rounded mb-2">${detailData.role || 'DEVELOPER'}</span>
                  <h1 class="text-2xl font-extrabold text-[#111] font-dohyeon mb-1 leading-tight">${detailData.title}</h1>
                  <p class="text-xs text-[#666] font-medium">${detailData.period}</p>
                </div>

                <!-- Navigation Links (Anchor) -->
                <div class="space-y-1">
                  ${['Overview', 'Tech Decisions', 'Troubleshooting', 'Architecture'].map((section, idx) => `
                    <a href="#section-${idx}" class="block text-xs font-bold text-[#555] hover:text-[#cc3333] hover:bg-[#eee] px-2 py-1.5 rounded transition-colors flex justify-between items-center group">
                      ${section} <i data-lucide="chevron-right" class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </a>
                  `).join('')}
                </div>

                <!-- Key Metrics (Visualized) -->
                <div class="space-y-3">
                  <p class="text-[10px] font-bold text-[#888] uppercase tracking-wider">KEY METRICS</p>
                  ${detailData.metrics ? detailData.metrics.map((m) => `
                    <div class="bg-white p-3 rounded-lg border border-[#eee] shadow-sm">
                      <div class="flex justify-between items-end mb-1">
                        <span class="text-[10px] font-bold text-[#555]">${m.label}</span>
                        <span class="text-sm font-extrabold text-[#cc3333] font-dohyeon">${m.value}</span>
                      </div>
                      <div class="w-full h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                        <div class="h-full bg-[#cc3333]" style="width: ${m.visual}%"></div>
                      </div>
                      <p class="text-[9px] text-[#888] mt-1 text-right">${m.change}</p>
                    </div>
                  `).join('') : '<p class="text-xs text-[#999]">No metrics available</p>'}
                </div>

                <!-- Links -->
                <div class="mt-auto flex gap-2 pt-4">
                  <button class="flex-1 py-2 bg-[#333] text-white rounded text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-1 shadow-md">
                    <i data-lucide="github" class="w-3 h-3"></i> Code
                  </button>
                  <button class="flex-1 py-2 bg-white border border-[#ddd] text-[#333] rounded text-xs font-bold hover:bg-[#f1f1f1] transition-colors flex items-center justify-center gap-1">
                    <i data-lucide="external-link" class="w-3 h-3"></i> Live
                  </button>
                </div>
              </div>
              
              <!-- --- Main Content (Right Panel) --- -->
              <div class="w-full md:w-[72%] bg-white p-8 md:p-12 space-y-12">
                
                <!-- Engineer's Note -->
                <div class="bg-[#f8f9fa] border-l-4 border-[#333] p-5 rounded-r-xl">
                  <h3 class="font-bold text-[#333] mb-2 flex items-center gap-2"><i data-lucide="quote" class="w-4 h-4"></i> Engineer's Note</h3>
                  <p class="text-[#555] text-sm leading-relaxed font-sans">
                    ${detailData.summary}
                  </p>
                </div>

                <!-- 1. Overview -->
                <div id="section-0">
                  <h2 class="text-xl font-bold mb-4 font-dohyeon flex items-center gap-2 text-[#333] border-b pb-2">
                    <span class="text-[#cc3333]">#</span> 프로젝트 개요
                  </h2>
                  <p class="text-[#555] text-sm leading-7 mb-4">${detailData.description}</p>
                  <div class="bg-[#fdfbf7] p-4 rounded-lg border border-[#eee]">
                    <h4 class="text-xs font-bold text-[#888] uppercase mb-2">MY KEY CONTRIBUTIONS</h4>
                    <ul class="space-y-2">
                      ${detailData.contributions ? detailData.contributions.map((item) => `
                        <li class="flex gap-2 text-sm text-[#333]">
                          <i data-lucide="check-circle-2" class="w-4 h-4 text-[#cc3333] shrink-0 mt-0.5"></i> ${item}
                        </li>
                      `).join('') : ''}
                    </ul>
                  </div>
                </div>

                <!-- 2. Technical Decisions (Grid) -->
                <div id="section-1">
                  <h2 class="text-xl font-bold mb-4 font-dohyeon flex items-center gap-2 text-[#333] border-b pb-2">
                    <span class="text-[#cc3333]">#</span> 기술적 의사결정 (Why?)
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${detailData.techDecisions ? detailData.techDecisions.map((decision) => `
                      <div class="border border-[#eee] p-4 rounded-lg hover:border-[#cc3333]/30 transition-colors">
                        <div class="text-sm font-bold text-[#333] mb-1 flex items-center gap-2">
                          <span class="w-1.5 h-1.5 rounded-full bg-[#cc3333]"></span> ${decision.stack}
                        </div>
                        <p class="text-xs text-[#666] leading-relaxed">${decision.reason}</p>
                      </div>
                    `).join('') : ''}
                  </div>
                </div>

                <!-- 3. Troubleshooting (Detailed) -->
                <div id="section-2">
                  <h2 class="text-xl font-bold mb-4 font-dohyeon flex items-center gap-2 text-[#333] border-b pb-2">
                    <span class="text-[#cc3333]">#</span> 트러블 슈팅 로그
                  </h2>
                  
                  ${detailData.troubleshooting ? `
                  <div class="border border-[#eee] rounded-xl overflow-hidden">
                    <div class="bg-[#f8f9fa] px-5 py-3 border-b border-[#eee] flex items-center gap-2">
                      <i data-lucide="alert-triangle" class="w-4 h-4 text-orange-500"></i>
                      <span class="font-bold text-sm text-[#333]">Issue: ${detailData.troubleshooting.title}</span>
                    </div>
                    
                    <div class="p-5 space-y-6">
                      <!-- Situation -->
                      <div>
                        <h4 class="text-xs font-bold text-[#888] uppercase mb-1">PROBLEM SITUATION</h4>
                        <p class="text-sm text-[#555] bg-[#fff5f5] p-3 rounded border border-red-100 text-red-800">${detailData.troubleshooting.situation}</p>
                      </div>

                      <!-- Process -->
                      <div>
                        <h4 class="text-xs font-bold text-[#888] uppercase mb-2">SOLVING PROCESS</h4>
                        <div class="space-y-2">
                          ${detailData.troubleshooting.actions.map((act, i) => {
        const isSolution = act.title.toLowerCase().includes('solution') || i === detailData.troubleshooting.actions.length - 1;
        return `
                            <div class="flex items-center gap-3 p-3 rounded border text-sm ${isSolution ? 'bg-[#f0fff4] border-green-200' : 'bg-white border-[#eee]'}">
                              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded h-fit ${isSolution ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}">
                                ${isSolution ? 'SOLUTION' : `ATTEMPT ${i + 1}`}
                              </span>
                              <div class="flex-1">
                                <span class="font-bold text-[#333] mr-2">${act.title}</span>
                                <span class="text-[#666] text-xs">${act.result}</span>
                              </div>
                            </div>
                          `}).join('')}
                        </div>
                      </div>

                      ${detailData.troubleshooting.codeSnippet ? `
                      <!-- Code Snippet -->
                      <div>
                        <h4 class="text-xs font-bold text-[#888] uppercase mb-2">CORE IMPLEMENTATION</h4>
                        <div class="bg-[#1e1e1e] p-4 rounded-lg font-mono text-xs text-gray-300 overflow-x-auto border border-[#333] whitespace-pre">
                          ${detailData.troubleshooting.codeSnippet.trim()}
                        </div>
                      </div>
                      ` : ''}
                    </div>
                  </div>
                  ` : ''}
                </div>

                <!-- 4. Architecture -->
                <div id="section-3">
                  <h2 class="text-xl font-bold mb-4 font-dohyeon flex items-center gap-2 text-[#333] border-b pb-2">
                    <span class="text-[#cc3333]">#</span> 시스템 아키텍처
                  </h2>
                  <div class="w-full aspect-[2.5/1] bg-[#f8f9fa] border border-[#eee] rounded-xl flex items-center justify-center relative group overflow-hidden">
                    <div class="text-center">
                      <i data-lucide="layers" class="w-12 h-12 text-[#ddd] mx-auto mb-2"></i>
                      <p class="text-xs text-[#999] font-bold">Architecture Diagram Placeholder</p>
                    </div>
                    <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button class="bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold text-[#333] hover:scale-105 transition-transform">
                        크게 보기
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    modalRoot.innerHTML = modalHTML;
    modalRoot.className = ''; // Ensure hidden class is removed
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Initialize Icons
    lucide.createIcons();

    // Close on outside click
    modalRoot.querySelector('.fixed').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeProjectModal();
        }
    });
}

function closeProjectModal() {
    const modalRoot = document.getElementById('modal-root');
    modalRoot.innerHTML = '';
    modalRoot.classList.add('hidden');
    document.body.style.overflow = '';
}
