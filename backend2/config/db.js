
const store = {
    users: [],
    mentors: [
      {
        id: 'm_1',
        name: 'Dr. Priya Sharma',
        title: 'Senior Software Engineer',
        company: 'Google',
        rating: '4.9 (127)',
        tags: ['Software Development', 'Career Guidance'],
        description: '10+ years in tech, helped 500+ students transition into software engineering roles.',
        available: true
      },
      {
        id: 'm_2',
        name: 'Rajesh Kumar',
        title: 'UX Design Director',
        company: 'Microsoft',
        rating: '4.8 (89)',
        tags: ['UI/UX Design', 'Product Strategy'],
        description: 'Award-winning designer with experience at top tech companies.',
        available: true
      },
      {
        id: 'm_3',
        name: 'Anita Desai',
        title: 'Marketing Head',
        company: 'Flipkart',
        rating: '4.7 (156)',
        tags: ['Digital Marketing', 'Brand Strategy'],
        description: 'Built marketing teams from scratch.',
        available: false
      },
      {
        id: 'm_4',
        name: 'Dr. Vikram Singh',
        title: 'Medical Consultant',
        company: 'AIIMS Delhi',
        rating: '4.9 (203)',
        tags: ['Medical Career', 'NEET Guidance'],
        description: 'Senior doctor with 15+ years experience.',
        available: true
      }
    ],
    chats: []
  };
  
  module.exports = {
    getStore: () => store,
  };
  