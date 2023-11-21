/* eslint-disable react/jsx-filename-extension */
import HTTP from 'src/api';
import Backend from 'src/api/BackendConfig/BackendConfig';
export async function UpdateIssueById(id: string, status: string, description: string, officeId: string) {
  try {
    const apiUrl = `${Backend.backendURL}issue/${id}`;

    const requestBody = {
      status,
      description,
      officeId,
    };
    const response = await HTTP.put(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating the issue:', error);
    throw error;
  }
}
