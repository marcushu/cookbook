export interface Recipe {
    name: string
    owner: string
    description: string
    ingredients: string[]
    instructions: string
    breakfast: boolean
    lunch: boolean
    dinner: boolean
    glutenFree: boolean
    vegan: boolean
    vegetarian: boolean
    imageUrl: string
  }

  export interface ShoppinglistIngredient {
    ingredient: string
    recipe: string // optional to allow a user to add ingredients w/out a recipe
    /** used if the user wants the ingredients listed in a particular order */
    order?: number
  }

  export type IngredientSortPolicy = 'recipe' | 'sorting'

  export interface UserState {
    userName: string
    orderIngredientsBy: IngredientSortPolicy
    /** recipes created by this user. These exist in a different db collection
     * and need to be loaded separately. */
    recipes: Recipe[]
    favorites: Recipe[]
    shoppingList: ShoppinglistIngredient[]
  }