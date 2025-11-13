import React, { useState, useEffect, useRef } from 'react';
import '../css/chatbot.css';
import endpoints from '../constants/endpoints';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! 👋 I'm Saravjit's AI assistant.\n\nI can answer questions like:\n• Is Saravjit good for software development roles?\n• What are his key strengths?\n• Tell me about his experience\n• How can I contact him?\n\nFeel free to ask me anything about Saravjit!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [portfolioData, setPortfolioData] = useState({});
  const messagesEndRef = useRef(null);

  // Auto-open chatbot on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasVisited = sessionStorage.getItem('chatbotVisited');
      if (!hasVisited) {
        setIsOpen(true);
        sessionStorage.setItem('chatbotVisited', 'true');
      }
    }, 3000); // Open after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Load portfolio data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [about, skills, education, experiences, projects, social] = await Promise.all([
          fetch(endpoints.about).then((r) => r.json()),
          fetch(endpoints.skills).then((r) => r.json()),
          fetch(endpoints.education).then((r) => r.json()),
          fetch(endpoints.experiences).then((r) => r.json()),
          fetch(endpoints.projects).then((r) => r.json()),
          fetch(endpoints.social).then((r) => r.json()),
        ]);

        setPortfolioData({
          about,
          skills,
          education,
          experiences,
          projects,
          social,
        });
      } catch (err) {
        // Error loading portfolio data
        // eslint-disable-next-line no-console
        console.error('Error loading portfolio data:', err);
      }
    };

    loadData();
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick action suggestions
  const quickActions = [
    { label: '💼 Experience', query: 'Tell me about experience' },
    { label: '🛠️ Skills', query: 'What are the skills?' },
    { label: '🎓 Education', query: 'Tell me about education' },
    { label: '🚀 Projects', query: 'Show me projects' },
    { label: '📧 Contact', query: 'How to connect?' },
  ];

  // AI Response Generator with Advanced Reasoning
  const generateResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Advanced conversational questions about Saravjit's suitability
    if (msg.includes('good for') || msg.includes('suitable for') || msg.includes('right for') || msg.includes('fit for') || msg.includes('qualified')) {
      if (msg.includes('software') || msg.includes('developer') || msg.includes('engineer') || msg.includes('programming')) {
        return '✅ **Absolutely!** Saravjit is an excellent fit for software development roles. Here\'s why:\n\n🎓 **Strong Academic Background**: M.S. in Computer Science from Northeastern University with a perfect 4.0 GPA\n\n💼 **Proven Experience**: 3+ years of professional software engineering experience at companies like Q3 Technologies, Altudo, and Nvidia\n\n🛠️ **Versatile Tech Stack**: Proficient in React, .NET Core, TypeScript, Java, C++, and modern frameworks\n\n🚀 **Real Impact**: Led projects that improved performance by 25-30%, reduced defects by 20%, and delivered solutions for 50,000+ users\n\n📚 **Teaching Experience**: Currently a TA at Northeastern, showing deep technical understanding and communication skills\n\nHe\'s definitely a strong candidate for any software development role!';
      }
      if (msg.includes('full-stack') || msg.includes('full stack') || msg.includes('fullstack')) {
        return '✅ **Definitely!** Saravjit is particularly strong in full-stack development:\n\n🎯 **Frontend Expertise**: React, Next.js, TypeScript, HTML5, CSS3, responsive design\n\n🎯 **Backend Skills**: .NET Core, C#, Node.js, Java, REST APIs, GraphQL\n\n🎯 **Databases**: MySQL, MongoDB, SQL Server - experienced with data modeling\n\n🎯 **DevOps**: Docker, Git, CI/CD pipelines, SonarQube integration\n\n🎯 **Real Projects**: Built railway booking systems, campus recruitment platforms, and enterprise CMS solutions\n\nHis experience spans the entire development stack!';
      }
      if (msg.includes('react') || msg.includes('frontend') || msg.includes('front-end')) {
        return '✅ **Yes!** Saravjit has strong React/Frontend expertise:\n\n⚛️ Extensive experience with React, Next.js, and modern frontend frameworks\n🎨 Built responsive, accessible UIs following WCAG standards\n⚡ Improved frontend load times by 30% through optimization\n🔧 Experience with TypeScript, GraphQL, and state management\n📱 Built production applications serving 50,000+ users\n\nHe\'s well-equipped for React and frontend development roles!';
      }
      if (msg.includes('backend') || msg.includes('back-end') || msg.includes('.net') || msg.includes('dotnet')) {
        return '✅ **Absolutely!** Saravjit has solid backend development skills:\n\n🔧 Proficient in .NET Core, C#, and building scalable APIs\n📊 Experience with MySQL, SQL Server, and MongoDB\n🏗️ Built REST APIs and microservices architectures\n⚡ Integrated CI/CD pipelines and quality automation\n🚂 Developed backend systems for railway operators and enterprise clients\n\nHe\'s a strong backend developer!';
      }
    }

    // Questions about capabilities and strengths
    if ((msg.includes('what') || msg.includes('tell')) && (msg.includes('best') || msg.includes('strength') || msg.includes('good at') || msg.includes('excel'))) {
      return '🌟 **Saravjit\'s Key Strengths:**\n\n💻 **Full-Stack Development**: Expert in React, .NET, and modern web technologies\n\n📈 **Performance Optimization**: Proven track record of improving load times by 25-30% and reducing defects\n\n🎯 **Problem Solving**: Built complex systems like railway booking platforms and search engines\n\n🔄 **Agile Development**: Experience with CI/CD, Docker, Git, and modern DevOps practices\n\n👥 **Collaboration**: Worked with cross-functional teams and currently mentoring 500+ students\n\n🎓 **Continuous Learning**: Perfect 4.0 GPA in M.S. program while gaining cutting-edge knowledge';
    }

    // Questions about work style or personality
    if (msg.includes('how') && (msg.includes('work') || msg.includes('approach') || msg.includes('solve'))) {
      return '💡 **Saravjit\'s Work Approach:**\n\nHe follows a systematic approach:\n\n1️⃣ **Understand**: Deeply analyzes requirements and user needs\n2️⃣ **Design**: Follows SOLID principles and clean architecture\n3️⃣ **Build**: Uses modern frameworks and best practices\n4️⃣ **Test**: Implements automated testing and quality gates\n5️⃣ **Optimize**: Focuses on performance and user experience\n6️⃣ **Collaborate**: Works well in Agile teams with QA and PMs\n\nHis projects show measurable improvements: 30% faster load times, 20% fewer defects, 100% on-time delivery!';
    }

    // Leadership and teamwork questions
    if (msg.includes('leader') || msg.includes('team') || msg.includes('collaborate') || msg.includes('work with')) {
      return '👥 **Team Collaboration & Leadership:**\n\nSaravjit is an excellent team player:\n\n🎓 **Mentorship**: Currently teaching 500+ students as a Graduate TA\n🤝 **Collaboration**: Worked with QA, PMs, and cross-functional teams in Agile environments\n🚀 **Initiative**: Led development of multiple client projects with 100% on-time delivery\n📚 **Knowledge Sharing**: Helps debug, review code, and guide junior developers\n💬 **Communication**: Strong technical communication skills, proven by teaching role\n\nHe\'s both a strong individual contributor and team player!';
    }

    // Recommendation or hiring questions
    if (msg.includes('should') && (msg.includes('hire') || msg.includes('consider') || msg.includes('recommend'))) {
      return '⭐ **Strong Recommendation!**\n\nHere\'s why you should consider Saravjit:\n\n✅ **Proven Track Record**: 3+ years delivering production software for enterprise clients\n✅ **Technical Excellence**: Perfect 4.0 GPA + expertise in modern tech stack\n✅ **Real Impact**: Improved system performance 25-30%, reduced defects 20%\n✅ **Scalable Solutions**: Built systems serving 50,000+ users daily\n✅ **Fast Learner**: Successfully worked with diverse technologies: React, .NET, C++, CUDA\n✅ **Reliable**: 100% on-time project delivery record\n\nHe brings both technical depth and practical experience to make immediate impact!';
    }

    // Comparison questions
    if (msg.includes('better') || msg.includes('compare') || msg.includes('advantage') || msg.includes('stand out')) {
      return '🏆 **What Makes Saravjit Stand Out:**\n\n🎯 **Unique Combination**: Both M.S. Computer Science student (4.0 GPA) and 3+ years industry experience\n\n⚡ **Measurable Impact**: Not just coding - delivering 25-30% performance improvements and 20% defect reduction\n\n🔧 **Full-Stack Mastery**: Comfortable with React, .NET, Java, C++ - can work anywhere in the stack\n\n🎓 **Teaching Ability**: If he can explain complex concepts to 500+ students, he can explain to any stakeholder\n\n🌍 **Enterprise Experience**: Worked on real production systems at Q3, Altudo, and Nvidia\n\n🚀 **Modern Practices**: Docker, CI/CD, SonarQube, automated testing - not just legacy code';
    }

    // Skills related
    if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech stack')) {
      const skillsData = portfolioData.skills?.skills;
      if (skillsData) {
        const skillsList = skillsData
          .map((category) => `**${category.title}**: ${category.items.map((i) => i.title).join(', ')}`)
          .join('\n\n');
        return `Saravjit has expertise in various technologies:\n\n${skillsList}\n\nHe's proficient in full-stack development with React, .NET, and modern frameworks.`;
      }
      return 'Saravjit has expertise in full-stack development with React, .NET, JavaScript, TypeScript, and modern frameworks.';
    }

    // Experience related
    if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('company')) {
      const latestExp = portfolioData.experiences?.experiences?.[0];
      if (latestExp) {
        return `Saravjit is currently a ${latestExp.title} at ${latestExp.subtitle}. His recent roles include:\n\n• Graduate Teaching Assistant at Northeastern University\n• Software Engineer at Q3 Technologies (React, .NET Core, Sitecore)\n• Software Engineer at Altudo (Sitecore, TypeScript)\n• Software Engineering Intern at Nvidia (C++, CUDA)\n\nHe has ${portfolioData.experiences?.experiences?.length}+ professional experiences with expertise in full-stack development.`;
      }
    }

    // Education related
    if (msg.includes('education') || msg.includes('degree') || msg.includes('university') || msg.includes('study')) {
      const edu = portfolioData.education?.education;
      if (edu) {
        return `Saravjit's educational background:\n\n🎓 **${edu[0]?.cardTitle}** from ${edu[0]?.cardSubtitle} (2025-2027)\nGPA: 4.0/4.0\n\n🎓 **${edu[1]?.cardTitle}** from ${edu[1]?.cardSubtitle} (2017-2021)\nGPA: 8.9/10`;
      }
    }

    // Projects related
    if (msg.includes('project') || msg.includes('portfolio') || msg.includes('built') || msg.includes('work on')) {
      const projectsData = portfolioData.projects?.projects;
      if (projectsData) {
        const projectsList = projectsData
          .slice(0, 3)
          .map((p, i) => `${i + 1}. **${p.title}** - ${p.bodyText.split('\\n')[0]}`)
          .join('\n\n');
        return `Here are some of Saravjit's notable projects:\n\n${projectsList}\n\nYou can explore more projects on his portfolio!`;
      }
      return 'Saravjit has worked on various projects including Railway systems, Campus Recruitment Platform, and C++ Search Engine. Check out the Projects section for more details!';
    }

    // Contact/Connect related
    if (msg.includes('contact') || msg.includes('connect') || msg.includes('reach') || msg.includes('email') || msg.includes('linkedin')) {
      const socialLinks = portfolioData.social?.social;
      let response = 'You can connect with Saravjit through:\n\n';

      if (socialLinks) {
        socialLinks.forEach((social) => {
          if (social.network === 'linkedin') response += `💼 LinkedIn: ${social.href}\n`;
          if (social.network === 'github') response += `💻 GitHub: ${social.href}\n`;
          if (social.network === 'email') response += `📧 Email: ${social.href.replace('mailto:', '')}\n`;
        });
      }

      response += '\nFeel free to reach out for opportunities, collaboration, or just to say hi!';
      return response;
    }

    // About/Bio related
    if (msg.includes('about') || msg.includes('who') || msg.includes('tell me') || msg.includes('introduce')) {
      return portfolioData.about?.about || 'Saravjit Singh is a Software Engineer and M.S. Computer Science student at Northeastern University. He specializes in full-stack development with React, .NET, and modern web technologies.';
    }

    // Resume related
    if (msg.includes('resume') || msg.includes('cv')) {
      return 'You can view Saravjit\'s resume here:\nhttps://drive.google.com/file/d/1O8kEi5z9VthoYCSsatp8R6bEO6oa3f6S/view?usp=sharing\n\nIt contains detailed information about his experience, skills, and achievements.';
    }

    // Location related
    if (msg.includes('location') || msg.includes('where') || msg.includes('based')) {
      return 'Saravjit is currently based in Boston, USA, pursuing his Master\'s degree at Northeastern University.';
    }

    // Availability related
    if (msg.includes('available') || msg.includes('hire') || msg.includes('opportunity')) {
      return '✅ **Yes, Saravjit is actively seeking opportunities!**\n\nHe\'s open to:\n🎯 Full-time Software Engineering roles\n🎯 Full-Stack Development positions\n🎯 Frontend/Backend specialized roles\n🎯 Positions starting Summer/Fall 2025\n\n📍 **Location**: Currently in Boston, open to relocation\n💼 **Work Authorization**: Please inquire directly\n\n📧 Feel free to reach out via LinkedIn or email to discuss opportunities!';
    }

    // Salary/compensation questions
    if (msg.includes('salary') || msg.includes('compensation') || msg.includes('pay') || msg.includes('rate')) {
      return '💰 **Compensation Discussion:**\n\nSaravjit is open to discussing compensation based on:\n\n📊 Market rates for his experience level\n🎯 The specific role and responsibilities  \n🏢 Company size and location\n📈 Total compensation package\n\nFor specific salary discussions, please connect directly via LinkedIn or email. He\'s flexible and focused on finding the right fit!';
    }

    // Why questions - motivation
    if (msg.includes('why') && (msg.includes('software') || msg.includes('developer') || msg.includes('engineer') || msg.includes('computer science'))) {
      return '💭 **Why Software Engineering?**\n\nSaravjit is passionate about software development because:\n\n🎯 **Problem Solving**: Loves tackling complex technical challenges\n🚀 **Real Impact**: His work serves thousands of users daily\n💡 **Innovation**: Enjoys working with cutting-edge technologies\n📚 **Continuous Learning**: The field constantly evolves and challenges him\n🤝 **Collaboration**: Enjoys working with talented teams to build great products\n\nHis perfect 4.0 GPA and 3+ years of experience show his dedication to the craft!';
    }

    // When questions - timeline
    if (msg.includes('when') && (msg.includes('start') || msg.includes('available') || msg.includes('join') || msg.includes('graduate'))) {
      return '📅 **Timeline:**\n\nSaravjit is pursuing his M.S. in Computer Science at Northeastern University:\n\n🎓 **Graduation**: May 2027\n💼 **Availability**: Open to full-time roles starting Summer/Fall 2025\n⏰ **Internships**: Also open to summer internship opportunities\n🚀 **Current**: Available for part-time/contract work while studying\n\nHe\'s flexible and can discuss specific timelines based on the opportunity!';
    }

    // Technologies/tools specific questions
    if (msg.includes('know') || msg.includes('familiar') || msg.includes('experience with')) {
      if (msg.includes('react') || msg.includes('next') || msg.includes('node')) {
        return '⚛️ **React/Node.js Experience:**\n\nYes! Saravjit has extensive experience:\n\n✅ React 17+ with Hooks and functional components\n✅ Next.js for server-side rendering and static sites\n✅ Node.js for backend services\n✅ TypeScript for type-safe code\n✅ Redux/Context API for state management\n✅ GraphQL and REST APIs\n\nHe\'s built multiple production React applications serving thousands of users!';
      }
      if (msg.includes('docker') || msg.includes('kubernetes') || msg.includes('cloud') || msg.includes('aws') || msg.includes('azure')) {
        return '☁️ **Cloud/DevOps Skills:**\n\nSaravjit has experience with:\n\n✅ Docker for containerization\n✅ CI/CD pipelines (integrated SonarQube, automated testing)\n✅ Git/Bitbucket for version control\n✅ Linux environments\n\nWhile he\'s more focused on application development, he\'s comfortable with modern DevOps practices and cloud deployment workflows!';
      }
    }

    // Greeting responses
    if (msg.includes('hello') || msg.includes('hi ') || msg === 'hi' || msg.includes('hey')) {
      return '👋 Hello! I\'m Saravjit\'s AI assistant. I can tell you all about his:\n\n💼 Professional experience and achievements\n🛠️ Technical skills and expertise  \n🎓 Education and academic background\n🚀 Projects and real-world impact\n📧 How to connect with him\n\nWhat would you like to know? Feel free to ask conversational questions like "Is Saravjit good for software development roles?" or "What makes him stand out?"';
    }

    // Thank you responses
    if (msg.includes('thank') || msg.includes('thanks')) {
      return '😊 You\'re welcome! Feel free to ask any other questions about Saravjit\'s experience, skills, or how to connect with him.\n\nIf you\'re interested in working with him, don\'t hesitate to reach out via LinkedIn or email!';
    }

    // Default response
    return "I can help you learn about Saravjit's:\n\n• 💼 Work Experience & Achievements\n• 🛠️ Technical Skills & Expertise\n• 🎓 Education & Background\n• 🚀 Projects & Impact\n• 📧 Contact Information\n\n💡 **Try asking:**\n- Is Saravjit good for software development?\n- What are his key strengths?\n- How does he approach problem-solving?\n- Should I hire him?\n\nWhat would you like to know?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: generateResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (query) => {
    setInputValue(query);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        type="button"
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!isOpen && <span className="notification-badge">AI</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="header-content">
              <div className="bot-avatar">🤖</div>
              <div className="bot-info">
                <h3>AI Assistant</h3>
                <span className="status">
                  <span className="status-dot" />
                  Online
                </span>
              </div>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.type}-${index.toString()}`}
                className={`message ${message.type}`}
              >
                {message.type === 'bot' && <div className="message-avatar">🤖</div>}
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="quick-actions">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.query)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input"
            />
            <button
              type="button"
              className="send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
