'use server'


export async function handleSignOut() {
  const response = await fetch(`/api/signOut`, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Sign out failed');
  }
  
  return true; // Return true if sign out is successful
}