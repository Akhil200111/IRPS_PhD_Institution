import type {
  Blog,
  Faq,
  Program,
  ResearchDomain,
  SuccessStory,
  Testimonial,
  University,
} from "./schema";

export type SeedProgram = Omit<Program, "id" | "createdAt">;
export type SeedDomain = Omit<ResearchDomain, "id" | "createdAt">;
export type SeedUniversity = Omit<University, "id" | "createdAt">;
export type SeedTestimonial = Omit<Testimonial, "id" | "createdAt">;
export type SeedStory = Omit<SuccessStory, "id" | "createdAt">;
export type SeedBlog = Omit<Blog, "id" | "createdAt">;
export type SeedFaq = Omit<Faq, "id" | "createdAt">;

export const SEED_PROGRAMS: SeedProgram[] = [
  {
    slug: "phd-computer-science",
    title: "PhD in Computer Science & Engineering",
    tagline: "Research the systems that run the world — from distributed computing to cybersecurity.",
    description:
      "The doctoral programme in Computer Science & Engineering is built for researchers who want to push the boundaries of computation. Scholars work on publishable problems in areas such as machine learning systems, networks, cyber-physical security, cloud architecture and theoretical computer science.\n\nIRPS pairs you with UGC-recognised universities and senior supervisors, structures your coursework, and mentors you from synopsis to thesis defence — with dedicated publication support in SCI/Scopus-indexed venues.",
    highlights: [
      "Supervisor matching within 3 weeks of enrolment",
      "Publication support for Scopus / SCI / UGC-CARE journals",
      "Weekly research colloquium and code-review clinics",
      "Access to cloud GPU credits for thesis experiments",
      "End-to-end synopsis, thesis and viva mentoring",
    ],
    duration: "3 – 5 years",
    mode: "Full-Time · Part-Time · Hybrid",
    eligibility: "M.E./M.Tech/M.Sc (CS/IT) or MCA with a minimum of 55% aggregate (50% for reserved categories).",
    fee: "₹95,000 – ₹1,50,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "phd-management",
    title: "PhD in Management",
    tagline: "Turn boardroom experience into scholarship that shapes how organisations think.",
    description:
      "Designed for working professionals and academics, the PhD in Management covers marketing, finance, HR, operations, strategy and entrepreneurship. Research is applied and industry-linked, so your thesis solves problems that matter to real organisations.\n\nIRPS streamlines entrance support, proposal writing, statistical tooling (SPSS, R, SmartPLS) and journal publication — while you continue your career through weekend and hybrid formats.",
    highlights: [
      "Weekend & hybrid formats for working professionals",
      "Hands-on training in SPSS, R and SmartPLS",
      "Industry-linked problem identification workshops",
      "ABDC / Scopus publication roadmap from year one",
      "One-on-one statisticians for data analysis chapters",
    ],
    duration: "3 – 5 years",
    mode: "Part-Time · Weekend · Hybrid",
    eligibility: "MBA/PGDM or equivalent master's degree with 55% aggregate. Executive experience preferred for part-time tracks.",
    fee: "₹85,000 – ₹1,40,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "phd-ai-data-science",
    title: "PhD in Artificial Intelligence & Data Science",
    tagline: "Doctrine-level research in generative AI, LLMs, vision and decision intelligence.",
    description:
      "Our fastest-growing doctoral track. Scholars explore foundation models, responsible AI, computer vision, NLP for low-resource languages, and data-centric decision systems — guided by supervisors publishing in top-tier venues.\n\nFrom framing a mathematically rigorous problem to reproducible experiments and high-impact submissions, IRPS research mentors walk every mile with you.",
    highlights: [
      "Research labs for deep learning experimentation",
      "Mentorship for NeurIPS / IEEE / Springer submissions",
      "Dataset engineering & reproducibility bootcamps",
      "Industry partnerships for real-world datasets",
      "Ethics, bias and responsible-AI coursework built in",
    ],
    duration: "3 – 5 years",
    mode: "Full-Time · Hybrid",
    eligibility: "Master's in CS / AI / Data Science / Statistics / Mathematics or allied disciplines with 55% aggregate.",
    fee: "₹1,10,000 – ₹1,60,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "phd-commerce",
    title: "PhD in Commerce",
    tagline: "Interrogate markets, money and the mechanics of modern trade.",
    description:
      "A doctoral programme for scholars of accounting, finance, banking, taxation, insurance and international business. Research often draws on live market data, corporate filings and policy shifts — ideal for economists of practice.\n\nIRPS supports econometric modelling, NSE/BSE database access, and placement of your work in reputed Commerce journals.",
    highlights: [
      "Access to CMIE Prowess & capital-market databases",
      "Econometrics and panel-data methods training",
      "UGC-CARE listed journal publication support",
      "Policy-brief writing for wider research impact",
    ],
    duration: "3 – 5 years",
    mode: "Full-Time · Part-Time",
    eligibility: "M.Com / MBA (Finance) / CA / ICWA / CS or equivalent with 55% aggregate.",
    fee: "₹75,000 – ₹1,20,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "phd-education",
    title: "PhD in Education",
    tagline: "Study learning itself — pedagogy, policy, technology and the future of classrooms.",
    description:
      "For teachers, principals, policy professionals and EdTech builders who want to contribute original knowledge to education. Themes include NEP 2020 implementation, learning outcomes assessment, inclusive education and AI in the classroom.\n\nIRPS mentors you through field-study design, ethics clearances and validated instrument development.",
    highlights: [
      "Mixed-methods & field-study design clinics",
      "Instrument validation and pilot-study support",
      "NEP 2020 research theme repository",
      "Publication support in education-focused journals",
    ],
    duration: "3 – 5 years",
    mode: "Part-Time · Weekend · Hybrid",
    eligibility: "M.Ed / MA (Education) or master's in any discipline with B.Ed and teaching experience, with 55% aggregate.",
    fee: "₹70,000 – ₹1,10,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "phd-law",
    title: "PhD in Law",
    tagline: "Original jurisprudence across constitutional, corporate, cyber and human-rights law.",
    description:
      "A rigorous doctoral journey through doctrinal and empirical legal research. Scholars examine constitutional theory, arbitration, data-protection regimes, IP law and criminal-justice reform.\n\nIRPS connects you with senior legal academics, SCC/Manupatra research tooling, and structured case-law analysis frameworks.",
    highlights: [
      "Doctrinal & empirical legal methods training",
      "Access to SCC OnLine and Manupatra databases",
      "Comparative-law research support",
      "Law-journal and conference-paper mentoring",
    ],
    duration: "3 – 6 years",
    mode: "Full-Time · Part-Time",
    eligibility: "LL.M or equivalent master's in law with 55% aggregate.",
    fee: "₹80,000 – ₹1,25,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: false,
    sortOrder: 6,
  },
  {
    slug: "phd-electronics-communication",
    title: "PhD in Electronics & Communication",
    tagline: "From VLSI and embedded systems to 6G — engineer the invisible infrastructure.",
    description:
      "Doctoral research across VLSI design, signal processing, wireless communication, IoT ecosystems and antenna engineering. Scholars prototype in partner labs and publish in IEEE venues.\n\nIRPS provides simulation-toolchain training (MATLAB, Cadence, HFSS) and patent-filing guidance alongside thesis work.",
    highlights: [
      "MATLAB / Cadence / HFSS toolchain training",
      "Patent drafting & filing support",
      "IEEE journal and conference roadmap",
      "Prototype fabrication through partner labs",
    ],
    duration: "3 – 5 years",
    mode: "Full-Time · Part-Time · Hybrid",
    eligibility: "M.E./M.Tech in ECE / EEE / E&I or allied branches with 55% aggregate.",
    fee: "₹90,000 – ₹1,35,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: false,
    sortOrder: 7,
  },
  {
    slug: "phd-life-sciences",
    title: "PhD in Life Sciences",
    tagline: "Wet-lab and computational research across biotech, microbiology and public health.",
    description:
      "A laboratory-first doctoral programme spanning biotechnology, microbiology, biochemistry, bioinformatics and public-health research. Scholars work with partner wet labs and CROs for experiments and validation.\n\nIRPS covers protocol design, statistical rigor, biosafety compliance and publication in indexed life-science journals.",
    highlights: [
      "Partner wet-lab access for experiments",
      "Bioinformatics & biostatistics mentoring",
      "Protocol and ethics-committee documentation support",
      "Indexed journal publication strategy",
    ],
    duration: "3 – 6 years",
    mode: "Full-Time · Hybrid",
    eligibility: "M.Sc in Biotechnology / Microbiology / Biochemistry / Life Sciences or allied fields with 55% aggregate.",
    fee: "₹95,000 – ₹1,45,000 per year (guidance incl.)",
    intake: "January & July cycles",
    featured: true,
    sortOrder: 8,
  },
];

export const SEED_DOMAINS: SeedDomain[] = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence & ML", description: "Foundation models, computer vision, NLP for Indic languages, reinforcement learning and responsible AI.", icon: "BrainCircuit", scholarsCount: 210, sortOrder: 1 },
  { slug: "management-research", name: "Management & Strategy", description: "Marketing science, organisational behaviour, operations, entrepreneurship and strategic leadership.", icon: "Briefcase", scholarsCount: 185, sortOrder: 2 },
  { slug: "finance-commerce", name: "Finance & Commerce", description: "Corporate finance, fintech, banking, behavioural economics, taxation and international trade.", icon: "Landmark", scholarsCount: 142, sortOrder: 3 },
  { slug: "education-pedagogy", name: "Education & Pedagogy", description: "NEP 2020, learning outcome assessment, EdTech adoption, inclusive and comparative education.", icon: "GraduationCap", scholarsCount: 118, sortOrder: 4 },
  { slug: "law-policy", name: "Law & Public Policy", description: "Constitutional law, arbitration, data protection, IP regimes and criminal-justice reform.", icon: "Scale", scholarsCount: 76, sortOrder: 5 },
  { slug: "engineering-technology", name: "Engineering & Technology", description: "VLSI, embedded systems, renewable energy systems, robotics, IoT and advanced manufacturing.", icon: "Cpu", scholarsCount: 164, sortOrder: 6 },
  { slug: "life-sciences", name: "Life Sciences & Biotech", description: "Microbiology, bioinformatics, drug discovery, genomics, public health and clinical research.", icon: "Dna", scholarsCount: 132, sortOrder: 7 },
  { slug: "psychology-behaviour", name: "Psychology & Behavioural Science", description: "Clinical psychology, consumer behaviour, workplace well-being and cognitive science.", icon: "HeartPulse", scholarsCount: 68, sortOrder: 8 },
  { slug: "social-sciences", name: "Social Sciences & Humanities", description: "Sociology, political economy, development studies, history, linguistics and cultural studies.", icon: "Globe2", scholarsCount: 84, sortOrder: 9 },
  { slug: "data-analytics", name: "Data Science & Analytics", description: "Big-data engineering, statistical learning, business analytics, visualisation and decision systems.", icon: "BarChart3", scholarsCount: 156, sortOrder: 10 },
  { slug: "mathematics-statistics", name: "Mathematics & Statistics", description: "Applied mathematics, operations research, stochastic modelling and actuarial science.", icon: "Sigma", scholarsCount: 52, sortOrder: 11 },
  { slug: "environmental-science", name: "Environmental & Climate Science", description: "Climate adaptation, ESG research, water systems, waste valorisation and sustainability policy.", icon: "Leaf", scholarsCount: 47, sortOrder: 12 },
];

export const SEED_UNIVERSITIES: SeedUniversity[] = [
  { name: "Meridian Global University", location: "New Delhi", type: "Deemed", accreditation: "NAAC A++ · NIRF Top-100", programsOffered: 42, sortOrder: 1 },
  { name: "Vidwan Institute of Advanced Studies", location: "Chennai, Tamil Nadu", type: "State", accreditation: "UGC-Recognised", programsOffered: 31, sortOrder: 2 },
  { name: "Kaivalya Research University", location: "Pune, Maharashtra", type: "Private", accreditation: "NAAC A", programsOffered: 28, sortOrder: 3 },
  { name: "Aryabhatta University of Science & Technology", location: "Bhopal, Madhya Pradesh", type: "State", accreditation: "AICTE Approved", programsOffered: 35, sortOrder: 4 },
  { name: "Trident School of Management Research", location: "Gurugram, Haryana", type: "Deemed", accreditation: "AACSB-Aligned", programsOffered: 18, sortOrder: 5 },
  { name: "Narmada State Open University", location: "Indore, Madhya Pradesh", type: "State", accreditation: "UGC-DEB Approved", programsOffered: 26, sortOrder: 6 },
  { name: "Chanakya Institute of Policy & Law", location: "Kolkata, West Bengal", type: "Private", accreditation: "BCI Recognised", programsOffered: 12, sortOrder: 7 },
  { name: "Bharati Institute of Health Sciences", location: "Hyderabad, Telangana", type: "Deemed", accreditation: "NAAC A+", programsOffered: 22, sortOrder: 8 },
  { name: "Devgiri University of Humanities", location: "Chh. Sambhajinagar, Maharashtra", type: "State", accreditation: "UGC-Recognised", programsOffered: 16, sortOrder: 9 },
  { name: "Lotus Valley University of Education", location: "Jaipur, Rajasthan", type: "Private", accreditation: "NCTE Approved", programsOffered: 14, sortOrder: 10 },
  { name: "Sarayu Institute of Technology", location: "Coimbatore, Tamil Nadu", type: "Private", accreditation: "NBA Accredited", programsOffered: 24, sortOrder: 11 },
  { name: "Northgate International University", location: "Mohali, Punjab", type: "Private", accreditation: "NAAC A", programsOffered: 30, sortOrder: 12 },
];

export const SEED_TESTIMONIALS: SeedTestimonial[] = [
  { name: "Dr. Ananya Krishnan", role: "Assistant Professor, Chennai", program: "PhD in Management", quote: "IRPS turned a confusing admission maze into a clear staircase. My supervisor match happened in twelve days, and my first Scopus paper was published before my second-year review.", rating: 5, year: "2024", sortOrder: 1 },
  { name: "Dr. Rohit Menon", role: "Senior Software Architect", program: "PhD in Computer Science", quote: "As a full-time engineer I needed structure, not sermons. The weekend research colloquium and the publication roadmap kept me honest. I defended my thesis in 41 months.", rating: 5, year: "2023", sortOrder: 2 },
  { name: "Dr. Farah Siddiqui", role: "School Principal, Lucknow", program: "PhD in Education", quote: "From instrument validation to the viva rehearsal, every milestone was scheduled and supported. The mentors treat your research like it is their own reputation on the line.", rating: 5, year: "2024", sortOrder: 3 },
  { name: "Dr. Vikram Aditya Rao", role: "Legal Counsel, New Delhi", program: "PhD in Law", quote: "The doctrinal-methods training alone was worth it. IRPS gave my research the rigor of a top law school and the speed of a well-run consultancy.", rating: 5, year: "2025", sortOrder: 4 },
  { name: "Dr. Sneha Kulkarni", role: "Research Scientist, Pune", program: "PhD in Life Sciences", quote: "Wet-lab access, ethics documentation, biostatistics support — everything I worried about was already systematised. My thesis had three published papers behind it.", rating: 5, year: "2023", sortOrder: 5 },
  { name: "Dr. Arjun Prakash", role: "Data Science Lead, Bengaluru", program: "PhD in AI & Data Science", quote: "The mentors pushed me from a fuzzy idea about LLM evaluation to a mathematically sound framework. Two IEEE submissions later, I am Dr. Prakash.", rating: 5, year: "2025", sortOrder: 6 },
];

export const SEED_STORIES: SeedStory[] = [
  { name: "Dr. Priya Natarajan", domain: "Artificial Intelligence", university: "Kaivalya Research University", topic: "Conformal Prediction Frameworks for Low-Resource Indic Language Models", quote: "Thirty-eight months, four papers, one doctorate. The structure works if you show up.", year: "2025", durationMonths: 38, sortOrder: 1 },
  { name: "Dr. Mohammed Rizwan", domain: "Finance & Commerce", university: "Meridian Global University", topic: "Behavioural Determinants of Retail Fintech Adoption in Tier-2 India", quote: "IRPS's database access changed the scale of what I could prove.", year: "2024", durationMonths: 42, sortOrder: 2 },
  { name: "Dr. Kavya Sharma", domain: "Education & Pedagogy", university: "Lotus Valley University of Education", topic: "NEP 2020 and Learning Outcome Assessment in Rural Secondary Schools", quote: "Fieldwork support and ethics paperwork were handled like clockwork.", year: "2024", durationMonths: 40, sortOrder: 3 },
  { name: "Dr. Joseph Mathew", domain: "Law & Public Policy", university: "Chanakya Institute of Policy & Law", topic: "Data Protection Regimes and the Future of Digital Privacy in India", quote: "Comparative-law mentoring gave my thesis genuine international depth.", year: "2025", durationMonths: 45, sortOrder: 4 },
  { name: "Dr. Divya Ramesh", domain: "Life Sciences & Biotech", university: "Bharati Institute of Health Sciences", topic: "Metagenomic Signatures of Urban Water Systems and Antimicrobial Resistance", quote: "From protocol design to journal acceptance — every promise was kept.", year: "2023", durationMonths: 48, sortOrder: 5 },
  { name: "Dr. Aditya Deshpande", domain: "Engineering & Technology", university: "Sarayu Institute of Technology", topic: "Energy-Aware Routing Protocols for 6G IoT Edge Networks", quote: "Two patents filed alongside the thesis. That is the IRPS difference.", year: "2024", durationMonths: 44, sortOrder: 6 },
];

export const SEED_BLOGS: SeedBlog[] = [
  {
    slug: "phd-admission-guide-2026",
    title: "PhD Admission 2026: The Complete Guide to Choosing a UGC-Recognised University",
    excerpt: "Everything you need to know before applying — UGC regulations, entrance routes, supervisor selection and the red flags that separate genuine doctoral programmes from paper mills.",
    coverImage: "/media/library-modern.jpg",
    author: "IRPS Research Desk",
    category: "Admissions",
    tags: ["PhD Admission", "UGC", "Guide"],
    readMinutes: 8,
    publishedAt: new Date("2025-12-18"),
    content: `Choosing where to do your PhD is arguably more important than what you research. The institution determines your supervisor pool, coursework quality, evaluation rigor — and how the academic world reads your degree for the rest of your career.

## Start with recognition, not rankings

The single non-negotiable for an Indian PhD is recognition under the UGC (Minimum Standards and Procedures for Award of PhD Degrees) Regulations, 2022. Before anything else, verify that the university appears on the UGC's recognised list and that it has a functioning School of Research with notified intake.

## Understand the entrance routes

Most scholars enter through one of three doors:

- UGC-NET / CSIR-NET qualified candidates, who are typically exempt from university entrance tests
- University-conducted entrance examinations followed by an interview
- GATE / CEED or equivalent national scores for technical disciplines

If you have not cleared NET yet, do not panic — the university entrance route is well-trodden, and structured preparation of eight to ten weeks is usually sufficient.

## The supervisor matters more than the syllabus

A great supervisor at an average university will consistently outperform an absent supervisor at a famous one. Ask three questions before you commit: How many scholars is the supervisor currently guiding? What is their publication record in the last three years? How quickly do they return drafts?

## Red flags to walk away from

Be wary of any programme that promises a doctorate in under three years, asks for the entire fee upfront without a university-issued admission letter, or cannot name the exact school and department you will enrol in. A genuine PhD takes three to six years — anyone promising less is selling something else.

At IRPS, every university in our network is verified against the UGC list each admission cycle, and every scholar receives the university admission letter directly. If you are evaluating options for the January 2026 intake, book a free eligibility consultation and we will map your profile to the right doors.`,
  },
  {
    slug: "part-time-vs-full-time-phd",
    title: "Part-Time vs Full-Time PhD: What Working Professionals Should Actually Know",
    excerpt: "The honest trade-offs between part-time, full-time and hybrid doctoral formats — duration, employer NOCs, coursework logistics and how each shapes your thesis timeline.",
    coverImage: "/media/library-desk.jpg",
    author: "Dr. Meera Iyer",
    category: "Careers",
    tags: ["Part-Time PhD", "Working Professionals"],
    readMinutes: 6,
    publishedAt: new Date("2025-11-02"),
    content: `Every week, dozens of working professionals ask us the same question: can I really do a PhD without quitting my job? The short answer is yes. The honest answer is: yes, if you choose the right format and respect its demands.

## What the regulations actually say

The UGC 2022 regulations permit part-time PhD programmes, provided the university ensures regular contact hours and the scholar meets the same evaluation standards as full-time candidates. Your degree certificate does not carry the words "part-time" — the doctorate is identical.

## The real trade-offs

A full-time PhD in India typically completes in three to four years. A part-time doctorate realistically takes four to six. You trade speed for continuity of income and professional growth — and for many scholars, the workplace itself becomes the research site, which is a genuine advantage in applied disciplines like management, education and engineering.

## What your employer needs to do

Most universities require a No Objection Certificate from your employer at the time of admission to a part-time programme. Some additionally ask for a study-leave undertaking for coursework semesters. Secure these conversations early; a supportive reporting manager is an underrated PhD asset.

## The hybrid middle path

Several of our partner universities now run weekend-contact and hybrid formats where coursework happens in nine-to-eleven-day contact blocks each semester, with supervision online. For professionals in metro cities, this is usually the sweet spot.

If you are weighing the formats, our counsellors will map your working hours, discipline and research ambitions to the format with the highest probability of completion. The best PhD is the finished one.`,
  },
  {
    slug: "winning-phd-research-proposal",
    title: "How to Write a Winning PhD Research Proposal (That Supervisors Actually Read)",
    excerpt: "The exact structure that gets proposals shortlisted — problem framing, gap statements, methodology scaffolding and the five mistakes that get applications binned.",
    coverImage: "/media/researcher-writing.jpg",
    author: "IRPS Research Desk",
    category: "Research Skills",
    tags: ["Research Proposal", "Synopsis"],
    readMinutes: 7,
    publishedAt: new Date("2025-10-14"),
    content: `Your research proposal — the synopsis — is the single document on which admission committees and prospective supervisors judge you. Scholars routinely spend months polishing their CV and forty minutes on the proposal. That ratio should be reversed.

## The architecture of a strong proposal

A competitive proposal answers six questions in order: What is the broad domain? What is the specific problem? Why does it matter (the research gap)? What are your objectives and tentative hypotheses? How will you investigate it (methodology)? What will the world know afterwards that it does not know now?

- Title: specific, searchable, twelve to eighteen words
- Introduction and gap: the sharpest two pages you will ever write
- Objectives: three to five, verb-led, measurable
- Methodology: design, sampling, instruments, analysis plan
- Timeline and expected outcomes with a preliminary reference list

## The five fatal mistakes

First, a topic so broad it could seed a hundred theses. Second, a gap statement that is really just a complaint. Third, methodology described in textbook language rather than applied to your problem. Fourth, objectives that are activities, not outcomes. Fifth — and most common — plagiarism. Committees check; a flagged proposal ends the conversation permanently.

## How we help

Every IRPS scholar goes through a three-draft proposal workshop: a framing session with a domain mentor, a methods review with a statistician or methodologist, and a language and originality pass with similarity-index reports. The result is a synopsis that reads like the first chapter of a finished thesis.`,
  },
  {
    slug: "phd-without-net-entrance-exam",
    title: "PhD Without NET: University Entrance Exams, Exemptions and the Honest Truth",
    excerpt: "Do you need UGC-NET to do a PhD in 2026? No — and yes. A clear-eyed guide to entrance exemptions, university-level tests and what each path means for fellowship and career.",
    coverImage: "/media/library-aerial.jpg",
    author: "Prof. Sandeep Raghavan",
    category: "Eligibility",
    tags: ["UGC NET", "Entrance Exam", "Eligibility"],
    readMinutes: 5,
    publishedAt: new Date("2025-09-08"),
    content: `"Can I do a PhD without clearing NET?" is the most-asked question in our consultation rooms. The regulatory answer: UGC-NET is not mandatory for PhD admission. Universities may admit candidates through their own entrance examinations and interviews.

## Where NET still matters

NET qualification confers two real advantages. First, it earns exemption from university entrance tests almost everywhere, shortening your admission cycle to an interview alone. Second — and more importantly for full-time scholars — NET-JRF is the gateway to the ₹37,000+ monthly fellowship. If you intend to research without other income, NET-JRF is the funding engine.

## The university entrance route

University PhD entrance tests typically assess research methodology (around 50% of the paper) and subject knowledge (the remainder). The methodology half is eminently coachable: research design, sampling, statistics, ethics and academic writing.

- Eight to ten weeks of structured preparation is usually adequate
- Interviews focus on your proposal and motivation, not your marks
- Working professionals are often given interview slots on weekends

## Our honest advice

If a career in teaching at Indian universities is your goal, attempt NET regardless — Assistant Professorship eligibility still flows from it. If your doctorate is for research leadership in industry, or academic enrichment, the university entrance route is a fully legitimate door. Thousands of our scholars have walked through it.`,
  },
  {
    slug: "emerging-phd-research-domains-2026",
    title: "12 Emerging PhD Research Domains for 2026 (Beyond the Usual Suspects)",
    excerpt: "From AI safety to climate finance — the research areas where supervisors are hiring, journals are hungry, and funding is flowing for the next admission cycle.",
    coverImage: "/media/lab-notes.jpg",
    author: "IRPS Research Desk",
    category: "Research Domains",
    tags: ["Research Areas", "Trends"],
    readMinutes: 6,
    publishedAt: new Date("2025-08-21"),
    content: `The smartest doctoral applicants do not chase crowded fields — they position early where demand for original research outstrips the supply of researchers. Here is where our mentor network sees the strongest currents for 2026.

## The technology frontier

AI safety, evaluation and alignment research is the most under-supplied area in computer science. Adjacent to it: LLMs for Indic and low-resource languages, where Indian scholars enjoy a structural advantage. Quantum-safe cryptography, digital-twin manufacturing and 6G network intelligence round out the engineering list.

## The business of change

Climate finance and ESG measurement continues to absorb doctoral talent in finance and management programmes. Platform labour and gig-economy policy, consumer behaviour in quick-commerce, and AI adoption in MSMEs offer rich, data-accessible management theses.

## The human systems

On the humanities and social-science side: digital privacy jurisprudence post-DPDP Act, AI in classrooms and assessment integrity, climate migration in South Asia, and mental-health systems research.

- AI safety & alignment
- LLMs for Indic languages
- Climate finance & ESG
- Digital privacy law
- AI in education policy
- Antimicrobial resistance & urban health

Choosing early does not mean choosing alone. In a domain-mapping consultation, we overlay your background, data access and career target onto these currents and shortlist three thesis territories with named supervisors.`,
  },
  {
    slug: "synopsis-to-viva-phd-milestones",
    title: "From Synopsis to Viva: The PhD Milestone Playbook Nobody Hands You",
    excerpt: "RDC meetings, coursework exams, progress seminars, pre-submission, plagiarism thresholds, external examiners — the complete timeline of an Indian doctorate, decoded.",
    coverImage: "/media/grad-steps.jpg",
    author: "Dr. Meera Iyer",
    category: "Admissions",
    tags: ["PhD Process", "Thesis", "Viva"],
    readMinutes: 7,
    publishedAt: new Date("2025-07-15"),
    content: `Universities hand you a registration letter. Nobody hands you the map. Here is the milestone sequence of a typical Indian doctorate, decoded from hundreds of completed scholar journeys.

## Year one: foundations

Admission and provisional registration, followed by coursework — research methodology, discipline electives and a research-and-publication ethics course now mandated by UGC. Your synopsis is presented to the Research Degree Committee (RDC); confirmation of registration usually follows within the first year.

## Years two and three: evidence

Six-monthly progress seminars report your work to the doctoral committee. This is the season of data collection, experiments, analysis — and publications. Most universities require a minimum of one or two papers in UGC-CARE or Scopus-indexed journals before pre-submission.

## The final stretch

- Pre-submission (pre-PhD) presentation to the department
- Similarity check — most universities require similarity below 10% excluding bibliography
- Thesis submission and dispatch to two external examiners
- Examiner reports, corrections if any, and the open viva-voce
- Award notification, convocation, and the word "Doctor" before your name

## The invisible discipline

Milestones are calendar events; what actually completes PhDs is weekly writing. Scholars who defend on schedule share one habit — two protected research blocks every week, kept as sacred as a flight departure. Our milestone-tracking dashboard exists to protect exactly that.`,
  },
];

export const SEED_FAQS: SeedFaq[] = [
  { question: "Is a PhD from an IRPS partner university valid for government jobs and Assistant Professor posts?", answer: "Yes. Every university in the IRPS network is UGC-recognised and awards the doctorate under the UGC (Minimum Standards and Procedures for Award of PhD Degrees) Regulations, 2022. Your degree is awarded directly by the university and is valid for academic, government and corporate appointments in India and abroad.", category: "Admissions", sortOrder: 1 },
  { question: "What exactly does IRPS do — is IRPS itself a university?", answer: "IRPS is not a university and does not confer degrees. We are a doctoral admissions and research-guidance institute: we help you select a UGC-recognised university, crack the entrance and interview, prepare your research proposal, connect you with supervisors, and support you with methodology, statistics, writing and publication until your viva. The university alone awards your degree.", category: "Admissions", sortOrder: 2 },
  { question: "Can I pursue a PhD while working full-time?", answer: "Absolutely. Most of our scholars are working professionals enrolled in part-time, weekend or hybrid formats. You will need a No Objection Certificate from your employer, and you should realistically budget four to six years. Your degree certificate is identical to a full-time doctorate.", category: "Admissions", sortOrder: 3 },
  { question: "How long does the admission process take with IRPS?", answer: "For a typical candidate: profile consultation in the first week, university shortlisting within ten days, proposal drafting in three to five weeks, entrance and interview over the following admission cycle. Most scholars hold a university admission letter within 60–90 days of starting with us.", category: "Admissions", sortOrder: 4 },
  { question: "What is the minimum eligibility for PhD admission in 2026?", answer: "A master's degree (or a four-year bachelor's with 75% where permitted) in a relevant discipline with at least 55% aggregate — 50% for SC/ST/OBC (non-creamy layer)/differently-abled candidates as per UGC norms. Some universities additionally require an entrance test or UGC-NET/GATE score.", category: "Eligibility", sortOrder: 5 },
  { question: "Do I need to clear UGC-NET to get admission?", answer: "No. NET-qualified candidates are exempt from university entrance tests and may access JRF fellowships, but most partner universities conduct their own entrance examination and interview. Our entrance-preparation module prepares you for both the methodology and subject sections.", category: "Eligibility", sortOrder: 6 },
  { question: "I completed my master's through distance/online mode. Am I eligible?", answer: "In most cases, yes — provided your degree is from a UGC-recognised institution. Eligibility of distance and online master's degrees is assessed university-by-university, which is exactly what our free eligibility evaluation does for you in 24 hours.", category: "Eligibility", sortOrder: 7 },
  { question: "What are the total costs involved in completing a PhD?", answer: "Costs have two components: the university's fees (tuition, registration, coursework, examination and thesis evaluation — typically ₹1.9–3.5 lakh over the programme) and IRPS guidance fees for mentoring, statistics and publication support, payable in instalments aligned to milestones. You receive a complete written costing before you commit to anything.", category: "Fees & Scholarships", sortOrder: 8 },
  { question: "Are scholarships or fellowships available for PhD scholars?", answer: "Yes. Full-time scholars can pursue UGC-JRF/SRF (₹37,000–₹42,000/month), university merit scholarships, and schemes such as the Prime Minister's Research Fellowship for eligible disciplines. Several partner universities offer tuition waivers of 25–60% for strong entrance performers and for women researchers. Our scholarships desk maps every scheme you qualify for.", category: "Fees & Scholarships", sortOrder: 9 },
  { question: "Can I pay the guidance fee in instalments?", answer: "Yes. Guidance fees are structured across four to six milestone-linked instalments — enrolment, coursework completion, synopsis approval, publication, and pre-submission — so you never pay for support you have not yet received.", category: "Fees & Scholarships", sortOrder: 10 },
  { question: "Will IRPS help me publish in Scopus or UGC-CARE journals?", answer: "Publication support is a core service: journal shortlisting matched to your work, manuscript structuring, similarity reduction, reviewer-comment handling and resubmission strategy. We support only legitimate, indexed venues — we have zero association with predatory journals and will tell you plainly if a venue is not credible.", category: "Research Support", sortOrder: 11 },
  { question: "I am stuck mid-PhD with my thesis/statistics. Can I join support midway?", answer: "Yes — around a third of our scholars come to us after enrolment elsewhere. The Rescue Track covers stuck literature reviews, methodology redesign, SPSS/R/statistics completion, chapter drafting and viva preparation. A senior mentor audits your progress and gives you a written recovery plan within a week.", category: "Research Support", sortOrder: 12 },
];
