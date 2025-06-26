// Import API Base URL
import { API_BASE_URL } from "../config/config.js";

// Set Doctor API Endpoint
const DOCTOR_API = `${API_BASE_URL}/doctor`;

// Get all doctors
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    if (response.ok) {
      const data = await response.json();
      return data.doctors || [];
    } else {
      console.error('Failed to fetch doctors:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

// Delete a doctor (Admin only)
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Delete failed' };
    }
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return { success: false, message: 'Server error. Please try again later.' };
  }
}

// Save/Add a new doctor (Admin only)
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(doctor)
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Save failed' };
    }
  } catch (error) {
    console.error('Error saving doctor:', error);
    return { success: false, message: 'Server error. Please try again later.' };
  }
}

// Filter doctors by name, time, and specialty
export async function filterDoctors(name, time, specialty) {
  try {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append('name', name);
    if (time) queryParams.append('time', time);
    if (specialty) queryParams.append('specialty', specialty);

    const response = await fetch(`${DOCTOR_API}/filter?${queryParams.toString()}`);

    if (response.ok) {
      const data = await response.json();
      return data.doctors || [];
    } else {
      console.error('Filter request failed:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error filtering doctors:', error);
    return [];
  }
}
