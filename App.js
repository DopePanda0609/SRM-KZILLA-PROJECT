import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Lock, Unlock, Upload, File } from 'lucide-react';

const DigitalTimeCapsule = () => {
  const [capsules, setCapsules] = useState([]);
  const [newCapsule, setNewCapsule] = useState({
    title: '',
    content: null,
    unlockDate: '',
    unlockTime: '',
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setNewCapsule({ ...newCapsule, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewCapsule({ ...newCapsule, content: file });
  };

  const createCapsule = () => {
    const unlockDateTime = new Date(`${newCapsule.unlockDate}T${newCapsule.unlockTime}`);
    setCapsules([...capsules, { ...newCapsule, id: Date.now(), unlockDateTime, isUnlocked: false }]);
    setNewCapsule({ title: '', content: null, unlockDate: '', unlockTime: '' });
  };

  const toggleLock = async (capsule) => {
    if (capsule.isUnlocked) {
      setCapsules(capsules.map(c => 
        c.id === capsule.id ? { ...c, isUnlocked: false } : c
      ));
    } else {
      const updatedCapsule = { ...capsule, isUnlocked: true };
      setCapsules(capsules.map(c => 
        c.id === capsule.id ? updatedCapsule : c
      ));
      await viewFile(updatedCapsule);
    }
  };

  const isUnlockable = (unlockDateTime) => {
    return currentDateTime >= new Date(unlockDateTime);
  };

  const viewFile = async (capsule) => {
    if (!capsule.content) {
      alert('No file to display');
      return;
    }

    const file = capsule.content;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '80vh';
        const win = window.open("", "Image");
        win.document.write(img.outerHTML);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain') {
      const text = await file.text();
      const win = window.open("", "Text");
      win.document.write(`<pre>${text}</pre>`);
    } else {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Digital Time Capsule</h1>
      
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Create New Time Capsule</h2>
        <p style={{ marginBottom: '10px' }}>Add memories to unlock in the future</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            name="title"
            placeholder="Capsule Title"
            value={newCapsule.title}
            onChange={handleInputChange}
            style={{ padding: '5px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Upload size={20} />
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={20} />
            <input
              type="date"
              name="unlockDate"
              value={newCapsule.unlockDate}
              onChange={handleInputChange}
              style={{ padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={20} />
            <input
              type="time"
              name="unlockTime"
              value={newCapsule.unlockTime}
              onChange={handleInputChange}
              style={{ padding: '5px' }}
            />
          </div>
          <button onClick={createCapsule} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Create Capsule</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {capsules.map((capsule) => (
          <div key={capsule.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{capsule.title}</h3>
            <p style={{ marginBottom: '10px' }}>Unlock Date: {new Date(capsule.unlockDateTime).toLocaleString()}</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <File size={16} />
              Content: {capsule.content ? capsule.content.name : 'No content'}
            </p>
            <button 
              onClick={() => toggleLock(capsule)}
              disabled={!isUnlockable(capsule.unlockDateTime)}
              style={{ 
                marginTop: '10px', 
                padding: '5px 10px', 
                backgroundColor: capsule.isUnlocked ? '#dc3545' : '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: isUnlockable(capsule.unlockDateTime) ? 'pointer' : 'not-allowed',
                opacity: isUnlockable(capsule.unlockDateTime) ? 1 : 0.5,
                display: 'flex', 
                alignItems: 'center', 
                gap: '5px' 
              }}
            >
              {capsule.isUnlocked ? <><Unlock size={16} /> Unlocked</> : <><Lock size={16} /> Locked</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalTimeCapsule;