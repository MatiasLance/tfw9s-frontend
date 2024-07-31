export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'BMW',
          children: []
        },
        {
          id: 2,
          name: 'Mercedes',
          children: []
        },
        {
          id: 3,
          name: 'Alpha Romeo',
          children: [
            {
              id: 4,
              name: 'Sedan',
              children: [
                {
                  id: 5,
                  name: 'Parts',
                  children: []
                },
                {
                  id: 6,
                  name: 'Engine',
                  children: []
                },
                {
                  id: 7,
                  name: 'Interior',
                  children: []
                }
              ]
            },
            {
              id: 8,
              name: 'Hatch',
              children: [
                {
                  id: 9,
                  name: 'Parts',
                  children: []
                },
                {
                  id: 10,
                  name: 'Engine',
                  children: []
                },
                {
                  id: 11,
                  name: 'Interior',
                  children: []
                }
              ]
            },
            {
              id: 10,
              name: 'Coupe',
              children: [
                {
                  id: 13,
                  name: 'Parts',
                  children: []
                },
                {
                  id: 14,
                  name: 'Engine',
                  children: []
                },
                {
                  id: 15,
                  name: 'Interior',
                  children: []
                }
              ]
            },
            {
              id: 16,
              name: 'Model A',
              children: [
                {
                  id: 17,
                  name: 'Parts',
                  children: []
                },
                {
                  id: 18,
                  name: 'Engine',
                  children: []
                },
                {
                  id: 19,
                  name: 'Interior',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 20,
          name: 'Polishing',
          children: []
        },
        {
          id: 21,
          name: 'Detailing',
          children: []
        },
        {
          id: 22,
          name: 'Tools',
          children: []
        },
        {
          id: 23,
          name: 'Uncategorised',
          children: []
        }
      ]
    }
  },
  methods: {},
}