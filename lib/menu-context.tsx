"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export interface Order {
  id: string
  customerName: string
  customerAddress: string
  customerPhone: string
  items: { item: MenuItem; quantity: number }[]
  total: number
  status: "Food Processing" | "Ready for Pickup" | "Out for Delivery" | "Delivered" | "Cancelled"
  date: string
}

interface MenuContextType {
  menuItems: MenuItem[]
  orders: Order[]
  addMenuItem: (item: Omit<MenuItem, "id">) => void
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  addOrder: (order: Omit<Order, "id" | "date">) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

const initialMenuItems: MenuItem[] = [
  // Vegetable Appetizers (4 items)
  {
    id: "1",
    name: "Vegetable Pakora",
    description: "Mixed shredded vegetables seasoned with spices, coated in chickpea batter, deep-fried.",
    price: 8.99,
    category: "Vegetable Appetizers",
    image: "/vegetable-pakora.jpg",
  },
  {
    id: "2",
    name: "Vegetable Samosa",
    description: "Crispy golden triangles stuffed with potato and vegetables, deep-fried.",
    price: 7.99,
    category: "Vegetable Appetizers",
    image: "/crispy-golden-samosas.png",
  },
  {
    id: "3",
    name: "Idli",
    description: "Soft, fluffy steamed rice cakes.",
    price: 9.99,
    category: "Vegetable Appetizers",
    image: "/fluffy-idli.png",
  },
  {
    id: "4",
    name: "Paneer Pakora",
    description: "Cottage cheese cubes coated in chickpea batter, deep-fried.",
    price: 10.99,
    category: "Vegetable Appetizers",
    image: "/paneer-pakora.jpg",
  },
  // Non-Veg Appetizers (4 items)
  {
    id: "5",
    name: "Chicken 65",
    description: "Crispy tender chicken chunks marinated in exotic Indian spices, deep-fried.",
    price: 16.99,
    category: "Non-Veg Appetizers",
    image: "/chicken-65.png",
  },
  {
    id: "6",
    name: "Chicken Tikka",
    description: "Marinated chicken pieces with yogurt and spices, cooked in our clay oven.",
    price: 18.99,
    category: "Non-Veg Appetizers",
    image: "/tandoori-chicken-tikka-skewers.jpg",
  },
  {
    id: "7",
    name: "Apollo Fish",
    description: "Crispy fried fish, coated with chefs' spices and a tomato sauce.",
    price: 15.99,
    category: "Non-Veg Appetizers",
    image: "/apollo-fish.jpg",
  },
  {
    id: "8",
    name: "Chicken Lollipop",
    description: "Chicken wings marinated in spices, deep-fried and served with sauce.",
    price: 16.99,
    category: "Non-Veg Appetizers",
    image: "/chicken-lollipop.jpg",
  },
  // Dosa (9 items)
  {
    id: "11",
    name: "Plain Dosa",
    description: "Thin, crispy crepe made from rice and lentil batter, cooked to perfection.",
    price: 11.99,
    category: "Dosa",
    image: "/plain-dosa.jpg",
  },
  {
    id: "12",
    name: "Masala Dosa",
    description: "Thin, crispy crepe filled with a spiced potato masala filling.",
    price: 12.99,
    category: "Dosa",
    image: "/masala-dosa.png",
  },
  {
    id: "13",
    name: "Ghee Roast",
    description: "Paper thin, golden crispy roasted crepe with an abundance of rich ghee.",
    price: 12.99,
    category: "Dosa",
    image: "/ghee-roast-dosa-golden-crispy.jpg",
  },
  {
    id: "14",
    name: "Mysore Masala Dosa",
    description: "Mysore plain dosa stuffed with potato masala.",
    price: 14.99,
    category: "Dosa",
    image: "/mysore-masala-dosa.jpg",
  },
  {
    id: "15",
    name: "Cheese Dosa",
    description: "Thin, crispy crepe with a spread of mixed cheese.",
    price: 14.99,
    category: "Dosa",
    image: "/cheese-dosa.jpg",
  },
  {
    id: "16",
    name: "Benne Dosa",
    description:
      "Crispy outside and soft inside, smothered with butter, sprinkled with podi (gunpowder) and potato masala.",
    price: 16.99,
    category: "Dosa",
    image: "/benne-dosa.jpg",
  },
  {
    id: "17",
    name: "Chicken Tikka Dosa",
    description: "Thin, crispy crepe stuffed with chargrilled tender chicken and herbs.",
    price: 15.99,
    category: "Dosa",
    image: "/chicken-tikka-dosa.jpg",
  },
  {
    id: "18",
    name: "Spring Dosa",
    description: "Thin, crispy crepe stuffed with mixed vegetables and spring roll filling.",
    price: 13.99,
    category: "Dosa",
    image: "/spring-dosa.jpg",
  },
  {
    id: "19",
    name: "Podi Dosa",
    description: "Thin, crispy crepe with a spread of gunpowder (spicy lentil powder).",
    price: 12.99,
    category: "Dosa",
    image: "/podi-dosa.jpg",
  },
  // Uthappam (4 items)
  {
    id: "20",
    name: "Onion Chilli Uthappam",
    description: "Savory pancake sprinkled with onions, green chilies and cilantro.",
    price: 12.99,
    category: "Uthappam",
    image: "/onion-chilli-uthappam.jpg",
  },
  {
    id: "21",
    name: "Vegetable Uthappam",
    description: "Savory pancake topped with fresh seasonal vegetables and cilantro.",
    price: 13.99,
    category: "Uthappam",
    image: "/vegetable-uthappam-with-toppings.jpg",
  },
  {
    id: "22",
    name: "Cheese Uthappam",
    description: "Savory pancake with a spreaded mix of mozzarella and cheddar cheese.",
    price: 13.99,
    category: "Uthappam",
    image: "/cheese-uthappam.jpg",
  },
  {
    id: "23",
    name: "Tomato Uthappam",
    description: "Savory pancake topped with fresh tomatoes and cilantro.",
    price: 12.99,
    category: "Uthappam",
    image: "/tomato-uthappam.jpg",
  },
  // Vegetable Curries (5 items)
  {
    id: "24",
    name: "Dal Tadka",
    description: "Lentils tempered with tomatoes, onions, cumin and ghee.",
    price: 12.99,
    category: "Vegetable Curries",
    image: "/dal-tadka.jpg",
  },
  {
    id: "25",
    name: "Paneer Tikka Masala",
    description: "Char grilled paneer cubes cooked in a creamy tomato curry.",
    price: 15.99,
    category: "Vegetable Curries",
    image: "/paneer-tikka-masala.jpg",
  },
  {
    id: "26",
    name: "Palak Paneer",
    description: "Cottage cheese cubes cooked in a creamy spinach curry.",
    price: 14.99,
    category: "Vegetable Curries",
    image: "/palak-paneer-spinach.jpg",
  },
  {
    id: "27",
    name: "Malai Kofta",
    description: "Crispy fried cottage cheese and veggie balls dunked in a creamy sweet tomato sauce.",
    price: 15.99,
    category: "Vegetable Curries",
    image: "/malai-kofta.png",
  },
  {
    id: "28",
    name: "Chana Masala",
    description: "Chickpeas cooked in a spicy tomato-based curry with aromatic spices.",
    price: 13.99,
    category: "Vegetable Curries",
    image: "/placeholder.svg?height=300&width=400",
  },
  // Non-Veg Curries (5 items)
  {
    id: "29",
    name: "Butter Chicken",
    description: "Tender chicken pieces cooked in a rich, creamy tomato sauce with butter.",
    price: 16.99,
    category: "Non-Veg Curries",
    image: "/butter-chicken.png",
  },
  {
    id: "30",
    name: "Chicken Tikka Masala",
    description: "Char grilled chicken pieces cooked in a creamy tomato curry.",
    price: 16.99,
    category: "Non-Veg Curries",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "31",
    name: "Chicken Chettinad",
    description: "Tender chicken pieces cooked in a coconut base spicy curry with Chettinad spices.",
    price: 16.99,
    category: "Non-Veg Curries",
    image: "/chicken-chettinad.png",
  },
  {
    id: "32",
    name: "Goat Curry",
    description: "Tender goat pieces cooked in a traditional spicy curry.",
    price: 17.99,
    category: "Non-Veg Curries",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "33",
    name: "Chicken Korma",
    description: "Tender chicken pieces cooked in a mild, creamy cashew-based curry.",
    price: 16.99,
    category: "Non-Veg Curries",
    image: "/placeholder.svg?height=300&width=400",
  },
  // Biriyani (3 items)
  {
    id: "34",
    name: "Vegetable Biriyani",
    description: "Seasonal vegetables cooked with fragrant rice and aromatic spices, slow-cooked in a pot.",
    price: 14.99,
    category: "Biriyani",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "35",
    name: "Chicken Biriyani",
    description: "Tender chicken pieces cooked with fragrant rice and aromatic spices, slow-cooked in a pot.",
    price: 16.99,
    category: "Biriyani",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "36",
    name: "Goat Biriyani",
    description: "Succulent goat pieces cooked with fragrant rice and aromatic spices, slow-cooked in a pot.",
    price: 17.99,
    category: "Biriyani",
    image: "/placeholder.svg?height=300&width=400",
  },
  // Bread (3 items)
  {
    id: "37",
    name: "Garlic Naan",
    description: "Garlic infused naan.",
    price: 3.49,
    category: "Bread",
    image: "/garlic-naan.png",
  },
  {
    id: "38",
    name: "Butter Naan",
    description: "Soft, fluffy naan brushed with butter.",
    price: 2.99,
    category: "Bread",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "39",
    name: "Parotta",
    description: "Flaky and layered flat bread (2 pieces).",
    price: 3.99,
    category: "Bread",
    image: "/parotta.png",
  },
  // Indo Chinese (3 items)
  {
    id: "40",
    name: "Chicken Hakka Noodles",
    description: "Noodles stir-fried with chicken, mixed vegetables, soy sauce, and chefs' spices.",
    price: 15.99,
    category: "Indo Chinese",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "41",
    name: "Chilli Chicken",
    description: "Crispy fried chicken chunks coated with a chilli flavoured sauce with peppers and onions.",
    price: 16.99,
    category: "Indo Chinese",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "42",
    name: "Gobi Manchurian",
    description: "Crispy fried cauliflower tossed in our signature manchurian sauce (Gravy).",
    price: 13.99,
    category: "Indo Chinese",
    image: "/gobi-manchurian.png",
  },
  // Desserts (2 items)
  {
    id: "43",
    name: "Gulab Jamun",
    description: "Deep-fried milk dumplings soaked in syrup (2 pieces).",
    price: 4.99,
    category: "Desserts",
    image: "/gulab-jamun.png",
  },
  {
    id: "44",
    name: "Rasmalai",
    description: "Soft cottage cheese patties soaked in sweetened, thickened milk (2 pieces).",
    price: 5.99,
    category: "Desserts",
    image: "/placeholder.svg?height=300&width=400",
  },
  // Drinks (1 item)
  {
    id: "45",
    name: "Mango Lassi",
    description: "Sweet cold drink made with mangoes and yogurt.",
    price: 5.99,
    category: "Drinks",
    image: "/mango-lassi.png",
  },
]

const initialOrders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerAddress: "123 Main St, Houston, TX 77001",
    customerPhone: "281-555-0123",
    items: [
      { item: initialMenuItems[3], quantity: 2 },
      { item: initialMenuItems[4], quantity: 1 },
    ],
    total: 42.97,
    status: "Food Processing",
    date: new Date().toISOString(),
  },
]

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    localStorage.removeItem("menuItems")
    setMenuItems(initialMenuItems)
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      setOrders(initialOrders)
    }
  }, [])

  useEffect(() => {
    if (menuItems.length > 0) {
      localStorage.setItem("menuItems", JSON.stringify(menuItems))
    }
  }, [menuItems])

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  }, [orders])

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    }
    setMenuItems((prev) => [...prev, newItem])
  }

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const addOrder = (order: Omit<Order, "id" | "date">) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }
    setOrders((prev) => [...prev, newOrder])
  }

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        orders,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateOrderStatus,
        addOrder,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}
