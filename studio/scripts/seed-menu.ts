/**
 * Tonio's Seafood Shack & Tiki Bar — Sanity menu seed script
 *
 * Usage (from studio/ directory):
 *   npx sanity@latest exec scripts/seed-menu.ts --with-user-token
 *
 * Safety: uses createIfNotExists() — never overwrites an existing document.
 * Descriptions match the website HTML source files exactly (not invented).
 * Prices are not present in any HTML source file — price fields are omitted.
 * sortOrder values reflect display order on the live website.
 *
 * ⚠️  "Tinio's Tiki Punch" appears as-is in menu-drinks.html line 183.
 *     Likely a typo for "Tonio's". Kept verbatim pending owner confirmation.
 *
 * ⚠️  Breakfast, Drinks, and Happy Hour content was authored during the
 *     website build — NOT sourced from a printed owner-provided menu.
 *     Obtain owner approval before treating those items as authoritative.
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3laoz40d',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

// ─── MENU CATEGORIES ────────────────────────────────────────────────────────
// sortOrder: position among categories on that menu page

const categories = [
  // Lunch
  { _id: 'cat-lunch-appetizers',   name: 'Appetizers',                  sortOrder: 10, menuPage: 'lunch' },
  { _id: 'cat-lunch-sandwiches',   name: 'Sandwiches',                  sortOrder: 20, menuPage: 'lunch' },
  // Dinner
  { _id: 'cat-dinner-soups',       name: 'Soups & Salads',              sortOrder: 10, menuPage: 'dinner' },
  { _id: 'cat-dinner-pasta',       name: 'Pasta',                       sortOrder: 20, menuPage: 'dinner' },
  { _id: 'cat-dinner-sea',         name: 'From the Sea',                sortOrder: 30, menuPage: 'dinner' },
  { _id: 'cat-dinner-land',        name: 'From the Land',               sortOrder: 40, menuPage: 'dinner' },
  { _id: 'cat-dinner-sides',       name: 'Sides',                       sortOrder: 50, menuPage: 'dinner' },
  { _id: 'cat-dinner-desserts',    name: 'Desserts',                    sortOrder: 60, menuPage: 'dinner' },
  // Breakfast
  { _id: 'cat-brk-eggs',          name: 'Eggs & Plates',               sortOrder: 10, menuPage: 'breakfast' },
  { _id: 'cat-brk-sweets',        name: 'Morning Sweets',              sortOrder: 20, menuPage: 'breakfast' },
  { _id: 'cat-brk-sandwiches',    name: 'Morning Sandwiches & Wraps',  sortOrder: 30, menuPage: 'breakfast' },
  { _id: 'cat-brk-sides',         name: 'Starters & Sides',           sortOrder: 40, menuPage: 'breakfast' },
  { _id: 'cat-brk-drinks',        name: 'Brunch Drinks',               sortOrder: 50, menuPage: 'breakfast' },
  // Drinks
  { _id: 'cat-drinks-cocktails',   name: 'Signature Cocktails',         sortOrder: 10, menuPage: 'drinks' },
  { _id: 'cat-drinks-beer',        name: 'Beer',                        sortOrder: 20, menuPage: 'drinks' },
  { _id: 'cat-drinks-wine',        name: 'Wine & Spirit-Free',          sortOrder: 30, menuPage: 'drinks' },
  { _id: 'cat-drinks-na',          name: 'Non-Alcoholic',               sortOrder: 40, menuPage: 'drinks' },
  // Happy Hour
  { _id: 'cat-hh-drinks',          name: 'Happy Hour Drinks',           sortOrder: 10, menuPage: 'happy-hour' },
  { _id: 'cat-hh-food',            name: 'Happy Hour Food',             sortOrder: 20, menuPage: 'happy-hour' },
]

// ─── MENU ITEMS ──────────────────────────────────────────────────────────────
// Descriptions are copied verbatim from source HTML.
// Items with no description in HTML have no description field here.
// Price fields are omitted — no dollar prices exist in any HTML source file.
// Market-price items use labels: ['Market Price'] + description from HTML.

type MenuItem = {
  _id: string
  categoryId: string
  sortOrder: number
  name: string
  description?: string
  labels?: string[]
}

const items: MenuItem[] = [

  // ══════════════════════════════════════════════════════════════
  // LUNCH — Appetizers   (source: menu-lunch.html)
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-lunch-conch-fritters',          categoryId: 'cat-lunch-appetizers', sortOrder: 10,  name: 'Conch Fritters' },
  { _id: 'item-lunch-wings',                   categoryId: 'cat-lunch-appetizers', sortOrder: 20,  name: 'Wings (8)',                          description: 'Mild, hot, cajun sauce, BBQ or teriyaki' },
  { _id: 'item-lunch-bang-bang-shrimp',        categoryId: 'cat-lunch-appetizers', sortOrder: 30,  name: 'Bang Bang Shrimp' },
  { _id: 'item-lunch-french-fries',            categoryId: 'cat-lunch-appetizers', sortOrder: 40,  name: 'French Fries' },
  { _id: 'item-lunch-tuna-tower',              categoryId: 'cat-lunch-appetizers', sortOrder: 50,  name: 'Tuna Tower' },
  { _id: 'item-lunch-chicken-fingers',         categoryId: 'cat-lunch-appetizers', sortOrder: 60,  name: 'Chicken Fingers' },
  { _id: 'item-lunch-scallops',                categoryId: 'cat-lunch-appetizers', sortOrder: 70,  name: 'Scallops',                            description: 'Horseradish bacon sauce' },
  { _id: 'item-lunch-fish-dip',                categoryId: 'cat-lunch-appetizers', sortOrder: 80,  name: 'Fish Dip & Homemade Chips' },
  { _id: 'item-lunch-calamari',                categoryId: 'cat-lunch-appetizers', sortOrder: 90,  name: 'Fried Calamari',                      description: 'Side marinara' },
  { _id: 'item-lunch-stuffed-mushrooms',       categoryId: 'cat-lunch-appetizers', sortOrder: 100, name: 'Stuffed Mushrooms',                   description: 'With crabmeat' },
  { _id: 'item-lunch-wasabi-tuna',             categoryId: 'cat-lunch-appetizers', sortOrder: 110, name: 'Wasabi Tuna' },
  { _id: 'item-lunch-fried-mozz',              categoryId: 'cat-lunch-appetizers', sortOrder: 120, name: 'Fried Mozzarella' },
  { _id: 'item-lunch-escargots',               categoryId: 'cat-lunch-appetizers', sortOrder: 130, name: 'Escargots',                           description: 'Pesto sauce' },
  { _id: 'item-lunch-onion-rings',             categoryId: 'cat-lunch-appetizers', sortOrder: 140, name: 'Onion Rings' },
  { _id: 'item-lunch-lamb-chop',               categoryId: 'cat-lunch-appetizers', sortOrder: 150, name: 'Lamb Chop Lollipops' },
  { _id: 'item-lunch-ceviche',                 categoryId: 'cat-lunch-appetizers', sortOrder: 160, name: 'Homemade Shrimp & Mahi Ceviche' },
  { _id: 'item-lunch-baby-clams',              categoryId: 'cat-lunch-appetizers', sortOrder: 170, name: 'Baby Clams',                          description: 'Lemon garlic white wine sauce' },
  { _id: 'item-lunch-mussels',                 categoryId: 'cat-lunch-appetizers', sortOrder: 180, name: 'Mussels',                             description: 'Marinara, lemon garlic white wine or fra diavolo' },

  // ══════════════════════════════════════════════════════════════
  // LUNCH — Sandwiches   (source: menu-lunch.html)
  // Section note "All sandwiches served with French fries" is NOT an item description.
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-lunch-angus-burger',            categoryId: 'cat-lunch-sandwiches', sortOrder: 10,  name: 'Angus Beef Cheeseburger',             description: 'Cheese, lettuce, tomato' },
  { _id: 'item-lunch-tonios-burger',           categoryId: 'cat-lunch-sandwiches', sortOrder: 20,  name: "Tonio's Burger",                      description: 'Lettuce, tomato, bacon, blue cheese crumbles & avocado' },
  { _id: 'item-lunch-big-joes-blt',            categoryId: 'cat-lunch-sandwiches', sortOrder: 30,  name: "Big Joe's BLT Chicken",               description: 'Grilled chicken, bacon, lettuce, tomato, avocado & ranch' },
  { _id: 'item-lunch-grilled-chicken',         categoryId: 'cat-lunch-sandwiches', sortOrder: 40,  name: 'Grilled Chicken',                     description: 'Cheese, lettuce, tomato, onion' },
  { _id: 'item-lunch-buffalo-wrap',            categoryId: 'cat-lunch-sandwiches', sortOrder: 50,  name: 'Buffalo Chicken Wrap',                description: 'Grilled chicken, lettuce & tomato' },
  { _id: 'item-lunch-chicken-parm-sand',       categoryId: 'cat-lunch-sandwiches', sortOrder: 60,  name: 'Chicken or Meatball Parm',            description: 'Mozzarella cheese & marinara' },
  { _id: 'item-lunch-philly',                  categoryId: 'cat-lunch-sandwiches', sortOrder: 70,  name: 'Philly Cheesesteak',                  description: 'Mushrooms, onions and/or peppers extra' },
  { _id: 'item-lunch-pulled-pork',             categoryId: 'cat-lunch-sandwiches', sortOrder: 80,  name: 'Pulled Pork',                         description: 'Provolone' },
  { _id: 'item-lunch-cuban',                   categoryId: 'cat-lunch-sandwiches', sortOrder: 90,  name: 'Cuban',                               description: 'Ham, pork, mustard, pickle & Swiss cheese' },
  { _id: 'item-lunch-french-dip',              categoryId: 'cat-lunch-sandwiches', sortOrder: 100, name: 'French Dip',                          description: 'Provolone, side of au jus & side horseradish sauce' },
  { _id: 'item-lunch-fried-lobster-tail',      categoryId: 'cat-lunch-sandwiches', sortOrder: 110, name: 'Fried Lobster Tail',                  description: '7 oz fried tail, lettuce, tomato & spicy remoulade', labels: ['Market Price'] },
  { _id: 'item-lunch-quesadilla',              categoryId: 'cat-lunch-sandwiches', sortOrder: 120, name: 'Cheesesteak or Chicken Quesadilla',   description: 'Flour tortilla with onions & green peppers' },
  { _id: 'item-lunch-tacos',                   categoryId: 'cat-lunch-sandwiches', sortOrder: 130, name: 'Tacos (3) — Chicken, Shrimp or Mahi', description: 'Grilled, blackened or fried. Flour tortilla with cheese, lettuce & cilantro. Sour cream & salsa on the side.' },
  { _id: 'item-lunch-gyro',                    categoryId: 'cat-lunch-sandwiches', sortOrder: 140, name: 'Gyro',                                description: 'Lamb or chicken. Lettuce, tomato, onion & tzatziki sauce' },
  { _id: 'item-lunch-sloppy-joe',              categoryId: 'cat-lunch-sandwiches', sortOrder: 150, name: 'Sloppy Joe',                          description: 'Toasted bun' },
  { _id: 'item-lunch-ham-grinder',             categoryId: 'cat-lunch-sandwiches', sortOrder: 160, name: 'Ham & Cheese Grinder',                description: 'Provolone, lettuce, tomato & onion' },
  { _id: 'item-lunch-hogfish-sand',            categoryId: 'cat-lunch-sandwiches', sortOrder: 170, name: 'Hogfish',                             description: 'Grilled, blackened or fried with lettuce, tomato & spicy remoulade' },
  { _id: 'item-lunch-snapper-mahi-sand',       categoryId: 'cat-lunch-sandwiches', sortOrder: 180, name: 'Snapper or Mahi',                     description: 'Grilled, blackened or fried with lettuce & tomato' },
  { _id: 'item-lunch-grouper-sand',            categoryId: 'cat-lunch-sandwiches', sortOrder: 190, name: 'Grouper',                             description: 'Grilled, blackened or fried with lettuce & tomato' },
  { _id: 'item-lunch-shrimp-avocado-wrap',     categoryId: 'cat-lunch-sandwiches', sortOrder: 200, name: 'Fried Shrimp & Avocado BLT Wrap',     description: 'Bacon, lettuce, tomato & spicy remoulade' },
  { _id: 'item-lunch-crabcake-grilled-cheese', categoryId: 'cat-lunch-sandwiches', sortOrder: 210, name: 'Crabcake Grilled Cheese',             description: 'American cheese' },
  { _id: 'item-lunch-crabcake-sand',           categoryId: 'cat-lunch-sandwiches', sortOrder: 220, name: 'Fried Crabcake Sandwich',             description: 'Lettuce & tomato' },
  { _id: 'item-lunch-lobster-roll',            categoryId: 'cat-lunch-sandwiches', sortOrder: 230, name: "Kimmio's Famous Lobster Roll",        description: 'Lettuce & tomato', labels: ['Market Price'] },
  { _id: 'item-lunch-lobster-reuben',          categoryId: 'cat-lunch-sandwiches', sortOrder: 240, name: 'Lobster Reuben',                      description: 'Swiss cheese, sauerkraut & 1,000 Island dressing', labels: ['Market Price'] },

  // ══════════════════════════════════════════════════════════════
  // DINNER — Soups & Salads   (source: menu-dinner.html)
  // Section note: "Add grilled, blackened or fried Mahi, Shrimp, Chicken or Crabmeat to any salad."
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-din-chowder',                   categoryId: 'cat-dinner-soups', sortOrder: 10,  name: 'Conch Soup or New England Clam Chowder', description: 'Cup or bowl' },
  { _id: 'item-din-soup-day',                  categoryId: 'cat-dinner-soups', sortOrder: 20,  name: 'Soup of the Day',                         description: 'When available — ask your server' },
  { _id: 'item-din-house-salad',               categoryId: 'cat-dinner-soups', sortOrder: 30,  name: 'House Salad',                             description: 'Lettuce, tomatoes, onions & green peppers' },
  { _id: 'item-din-caesar',                    categoryId: 'cat-dinner-soups', sortOrder: 40,  name: 'Caesar Salad',                            description: 'Romaine, parmesan, croutons & Caesar dressing' },
  { _id: 'item-din-spinach',                   categoryId: 'cat-dinner-soups', sortOrder: 50,  name: 'Spinach Salad',                           description: 'Baby spinach, tomatoes, onions, mozzarella & ranch dressing' },
  { _id: 'item-din-wedge',                     categoryId: 'cat-dinner-soups', sortOrder: 60,  name: 'Wedge Salad',                             description: 'Iceberg lettuce, tomatoes, onions, bacon, blue cheese crumbles & blue cheese dressing' },
  { _id: 'item-din-cobb',                      categoryId: 'cat-dinner-soups', sortOrder: 70,  name: 'Cobb Salad',                              description: 'Lettuce, tomatoes, blue cheese crumbles, bacon & avocado' },
  { _id: 'item-din-caprese',                   categoryId: 'cat-dinner-soups', sortOrder: 80,  name: 'Caprese Salad',                           description: 'Tomatoes, fresh mozzarella, black olives, fresh basil & balsamic dressing' },
  { _id: 'item-din-greek',                     categoryId: 'cat-dinner-soups', sortOrder: 90,  name: 'Greek Salad',                             description: 'Lettuce, tomatoes, onions, cucumber, kalamata olives, feta cheese, roasted red peppers, artichokes, pita bread & homemade red wine vinaigrette' },

  // ══════════════════════════════════════════════════════════════
  // DINNER — Pasta   (source: menu-dinner.html)
  // Section note: "Choice of sauce: Red (marinara), White (lemon garlic white wine butter) or Fra Diavolo (spicy red)."
  // Items with no HTML description have no description field here.
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-din-chicken-parm',              categoryId: 'cat-dinner-pasta', sortOrder: 10,  name: 'Chicken Parm',                            description: 'Side is linguini' },
  { _id: 'item-din-linguini-chicken',          categoryId: 'cat-dinner-pasta', sortOrder: 20,  name: 'Linguini & Chicken' },
  { _id: 'item-din-linguini-mussels',          categoryId: 'cat-dinner-pasta', sortOrder: 30,  name: 'Linguini & Mussels' },
  { _id: 'item-din-linguini-shrimp',           categoryId: 'cat-dinner-pasta', sortOrder: 40,  name: 'Linguini & Shrimp' },
  { _id: 'item-din-linguini-crabmeat',         categoryId: 'cat-dinner-pasta', sortOrder: 50,  name: 'Linguini & Jumbo Lump Crabmeat',          description: 'Market price', labels: ['Market Price'] },
  { _id: 'item-din-pescatore',                 categoryId: 'cat-dinner-pasta', sortOrder: 60,  name: "Tonio's Pescatore",                        description: 'Shrimp, scallops, mussels & clams' },
  { _id: 'item-din-shrimp-scallops-rosa',      categoryId: 'cat-dinner-pasta', sortOrder: 70,  name: 'Shrimp & Scallops Rosa',                  description: 'Marinara mixed with heavy cream' },
  { _id: 'item-din-lasagna',                   categoryId: 'cat-dinner-pasta', sortOrder: 80,  name: 'Meat Lasagna',                            description: 'No side included' },
  { _id: 'item-din-linguini-clams',            categoryId: 'cat-dinner-pasta', sortOrder: 90,  name: 'Linguini & Clams' },
  { _id: 'item-din-linguini-calamari',         categoryId: 'cat-dinner-pasta', sortOrder: 100, name: 'Linguini & Calamari' },
  { _id: 'item-din-linguini-scallops',         categoryId: 'cat-dinner-pasta', sortOrder: 110, name: 'Linguini & Scallops' },

  // ══════════════════════════════════════════════════════════════
  // DINNER — From the Sea   (source: menu-dinner.html)
  // Section note: "All entrées served with choice of one side & cole slaw. Broiled, blackened or fried."
  // Items with no HTML description have no description field here.
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-din-shrimp',                    categoryId: 'cat-dinner-sea', sortOrder: 10,  name: 'Shrimp' },
  { _id: 'item-din-scallops-ent',              categoryId: 'cat-dinner-sea', sortOrder: 20,  name: 'Scallops' },
  { _id: 'item-din-crabcakes',                 categoryId: 'cat-dinner-sea', sortOrder: 30,  name: 'Crabcakes (2)' },
  { _id: 'item-din-crabcake-shrimp',           categoryId: 'cat-dinner-sea', sortOrder: 40,  name: 'Crabcake & Shrimp' },
  { _id: 'item-din-crabcake-scallops',         categoryId: 'cat-dinner-sea', sortOrder: 50,  name: 'Crabcake & Scallops' },
  { _id: 'item-din-shrimp-scallops',           categoryId: 'cat-dinner-sea', sortOrder: 60,  name: 'Shrimp & Scallops' },
  { _id: 'item-din-coconut-shrimp',            categoryId: 'cat-dinner-sea', sortOrder: 70,  name: 'Coconut Shrimp' },
  { _id: 'item-din-hogfish-topped',            categoryId: 'cat-dinner-sea', sortOrder: 80,  name: 'Hogfish Topped with Tomato & Crabmeat',    description: 'Lemon garlic white wine butter sauce' },
  { _id: 'item-din-stuffed-hogfish',           categoryId: 'cat-dinner-sea', sortOrder: 90,  name: 'Stuffed Hogfish',                          description: 'With crabmeat' },
  { _id: 'item-din-combo',                     categoryId: 'cat-dinner-sea', sortOrder: 100, name: "Tonio's Combo",                             description: 'Shrimp, scallops, crabcake & mahi' },
  { _id: 'item-din-ahi-tuna',                  categoryId: 'cat-dinner-sea', sortOrder: 110, name: 'Ahi Tuna' },
  { _id: 'item-din-mahi',                      categoryId: 'cat-dinner-sea', sortOrder: 120, name: 'Mahi Mahi',                                description: 'Market price',            labels: ['Market Price'] },
  { _id: 'item-din-snapper',                   categoryId: 'cat-dinner-sea', sortOrder: 130, name: 'Snapper of the Day',                       description: 'Market price',            labels: ['Market Price'] },
  { _id: 'item-din-hogfish',                   categoryId: 'cat-dinner-sea', sortOrder: 140, name: 'Hogfish',                                  description: 'Market price',            labels: ['Market Price'] },
  { _id: 'item-din-grouper',                   categoryId: 'cat-dinner-sea', sortOrder: 150, name: 'Grouper',                                  description: 'Seasonal — market price', labels: ['Market Price'] },
  { _id: 'item-din-fish-chips',                categoryId: 'cat-dinner-sea', sortOrder: 160, name: 'Fish & Chips (2 pieces)' },
  { _id: 'item-din-lobster-tail',              categoryId: 'cat-dinner-sea', sortOrder: 170, name: 'Lobster Tail',                             description: 'Market price',            labels: ['Market Price'] },
  { _id: 'item-din-stuffed-lobster',           categoryId: 'cat-dinner-sea', sortOrder: 180, name: 'Stuffed Lobster Tail',                     description: 'Market price',            labels: ['Market Price'] },
  { _id: 'item-din-two-lobster',               categoryId: 'cat-dinner-sea', sortOrder: 190, name: 'Two Lobster Tails',                        description: 'Market price',            labels: ['Market Price'] },

  // ══════════════════════════════════════════════════════════════
  // DINNER — From the Land   (source: menu-dinner.html)
  // Section note: "All entrées served with choice of one side & cole slaw."
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-din-pork-rice',                 categoryId: 'cat-dinner-land', sortOrder: 10, name: "Jr's Pork & Rice",                          description: 'Side is rice' },
  { _id: 'item-din-ny-strip',                  categoryId: 'cat-dinner-land', sortOrder: 20, name: 'NY Strip' },
  { _id: 'item-din-ribeye-blue',               categoryId: 'cat-dinner-land', sortOrder: 30, name: 'Ribeye with Blue Cheese & Crabmeat' },
  { _id: 'item-din-ribeye-16',                 categoryId: 'cat-dinner-land', sortOrder: 40, name: 'Ribeye (16 oz)' },

  // ══════════════════════════════════════════════════════════════
  // DINNER — Sides   (source: menu-dinner.html)
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-din-side-fries',                categoryId: 'cat-dinner-sides', sortOrder: 10, name: 'French Fries' },
  { _id: 'item-din-side-potato-salad',         categoryId: 'cat-dinner-sides', sortOrder: 20, name: 'Potato Salad' },
  { _id: 'item-din-side-rice',                 categoryId: 'cat-dinner-sides', sortOrder: 30, name: 'Saffron Rice' },
  { _id: 'item-din-side-mashed',               categoryId: 'cat-dinner-sides', sortOrder: 40, name: 'Mashed Potatoes' },
  { _id: 'item-din-side-veggie',               categoryId: 'cat-dinner-sides', sortOrder: 50, name: 'Veggie of the Day' },
  { _id: 'item-din-side-salad',                categoryId: 'cat-dinner-sides', sortOrder: 60, name: 'Side Salad',                              description: 'Substitute upcharge' },

  // ══════════════════════════════════════════════════════════════
  // DINNER — Desserts   (source: menu-dinner.html)
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-din-key-lime',                  categoryId: 'cat-dinner-desserts', sortOrder: 10, name: 'Key Lime Pie',    description: 'House-made, Graham cracker crust, torched meringue. This is the one.' },
  { _id: 'item-din-coconut-flan',              categoryId: 'cat-dinner-desserts', sortOrder: 20, name: 'Coconut Flan',    description: 'Creamy coconut custard with a dark caramel top and toasted coconut.' },

  // ══════════════════════════════════════════════════════════════
  // BREAKFAST — Eggs & Plates   (source: menu-breakfast.html)
  // ⚠️ Owner approval required — not from a printed menu
  // Section note: "Served with toast, grits or home fries unless noted."
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-brk-dock-breakfast',            categoryId: 'cat-brk-eggs', sortOrder: 10,  name: 'Dock Breakfast',                            description: 'Two eggs any style, choice of smoked fish hash or country sausage, grits and toast. The daily staple.' },
  { _id: 'item-brk-shrimp-grits',              categoryId: 'cat-brk-eggs', sortOrder: 20,  name: 'Shrimp & Grits',                            description: 'Key West pink shrimp sautéed in garlic butter and Old Bay over stone-ground white grits. Finished with scallions and a splash of hot sauce.' },
  { _id: 'item-brk-grouper-hash',              categoryId: 'cat-brk-eggs', sortOrder: 30,  name: 'Grouper Hash',                              description: 'Flaked local grouper with roasted potatoes, peppers and onions. Topped with two poached eggs and hollandaise.' },
  { _id: 'item-brk-fish-dip-benedict',         categoryId: 'cat-brk-eggs', sortOrder: 40,  name: 'Smoked Fish Dip Eggs Benedict',             description: 'Toasted English muffin with house-smoked fish dip, two poached eggs, Old Bay hollandaise and capers. A Keys classic done right.' },
  { _id: 'item-brk-tacos',                     categoryId: 'cat-brk-eggs', sortOrder: 50,  name: 'Breakfast Tacos (2)',                       description: 'Scrambled eggs, cotija, pico, avocado and your choice of grilled shrimp or smoked fish on warm flour tortillas.' },
  { _id: 'item-brk-two-eggs',                  categoryId: 'cat-brk-eggs', sortOrder: 60,  name: 'Two Eggs Any Style',                        description: 'Two farm eggs cooked to order with grits and toast. Simple and honest.' },
  { _id: 'item-brk-crab-cake-benedict',        categoryId: 'cat-brk-eggs', sortOrder: 70,  name: 'Crab Cake Benedict',                        description: 'Two house-made crab cakes on toasted English muffins, topped with poached eggs, lemon-caper hollandaise and fresh dill. Weekend showstopper.' },
  { _id: 'item-brk-fishermans-plate',          categoryId: 'cat-brk-eggs', sortOrder: 80,  name: "Keys Fisherman's Plate",                    description: 'Three eggs any style, shrimp, smoked fish hash, stone-ground grits, home fries and toast. Built for people who\'ve already been on the water.' },
  { _id: 'item-brk-mahi-hash',                 categoryId: 'cat-brk-eggs', sortOrder: 90,  name: 'Mahi Mahi Hash',                            description: 'Pan-seared mahi with sweet potatoes, roasted corn, red pepper and lime crema. Two eggs on top, your style.' },
  { _id: 'item-brk-lobster-scramble',          categoryId: 'cat-brk-eggs', sortOrder: 100, name: 'Lobster Scramble',                          description: 'Florida Keys lobster tossed with three scrambled eggs, chives, crème fraîche and a little heat. Served with buttered toast. Seasonal — ask your server.', labels: ['Market Price'] },
  { _id: 'item-brk-conch-omelette',            categoryId: 'cat-brk-eggs', sortOrder: 110, name: 'Conch Omelette',                            description: 'Three-egg omelette stuffed with diced conch, peppers, onions and pepper jack. Served with grits and toast.' },
  { _id: 'item-brk-avocado-toast',             categoryId: 'cat-brk-eggs', sortOrder: 120, name: 'Avocado Toast with Smoked Fish',             description: 'Thick-cut sourdough, smashed avocado, house smoked fish dip, everything seasoning, pickled red onion and two poached eggs. Yes, we went there.' },
  { _id: 'item-brk-stone-crab-scramble',       categoryId: 'cat-brk-eggs', sortOrder: 130, name: 'Stone Crab & Egg Scramble',                 description: 'Cracked stone crab claws scrambled with eggs, Old Bay butter, scallions and cheddar. Seasonal October–May. When it\'s gone, it\'s gone.', labels: ['Market Price'] },
  { _id: 'item-brk-snapper-huevos',            categoryId: 'cat-brk-eggs', sortOrder: 140, name: 'Snapper Huevos Rancheros',                  description: 'Crispy corn tortillas topped with ranchero sauce, two fried eggs, flaked yellowtail snapper, cotija, avocado and fresh cilantro.' },
  { _id: 'item-brk-byo-omelette',              categoryId: 'cat-brk-eggs', sortOrder: 150, name: 'Build Your Own Omelette',                   description: 'Three eggs, choice of three fillings: shrimp, smoked fish, bacon, sausage, peppers, onions, mushrooms, cheddar, Swiss or pepper jack. Served with grits or home fries.' },

  // ══════════════════════════════════════════════════════════════
  // BREAKFAST — Morning Sweets   (source: menu-breakfast.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-brk-french-toast',              categoryId: 'cat-brk-sweets', sortOrder: 10, name: 'Keys Lime French Toast',    description: 'Thick brioche soaked in a Keys lime custard, griddle-toasted gold and served with whipped cream, toasted coconut and a drizzle of honey. Weekend only.' },
  { _id: 'item-brk-coconut-pancakes',          categoryId: 'cat-brk-sweets', sortOrder: 20, name: 'Coconut Pancakes (3)',      description: 'Fluffy coconut-milk pancakes with toasted coconut flakes, macadamia butter and warm pineapple syrup. Add bacon or sausage +$4.' },
  { _id: 'item-brk-banana-foster-waffle',      categoryId: 'cat-brk-sweets', sortOrder: 30, name: 'Banana Foster Waffle',     description: 'Belgian-style waffle topped with caramelized banana, dark rum butter sauce, candied pecans and vanilla cream. A little indulgent. Worth it.' },
  { _id: 'item-brk-acai-bowl',                 categoryId: 'cat-brk-sweets', sortOrder: 40, name: 'Mango Açaí Bowl',          description: 'Frozen açaí blended with mango and banana, topped with granola, fresh tropical fruit, honey and shredded coconut.' },

  // ══════════════════════════════════════════════════════════════
  // BREAKFAST — Morning Sandwiches & Wraps   (source: menu-breakfast.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-brk-dock-egg-sand',             categoryId: 'cat-brk-sandwiches', sortOrder: 10, name: 'The Dock Egg Sandwich',     description: 'Two eggs, American cheese, your choice of bacon, sausage or smoked fish on a toasted brioche bun. No frills, all flavor.' },
  { _id: 'item-brk-shrimp-roll',               categoryId: 'cat-brk-sandwiches', sortOrder: 20, name: 'Shrimp Roll Breakfast Style', description: 'Warm shrimp with Old Bay butter, a fried egg and pickled jalapeño on a toasted split-top roll. The best thing on this menu, don\'t argue with us.' },
  { _id: 'item-brk-grouper-sand',              categoryId: 'cat-brk-sandwiches', sortOrder: 30, name: 'Grouper Breakfast Sandwich', description: 'Grilled local grouper fillet, a fried egg, chipotle aioli, lettuce and tomato on a toasted ciabatta roll. Served with home fries.' },
  { _id: 'item-brk-burrito',                   categoryId: 'cat-brk-sandwiches', sortOrder: 40, name: 'Keys Breakfast Burrito',    description: 'Flour tortilla stuffed with scrambled eggs, your choice of shrimp or smoked fish, cheddar, home fries, pico and sour cream. Wrapped tight, no judgment.' },
  { _id: 'item-brk-smoked-fish-blt',           categoryId: 'cat-brk-sandwiches', sortOrder: 50, name: 'Smoked Fish BLT',           description: 'House-smoked fish dip spread on toasted sourdough with crispy bacon, beefsteak tomato, lettuce and Old Bay mayo. A serious brunch sandwich.' },
  { _id: 'item-brk-lobster-grilled-cheese',    categoryId: 'cat-brk-sandwiches', sortOrder: 60, name: 'Lobster Grilled Cheese',    description: 'Florida lobster, Gruyère, sharp cheddar and a little Dijon on thick-cut sourdough, griddled golden brown. Seasonal. Not cheap. Not sorry.', labels: ['Market Price'] },
  { _id: 'item-brk-veggie-wrap',               categoryId: 'cat-brk-sandwiches', sortOrder: 70, name: 'Veggie Wrap',              description: 'Scrambled eggs, roasted peppers, spinach, avocado, black beans, pepper jack and salsa verde in a whole wheat wrap. Ask for a GF bowl version.' },
  { _id: 'item-brk-captains-club',             categoryId: 'cat-brk-sandwiches', sortOrder: 80, name: "The Captain's Club",       description: 'Triple-decker with smoked fish, bacon, egg, cheddar, lettuce and tomato on white toast. Held together with a toothpick and a good attitude.' },

  // ══════════════════════════════════════════════════════════════
  // BREAKFAST — Starters & Sides   (source: menu-breakfast.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-brk-side-conch',               categoryId: 'cat-brk-sides', sortOrder: 10,  name: 'Conch Fritters',          description: 'Six golden fritters, aioli and hot sauce.' },
  { _id: 'item-brk-side-fish-dip',            categoryId: 'cat-brk-sides', sortOrder: 20,  name: 'Smoked Fish Dip',         description: 'House-smoked fish, cream cheese, crackers and pickled peppers.' },
  { _id: 'item-brk-side-shrimp-cocktail',     categoryId: 'cat-brk-sides', sortOrder: 30,  name: 'Shrimp Cocktail',         description: 'Six chilled Key West pink shrimp, house cocktail sauce and lemon.' },
  { _id: 'item-brk-side-shrimp-ceviche',      categoryId: 'cat-brk-sides', sortOrder: 40,  name: 'Shrimp Ceviche',          description: 'Fresh local shrimp, citrus, tomato, cucumber, red onion and cilantro. Served with plantain chips.' },
  { _id: 'item-brk-side-grits',               categoryId: 'cat-brk-sides', sortOrder: 50,  name: 'Stone-Ground Grits',      description: 'Plain or with butter and sharp cheddar.' },
  { _id: 'item-brk-side-cheese-grits',        categoryId: 'cat-brk-sides', sortOrder: 60,  name: 'Cheese Grits',            description: 'Stone-ground grits loaded with sharp cheddar, smoked gouda and a hit of hot sauce.' },
  { _id: 'item-brk-side-home-fries',          categoryId: 'cat-brk-sides', sortOrder: 70,  name: 'Home Fries',              description: 'Seasoned potatoes with peppers and onions.' },
  { _id: 'item-brk-side-sweet-potato-fries',  categoryId: 'cat-brk-sides', sortOrder: 80,  name: 'Sweet Potato Fries',      description: 'Crispy sweet potato fries with cinnamon sugar and honey dipping sauce.' },
  { _id: 'item-brk-side-toast',               categoryId: 'cat-brk-sides', sortOrder: 90,  name: 'Toast (2)',               description: 'White, wheat or sourdough.' },
  { _id: 'item-brk-side-avocado',             categoryId: 'cat-brk-sides', sortOrder: 100, name: 'Avocado Slices',          description: 'Ripe avocado, sea salt, lemon, red pepper flakes.' },
  { _id: 'item-brk-side-bacon',               categoryId: 'cat-brk-sides', sortOrder: 110, name: 'Bacon (3 strips)',        description: 'Thick-cut applewood smoked bacon, cooked crispy.' },
  { _id: 'item-brk-side-sausage',             categoryId: 'cat-brk-sides', sortOrder: 120, name: 'Country Sausage Links (3)', description: 'Mild pork sausage, pan-fried golden.' },
  { _id: 'item-brk-side-fruit',               categoryId: 'cat-brk-sides', sortOrder: 130, name: 'Seasonal Fruit Bowl',     description: 'Local and tropical fruit, honey drizzle.' },
  { _id: 'item-brk-side-parfait',             categoryId: 'cat-brk-sides', sortOrder: 140, name: 'Yogurt Parfait',          description: 'Greek yogurt layered with house granola, fresh mango, pineapple and local honey.' },
  { _id: 'item-brk-side-soup',                categoryId: 'cat-brk-sides', sortOrder: 150, name: 'Cup of Soup',             description: "Ask your server for today's soup. Usually something with seafood in it." },
  { _id: 'item-brk-side-salad',               categoryId: 'cat-brk-sides', sortOrder: 160, name: 'Brunch Side Salad',       description: 'Mixed greens, cucumber, grape tomatoes, red onion and citrus vinaigrette.' },

  // ══════════════════════════════════════════════════════════════
  // BREAKFAST — Brunch Drinks   (source: menu-breakfast.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-brk-drink-mimosa',              categoryId: 'cat-brk-drinks', sortOrder: 10, name: 'Mimosa',          description: 'Classic, mango, guava or grapefruit.' },
  { _id: 'item-brk-drink-bloody-mary',         categoryId: 'cat-brk-drinks', sortOrder: 20, name: 'Keys Bloody Mary', description: 'House mix, Old Bay rim, shrimp garnish.' },
  { _id: 'item-brk-drink-rum-punch',           categoryId: 'cat-brk-drinks', sortOrder: 30, name: 'Rum Punch',        description: 'Dark rum, pineapple, orange and grenadine.' },
  { _id: 'item-brk-drink-tiki-sunrise',        categoryId: 'cat-brk-drinks', sortOrder: 40, name: 'Tiki Sunrise',     description: 'Coconut rum, fresh OJ, passionfruit, grenadine. Looks like sunrise, tastes like the Keys.' },
  { _id: 'item-brk-drink-paloma',              categoryId: 'cat-brk-drinks', sortOrder: 50, name: 'Brunch Paloma',    description: 'Tequila, fresh grapefruit, lime and a salted rim. Light, cold and perfect with eggs.' },
  { _id: 'item-brk-drink-aperol',              categoryId: 'cat-brk-drinks', sortOrder: 60, name: 'Aperol Spritz',    description: 'Aperol, prosecco, splash of soda, orange slice. The brunch classic.' },
  { _id: 'item-brk-drink-rose',                categoryId: 'cat-brk-drinks', sortOrder: 70, name: 'Sparkling Rosé',   description: 'Glass or half-bottle. Ask your server for the current pour.' },
  { _id: 'item-brk-drink-beer',                categoryId: 'cat-brk-drinks', sortOrder: 80, name: 'Draft Beer',       description: "Ask your server what's on tap. Usually something cold and local." },
  { _id: 'item-brk-drink-coffee',              categoryId: 'cat-brk-drinks', sortOrder: 90, name: 'Coffee',           description: 'Drip, iced, espresso or Cuban colada.' },

  // ══════════════════════════════════════════════════════════════
  // DRINKS — Signature Cocktails   (source: menu-drinks.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ⚠️ "Tinio's Tiki Punch" is verbatim from HTML line 183. Likely typo for
  //    "Tonio's". Kept as-is — owner must confirm before correcting.
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-drk-keys-mule',                 categoryId: 'cat-drinks-cocktails', sortOrder: 10, name: 'The Keys Mule',             description: 'Dark rum, fresh squeezed lime, house-made ginger beer, mint. Served in a copper mug. This one has a reputation.' },
  { _id: 'item-drk-rum-punch',                 categoryId: 'cat-drinks-cocktails', sortOrder: 20, name: 'Summerland Rum Punch',      description: 'Light and dark rum, pineapple, orange and passion fruit juice, grenadine float, orange slice. A true Keys classic.' },
  { _id: 'item-drk-coconut-old-fashioned',     categoryId: 'cat-drinks-cocktails', sortOrder: 30, name: 'Coconut Old Fashioned',    description: 'Coconut-washed bourbon, toasted coconut syrup, Angostura bitters, king ice cube. Slow down. You\'re on an island.' },
  { _id: 'item-drk-paloma',                    categoryId: 'cat-drinks-cocktails', sortOrder: 40, name: 'MM 25 Paloma',              description: 'Tequila blanco, fresh grapefruit and lime, pink salt rim, splash of sparkling water. Light and honestly dangerous.' },
  { _id: 'item-drk-pink-shrimp',               categoryId: 'cat-drinks-cocktails', sortOrder: 50, name: 'The Pink Shrimp',           description: 'Gin, elderflower liqueur, fresh strawberry, lime and a hibiscus salt rim. Sounds silly. Tastes great. Named for the shrimp.' },
  { _id: 'item-drk-tiki-punch',                categoryId: 'cat-drinks-cocktails', sortOrder: 60, name: "Tinio's Tiki Punch (for 2)", description: 'A full bowl: rum, passion fruit, mango, lime, ginger. Served with two straws and questionable judgment.' },

  // ══════════════════════════════════════════════════════════════
  // DRINKS — Beer   (source: menu-drinks.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-drk-local-ipa',                 categoryId: 'cat-drinks-beer', sortOrder: 10, name: 'Rotating Local IPA',       description: "Ask your server what's on tap. We keep it Florida." },
  { _id: 'item-drk-yuengling',                 categoryId: 'cat-drinks-beer', sortOrder: 20, name: 'Yuengling Lager',          description: 'The American classic. Cold and reliable.' },
  { _id: 'item-drk-blue-moon',                 categoryId: 'cat-drinks-beer', sortOrder: 30, name: 'Blue Moon',               description: 'With an orange, because it\'s the right move.' },
  { _id: 'item-drk-seasonal-craft',            categoryId: 'cat-drinks-beer', sortOrder: 40, name: 'Seasonal Florida Craft',   description: 'Changes with the season. Ask your server.' },
  { _id: 'item-drk-bud-light',                 categoryId: 'cat-drinks-beer', sortOrder: 50, name: 'Bud Light / Budweiser' },
  { _id: 'item-drk-miller-lite',               categoryId: 'cat-drinks-beer', sortOrder: 60, name: 'Miller Lite' },
  { _id: 'item-drk-modelo',                    categoryId: 'cat-drinks-beer', sortOrder: 70, name: 'Modelo Especial' },
  { _id: 'item-drk-corona',                    categoryId: 'cat-drinks-beer', sortOrder: 80, name: 'Corona Extra' },
  { _id: 'item-drk-dos-equis',                 categoryId: 'cat-drinks-beer', sortOrder: 90, name: 'Dos Equis Lager' },
  { _id: 'item-drk-jai-alai',                  categoryId: 'cat-drinks-beer', sortOrder: 100, name: 'Cigar City Jai Alai IPA' },
  { _id: 'item-drk-hard-seltzer',              categoryId: 'cat-drinks-beer', sortOrder: 110, name: 'Truly / White Claw' },
  { _id: 'item-drk-na-beer',                   categoryId: 'cat-drinks-beer', sortOrder: 120, name: 'Heineken 0.0 (N/A)' },

  // ══════════════════════════════════════════════════════════════
  // DRINKS — Wine & Spirit-Free   (source: menu-drinks.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-drk-white-wine',                categoryId: 'cat-drinks-wine', sortOrder: 10, name: 'House White (Pinot Grigio)' },
  { _id: 'item-drk-rose-wine',                 categoryId: 'cat-drinks-wine', sortOrder: 20, name: 'House Rosé' },
  { _id: 'item-drk-red-wine',                  categoryId: 'cat-drinks-wine', sortOrder: 30, name: 'House Red (Malbec)' },
  { _id: 'item-drk-sparkling',                 categoryId: 'cat-drinks-wine', sortOrder: 40, name: 'Sparkling Wine' },
  { _id: 'item-drk-zero-proof-mule',           categoryId: 'cat-drinks-wine', sortOrder: 50, name: 'Keys Mule — Zero Proof',  description: 'Ginger beer, fresh lime, cucumber, mint.' },
  { _id: 'item-drk-agua-fresca',               categoryId: 'cat-drinks-wine', sortOrder: 60, name: 'Agua Fresca',             description: 'Seasonal fruit, water, lime, honey. Ask your server.' },

  // ══════════════════════════════════════════════════════════════
  // DRINKS — Non-Alcoholic   (source: menu-drinks.html)
  // ⚠️ Owner approval required — not from a printed menu
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-drk-drip-coffee',               categoryId: 'cat-drinks-na', sortOrder: 10, name: 'Drip Coffee' },
  { _id: 'item-drk-iced-coffee',               categoryId: 'cat-drinks-na', sortOrder: 20, name: 'Iced Coffee' },
  { _id: 'item-drk-colada',                    categoryId: 'cat-drinks-na', sortOrder: 30, name: 'Cuban Colada' },
  { _id: 'item-drk-lemonade',                  categoryId: 'cat-drinks-na', sortOrder: 40, name: 'Fresh-Squeezed Lemonade' },
  { _id: 'item-drk-arnold-palmer',             categoryId: 'cat-drinks-na', sortOrder: 50, name: 'Arnold Palmer' },
  { _id: 'item-drk-soft-drinks',               categoryId: 'cat-drinks-na', sortOrder: 60, name: 'Soft Drinks',    description: 'Coke, Diet Coke, Sprite, ginger ale.' },

  // ══════════════════════════════════════════════════════════════
  // HAPPY HOUR — Drinks   (source: menu-happy-hour.html)
  // ⚠️ Owner approval required — verify against actual happy hour printed card
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-hh-draft',                      categoryId: 'cat-hh-drinks', sortOrder: 10, name: 'Draft Beer',           description: 'All drafts on tap' },
  { _id: 'item-hh-well',                       categoryId: 'cat-hh-drinks', sortOrder: 20, name: 'House Well Spirits',    description: 'Vodka, rum, gin, tequila, whiskey' },
  { _id: 'item-hh-house-cocktails',            categoryId: 'cat-hh-drinks', sortOrder: 30, name: 'House Cocktails',       description: 'Keys Mule, Rum Punch, Paloma, house specials' },
  { _id: 'item-hh-wine',                       categoryId: 'cat-hh-drinks', sortOrder: 40, name: 'House Wine',            description: 'Glass — white, red or rosé' },
  { _id: 'item-hh-domestic',                   categoryId: 'cat-hh-drinks', sortOrder: 50, name: 'Domestic Canned Beer',  description: 'Bud Light, Miller Lite, Coors Light' },
  { _id: 'item-hh-import-craft',               categoryId: 'cat-hh-drinks', sortOrder: 60, name: 'Import & Craft Cans',   description: 'Corona, Modelo, Cigar City, rotating craft' },
  { _id: 'item-hh-frozen',                     categoryId: 'cat-hh-drinks', sortOrder: 70, name: 'Frozen Drink of the Day' },

  // ══════════════════════════════════════════════════════════════
  // HAPPY HOUR — Food   (source: menu-happy-hour.html)
  // ⚠️ Owner approval required — verify against actual happy hour printed card
  // ══════════════════════════════════════════════════════════════
  { _id: 'item-hh-shrimp-basket',              categoryId: 'cat-hh-food', sortOrder: 10, name: 'Shrimp Basket',      description: 'One dozen fried Key West pink shrimp with Old Bay fries and cocktail sauce. The move during happy hour.' },
  { _id: 'item-hh-fish-tacos',                 categoryId: 'cat-hh-food', sortOrder: 20, name: 'Fish Tacos (2)',      description: 'Two grilled or blackened local fish tacos with slaw and aioli. The best two tacos per dollar in the Lower Keys.' },
  { _id: 'item-hh-conch-fritters',             categoryId: 'cat-hh-food', sortOrder: 30, name: 'Conch Fritters (6)', description: 'Six golden conch fritters with chipotle aioli. A must-order.' },
  { _id: 'item-hh-fish-dip',                   categoryId: 'cat-hh-food', sortOrder: 40, name: 'Smoked Fish Dip',    description: 'House-smoked fish with crackers and pickled peppers. Classic Keys dock food.' },
  { _id: 'item-hh-fries',                      categoryId: 'cat-hh-food', sortOrder: 50, name: 'Double-Fried Fries', description: 'Seasoned, fried twice, served with house aioli. Simple. Perfect.' },
  { _id: 'item-hh-ceviche',                    categoryId: 'cat-hh-food', sortOrder: 60, name: 'Ceviche of the Day', description: "Today's fresh local fish or shrimp, lime-cured with mango, cucumber and cilantro." },
]

// ─── SUSHI ROLLS ─────────────────────────────────────────────────────────────
// Source: special-menus.html — Sushi Night (Thursdays)
// Printed AVIF source: "Sushi night - thursday.avif"
// sortOrder matches display order on website

type SushiRoll = {
  _id: string
  sortOrder: number
  name: string
  ingredients: string
}

const sushiRolls: SushiRoll[] = [
  { _id: 'sushi-shrimp-avocado',    sortOrder: 10,  name: 'Shrimp & Avocado Roll',  ingredients: 'Fried shrimp, cucumber and avocado' },
  { _id: 'sushi-kani-salad',        sortOrder: 20,  name: 'Kani Salad',              ingredients: 'Shredded crabmeat, cucumber and roe tossed in a spicy dressing' },
  { _id: 'sushi-salmon-roll',       sortOrder: 30,  name: 'Salmon Roll',             ingredients: 'Salmon, cucumber and avocado' },
  { _id: 'sushi-spicy-tuna',        sortOrder: 40,  name: 'Spicy Tuna Roll',         ingredients: 'Spicy tuna and avocado' },
  { _id: 'sushi-san-diego',         sortOrder: 50,  name: 'San Diego Roll',          ingredients: 'Crab, cucumber and avocado topped with tuna' },
  { _id: 'sushi-lovers-roll',       sortOrder: 60,  name: "Lover's Roll",            ingredients: 'Steamed shrimp, raw salmon and avocado topped with spicy mayo and eel sauce' },
  { _id: 'sushi-spider-roll',       sortOrder: 70,  name: 'Spider Roll',             ingredients: 'Fried soft-shell crab, cucumber and avocado' },
  { _id: 'sushi-pokey-bowl',        sortOrder: 80,  name: 'Pokey Bowl',              ingredients: 'Spicy tuna, seaweed salad and kani salad served over sushi rice' },
  { _id: 'sushi-maryland-crab',     sortOrder: 90,  name: 'Maryland Crab Roll',      ingredients: 'Crab, asparagus and avocado' },
  { _id: 'sushi-philadelphia',      sortOrder: 100, name: 'Philadelphia Roll',       ingredients: 'Salmon, avocado and cream cheese' },
  { _id: 'sushi-veggie',            sortOrder: 110, name: 'Veggie Roll',             ingredients: 'Avocado, cucumber, asparagus and cream cheese' },
  { _id: 'sushi-summerland',        sortOrder: 120, name: 'Summerland Roll',         ingredients: 'Fried lobster, cream cheese, avocado, kani salad and red tobiko topped with tempura flakes' },
]

// ─── PASTA DISHES — Pasta Night (Mondays) ────────────────────────────────────
// Source: special-menus.html — Pasta Night section
// Printed AVIF source: "NEW Pasta Monday.avif"
// sortOrder matches display order on website

type PastaItem = {
  _id: string
  sortOrder: number
  name: string
  description?: string
}

const pastaItems: PastaItem[] = [
  { _id: 'pasta-chicken-alfredo',    sortOrder: 10,  name: 'Chicken Alfredo' },
  { _id: 'pasta-shrimp-alfredo',     sortOrder: 20,  name: 'Shrimp Alfredo' },
  { _id: 'pasta-lobster-fra-diavolo', sortOrder: 30, name: 'Lobster Fra Diavolo' },
  { _id: 'pasta-lobster-ravioli',    sortOrder: 40,  name: 'Lobster Ravioli',             description: 'In a blush sauce' },
  { _id: 'pasta-linguini-meatballs', sortOrder: 50,  name: 'Linguini & Homemade Meatballs' },
  { _id: 'pasta-linguini-sausage',   sortOrder: 60,  name: 'Linguini & Sausage',          description: 'In homemade marinara' },
  { _id: 'pasta-linguini-bolognese', sortOrder: 70,  name: 'Linguini Bolognese',          description: 'In a homemade meat sauce' },
  { _id: 'pasta-manicotti',          sortOrder: 80,  name: 'Manicotti',                   description: 'Stuffed with ricotta' },
  { _id: 'pasta-chicken-francaise',  sortOrder: 90,  name: 'Chicken Francaise',           description: 'Egg battered chicken in lemon white wine sauce' },
  { _id: 'pasta-penne-vodka',        sortOrder: 100, name: 'Penne Vodka',                 description: 'In a homemade vodka sauce' },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function createIfMissing(doc: Record<string, unknown>): Promise<{ created: boolean }> {
  const result = await client.createIfNotExists(doc as any)
  const existed = result._createdAt === undefined || (result as any)._weak
  // createIfNotExists returns the existing doc unchanged if it already exists.
  // We detect a fresh create by checking whether the doc's _updatedAt was just set.
  // Simplest reliable check: compare _id returned vs queried.
  const isNew = !(await client.getDocument(doc._id as string)?._id)
  if (isNew) {
    console.log(`  ✅ created  ${doc._id}`)
    return { created: true }
  }
  console.log(`  ⏭  exists   ${doc._id}`)
  return { created: false }
}

// Simpler, correct approach: fetch first, then create only if absent.
async function safeCreate(doc: Record<string, unknown>): Promise<{ created: boolean }> {
  const existing = await client.getDocument(doc._id as string)
  if (existing) {
    console.log(`  ⏭  exists   ${doc._id}`)
    return { created: false }
  }
  await client.createIfNotExists(doc as any)
  console.log(`  ✅ created  ${doc._id}`)
  return { created: true }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱  Tonio\'s Sanity Menu Seed\n')
  console.log('Using createIfNotExists — existing documents will never be overwritten.\n')

  let catC = 0, catS = 0
  console.log('── Categories ──────────────────────────────────────────────')
  for (const cat of categories) {
    const { created } = await safeCreate({
      _id: cat._id,
      _type: 'menuCategory',
      name: cat.name,
      sortOrder: cat.sortOrder,
      menuPage: cat.menuPage,
    })
    created ? catC++ : catS++
  }

  let itemC = 0, itemS = 0
  console.log('\n── Menu Items ──────────────────────────────────────────────')
  for (const item of items) {
    const doc: Record<string, unknown> = {
      _id: item._id,
      _type: 'menuItem',
      name: item.name,
      sortOrder: item.sortOrder,
      active: true,
      category: { _type: 'reference', _ref: item.categoryId },
    }
    if (item.description) doc.description = item.description
    if (item.labels)      doc.labels = item.labels
    const { created } = await safeCreate(doc)
    created ? itemC++ : itemS++
  }

  let sushiC = 0, sushiS = 0
  console.log('\n── Sushi Rolls ─────────────────────────────────────────────')
  for (const roll of sushiRolls) {
    const { created } = await safeCreate({
      _id: roll._id,
      _type: 'sushiRoll',
      name: roll.name,
      ingredients: roll.ingredients,
      sortOrder: roll.sortOrder,
      featured: false,
    })
    created ? sushiC++ : sushiS++
  }

  let pastaC = 0, pastaS = 0
  console.log('\n── Pasta Items ─────────────────────────────────────────────')
  for (const pasta of pastaItems) {
    const doc: Record<string, unknown> = {
      _id: pasta._id,
      _type: 'pastaItem',
      name: pasta.name,
      sortOrder: pasta.sortOrder,
      comingSoon: false,
    }
    if (pasta.description) doc.description = pasta.description
    const { created } = await safeCreate(doc)
    created ? pastaC++ : pastaS++
  }

  console.log('\n── Summary ─────────────────────────────────────────────────')
  console.log(`Categories :  ${catC} created, ${catS} skipped`)
  console.log(`Menu Items :  ${itemC} created, ${itemS} skipped`)
  console.log(`Sushi Rolls:  ${sushiC} created, ${sushiS} skipped`)
  console.log(`Pasta Items:  ${pastaC} created, ${pastaS} skipped`)
  console.log(`Total docs :  ${catC + itemC + sushiC + pastaC} created`)
  console.log('\n✅  Seed complete.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err)
  process.exit(1)
})
