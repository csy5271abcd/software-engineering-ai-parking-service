export function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString()}`;
}

export function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) { return '-'; }
    const yy = d.getFullYear();
    const mo = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    return `${yy}.${mo}.${dd} ${hh}:${mm}`;
  } catch {
    return '-';
  }
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) { return `${m}분`; }
  if (m === 0) { return `${h}시간`; }
  return `${h}시간 ${m}분`;
}

// HH:MM string from ISO timestamp
export function formatHHMM(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

// "오늘 HH:MM" label used in payment screens
export function formatTimeLabel(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `오늘 ${h}:${m}`;
}
