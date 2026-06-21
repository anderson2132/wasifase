// WasiSafe - Demo App Logic

// --- Demo Data ---
const DEMO_PROFILES = [
  {
    id: 'ABCD1234',
    name: 'Sebastián López',
    type: 'child',
    typeLabel: 'Hijo',
    age: 7,
    photo: '👦',
    allergies: 'Penicilina, Maní',
    medicalInfo: 'Asmático leve. Usa inhalador Salbutamol.',
    emergency: [
      { name: 'María López', relation: 'Mamá', phone: '+51 987 654 321' },
      { name: 'Carlos López', relation: 'Papá', phone: '+51 976 543 210' },
    ],
    scans: 3,
    lastScan: '2026-06-18 14:32',
    status: 'active',
  },
  {
    id: 'EFGH5678',
    name: 'Rosa Mamani',
    type: 'elder',
    typeLabel: 'Adulto Mayor',
    age: 78,
    photo: '👵',
    allergies: 'Ibuprofeno',
    medicalInfo: 'Hipertensión. Toma Enalapril 10mg cada 12h. Diabetes tipo 2.',
    emergency: [
      { name: 'Luis Mamani', relation: 'Hijo', phone: '+51 955 123 456' },
    ],
    scans: 1,
    lastScan: '2026-06-15 09:10',
    status: 'active',
  },
  {
    id: 'IJKL9012',
    name: 'Max',
    type: 'pet',
    typeLabel: 'Mascota',
    age: 3,
    photo: '🐕',
    allergies: 'Ninguna',
    medicalInfo: 'Labrador. Vacunas al día. Microchip: 123456789.',
    emergency: [
      { name: 'Ana García', relation: 'Dueña', phone: '+51 999 888 777' },
    ],
    scans: 0,
    lastScan: null,
    status: 'active',
  },
];

const DEMO_SCANS = [
  { profile: 'Sebastián López', code: 'ABCD1234', date: '2026-06-18', time: '14:32', location: 'San Isidro, Lima', device: 'iPhone 15' },
  { profile: 'Sebastián López', code: 'ABCD1234', date: '2026-06-17', time: '09:15', location: 'Miraflores, Lima', device: 'Samsung Galaxy' },
  { profile: 'Rosa Mamani', code: 'EFGH5678', date: '2026-06-15', time: '09:10', location: 'Surco, Lima', device: 'Android' },
  { profile: 'Sebastián López', code: 'ABCD1234', date: '2026-06-10', time: '16:45', location: 'San Borja, Lima', device: 'iPhone 14' },
];

const ADMIN_USERS = [
  { id: 1, name: 'María García', email: 'maria@gmail.com', plan: 'familiar', profiles: 3, joined: '2026-01-15', status: 'active' },
  { id: 2, name: 'Carlos Ríos', email: 'carlos@empresa.pe', plan: 'premium', profiles: 8, joined: '2026-02-03', status: 'active' },
  { id: 3, name: 'Ana Torres', email: 'ana@colegio.edu.pe', plan: 'institucional', profiles: 45, joined: '2026-03-10', status: 'active' },
  { id: 4, name: 'José Mendoza', email: 'jose@gmail.com', plan: 'free', profiles: 1, joined: '2026-04-22', status: 'active' },
  { id: 5, name: 'Lucia Vargas', email: 'lucia@hotmail.com', plan: 'familiar', profiles: 2, joined: '2026-05-01', status: 'inactive' },
  { id: 6, name: 'Roberto Silva', email: 'roberto@gmail.com', plan: 'free', profiles: 1, joined: '2026-06-10', status: 'active' },
];

// --- Auth Tab Switch ---
function initAuthTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      forms.forEach(f => {
        f.style.display = f.id === target ? 'block' : 'none';
      });
    });
  });
}

// --- Login Form ---
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Ingresando...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });
}

// --- Register Form ---
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creando cuenta...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1400);
  });
}

// --- Render Profiles ---
function renderProfiles() {
  const container = document.getElementById('profilesGrid');
  if (!container) return;

  container.innerHTML = DEMO_PROFILES.map(p => `
    <div class="profile-card">
      <span class="profile-type-badge type-${p.type}">${p.typeLabel}</span>
      <div class="profile-avatar">${p.photo}</div>
      <div class="profile-name">${p.name}</div>
      <div class="profile-meta">${p.age} años · ${p.scans} escaneos</div>
      <div class="profile-actions">
        <a href="perfil-publico.html?id=${p.id}" class="btn btn-outline btn-sm" target="_blank">
          <i class="fa-solid fa-eye"></i> Ver QR
        </a>
        <button class="btn btn-primary btn-sm" onclick="downloadQR('${p.id}')">
          <i class="fa-solid fa-download"></i> QR
        </button>
        <a href="perfil-crear.html?edit=${p.id}" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-pen"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// --- Render Scan History ---
function renderScanHistory() {
  const tbody = document.getElementById('scanHistory');
  if (!tbody) return;

  tbody.innerHTML = DEMO_SCANS.map(s => `
    <tr>
      <td>
        <div class="font-semibold">${s.profile}</div>
        <div class="text-sm text-gray">Código: ${s.code}</div>
      </td>
      <td>${s.date} · ${s.time}</td>
      <td><i class="fa-solid fa-location-dot text-blue"></i> ${s.location}</td>
      <td><i class="fa-solid fa-mobile text-gray"></i> ${s.device}</td>
      <td>
        <span class="admin-badge badge-active">Notificado</span>
      </td>
    </tr>
  `).join('');
}

// --- Download QR (demo) ---
function downloadQR(code) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://wasisafe.pe/profile/${code}&color=2563EB&bgcolor=FFFFFF`;
  const a = document.createElement('a');
  a.href = url;
  a.download = `WasiSafe-QR-${code}.png`;
  a.target = '_blank';
  a.click();
  showToast(`QR de ${code} descargado`);
}

// --- Toast Notification ---
function showToast(message, type = 'success') {
  const existing = document.querySelector('.ws-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ws-toast';
  toast.style.cssText = `
    position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
    background: ${type === 'success' ? '#111827' : '#EF4444'};
    color: white; padding: 0.875rem 1.25rem;
    border-radius: 12px; font-size: 0.875rem; font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    display: flex; align-items: center; gap: 0.5rem;
    animation: slideUp 0.3s ease;
  `;
  toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// --- Render Admin Users Table ---
function renderAdminUsers() {
  const tbody = document.getElementById('adminUsersTable');
  if (!tbody) return;

  const planBadge = { free: 'badge-free', familiar: 'badge-familiar', premium: 'badge-premium', institucional: 'badge-institucional' };
  const planLabel = { free: 'Gratuito', familiar: 'Familiar', premium: 'Premium', institucional: 'Institucional' };

  tbody.innerHTML = ADMIN_USERS.map(u => `
    <tr>
      <td>
        <div class="flex items-center gap-1">
          <div style="width:32px;height:32px;border-radius:50%;background:#EFF6FF;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;color:#2563EB;">
            ${u.name.charAt(0)}
          </div>
          <div>
            <div class="font-semibold">${u.name}</div>
            <div class="text-sm text-gray">${u.email}</div>
          </div>
        </div>
      </td>
      <td><span class="admin-badge ${planBadge[u.plan]}">${planLabel[u.plan]}</span></td>
      <td>${u.profiles}</td>
      <td>${u.joined}</td>
      <td><span class="admin-badge ${u.status === 'active' ? 'badge-active' : 'badge-inactive'}">${u.status === 'active' ? 'Activo' : 'Inactivo'}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="showToast('Acción ejecutada')">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// --- Profile Form ---
function initProfileForm() {
  const form = document.getElementById('profileForm');
  if (!form) return;

  // Photo preview
  const photoInput = document.getElementById('photoInput');
  const photoUpload = document.getElementById('photoUpload');
  const photoPreview = document.getElementById('photoPreview');

  if (photoUpload && photoInput) {
    photoUpload.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          photoPreview.innerHTML = `<img src="${ev.target.result}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Emergency contact add
  const addContactBtn = document.getElementById('addContact');
  const contactsList = document.getElementById('contactsList');
  let contactCount = 1;

  if (addContactBtn && contactsList) {
    addContactBtn.addEventListener('click', () => {
      contactCount++;
      const div = document.createElement('div');
      div.className = 'form-grid mt-2';
      div.style.marginTop = '0.75rem';
      div.innerHTML = `
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre del contacto">
        </div>
        <div class="form-group">
          <label>Relación</label>
          <select>
            <option>Mamá</option><option>Papá</option><option>Tutor</option><option>Otro</option>
          </select>
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" placeholder="+51 999 999 999">
        </div>
        <div class="form-group" style="display:flex;align-items:flex-end;">
          <button type="button" class="btn btn-outline btn-sm" onclick="this.closest('.form-grid').remove()">
            <i class="fa-solid fa-trash"></i> Eliminar
          </button>
        </div>
      `;
      contactsList.appendChild(div);
    });
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
    setTimeout(() => {
      showToast('Perfil guardado correctamente');
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    }, 1500);
  });
}

// --- Public Profile ---
function initPublicProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'ABCD1234';
  const profile = DEMO_PROFILES.find(p => p.id === id) || DEMO_PROFILES[0];

  // Populate profile data
  const setEl = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = val;
  };

  setEl('#pub-photo', profile.photo);
  setEl('#pub-name', profile.name);
  setEl('#pub-age', `${profile.age} años`);
  setEl('#pub-type', profile.typeLabel);

  if (profile.allergies && profile.allergies !== 'Ninguna') {
    setEl('#pub-allergies', `<span class="info-chip" style="background:#FEF3C7;color:#92400E;"><i class="fa-solid fa-triangle-exclamation"></i> Alergia: ${profile.allergies}</span>`);
  }

  if (profile.medicalInfo) {
    setEl('#pub-medical', `<span class="info-chip"><i class="fa-solid fa-notes-medical"></i> ${profile.medicalInfo.substring(0, 50)}${profile.medicalInfo.length > 50 ? '...' : ''}</span>`);
  }

  // Emergency contacts
  const contactsEl = document.getElementById('pub-contacts');
  if (contactsEl && profile.emergency) {
    contactsEl.innerHTML = profile.emergency.map(c => `
      <div class="contact-row">
        <i class="fa-solid fa-user-shield"></i>
        <div>
          <strong>${c.name}</strong>
          <span>${c.relation} · ${c.phone}</span>
        </div>
      </div>
    `).join('');
  }

  // WhatsApp / Call buttons
  const firstContact = profile.emergency[0];
  const waBtn = document.getElementById('btn-whatsapp');
  const callBtn = document.getElementById('btn-call');

  if (waBtn && firstContact) {
    const msg = encodeURIComponent(`Hola, encontré a ${profile.name}. Lo vi en ${new Date().toLocaleString('es-PE')}. Por favor contácteme.`);
    const phone = firstContact.phone.replace(/\D/g, '');
    waBtn.href = `https://wa.me/${phone}?text=${msg}`;
  }

  if (callBtn && firstContact) {
    callBtn.href = `tel:${firstContact.phone.replace(/\s/g, '')}`;
  }

  // Generate QR code
  const qrContainer = document.getElementById('qr-container');
  if (qrContainer) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wasisafe.pe/profile/${id}&color=2563EB`;
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code" class="qr-image" onerror="this.style.display='none'">`;
  }
}

// --- Add CSS animation ---
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// --- Init on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initAuthTabs();
  initLoginForm();
  initRegisterForm();
  renderProfiles();
  renderScanHistory();
  renderAdminUsers();
  initProfileForm();
  initPublicProfile();
});
