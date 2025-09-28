import React, { useEffect, useState } from 'react';

const MicroplasticWebsite = () => {
  const [currentDevice, setCurrentDevice] = useState('ESP001');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDeviceForm, setNewDeviceForm] = useState({
    id: '',
    name: '',
    owner: '',
    location: '',
    theme: 'home'
  });

  // Chatbot state
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m AquaScan Assistant. I can help you with device management, water quality analysis, and microplastic information. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const deviceProfiles = {
    'ESP001': {
      name: 'Home Kitchen Tap',
      owner: 'John Smith',
      location: 'Kitchen, Main Floor',
      installDate: '2024-01-15',
      alertThreshold: 30,
      theme: 'home',
      coordinates: { lat: 17.385, lng: 78.486 },
      icon: '🏠',
      defaultValues: {
        microplasticLevel: 15,
        waterQuality: 'Good',
        particleCount: 120,
        temperature: 22,
        ph: 7.2
      }
    },
    'ESP002': {
      name: 'Research Lab Station',
      owner: 'Dr. Sarah Wilson',
      location: 'Environmental Lab, Room 204',
      installDate: '2024-02-01',
      alertThreshold: 15,
      theme: 'lab',
      coordinates: { lat: 17.445, lng: 78.348 },
      icon: '🔬',
      defaultValues: {
        microplasticLevel: 5,
        waterQuality: 'Excellent',
        particleCount: 45,
        temperature: 20,
        ph: 7.0
      }
    },
    'ESP003': {
      name: 'River Monitoring Point',
      owner: 'City Environmental Dept',
      location: 'Hussain Sagar Lake - North Point',
      installDate: '2024-01-20',
      alertThreshold: 50,
      theme: 'environmental',
      coordinates: { lat: 17.416, lng: 78.467 },
      icon: '🌊',
      defaultValues: {
        microplasticLevel: 65,
        waterQuality: 'Poor',
        particleCount: 420,
        temperature: 26,
        ph: 6.8
      }
    },
    'ESP004': {
      name: 'School Water Supply',
      owner: 'Green Valley School',
      location: 'Main Building, Ground Floor',
      installDate: '2024-02-10',
      alertThreshold: 20,
      theme: 'school',
      coordinates: { lat: 17.392, lng: 78.451 },
      icon: '🏫',
      defaultValues: {
        microplasticLevel: 25,
        waterQuality: 'Moderate',
        particleCount: 180,
        temperature: 24,
        ph: 7.1
      }
    }
  };

  const [sensorData, setSensorData] = useState({
    microplasticLevel: 15,
    waterQuality: 'Good',
    particleCount: 120,
    temperature: 22,
    ph: 7.2,
    lastUpdated: new Date().toLocaleTimeString(),
    deviceId: 'ESP001'
  });

  const websiteStats = {
    totalUsers: 12847,
    activeDevices: 4,
    testsPerformed: 89432,
    dataPoints: 1247893,
    countriesServed: 23,
    institutionsUsing: 156
  };

  useEffect(() => {
    if (currentDevice && deviceProfiles[currentDevice]) {
      const profile = deviceProfiles[currentDevice];
      setSensorData({
        ...profile.defaultValues,
        lastUpdated: new Date().toLocaleTimeString(),
        deviceId: currentDevice
      });
    }
  }, [currentDevice]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentDevice && deviceProfiles[currentDevice]) {
        const profile = deviceProfiles[currentDevice];
        const defaults = profile.defaultValues;
        
        setSensorData(prev => ({
          microplasticLevel: Math.max(0, defaults.microplasticLevel + Math.floor((Math.random() - 0.5) * 10)),
          waterQuality: defaults.waterQuality,
          particleCount: Math.max(0, defaults.particleCount + Math.floor((Math.random() - 0.5) * 50)),
          temperature: defaults.temperature + (Math.random() - 0.5) * 2,
          ph: defaults.ph + (Math.random() - 0.5) * 0.3,
          lastUpdated: new Date().toLocaleTimeString(),
          deviceId: currentDevice
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentDevice]);

  const switchDevice = (deviceId) => {
    setCurrentDevice(deviceId);
  };

  const addNewDevice = () => {
    console.log('button clicked and form should open',showAddDevice);
    setShowAddDevice(!showAddDevice);
    setNewDeviceForm({
      id: '',
      name: '',
      owner: '',
      location: '',
      theme: 'home'
    });
  };

  const handleFormChange = (field, value) => {
    setNewDeviceForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDevice = () => {
    if (newDeviceForm.id && newDeviceForm.name && newDeviceForm.owner && newDeviceForm.location) {
      alert(`Device ${newDeviceForm.id} registration submitted successfully!`);
      setShowAddDevice(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  // Chatbot functions
  const handleDoubleClick = () => {
    setShowChatbot(!showChatbot);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: chatInput,
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, userMessage]);

      // Simulate bot response
      setTimeout(() => {
        let botResponse = '';
        const input = chatInput.toLowerCase();

        if (input.includes('device') || input.includes('esp')) {
          botResponse = `I can see you currently have ${Object.keys(deviceProfiles).length} ESP devices connected. The active device "${profile.name}" is showing ${sensorData.microplasticLevel}% contamination level. Would you like me to explain the readings or help with device management?`;
        } else if (input.includes('water quality') || input.includes('microplastic')) {
          botResponse = `Current water quality is "${sensorData.waterQuality}" with ${sensorData.particleCount} particles per liter. The safe threshold is typically under 100 particles/L. Your current device shows ${sensorData.microplasticLevel}% contamination, which is ${sensorData.microplasticLevel > profile.alertThreshold ? 'above' : 'below'} the alert threshold of ${profile.alertThreshold}%.`;
        } else if (input.includes('help') || input.includes('what can you do')) {
          botResponse = 'I can help you with: 1) Device management and registration 2) Water quality analysis and interpretation 3) Microplastic safety information 4) Setting up alerts and thresholds 5) Understanding sensor readings 6) Troubleshooting device issues. What would you like to know more about?';
        } else if (input.includes('alert') || input.includes('threshold')) {
          botResponse = `Your current device "${profile.name}" has an alert threshold of ${profile.alertThreshold}%. Current reading is ${sensorData.microplasticLevel}%. ${sensorData.microplasticLevel > profile.alertThreshold ? 'This is above the safe threshold - consider water filtration.' : 'This is within safe limits.'}`;
        } else if (input.includes('add device') || input.includes('register')) {
          botResponse = 'To add a new ESP device, click the "Add New Device" button above the device grid. You\'ll need the device ID, location details, and owner information. After registration, it takes 24-48 hours for admin approval and activation.';
        } else if (input.includes('temperature') || input.includes('ph')) {
          botResponse = `Current water parameters: Temperature: ${sensorData.temperature.toFixed(1)}°C (optimal: 15-25°C), pH: ${sensorData.ph.toFixed(1)} (optimal: 6.5-8.5). ${sensorData.ph >= 6.5 && sensorData.ph <= 8.5 ? 'pH levels are within safe range.' : 'pH levels may need attention.'}`;
        } else {
          botResponse = 'I\'m here to help with AquaScan Pro devices and water quality monitoring. You can ask me about device readings, water safety, microplastic levels, or device management. What specific information do you need?';
        }

        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          message: botResponse,
          timestamp: new Date().toLocaleTimeString()
        };

        setChatMessages(prev => [...prev, botMessage]);
      }, 1000);

      setChatInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getDeviceTheme = () => {
    if (!currentDevice) return {};
    const profile = deviceProfiles[currentDevice];
    
    const themes = {
      home: {
        primary: '#4CAF50',
        secondary: '#81C784',
        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
        light: '#E8F5E8',
        accent: '#2E7D32'
      },
      lab: {
        primary: '#2196F3',
        secondary: '#64B5F6',
        background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
        light: '#E3F2FD',
        accent: '#1565C0'
      },
      environmental: {
        primary: '#00BCD4',
        secondary: '#4DD0E1',
        background: 'linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%)',
        light: '#E0F2F1',
        accent: '#00695C'
      },
      school: {
        primary: '#FF9800',
        secondary: '#FFB74D',
        background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
        light: '#FFF3E0',
        accent: '#E65100'
      }
    };
    
    return themes[profile.theme] || themes.home;
  };

  const profile = deviceProfiles[currentDevice];
  const theme = getDeviceTheme();

 const styles = {
  app: {
    fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', sans-serif",
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${theme.light} 0%, #f8f9fa 100%)`,
    color: '#2c3e50'
  },
  header: {
    background: theme.background,
    padding: '2rem 0',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    '@media (max-width: 768px)': {
      padding: '1.5rem 0'
    }
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  logo: {
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  tagline: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
    opacity: 0.9,
    fontWeight: '400',
    marginTop: '0.5rem'
  },
  deviceInfo: {
    textAlign: 'right'
  },
  deviceLabel: {
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    opacity: 0.8,
    marginBottom: '0.5rem'
  },
  deviceName: {
    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
    fontWeight: '600',
    marginBottom: '0.3rem'
  },
  section: {
    padding: 'clamp(2rem, 8vw, 5rem) 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  sectionTitle: {
    fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 'clamp(2rem, 5vw, 3rem)',
    color: theme.accent
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(1rem, 3vw, 2rem)',
    marginBottom: '3rem'
  },
  statCard: {
    background: 'white',
    borderRadius: 'clamp(15px, 4vw, 20px)',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  statIcon: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    marginBottom: '1rem'
  },
  statNumber: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: '700',
    color: theme.primary,
    marginBottom: '1rem'
  },
  statLabel: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    color: '#666',
    fontWeight: '500'
  },
  deviceSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  addDeviceBtn: {
    background: theme.background,
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: 'clamp(0.8rem 1.5rem, 2vw, 1rem 2rem)',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.3s ease',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    minWidth: 'fit-content'
  },
  deviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(1rem, 3vw, 2rem)',
    marginBottom: '3rem'
  },
  deviceCard: {
    background: 'white',
    borderRadius: 'clamp(15px, 4vw, 20px)',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '2px solid transparent',
    position: 'relative'
  },
  activeDeviceCard: {
    background: theme.background,
    color: 'white',
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
  },
  deviceCardIcon: {
    fontSize: 'clamp(2.5rem, 6vw, 3rem)',
    marginBottom: '1rem'
  },
  deviceCardName: {
    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  deviceCardOwner: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    opacity: 0.8,
    marginBottom: '0.5rem'
  },
  deviceCardLocation: {
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    opacity: 0.7,
    marginBottom: '1rem'
  },
  activeBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: theme.accent,
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '15px',
    fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
    fontWeight: '700'
  },
  dashboardContainer: {
    background: 'white',
    borderRadius: 'clamp(15px, 5vw, 25px)',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    marginBottom: '3rem'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #f8f9fa',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  dashboardTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    color: theme.accent
  },
  lastUpdated: {
    background: '#f8f9fa',
    padding: '0.8rem 1rem',
    borderRadius: '15px',
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    color: '#666'
  },
  dataGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  primaryCard: {
    background: '#f8f9fa',
    borderRadius: 'clamp(15px, 4vw, 20px)',
    padding: 'clamp(2rem, 5vw, 2.5rem)',
    border: `3px solid ${theme.primary}`,
    textAlign: 'center'
  },
  primaryValue: {
    fontSize: 'clamp(3rem, 8vw, 4rem)',
    fontWeight: '700',
    color: theme.primary,
    marginBottom: '0.5rem'
  },
  primaryLabel: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#666',
    marginBottom: '1rem'
  },
  alertIndicator: {
    background: '#ffebee',
    color: '#c62828',
    padding: '0.8rem 1rem',
    borderRadius: '15px',
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    fontWeight: '600'
  },
  qualityCard: {
    background: '#f8f9fa',
    borderRadius: 'clamp(15px, 4vw, 20px)',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  qualityBadge: {
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '20px',
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  parametersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 'clamp(1rem, 3vw, 1.5rem)'
  },
  parameterCard: {
    background: '#f8f9fa',
    borderRadius: 'clamp(10px, 3vw, 15px)',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    textAlign: 'center'
  },
  parameterIcon: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    marginBottom: '1rem'
  },
  parameterValue: {
    fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  parameterLabel: {
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    color: '#666',
    fontWeight: '500'
  },
  deviceInfoPanel: {
    background: '#f8f9fa',
    borderRadius: 'clamp(15px, 4vw, 20px)',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    background: 'white',
    borderRadius: '10px',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  infoLabel: {
    fontWeight: '600',
    color: '#555',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
  },
  infoValue: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
  },
  addDeviceForm: {
    background: 'white',
    borderRadius: 'clamp(15px, 4vw, 20px)',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    marginTop: '2rem',
    border: '3px solid #007bff',
    position: 'relative',
    zIndex: 1000
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  formTitle: {
    fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
    fontWeight: '700',
    color: '#2c3e50'
  },
  closeBtn: {
    background: '#f8f9fa',
    border: 'none',
    borderRadius: '50%',
    width: 'clamp(35px, 8vw, 40px)',
    height: 'clamp(35px, 8vw, 40px)',
    cursor: 'pointer',
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    color: '#666'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '2rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  inputLabel: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    fontWeight: '600',
    color: '#2c3e50'
  },
  formInput: {
    padding: 'clamp(0.8rem, 2vw, 1rem)',
    border: '2px solid #e9ecef',
    borderRadius: '10px',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box'
  },
  formSelect: {
    padding: 'clamp(0.8rem, 2vw, 1rem)',
    border: '2px solid #e9ecef',
    borderRadius: '10px',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    fontFamily: 'inherit',
    background: 'white',
    width: '100%',
    boxSizing: 'border-box'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  cancelBtn: {
    background: '#f8f9fa',
    color: '#666',
    border: '2px solid #e9ecef',
    borderRadius: '10px',
    padding: 'clamp(0.8rem 1.5rem, 2vw, 1rem 2rem)',
    cursor: 'pointer',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
  },
  submitBtn: {
    background: theme.background,
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: 'clamp(0.8rem 1.5rem, 2vw, 1rem 2rem)',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
  },
  
  // Chatbot styles
  chatbotContainer: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '400px',
    height: '600px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    border: `3px solid ${theme.primary}`,
    '@media (max-width: 768px)': {
      width: 'calc(100vw - 2rem)',
      height: 'calc(100vh - 4rem)',
      bottom: '1rem',
      right: '1rem',
      left: '1rem'
    }
  },
  
  chatbotHeader: {
    background: theme.background,
    color: 'white',
    padding: '1.5rem',
    borderRadius: '17px 17px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  chatbotTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  
  chatbotCloseBtn: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  chatbotMessages: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    background: '#f8f9fa'
  },
  
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '85%'
  },
  
  userMessage: {
    background: theme.primary,
    color: 'white',
    borderBottomRightRadius: '5px'
  },
  
  messageTime: {
    fontSize: '0.7rem',
    opacity: 0.6,
    marginTop: '0.3rem',
    marginLeft: '0.5rem'
  },
  
  userMessageTime: {
    marginLeft: '0',
    marginRight: '0.5rem'
  },
  
  chatbotInput: {
    padding: '1rem',
    borderTop: '1px solid #e9ecef',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  
  chatInput: {
    flex: 1,
    padding: '0.8rem 1rem',
    border: '2px solid #e9ecef',
    borderRadius: '25px',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'inherit'
  },
  
  chatSendBtn: {
    background: theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem'
  },
  
  chatbotHelper: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: theme.primary,
    color: 'white',
    padding: '1rem',
    borderRadius: '50px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    fontSize: '0.9rem',
    zIndex: 9998,
    animation: 'pulse 2s infinite',
    cursor: 'pointer'
  }
};

// Add responsive breakpoints for media queries
const mediaQueries = {
  mobile: '@media (max-width: 768px)',
  tablet: '@media (max-width: 1024px)',
  desktop: '@media (min-width: 1025px)'
};

// Responsive overrides
const responsiveStyles = {
  [`${mediaQueries.mobile}`]: {
    dataGrid: {
      gridTemplateColumns: '1fr !important'
    },
    headerContent: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    deviceSectionHeader: {
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    formActions: {
      justifyContent: 'stretch'
    },
    cancelBtn: {
      flex: '1'
    },
    submitBtn: {
      flex: '1'
    }
  }
};

  return (
    <div style={styles.app} onDoubleClick={handleDoubleClick}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 768px) {
          .chatbot-container {
            width: calc(100vw - 2rem) !important;
            height: calc(100vh - 4rem) !important;
            bottom: 1rem !important;
            right: 1rem !important;
            left: 1rem !important;
          }
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <div style={styles.logo}>
              💧 AquaScan Pro
            </div>
            <div style={styles.tagline}>
              Advanced Microplastic Detection & Analytics Platform
            </div>
          </div>
          <div style={styles.deviceInfo}>
            <div style={styles.deviceLabel}>Active Monitoring Device</div>
            <div style={styles.deviceName}>
              {profile.icon} {profile.name}
            </div>
            <div>{profile.owner}</div>
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Global Platform Statistics</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statNumber}>{websiteStats.totalUsers.toLocaleString()}</div>
              <div style={styles.statLabel}>Active Users Worldwide</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📱</div>
              <div style={styles.statNumber}>{websiteStats.activeDevices}</div>
              <div style={styles.statLabel}>ESP Devices Connected</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🔬</div>
              <div style={styles.statNumber}>{websiteStats.testsPerformed.toLocaleString()}</div>
              <div style={styles.statLabel}>Water Tests Performed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <div style={styles.statNumber}>{websiteStats.dataPoints.toLocaleString()}</div>
              <div style={styles.statLabel}>Data Points Collected</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🌍</div>
              <div style={styles.statNumber}>{websiteStats.countriesServed}</div>
              <div style={styles.statLabel}>Countries Served</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🏛️</div>
              <div style={styles.statNumber}>{websiteStats.institutionsUsing}</div>
              <div style={styles.statLabel}>Research Institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Management & Live Monitoring */}
      <section style={{...styles.section, background: '#f8f9fa'}}>
        <div style={styles.container}>
          <div style={styles.deviceSectionHeader}>
            <h2 style={styles.sectionTitle}>ESP Device Management</h2>
            <button style={styles.addDeviceBtn} onClick={addNewDevice}>
              + Add New Device
            </button>
          </div>

          {/* Main Content Layout - Sidebar Layout */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
            '@media (max-width: 1024px)': {
              flexDirection: 'column'
            }
          }}>
            {/* Device Selection Area */}
            <div style={{
              flex: '1',
              minWidth: '0'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: theme.accent
              }}>
                Select Device
              </h3>
              <div style={styles.deviceGrid}>
                {Object.keys(deviceProfiles).map(deviceId => (
                  <div
                    key={deviceId}
                    onClick={() => switchDevice(deviceId)}
                    style={{
                      ...styles.deviceCard,
                      ...(currentDevice === deviceId ? styles.activeDeviceCard : {})
                    }}
                  >
                    <div style={styles.deviceCardIcon}>{deviceProfiles[deviceId].icon}</div>
                    <div style={styles.deviceCardName}>{deviceProfiles[deviceId].name}</div>
                    <div style={styles.deviceCardOwner}>{deviceProfiles[deviceId].owner}</div>
                    <div style={styles.deviceCardLocation}>{deviceProfiles[deviceId].location}</div>
                    <div>Device ID: {deviceId}</div>
                    {currentDevice === deviceId && (
                      <div style={styles.activeBadge}>ACTIVE</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Monitoring Sidebar */}
            <div style={{
              width: '420px',
              minWidth: '420px',
              '@media (max-width: 1024px)': {
                width: '100%',
                minWidth: '0'
              }
            }}>
              <div style={{
                ...styles.dashboardContainer,
                position: 'sticky',
                top: '2rem',
                margin: '0',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}>
                <div style={styles.dashboardHeader}>
                  <h3 style={{...styles.dashboardTitle, fontSize: 'clamp(1.2rem, 3vw, 1.4rem)'}}>
                    Live Monitoring
                  </h3>
                  <div style={{...styles.lastUpdated, fontSize: 'clamp(0.7rem, 2vw, 0.8rem)'}}>
                    {sensorData.lastUpdated}
                  </div>
                </div>

                {/* Device Name Display */}
                <div style={{
                  background: theme.light,
                  borderRadius: '15px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  border: `2px solid ${theme.primary}`
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {profile.icon}
                  </div>
                  <div style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    fontWeight: '600',
                    color: theme.accent
                  }}>
                    {profile.name}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    opacity: 0.7,
                    marginTop: '0.3rem'
                  }}>
                    {profile.owner}
                  </div>
                </div>

                {/* Primary Contamination Display */}
                <div style={{
                  ...styles.primaryCard,
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{...styles.primaryValue, fontSize: 'clamp(2.5rem, 6vw, 3rem)'}}>
                    {Math.max(0, sensorData.microplasticLevel)}%
                  </div>
                  <div style={{...styles.primaryLabel, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'}}>
                    Microplastic Level
                  </div>
                  {sensorData.microplasticLevel > profile.alertThreshold && (
                    <div style={{...styles.alertIndicator, fontSize: 'clamp(0.7rem, 2vw, 0.8rem)'}}>
                      ⚠️ Above Threshold ({profile.alertThreshold}%)
                    </div>
                  )}
                </div>

                {/* Water Quality */}
                <div style={{...styles.qualityCard, marginBottom: '1.5rem'}}>
                  <h4 style={{fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', marginBottom: '1rem'}}>
                    Water Quality Status
                  </h4>
                  <div style={{
                    ...styles.qualityBadge,
                    background: sensorData.waterQuality === 'Excellent' ? '#4CAF50' :
                               sensorData.waterQuality === 'Good' ? '#8BC34A' :
                               sensorData.waterQuality === 'Moderate' ? '#FF9800' : '#F44336',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    padding: '0.8rem 1.2rem'
                  }}>
                    {sensorData.waterQuality}
                  </div>
                </div>

                {/* Parameters Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{...styles.parameterCard, padding: '1.2rem'}}>
                    <div style={{...styles.parameterIcon, fontSize: '1.8rem'}}>🔬</div>
                    <div style={{...styles.parameterValue, fontSize: '1.4rem'}}>
                      {sensorData.particleCount}
                    </div>
                    <div style={styles.parameterLabel}>Particles per Liter</div>
                  </div>
                  <div style={{...styles.parameterCard, padding: '1.2rem'}}>
                    <div style={{...styles.parameterIcon, fontSize: '1.8rem'}}>🌡️</div>
                    <div style={{...styles.parameterValue, fontSize: '1.4rem'}}>
                      {sensorData.temperature.toFixed(1)}°C
                    </div>
                    <div style={styles.parameterLabel}>Water Temperature</div>
                  </div>
                  <div style={{...styles.parameterCard, padding: '1.2rem'}}>
                    <div style={{...styles.parameterIcon, fontSize: '1.8rem'}}>⚗️</div>
                    <div style={{...styles.parameterValue, fontSize: '1.4rem'}}>
                      {sensorData.ph.toFixed(1)}
                    </div>
                    <div style={styles.parameterLabel}>pH Level</div>
                  </div>
                </div>

                {/* Compact Device Info */}
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  padding: '1.2rem'
                }}>
                  <h4 style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    marginBottom: '1rem',
                    color: theme.accent,
                    textAlign: 'center'
                  }}>
                    Device Information
                  </h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      background: 'white',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                    }}>
                      <span style={{fontWeight: '600', color: '#555'}}>ID:</span>
                      <span style={{fontWeight: '600', color: '#2c3e50'}}>{currentDevice}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      background: 'white',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                    }}>
                      <span style={{fontWeight: '600', color: '#555'}}>Threshold:</span>
                      <span style={{fontWeight: '600', color: '#2c3e50'}}>{profile.alertThreshold}%</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      background: 'white',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                    }}>
                      <span style={{fontWeight: '600', color: '#555'}}>Status:</span>
                      <span style={{fontWeight: '600', color: theme.primary}}>Online</span>
                    </div>
                    <div style={{
                      padding: '0.5rem',
                      background: 'white',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                      textAlign: 'center'
                    }}>
                      <span style={{fontWeight: '600', color: '#555'}}>Location: </span>
                      <span style={{color: '#2c3e50'}}>{profile.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Device Form */}
          {showAddDevice && (
            <div style={styles.addDeviceForm}>
              <div style={styles.formHeader}>
                <h3 style={styles.formTitle}>Register New ESP Device</h3>
                <button style={styles.closeBtn} onClick={() => setShowAddDevice(false)}>
                  ×
                </button>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Device ID</label>
                  <input
                    style={styles.formInput}
                    type="text"
                    value={newDeviceForm.id}
                    onChange={(e) => handleFormChange('id', e.target.value)}
                    placeholder="ESP005, ESP006, etc."
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Device Name</label>
                  <input
                    style={styles.formInput}
                    type="text"
                    value={newDeviceForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="e.g., Office Water Cooler"
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Owner</label>
                  <input
                    style={styles.formInput}
                    type="text"
                    value={newDeviceForm.owner}
                    onChange={(e) => handleFormChange('owner', e.target.value)}
                    placeholder="e.g., ABC Corporation"
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Location</label>
                  <input
                    style={styles.formInput}
                    type="text"
                    value={newDeviceForm.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    placeholder="e.g., Building A, Floor 3"
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Device Type</label>
                  <select
                    style={styles.formSelect}
                    value={newDeviceForm.theme}
                    onChange={(e) => handleFormChange('theme', e.target.value)}
                  >
                    <option value="home">Home/Residential</option>
                    <option value="lab">Laboratory/Research</option>
                    <option value="environmental">Environmental/Outdoor</option>
                    <option value="school">Educational Institution</option>
                  </select>
                </div>
              </div>

              <div style={styles.formActions}>
                <button style={styles.cancelBtn} onClick={() => setShowAddDevice(false)}>
                  Cancel
                </button>
                <button style={styles.submitBtn} onClick={handleAddDevice}>
                  Register Device
                </button>
              </div>

              <div style={{
                background: '#e3f2fd',
                color: '#1565c0',
                padding: '1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                marginTop: '1rem'
              }}>
                <strong>Note:</strong> Device registration requires administrator approval 
                and physical installation before appearing in the active monitoring system.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Understanding Microplastics</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: theme.accent}}>
                What are Microplastics?
              </h3>
              <p style={{fontSize: '1rem', color: '#555', lineHeight: '1.6'}}>
                Microplastics are tiny plastic particles less than 5mm in diameter that result from the 
                breakdown of larger plastic debris. They are found in drinking water, food, and air, 
                posing significant environmental and health concerns worldwide.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: theme.accent}}>
                Health Impact
              </h3>
              <p style={{fontSize: '1rem', color: '#555', lineHeight: '1.6'}}>
                Studies suggest microplastics can cause inflammatory responses and cellular damage. 
                They act as carriers for toxic chemicals and may lead to tissue damage and immune 
                system disruption with long-term exposure.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: theme.accent}}>
                Primary Sources
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                  <span style={{fontSize: '1.3rem'}}>🧴</span>
                  <span style={{fontSize: '1rem', color: '#555'}}>Plastic bottle degradation (30-40%)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                  <span style={{fontSize: '1.3rem'}}>👕</span>
                  <span style={{fontSize: '1rem', color: '#555'}}>Synthetic textile washing (20-25%)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                  <span style={{fontSize: '1.3rem'}}>🚗</span>
                  <span style={{fontSize: '1rem', color: '#555'}}>Tire wear particles (15-20%)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                  <span style={{fontSize: '1.3rem'}}>🏭</span>
                  <span style={{fontSize: '1rem', color: '#555'}}>Industrial waste (10-15%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Thresholds */}
          <h3 style={{fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem', color: theme.accent}}>
            Safety Thresholds & Guidelines
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '3px solid #4CAF50'
            }}>
              <div style={{fontSize: '1.2rem', fontWeight: '700', color: '#4CAF50', marginBottom: '0.5rem'}}>
                SAFE LEVEL
              </div>
              <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#2c3e50', marginBottom: '1rem'}}>
                0 - 20 particles/L
              </div>
              <div style={{fontSize: '0.9rem', color: '#666', lineHeight: '1.5'}}>
                Minimal health risk. Water quality meets international standards for safe consumption.
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '3px solid #FF9800'
            }}>
              <div style={{fontSize: '1.2rem', fontWeight: '700', color: '#FF9800', marginBottom: '0.5rem'}}>
                MODERATE RISK
              </div>
              <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#2c3e50', marginBottom: '1rem'}}>
                21 - 100 particles/L
              </div>
              <div style={{fontSize: '0.9rem', color: '#666', lineHeight: '1.5'}}>
                Acceptable levels with monitoring. Filtration recommended for sensitive individuals.
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '3px solid #F44336'
            }}>
              <div style={{fontSize: '1.2rem', fontWeight: '700', color: '#F44336', marginBottom: '0.5rem'}}>
                HIGH RISK
              </div>
              <div style={{fontSize: '1.8rem', fontWeight: '700', color: '#2c3e50', marginBottom: '1rem'}}>
                100+ particles/L
              </div>
              <div style={{fontSize: '0.9rem', color: '#666', lineHeight: '1.5'}}>
                Immediate action required. Water treatment necessary before consumption.
              </div>
            </div>
          </div>

          {/* Global Statistics */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem', color: theme.accent}}>
              Global Microplastic Pollution Statistics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{fontSize: '2.2rem', fontWeight: '700', color: '#e53e3e', marginBottom: '0.5rem'}}>
                  5.25 Trillion
                </div>
                <div style={{fontSize: '1rem', color: '#666'}}>
                  Plastic pieces in our oceans
                </div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{fontSize: '2.2rem', fontWeight: '700', color: '#e53e3e', marginBottom: '0.5rem'}}>
                  83%
                </div>
                <div style={{fontSize: '1rem', color: '#666'}}>
                  Of tap water contains microplastics
                </div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{fontSize: '2.2rem', fontWeight: '700', color: '#e53e3e', marginBottom: '0.5rem'}}>
                  90%
                </div>
                <div style={{fontSize: '1rem', color: '#666'}}>
                  Of bottled water contains microplastics
                </div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{fontSize: '2.2rem', fontWeight: '700', color: '#e53e3e', marginBottom: '0.5rem'}}>
                  5g/week
                </div>
                <div style={{fontSize: '1rem', color: '#666'}}>
                  Average human consumption
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        padding: '3rem 0 1rem 0',
        marginTop: '4rem'
      }}>
        <div style={styles.container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>
                💧 AquaScan Pro
              </div>
              <p style={{opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.5'}}>
                Leading water quality monitoring through advanced microplastic detection technology.
              </p>
            </div>
            <div>
              <h4 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Research</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Scientific Publications</a>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Technology Partners</a>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Research Collaboration</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Support</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Documentation</a>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>API Reference</a>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Technical Support</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Connect</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Contact Team</a>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Partnership Inquiries</a>
                <a href="#" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none'}}>Newsletter</a>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1rem',
            textAlign: 'center',
            opacity: 0.7,
            fontSize: '0.9rem'
          }}>
            © 2024 AquaScan Pro. Advanced Environmental Monitoring Solutions. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      {!showChatbot && (
        <div style={styles.chatbotHelper}>
          💬 Double-click anywhere to chat!
        </div>
      )}

      {showChatbot && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <div style={styles.chatbotTitle}>
              🤖 AquaScan Assistant
            </div>
            <button 
              style={styles.chatbotCloseBtn}
              onClick={() => setShowChatbot(false)}
            >
              ×
            </button>
          </div>

          <div style={styles.chatbotMessages}>
            {chatMessages.map(msg => (
              <div 
                key={msg.id} 
                style={{
                  ...styles.messageContainer,
                  ...(msg.type === 'user' ? styles.userMessageContainer : {})
                }}
              >
                <div style={{
                  ...styles.message,
                  ...(msg.type === 'bot' ? styles.botMessage : styles.userMessage)
                }}>
                  {msg.message}
                </div>
                <div style={{
                  ...styles.messageTime,
                  ...(msg.type === 'user' ? styles.userMessageTime : {})
                }}>
                  {msg.timestamp}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.chatbotInput}>
            <input
              style={styles.chatInput}
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about water quality, devices, or microplastics..."
            />
            <button 
              style={styles.chatSendBtn}
              onClick={handleSendMessage}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroplasticWebsite;