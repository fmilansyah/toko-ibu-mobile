// Membuat format rupiah
export function rupiahFormatter(nominal) {
  if (nominal !== null && nominal !== undefined) {
    nominal = String(nominal);
    let formatted = nominal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return 'Rp. ' + formatted;
  } else {
    return '-';
  }
}
