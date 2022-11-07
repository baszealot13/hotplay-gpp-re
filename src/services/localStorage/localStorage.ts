export const getUser = (): string | null => {
  return localStorage.getItem('user');
}