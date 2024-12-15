const axios = require('axios');
const bcrypt = require('bcryptjs');

const BASE_URL = 'http://localhost:8000';

const startups = [
  {
    name: 'GreenTech Solutions',
    email: 'contact@greentech.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Developing renewable energy solutions for rural electrification in Pakistan.',
      industry: 'Renewable Energy',
    },
    isFydp: false,
  },
  {
    name: 'PakAgriTech',
    email: 'info@pakagritech.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Innovative agricultural technologies to improve crop yield and reduce water consumption.',
      industry: 'Agriculture Technology',
    },
    isFydp: true,
    fydpDetails: {
      university: 'University of Agriculture Faisalabad',
      year: 2024,
      supervisorName: 'Dr. Zahid Ahmed',
      githubRepoUrl: 'https://github.com/pakagritech/fydp',
      tags: ['AgriTech', 'IoT', 'AI'],
      remarks: 'Top 3 project at UAF Innovation Challenge 2024.',
    },
  },
  {
    name: 'EdSpark',
    email: 'team@edspark.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'A digital learning platform focusing on STEM education for high school students.',
      industry: 'EdTech',
    },
    isFydp: false,
  },
  {
    name: 'HealthNet AI',
    email: 'info@healthnetai.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'AI-powered diagnostic tools for early detection of common diseases in Pakistan.',
      industry: 'Healthcare Technology',
    },
    isFydp: true,
    fydpDetails: {
      university: 'Lahore University of Management Sciences (LUMS)',
      year: 2024,
      supervisorName: 'Dr. Sana Malik',
      githubRepoUrl: 'https://github.com/healthnetai/fydp',
      tags: ['AI', 'Healthcare', 'Diagnostics'],
      remarks: 'Winner of LUMS AI Innovation Challenge 2024.',
    },
  },
  {
    name: 'Craftsy',
    email: 'hello@craftsy.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Empowering local artisans by providing an online marketplace for handmade crafts.',
      industry: 'E-commerce',
    },
    isFydp: false,
  },
  {
    name: 'PakFinTech',
    email: 'support@pakfintech.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Financial inclusion solutions targeting unbanked populations in rural areas.',
      industry: 'FinTech',
    },
    isFydp: false,
  },
  {
    name: 'AutoMate',
    email: 'info@automate.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Smart home automation solutions tailored for Pakistani households.',
      industry: 'IoT',
    },
    isFydp: true,
    fydpDetails: {
      university: 'NED University of Engineering and Technology',
      year: 2024,
      supervisorName: 'Dr. Imran Khan',
      githubRepoUrl: 'https://github.com/automate/fydp',
      tags: ['IoT', 'Smart Home', 'Automation'],
      remarks: 'Highly commended at NED Tech Fest 2024.',
    },
  },
  {
    name: 'LogiPak',
    email: 'contact@logipak.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'AI-driven logistics solutions for optimizing supply chain management.',
      industry: 'Logistics',
    },
    isFydp: false,
  },
  {
    name: 'EcoPak Plastics',
    email: 'info@ecopak.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Sustainable plastic alternatives for the packaging industry in Pakistan.',
      industry: 'Sustainability',
    },
    isFydp: false,
  },
  {
    name: 'MedPak',
    email: 'team@medpak.pk',
    password: 'securepassword123',
    businessPlan: {
      description:
        'Affordable telemedicine services for underserved communities.',
      industry: 'Healthcare',
    },
    isFydp: false,
  },
];

const investors = [
  {
    name: 'Ahsan Raza',
    email: 'ahsan.raza@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['Healthcare', 'FinTech'],
      regions: ['Pakistan', 'Middle East'],
      riskTolerance: 'Medium',
    },
    criteria: {
      minInvestment: 100,
      maxInvestment: 1000,
      investmentHorizon: '2 years',
    },
    businessPlan: {
      description: `Our business plan focuses on revolutionizing the healthcare and financial technology sectors by leveraging advanced artificial intelligence and machine learning technologies. 
      We aim to address inefficiencies in these industries by creating solutions that improve operational workflows and enhance decision-making processes. In healthcare, our AI-driven diagnostics tools enable 
      accurate and timely analysis of patient data, reducing human errors and improving patient outcomes. In the financial sector, we are developing intelligent systems that enhance fraud detection, automate 
      compliance processes, and provide personalized financial advice based on user behavior and financial history.

      With the growing importance of data security, we also ensure that our solutions adhere to the highest security standards, protecting sensitive healthcare records and financial information. We plan to 
      collaborate with industry leaders, healthcare providers, and financial institutions to roll out our technology on a large scale. By focusing on affordability and accessibility, we aim to ensure that our 
      solutions cater to both developed and emerging markets, particularly in Pakistan and the Middle East. Our ultimate goal is to create a lasting impact in these sectors by delivering value-driven, 
      innovative solutions that align with global trends in digital transformation. Our solutions are not only geared towards addressing current issues but also towards anticipating future needs, ensuring our products remain relevant. By utilizing AI and ML effectively, we intend to create scalable, adaptable systems that can be deployed across diverse markets, contributing to a significant improvement in the healthcare and financial landscapes of the regions we operate in. Our overarching goal is to build trust and create substantial value for our stakeholders while fostering innovation that keeps us ahead of the curve.`,
      industry: 'Healthcare and Financial Technology',
    },
  },
  {
    name: 'Farah Javed',
    email: 'farah.javed@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['E-commerce', 'Agriculture Technology'],
      regions: ['Pakistan', 'South Asia'],
      riskTolerance: 'Low',
    },
    criteria: {
      minInvestment: 200,
      maxInvestment: 2000,
      investmentHorizon: '3 years',
    },
    businessPlan: {
      description: `Our business plan is centered around transforming e-commerce and agricultural technology by leveraging digital platforms and IoT-based solutions. The e-commerce industry in South Asia, 
      especially in Pakistan, has witnessed significant growth, yet many challenges such as logistical inefficiencies, payment systems, and customer engagement remain. We aim to build a platform that integrates 
      seamless payment gateways, real-time inventory management, and AI-based recommendation engines to provide a superior customer experience.

      In agriculture technology, we plan to address pressing issues such as low crop yields and resource inefficiency by introducing IoT-enabled smart farming solutions. Our tools include soil sensors, 
      weather prediction models, and real-time monitoring systems that help farmers make informed decisions and optimize their output. By combining innovation with practicality, we aim to make these technologies 
      affordable for small and medium-scale farmers, which constitute the majority in this region. Our strategy is to collaborate with government bodies, NGOs, and private investors to scale operations and 
      deliver impactful results. This dual focus on e-commerce and agriculture allows us to tap into high-growth sectors while making a meaningful impact on the lives of people across South Asia. Our platform 
      will feature localized solutions tailored to the unique challenges faced by users in the region, ensuring maximum adoption and effectiveness. In the long term, we intend to expand these initiatives to other regions facing similar challenges, enhancing their overall resilience and adaptability. Through our commitment to sustainable practices and user-centric innovation, we aim to contribute significantly to the socio-economic development of South Asia, establishing a lasting legacy in these vital sectors.`,
      industry: 'E-commerce and Agriculture Technology',
    },
  },
  {
    name: 'Bilal Khan',
    email: 'bilal.khan@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['Renewable Energy', 'Logistics'],
      regions: ['Pakistan'],
      riskTolerance: 'High',
    },
    criteria: {
      minInvestment: 500,
      maxInvestment: 5000,
      investmentHorizon: '1 year',
    },
    businessPlan: {
      description: `Our business plan focuses on developing renewable energy solutions and improving logistics efficiency. The growing demand for clean energy presents an opportunity to develop innovative 
      technologies that reduce carbon emissions while meeting the energy needs of the population. We aim to establish solar and wind energy farms in Pakistan, leveraging the country’s abundant natural resources. 
      In addition, we are exploring battery storage systems and energy efficiency solutions for urban and rural households.

      On the logistics side, we intend to revolutionize supply chain management by introducing AI and IoT-based tracking and inventory systems. These systems will allow businesses to monitor their shipments 
      in real-time, optimize delivery routes, and reduce costs associated with delays or inefficiencies. By addressing these challenges, we plan to offer end-to-end solutions for manufacturers, retailers, 
      and logistics providers. Our vision is to create a sustainable future by investing in renewable energy and modernizing logistics infrastructure, ultimately contributing to Pakistan's economic growth and 
      environmental sustainability. Furthermore, we recognize the importance of scalability and adaptability in our solutions to meet the dynamic needs of various industries. By leveraging cutting-edge technology and forging strategic partnerships, we aim to expand our reach and impact, ensuring that our efforts are aligned with global sustainability goals. Our comprehensive approach combines environmental stewardship with economic efficiency, paving the way for a cleaner and more connected future.`,
      industry: 'Renewable Energy and Logistics',
    },
  },
  {
    name: 'Sadia Ahmed',
    email: 'sadia.ahmed@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['IoT', 'Healthcare Technology'],
      regions: ['Pakistan', 'Middle East'],
      riskTolerance: 'Medium',
    },
    criteria: {
      minInvestment: 300,
      maxInvestment: 3000,
      investmentHorizon: '4 years',
    },
    businessPlan: {
      description: `Our business strategy revolves around the intersection of IoT and healthcare technology to redefine how healthcare services are delivered and managed. Leveraging IoT devices, our solutions aim to bridge the gap between patients and healthcare providers, enabling real-time monitoring and diagnostics. By implementing wearable devices and connected health platforms, we provide tools for chronic disease management, personalized care, and emergency response systems. Our platform ensures data accuracy and fosters a better understanding of patient needs through AI-driven insights.

      In addition to healthcare, we are exploring the IoT's potential in the industrial and residential sectors. With smart sensors, our solutions optimize energy usage, predict maintenance requirements, and enhance automation in home and work environments. We understand that scalability and security are critical to IoT adoption, and thus, our products adhere to stringent data protection standards. Our goal is to collaborate with technology providers, healthcare institutions, and policy-makers in Pakistan and the Middle East to establish IoT as a cornerstone of modern technological ecosystems, particularly in healthcare, for improved quality of life and operational excellence. Furthermore, our commitment to research and development ensures that our solutions stay ahead of technological advancements, providing cutting-edge tools to address emerging challenges. By prioritizing user experience and accessibility, we aim to drive widespread adoption and create a lasting impact in the IoT and healthcare sectors.`,
      industry: 'IoT and Healthcare Technology',
    },
  },
  {
    name: 'Zara Malik',
    email: 'zara.malik@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['EdTech', 'Artificial Intelligence'],
      regions: ['South Asia', 'Pakistan'],
      riskTolerance: 'Medium',
    },
    criteria: {
      minInvestment: 500,
      maxInvestment: 3000,
      investmentHorizon: '3 years',
    },
    businessPlan: {
      description: `Our business plan is dedicated to transforming education through technology and artificial intelligence. The EdTech sector holds immense potential for growth, especially in regions like South Asia, where access to quality education remains a challenge. We aim to create an AI-driven learning platform that adapts to individual learning styles, providing personalized educational content, assessments, and feedback. This platform will bridge gaps in education quality by offering engaging and accessible tools for students in both urban and rural areas.

      Additionally, our focus on AI extends beyond education. We plan to develop AI solutions that optimize decision-making in various industries, including healthcare, finance, and logistics. Our technology will analyze data to identify trends, predict outcomes, and suggest actionable insights. This dual focus allows us to tackle significant challenges while also creating synergies between sectors. By emphasizing scalability and affordability, we ensure that our solutions can reach a broad audience, including underserved communities.

      Collaboration is at the heart of our strategy. We aim to partner with educational institutions, government bodies, and private organizations to scale our initiatives effectively. Our ultimate vision is to use technology to democratize access to education and resources, empowering individuals and fostering a culture of innovation. Through a commitment to quality, accessibility, and continuous improvement, we strive to make a significant impact on education and beyond.`,
      industry: 'EdTech and Artificial Intelligence',
    },
  },
  {
    name: 'Imran Saeed',
    email: 'imran.saeed@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['FinTech', 'Cybersecurity'],
      regions: ['Pakistan', 'Middle East'],
      riskTolerance: 'High',
    },
    criteria: {
      minInvestment: 800,
      maxInvestment: 4000,
      investmentHorizon: '2 years',
    },
    businessPlan: {
      description: `Our business plan focuses on the burgeoning FinTech and cybersecurity sectors, addressing the growing need for secure, efficient, and user-friendly financial systems. In the FinTech domain, we are developing platforms that simplify transactions, enable seamless cross-border payments, and provide intuitive financial management tools for businesses and individuals alike. By leveraging blockchain technology and AI, we aim to enhance transparency and efficiency in financial processes, particularly for underbanked regions like Pakistan and the Middle East.

      Cybersecurity forms a critical aspect of our business plan, given the rising frequency and complexity of cyber threats. We aim to provide state-of-the-art cybersecurity solutions tailored to protect businesses and individuals from data breaches, fraud, and other vulnerabilities. Our portfolio includes advanced threat detection systems, automated response tools, and educational resources for building awareness and resilience against cyber risks.

      By integrating FinTech and cybersecurity, our solutions address the dual challenges of financial inclusion and data security. We intend to collaborate with financial institutions, regulatory bodies, and technology providers to ensure compliance with international standards while fostering innovation. Our ultimate goal is to create a secure and inclusive financial ecosystem that empowers users and builds trust in digital solutions, setting a strong foundation for economic growth and technological advancement.`,
      industry: 'FinTech and Cybersecurity',
    },
  },
  {
    name: 'Amina Yusuf',
    email: 'amina.yusuf@example.com',
    password: 'securepassword123',
    profileStatus: 'active',
    preferences: {
      sectors: ['Green Technology', 'Energy Storage'],
      regions: ['South Asia'],
      riskTolerance: 'Low',
    },
    criteria: {
      minInvestment: 200,
      maxInvestment: 1500,
      investmentHorizon: '5 years',
    },
    businessPlan: {
      description: `Our business plan centers on advancing green technology and energy storage solutions to address the global shift toward sustainable practices. With increasing concerns about climate change and energy security, our initiatives aim to provide eco-friendly alternatives for energy generation and storage. We are developing innovative solar and wind energy systems tailored for residential, commercial, and industrial use. These systems are designed to maximize efficiency while minimizing costs, making green energy accessible to a broader audience.

      Energy storage is another cornerstone of our business. We are working on cutting-edge battery technologies that enhance the reliability and longevity of renewable energy systems. By offering scalable solutions, we aim to meet the diverse needs of energy users, from small households to large-scale industrial facilities. Our strategy includes collaborating with research institutions and industry partners to continuously improve our technologies and expand our market reach.

      Sustainability lies at the heart of our vision. By reducing dependence on fossil fuels and promoting renewable energy adoption, we contribute to environmental preservation and economic development. Our commitment to innovation, affordability, and impact ensures that our solutions make a meaningful difference, paving the way for a greener, more sustainable future.`,
      industry: 'Green Technology and Energy Storage',
    },
  },
];

// Function to seed data
async function seedDatabase() {
  try {
    // Insert startups
    // for (const startup of startups) {
    //   startup.password = await bcrypt.hash(startup.password, 10);
    //   await axios.post(`${BASE_URL}/auth/signup/startup`, startup);
    // }

    // console.log('Startups seeded successfully.');

    for (const investor of investors) {
      investor.password = await bcrypt.hash(investor.password, 10);
      await axios.post(`${BASE_URL}/auth/signup/investor`, investor);
    }

    console.log('Investors seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
