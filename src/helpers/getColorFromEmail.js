export const getColorFromEmail = (email) => {
  const colors = [
    "#f44336", "#e91e63", "#9c27b0",
    "#673ab7", "#3f51b5", "#2196f3",
    "#009688", "#4caf50", "#ff9800"
  ];

  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};