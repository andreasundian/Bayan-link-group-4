const API_URL = '/api';

export const api = {
  municipalities: {
    browse: () => fetch(`${API_URL}/municipalities`).then(res => res.json()),
    read: (id: string) => fetch(`${API_URL}/municipalities/${id}`).then(res => res.json()),
    add: (data: any) => fetch(`${API_URL}/municipalities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    edit: (id: string, data: any) => fetch(`${API_URL}/municipalities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_URL}/municipalities/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()),
  },
  newsFeeds: {
    browse: () => fetch(`${API_URL}/news-feeds`).then(res => res.json()),
    read: (id: string) => fetch(`${API_URL}/news-feeds/${id}`).then(res => res.json()),
    add: (data: any) => fetch(`${API_URL}/news-feeds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    edit: (id: string, data: any) => fetch(`${API_URL}/news-feeds/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_URL}/news-feeds/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()),
  },
  services: {
    browse: () => fetch(`${API_URL}/services`).then(res => res.json()),
    read: (id: string) => fetch(`${API_URL}/services/${id}`).then(res => res.json()),
    add: (data: any) => fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    edit: (id: string, data: any) => fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()),
  }
};
