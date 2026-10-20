export const translations = {
  en: {
    wordmark: "Ivannaff",
    nav: {
      home: "Home",
      now: "Now",
      uses: "Uses",
      til: "TIL",
      contact: "Contact",
    },
    hero: {
      title: "Ivan Akbar Alfahrezi",
      tagline: "I'm a full-stack web developer. I build apps with Laravel, React, and Next.js, and I'm currently an IT undergraduate at Universitas PGRI Semarang.",
      availability: "Currently open for internships, freelance work, and collaboration",
      photoCaption: "IVAN AKBAR ALFAHREZI"
    },
    now: {
      title: "Now",
      intro: "A snapshot of what I'm focused on right now.",
      updatedLabel: "Last updated",
      updated: "October 2026",
      sections: [
        {
          label: "Focus",
          heading: "Full-stack web development.",
          body: "IT undergrad at Universitas PGRI Semarang, building full-stack web applications with PHP (Laravel), React, and Next.js."
        },
        {
          label: "Building",
          heading: "Side projects and coursework.",
          body: "A few things I'm actively building right now.",
          links: [
            { label: "Task Manager AI", url: "https://github.com/IvanAkbarAlfahrezi/task-manager" },
            { label: "Nusantara Hub", url: "https://github.com/IvanAkbarAlfahrezi/nusantara-hub" }
          ]
        },
        {
          label: "Learning",
          heading: "Currently learning.",
          items: [
            { name: "Laravel", note: "Backend development with PHP and Laravel." },
            { name: "React & Next.js", note: "Modern frontend and full-stack web apps." },
            { name: "TypeScript", note: "Writing safer, cleaner JavaScript." }
          ]
        },
        {
          label: "Open to",
          heading: "New work and collaboration.",
          list: [
            "Internships",
            "Freelance projects",
            "Collaboration on interesting projects"
          ]
        }
      ],
      listening: {
        label: "Listening",
        heading: "On repeat.",
        empty: "Nothing to show right now."
      },
      footer: "This page is written by hand and updated whenever things change."
    },
    projects: {
      title: "Featured Work",
      subtitle: "Systems and web applications designed for performance and clarity.",
      source: "Source Code",
      items: [
        {
          title: "Task Manager AI",
          category: "Web App · AI",
          description: "A college task manager with a drag-and-drop Kanban board and an AI assistant powered by Google Gemini. Upload course materials (PDF, Word, PPT, Excel, images) to get summaries, answer keys, and auto-generated quizzes — all stored in Supabase.",
          tags: ["React", "TypeScript", "Next.js", "Supabase", "Gemini"],
          repoUrl: "https://github.com/IvanAkbarAlfahrezi/task-manager",
        },
        {
          title: "Nusantara Hub",
          category: "Python App · Streamlit",
          description: "A Streamlit web app with a neo-brutalist interface combining a landing page, an interactive chat, and a repository browser, backed by MySQL.",
          tags: ["Python", "Streamlit", "MySQL", "CSS"],
          repoUrl: "https://github.com/IvanAkbarAlfahrezi/nusantara-hub",
        }
      ]
    },
    experience: {
      title: "Education & Background",
      subtitle: "My academic path in Informatics and ongoing web development journey.",
      items: [
        {
          period: "2023 — PRESENT",
          role: "Informatics Student",
          company: "Universitas PGRI Semarang (UPGRIS)",
          description: "Pursuing a Bachelor degree in Informatics. Actively studying core computer science concepts, algorithms, database management, and web engineering."
        },
        {
          period: "2023 — PRESENT",
          role: "Web Developer (Independent Exploration)",
          company: "Self-Trained / Projects",
          description: "Actively building and deploying web applications using PHP (Laravel), React, and Next.js, focusing on clean code structure and responsive interfaces."
        }
      ]
    },
    contact: {
      title: "Let's build something exceptional.",
      subtitle: "Currently available for student collaborations, freelance projects, and tech discussions.",
      emailLabel: "Direct Email",
      githubLabel: "GitHub Profile",
      linkedinLabel: "LinkedIn",
      twitterLabel: "Twitter / X",
      formName: "Your Name",
      formEmail: "Email Address",
      formMessage: "Message",
      sendButton: "Send Message",
      successMessage: "Message transmitted successfully. I will be in touch shortly.",
      errorHuman: "Please verify that you are not a robot.",
      errorSend: "Something went wrong. Please try again or email me directly.",
      sending: "Sending..."
    },
    footer: {
      rights: "All rights reserved.",
      site: "This Site",
      resources: "Resources",
      connect: "Connect",
      projects: "Projects",
      source: "Source",
      lastPlayed: "Last played",
      nowPlaying: "Now playing"
    },
    uses: {
      title: "Uses",
      intro: "The tools, software, and gear I use day-to-day.",
      sections: [
        {
          label: "Editor",
          items: [
            { name: "VS Code", note: "My main editor. Clean, fast, and has everything I need." },
            { name: "Neovim", note: "For quick edits in the terminal." },
          ]
        },
        {
          label: "Terminal",
          items: [
            { name: "Windows Terminal", note: "With PowerShell as my default shell." },
            { name: "Git Bash", note: "For git workflows and unix-style commands." },
          ]
        },
        {
          label: "Stack",
          items: [
            { name: "React & Next.js", note: "My go-to for frontend and full-stack web apps." },
            { name: "Laravel (PHP)", note: "Backend of choice for structured, larger projects." },
            { name: "TypeScript", note: "Writing JavaScript with confidence." },
            { name: "Tailwind CSS", note: "Utility-first CSS — fast and consistent." },
            { name: "Supabase", note: "Postgres + auth + storage, all in one." },
          ]
        },
        {
          label: "Design",
          items: [
            { name: "Figma", note: "For wireframes and UI mockups before building." },
          ]
        },
        {
          label: "Hardware",
          items: [
            { name: "Laptop", note: "My main machine for everything — coding, design, writing." },
            { name: "Earphones", note: "Always on while coding. Lo-fi or instrumental playlists." },
          ]
        },
        {
          label: "Misc",
          items: [
            { name: "Notion", note: "Notes, planning, and personal knowledge base." },
            { name: "GitHub", note: "All my projects live here." },
            { name: "Postman", note: "API testing and debugging." },
          ]
        }
      ]
    },
    til: {
      title: "TIL",
      intro: "Today I Learned — short notes on things I pick up while coding, reading, or just exploring.",
      entries: [
        {
          date: "Oct 2026",
          tag: "Supabase",
          title: "Supabase Storage bucket needs to be public for direct URL access",
          body: "When building the task-manager, I kept getting 400 errors on uploaded file URLs. Turns out the bucket needs to be set to public in Supabase dashboard, or you need to use createSignedUrl() for private buckets. Public bucket is fine for non-sensitive files like course materials."
        },
        {
          date: "Oct 2026",
          tag: "React",
          title: "dnd-kit needs explicit transform styles to animate drag",
          body: "When implementing the Kanban drag-and-drop in task-manager, items wouldn't visually move until I passed the transform from useSortable() directly as inline styles. dnd-kit doesn't apply styles automatically — you have to wire transform and transition yourself."
        },
        {
          date: "Oct 2026",
          tag: "TypeScript",
          title: "Typing FormData fields always returns string | File, not the specific type",
          body: "In the task-manager upload feature, I was trying to type FormData.get() as string directly and TypeScript complained. FormData.get() always returns string | File | null — you need to cast it or check the type first before using it."
        },
        {
          date: "Oct 2026",
          tag: "Docker",
          title: "Docker volumes persist data between container restarts",
          body: "I learned that containers are ephemeral — if you don't mount a volume, data written inside the container disappears when it stops. Using -v or defining volumes in docker-compose.yml keeps data like database files alive between restarts."
        },
        {
          date: "Sep 2026",
          tag: "Next.js",
          title: "API routes in Next.js don't run on the client — even if imported from client components",
          body: "I was confused why my Gemini API key was still exposed. Turns out importing a server function from a client component doesn't make it server-side. You need to call it via fetch() to an actual /api route, not import it directly."
        },
        {
          date: "Aug 2026",
          tag: "Flutter",
          title: "setState inside initState won't trigger a rebuild",
          body: "In money-manag, I tried calling setState() inside initState() to load initial data and nothing updated. You need to wrap async calls with a proper async method and call setState() after the await, or use addPostFrameCallback to schedule state updates after the first frame."
        },
      ]
    },
    settings: {
      title: "Preferences",
      language: "Language",
      animation: "Animations",
      layout: "Layout Width",
      theme: "Theme",
      animSystem: "System",
      animOn: "Enabled",
      animOff: "Disabled",
      layoutDefault: "Default",
      layoutWide: "Wide",
      layoutWider: "Wider",
    },
    resume: {
      title: "Resume",
      name: "Ivan Akbar Alfahrezi",
      role: "Full-Stack Web Developer",
      location: "Semarang, Indonesia",
      email: "ivanalfa647@gmail.com",
      github: "github.com/Ivannnaff",
      linkedin: "linkedin.com/in/ivan-akbar",
      summary: "IT undergraduate at Universitas PGRI Semarang with hands-on experience building full-stack web applications using React, Next.js, TypeScript, and Laravel. Passionate about clean code, good UX, and learning in public.",
      education: [
        {
          school: "Universitas PGRI Semarang (UPGRIS)",
          degree: "Bachelor of Informatics",
          period: "2023 — Present",
          note: "Actively studying algorithms, database management, and web engineering."
        }
      ],
      experience: [
        {
          role: "Full-Stack Web Developer",
          company: "Independent / Self-Trained",
          period: "2023 — Present",
          points: [
            "Built and deployed full-stack web apps using React, Next.js, TypeScript, and Laravel.",
            "Developed Task Manager AI — a Kanban board with AI-powered study assistant (Gemini) and file upload processing.",
            "Built Nusantara Hub — a Streamlit web app with interactive chat and repository browser backed by MySQL.",
            "Built money-manag — a personal finance tracker app using Flutter."
          ]
        }
      ],
      projects: [
        {
          name: "Task Manager AI",
          url: "https://task-manager-ivan-cd9e.vercel.app",
          tech: "React · TypeScript · Next.js · Supabase · Gemini",
          desc: "Kanban board with drag-and-drop, AI assistant, and file upload for course materials."
        },
        {
          name: "Nusantara Hub",
          url: "https://github.com/Ivannnaff/nusantara-hub",
          tech: "Python · Streamlit · MySQL",
          desc: "Web app with interactive chat and a repository browser, backed by MySQL."
        },
        {
          name: "money-manag",
          url: "https://github.com/Ivannnaff/money-manag",
          tech: "Flutter · Dart",
          desc: "Mobile-first personal finance tracker with expense categorization."
        }
      ],
      skills: {
        languages: ["TypeScript", "JavaScript", "PHP", "Python", "Dart"],
        frontend: ["React", "Next.js", "Tailwind CSS", "Vite"],
        backend: ["Laravel", "Node.js", "Supabase", "MySQL", "PostgreSQL"],
        tools: ["Git", "GitHub", "Docker", "Figma", "Postman", "VS Code"]
      },
      printButton: "Print / Save as PDF",
      backButton: "← Back"
    }
  },
  id: {
    wordmark: "Ivannaff",
    nav: {
      home: "Beranda",
      now: "Now",
      uses: "Uses",
      til: "TIL",
      contact: "Kontak",
    },
    hero: {
      title: "Ivan Akbar Alfahrezi",
      tagline: "Saya seorang full-stack web developer. Saya membangun aplikasi dengan Laravel, React, dan Next.js, dan saat ini menempuh studi IT di Universitas PGRI Semarang.",
      availability: "Saat ini terbuka untuk magang, proyek freelance, dan kolaborasi",
      photoCaption: "IVAN AKBAR ALFAHREZI"
    },
    now: {
      title: "Now",
      intro: "Sekilas tentang hal-hal yang sedang saya fokuskan saat ini.",
      updatedLabel: "Terakhir diperbarui",
      updated: "Oktober 2026",
      sections: [
        {
          label: "Fokus",
          heading: "Pengembangan web full-stack.",
          body: "Mahasiswa IT di Universitas PGRI Semarang, membangun aplikasi web full-stack dengan PHP (Laravel), React, dan Next.js."
        },
        {
          label: "Membangun",
          heading: "Proyek sampingan dan tugas kuliah.",
          body: "Beberapa hal yang sedang saya kerjakan saat ini.",
          links: [
            { label: "Task Manager AI", url: "https://github.com/IvanAkbarAlfahrezi/task-manager" },
            { label: "Nusantara Hub", url: "https://github.com/IvanAkbarAlfahrezi/nusantara-hub" }
          ]
        },
        {
          label: "Belajar",
          heading: "Sedang dipelajari.",
          items: [
            { name: "Laravel", note: "Pengembangan backend dengan PHP dan Laravel." },
            { name: "React & Next.js", note: "Frontend modern dan aplikasi web full-stack." },
            { name: "TypeScript", note: "Menulis JavaScript yang lebih aman dan rapi." }
          ]
        },
        {
          label: "Terbuka untuk",
          heading: "Peluang baru dan kolaborasi.",
          list: [
            "Magang",
            "Proyek freelance",
            "Kolaborasi proyek menarik"
          ]
        }
      ],
      listening: {
        label: "Musik",
        heading: "Sedang diputar.",
        empty: "Belum ada yang ditampilkan."
      },
      footer: "Halaman ini ditulis manual dan diperbarui saat ada perubahan."
    },
    projects: {
      title: "Karya Unggulan",
      subtitle: "Sistem dan aplikasi web yang dirancang untuk performa serta kejelasan.",
      source: "Kode Sumber",
      items: [
        {
          title: "Task Manager AI",
          category: "Web App · AI",
          description: "Aplikasi manajemen tugas kuliah dengan papan Kanban drag-and-drop dan asisten AI berbasis Google Gemini. Unggah materi kuliah (PDF, Word, PPT, Excel, gambar) untuk mendapat ringkasan, kunci jawaban, dan kuis otomatis — tersimpan di Supabase.",
          tags: ["React", "TypeScript", "Next.js", "Supabase", "Gemini"],
          repoUrl: "https://github.com/IvanAkbarAlfahrezi/task-manager",
        },
        {
          title: "Nusantara Hub",
          category: "Python App · Streamlit",
          description: "Aplikasi web Streamlit bertampilan neo-brutalist yang menggabungkan halaman beranda, chat interaktif, dan penjelajah repository, didukung MySQL.",
          tags: ["Python", "Streamlit", "MySQL", "CSS"],
          repoUrl: "https://github.com/IvanAkbarAlfahrezi/nusantara-hub",
        }
      ]
    },
    experience: {
      title: "Pendidikan & Latar Belakang",
      subtitle: "Jalur akademik saya di bidang Informatika dan eksplorasi pengembangan web.",
      items: [
        {
          period: "2023 — SEKARANG",
          role: "Mahasiswa Teknik Informatika",
          company: "Universitas PGRI Semarang (UPGRIS)",
          description: "Menempuh studi sarjana di bidang Teknik Informatika. Aktif mempelajari konsep dasar ilmu komputer, algoritma, basis data, dan rekayasa web."
        },
        {
          period: "2023 — SEKARANG",
          role: "Web Developer (Eksplorasi Mandiri)",
          company: "Proyek Pribadi / Mandiri",
          description: "Aktif membangun dan mendeploy aplikasi web menggunakan PHP (Laravel), React, dan Next.js dengan fokus pada struktur kode dan antarmuka responsif."
        }
      ]
    },
    contact: {
      title: "Mari bangun sesuatu yang luar biasa.",
      subtitle: "Saat ini terbuka untuk kolaborasi mahasiswa, proyek freelance, dan diskusi teknologi.",
      emailLabel: "Email Langsung",
      githubLabel: "Profil GitHub",
      linkedinLabel: "LinkedIn",
      twitterLabel: "Twitter / X",
      formName: "Nama Anda",
      formEmail: "Alamat Email",
      formMessage: "Pesan",
      sendButton: "Kirim Pesan",
      successMessage: "Pesan berhasil dikirim. Saya akan segera menghubungi Anda.",
      errorHuman: "Verifikasi dulu bahwa Anda bukan robot.",
      errorSend: "Terjadi kesalahan. Silakan coba lagi atau email saya langsung.",
      sending: "Mengirim..."
    },
    footer: {
      rights: "Hak cipta dilindungi undang-undang.",
      site: "Situs Ini",
      resources: "Referensi",
      connect: "Terhubung",
      projects: "Proyek",
      source: "Sumber",
      lastPlayed: "Terakhir diputar",
      nowPlaying: "Sedang diputar"
    },
    uses: {
      title: "Uses",
      intro: "Tools, software, dan perangkat yang aku pakai sehari-hari.",
      sections: [
        {
          label: "Editor",
          items: [
            { name: "VS Code", note: "Editor utamaku. Cepat, bersih, dan punya semua yang dibutuhkan." },
            { name: "Neovim", note: "Untuk edit cepat di terminal." },
          ]
        },
        {
          label: "Terminal",
          items: [
            { name: "Windows Terminal", note: "Dengan PowerShell sebagai shell utama." },
            { name: "Git Bash", note: "Untuk workflow git dan perintah unix-style." },
          ]
        },
        {
          label: "Stack",
          items: [
            { name: "React & Next.js", note: "Pilihan utama untuk frontend dan full-stack web." },
            { name: "Laravel (PHP)", note: "Backend untuk proyek yang lebih terstruktur." },
            { name: "TypeScript", note: "JavaScript dengan lebih banyak kepercayaan." },
            { name: "Tailwind CSS", note: "Utility-first CSS — cepat dan konsisten." },
            { name: "Supabase", note: "Postgres + auth + storage dalam satu paket." },
          ]
        },
        {
          label: "Desain",
          items: [
            { name: "Figma", note: "Untuk wireframe dan mockup UI sebelum mulai coding." },
          ]
        },
        {
          label: "Hardware",
          items: [
            { name: "Laptop", note: "Mesin utama untuk segalanya — coding, desain, menulis." },
            { name: "Earphone", note: "Selalu dipakai saat coding. Playlist lo-fi atau instrumental." },
          ]
        },
        {
          label: "Lainnya",
          items: [
            { name: "Notion", note: "Catatan, perencanaan, dan basis pengetahuan pribadi." },
            { name: "GitHub", note: "Semua proyekku ada di sini." },
            { name: "Postman", note: "Testing dan debugging API." },
          ]
        }
      ]
    },
    til: {
      title: "TIL",
      intro: "Today I Learned — catatan singkat tentang hal-hal yang kupelajari saat coding, membaca, atau eksplorasi.",
      entries: [
        {
          date: "Okt 2026",
          tag: "Supabase",
          title: "Supabase Storage bucket perlu diset public untuk akses URL langsung",
          body: "Waktu bikin task-manager, terus dapat error 400 di URL file yang diupload. Ternyata bucket-nya perlu diset public di Supabase dashboard, atau pakai createSignedUrl() untuk bucket private. Bucket public aman untuk file non-sensitif seperti materi kuliah."
        },
        {
          date: "Okt 2026",
          tag: "React",
          title: "dnd-kit butuh inline style transform agar animasi drag berjalan",
          body: "Waktu bikin Kanban drag-and-drop di task-manager, item tidak bergerak secara visual sampai aku pass transform dari useSortable() sebagai inline style. dnd-kit tidak otomatis apply style — kamu harus sambungkan transform dan transition sendiri."
        },
        {
          date: "Okt 2026",
          tag: "TypeScript",
          title: "FormData.get() selalu mengembalikan string | File, bukan tipe spesifik",
          body: "Di fitur upload task-manager, aku coba typing FormData.get() langsung sebagai string dan TypeScript protes. FormData.get() selalu mengembalikan string | File | null — perlu di-cast atau dicek tipenya dulu sebelum dipakai."
        },
        {
          date: "Okt 2026",
          tag: "Docker",
          title: "Docker volume menyimpan data meskipun container di-restart",
          body: "Container itu ephemeral — kalau tidak mount volume, data yang ditulis di dalam container hilang saat container berhenti. Pakai -v atau definisikan volumes di docker-compose.yml agar data seperti file database tetap ada meski container di-restart."
        },
        {
          date: "Sep 2026",
          tag: "Next.js",
          title: "API routes Next.js tidak berjalan di client meski diimport dari client component",
          body: "Bingung kenapa Gemini API key masih keliatan. Ternyata mengimport server function dari client component tidak membuatnya server-side. Harus dipanggil lewat fetch() ke /api route yang sebenarnya, bukan diimport langsung."
        },
        {
          date: "Agu 2026",
          tag: "Flutter",
          title: "setState di dalam initState tidak memicu rebuild",
          body: "Di money-manag, aku coba panggil setState() di dalam initState() untuk load data awal tapi tidak ada yang update. Perlu wrap async call dengan method async yang proper dan panggil setState() setelah await, atau pakai addPostFrameCallback."
        },
      ]
    },
    settings: {
      title: "Pengaturan",
      language: "Bahasa",
      animation: "Animasi",
      layout: "Lebar Kontainer",
      theme: "Tema",
      animSystem: "Sistem",
      animOn: "Aktif",
      animOff: "Nonaktif",
      layoutDefault: "Standar",
      layoutWide: "Lebar",
      layoutWider: "Sangat Lebar",
    }
  }
};
