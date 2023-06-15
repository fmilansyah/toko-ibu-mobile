export function nominalDiscount(nominal, percentage) {
  if (nominal && percentage && percentage > 0) {
    const totalDiscount = (percentage / 100) * nominal;
    const afterDiscount = nominal - totalDiscount;
    return {
      totalDiscount,
      afterDiscount,
    };
  }
  return {
    totalDiscount: 0,
    afterDiscount: nominal,
  };
}
