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
    <div style={styles.app}>
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

          {/* Device Selection Grid */}
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

          {/* Live Dashboard */}
          <div style={styles.dashboardContainer}>
            <div style={styles.dashboardHeader}>
              <h3 style={styles.dashboardTitle}>Live Monitoring - {profile.name}</h3>
              <div style={styles.lastUpdated}>
                Last Updated: {sensorData.lastUpdated}
              </div>
            </div>

            <div style={styles.dataGrid}>
              {/* Primary Contamination Display */}
              <div style={styles.primaryCard}>
                <div style={styles.primaryValue}>{Math.max(0, sensorData.microplasticLevel)}%</div>
                <div style={styles.primaryLabel}>Microplastic Contamination Level</div>
                {sensorData.microplasticLevel > profile.alertThreshold && (
                  <div style={styles.alertIndicator}>
                    ⚠️ Above Alert Threshold ({profile.alertThreshold}%)
                  </div>
                )}
              </div>

              {/* Water Quality */}
              <div style={styles.qualityCard}>
                <h4>Water Quality Status</h4>
                <div style={{
                  ...styles.qualityBadge,
                  background: sensorData.waterQuality === 'Excellent' ? '#4CAF50' :
                             sensorData.waterQuality === 'Good' ? '#8BC34A' :
                             sensorData.waterQuality === 'Moderate' ? '#FF9800' : '#F44336'
                }}>
                  {sensorData.waterQuality}
                </div>
                <div style={{fontSize: '0.9rem', opacity: 0.7}}>
                  Based on comprehensive analysis
                </div>
              </div>
            </div>

            {/* Parameters Grid */}
            <div style={styles.parametersGrid}>
              <div style={styles.parameterCard}>
                <div style={styles.parameterIcon}>🔬</div>
                <div style={styles.parameterValue}>{sensorData.particleCount}</div>
                <div style={styles.parameterLabel}>Particles per Liter</div>
              </div>
              <div style={styles.parameterCard}>
                <div style={styles.parameterIcon}>🌡️</div>
                <div style={styles.parameterValue}>{sensorData.temperature.toFixed(1)}°C</div>
                <div style={styles.parameterLabel}>Water Temperature</div>
              </div>
              <div style={styles.parameterCard}>
                <div style={styles.parameterIcon}>⚗️</div>
                <div style={styles.parameterValue}>{sensorData.ph.toFixed(1)}</div>
                <div style={styles.parameterLabel}>pH Level</div>
              </div>
            </div>

            {/* Device Info Panel */}
            <div style={styles.deviceInfoPanel}>
              <h4 style={{textAlign: 'center', marginBottom: '2rem', color: theme.accent}}>
                Device Information
              </h4>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Device ID:</span>
                  <span style={styles.infoValue}>{currentDevice}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Location:</span>
                  <span style={styles.infoValue}>{profile.location}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Install Date:</span>
                  <span style={styles.infoValue}>{profile.installDate}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Alert Threshold:</span>
                  <span style={styles.infoValue}>{profile.alertThreshold}%</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>GPS Coordinates:</span>
                  <span style={styles.infoValue}>
                    {profile.coordinates.lat}°N, {profile.coordinates.lng}°E
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Status:</span>
                  <span style={{...styles.infoValue, color: theme.primary}}>Online & Active</span>
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
    </div>
  );
};

export default MicroplasticWebsite;