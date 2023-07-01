export const countries = [
  {
    name: 'Argentina',
    code: 'ARG',
  },
  {
    name: 'Belice',
    code: 'BLZ',
  },
  {
    name: 'Bolivia',
    code: 'BOL',
  },
  {
    name: 'Chile',
    code: 'CHL',
  },
  {
    name: 'Colombia',
    code: 'COL',
  },
  {
    name: 'Costa Rica',
    code: 'CRI',
  },
  {
    name: 'Cuba',
    code: 'CUB',
  },
  {
    name: 'Ecuador',
    code: 'ECU',
  },
  {
    name: 'El Salvador',
    code: 'SLV',
  },
  {
    name: 'España',
    code: 'ESP',
  },
  {
    name: 'Guatemala',
    code: 'GTM',
  },
  {
    name: 'Honduras',
    code: 'HND',
  },
  {
    name: 'Mexico',
    code: 'MEX',
  },
  {
    name: 'Nicaragua',
    code: 'NIC',
  },
  {
    name: 'Panamá',
    code: 'PAN',
  },
  {
    name: 'Paraguay',
    code: 'PRY',
  },
  {
    name: 'Peru',
    code: 'PER',
  },
  {
    name: 'Puerto Rico',
    code: 'PRI',
  },
  {
    name: 'Republica Dominicana',
    code: 'DOM',
  },
  {
    name: 'Uruguay',
    code: 'URY',
  },
  {
    name: 'Venezuela',
    code: 'VEN',
  },
];

export const getCountryById = (id: string) => {
  return countries.find((c) => c.code === id);
};
