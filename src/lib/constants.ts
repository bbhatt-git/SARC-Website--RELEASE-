import { GraduationCap, Briefcase, Users, HeartHandshake, Microscope, Landmark, Computer, Library, Bus, Utensils, Home, FlaskConical, Target, User, History, BookOpen, Award, Building, Bell, CalendarDays, FileText, School, Drama, Gamepad2, Lightbulb, Projector, ShieldCheck, Mail, ImageIcon, UserSearch } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { 
    label: 'About',
    children: [
      { href: '/about/us', label: 'About SARC', description: 'Our story, vision, history, and commitment', icon: Building },
      { href: '/about/staffs', label: 'Our Staff', description: 'Meet our dedicated team of educators', icon: Users },
      { href: '/about/founder', label: 'Our Founder', description: 'The visionary behind SARC', icon: UserSearch },
    ],
  },
  { 
    label: 'Academics',
    children: [
      { href: '/academics/programs', label: 'Academic Programs', description: 'Explore our school, +2, and other programs.', icon: BookOpen },
      { href: '/academics/services', label: 'Facilities & Innovation', description: 'Explore our modern labs, library, and more.', icon: Lightbulb },
      { href: '/academics/achievements', label: 'Alumni Network', description: 'Celebrate the accomplishments of our graduates.', icon: Award },
    ],
  },
  { href: '/notice', label: 'Notice' },
  { href: '/results', label: 'Results' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const GALLERY_CATEGORIES = ['All', 'Campus', 'Labs', 'Projects', 'Tours', 'Events', 'Cultural', 'Sports'];

export const TESTIMONIALS = [
  {
    text: "The supportive environment at SARC helped me grow personally and professionally. I highly recommend this college to any aspiring professional.",
    author: "Bhupesh Bhatt",
    role: "Grade 11 Science, 2025",
    image: "/images/testimonials/bhupesh_bhatt.jpg"
},
    {
        text: "SARC provided a strong foundation for my medical career. The supportive teachers and modern labs made learning effective and inspiring.",
        author: "Ankit Joshi",
        role: "+2 Graduate, 2026",
        image: "/images/testimonials/ankit_joshi.jpg"
    },
    {
        text: "The science program at SARC fosters critical thinking. It gave me the analytical skills and confidence to pursue future innovation.",
        author: "Menuka Joshi",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/menuka_joshi.jpg"
    },
    {
        text: "I always felt encouraged to explore my interests beyond academics. The fantastic extracurricular activities allowed me to grow into leadership.",
        author: "Chandani Dhami",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/chandani_dhami.jpg"
    },
    {
        text: "The faculty’s dedication is what makes SARC special. They are true mentors who guide every student through each growth step.",
        author: "Amar Bohara",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/amar_bohara.jpg"
    },
    {
        text: "I am grateful for the career counseling services. They helped me choose the right path and prepared for university interviews.",
        author: "Ayush Sunar",
        role: "Gade 11 Management, 2025",
        image: "/images/testimonials/ayush_sunar.jpg"
    },
    {
        text: "A perfect blend of academic rigor and personal development. SARC prepares you for real life challenges, not just for exams.",
        author: "Suraj Pant",
        role: "+2 Graduate, 2025",
        image: "/images/testimonials/suraj_pant.jpg"
    },
    {
        text: "SARC gave me the foundation to think beyond textbooks. The curriculum taught me how to solve real-world problems very effectively.",
        author: "Bikash Pandeya",
        role: "CEO, NoteSwift",
        image: "/images/testimonials/bikash_pandeya.jpg"
    },
    {
        text: "SARC's innovative teaching methods made learning fun and meaningful. These experiences paved the way for my recent academic achievements today.",
        author: "Ashim Giri",
        role: "Alumnus, 2024",
        image: "/images/testimonials/ashim_giri.jpg"
    },
    {
        text: "I am thankful to SARC for providing a platform to excel. It allowed me to explore my scientific potential fully.",
        author: "Jeetu Kalauni",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/jeetu_kalauni.jpg"
    },
    {
        text: "The practical approach to learning at SARC is what sets it apart. It was wonderful experience that shaped my mindset.",
        author: "Kishore Paneru",
        role: "Gade 11 Science, 2025",
        image: "/images/testimonials/kishore_paneru.jpg"
    },
    {
        text: "An amazing institution that focuses on holistic development. I had a great time studying here while building a strong future.",
        author: "Uttam Gurudhami",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/uttam_gurudhami.jpg"
    },
    {
        text: "From academics to extracurriculars, SARC provides a balanced life. This college offers an enriching experience for every student who joins.",
        author: "Vivek Bhatt",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/vivek_bhatt.jpg"
    },
    {
        text: "The college has a very positive and motivating atmosphere. It prepared me well for future challenges and upcoming professional opportunities.",
        author: "Vyan Madai",
        role: "Grade 11 Science, 2025",
        image: "/images/testimonials/vyan_madai.jpg"
    },
  {
      text: "As a teacher, I've seen how SARC's innovative methods spark curiosity in students. They don't just memorize—they understand and create.",
      author: "Meen Bahadur Khadka",
      role: "Senior Faculty",
      image: "/images/staffs/meen_bahadur_khadka.jpg"
  }
];

export const STAFF_MEMBERS = [
  {
    id: 'dr_laxman_basnet',
    name: 'Dr. Laxman Basnet',
    role: 'Founder / CEO',
    credentials: 'PhD',
    philosophy: 'Dedicated to fostering a vibrant learning environment for all students.',
    socials: { facebook: 'https://www.facebook.com/laxman86', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dipendra_joshi',
    name: 'Dipendra Joshi',
    role: 'Academic Director',
    credentials: 'M.A., M.Ed (Maths)',
    philosophy: 'Making mathematics understandable and enjoyable for all.',
    socials: { facebook: 'https://www.facebook.com/dipendra.joshi.184', instagram: '#', linkedin: '#' }
  },
  {
    id: 'santosh_pandey',
    name: 'Santosh Pandey',
    role: 'Managing Director',
    credentials: 'B.M.B',
    philosophy: 'Laying the groundwork for future business leaders.',
    socials: { facebook: 'https://www.facebook.com/santosh.pandey.24598', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhagwat_dev_bhatt',
    name: 'Bhagwat Dev Bhatt',
    role: 'Program Coordinator',
    credentials: 'M.Phil',
    philosophy: 'Committed to academic excellence and student success.',
    socials: { facebook: 'https://www.facebook.com/bhagawat.bhatta', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bed_prakash_bhatt',
    name: 'Bed Prakash Bhatt',
    role: 'HOD (Science) | Physics',
    credentials: 'M.Sc',
    philosophy: 'Inspiring the next generation of scientists and thinkers.',
    socials: { facebook: 'https://www.facebook.com/VED.BHATT', instagram: '#', linkedin: '#' }
  },
  {
    id: 'karan_singh_mahara',
    name: 'Karan Singh Mahara',
    role: 'Chemistry',
    credentials: 'M.Sc',
    philosophy: 'Making science accessible and exciting for every student.',
    socials: { facebook: 'https://www.facebook.com/karan.singh.mahara.813935', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhupendra_chand',
    name: 'Bhupendra Chand',
    role: 'Chemistry',
    credentials: 'M.Sc',
    philosophy: 'Fostering a love for learning and critical inquiry.',
    socials: { facebook: 'https://www.facebook.com/bhupen.chand.73', instagram: '#', linkedin: '#' }
  },
  {
    id: 'bhuwan_chandra_bogati',
    name: 'Bhuwan Chandra Bogati',
    role: 'Biology',
    credentials: 'M.Sc',
    philosophy: 'Guiding students to discover their potential through science.',
    socials: { facebook: 'https://www.facebook.com/bhuwanchandra.bokati', instagram: '#', linkedin: '#' }
  },
  {
    id: 'pushpa_raj_bhatt',
    name: 'Pushpa Raj Bhatt',
    role: 'Botany',
    credentials: 'M.Sc',
    philosophy: 'Dedicated to creating an engaging and supportive classroom.',
    socials: { facebook: 'https://www.facebook.com/puspraj.bhatt.35', instagram: '#', linkedin: '#' }
  },
  {
    id: 'narendra_awasthi',
    name: 'Narendra Awasthi',
    role: 'Physics',
    credentials: 'M.Sc',
    philosophy: 'Empowering students with knowledge and practical skills.',
    socials: { facebook: 'https://www.facebook.com/narendra.awasthi.940', instagram: '#', linkedin: '#' }
  },
  {
    id: 'suraj_pant',
    name: 'Suraj Pant',
    role: 'Computer Science',
    credentials: 'M.Sc',
    philosophy: 'Fostering curiosity and a passion for scientific discovery.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'shiv_raj_bohara',
    name: 'Shiv Raj Bohara',
    role: 'Mathematics',
    credentials: 'M.A. (Maths)',
    philosophy: 'Developing logical thinking and problem-solving skills in students.',
    socials: { facebook: 'https://www.facebook.com/shivraj.bohara.1', instagram: '#', linkedin: '#' }
  },
  {
    id: 'meen_bahadur_khadka',
    name: 'Meen Bahadur Khadka',
    role: 'English & Literature',
    credentials: 'M.Ed',
    philosophy: 'Committed to holistic education and personal development.',
    socials: { facebook: 'https://www.facebook.com/RadheRadheMahen', instagram: '#', linkedin: '#' }
  },
  {
    id: 'sudarshan_prashad_bhatt',
    name: 'Sudarshan Prashad Bhatt',
    role: 'Mathematics',
    credentials: 'M.Ed',
    philosophy: 'Creating an inclusive and effective learning environment.',
    socials: { facebook: 'https://www.facebook.com/sudarsan.bhatta.5', instagram: '#', linkedin: '#' }
  },
  {
    id: 'gyandeb_bhatt',
    name: 'Gyandeb Bhatt',
    role: 'Faculty',
    credentials: 'M.Ed',
    philosophy: 'Nurturing lifelong learners and responsible citizens.',
    socials: { facebook: 'https://www.facebook.com/gyandebbhatta.1', instagram: '#', linkedin: '#' }
  },
  {
    id: 'pushpa_joshi',
    name: 'Pushpa Joshi',
    role: 'English & Literature',
    credentials: 'M.Ed',
    philosophy: 'Dedicated to student growth and academic success.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'govind_giri',
    name: 'Govind Giri',
    role: 'Mathematics',
    credentials: 'M.Ed',
    philosophy: 'Inspiring students to achieve their full potential.',
    socials: { facebook: 'https://www.facebook.com/govind.giri.68635', instagram: '#', linkedin: '#' }
  },
  {
    id: 'birendra_bahadur_chand',
    name: 'Birendra Bahadur Chand',
    role: 'Nepali',
    credentials: 'M.Ed',
    philosophy: 'Fostering a positive and challenging learning atmosphere.',
    socials: { facebook: 'https://www.facebook.com/birendra.chand.39750', instagram: '#', linkedin: '#' }
  },
  {
    id: 'rajesh_datt_bhatt',
    name: 'Rajesh Datt Bhatt',
    role: 'Computer Science',
    credentials: 'MCA',
    philosophy: 'Bridging technology and education for modern learners.',
    socials: { facebook: 'https://www.facebook.com/rajeshbhatt360', instagram: '#', linkedin: '#' }
  },
  {
    id: 'rituraj_bhatt',
    name: 'Rituraj Bhatt',
    role: 'Faculty',
    credentials: 'M.Com',
    philosophy: 'Equipping students with practical business and commerce skills.',
    socials: { facebook: 'https://www.facebook.com/profile.php?id=61577198216063', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dev_raj_paneru',
    name: 'Dev Raj Paneru',
    role: 'Faculty',
    credentials: 'M.BS',
    philosophy: 'Cultivating business acumen and entrepreneurial spirit.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'jeewan_thapa',
    name: 'Jeewan Thapa',
    role: 'Mathematics',
    credentials: 'M.A. & B.Sc (B.E.)',
    philosophy: 'Integrating diverse fields of knowledge for a complete education.',
    socials: { facebook: 'https://www.facebook.com/jeewan.thapa.684245', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dev_singh_bhandari',
    name: 'Dev Singh Bhandari',
    role: 'Economics',
    credentials: 'B.Sc',
    philosophy: 'Sharing the wonders of science with eager minds.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'kokila_pant',
    name: 'Kokila Pant',
    role: 'Accountant',
    credentials: 'B.BS',
    philosophy: 'Ensuring a smooth and supportive environment for students.',
    socials: { facebook: 'https://www.facebook.com/kokila.pant/', instagram: '#', linkedin: '#' }
  },
  {
    id: 'saraswati_bist',
    name: 'Saraswati Bist',
    role: 'Receptionist',
    credentials: 'MBA',
    philosophy: 'Dedicated to the efficient and caring administration of the institution.',
    socials: { facebook: 'https://www.facebook.com/sanbi.bist.2025', instagram: '#', linkedin: '#' }
  },
  {
    id: 'basanti_chand',
    name: 'Basanti Chand',
    role: 'Support Staff',
    philosophy: 'Providing essential support to our faculty and students every day.',
    socials: { facebook: 'https://www.facebook.com/nitin.chand.7334', instagram: '#', linkedin: '#' }
  },
  {
    id: 'dashrath_chand',
    name: 'Dashrath Chand',
    role: 'Support Staff',
    philosophy: 'Working behind the scenes to keep our campus at its best.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 'puran_rana',
    name: 'Puran Rana',
    role: 'Support Staff',
    philosophy: 'A key part of the team that maintains our welcoming campus.',
    socials: { facebook: '#', instagram: '#', linkedin: '#' }
  }
].sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
        "Founder / CEO": 1,
        "Academic Director": 2,
        "Managing Director": 3,
        "Program Coordinator": 4,
        "HOD (Science) | Physics": 5,
        "Faculty": 6,
        "Accountant": 7,
        "Receptionist": 8,
        "Support Staff": 9
    };
    return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99);
});

export const ALUMNI_MEMBERS = [
    {
        name: 'Bikash Pandeya',
        role: 'CEO, NoteSwift',
        quote: "SARC gave me the foundation to think beyond textbooks. The curriculum taught me how to solve real-world problems very effectively.",
        story: "After graduating, Bikash founded NoteSwift, an innovative tech startup. He credits SARC's project-based learning for his entrepreneurial success.",
        achievements: [
            "Forbes 30 Under 30 Nepal",
            "Launched successful tech startup",
            "Guest lecturer on entrepreneurship"
        ],
        image: "/images/testimonials/bikash_pandeya.jpg",
        socials: {
            linkedin: '#',
            facebook: '#',
            instagram: '#'
        }
    },
    {
        name: 'Ashim Giri',
        role: 'Alumnus, 2024',
        quote: "SARC's innovative teaching methods made learning fun and meaningful. These experiences paved the way for my recent academic achievements today.",
        story: "Ashim is currently pursuing a degree in Computer Engineering at a top university, focusing on artificial intelligence and machine learning.",
        achievements: [
            "Full scholarship to a leading university",
            "(IFoA) Institute and Faculty Of Actuaries London (U.K)",
            "+2 National Boards Kanchanpur Topper"
        ],
        image: "/images/testimonials/ashim_giri.jpg",
        socials: {
            linkedin: 'https://www.linkedin.com/in/ashim-giri-b16521338/',
            facebook: 'https://www.facebook.com/profile.php?id=100080102481707',
            instagram: '#'
        }
    }
];

export const TOP_STUDENTS = [
    {
        name: 'Ashim Giri',
        class: '12 Management',
        quote: "SARC's innovative teaching methods made learning fun and meaningful.",
        gpa: 3.82,
        subjects: 'Economics, Mathematics, Accountancy',
        image: '/images/testimonials/ashim_giri.jpg',
        socials: {
          linkedin: 'https://www.linkedin.com/in/ashim-giri-b16521338/',
          facebook: 'https://www.facebook.com/profile.php?id=100080102481707',
          instagram: '#'
      }
    },
    {
      name: 'Roshani Bist',
      class: '12 Management',
      quote: "SARC taught me to excel life not just exams.",
      gpa: 3.73,
      subjects: 'Economics, Mathematics, Accountancy',
      image: '/images/alumni/roshani_bist.jpg',
      socials: {
        linkedin: '#',
        facebook: 'https://www.facebook.com/roshani.bist.900',
        instagram: '#'
    }
  },
  {
    name: 'Bhism Raj Joshi',
    class: '12 Science',
    quote: "SARC provided me the environment,  I wanted.",
    gpa: 3.73,
    subjects: 'Physics, Chemistry, Mathematics',
    image: '/images/alumni/bhism_raj_joshi.jpg',
    socials: {
      linkedin: '#',
      facebook: '#',
      instagram: '#'
  }
}
];

export const WHY_US_ITEMS = [
    {
        icon: Award,
        title: "Quality Education",
        description: "A focus on conceptual and practical learning to build a strong academic foundation for success."
    },
    {
        icon: Users,
        title: "Experienced Faculty",
        description: "Learn from a dedicated team of experienced educators and mentors committed to your success."
    },
    {
        icon: Building,
        title: "Modern Infrastructure",
        description: "Access well-equipped labs, smart classrooms, and a digital library to support your learning."
    },
    {
        icon: School,
        title: "Smart Classrooms",
        description: "Interactive and tech-based learning with modern audio-visual aids to enhance engagement."
    },
     {
        icon: Briefcase,
        title: "Career-Oriented Courses",
        description: "We provide technical and leadership training to prepare you for the professional world."
    },
    {
        icon: Drama,
        title: "Extracurricular Activities",
        description: "Engage in sports, cultural events, debate, and various clubs for holistic development."
    },
];
