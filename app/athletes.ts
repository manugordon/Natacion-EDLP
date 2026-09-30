export type SwimEvent = { distance: number; stroke: string; eventNumber: number; seedTime: string; date?: string; time?: string; heat?: number; lane?: number; result?: string; position?: number; status?: string; medal?: string };
export type Athlete = { id: string; name: string; age: number; category: string; team: string; events: SwimEvent[] };
export const athletes: Athlete[] = [
  {
    "id": "nadador-1",
    "name": "María De La Paz Gibert",
    "age": 55,
    "category": "55–59",
    "team": "EDELP",
    "events": [
      {
        "distance": 400,
        "stroke": "Combinados",
        "eventNumber": 3,
        "seedTime": "7:55.00"
      },
      {
        "distance": 200,
        "stroke": "Espalda",
        "eventNumber": 9,
        "seedTime": "3:50.00"
      },
      {
        "distance": 200,
        "stroke": "Combinados",
        "eventNumber": 17,
        "seedTime": "3:50.00"
      },
      {
        "distance": 100,
        "stroke": "Espalda",
        "eventNumber": 29,
        "seedTime": "1:50.00"
      }
    ]
  },
  {
    "id": "nadador-2",
    "name": "Evangelina Julia Montero Labat",
    "age": 58,
    "category": "55–59",
    "team": "EDELP",
    "events": [
      {
        "distance": 800,
        "stroke": "Libre",
        "eventNumber": 1,
        "seedTime": "13:39.65"
      },
      {
        "distance": 200,
        "stroke": "Libre",
        "eventNumber": 5,
        "seedTime": "3:11.74"
      },
      {
        "distance": 200,
        "stroke": "Pecho",
        "eventNumber": 27,
        "seedTime": "3:51.32"
      },
      {
        "distance": 400,
        "stroke": "Libre",
        "eventNumber": 35,
        "seedTime": "6:36.07"
      },
      {
        "distance": 100,
        "stroke": "Pecho",
        "eventNumber": 37,
        "seedTime": "1:48.88"
      }
    ]
  },
  {
    "id": "nadador-3",
    "name": "César Damián Vigo",
    "age": 58,
    "category": "55–59",
    "team": "EDELP",
    "events": [
      {
        "distance": 800,
        "stroke": "Libre",
        "eventNumber": 2,
        "seedTime": "11:20.00"
      },
      {
        "distance": 200,
        "stroke": "Libre",
        "eventNumber": 6,
        "seedTime": "2:20.00"
      },
      {
        "distance": 400,
        "stroke": "Libre",
        "eventNumber": 36,
        "seedTime": "5:18.00"
      }
    ]
  },
  {
    "id": "nadador-4",
    "name": "María Victoria Spacapan",
    "age": 41,
    "category": "40–44",
    "team": "EDELP",
    "events": [
      {
        "distance": 200,
        "stroke": "Libre",
        "eventNumber": 5,
        "seedTime": "3:25.00"
      },
      {
        "distance": 100,
        "stroke": "Libre",
        "eventNumber": 11,
        "seedTime": "1:34.32"
      },
      {
        "distance": 50,
        "stroke": "Libre",
        "eventNumber": 15,
        "seedTime": "41.73"
      },
      {
        "distance": 400,
        "stroke": "Libre",
        "eventNumber": 35,
        "seedTime": "7:14.00"
      }
    ]
  },
  {
    "id": "nadador-5",
    "name": "Pedro Manuel Bin",
    "age": 42,
    "category": "40–44",
    "team": "EDELP",
    "events": [
      {
        "distance": 50,
        "stroke": "Mariposa",
        "eventNumber": 8,
        "seedTime": "27.02"
      },
      {
        "distance": 100,
        "stroke": "Libre",
        "eventNumber": 12,
        "seedTime": "56.80"
      },
      {
        "distance": 50,
        "stroke": "Libre",
        "eventNumber": 16,
        "seedTime": "25.22"
      },
      {
        "distance": 100,
        "stroke": "Mariposa",
        "eventNumber": 20,
        "seedTime": "1:04.00"
      }
    ]
  },
  {
    "id": "nadador-6",
    "name": "Yanina Leila Picchio",
    "age": 56,
    "category": "55–59",
    "team": "EDELP",
    "events": [
      {
        "distance": 50,
        "stroke": "Pecho",
        "eventNumber": 13,
        "seedTime": "1:00.00"
      },
      {
        "distance": 100,
        "stroke": "Pecho",
        "eventNumber": 37,
        "seedTime": "2:40.00"
      }
    ]
  },
  {
    "id": "nadador-7",
    "name": "Diego Martín Prol",
    "age": 62,
    "category": "60–64",
    "team": "EDELP",
    "events": [
      {
        "distance": 50,
        "stroke": "Pecho",
        "eventNumber": 14,
        "seedTime": "48.94"
      },
      {
        "distance": 50,
        "stroke": "Libre",
        "eventNumber": 16,
        "seedTime": "38.55"
      },
      {
        "distance": 50,
        "stroke": "Espalda",
        "eventNumber": 34,
        "seedTime": "40.25"
      }
    ]
  },
  {
    "id": "nadador-8",
    "name": "Marcela Luciana Tobes",
    "age": 39,
    "category": "35–39",
    "team": "EDELP",
    "events": [
      {
        "distance": 50,
        "stroke": "Libre",
        "eventNumber": 15,
        "seedTime": "32.91"
      },
      {
        "distance": 200,
        "stroke": "Combinados",
        "eventNumber": 17,
        "seedTime": "3:20.13"
      }
    ]
  }
];
