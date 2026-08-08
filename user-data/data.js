const hero = {
  pageTitle: "Adam Walker",
  eyebrow: "Happily employed and building great products",
  title: "Senior Full-Stack Engineer",
  summary:
    "I build fast, thoughtful software from distributed backend systems to polished frontend and mobile experiences.",
  focus: "End-to-end engineering across backend services, frontend experiences, mobile apps, and cloud delivery.",
  location:
    "Based in Scotland, working with teams that care about maintainable systems and practical delivery.",
  availability:
    "Open to conversations about product engineering, architecture, automation, and platform strategy.",
};

const bio = [
  "Hello, I'm Adam Walker!",
  "<strong>Full Stack Software Engineer</strong> with a background in DevOps and a focus on building efficient, scalable applications.",
  "Experienced in C#, Go, and Flutter/Dart, with a strong foundation in Azure cloud services.",
  "Skilled in infrastructure as code using ARM templates, Bicep, YAML, and PowerShell.",
  "Passionate about clean architecture, automation, and continuously improving engineering practices.",
];

const skills = [
  {
    title: "Backend & APIs",
    summary: "Designing dependable services and integrations that stay maintainable as systems grow.",
    items: ["C#", ".NET", "Go", "API Design", "Microservices", "Azure Functions"],
  },
  {
    title: "Frontend & Mobile",
    summary: "Creating clear, usable interfaces across admin tools, web apps, and mobile products.",
    items: ["Angular", "TypeScript", "JavaScript", "Flutter", "Dart", "HTML5 & CSS"],
  },
  {
    title: "Cloud & Delivery",
    summary: "Automating infrastructure and release workflows so teams can ship with confidence.",
    items: ["Azure", "Azure DevOps", "GitHub Actions", "CI/CD", "App Services", "Azure SQL"],
  },
  {
    title: "Infrastructure & Operations",
    summary: "Applying platform thinking to observability, infrastructure as code, and operational resilience.",
    items: ["Bicep", "ARM Templates", "YAML", "PowerShell", "Monitoring & Logging", "Blob Storage"],
  },
  {
    title: "Engineering Approach",
    summary: "Working in ways that keep products scalable, understandable, and easy to evolve.",
    items: ["Clean Architecture", "Automation", "DevOps", "Mentoring", "Agile Delivery", "Product Collaboration"],
  },
];

const highlights = [
  {
    title: "Cloud-first delivery",
    description: "Shipping features with Azure-native infrastructure, automation, and operational visibility built in.",
  },
  {
    title: "User-focused engineering",
    description: "Turning complex product needs into interfaces and workflows that are practical to use every day.",
  },
  {
    title: "Cross-functional impact",
    description: "Bridging engineering, DevOps, UX, and stakeholders to keep delivery moving in the right direction.",
  },
];

const experience = [
  {
    title: "Safehinge Primera",
    duration: "March 2025 - Present",
    subtitle: "Full Stack Developer",
    details: [
      "Building scalable web and mobile applications that support safety and wellbeing monitoring in high-risk environments.",
      "Using Go to develop backend services that interface with IoT devices, enabling real-time monitoring and control.",
      "Developing cross-platform mobile apps for Android and iOS using Flutter and Dart.",
      "Creating and maintaining rich, interactive admin interfaces with Angular and TypeScript.",
      "Collaborating with product, QA, and UX teams to deliver robust, user-focused features across platforms.",
    ],
    tags: ["Go", "Flutter", "Dart", "TypeScript", "Angular", "iOS", "Android", "IoT"],
    icon: "shield",
  },
  {
    title: "Sitekit Applications Ltd",
    duration: "September 2019 - March 2025",
    subtitle: "Senior Software Developer / DevOps Engineer",
    details: [
      "Led Agile workflows and acted as Scrum Master for the NHS Digital Staff Passport (DSP) project involving 20+ team members.",
      "Mentored new developers and delivered in-house training, significantly increasing team capability and autonomy.",
      "Worked alongside UX designers and stakeholders to ensure technical alignment and design consistency.",
      "Provided consultancy and architectural guidance for Azure services, shaping cloud strategies for multiple projects.",
      "Managed stakeholder expectations and supported both client engagements and internal development tasks.",
      "Engineered a microservices-based system using Azure Durable Functions for NHS England’s Covid-19 response.",
      "Built a real-time, cloud-native support dashboard using Azure Lighthouse and Application Insights.",
    ],
    tags: [
      "Azure",
      "C#",
      ".NET Core",
      "Angular",
      "TypeScript",
      "Docker",
      "Kubernetes",
      "Azure Functions",
      "Terraform",
      "CI/CD",
      "BICEP",
      "ARM Templates",
    ],
    icon: "cloud",
  },
];

const education = [
  {
    title: "Bachelor of Software Engineering",
    duration: "",
    subtitle: "Edinburgh Napier University",
    details: ["Graduated with Distinction"],
    tags: [
      "Software Engineering",
      "System Architecture",
      "Cloud Computing",
      "Project Management",
    ],
    icon: "graduation-cap",
  },
  {
    title: "Higher National Certificate in Computing",
    duration: "",
    subtitle: "West Lothian College",
    details: [],
    tags: ["Computing Fundamentals", "Programming", "Databases"],
    icon: "book",
  },
];

const certifications = [
  {
    level: "expert",
    title: "Microsoft Certified: Azure Solutions Architect Expert",
    detailsUrl: "",
  },
  {
    level: "expert",
    title: "Microsoft Certified: DevOps Engineer Expert",
    detailsUrl: "",
  },
  {
    level: "associate",
    title: "Microsoft Certified: Azure AI Engineer Associate",
    detailsUrl: "",
  },
  {
    level: "associate",
    title: "Microsoft Certified: Azure Administrator Associate",
    detailsUrl: "",
  },
  {
    level: "associate",
    title: "Microsoft Certified: Azure Developer Associate",
    detailsUrl: "",
  },
];

const footer = [
  //   {
  //     label: "Dev Profiles",
  //     data: [
  //       {
  //         text: "Stackoverflow",
  //         link: "https://stackoverflow.com/users/8461233/Ginge1756",
  //       },
  //       {
  //         text: "GitHub",
  //         link: "https://github.com/Ginge1756",
  //       },
  //       {
  //         text: "LeetCode",
  //         link: "https://leetcode.com/somawatvinay/",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Resources",
  //     data: [
  //       {
  //         text: "Enable Dark/Light Mode",
  //         func: "enableDarkMode()",
  //       },
  //       {
  //         text: "Print this page",
  //         func: "window.print()",
  //       },
  //       {
  //         text: "Clone this page",
  //         link: "https://github.com/Ginge1756/Ginge1756.github.io",
  //       },
  //     ],
  //   },
  {
    label: "Links",
    data: [
      {
        text: "Linkedin",
        link: "https://www.linkedin.com/in/adam-w-68775a3b/",
      },
      {
        text: "Github",
        link: "https://github.com/Ginge1756/",
      },
    ],
  },
  {
    label: "copyright-text",
    data: ["Made with &hearts; by Adam Walker"],
  },
];

window.AppData = {
  hero,
  bio,
  skills,
  highlights,
  experience,
  education,
  certifications,
  footer,
};
