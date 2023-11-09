/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';

export async function UpdateIssueById(id: string, status: string, description: string, officeId: string) {
  try {
    const apiUrl = `http://localhost:8080/issue/${id}`;

    const requestBody = {
      status,
      description,
      officeId,
    };
    const response = await axios.put(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Failed to update the issue:', error);
    throw error;
  }
}
