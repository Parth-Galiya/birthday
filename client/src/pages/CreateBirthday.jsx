import { useState, useRef } from 'react';
import { api } from '../services/api';
import { Copy, Check, Share2, UploadCloud, Trash2, Sparkles, ExternalLink, Gift } from 'lucide-react';

export default function CreateBirthday() {
  const fileInputRef = useRef(null);
  const [createdPublicId, setCreatedPublicId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    recipientName: '',
    creatorName: '',
    age: 20,
    birthday: '',
    cakeTheme: 'strawberry',
    reasons: ['Your contagious smile', 'The way you care for everyone', 'Your inspiring energy'],
    photos: [],
    letter: 'Happy birthday! Wishing you endless happiness, love, and light today and always.',
  });

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve({ url: dataUrl, caption: '' });
        };
      };
    });
  };

  const handleMultiFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remaining = 8 - formData.photos.length;
    if (remaining <= 0) {
      alert('You can only upload up to 8 photos.');
      return;
    }

    const filesToRead = files.slice(0, remaining).filter((f) => f.type.startsWith('image/'));
    const resizedPhotos = await Promise.all(filesToRead.map((file) => resizeImage(file)));

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...resizedPhotos.filter(Boolean)],
    }));
    e.target.value = '';
  };

  const updateCaption = (index, val) => {
    const nextPhotos = [...formData.photos];
    nextPhotos[index].caption = val;
    setFormData({ ...formData, photos: nextPhotos });
  };

  const removePhoto = (index) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, idx) => idx !== index),
    });
  };

  const addReason = () => {
    if (formData.reasons.length < 20) {
      setFormData({ ...formData, reasons: [...formData.reasons, ''] });
    }
  };

  const updateReason = (index, val) => {
    const nextReasons = [...formData.reasons];
    nextReasons[index] = val;
    setFormData({ ...formData, reasons: nextReasons });
  };

  const removeReason = (index) => {
    setFormData({
      ...formData,
      reasons: formData.reasons.filter((_, idx) => idx !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.createBirthday({
        ...formData,
        reasons: formData.reasons.filter((r) => r.trim() !== ''),
      });
      setCreatedPublicId(res.data.data.publicId);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error creating experience');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}/experience/${createdPublicId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `${window.location.origin}/experience/${createdPublicId}`;
    const text = encodeURIComponent(`🎉 I made a personalized Birthday Experience for you! Open it here: ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (createdPublicId) {
    const shareUrl = `${window.location.origin}/experience/${createdPublicId}`;

    return (
      <main className="experience-shell">
        <div className="share-card-container">
          <div className="share-badge-glow">
            <Gift className="floating-gift" size={48} />
          </div>

          <h1 className="share-title">Your Surprise is Ready! ✨</h1>
          <p className="share-subtitle">
            We've wrapped up something unforgettable for <strong>{formData.recipientName}</strong>.
          </p>

          <div className="share-input-box">
            <input type="text" readOnly value={shareUrl} />
            <button type="button" className="btn btn-copy" onClick={copyToClipboard}>
              {copied ? (
                <>
                  <Check size={18} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy Link
                </>
              )}
            </button>
          </div>

          <div className="share-button-group">
            <button type="button" className="btn btn-whatsapp-large" onClick={shareOnWhatsApp}>
              <Share2 size={20} /> Share on WhatsApp
            </button>
            <a
              href={`/experience/${createdPublicId}?preview=true`}
              className="btn btn-preview"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={18} /> Preview Experience
            </a>
          </div>

          <div className="share-info-footer">
            <Sparkles size={16} />
            <span>If opened before their birthday, a countdown unlocks the surprise automatically!</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="builder-container">
      <header className="builder-header">
        <h1>BirthdayBloom ✨</h1>
        <p>Craft a personalized birthday web experience for someone special.</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="builder-form">
        <div className="form-section">
          <h3>1. Basic Info 🎈</h3>
          <div className="input-grid">
            <div>
              <label>Recipient's Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              />
            </div>
            <div>
              <label>Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex"
                value={formData.creatorName}
                onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
              />
            </div>
            <div>
              <label>Turning Age</label>
              <input
                type="number"
                min="1"
                max="120"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              />
            </div>
            <div>
              <label>Birthday Date</label>
              <input
                type="date"
                required
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>2. Interactive Cake Flavor 🎂</h3>
          <div className="flavor-options">
            {['strawberry', 'chocolate', 'rainbow', 'vanilla'].map((flavor) => (
              <label key={flavor} className={`flavor-pill ${formData.cakeTheme === flavor ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="cakeTheme"
                  value={flavor}
                  checked={formData.cakeTheme === flavor}
                  onChange={(e) => setFormData({ ...formData, cakeTheme: e.target.value })}
                />
                {flavor.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <div className="section-title-row">
            <h3>3. Reasons Why We Love You 🎈</h3>
            <button type="button" className="btn-small" onClick={addReason}>+ Add Reason</button>
          </div>
          {formData.reasons.map((reason, idx) => (
            <div key={idx} className="reason-row">
              <input
                type="text"
                placeholder={`Reason #${idx + 1}`}
                value={reason}
                onChange={(e) => updateReason(idx, e.target.value)}
              />
              <button type="button" onClick={() => removeReason(idx)} className="btn-icon">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="form-section">
          <div className="section-title-row">
            <h3>4. Memory Polaroid Photos 📸</h3>
            <span>{formData.photos.length} / 8 Photos</span>
          </div>

          {formData.photos.length < 8 && (
            <div className="upload-dropzone" onClick={() => fileInputRef.current?.click()}>
              <UploadCloud size={32} />
              <p>Click to upload photos (.jpg, .jpeg, .png, .webp, .gif)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultiFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}

          <div className="polaroid-grid">
            {formData.photos.map((photo, index) => (
              <div key={index} className="polaroid-card">
                <button type="button" className="delete-badge" onClick={() => removePhoto(index)}>
                  <Trash2 size={14} />
                </button>
                <div className="polaroid-image-wrap">
                  <img src={photo.url} alt={`Memory ${index + 1}`} />
                </div>
                <input
                  type="text"
                  placeholder="Caption..."
                  value={photo.caption}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  className="polaroid-caption-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>5. Personal Birthday Letter 💌</h3>
          <textarea
            rows="4"
            maxLength="1000"
            value={formData.letter}
            onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
            placeholder="Write your heart out..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
          {loading ? 'Creating Experience...' : 'Create Birthday Magic ✨'}
        </button>
      </form>
    </div>
  );
}