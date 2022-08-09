export const Menu = {
  register: {
    path: 'register',
    text: 'Register',
    icon: 'icon-money',
  },
}

export type MenuTreeType = {
  path: string
  description: string
  isTree: boolean
  children?: MenuTreeType[]
}

export const MenuTree: MenuTreeType[] = [
  {
    path: '/register',
    description: 'Register',
    isTree: true,
    children: [
      {
        description: 'Register employee',
        path: '/registeremployee',
        isTree: false,
      },
      {
        description: 'Register Multiple Task Test',
        path: '/registermultipletest',
        isTree: true,
        children: [
          {
            description: 'Test 1',
            path: '/test1',
            isTree: false,
          },
        ],
      },
    ],
  },
]
