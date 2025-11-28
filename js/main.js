// Main JavaScript File

// --- 1. Data Structures ---

// Project Data
const projects = [
    {
        title: "Spring Boot 쇼핑몰",
        description: "JPA와 MySQL을 활용한 이커머스 API",
        tags: ["Java", "Spring Boot"],
        image: "https://picsum.photos/seed/shop/800/600",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-2"
    },
    {
        title: "AWS 배포 파이프라인",
        description: "CI/CD 자동화 구축",
        tags: ["AWS", "Docker"],
        image: "https://picsum.photos/seed/aws/600/800",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-1"
    },
    {
        title: "실시간 채팅 서버",
        description: "WebSocket & Redis 대용량 처리",
        tags: ["Node.js", "Redis"],
        image: "https://picsum.photos/seed/chat/1200/600",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-3"
    },
    {
        title: "대용량 게시판",
        description: "QueryDSL & 인덱싱 최적화",
        tags: ["Spring", "QueryDSL"],
        image: "https://picsum.photos/seed/board/600/800",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-1"
    },
    {
        title: "MSA 배달 플랫폼",
        description: "Kafka 기반 이벤트 구동 아키텍처",
        tags: ["MSA", "Kafka"],
        image: "https://picsum.photos/seed/delivery/800/600",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-2"
    },
    {
        title: "OAuth2 인증 서버",
        description: "JWT & Social Login 구현",
        tags: ["Security", "OAuth2"],
        image: "https://picsum.photos/seed/auth/1200/600",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-3"
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

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `
            relative group overflow-hidden rounded-xl border-4 border-ink-black 
            min-h-96 flex flex-col justify-end p-6 
            transition-all duration-500 ease-in-out
            hover:shadow-[8px_8px_0px_0px_rgba(204,51,51,1)] 
            ${project.colSpan} col-span-1
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
                    <a href="${project.githubLink}" target="_blank" 
                       class="pointer-events-auto inline-block py-3 px-8 border-2 border-paper-bg text-paper-bg 
                              font-dohyeon text-xl rounded hover:bg-paper-bg hover:text-ink-black transition-colors duration-300">
                        코드 보기 (Check it out)
                    </a>
                </div>
            </div>
            <a href="${project.githubLink}" class="absolute inset-0 z-0" tabindex="-1"></a>
        `;
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
});
