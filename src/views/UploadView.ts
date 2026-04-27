export const createUploadView = (container: HTMLElement) => {
  container.innerHTML = `
    <div class="upload-zone" id="upload-zone">
      <div class="upload-content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <h2>Arrastra tu archivo aquí</h2>
        <p>O haz clic para seleccionar</p>
        <input type="file" id="file-input" accept=".xlsx,.xls,.csv,.ods" hidden />
        <button class="btn-primary" id="btn-select">Seleccionar archivo</button>
      </div>
    </div>
  `;

  const uploadZone = container.querySelector('#upload-zone') as HTMLElement;
  const fileInput = container.querySelector('#file-input') as HTMLInputElement;
  const btnSelect = container.querySelector('#btn-select') as HTMLButtonElement;

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  };

  const onDragLeave = () => {
    uploadZone.classList.remove('dragover');
  };

  const onDrop = (e: DragEvent, callback: (file: File) => void) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const file = e.dataTransfer?.files[0];
    if (file) callback(file);
  };

  return {
    element: container,
    onFileSelect: (callback: (file: File) => void) => {
      btnSelect.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];
        if (file) callback(file);
      });
      uploadZone.addEventListener('dragover', onDragOver);
      uploadZone.addEventListener('dragleave', onDragLeave);
      uploadZone.addEventListener('drop', (e) => onDrop(e, callback));
    },
    showLoading: () => {
      uploadZone.innerHTML = `<div class="upload-content"><div class="spinner"></div><p>Procesando archivo...</p></div>`;
    },
    showError: (msg: string) => {
      uploadZone.innerHTML = `<div class="upload-content"><p class="error">${msg}</p><button class="btn-primary" id="btn-retry">Intentar de nuevo</button></div>`;
      const btnRetry = uploadZone.querySelector('#btn-retry') as HTMLButtonElement;
      btnRetry?.addEventListener('click', () => location.reload());
    },
  };
};
