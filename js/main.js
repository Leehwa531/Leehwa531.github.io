// Main JavaScript File

// --- 1. Data Structures ---

// Project Data
// Project Data
const projects = [
    {
        title: "WatchOut",
        description: "0.5초의 골든타임을 사수하는 산업재해 예방 AI 관제 플랫폼",
        tags: ["Python / FastAPI", "Vision AI", "Wear OS (Kotlin)", "Apache Kafka", "Redis"],
        image: "images/watchout_cover.jpg",
        architectureImage: "images/watchout_arch.png",

        // ★ [Carousel Data]
        serviceImages: [
            { src: "images/watchout_cover.jpg", caption: "WatchOut 서비스 메인 표지" },
            { src: "images/watchout_대시보드.gif", caption: "실시간 통합 관제 대시보드 (메인 화면)" },
            { src: "images/watchout_CCTV확인.png", caption: "AI 객체 인식 및 실시간 CCTV 모니터링" },
            { src: "images/watchout_공지발송.gif", caption: "현장 전체/구역별 긴급 공지사항 발송" },
            { src: "images/watchout_CCTV_CRUD.gif", caption: "관리자 모드 - CCTV 자산 등록 및 관리" },
            { src: "images/watchout_구역_CRUD.gif", caption: "관리자 모드 - 위험 구역 설정 및 관리" },
            { src: "images/watchout_모바일.png", caption: "모바일 앱 (회원가입, 안면 등록, 현장 관리)" },
            { src: "images/watchout_워치화면.png", caption: "WearOS 워치 앱 (낙상 감지, 심박수, SOS 호출)" }
        ],

        githubLink: "https://github.com/WatchOut-Construct",
        demoLink: "#",
        colSpan: "lg:col-span-2",

        // Detailed Info
        period: "2024.08 - 2024.10 (7주)",
        role: "Core System Architect (백엔드/인프라 총괄)",
        summary: "현장의 안전은 '속도'와 '정확성'에 달려있습니다. Vision AI의 오인식 문제를 해결하기 위해 <strong class='text-[#333] bg-[#fff3cd]'>'Gap Check' 검증 로직</strong>을 독자 개발하여 보안 오탐을 원천 차단했습니다. 또한, AI 추론 서버와 백엔드 간의 트래픽 스파이크를 해소하기 위해 **Kafka 기반의 EDA(Event-Driven Architecture)**를 구축했습니다.",
        contributions: [
            "Hybrid AI Pipeline 설계: 고속 탐지(Caffe SSD)와 정밀 식별(ArcFace) 프로세스를 이원화하여 Latency 0.5s 미만과 식별 정확도 99% 동시 달성",
            "Vector Gap Check 알고리즘: Top-K 후보군의 코사인 유사도 격차(Margin)를 분석하는 2차 검증 로직을 도입하여 False Positive(오인식) 0건 달성",
            "Kafka 파티셔닝 전략: 구역(Zone) ID를 파티션 키로 사용하여 데이터 순서 보장(Ordering) 및 처리 효율 극대화",
            "Wear OS 백그라운드 생존성: 안드로이드 Doze 모드에서도 센서가 동작하도록 Foreground Service와 WakeLock을 결합한 데몬 구현",
            "Redis Look-aside 캐싱: 작업자 정보 조회 시 발생하는 RDB 부하를 80% 감소시키고 임베딩 벡터 Hot-Reloading 구현"
        ],
        metrics: [
            { label: "보안 오탐률 (FP)", value: "0%", visual: 100, change: "Gap Check 적용 후 오인식 완전 제거" },
            { label: "E2E 지연시간", value: "450ms", visual: 95, change: "Kafka 도입으로 API 병목 해소" },
            { label: "시스템 가용성", value: "99.9%", visual: 99, change: "서비스 디스커버리 및 헬스 체크 적용" }
        ],
        techDecisions: [
            { stack: "Apache Kafka", reason: "AI 서버의 간헐적 지연이 전체 장애로 전파되는 것을 막고(Decoupling), 트래픽 폭주 시 데이터 유실 없이 버퍼링하기 위해 도입했습니다." },
            { stack: "ArcFace (ResNet-100)", reason: "MobileFaceNet은 가볍지만 측면 얼굴 인식률이 낮아, 안전 관제에 필수적인 '높은 재현율(Recall)'을 위해 연산 비용이 들더라도 정확도가 높은 모델을 선택했습니다." },
            { stack: "Redis & PostgreSQL", reason: "벡터 데이터의 영구 저장은 pgvector를 사용하되, 실시간 추론을 위한 빈번한 조회는 Redis In-memory로 처리하여 I/O를 최소화했습니다." }
        ],
        troubleshooting: {
            title: "유사 인물 오인식 문제와 'Gap Check' 알고리즘",
            situation: "유사도 임계값(0.5)만으로는 인상이 비슷한 작업자를 구분하지 못해 보안 오탐(False Positive) 발생.",
            actions: [
                { title: "문제 분석", result: "유사도가 0.51(타인)과 0.52(본인)로 근소한 차이가 날 때 구분 불가 확인." },
                { title: "해결책 (Gap Check)", result: "1순위와 2순위 후보의 유사도 차이(Gap)가 0.1 이상일 때만 인증하는 로직을 추가하여 오인식 원천 차단." }
            ],
            codeSnippet: `
# Gap Check Logic (Python Pseudo-code)
matches = find_top_k_matches(embedding, k=2)
best, second = matches[0], matches[1]

if best.score < THRESHOLD: return User.UNKNOWN

# 핵심 로직: 1등과 2등의 점수 차이가 미미하면 거부
gap = best.score - second.score
if gap < 0.1:
    return User.UNKNOWN

return authorize(best.user_id)`
        }
    },
    // 2. 예나, 지금 (Yena, Now) - [신규 추가 / 더미 데이터]
    {
        title: "예나, 지금 (Yena, Now)",
        description: "멀리 있어도, 함께 추억을 남길 수 있는 온라인 포토부스 서비스",
        tags: ["Spring Boot", "React", "WebRTC", "OpenVidu", "MySQL"],
        image: "images/yena_cover.png",
        architectureImage: "images/yena_arch.png",

        // ★ [Carousel Data]
        serviceImages: [
            { src: "images/yena_cover.png", caption: "예나, 지금 서비스 메인 표지" },
            { src: "images/yena_프로필.png", caption: "사용자 프로필 & 마이페이지" },
            { src: "images/yena_방생성.gif", caption: "포토부스 방 생성 및 설정" },
            { src: "images/yena_방입장.gif", caption: "친구 초대 & 방 입장" },
            { src: "images/yena_N컷촬영.gif", caption: "실시간 N컷 촬영 (WebRTC)" },
            { src: "images/yena_촬영편집.gif", caption: "사진 편집 & 프레임 꾸미기" },
            { src: "images/yena_갤러리.png", caption: "내 사진 갤러리 모아보기" },
            { src: "images/yena_갤러리상세.png", caption: "갤러리 상세보기 & 공유" }
        ],

        githubLink: "#",
        demoLink: "#",
        colSpan: "lg:col-span-1",

        // Detailed Info
        period: "2024.XX - 2024.XX (6주)", // TODO: 기간 수정
        role: "Backend Developer",
        summary: "비대면 시대에도 소중한 사람과 함께 사진을 찍는 경험을 제공하기 위해, <strong class='text-[#333] bg-[#fff3cd]'>'WebRTC 기반의 실시간 영상 처리'</strong> 기술에 도전했습니다.", // [더미 문구]
        contributions: [
            "WebRTC(OpenVidu)를 활용한 다자간 화상 통신 및 실시간 포토 촬영 기능 구현", // [더미]
            "Canvas API를 이용한 이미지 합성 및 프레임 꾸미기 기능 백엔드 처리", // [더미]
            "AWS S3를 이용한 대용량 이미지 저장 및 Pre-signed URL 보안 적용" // [더미]
        ],
        metrics: null, // 나중에 채울 예정
        techDecisions: null, // 나중에 채울 예정
        troubleshooting: null // 나중에 채울 예정
    },
    // 3. Coditor (Final Version)
    {
        title: "Coditor",
        description: "개발자의 하루를 성장의 기록으로, AI 기반 GitHub 멘토링 & 포트폴리오 에이전트",
        tags: ["LangGraph", "FastAPI", "Spring Boot", "Redis", "MySQL", "Prompt Engineering"],
        image: "images/coditor_cover.png",
        architectureImage: "images/coditor_arch.png",

        // ★ [Carousel Data]
        serviceImages: [
            { src: "images/coditor_cover.png", caption: "Coditor 서비스 메인 표지" },
            { src: "images/coditor_랜딩페이지.png", caption: "서비스 랜딩 페이지 (GitHub 연동 시작)" },
            { src: "images/coditor_메인페이지.png", caption: "메인 가이드 및 3단계 프로세스 소개" },
            { src: "images/coditor_챗봇.png", caption: "AI 멘토링 & 프로젝트 아이데이션 채팅" },
            { src: "images/coditor_langgraph.png", caption: "LangGraph 기반 AI 답변 생성 파이프라인" },
            { src: "images/coditor_대시보드.png", caption: "개발자 성장 분석 대시보드 (역량 차트)" },
            { src: "images/coditor_프로젝트아카이브.png", caption: "내 프로젝트 모아보기 (아카이빙)" },
            { src: "images/coditor_태그기반아카이브.png", caption: "기술 스택/태그별 프로젝트 필터링" }
        ],

        githubLink: "https://github.com/Leehwa531/Coditor",
        demoLink: "#",
        colSpan: "lg:col-span-2",

        // Detailed Info
        period: "2024.01 - 2024.02 (6주)",
        role: "Project Lead & AI Architect (기획/설계/개발 총괄)",
        summary: "팀의 기술적 방향성을 제시하고 개발 문화를 정립한 리더이자 핵심 엔지니어입니다. 단순한 아카이빙 서비스를 넘어, <strong class='text-[#333] bg-[#fff3cd]'>'개발자의 성장을 증명하는 AI 파트너'</strong>로 제품을 고도화했습니다. LangGraph 기반의 AI 파이프라인부터 ERD, 컨벤션 설계까지 프로젝트의 전 과정을 주도했습니다.",
        contributions: [
            "LangGraph AI 파이프라인 설계: 사용자의 의도(검색/생성/분석)를 파악하고 도구를 선택하는 상태 기반(State Machine) 에이전트 아키텍처 구축 및 최적화",
            "프로젝트 전체 설계 및 기술 리딩: Spring Boot(메인)와 FastAPI(AI)를 연동한 MSA 구조 설계, 대용량 채팅 처리를 위한 정규화된 ERD 설계",
            "개발 문화 및 컨벤션 정립: 팀원 간의 협업 효율을 위해 Git-Flow 브랜치 전략, 커밋 메시지 컨벤션, 코드 리뷰 프로세스 제정 및 전파",
            "Redis 성능 최적화: 태그 필터링 조회 시 발생하는 O(N) 풀스캔 문제를 자료구조 재설계를 통해 O(1)로 단축 (호출 2,500회 → 2회)",
            "비동기 시스템 도입: BackgroundTasks를 활용해 AI 응답 속도를 40초에서 3초로 92% 단축하고 사용자 경험(UX) 개선"
        ],
        metrics: [
            {
                label: "API 응답 속도",
                value: "3s 이내",
                visual: 92,
                change: "40s → 3s (비동기 처리 도입)"
            },
            {
                label: "데이터 조회 효율",
                value: "99% 개선",
                visual: 100,
                change: "Redis 호출 2500회 → 2회"
            },
            {
                label: "GitHub 연동",
                value: "100%",
                visual: 100,
                change: "Repo/Commit/Issue 자동 분석"
            }
        ],
        techDecisions: [
            {
                stack: "LangGraph",
                reason: "단순 LLM 호출(Chain)로는 불가능한 '순환형(Cyclic) 추론'과 '상태 유지(Stateful)'가 필수적이었습니다. 에이전트의 판단 과정을 명확한 그래프로 제어하기 위해 도입했습니다."
            },
            {
                stack: "Redis (Custom Design)",
                reason: "단순 캐싱을 넘어, '인기 태그 필터링' 같은 복잡한 실시간 집계를 RDB 부하 없이 O(1)로 처리하기 위해 Sorted Set과 Hash를 조합한 커스텀 자료구조를 설계했습니다."
            },
            {
                stack: "FastAPI + BackgroundTasks",
                reason: "사용자에게 즉각적인 반응(채팅 응답)을 보장하면서, 로그 저장이나 데이터 분석 같은 무거운 후처리 작업을 논블로킹으로 처리하기 위해 채택했습니다."
            }
        ],
        troubleshooting: {
            title: "Redis 필터링 조회 성능 이슈 (O(N) → O(1) 최적화)",
            situation: "프로젝트 태그를 '인기순 + 타입별'로 조회하는 기능 구현 시, 단일 Sorted Set 사용으로 인해 애플리케이션에서 수만 건의 데이터를 가져와 필터링하는 '인메모리 풀스캔'이 발생, 응답이 수 초 이상 지연됨.",
            actions: [
                {
                    title: "AS-IS (Bad)",
                    result: "모든 태그를 하나의 ZSET에 저장. 'TECH' 타입 20개를 찾기 위해 최악의 경우 2,500번의 Redis 호출과 5만 건의 데이터 전송 발생."
                },
                {
                    title: "TO-BE (Solution)",
                    result: "조회 조건(Type) 자체를 Key로 분리하는 'Read-Optimized' 설계 적용. (ex. `tag:rank:TECH`, `tag:rank:DOMAIN`)"
                }
            ],
            codeSnippet: `
// 개선된 로직 (Pseudo-code)
// 1. 타입별로 미리 분류된 ZSET에서 상위 20개 UUID만 조회 (O(logN))
Set<String> topTagIds = redis.zrevrange("tag:rank:" + requestType, 0, 19);

// 2. 조회된 UUID로 상세 정보를 Pipeline으로 한 번에 조회 (RTT 최소화)
List<TagInfo> details = redis.executePipelined(connection -> {
    topTagIds.forEach(id -> connection.hgetAll("tag:info:" + id));
});

// 결과: 수천 번의 호출을 단 2번의 네트워크 통신으로 해결
`
        }
    }
];



// Tech Stack Data
const skillCategories = [
    {
        id: 'backend',
        title: 'Core Backend & Language',
        description: '견고한 비즈니스 로직 설계 및 성능 최적화',
        icon: 'server',
        skills: [
            {
                name: 'Java 17',
                level: 'Advanced',
                percentage: 90,
                desc: 'Stream API와 Lambda를 활용한 함수형 프로그래밍 및 멀티스레드 환경의 동시성 제어',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
            },
            {
                name: 'Spring Boot',
                level: 'Advanced',
                percentage: 85,
                desc: 'PSA/IoC/AOP 원리 이해 기반의 아키텍처 설계 및 Spring Security 인증/인가 고도화',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
            },
            {
                name: 'JPA / QueryDSL',
                level: 'Intermediate',
                percentage: 80,
                desc: '영속성 컨텍스트 이해 및 동적 쿼리 작성, Fetch Join을 활용한 N+1 문제 해결',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg'
            },
            {
                name: 'Kotlin',
                level: 'Basic',
                percentage: 40,
                desc: 'Java와의 상호운용성을 이해하고, 간결한 문법을 활용한 서버 사이드 개발 경험',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
            }
        ]
    },
    {
        id: 'infra-data',
        title: 'Architecture & Data',
        description: '대용량 데이터 처리 및 자동화된 배포 환경',
        icon: 'database',
        skills: [
            {
                name: 'MySQL / PostgreSQL',
                level: 'Intermediate',
                percentage: 75,
                desc: '실행 계획(Explain) 분석을 통한 인덱스 튜닝 및 정규화/반정규화 설계',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
            },
            {
                name: 'Redis',
                level: 'Intermediate',
                percentage: 70,
                desc: 'Look-aside 캐싱 전략 및 분산 락(Distributed Lock)을 활용한 동시성 이슈 제어',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'
            },
            {
                name: 'AWS / Docker',
                level: 'Intermediate',
                percentage: 65,
                desc: 'EC2, RDS 기반 인프라 구축 및 Docker Compose를 활용한 개발 환경 컨테이너화',
                img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
            },
            {
                name: 'CI/CD (Jenkins/Github)',
                level: 'Basic',
                percentage: 60,
                desc: 'Webhook 트리거 기반의 빌드/배포 자동화 파이프라인 구축 경험',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg'
            }
        ]
    },
    {
        id: 'ai-tools',
        title: 'AI Engineering & Tools',
        description: 'AI 모델 서빙 및 효율적인 협업 프로세스',
        icon: 'cpu',
        skills: [
            {
                name: 'Python / PyTorch',
                level: 'Intermediate',
                percentage: 70,
                desc: '데이터 전처리 및 딥러닝 모델 학습, FastAPI를 활용한 모델 서빙 서버 구축',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
            },
            {
                name: 'LangChain',
                level: 'Basic',
                percentage: 50,
                desc: 'LLM 기반 애플리케이션 개발 및 RAG(검색 증강 생성) 파이프라인 구성 경험',
                img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
            },
            {
                name: 'Git / Collaboration',
                level: 'Advanced',
                percentage: 85,
                desc: 'Git Flow 전략 준수, Jira/Notion을 활용한 애자일(Agile) 스프린트 운영',
                img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
            }
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
    const email = "qwg531@naver.com";
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
        title: 'SSAFY 13기 자율 프로젝트 우수상',
        issuer: 'SSAFY',
        date: '2025.11.27',
        rank: '우수상',
        desc: 'AI 기반 코드 리뷰 플랫폼 "Coditor" 개발 프로젝트로 자율 프로젝트 우수상 수상.',
        icon: 'trophy',
        iconColor: 'text-yellow-600'
    },
    {
        id: 2,
        title: 'SSAFY 13기 특화 프로젝트 우수상',
        issuer: 'SSAFY',
        date: '2025.09.29',
        rank: '우수상',
        desc: 'WebRTC 기반 실시간 4컷 사진 촬영 플랫폼 "예나, 지금" 개발로 특화 프로젝트 우수상 수상.',
        icon: 'award',
        iconColor: 'text-blue-600'
    },
    {
        id: 3,
        title: 'SSAFY AI 챌린지 포트홀 탐지 경진대회',
        issuer: 'SSAFY',
        date: '2025.04 ~ 2025.05',
        rank: '9위 / 247팀',
        desc: 'AI 기반 도로 포트홀 탐지 챌린지: 상위 4% (9위/247팀) 달성',
        icon: 'medal',
        iconColor: 'text-orange-600'
    }
];

const certsData = [
    {
        id: 1,
        title: '정보처리기사',
        type: 'Engineer Information Processing',
        issuer: '한국산업인력공단',
        date: '2024.09.10',
        number: '24202051427A',
        birth: '1999.05.31',
        themeColor: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
        id: 2,
        title: 'ADsP',
        type: 'Advanced Data Analytics Semi-Professional',
        issuer: '한국데이터산업진흥원',
        date: '2025.03.21',
        number: 'ADsP-052000123',
        birth: '1999.05.31',
        themeColor: 'bg-gradient-to-r from-green-600 to-green-700'
    },
    {
        id: 3,
        title: 'SQLD',
        type: 'SQL Developer',
        issuer: '한국데이터산업진흥원',
        date: '2025.06.27',
        number: 'SQLD-048000456',
        birth: '1999.05.31',
        themeColor: 'bg-gradient-to-r from-purple-600 to-purple-700'
    },
    {
        id: 4,
        title: '토익스피킹 IM2',
        type: 'TOEIC Speaking Intermediate Mid 2',
        issuer: 'YBM',
        date: '2025.09.06',
        number: '1A2B3C4D5E6F',
        birth: '1999.05.31',
        themeColor: 'bg-gradient-to-r from-red-600 to-red-700'
    }
];

const activitiesData = [
    {
        id: 1,
        title: '삼성청년SW아카데미 (SSAFY) 13기',
        role: '교육생 (Java 전공)',
        period: '2025.01 - 2025.12',
        desc: '알고리즘 집중 교육 및 1600시간의 몰입형 코딩 교육 수료 중. 매주 2회 이상의 코드 리뷰와 3회의 팀 프로젝트 수행.',
        highlight: '수료',
        icon: 'code'
    },
    {
        id: 2,
        title: '동의대 알고리즘 소모임 "COTE"',
        role: '운영진 및 멘토',
        period: '2025.06 - 2025.12',
        desc: '후배들을 위한 알고리즘 튜터링 진행 (백준 골드 달성 3명 배출). 주 1회 모의 코딩테스트 출제 및 해설.',
        highlight: null,
        icon: 'users'
    },
    {
        id: 3,
        title: '동의대학교 컴퓨터공학과',
        role: '졸업',
        period: '2018.03 - 2025.02',
        desc: '컴퓨터 구조, 운영체제, 네트워크 등 CS 기초 심화 학습.',
        highlight: '학사 취득',
        icon: 'graduation-cap'
    },
    {
        id: 4,
        title: 'D-COSS 미래설계동아리',
        role: '동아리원',
        period: '2024.03 - 2025.02',
        desc: '미래 설계 및 진로 탐색 동아리 활동. 동료 학생들과 함께 진로 설계 및 멘토링 프로그램 참여.',
        highlight: null,
        icon: 'trophy'
    },
    {
        id: 5,
        title: '바이오헬스데이터학 부전공',
        role: '이수',
        period: '2018.03 - 2025.02',
        desc: '융합 분야 학습을 통해 데이터 분석 및 헬스케어 도메인에 대한 이해도 향상.',
        highlight: null,
        icon: 'heart-pulse'
    }
];

let activeAwardsTab = 'awards';

function renderAwards() {
    const container = document.getElementById('awards');
    if (!container) return;

    const tabs = [
        { id: 'awards', label: '🏆 수상 내역', count: awardsData.length },
        { id: 'certs', label: '💳 자격 증명', count: certsData.length },
        { id: 'activities', label: '👣 활동 이력', count: activitiesData.length }
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

// ★ [Carousel Logic]
let currentCarouselIndex = 0;
let currentProjectImages = [];

function updateCarouselView() {
    const mainImg = document.getElementById('carousel-main-img');
    const caption = document.getElementById('carousel-caption');
    const thumbnails = document.querySelectorAll('.carousel-thumb');

    if (!mainImg || currentProjectImages.length === 0) return;

    const currentImgData = currentProjectImages[currentCarouselIndex];

    // Fade effect logic
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
        mainImg.src = currentImgData.src;
        mainImg.alt = currentImgData.caption;
        mainImg.style.opacity = '1';
    }, 150);

    // Caption Update
    if (caption) {
        caption.textContent = currentImgData.caption || "";
    }

    // Thumbnails Update
    thumbnails.forEach((thumb, idx) => {
        if (idx === currentCarouselIndex) {
            thumb.classList.add('border-stamp-red', 'opacity-100', 'ring-2', 'ring-stamp-red');
            thumb.classList.remove('border-transparent', 'opacity-60');
            // Scroll thumbnail into view if needed
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('border-stamp-red', 'opacity-100', 'ring-2', 'ring-stamp-red');
            thumb.classList.add('border-transparent', 'opacity-60');
        }
    });
}

function moveCarousel(step) {
    if (currentProjectImages.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex + step + currentProjectImages.length) % currentProjectImages.length;
    updateCarouselView();
}

function setCarousel(index) {
    currentCarouselIndex = index;
    updateCarouselView();
}

// Assign to window for inline onclicks
window.moveCarousel = moveCarousel;
window.setCarousel = setCarousel;

function openProjectModal(project) {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
        console.error("modal-root not found!");
        return;
    }

    // Use project data directly. 
    const detailData = project;

    // ★ [Carousel Init]
    currentCarouselIndex = 0;
    currentProjectImages = project.serviceImages || [];

    // Fallback if no specific images are defined
    if (currentProjectImages.length === 0) {
        currentProjectImages = [
            { src: project.image, caption: "메인 이미지" },
            { src: project.architectureImage, caption: "시스템 아키텍처" }
        ].filter(item => item.src);
    }

    //★ [Carousel HTML Generation]
    let carouselHTML = '';
    if (currentProjectImages.length > 0) {
        carouselHTML = `
        <div class="mb-8 select-none">
            <!-- 1. Main Slider Area (Style A) -->
            <div class="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group shadow-lg mb-3 border border-gray-200">
                <img id="carousel-main-img" 
                     src="${currentProjectImages[0].src}" 
                     alt="${currentProjectImages[0].caption}" 
                     class="w-full h-full object-contain transition-opacity duration-300">
                
                <!-- Caption Overlay -->
                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 pointer-events-none">
                    <p id="carousel-caption" class="text-white text-center font-sans text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ${currentProjectImages[0].caption}
                    </p>
                </div>

                <!-- Controls -->
                <button onclick="window.moveCarousel(-1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-stamp-red text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110 z-10">
                    <i data-lucide="chevron-left" class="w-6 h-6"></i>
                </button>
                <button onclick="window.moveCarousel(1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-stamp-red text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110 z-10">
                    <i data-lucide="chevron-right" class="w-6 h-6"></i>
                </button>
            </div>

            <!-- 2. Thumbnails Area (Style B) -->
            <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                ${currentProjectImages.map((img, idx) => `
                    <button onclick="window.setCarousel(${idx})" 
                            class="carousel-thumb relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${idx === 0 ? 'border-stamp-red opacity-100 ring-2 ring-stamp-red' : 'border-transparent opacity-60 hover:opacity-100'}">
                        <img src="${img.src}" class="w-full h-full object-cover">
                    </button>
                `).join('')}
            </div>
        </div>
        `;
    }

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
                  ${['Architecture', 'Overview', 'Tech Decisions', 'Troubleshooting'].map((section, idx) => `
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
                
                <!-- ★ CAROUSEL INSERTED HERE -->
                ${carouselHTML}

                <!-- 1. Architecture -->
                <div id="section-0">
                  <h2 class="text-xl font-bold mb-4 font-dohyeon flex items-center gap-2 text-[#333] border-b pb-2">
                    <span class="text-[#cc3333]">#</span> 시스템 아키텍처
                  </h2>
                  <div class="w-full bg-[#f8f9fa] border border-[#eee] rounded-xl flex items-center justify-center relative group overflow-hidden">
                    
                    ${detailData.architectureImage ? `
                        <img src="${detailData.architectureImage}" alt="System Architecture" class="w-full h-auto object-contain max-h-[500px] hover:scale-105 transition-transform duration-500 cursor-zoom-in" onclick="window.open(this.src, '_blank')">
                    ` : `
                        <div class="text-center py-12">
                            <i data-lucide="layers" class="w-12 h-12 text-[#ddd] mx-auto mb-2"></i>
                            <p class="text-xs text-[#999] font-bold">Architecture Diagram Placeholder</p>
                        </div>
                    `}
                    
                  </div>
                </div>

                <!-- Engineer's Note -->
                <div class="bg-[#f8f9fa] border-l-4 border-[#333] p-5 rounded-r-xl">
                  <h3 class="font-bold text-[#333] mb-2 flex items-center gap-2"><i data-lucide="quote" class="w-4 h-4"></i> Engineer's Note</h3>
                  <p class="text-[#555] text-sm leading-relaxed font-sans">
                    ${detailData.summary}
                  </p>
                </div>

                <!-- 2. Overview -->
                <div id="section-1">
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

                <!-- 3. Technical Decisions (Grid) -->
                <div id="section-2">
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

                <!-- 4. Troubleshooting (Detailed) -->
                <div id="section-3">
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

// 렌더링 함수 (renderTechStack)
function renderTechStack() {
    const container = document.getElementById('tech-stack');
    if (!container) return;

    // HTML 주입
    let html = `
        <div class="max-w-6xl mx-auto px-4">
            <!-- 섹션 헤더 -->
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-dohyeon mb-4 relative inline-block">
                    <span class="relative z-10">Engineering Stack</span>
                    <!-- 밑줄 효과 -->
                    <div class="absolute bottom-1 left-0 w-full h-3 bg-stamp-red/20 -rotate-1"></div>
                </h2>
                <p class="text-xl text-ink-black/70 font-jua mt-2">안정적인 서비스 운영과 AI 융합을 위해 깊이 있게 학습했습니다.</p>
            </div>
            
            <!-- 기술 카드 그리드 (3열 레이아웃 적용) -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    skillCategories.forEach(cat => {
        html += `
            <div class="bg-white border-2 border-ink-black p-6 rounded-xl shadow-[6px_6px_0px_0px_rgba(51,51,51,0.1)] hover:shadow-[8px_8px_0px_0px_rgba(204,51,51,0.2)] transition-all duration-300 hover:-translate-y-1">
                <!-- 카테고리 헤더 -->
                <div class="flex items-center gap-3 mb-6 border-b-2 border-ink-black/10 pb-4">
                    <div class="p-2.5 bg-ink-black text-white rounded-lg">
                        <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-dohyeon tracking-wide">${cat.title}</h3>
                        <p class="text-xs text-ink-black/60 font-sans font-bold">${cat.description}</p>
                    </div>
                </div>
                
                <!-- 스킬 리스트 -->
                <div class="space-y-6">
        `;

        cat.skills.forEach(skill => {
            // 퍼센트에 따른 색상 로직
            const barColor = skill.percentage >= 80 ? 'bg-stamp-red' : 'bg-ink-black';

            html += `
                <div class="group">
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="font-bold font-sans flex items-center gap-2 text-sm text-ink-black">
                            <img src="${skill.img}" class="w-4 h-4 object-contain"> ${skill.name}
                        </span>
                        <span class="font-dohyeon text-xs text-gray-400 group-hover:text-stamp-red transition-colors">${skill.percentage}%</span>
                    </div>
                    <!-- 게이지 바 -->
                    <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden relative">
                        <div class="h-full ${barColor} group-hover:bg-stamp-red transition-all duration-1000 ease-out" style="width: ${skill.percentage}%"></div>
                    </div>
                    <p class="text-[11px] text-gray-500 mt-1.5 font-sans leading-relaxed break-keep group-hover:text-ink-black transition-colors">
                        ${skill.desc}
                    </p>
                </div>
            `;
        });

        html += `</div></div>`;
    });

    html += `</div></div>`;
    container.innerHTML = html;

    // 아이콘 새로고침
    if (window.lucide) lucide.createIcons();
}

// 초기화 시 렌더링 호출
document.addEventListener('DOMContentLoaded', () => {
    renderTechStack();
});

// renderAwards 함수
function renderAwards() {
    const container = document.getElementById('awards');
    if (!container) return;

    const tabs = [
        { id: 'awards', label: '🏆 수상 내역', count: awardsData.length },
        { id: 'certs', label: '💳 자격 증명', count: certsData.length },
        { id: 'activities', label: '👣 활동 이력', count: activitiesData.length }
    ];

    let html = `
        <div class="absolute inset-0 bg-pattern-dots pointer-events-none"></div>
        <div class="max-w-5xl mx-auto relative z-10 px-4">
            <!-- Header -->
            <div class="mb-12 text-center">
                <h1 class="text-4xl md:text-5xl font-dohyeon mb-4 relative inline-block animate-fade-in-up">
                    <span class="relative z-10">Journey & Milestones</span>
                    <div class="absolute bottom-1 left-0 w-full h-3 bg-stamp-red/20 -rotate-1"></div>
                </h1>
                <p class="text-xl text-ink-black/70 mt-4 animate-fade-in-up delay-100">
                    치열한 고민과 몰입으로 일궈낸 성장의 증거들입니다.
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
