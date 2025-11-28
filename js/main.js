// Main JavaScript File

// 1. Data Structure: Project Data with Grid Spans
const projects = [
    {
        title: "Spring Boot 쇼핑몰",
        description: "JPA와 MySQL을 활용한 이커머스 API",
        tags: ["Java", "Spring Boot"],
        image: "https://picsum.photos/seed/shop/800/600",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-2" // 넓은 카드 (2칸)
    },
    {
        title: "AWS 배포 파이프라인",
        description: "CI/CD 자동화 구축",
        tags: ["AWS", "Docker"],
        image: "https://picsum.photos/seed/aws/600/800",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-1" // 좁은 카드 (1칸)
    },
    {
        title: "실시간 채팅 서버",
        description: "WebSocket & Redis 대용량 처리",
        tags: ["Node.js", "Redis"],
        image: "https://picsum.photos/seed/chat/1200/600",
        githubLink: "https://github.com",
        demoLink: "#",
        colSpan: "lg:col-span-3" // 전체 너비 카드 (3칸)
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

// 2. Rendering Logic (JonHecky Style)
function renderProjects() {
    const projectGrid = document.getElementById('project-grid');
    projectGrid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');

        // Base classes for the card container
        // min-h-96: 최소 높이 확보
        // group: 호버 효과 트리거
        // overflow-hidden: 내부 요소가 튀어나오지 않게
        card.className = `
            relative group overflow-hidden rounded-xl border-4 border-ink-black 
            min-h-96 flex flex-col justify-end p-6 
            transition-all duration-500 ease-in-out
            hover:shadow-[8px_8px_0px_0px_rgba(204,51,51,1)] 
            ${project.colSpan} col-span-1
        `;

        card.innerHTML = `
            <!-- Background Image -->
            <img src="${project.image}" alt="${project.title}" 
                class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out
                       group-hover:blur-sm group-hover:brightness-[0.25]">
            
            <!-- Content Overlay -->
            <div class="relative z-10 flex flex-col justify-between h-full pointer-events-none">
                
                <!-- Top Content (Title & Desc) - Slides Down -->
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

                <!-- Bottom Content (Button) - Slides Up -->
                <div class="flex justify-end transform md:translate-y-[200%] md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-200">
                    <a href="${project.githubLink}" target="_blank" 
                       class="pointer-events-auto inline-block py-3 px-8 border-2 border-paper-bg text-paper-bg 
                              font-dohyeon text-xl rounded hover:bg-paper-bg hover:text-ink-black transition-colors duration-300">
                        코드 보기 (Check it out)
                    </a>
                </div>
            </div>

            <!-- Full Card Link (Optional) -->
            <a href="${project.githubLink}" class="absolute inset-0 z-0" tabindex="-1"></a>
        `;

        projectGrid.appendChild(card);
    });
}

// 3. Interactions
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
    toast.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    }, 3000);
}

// 4. Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log("박가네 백엔드 맛집 오픈 준비 완료!");
    renderProjects();

    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', copyEmail);
    }
});
