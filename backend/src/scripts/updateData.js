const axios = require('axios');
const bcrypt = require('bcryptjs');

const BASE_URL = 'https://innoventure-api.vercel.app';

const startups = [
  {
    businessPlan: {
      description:
        "GreenTech Solutions is committed to addressing the critical issue of energy access in rural Pakistan by developing innovative renewable energy solutions. The company's primary focus is on designing and implementing affordable, sustainable, and efficient energy systems that cater to the needs of underserved communities. By harnessing the power of solar, wind, and other renewable resources, GreenTech aims to provide electricity to areas that lack access to the national grid. This endeavor not only contributes to the country's overall electrification but also promotes environmental conservation by reducing dependence on fossil fuels. With a clear emphasis on local engagement, the company collaborates with community leaders and stakeholders to ensure that its solutions are culturally appropriate and have a lasting impact. By offering training and support, GreenTech empowers local residents to operate and maintain the energy systems, creating jobs and fostering self-reliance. Their vision aligns with Pakistan's Sustainable Development Goals, particularly in areas of poverty alleviation and climate action, making GreenTech Solutions a transformative force in the renewable energy sector.",
      industry: "Renewable Energy",
    },
  },
  {
    businessPlan: {
      description:
        "PakAgriTech is revolutionizing Pakistan's agricultural sector through innovative technologies aimed at enhancing crop yield and conserving water resources. By leveraging cutting-edge advancements in Internet of Things (IoT) and artificial intelligence (AI), the company introduces smart farming solutions that enable farmers to monitor and manage their crops more efficiently. These technologies include soil sensors, weather monitoring systems, and AI-driven analytics that provide actionable insights for optimizing irrigation, fertilization, and pest control. PakAgriTech's solutions are tailored to the unique challenges faced by Pakistani farmers, such as water scarcity, erratic weather patterns, and limited access to modern agricultural practices. In addition to technology deployment, the company is actively involved in educating farmers about sustainable practices and the benefits of adopting tech-enabled farming methods. Collaborating with agricultural experts and institutions, PakAgriTech ensures that its solutions are scientifically sound and practically viable. By empowering farmers with knowledge and tools, the company aims to create a ripple effect of improved productivity and economic prosperity in rural areas. This holistic approach positions PakAgriTech as a key player in driving the transformation of agriculture in Pakistan.",
      industry: "Agriculture Technology",
    },
  },
  {
    businessPlan: {
      description:
        "EdSpark is redefining education in Pakistan by creating a digital learning platform focused on STEM (Science, Technology, Engineering, and Mathematics) education for high school students. The platform offers a range of interactive courses, virtual labs, and gamified learning experiences designed to spark curiosity and foster a love for STEM subjects. Recognizing the gaps in traditional education systems, EdSpark uses technology to make learning accessible, engaging, and effective. Its adaptive learning algorithms personalize the educational journey for each student, ensuring that they progress at their own pace. In addition to academic content, the platform emphasizes the development of critical thinking, problem-solving, and collaboration skills, preparing students for the challenges of the modern world. EdSpark also bridges the urban-rural education divide by providing affordable and scalable solutions that reach underserved communities. By partnering with schools, teachers, and parents, the company ensures that its platform is seamlessly integrated into existing educational frameworks. Through its comprehensive and forward-thinking approach, EdSpark is equipping the next generation with the skills and knowledge needed to excel in a rapidly evolving global landscape.",
      industry: "EdTech",
    },
  },
  {
    businessPlan: {
      description:
        "Craftsy is on a mission to empower local artisans in Pakistan by providing them with a vibrant online marketplace for handmade crafts. The platform celebrates the rich cultural heritage and diverse craftsmanship of the country, connecting artisans directly with customers who value authenticity and uniqueness. By eliminating intermediaries, Craftsy ensures that artisans receive fair compensation for their work, fostering economic empowerment and sustainability. The platform offers a wide range of products, including traditional textiles, pottery, jewelry, and home decor items, each with its own story of cultural significance. In addition to providing a marketplace, Craftsy invests in skill development and digital literacy training for artisans, enabling them to effectively showcase their creations online. The company also runs marketing campaigns that highlight the stories behind the crafts, creating an emotional connection between buyers and sellers. By combining technology with cultural preservation, Craftsy is not only driving economic growth but also promoting the appreciation of Pakistan's artistic traditions on a global scale.",
      industry: "E-commerce",
    },
  },
];

// Function to seed data
async function seedDatabase() {
  try {
    // Insert startups
    for (const startup of startups) {
      startup.password = await bcrypt.hash(startup.password, 10);
      await axios.post(`${BASE_URL}/auth/signup/startup`, startup);
    }

    console.log('Startups seeded successfully.');

    for (const investor of investors) {
      investor.password = await bcrypt.hash(investor.password, 10);
      await axios.post(`${BASE_URL}/auth/signup/investor`, investor);
    }

    console.log('Investors seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase()