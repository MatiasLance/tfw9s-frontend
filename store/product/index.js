// store/product/index.js

export const state = () => ({
  name: '',
  price: '',
  description: '',
  categories: [],
  inStock: '',
  tags: [],
  tagData: [],
  photo: '',
  variants: [
    {
      name: 'Size',
      elements: [
        {
          name: 'Small',
          photo: null,
          price: 0,
          isTicked: true
        },
        {
          name: 'Medium',
          photo: null,
          price: 0,
          isTicked: true
        },
        {
          name: 'Large',
          photo: null,
          price: 0,
          isTicked: false
        }
      ]
    },
    {
      name: 'Color',
      elements: [
        {
          name: 'Black',
          photo: {
            type: 'color',
            value: '#000'
          },
          price: 0,
          isTicked: true
        },
        {
          name: 'Red White w/ Stripes',
          photo: {
            type: 'image',
            value: null
          },
          price: 0,
          isTicked: true
        },
        {
          name: 'Blue',
          photo: {
            type: 'image',
            value: null
          },
          price: 0,
          isTicked: true
        },
        {
          name: 'Brown',
          photo: {
            type: 'color',
            value: '#b4844b'
          },
          price: 0,
          isTicked: false
        }
      ]
    }
  ]
})

export const mutations = {
  addVariants(state, variants) {
    state.variants.push(Object.assign({}, variants))
  },
  removeVariants(state, { index }) {
    state.variants.splice(index, 1)
  },
  setVariants(state, variants) {
    state.variants = variants
  },
  addElements(state, elements) {
    state.variants.elements.push(Object.assign({}, elements))
  },
  setElements(state, elements) {
    state.variants.elements = elements
  },
  addCategory(state, categories) {
    state.categories.push(Object.assign({}, categories))
  },
  removeCategory(state, { index }) {
    state.categories.splice(index, 1)
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  addTags(state, tags) {
    state.tags.push(Object.assign({}, tags))
  },
  removeTags(state, { index }) {
    state.tags.splice(index, 1)
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setTagData(state, tagData) {
    state.tagData = tagData
  },
  setName(state, name) {
    state.name = name
  },
  setPrice(state, price) {
    state.price = price
  },
  setDescription(state, description) {
    state.description = description
  },
  setInStock(state, inStock) {
    state.inStock = inStock
  },
  setPhoto(state, photo) {
    state.photo = photo
  },
}

export const actions = {
  setProduct({ commit }, product) {
    commit('setName', product.name)
    commit('setPrice', product.price)
    commit('setDescription', product.description)
    commit('setInStock', product.inStock)
    commit('setCategories', product.categories)
    commit('setTags', product.tags)
    commit('setPhoto', product.photo)
    commit('setVariants', product.variants)
  },
  clearProduct({ commit }) {
    commit('setName', '')
    commit('setPrice', '')
    commit('setDescription', '')
    commit('setInStock', '')
    commit('setTags', [])
    commit('setPhoto', '')
    commit('setVariants', [])
  }
}