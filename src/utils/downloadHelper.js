/**
 * Robust Cross-Browser & Mobile Resume Download Utility
 * Handles Base64 Data URIs, Supabase Storage Public URLs, and Local File Paths.
 */

export async function downloadResumePdf(
  resumeUrl,
  fileName = 'Pittala_Manogna_Resume.pdf',
  onMessage = null
) {
  const targetFileName = fileName || 'Pittala_Manogna_Resume.pdf';

  if (!resumeUrl || resumeUrl.trim() === '') {
    const errorMsg = 'No resume PDF is currently available to download. Please upload one via the Admin Dashboard.';
    if (typeof onMessage === 'function') {
      onMessage(errorMsg, 'info');
    } else {
      alert(errorMsg);
    }
    return false;
  }

  try {
    // 1. If it's a Base64 data URL
    if (resumeUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = targetFileName;
      link.target = '_self';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 250);

      if (typeof onMessage === 'function') {
        onMessage(`Downloading ${targetFileName}...`, 'success');
      }
      return true;
    }

    // 2. If it's a remote URL (Supabase Storage / local file path)
    // Fetch as blob to force a real file download rather than browser tab preview
    try {
      const res = await fetch(resumeUrl, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = targetFileName;
        link.target = '_self';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 600);

        if (typeof onMessage === 'function') {
          onMessage(`Downloading ${targetFileName}...`, 'success');
        }
        return true;
      }
    } catch (fetchErr) {
      console.warn('Blob fetch failed (likely cross-origin), falling back to anchor download:', fetchErr);
    }

    // 3. Fallback direct anchor click
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = targetFileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 250);

    if (typeof onMessage === 'function') {
      onMessage(`Opening ${targetFileName}...`, 'success');
    }
    return true;

  } catch (err) {
    console.error('Download resume error:', err);
    if (typeof onMessage === 'function') {
      onMessage('Failed to download resume. Opening in a new window instead.', 'error');
    }
    window.open(resumeUrl, '_blank');
    return false;
  }
}

