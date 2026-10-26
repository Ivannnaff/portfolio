export const translations = {
  en: {
    nav: {
      home: "Home",
      now: "Now",
      uses: "Uses",
      resume: "Resume",
      contact: "Contact",
    },
    home: {
      role: "Full-stack web developer",
      bio: "I'm a full-stack web developer. I build apps with Laravel, React, and Next.js, and I'm currently an IT undergraduate at Universitas PGRI Semarang.",
      availability: "Currently open for internships, freelance work, and collaboration",
      featuredWork: "Featured Work",
    },
    now: {
      title: "Now",
      subtitle: "What I'm currently focused on.",
      footer: "Updated recently from Semarang, Indonesia.",
      listening: {
        title: "Listening to",
        empty: "Not playing anything right now.",
      }
    },
    uses: {
      title: "Uses",
      intro: "Software, hardware, and gadgets I use daily to build things.",
      sections: [
        {
          label: "Development",
          items: [
            { name: "VS Code", note: "Primary code editor with One Dark Pro theme." },
            { name: "Terminus / Git Bash", note: "Reliable terminal environment on Windows." },
          ]
        },
        {
          label: "Hardware",
          items: [
            { name: "Custom Laptop", note: "Equipped with 16GB RAM and SSD for fast compiling." },
            { name: "Mechanical Keyboard", note: "Tactile switches for comfortable typing." }
          ]
        }
      ]
    },
    resume: {
      title: "Resume",
      backButton: "← Back home",
      printButton: "Print resume",
      role: "Full-Stack Web Developer",
      location: "Semarang, Indonesia",
      email: "ivanalfa647@gmail.com",
      github: "github.com/Ivannnaff",
      linkedin: "linkedin.com/in/IvanAkbarAlfahrezi",
      summary: "Passionate full-stack developer with experience in building web applications using modern technologies like Laravel, React, and Astro. Eager to tackle challenging problems and build scalable solutions.",
      experience: [
        {
          role: "Full-Stack Developer",
          company: "Freelance & Personal Projects",
          period: "2023 — Present",
          points: [
            "Developed multiple web applications focusing on clean UI and fast performance.",
            "Integrated modern authentication, databases, and responsive Tailwind styling."
          ]
        }
      ],
      projects: [
        {
          name: "Task Manager AI",
          tech: "React, Node.js, AI",
          desc: "A college task manager with a drag-and-drop Kanban board and AI assistant.",
          url: "https://github.com/Ivannnaff"
        }
      ],
      skills: {
        languages: ["JavaScript", "TypeScript", "PHP", "HTML/CSS"],
        frontend: ["React", "Astro", "Tailwind CSS", "Next.js"],
        backend: ["Node.js", "Laravel", "Express", "MySQL"],
        tools: ["Git", "VS Code", "Vercel", "Vite"]
      },
      education: [
        {
          school: "Universitas PGRI Semarang",
          period: "2023 — Present",
          degree: "Bachelor of Information Technology (IT)",
          note: "Active student focusing on software engineering and web technologies."
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch or connect across the web.",
    }
  }
};
