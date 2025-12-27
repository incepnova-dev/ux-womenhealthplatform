
import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Heart, Stethoscope, AlertCircle, Shield, Calendar, BookOpen, HelpCircle } from 'lucide-react';
import '../styles/womeninsprods.css'; 
import healthData from "../data/women_health_conditions.json";
import '../styles/womencommdb1.css';


const { healthConditions, healthConditionsDetailed, whenToSeeGynecologist, faqs, preventionCare } = healthData;



const WomenHealthConditionsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('conditions');

  const categories = ['all', 'Hormonal Disorder', 'Tissue Disorder', 'Infection', 'Mental Health'];

  const allConditions = [
    ...healthData.healthConditions.map(c => ({ ...c, type: 'basic' })),
    ...healthData.healthConditionsDetailed.map(c => ({ ...c, type: 'detailed' }))
  ];

  const filteredConditions = allConditions.filter(condition => {
    const matchesSearch = 
      (condition.title || condition.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (condition.description || condition.introText || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || condition.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openModal = (item) => {
    setSelectedItem(item);
    setActiveTab('overview');
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="page-shell">
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f5f5f5;
        }
        
        .page-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        .top-bar {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .top-bar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .brand-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .brand-logo {
          font-size: 32px;
        }
        
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        
        .brand-title {
          font-size: 18px;
          font-weight: 700;
          color: #E91E63;
        }
        
        .brand-subtitle {
          font-size: 12px;
          color: #666;
        }
        
        .main {
          flex: 1;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 32px 20px;
        }
        
        .content-wrap {
          width: 100%;
        }
        
        .deck-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          cursor: pointer;
        }
        
        .deck-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }
        
        .deck-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: #1f2937;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #E91E63, #FF4081);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .deck-subtitle {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
          margin: 12px 0;
        }
        
        .btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          text-decoration: none;
        }
        
        .btn.primary {
          background: #E91E63;
          color: white;
        }
        
        .btn.primary:hover {
          background: #C2185B;
        }
        
        .mode-toggle-button {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .mode-toggle-button:hover {
          border-color: #E91E63;
          background: #fef2f7;
        }
        
        .mode-toggle-button.active {
          background: #E91E63;
          color: white;
          border: none;
        }
        
        input {
          width: 100%;
          padding: 10px 10px 10px 42px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
        }
        
        input:focus {
          outline: none;
          border-color: #E91E63;
        }
        
        .footer {
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 24px 0;
          margin-top: auto;
        }
        
        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #666;
        }
        
        .footer-dot {
          width: 8px;
          height: 8px;
          background: #E91E63;
          border-radius: 50%;
        }
        
        .footer-links {
          display: flex;
          gap: 16px;
          font-size: 13px;
          flex-wrap: wrap;
        }
        
        .footer-links a {
          color: #666;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .footer-links a:hover {
          color: #E91E63;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-close {
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #e5e7eb;
        }

        .modal-tabs {
          display: flex;
          gap: 4px;
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          overflow-x: auto;
        }

        .modal-tab {
          padding: 8px 16px;
          border-radius: 8px;
          background: transparent;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .modal-tab:hover {
          background: #f3f4f6;
        }

        .modal-tab.active {
          background: #E91E63;
          color: white;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .condition-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          background: #1976D2;
          color: white;
          margin-bottom: 12px;
        }

        .symptom-list, .test-list, .treatment-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }

        .symptom-list li, .test-list li, .treatment-list li {
          padding: 12px;
          background: #f9fafb;
          border-left: 3px solid #E91E63;
          margin-bottom: 8px;
          border-radius: 6px;
          font-size: 14px;
          line-height: 1.6;
        }

        .info-box {
          background: #fef2f7;
          border-left: 4px solid #E91E63;
          padding: 16px;
          border-radius: 8px;
          margin: 16px 0;
        }

        .info-box h4 {
          margin: 0 0 8px 0;
          color: #E91E63;
          font-size: 14px;
          font-weight: 700;
        }

        .faq-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .faq-question {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .faq-answer {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.6;
        }

        .prevention-card {
          background: linear-gradient(135deg, #E91E63 0%, #FF4081 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .prevention-card h3 {
          margin: 0 0 12px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
        }

        .prevention-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .prevention-list li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          font-size: 14px;
          line-height: 1.5;
        }

        .prevention-list li:last-child {
          border-bottom: none;
        }
      `}</style>
      
      <header className="top-bar">
        <div className="top-bar-inner">
          <div className="brand-block">
            <div className="brand-logo">🌸</div>
            <div className="brand-text">
              <span className="brand-title">Nari Swasthya Gyan</span>
              <span className="brand-subtitle">Women's Health Knowledge Center</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="content-wrap">
          <section style={{ 
            background: 'linear-gradient(135deg, #E91E63 0%, #FF4081 100%)', 
            borderRadius: '24px', 
            padding: '40px 30px', 
            color: 'white',
            boxShadow: '0 20px 40px rgba(233, 30, 99, 0.2)',
            marginBottom: '32px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: '#fff', 
                border: '1px solid rgba(255,255,255,0.3)', 
                padding: '6px 12px', 
                borderRadius: '20px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <Heart size={14} /> Evidence-Based Health Information
              </div>
            </div>
            
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              margin: '16px 0',
              color: 'white'
            }}>
              Your Guide to <span style={{ color: 'rgba(255,255,255,0.95)' }}>Women's Health</span>
            </h1>

            <p style={{ 
              color: 'rgba(255,255,255,0.9)', 
              maxWidth: '600px', 
              lineHeight: '1.6',
              marginBottom: '24px',
              fontSize: '15px'
            }}>
              Comprehensive information about women's health conditions, symptoms, treatments, and preventive care.
            </p>
            
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                placeholder="Search health conditions, symptoms, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <button 
                onClick={() => { setActiveSection('conditions'); setSelectedCategory('all'); }} 
                className={`mode-toggle-button ${activeSection === 'conditions' ? 'active' : ''}`}
                style={{
                  ...(activeSection === 'conditions' ? { 
                    background: 'white', 
                    color: '#E91E63', 
                    border: 'none' 
                  } : {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  })
                }}
              >
                Health Conditions
              </button>
              <button 
                onClick={() => setActiveSection('prevention')} 
                className={`mode-toggle-button ${activeSection === 'prevention' ? 'active' : ''}`}
                style={{
                  ...(activeSection === 'prevention' ? { 
                    background: 'white', 
                    color: '#E91E63', 
                    border: 'none' 
                  } : {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  })
                }}
              >
                Prevention & Care
              </button>
              <button 
                onClick={() => setActiveSection('preventionQA')} 
                className={`mode-toggle-button ${activeSection === 'preventionQA' ? 'active' : ''}`}
                style={{
                  ...(activeSection === 'preventionQA' ? { 
                    background: 'white', 
                    color: '#E91E63', 
                    border: 'none' 
                  } : {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  })
                }}
              >
                Prevention Q&A
              </button>
              <button 
                onClick={() => setActiveSection('whenToSee')} 
                className={`mode-toggle-button ${activeSection === 'whenToSee' ? 'active' : ''}`}
                style={{
                  ...(activeSection === 'whenToSee' ? { 
                    background: 'white', 
                    color: '#E91E63', 
                    border: 'none' 
                  } : {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  })
                }}
              >
                When to See Doctor
              </button>
              <button 
                onClick={() => setActiveSection('faq')} 
                className={`mode-toggle-button ${activeSection === 'faq' ? 'active' : ''}`}
                style={{
                  ...(activeSection === 'faq' ? { 
                    background: 'white', 
                    color: '#E91E63', 
                    border: 'none' 
                  } : {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  })
                }}
              >
                FAQs
              </button>
            </div>

            {activeSection === 'conditions' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)} 
                    className={`mode-toggle-button ${selectedCategory === cat ? 'active' : ''}`}
                    style={{
                      ...(selectedCategory === cat ? { 
                        background: 'white', 
                        color: '#E91E63', 
                        border: 'none' 
                      } : {
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.3)'
                      })
                    }}
                  >
                    {cat === 'all' ? 'All Topics' : cat}
                  </button>
                ))}
              </div>
            )}
          </section>

          {activeSection === 'conditions' && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '20px', 
              marginTop: '24px',
              maxWidth: '100%'
            }}>
              {filteredConditions.map((condition, idx) => (
                <div key={idx} className="deck-card" onClick={() => openModal(condition)}>
                  <div style={{ marginBottom: '12px' }}>
                    <h3 className="deck-title hero-gradient">
                      {condition.title || condition.name}
                    </h3>
                    {condition.category && (
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        background: '#1976D2',
                        color: 'white',
                        marginTop: '8px'
                      }}>
                        {condition.category}
                      </span>
                    )}
                  </div>
                  
                  <p style={{ 
                    color: '#111827', 
                    fontSize: '0.9rem', 
                    lineHeight: '1.5',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '16px'
                  }}>
                    {condition.description || condition.introText}
                  </p>

                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <BookOpen size={14} /> Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'prevention' && (
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                Prevention & Care
              </h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {healthData.preventionCare.map((care, idx) => (
                  <div key={idx} className="prevention-card">
                    <h3>
                      <span style={{ fontSize: '24px' }}>{care.icon}</span> {care.title}
                    </h3>
                    <ul className="prevention-list">
                      {care.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'preventionQA' && (
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                Prevention Q&A
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {healthData.preventionCareQA.map((qa, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '32px' }}>{qa.icon}</span>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#E91E63', margin: 0 }}>
                        {qa.headline}
                      </h3>
                    </div>
                    <div 
                      style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151' }}
                      dangerouslySetInnerHTML={{ __html: qa.text }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'whenToSee' && (
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                When to See a Gynecologist
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {healthData.whenToSeeGynecologist.map((section, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#E91E63', marginBottom: '16px' }}>
                      {section.title}
                    </h3>
                    <ul className="symptom-list">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'faq' && (
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {healthData.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <div className="faq-question">
                      <HelpCircle size={20} style={{ color: '#E91E63', flexShrink: 0, marginTop: '2px' }} />
                      <span>{faq.question}</span>
                    </div>
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }} className="hero-gradient">
                  {selectedItem.title || selectedItem.name}
                </h2>
                {selectedItem.category && (
                  <span className="condition-badge">{selectedItem.category}</span>
                )}
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-tabs">
              <button 
                className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <Stethoscope size={14} /> Overview
              </button>
              <button 
                className={`modal-tab ${activeTab === 'symptoms' ? 'active' : ''}`}
                onClick={() => setActiveTab('symptoms')}
              >
                <AlertCircle size={14} /> Symptoms & Tests
              </button>
              <button 
                className={`modal-tab ${activeTab === 'treatment' ? 'active' : ''}`}
                onClick={() => setActiveTab('treatment')}
              >
                <Heart size={14} /> Treatment
              </button>
            </div>

            <div className="modal-body">
              {activeTab === 'overview' && (
                <div>
                  <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151', marginBottom: '20px' }}>
                    {selectedItem.description || selectedItem.introText}
                  </p>
                  
                  {selectedItem.causes && (
                    <div className="info-box">
                      <h4>Common Causes</h4>
                      <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                        {selectedItem.causes.map((cause, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{cause}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'symptoms' && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                    Common Symptoms
                  </h3>
                  <ul className="symptom-list">
                    {(selectedItem.symptoms || []).map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                  </ul>

                  {selectedItem.tests && selectedItem.tests.length > 0 && (
                    <>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '16px', color: '#1f2937' }}>
                        Diagnostic Tests
                      </h3>
                      <ul className="test-list">
                        {selectedItem.tests.map((test, idx) => (
                          <li key={idx}>{test}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'treatment' && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                    Treatment Options
                  </h3>
                  {selectedItem.treatment ? (
                    <ul className="treatment-list">
                      {selectedItem.treatment.map((treatment, idx) => (
                        <li key={idx}>{treatment}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#6b7280' }}>
                      Treatment information varies by condition. Please consult with your healthcare provider for personalized treatment options.
                    </p>
                  )}

                  {selectedItem.prevention && (
                    <div className="info-box" style={{ marginTop: '24px' }}>
                      <h4>Prevention Tips</h4>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px', lineHeight: '1.6' }}>
                        {selectedItem.prevention}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-dot"></div>
            <span>Seva Health Network · Built for India's families and health systems</span>
          </div>
          <div className="footer-links">
            <a>Product overview</a>
            <a>Partner with us</a>
            <a>Privacy & data security</a>
            <a href="#start">Start</a>
            <span>·</span>
            <a href="#forum">Live Q&amp;A</a>
            <span>·</span>
            <a href="#safety">Safety</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WomenHealthConditionsPage;