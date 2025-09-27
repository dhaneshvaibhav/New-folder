import React, { useEffect, useState } from 'react';

const MicroplasticWebsite = () => {
  const [currentDevice, setCurrentDevice] = useState('ESP001');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [deviceProfiles, setDeviceProfiles] = useState({
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
  });

  const [sensorData, setSensorData] = useState({
    microplasticLevel: 0,
    waterQuality: 'Analyzing...',
    particleCount: 0,
    temperature: 0,
    ph: 0,
    lastUpdated: new Date().toLocaleTimeString(),
    deviceId: null
  });

  const [websiteStats] = useState({
    totalUsers: 12847,
    activeDevices: Object.keys(deviceProfiles).length,
    testsPerformed: 89432,
    dataPoints: 1247893,
    countriesServed: 23,
    institutionsUsing: 156
  });

  // Load default values when device changes
  useEffect(() => {
    if (currentDevice && deviceProfiles[currentDevice]) {
      const profile = deviceProfiles[currentDevice];
      setSensorData({
        ...profile.defaultValues,
        lastUpdated: new Date().toLocaleTimeString(),
        deviceId: currentDevice
      });
    }
  }, [currentDevice, deviceProfiles]);

  // Simulate real-time updates with some variation
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
  }, [currentDevice, deviceProfiles]);

  // Anime.js animations
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.onload = () => {
      // Entrance animations
      window.anime({
        targets: '.main-card',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: window.anime.stagger(200),
        easing: 'easeOutExpo'
      });

      // Floating particles
      window.anime({
        targets: '.floating-particle',
        translateY: [-20, 20],
        translateX: [-10, 10],
        rotate: [0, 360],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: window.anime.stagger(300)
      });

      // Pulse effect for data values
      window.anime({
        targets: '.data-value',
        scale: [1, 1.05, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine',
        delay: window.anime.stagger(500)
      });

      // Counter animation for stats
      window.anime({
        targets: '.counter-value',
        innerHTML: [0, function(el) { return el.getAttribute('data-count'); }],
        duration: 2000,
        round: 1,
        easing: 'easeOutExpo',
        delay: window.anime.stagger(200)
      });
    };
    
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const switchDevice = (deviceId) => {
    setCurrentDevice(deviceId);
    
    // Animate device switch
    if (window.anime) {
      window.anime({
        targets: '.data-card',
        scale: [1, 0.9, 1],
        rotateY: [0, 180, 0],
        duration: 800,
        easing: 'easeInOutExpo'
      });
    }
  };

  const addNewDevice = () => {
    setShowAddDevice(!showAddDevice);
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

  return (
    <div style={{...styles.app, background: `linear-gradient(135deg, ${theme.light} 0%, #f8f9fa 100%)`}}>
      {/* Beautiful Header */}
      <header style={{...styles.header, background: theme.background}}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>💧</span>
              AquaScan Pro
            </div>
            <div style={styles.tagline}>Advanced Microplastic Detection & Analytics</div>
          </div>
          
          <div style={styles.currentDeviceInfo}>
            <div style={styles.deviceLabel}>Active Device</div>
            <div style={styles.deviceName}>
              {profile.icon} {profile.name}
            </div>
            <div style={styles.deviceOwner}>{profile.owner}</div>
          </div>
        </div>
      </header>

      {/* Website Statistics Section */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: theme.accent}}>
            Global Impact & Usage Statistics
          </h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard} className="main-card">
              <div style={styles.statIcon}>👥</div>
              <div className="counter-value" style={styles.statNumber} data-count={websiteStats.totalUsers}>
                {websiteStats.totalUsers.toLocaleString()}
              </div>
              <div style={styles.statLabel}>Active Users Worldwide</div>
            </div>
            <div style={styles.statCard} className="main-card">
              <div style={styles.statIcon}>📱</div>
              <div className="counter-value" style={styles.statNumber} data-count={websiteStats.activeDevices}>
                {websiteStats.activeDevices}
              </div>
              <div style={styles.statLabel}>ESP Devices Connected</div>
            </div>
            <div style={styles.statCard} className="main-card">
              <div style={styles.statIcon}>🔬</div>
              <div className="counter-value" style={styles.statNumber} data-count={websiteStats.testsPerformed}>
                {websiteStats.testsPerformed.toLocaleString()}
              </div>
              <div style={styles.statLabel}>Water Tests Performed</div>
            </div>
            <div style={styles.statCard} className="main-card">
              <div style={styles.statIcon}>📊</div>
              <div className="counter-value" style={styles.statNumber} data-count={websiteStats.dataPoints}>
                {websiteStats.dataPoints.toLocaleString()}
              </div>
              <div style={styles.statLabel}>Data Points Collected</div>
            </div>
            <div style={styles.statCard} className="main-card">
              <div style={styles.statIcon}>🌍</div>
              <div className="counter-value" style={styles.statNumber} data-count={websiteStats.countriesServed}>
                {websiteStats.countriesServed}
              </div>
              <div style={styles.statLabel}>Countries Served</div>
            </div>
            <div style={styles.statCard} className="main-card">
              <div style={styles.statIcon}>🏛️</div>
              <div className="counter-value" style={styles.statNumber} data-count={websiteStats.institutionsUsing}>
                {websiteStats.institutionsUsing}
              </div>
              <div style={styles.statLabel}>Research Institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Selection Panel */}
      <section style={styles.deviceSelection}>
        <div style={styles.container}>
          <div style={styles.deviceSectionHeader}>
            <h2 style={{...styles.sectionTitle, color: theme.accent}}>
              ESP Device Management
            </h2>
            <button 
              style={{...styles.addDeviceBtn, background: theme.background}}
              onClick={addNewDevice}
              className="main-card"
            >
              <span style={styles.addIcon}>+</span>
              Add New ESP Device
            </button>
          </div>
          
          <div style={styles.deviceGrid}>
            {Object.keys(deviceProfiles).map(deviceId => (
              <div
                key={deviceId}
                onClick={() => switchDevice(deviceId)}
                style={{
                  ...styles.deviceCard,
                  ...(currentDevice === deviceId ? {
                    ...styles.activeDeviceCard,
                    background: theme.background,
                    transform: 'translateY(-10px) scale(1.05)'
                  } : {})
                }}
                className="main-card"
              >
                <div style={styles.deviceCardIcon}>{deviceProfiles[deviceId].icon}</div>
                <div style={styles.deviceCardName}>{deviceProfiles[deviceId].name}</div>
                <div style={styles.deviceCardOwner}>{deviceProfiles[deviceId].owner}</div>
                <div style={styles.deviceCardLocation}>{deviceProfiles[deviceId].location}</div>
                <div style={styles.deviceId}>Device: {deviceId}</div>
                {currentDevice === deviceId && (
                  <div style={{...styles.activeBadge, background: theme.accent}}>
                    ● ACTIVE
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAddDevice && (
            <div style={styles.addDeviceForm} className="main-card">
              <h3 style={styles.formTitle}>Add New ESP Device</h3>
              <p style={styles.formDescription}>
                Register a new ESP microplastic detection device to the monitoring network
              </p>
              <div style={styles.formNote}>
                Contact administrator to add new devices to the system
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Microplastic Information Section */}
      <section style={styles.infoSection}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: theme.accent}}>
            Understanding Microplastics: Facts & Thresholds
          </h2>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoCard} className="main-card">
              <h3 style={styles.infoCardTitle}>What are Microplastics?</h3>
              <p style={styles.infoText}>
                Microplastics are tiny plastic particles less than 5mm in diameter that result from the breakdown 
                of larger plastic debris or are released directly into the environment. These particles are found 
                in drinking water, food, and even the air we breathe, posing significant environmental and health concerns.
              </p>
            </div>

            <div style={styles.infoCard} className="main-card">
              <h3 style={styles.infoCardTitle}>Health Impact & Concerns</h3>
              <p style={styles.infoText}>
                Studies suggest microplastics can cause inflammatory responses, cellular damage, and potentially 
                affect hormone levels. They act as carriers for toxic chemicals and pathogens. Long-term exposure 
                may lead to tissue damage, immune system disruption, and potential carcinogenic effects.
              </p>
            </div>

            <div style={styles.infoCard} className="main-card">
              <h3 style={styles.infoCardTitle}>Primary Sources & Causes</h3>
              <div style={styles.sourcesList}>
                <div style={styles.sourceItem}>
                  <span style={styles.sourceIcon}>🧴</span>
                  <span>Plastic bottle degradation (30-40%)</span>
                </div>
                <div style={styles.sourceItem}>
                  <span style={styles.sourceIcon}>👕</span>
                  <span>Synthetic textile washing (20-25%)</span>
                </div>
                <div style={styles.sourceItem}>
                  <span style={styles.sourceIcon}>🚗</span>
                  <span>Tire wear particles (15-20%)</span>
                </div>
                <div style={styles.sourceItem}>
                  <span style={styles.sourceIcon}>🏭</span>
                  <span>Industrial waste (10-15%)</span>
                </div>
                <div style={styles.sourceItem}>
                  <span style={styles.sourceIcon}>🌊</span>
                  <span>Ocean plastic breakdown (5-10%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Threshold Information */}
          <div style={styles.thresholdSection}>
            <h3 style={{...styles.thresholdTitle, color: theme.accent}}>
              Safety Thresholds & Guidelines
            </h3>
            <div style={styles.thresholdGrid}>
              <div style={{...styles.thresholdCard, borderColor: '#4CAF50'}} className="main-card">
                <div style={{...styles.thresholdLevel, color: '#4CAF50'}}>SAFE</div>
                <div style={styles.thresholdRange}>0 - 20 particles/L</div>
                <div style={styles.thresholdDescription}>
                  Minimal health risk. Water quality meets international standards for safe consumption.
                </div>
              </div>
              
              <div style={{...styles.thresholdCard, borderColor: '#FF9800'}} className="main-card">
                <div style={{...styles.thresholdLevel, color: '#FF9800'}}>MODERATE</div>
                <div style={styles.thresholdRange}>21 - 100 particles/L</div>
                <div style={styles.thresholdDescription}>
                  Acceptable levels with monitoring recommended. Consider filtration for sensitive individuals.
                </div>
              </div>
              
              <div style={{...styles.thresholdCard, borderColor: '#F44336'}} className="main-card">
                <div style={{...styles.thresholdLevel, color: '#F44336'}}>HIGH RISK</div>
                <div style={styles.thresholdRange}>100+ particles/L</div>
                <div style={styles.thresholdDescription}>
                  Immediate action required. Water treatment necessary before consumption.
                </div>
              </div>
            </div>
          </div>

          {/* Global Statistics */}
          <div style={styles.globalStatsSection}>
            <h3 style={{...styles.globalStatsTitle, color: theme.accent}}>
              Global Microplastic Pollution Statistics
            </h3>
            <div style={styles.globalStatsGrid}>
              <div style={styles.globalStatItem} className="main-card">
                <div style={styles.globalStatNumber}>5.25 Trillion</div>
                <div style={styles.globalStatLabel}>Plastic pieces in our oceans</div>
              </div>
              <div style={styles.globalStatItem} className="main-card">
                <div style={styles.globalStatNumber}>83%</div>
                <div style={styles.globalStatLabel}>Of tap water contains microplastics</div>
              </div>
              <div style={styles.globalStatItem} className="main-card">
                <div style={styles.globalStatNumber}>90%</div>
                <div style={styles.globalStatLabel}>Of bottled water contains microplastics</div>
              </div>
              <div style={styles.globalStatItem} className="main-card">
                <div style={styles.globalStatNumber}>5g/week</div>
                <div style={styles.globalStatLabel}>Average human consumption (credit card size)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section style={styles.dashboard}>
        <div style={styles.container}>
          <div style={styles.dashboardHeader}>
            <h2 style={{...styles.dashboardTitle, color: theme.accent}}>
              Live Monitoring Dashboard
            </h2>
            <div style={styles.lastUpdated}>
              Last Updated: {sensorData.lastUpdated}
            </div>
          </div>

          {/* Main Data Display */}
          <div style={styles.mainDataGrid}>
            {/* Primary Contamination Display */}
            <div style={{...styles.primaryCard, borderColor: theme.primary}} className="main-card data-card">
              <div style={styles.primaryCardHeader}>
                <h3 style={styles.primaryCardTitle}>Microplastic Contamination</h3>
                <div style={{...styles.deviceBadge, background: theme.background}}>
                  {currentDevice}
                </div>
              </div>
              <div style={styles.primaryDataContainer}>
                <div style={{...styles.primaryValue, color: theme.primary}} className="data-value">
                  {Math.max(0, sensorData.microplasticLevel)}%
                </div>
                <div style={styles.primaryLabel}>Contamination Level</div>
                {sensorData.microplasticLevel > profile.alertThreshold && (
                  <div style={styles.alertIndicator}>
                    ⚠️ Above Alert Threshold ({profile.alertThreshold}%)
                  </div>
                )}
              </div>
            </div>

            {/* Water Quality Status */}
            <div style={styles.qualityCard} className="main-card data-card">
              <h3 style={styles.cardTitle}>Water Quality Status</h3>
              <div style={{
                ...styles.qualityBadge,
                background: sensorData.waterQuality === 'Excellent' ? '#4CAF50' :
                           sensorData.waterQuality === 'Good' ? '#8BC34A' :
                           sensorData.waterQuality === 'Moderate' ? '#FF9800' : '#F44336'
              }} className="data-value">
                {sensorData.waterQuality}
              </div>
              <div style={styles.qualityDetails}>
                Based on multiple parameters including microplastic levels, pH, and temperature analysis
              </div>
            </div>

            {/* Additional Parameters */}
            <div style={styles.parametersGrid}>
              <div style={styles.parameterCard} className="main-card data-card">
                <div style={styles.parameterIcon}>🔬</div>
                <div style={styles.parameterValue} className="data-value">
                  {sensorData.particleCount}
                </div>
                <div style={styles.parameterLabel}>Particles/L</div>
              </div>
              
              <div style={styles.parameterCard} className="main-card data-card">
                <div style={styles.parameterIcon}>🌡️</div>
                <div style={styles.parameterValue} className="data-value">
                  {sensorData.temperature.toFixed(1)}°C
                </div>
                <div style={styles.parameterLabel}>Temperature</div>
              </div>
              
              <div style={styles.parameterCard} className="main-card data-card">
                <div style={styles.parameterIcon}>⚗️</div>
                <div style={styles.parameterValue} className="data-value">
                  {sensorData.ph.toFixed(1)}
                </div>
                <div style={styles.parameterLabel}>pH Level</div>
              </div>
            </div>
          </div>

          {/* Device Information Panel */}
          <div style={styles.deviceInfoPanel} className="main-card">
            <h3 style={{...styles.panelTitle, color: theme.accent}}>Device Information & Specifications</h3>
            <div style={styles.deviceInfoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Device ID:</span>
                <span style={styles.infoValue}>{currentDevice}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Location:</span>
                <span style={styles.infoValue}>{profile.location}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Installation Date:</span>
                <span style={styles.infoValue}>{profile.installDate}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Alert Threshold:</span>
                <span style={styles.infoValue}>{profile.alertThreshold}%</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>GPS Coordinates:</span>
                <span style={styles.infoValue}>
                  {profile.coordinates.lat}, {profile.coordinates.lng}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Connection Status:</span>
                <span style={{...styles.statusIndicator, color: theme.primary}}>
                  ● Online & Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Effects */}
      <div style={styles.backgroundEffects}>
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="floating-particle"
            style={{
              ...styles.floatingParticle,
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`,
              background: theme.primary + '20',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: "'Inter', 'Source Sans Pro', 'Helvetica Neue', sans-serif",
    minHeight: '100vh',
    position: 'relative',
    fontWeight: '400',
    lineHeight: '1.6'
  },

  header: {
    padding: '3rem 0',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
  },

  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },

  logo: {
    fontSize: '2.8rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '-0.5px'
  },

  logoIcon: {
    fontSize: '3.2rem'
  },

  tagline: {
    fontSize: '1.2rem',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: '0.5px'
  },

  currentDeviceInfo: {
    textAlign: 'right'
  },

  deviceLabel: {
    fontSize: '0.95rem',
    opacity: 0.8,
    marginBottom: '0.5rem',
    fontWeight: '400',
    letterSpacing: '0.3px'
  },

  deviceName: {
    fontSize: '1.6rem',
    fontWeight: '600',
    marginBottom: '0.3rem',
    letterSpacing: '-0.3px'
  },

  deviceOwner: {
    fontSize: '1.05rem',
    opacity: 0.9,
    fontWeight: '400'
  },

  statsSection: {
    padding: '5rem 0',
    background: 'white'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },

  sectionTitle: {
    fontSize: '2.8rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '4rem',
    letterSpacing: '-0.5px'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem'
  },

  statCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease'
  },

  statIcon: {
    fontSize: '3rem',
    marginBottom: '1.5rem'
  },

  statNumber: {
    fontSize: '3.2rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '1rem',
    letterSpacing: '-1px'
  },

  statLabel: {
    fontSize: '1.1rem',
    color: '#666',
    fontWeight: '500',
    letterSpacing: '0.3px'
  },

  deviceSelection: {
    padding: '5rem 0',
    background: '#f8f9fa'
  },

  deviceSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem'
  },

  addDeviceBtn: {
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    letterSpacing: '0.3px'
  },

  addIcon: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },

  deviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },

  deviceCard: {
    background: 'white',
    borderRadius: '25px',
    padding: '2.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
    border: '2px solid transparent',
    position: 'relative',
    overflow: 'hidden'
  },

  activeDeviceCard: {
    color: 'white',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-5px)'
  },

  deviceCardIcon: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem'
  },

  deviceCardName: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '0.8rem',
    letterSpacing: '-0.3px'
  },

  deviceCardOwner: {
    fontSize: '1.1rem',
    opacity: 0.8,
    marginBottom: '0.8rem',
    fontWeight: '500'
  },

  deviceCardLocation: {
    fontSize: '1rem',
    opacity: 0.7,
    marginBottom: '1.5rem',
    fontWeight: '400',
    lineHeight: '1.4'
  },

  deviceId: {
    fontSize: '0.9rem',
    fontWeight: '600',
    opacity: 0.6,
    letterSpacing: '0.5px'
  },

  activeBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },

  addDeviceForm: {
    background: 'white',
    borderRadius: '25px',
    padding: '3rem',
    marginTop: '3rem',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
    textAlign: 'center'
  },

  formTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '1rem',
    letterSpacing: '-0.3px'
  },

  formDescription: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    fontWeight: '400',
    lineHeight: '1.6'
  },

  formNote: {
    background: '#e3f2fd',
    color: '#1565c0',
    padding: '1rem 2rem',
    borderRadius: '15px',
    fontSize: '1rem',
    fontWeight: '500',
    border: '2px solid #bbdefb'
  },

  infoSection: {
    padding: '6rem 0',
    background: 'white'
  },

  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2.5rem',
    marginBottom: '5rem'
  },

  infoCard: {
    background: '#f8f9fa',
    borderRadius: '25px',
    padding: '3rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },

  infoCardTitle: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    letterSpacing: '-0.3px'
  },

  infoText: {
    fontSize: '1.05rem',
    color: '#555',
    lineHeight: '1.7',
    fontWeight: '400'
  },

  sourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },

  sourceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.05rem',
    fontWeight: '500',
    color: '#555'
  },

  sourceIcon: {
    fontSize: '1.5rem',
    minWidth: '2rem'
  },

  thresholdSection: {
    marginBottom: '5rem'
  },

  thresholdTitle: {
    fontSize: '2.2rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '3rem',
    letterSpacing: '-0.4px'
  },

  thresholdGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },

  thresholdCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    textAlign: 'center',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
    border: '3px solid',
    transition: 'transform 0.3s ease'
  },

  thresholdLevel: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '0.5px'
  },

  thresholdRange: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    letterSpacing: '-0.5px'
  },

  thresholdDescription: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
    fontWeight: '400'
  },

  globalStatsSection: {
    background: '#f8f9fa',
    borderRadius: '25px',
    padding: '4rem',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)'
  },

  globalStatsTitle: {
    fontSize: '2.2rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '3rem',
    letterSpacing: '-0.4px'
  },

  globalStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },

  globalStatItem: {
    background: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },

  globalStatNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#e53e3e',
    marginBottom: '1rem',
    letterSpacing: '-0.5px'
  },

  globalStatLabel: {
    fontSize: '1.1rem',
    color: '#666',
    fontWeight: '500',
    lineHeight: '1.4'
  },

  dashboard: {
    padding: '5rem 0',
    background: '#f8f9fa'
  },

  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem'
  },

  dashboardTitle: {
    fontSize: '2.8rem',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },

  lastUpdated: {
    fontSize: '1.05rem',
    opacity: 0.8,
    background: 'white',
    padding: '1rem 2rem',
    borderRadius: '30px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    fontWeight: '500',
    letterSpacing: '0.3px'
  },

  mainDataGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2.5rem',
    marginBottom: '4rem'
  },

  primaryCard: {
    background: 'white',
    borderRadius: '30px',
    padding: '3.5rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    border: '3px solid'
  },

  primaryCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem'
  },

  primaryCardTitle: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#2c3e50',
    letterSpacing: '-0.3px'
  },

  deviceBadge: {
    color: 'white',
    padding: '0.6rem 1.3rem',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.3px'
  },

  primaryDataContainer: {
    textAlign: 'center'
  },

  primaryValue: {
    fontSize: '4.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-2px'
  },

  primaryLabel: {
    fontSize: '1.3rem',
    color: '#666',
    marginBottom: '1.5rem',
    fontWeight: '500',
    letterSpacing: '0.3px'
  },

  alertIndicator: {
    background: '#ffebee',
    color: '#c62828',
    padding: '1.2rem',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: '600',
    border: '2px solid #ffcdd2',
    letterSpacing: '0.3px'
  },

  qualityCard: {
    background: 'white',
    borderRadius: '30px',
    padding: '2.5rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '2rem',
    letterSpacing: '-0.3px'
  },

  qualityBadge: {
    color: 'white',
    padding: '1.2rem 2.5rem',
    borderRadius: '30px',
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    letterSpacing: '0.3px'
  },

  qualityDetails: {
    fontSize: '1rem',
    opacity: 0.7,
    lineHeight: '1.6',
    fontWeight: '400'
  },

  parametersGrid: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem'
  },

  parameterCard: {
    background: 'white',
    borderRadius: '25px',
    padding: '2.5rem',
    textAlign: 'center',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },

  parameterIcon: {
    fontSize: '3rem',
    marginBottom: '1.5rem'
  },

  parameterValue: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '0.8rem',
    letterSpacing: '-0.5px'
  },

  parameterLabel: {
    fontSize: '1.1rem',
    color: '#666',
    fontWeight: '600',
    letterSpacing: '0.3px'
  },

  deviceInfoPanel: {
    background: 'white',
    borderRadius: '30px',
    padding: '3.5rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },

  panelTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '2.5rem',
    textAlign: 'center',
    letterSpacing: '-0.4px'
  },

  deviceInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.8rem'
  },

  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.3rem 1.8rem',
    background: '#f8f9fa',
    borderRadius: '18px',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },

  infoLabel: {
    fontWeight: '600',
    color: '#555',
    fontSize: '1.05rem',
    letterSpacing: '0.3px'
  },

  infoValue: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '1.05rem'
  },

  statusIndicator: {
    fontWeight: '700',
    letterSpacing: '0.3px'
  },

  backgroundEffects: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1
  },

  floatingParticle: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    opacity: 0.4
  }
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  .main-card:hover {
    transform: translateY(-5px) !important;
  }
  
  .parameterCard:hover {
    transform: translateY(-8px) scale(1.02) !important;
  }
  
  .statCard:hover {
    transform: translateY(-8px) scale(1.02) !important;
  }
  
  .thresholdCard:hover {
    transform: translateY(-5px) scale(1.02) !important;
  }
  
  .globalStatItem:hover {
    transform: translateY(-5px) scale(1.02) !important;
  }
  
  @media (max-width: 768px) {
    .mainDataGrid {
      grid-template-columns: 1fr !important;
    }
    
    .deviceSectionHeader {
      flex-direction: column !important;
      gap: 2rem !important;
      text-align: center !important;
    }
    
    .dashboardHeader {
      flex-direction: column !important;
      gap: 1.5rem !important;
      text-align: center !important;
    }
    
    .headerContent {
      flex-direction: column !important;
      text-align: center !important;
      gap: 2rem !important;
    }
    
    .currentDeviceInfo {
      text-align: center !important;
    }
    
    .logo {
      font-size: 2.2rem !important;
    }
    
    .heroTitle {
      font-size: 2.2rem !important;
    }
    
    .sectionTitle {
      font-size: 2.2rem !important;
    }
    
    .dashboardTitle {
      font-size: 2.2rem !important;
    }
    
    .primaryValue {
      font-size: 3.5rem !important;
    }
    
    .deviceGrid {
      grid-template-columns: 1fr !important;
    }
    
    .statsGrid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
    }
    
    .thresholdGrid {
      grid-template-columns: 1fr !important;
    }
    
    .globalStatsGrid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
    }
    
    .parametersGrid {
      grid-template-columns: 1fr !important;
    }
    
    .deviceInfoGrid {
      grid-template-columns: 1fr !important;
    }
    
    .infoGrid {
      grid-template-columns: 1fr !important;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0 1rem !important;
    }
    
    .header {
      padding: 2rem 0 !important;
    }
    
    .logoIcon {
      font-size: 2.5rem !important;
    }
    
    .logo {
      font-size: 1.8rem !important;
    }
    
    .tagline {
      font-size: 1rem !important;
    }
    
    .deviceName {
      font-size: 1.3rem !important;
    }
    
    .sectionTitle {
      font-size: 1.8rem !important;
    }
    
    .dashboardTitle {
      font-size: 1.8rem !important;
    }
    
    .primaryValue {
      font-size: 3rem !important;
    }
    
    .primaryCard {
      padding: 2rem !important;
    }
    
    .qualityCard {
      padding: 2rem !important;
    }
    
    .parameterCard {
      padding: 2rem !important;
    }
    
    .deviceInfoPanel {
      padding: 2rem !important;
    }
    
    .statCard {
      padding: 2rem 1.5rem !important;
    }
    
    .deviceCard {
      padding: 2rem !important;
    }
    
    .infoCard {
      padding: 2rem !important;
    }
    
    .thresholdCard {
      padding: 2rem !important;
    }
    
    .globalStatItem {
      padding: 2rem !important;
    }
    
    .globalStatsSection {
      padding: 2.5rem !important;
    }
    
    .addDeviceForm {
      padding: 2rem !important;
    }
    
    .formTitle {
      font-size: 1.5rem !important;
    }
    
    .statNumber {
      font-size: 2.5rem !important;
    }
    
    .globalStatNumber {
      font-size: 2rem !important;
    }
    
    .parameterValue {
      font-size: 1.8rem !important;
    }
    
    .thresholdRange {
      font-size: 1.6rem !important;
    }
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Loading states */
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  /* Focus states for accessibility */
  .deviceCard:focus,
  .addDeviceBtn:focus {
    outline: 3px solid #007bff;
    outline-offset: 2px;
  }
  
  /* Print styles */
  @media print {
    .backgroundEffects,
    .floating-particle {
      display: none !important;
    }
    
    .main-card {
      box-shadow: none !important;
      border: 1px solid #ddd !important;
    }
    
    .header {
      background: #f8f9fa !important;
      color: #333 !important;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .main-card {
      border: 2px solid #000 !important;
    }
    
    .infoText,
    .qualityDetails,
    .thresholdDescription {
      color: #000 !important;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .floating-particle {
      animation: none !important;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .app {
      background: #1a1a1a !important;
      color: #ffffff !important;
    }
    
    .main-card {
      background: #2d2d2d !important;
      color: #ffffff !important;
      border-color: #444 !important;
    }
    
    .infoText,
    .qualityDetails,
    .thresholdDescription,
    .statLabel,
    .parameterLabel,
    .globalStatLabel {
      color: #cccccc !important;
    }
    
    .primaryCardTitle,
    .cardTitle,
    .infoCardTitle,
    .formTitle,
    .panelTitle {
      color: #ffffff !important;
    }
    
    .infoLabel,
    .infoValue {
      color: #cccccc !important;
    }
    
    .container {
      background: transparent !important;
    }
    
    .statsSection,
    .deviceSelection,
    .infoSection,
    .dashboard {
      background: #1a1a1a !important;
    }
    
    .infoCard,
    .globalStatsSection {
      background: #2d2d2d !important;
    }
    
    .infoItem {
      background: #3a3a3a !important;
    }
    
    .formNote {
      background: #2a4a6b !important;
      color: #87ceeb !important;
      border-color: #4a90e2 !important;
    }
    
    .alertIndicator {
      background: #4a2c2c !important;
      color: #ff6b6b !important;
      border-color: #5a3a3a !important;
    }
    
    .lastUpdated {
      background: #2d2d2d !important;
      color: #cccccc !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default MicroplasticWebsite;